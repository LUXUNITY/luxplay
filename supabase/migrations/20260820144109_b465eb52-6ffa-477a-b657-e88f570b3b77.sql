select public.enqueue_email(
  'transactional_emails',
  jsonb_build_object(
    'message_id', 'pipeline-test-' || extract(epoch from now())::bigint,
    'to', 'luxplayuk@gmail.com',
    'from', 'LuxPlay <noreply@luxplay.uk>',
    'sender_domain', 'luxplay.uk',
    'subject', 'LuxPlay email pipeline test',
    'html', '<p>Pipeline test — booking confirmation emails are flowing.</p>',
    'text', 'Pipeline test — booking confirmation emails are flowing.',
    'purpose', 'transactional',
    'label', 'pipeline-test',
    'queued_at', now()
  )
);