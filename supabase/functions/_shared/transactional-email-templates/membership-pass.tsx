import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Img, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const MembershipPass = ({ parentName, childName, tierName, passCode, price }: Record<string, string>) => (
  <Html lang="en"><Head /><Preview>{childName}'s LuxPlay {tierName} pass is ready</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}><Container>
      <Heading>🎉 Welcome to {tierName}!</Heading>
      <Text>Hi {parentName},</Text>
      <Text>{childName}'s LuxPlay membership is active ({price} per month). Show this QR code at the counter every visit:</Text>
      <Img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(passCode)}`} width="220" height="220" alt={`Pass ${passCode}`} style={{ display: 'block', margin: '0 auto' }} />
      <Text style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold', letterSpacing: '3px' }}>{passCode}</Text>
      <Text>Book your free 2-hour sessions any time at luxplay.uk/my-membership (one upcoming booking at a time). Grown-ups go free.</Text>
      <Text>The pass belongs to {childName} only. If a monthly payment fails you have 24 hours to fix it before the pass is paused; it switches back on as soon as you pay.</Text>
      <Text>See you soon! The LuxPlay team</Text>
    </Container></Body>
  </Html>
)

export const template = {
  component: MembershipPass,
  subject: (d: Record<string, any>) => `${d.childName ?? 'Your'}'s LuxPlay membership pass 🎉`,
  displayName: 'Membership pass',
  previewData: { parentName: 'Sam', childName: 'Ella', tierName: 'Little Lux', passCode: 'LM4K7Q2X', price: '£24.99' },
} satisfies TemplateEntry
