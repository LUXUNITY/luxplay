/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "LuxPlay"

interface AdminPurchaseNotificationProps {
  type?: string
  customerEmail?: string
  packageName?: string
  credits?: number
  amountPaid?: string
  redemptionCode?: string
  childName?: string
  parentName?: string
  sessionTime?: string
  sessionDate?: string
  bookingCode?: string
}

const AdminPurchaseNotificationEmail = ({
  type,
  customerEmail,
  packageName,
  credits,
  amountPaid,
  redemptionCode,
  childName,
  parentName,
  sessionTime,
  sessionDate,
  bookingCode,
}: AdminPurchaseNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      {type === 'softplay'
        ? `New soft play booking — ${childName || 'Unknown'}`
        : `New purchase — ${packageName || 'Unknown'} package`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>🎮 LUXPLAY — ADMIN</Text>

        <Heading style={h1}>
          {type === 'softplay' ? '🎉 New Soft Play Booking' : '💰 New Credit Package Sale'}
        </Heading>

        <Section style={detailsBox}>
          {type === 'softplay' ? (
            <>
              <Text style={detailRow}><strong>Child:</strong> {childName || 'N/A'}</Text>
              <Text style={detailRow}><strong>Parent:</strong> {parentName || 'N/A'}</Text>
              <Text style={detailRow}><strong>Email:</strong> {customerEmail || 'N/A'}</Text>
              <Text style={detailRow}><strong>Session:</strong> {sessionTime || 'N/A'} — {sessionDate || 'N/A'}</Text>
              <Text style={detailRow}><strong>Booking Code:</strong> {bookingCode || 'N/A'}</Text>
              <Text style={detailRow}><strong>Amount:</strong> {amountPaid || '£2.50'}</Text>
            </>
          ) : (
            <>
              <Text style={detailRow}><strong>Package:</strong> {packageName || 'N/A'}</Text>
              <Text style={detailRow}><strong>Credits:</strong> {credits || 'N/A'}</Text>
              <Text style={detailRow}><strong>Email:</strong> {customerEmail || 'N/A'}</Text>
              <Text style={detailRow}><strong>Redemption Code:</strong> {redemptionCode || 'N/A'}</Text>
              <Text style={detailRow}><strong>Amount:</strong> {amountPaid || 'N/A'}</Text>
            </>
          )}
        </Section>

        <Hr style={hr} />

        <Text style={footer}>This is an automated notification from {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminPurchaseNotificationEmail,
  subject: (data: Record<string, any>) =>
    data.type === 'softplay'
      ? `New Soft Play Booking — ${data.childName || 'Unknown'}`
      : `New Sale — ${data.packageName || 'Unknown'} Package`,
  displayName: 'Admin purchase notification',
  previewData: {
    type: 'credits',
    customerEmail: 'customer@example.com',
    packageName: 'Champion',
    credits: 350,
    amountPaid: '£25.00',
    redemptionCode: 'LUX-AB3K-7MNP',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '500px', margin: '0 auto' }
const logo = { fontSize: '16px', fontWeight: '800' as const, letterSpacing: '4px', color: '#ff00cc', textAlign: 'center' as const, margin: '0 0 25px' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#070710', margin: '0 0 20px', textAlign: 'center' as const }
const detailsBox = { backgroundColor: '#f8f8fa', borderRadius: '4px', padding: '20px', margin: '0 0 20px' }
const detailRow = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 6px' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', textAlign: 'center' as const }
