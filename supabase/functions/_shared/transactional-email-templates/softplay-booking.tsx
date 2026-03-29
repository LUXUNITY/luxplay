/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "LuxPlay"

interface SoftPlayBookingProps {
  childName?: string
  parentName?: string
  sessionTime?: string
  sessionDate?: string
  bookingCode?: string
}

const SoftPlayBookingEmail = ({ childName, parentName, sessionTime, sessionDate, bookingCode }: SoftPlayBookingProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your LuxPlay soft play booking is confirmed! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>🎮 LUXPLAY</Text>

        <Heading style={h1}>
          Booking Confirmed!
        </Heading>

        <Text style={text}>
          {parentName ? `Hi ${parentName}, ` : ''}
          {childName
            ? `${childName}'s soft play session is booked!`
            : 'Your soft play session is booked!'
          }
        </Text>

        <Section style={detailsBox}>
          <Text style={detailLabel}>SESSION</Text>
          <Text style={detailValue}>{sessionTime || 'TBC'} — {sessionDate || 'Opening Day'}</Text>
        </Section>

        <Section style={codeBox}>
          <Text style={codeLabel}>YOUR BOOKING CODE</Text>
          <Text style={codeText}>{bookingCode || 'SP-XXX-XXX'}</Text>
        </Section>

        <Text style={text}>
          Show this code at the LuxPlay soft play entrance on the day. Your child's name will be on our check-in list.
        </Text>

        <Hr style={hr} />

        <Text style={smallText}>📍 Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX</Text>
        <Text style={smallText}>👶 Max 40 children per session</Text>

        <Hr style={hr} />

        <Text style={footer}>
          Save this email — you'll need the booking code when you arrive. See you on opening day!
        </Text>

        <Text style={footerBrand}>The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SoftPlayBookingEmail,
  subject: (data: Record<string, any>) =>
    `Soft Play Booking Confirmed${data.childName ? ` — ${data.childName}` : ''}`,
  displayName: 'Soft play booking',
  previewData: {
    childName: 'Sophie',
    parentName: 'Sarah',
    sessionTime: '2:00 PM',
    sessionDate: 'Friday 1st May 2026',
    bookingCode: 'SP-AB3-K7M',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '500px', margin: '0 auto' }
const logo = { fontSize: '18px', fontWeight: '800' as const, letterSpacing: '4px', color: '#00eeff', textAlign: 'center' as const, margin: '0 0 25px' }
const h1 = { fontSize: '24px', fontWeight: '700' as const, color: '#070710', margin: '0 0 15px', textAlign: 'center' as const }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 20px' }
const detailsBox = { backgroundColor: '#f0fafe', borderRadius: '4px', padding: '16px', textAlign: 'center' as const, margin: '0 0 16px' }
const detailLabel = { fontSize: '10px', letterSpacing: '3px', color: '#888888', margin: '0 0 4px', fontWeight: '600' as const }
const detailValue = { fontSize: '16px', fontWeight: '700' as const, color: '#070710', margin: '0' }
const codeBox = { backgroundColor: '#070710', borderRadius: '4px', padding: '24px', textAlign: 'center' as const, margin: '0 0 24px' }
const codeLabel = { fontSize: '10px', letterSpacing: '3px', color: '#888888', margin: '0 0 8px', fontWeight: '600' as const }
const codeText = { fontSize: '28px', fontWeight: '800' as const, letterSpacing: '4px', color: '#00eeff', margin: '0' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const smallText = { fontSize: '13px', color: '#777777', lineHeight: '1.4', margin: '0 0 4px' }
const footer = { fontSize: '13px', color: '#999999', margin: '20px 0 4px', lineHeight: '1.5' }
const footerBrand = { fontSize: '12px', color: '#999999', margin: '0' }
