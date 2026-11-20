/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <style>{darkModeCss}</style>
    </Head>
    <Preview>You've been invited to join {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://luxplay.uk/icon-512.png" width="72" height="72" alt="LUXPLAY" style={{ borderRadius: '16px', margin: '0 0 20px' }} />
        <Heading style={h1}>You've been invited</Heading>
        <Text style={text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          . Click the button below to accept the invitation and create your
          account.
        </Text>
        <Button className="dm-btn" style={button} href={confirmationUrl}>
          Accept Invitation
        </Button>
        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this
          email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: "Montserrat, 'Trebuchet MS', Arial, sans-serif" }
const container = { padding: '20px 25px' }
const h1 = {
  fontSize: '26px',
  fontWeight: 900 as const,
  color: '#B026FF',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#333344',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const link = { color: 'inherit', textDecoration: 'underline' }
const button = {
  backgroundColor: '#FF10F0',
  color: '#070710',
  fontSize: '16px',
  fontWeight: 800 as const,
  border: '2px solid #070710',
  borderRadius: '999px',
  padding: '14px 28px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
// Rendered as a text child, which React may HTML-escape: keep this CSS free of >, &, and quotes.
const darkModeCss = `
  @media (prefers-color-scheme: dark) {
    .dm-btn { background-color: #FF10F0 !important; color: #070710 !important; }
  }
  [data-ogsc] .dm-btn { background-color: #FF10F0 !important; color: #070710 !important; }
  [data-ogsb] .dm-btn { background-color: #FF10F0 !important; color: #070710 !important; }
`
