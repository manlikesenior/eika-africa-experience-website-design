// Business Hours
export type BusinessHours = {
  monday: { open: string; close: string; closed: boolean }
  tuesday: { open: string; close: string; closed: boolean }
  wednesday: { open: string; close: string; closed: boolean }
  thursday: { open: string; close: string; closed: boolean }
  friday: { open: string; close: string; closed: boolean }
  saturday: { open: string; close: string; closed: boolean }
  sunday: { open: string; close: string; closed: boolean }
}

// Email Templates
export type EmailTemplates = {
  bookingConfirmation: string
  paymentReminder: string
  bookingReminder: string
  customEmail: string
}

// Tax Settings
export type TaxSettings = {
  enabled: boolean
  rate: number
  taxName: string
  taxNumber: string
}

// API Keys
export type ApiKeys = {
  googleMaps: string
  // Add other API keys as needed
}

// Main Settings Type
export type SystemSettings = {
  businessHours: BusinessHours
  emailTemplates: EmailTemplates
  taxSettings: TaxSettings
  apiKeys: ApiKeys
  updatedAt?: string
}
