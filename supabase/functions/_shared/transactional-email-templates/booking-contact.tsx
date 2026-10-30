import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const BookingContact = ({ parentName, message }: { parentName: string; message: string }) => (
  <Html lang="en"><Head /><Preview>Important information about your LuxPlay booking</Preview>
    <Body><Container>
      <Heading>LUXPLAY — Booking update</Heading>
      <Text>Hi {parentName},</Text>
      <Text>{message}</Text>
      <Text>Please email <a href="mailto:luxplayuk@gmail.com">luxplayuk@gmail.com</a> so our team can help arrange a suitable alternative.</Text>
      <Text>We’re sorry for the inconvenience. The LuxPlay team</Text>
    </Container></Body>
  </Html>
)

export const template = {
  component: BookingContact,
  subject: 'Important update about your LuxPlay soft play booking',
  displayName: 'Booking contact',
} satisfies TemplateEntry