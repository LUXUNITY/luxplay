/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'LuxPlay'

const DelayNoticeEmail = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Important update from the LuxPlay team — opening dates</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>🎮 LUXPLAY</Text>

        <Heading style={h1}>An important update</Heading>

        <Text style={text}>Dear Customer,</Text>

        <Text style={text}>
          It is with a heavy heart that we must announce a short delay to the opening
          of the soft play section at {SITE_NAME}.
        </Text>

        <Text style={text}>
          In addition, we have made the difficult decision to move the arcade opening
          to <strong>Monday 25th May Bank Holiday</strong> to ensure we can deliver the
          best possible experience for everyone attending.
        </Text>

        <Text style={text}>
          We have worked around the clock to have everything ready in time. However,
          in taking the extra time needed to make LuxPlay as perfect, safe, and
          enjoyable as possible, we have unfortunately fallen behind our original
          schedule.
        </Text>

        <Section style={highlight}>
          <Text style={highlightLabel}>AS A THANK-YOU FOR YOUR PATIENCE</Text>
          <Text style={highlightValue}>£10 ARCADE CREDIT BONUS</Text>
          <Text style={highlightSub}>Added to every affected customer automatically</Text>
        </Section>

        <Text style={text}>
          More arcade machines are also still yet to arrive, and we are incredibly
          excited for everyone to experience what we are building.
        </Text>

        <Hr style={hr} />

        <Section style={datesBox}>
          <Text style={dateLabel}>ARCADE OPENS</Text>
          <Text style={dateValue}>Monday 25th May (Bank Holiday)</Text>
        </Section>

        <Section style={datesBox}>
          <Text style={dateLabel}>SOFT PLAY OPENS</Text>
          <Text style={dateValue}>Saturday 30th May</Text>
        </Section>

        <Hr style={hr} />

        <Text style={text}>
          We sincerely apologise for this delay and fully understand the
          disappointment this may cause. Creating something special for the community
          means everything to us, and we simply do not want to rush something this
          important before it is truly ready.
        </Text>

        <Text style={text}>
          <strong>If you are happy to wait</strong> for the new opening dates, your
          booking and bonuses will remain fully valid automatically — there is nothing
          you need to do.
        </Text>

        <Text style={text}>
          <strong>If you would prefer to discuss your booking or request a refund</strong>,
          please simply reply directly to this email and our team will assist you as
          soon as possible.
        </Text>

        <Text style={text}>
          {SITE_NAME} will continue to keep everyone updated regarding the opening of
          the soft play section.
        </Text>

        <Text style={text}>
          Thank you again for your patience, support, and understanding — it truly
          means the world to us.
        </Text>

        <Text style={footer}>Kind regards,</Text>
        <Text style={footerBrand}>The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DelayNoticeEmail,
  subject: 'Important update from LuxPlay — opening dates',
  displayName: 'Opening delay notice',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Montserrat', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '560px', margin: '0 auto' }
const logo = { fontSize: '18px', fontWeight: '800' as const, letterSpacing: '4px', color: '#00eeff', textAlign: 'center' as const, margin: '0 0 25px' }
const h1 = { fontSize: '24px', fontWeight: '700' as const, color: '#070710', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.65', margin: '0 0 16px' }
const highlight = { backgroundColor: '#0a0a16', borderRadius: '4px', padding: '20px', textAlign: 'center' as const, margin: '20px 0' }
const highlightLabel = { fontSize: '10px', letterSpacing: '3px', color: '#aaff00', margin: '0 0 6px', fontWeight: '700' as const }
const highlightValue = { fontSize: '22px', fontWeight: '800' as const, letterSpacing: '2px', color: '#ffffff', margin: '0 0 6px' }
const highlightSub = { fontSize: '11px', color: '#cccccc', margin: '0' }
const datesBox = { backgroundColor: '#f0fafe', borderRadius: '4px', padding: '14px', textAlign: 'center' as const, margin: '0 0 12px' }
const dateLabel = { fontSize: '10px', letterSpacing: '3px', color: '#888', margin: '0 0 4px', fontWeight: '600' as const }
const dateValue = { fontSize: '16px', fontWeight: '700' as const, color: '#070710', margin: '0' }
const hr = { borderColor: '#eeeeee', margin: '24px 0' }
const footer = { fontSize: '14px', color: '#444', margin: '24px 0 4px' }
const footerBrand = { fontSize: '14px', color: '#070710', fontWeight: '700' as const, margin: '0' }
