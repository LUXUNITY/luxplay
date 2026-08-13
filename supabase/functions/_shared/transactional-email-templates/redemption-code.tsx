/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Img, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "LuxPlay"

interface RedemptionCodeProps {
  packageName?: string
  credits?: number
  redemptionCode?: string
}

const RedemptionCodeEmail = ({ packageName, credits, redemptionCode }: RedemptionCodeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your LuxPlay redemption code is ready! 🎮</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>🎮 LUXPLAY</Text>

        <Heading style={h1}>
          Payment Confirmed!
        </Heading>

        <Text style={text}>
          {packageName
            ? `Your ${packageName} package is secured.`
            : 'Your package is secured.'
          }
          {credits ? ` That's ${credits} credits ready for opening day!` : ''}
        </Text>

        <Section style={codeBox}>
          <Text style={codeLabel}>SCAN AT THE COUNTER</Text>
          {redemptionCode ? (
            <Img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(redemptionCode)}`}
              width="180"
              height="180"
              alt={`QR code for redemption ${redemptionCode}`}
              style={qrImg}
            />
          ) : null}
          <Text style={codeText}>{redemptionCode || 'LUX-XXXX-XXXX'}</Text>
        </Section>

        <Text style={text}>
          Show this email at the LuxPlay counter and we'll scan the QR code to load your credits.
          The code underneath works too if our scanner is busy.
        </Text>

        <Hr style={hr} />

        <Text style={smallText}>📍 Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX</Text>
        <Text style={smallText}>🗓️ See you soon at LuxPlay</Text>

        <Hr style={hr} />

        <Text style={footer}>
          Save this email — you'll need the code above when you visit. See you on opening day!
        </Text>

        <Text style={footerBrand}>The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: RedemptionCodeEmail,
  subject: (data: Record<string, any>) =>
    `Your LuxPlay Redemption Code${data.packageName ? ` — ${data.packageName}` : ''}`,
  displayName: 'Redemption code',
  previewData: {
    packageName: 'Champion',
    credits: 350,
    redemptionCode: 'LUX-AB3K-7MNP',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '500px', margin: '0 auto' }
const logo = { fontSize: '18px', fontWeight: '800' as const, letterSpacing: '4px', color: '#ff00cc', textAlign: 'center' as const, margin: '0 0 25px' }
const h1 = { fontSize: '24px', fontWeight: '700' as const, color: '#070710', margin: '0 0 15px', textAlign: 'center' as const }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 20px' }
const codeBox = { backgroundColor: '#070710', borderRadius: '4px', padding: '24px', textAlign: 'center' as const, margin: '0 0 24px' }
const codeLabel = { fontSize: '10px', letterSpacing: '3px', color: '#888888', margin: '0 0 8px', fontWeight: '600' as const }
const codeText = { fontSize: '28px', fontWeight: '800' as const, letterSpacing: '4px', color: '#aaff00', margin: '0' }
const qrImg = { display: 'block', margin: '0 auto 12px', backgroundColor: '#ffffff', borderRadius: '4px' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const smallText = { fontSize: '13px', color: '#777777', lineHeight: '1.4', margin: '0 0 4px' }
const footer = { fontSize: '13px', color: '#999999', margin: '20px 0 4px', lineHeight: '1.5' }
const footerBrand = { fontSize: '12px', color: '#999999', margin: '0' }
