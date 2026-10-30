/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as redemptionCode } from './redemption-code.tsx'
import { template as softplayBooking } from './softplay-booking.tsx'
import { template as adminPurchaseNotification } from './admin-purchase-notification.tsx'
import { template as delayNotice } from './delay-notice.tsx'
import { template as bookingContact } from './booking-contact.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'redemption-code': redemptionCode,
  'softplay-booking': softplayBooking,
  'admin-purchase-notification': adminPurchaseNotification,
  'delay-notice': delayNotice,
  'booking-contact': bookingContact,
}
