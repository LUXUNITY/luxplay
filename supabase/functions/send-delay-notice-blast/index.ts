import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// One-time service notification to existing customers about the opening delay.
// Idempotent: re-running is safe because each send uses a stable idempotency key.
const BLAST_ID = 'opening-delay-2026-05-30-v1'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey)

  // Optional dry-run support
  let dryRun = false
  try {
    const body = await req.json()
    dryRun = !!body?.dryRun
  } catch (_) {}

  // Collect unique emails from orders + bookings (existing customers only)
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
  for (const r of orders.data ?? []) {
    if (r.customer_email) set.add(String(r.customer_email).trim().toLowerCase())
  }
  for (const r of sp.data ?? []) {
    if (r.parent_email) set.add(String(r.parent_email).trim().toLowerCase())
  }
  for (const r of baby.data ?? []) {
    if (r.parent_email) set.add(String(r.parent_email).trim().toLowerCase())
  }
  const emails = Array.from(set)

  if (dryRun) {
    return new Response(
      JSON.stringify({ dryRun: true, recipientCount: emails.length, emails }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  let queued = 0
  const errors: { email: string; error: string }[] = []

  for (const email of emails) {
    try {
      const resp = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
          'apikey': serviceKey,
        },
        body: JSON.stringify({
          templateName: 'delay-notice',
          recipientEmail: email,
          idempotencyKey: `${BLAST_ID}-${email}`,
        }),
      })
      if (!resp.ok) {
        const text = await resp.text()
        errors.push({ email, error: `${resp.status}: ${text.slice(0, 200)}` })
      } else {
        queued++
      }
    } catch (e) {
      errors.push({ email, error: (e as Error).message })
    }
  }

  return new Response(
    JSON.stringify({ recipientCount: emails.length, queued, errors }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  )
})
