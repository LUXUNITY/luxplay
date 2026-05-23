import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { TEMPLATES } from '../_shared/transactional-email-templates/registry.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// One-time service notification to existing customers about the opening delay.
const BLAST_ID = 'opening-delay-2026-05-30-v1'
const TEMPLATE_NAME = 'delay-notice'
const SITE_NAME = 'LuxPlay'
const SENDER_DOMAIN = 'notify.luxplay.uk'
const FROM_DOMAIN = 'luxplay.uk'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey)

  let dryRun = false
  try {
    const body = await req.json()
    dryRun = !!body?.dryRun
  } catch (_) {}

  // Collect unique emails
  const [orders, sp, baby] = await Promise.all([
    supabase.from('orders').select('customer_email'),
    supabase.from('soft_play_bookings').select('parent_email'),
    supabase.from('baby_soft_play_bookings').select('parent_email'),
  ])
  if (orders.error || sp.error || baby.error) {
    return new Response(
      JSON.stringify({ error: orders.error?.message || sp.error?.message || baby.error?.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
  const set = new Set<string>()
  for (const r of orders.data ?? []) if (r.customer_email) set.add(String(r.customer_email).trim().toLowerCase())
  for (const r of sp.data ?? []) if (r.parent_email) set.add(String(r.parent_email).trim().toLowerCase())
  for (const r of baby.data ?? []) if (r.parent_email) set.add(String(r.parent_email).trim().toLowerCase())
  const emails = Array.from(set)

  if (dryRun) {
    return new Response(
      JSON.stringify({ dryRun: true, recipientCount: emails.length, emails }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  const template = TEMPLATES[TEMPLATE_NAME]
  if (!template) {
    return new Response(JSON.stringify({ error: 'Template not found' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const html = await renderAsync(React.createElement(template.component, {}))
  const plainText = await renderAsync(React.createElement(template.component, {}), { plainText: true })
  const subject = typeof template.subject === 'function' ? template.subject({}) : template.subject

  let queued = 0
  const suppressed: string[] = []
  const errors: { email: string; error: string }[] = []

  for (const email of emails) {
    try {
      // Skip suppressed
      const { data: sup } = await supabase
        .from('suppressed_emails').select('id').eq('email', email).maybeSingle()
      if (sup) { suppressed.push(email); continue }

      // Get or create unsubscribe token
      let token: string
      const { data: existing } = await supabase
        .from('email_unsubscribe_tokens').select('token, used_at').eq('email', email).maybeSingle()
      if (existing && !existing.used_at) {
        token = existing.token
      } else if (existing && existing.used_at) {
        suppressed.push(email); continue
      } else {
        token = generateToken()
        const { error: insErr } = await supabase
          .from('email_unsubscribe_tokens').insert({ email, token })
        if (insErr) { errors.push({ email, error: `token: ${insErr.message}` }); continue }
      }

      const messageId = crypto.randomUUID()
      const idempotencyKey = `${BLAST_ID}-${email}`

      await supabase.from('email_send_log').insert({
        message_id: messageId, template_name: TEMPLATE_NAME, recipient_email: email, status: 'pending',
      })

      const { error: enqErr } = await supabase.rpc('enqueue_email', {
        queue_name: 'transactional_emails',
        payload: {
          message_id: messageId,
          to: email,
          from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text: plainText,
          purpose: 'transactional',
          label: TEMPLATE_NAME,
          idempotency_key: idempotencyKey,
          unsubscribe_token: token,
          queued_at: new Date().toISOString(),
        },
      })
      if (enqErr) {
        errors.push({ email, error: `enqueue: ${enqErr.message}` })
      } else {
        queued++
      }
    } catch (e) {
      errors.push({ email, error: (e as Error).message })
    }
  }

  return new Response(
    JSON.stringify({ recipientCount: emails.length, queued, suppressedCount: suppressed.length, errors }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  )
})
