"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

// Define types for settings
type BusinessHours = {
  monday: { open: string; close: string; closed: boolean }
  tuesday: { open: string; close: string; closed: boolean }
  wednesday: { open: string; close: string; closed: boolean }
  thursday: { open: string; close: string; closed: boolean }
  friday: { open: string; close: string; closed: boolean }
  saturday: { open: string; close: string; closed: boolean }
  sunday: { open: string; close: string; closed: boolean }
}

type EmailTemplates = {
  bookingConfirmation: string
  paymentReminder: string
  bookingReminder: string
  customEmail: string
}

type TaxSettings = {
  enabled: boolean
  rate: number
  taxName: string
  taxNumber: string
}

type ApiKeys = {
  googleMaps: string
  // Add other API keys as needed
}

export default function SystemSettings() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("business-hours")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // State for each settings section
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "10:00", close: "14:00", closed: true },
    sunday: { open: "10:00", close: "14:00", closed: true },
  })

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplates>({
    bookingConfirmation: "",
    paymentReminder: "",
    bookingReminder: "",
    customEmail: "",
  })

  const [taxSettings, setTaxSettings] = useState<TaxSettings>({
    enabled: false,
    rate: 0,
    taxName: "",
    taxNumber: "",
  })

  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    googleMaps: "",
  })

  // Load settings from database
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // In a real app, you would fetch these from your database
        // const { data } = await supabase.from('settings').select('*')
        // Update states with fetched data
      } catch (error) {
        console.error("Error loading settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [toast])

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      // In a real app, you would save these to your database
      // await supabase.from('settings').upsert({
      //   businessHours,
      //   emailTemplates,
      //   taxSettings,
      //   apiKeys,
      //   updated_at: new Date().toISOString(),
      // })
      
      toast({
        title: "Success",
        description: "Settings saved successfully!",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDayToggle = (day: keyof BusinessHours) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        closed: !prev[day].closed,
      },
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={handleSaveSettings} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="business-hours" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business-hours" onClick={() => setActiveTab("business-hours")}>
            Business Hours
          </TabsTrigger>
          <TabsTrigger value="email-templates" onClick={() => setActiveTab("email-templates")}>
            Email Templates
          </TabsTrigger>
          <TabsTrigger value="tax-settings" onClick={() => setActiveTab("tax-settings")}>
            Tax Settings
          </TabsTrigger>
          <TabsTrigger value="api-keys" onClick={() => setActiveTab("api-keys")}>
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-hours">
          <BusinessHoursSettings 
            businessHours={businessHours} 
            onUpdateHours={setBusinessHours}
            onToggleDay={handleDayToggle}
          />
        </TabsContent>

        <TabsContent value="email-templates">
          <EmailTemplatesSettings 
            templates={emailTemplates} 
            onUpdateTemplates={setEmailTemplates} 
          />
        </TabsContent>

        <TabsContent value="tax-settings">
          <TaxSettings 
            settings={taxSettings} 
            onUpdateSettings={setTaxSettings} 
          />
        </TabsContent>

        <TabsContent value="api-keys">
          <ApiKeysSettings 
            apiKeys={apiKeys} 
            onUpdateKeys={setApiKeys} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Business Hours Component
function BusinessHoursSettings({ 
  businessHours, 
  onUpdateHours, 
  onToggleDay 
}: { 
  businessHours: BusinessHours
  onUpdateHours: (hours: BusinessHours) => void
  onToggleDay: (day: keyof BusinessHours) => void
}) {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ] as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Hours</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set your business hours for each day of the week.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {days.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 w-32">
              <input
                type="checkbox"
                id={key}
                checked={!businessHours[key].closed}
                onChange={() => onToggleDay(key)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={key} className="text-sm font-medium">
                {label}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Input
                  type="time"
                  value={businessHours[key].open}
                  onChange={(e) => 
                    onUpdateHours({
                      ...businessHours,
                      [key]: { ...businessHours[key], open: e.target.value },
                    })
                  }
                  disabled={businessHours[key].closed}
                  className="w-32"
                />
                <span>to</span>
                <Input
                  type="time"
                  value={businessHours[key].close}
                  onChange={(e) => 
                    onUpdateHours({
                      ...businessHours,
                      [key]: { ...businessHours[key], close: e.target.value },
                    })
                  }
                  disabled={businessHours[key].closed}
                  className="w-32"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {businessHours[key].closed ? 'Closed' : 'Open'}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Email Templates Component
function EmailTemplatesSettings({ 
  templates, 
  onUpdateTemplates 
}: { 
  templates: EmailTemplates
  onUpdateTemplates: (templates: EmailTemplates) => void 
}) {
  const templateOptions = [
    { key: 'bookingConfirmation', label: 'Booking Confirmation' },
    { key: 'paymentReminder', label: 'Payment Reminder' },
    { key: 'bookingReminder', label: 'Booking Reminder' },
    { key: 'customEmail', label: 'Custom Email' },
  ] as const

  const [activeTemplate, setActiveTemplate] = 
    useState<keyof EmailTemplates>('bookingConfirmation')
  const [templateContent, setTemplateContent] = useState('')

  // Update template content when active template changes
  useEffect(() => {
    setTemplateContent(templates[activeTemplate] || '')
  }, [activeTemplate, templates])

  const handleSaveTemplate = () => {
    onUpdateTemplates({
      ...templates,
      [activeTemplate]: templateContent,
    })
  }

  const availableVariables = {
    bookingConfirmation: ['{{customerName}}', '{{bookingId}}', '{{tourName}}', '{{bookingDate}}'],
    paymentReminder: ['{{customerName}}', '{{amountDue}}', '{{dueDate}}', '{{bookingLink}}'],
    bookingReminder: ['{{customerName}}', '{{tourName}}', '{{tourDate}}', '{{meetingPoint}}'],
    customEmail: ['{{customerName}}', '{{currentDate}}', '{{companyName}}'],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates</CardTitle>
        <p className="text-sm text-muted-foreground">
          Customize your email templates with the editor below.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="template-select">Select Template</Label>
          <select
            id="template-select"
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value as keyof EmailTemplates)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            {templateOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Label>Template Content</Label>
            <div className="text-sm text-muted-foreground">
              Available variables: {availableVariables[activeTemplate].join(', ')}
            </div>
          </div>
          <Textarea
            value={templateContent}
            onChange={(e) => setTemplateContent(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
            placeholder={`Enter your ${templateOptions.find(t => t.key === activeTemplate)?.label} template here...`}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveTemplate}>
            Save Template
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-md">
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="bg-white p-4 rounded border border-gray-200">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ 
              __html: templateContent 
                ? templateContent
                    .replace(/\{\{customerName\}\}/g, 'John Doe')
                    .replace(/\{\{bookingId\}\}/g, 'BK123456')
                    .replace(/\{\{tourName\}\}/g, 'Amboseli Safari')
                    .replace(/\{\{bookingDate\}\}/g, new Date().toLocaleDateString())
                    .replace(/\{\{amountDue\}\}/g, '$1,200')
                    .replace(/\{\{dueDate\}\}/g, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString())
                    .replace(/\{\{bookingLink\}\}/g, 'https://eika-africa.com/booking/BK123456')
                    .replace(/\{\{tourDate\}\}/g, new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString())
                    .replace(/\{\{meetingPoint\}\}/g, 'Nairobi Office, 123 Safari St')
                    .replace(/\{\{currentDate\}\}/g, new Date().toLocaleDateString())
                    .replace(/\{\{companyName\}\}/g, 'Eika Africa Experience')
                : '<p>Preview will appear here...</p>' 
            }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Tax Settings Component
function TaxSettings({ 
  settings, 
  onUpdateSettings 
}: { 
  settings: TaxSettings
  onUpdateSettings: (settings: TaxSettings) => void 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Settings</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure tax settings for your bookings.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enable-tax"
            checked={settings.enabled}
            onChange={(e) => 
              onUpdateSettings({ ...settings, enabled: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="enable-tax" className="text-sm font-medium">
            Enable tax calculation
          </label>
        </div>

        {settings.enabled && (
          <div className="space-y-4 pl-6">
            <div>
              <Label htmlFor="tax-name">Tax Name</Label>
              <Input
                id="tax-name"
                value={settings.taxName}
                onChange={(e) => 
                  onUpdateSettings({ ...settings, taxName: e.target.value })
                }
                placeholder="e.g., VAT, GST, Sales Tax"
                className="mt-1 max-w-md"
              />
            </div>

            <div>
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <div className="relative mt-1 max-w-xs">
                <Input
                  id="tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={settings.rate}
                  onChange={(e) => 
                    onUpdateSettings({ ...settings, rate: parseFloat(e.target.value) || 0 })
                  }
                  className="pl-3 pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="tax-number">Tax Registration Number (Optional)</Label>
              <Input
                id="tax-number"
                value={settings.taxNumber}
                onChange={(e) => 
                  onUpdateSettings({ ...settings, taxNumber: e.target.value })
                }
                placeholder="e.g., 123456789"
                className="mt-1 max-w-md"
              />
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Tax Calculation Example</h4>
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between py-1">
                  <span>Subtotal:</span>
                  <span>$1,000.00</span>
                </div>
                <div className="flex justify-between py-1 font-medium">
                  <span>{settings.taxName || 'Tax'} ({settings.rate}%):</span>
                  <span>${(1000 * (settings.rate / 100)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-t mt-2 pt-2 font-bold">
                  <span>Total:</span>
                  <span>${(1000 * (1 + settings.rate / 100)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// API Keys Component
function ApiKeysSettings({ 
  apiKeys, 
  onUpdateKeys 
}: { 
  apiKeys: ApiKeys
  onUpdateKeys: (keys: ApiKeys) => void 
}) {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (key: string) => {
    setShowKey(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleCopyKey = (key: string, value: string) => {
    navigator.clipboard.writeText(value)
    // Show copied tooltip or toast
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage your third-party API keys and integrations.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Google Maps API</h3>
          <p className="text-sm text-muted-foreground">
            Used for displaying maps and location services.
          </p>
          <div className="flex space-x-2 mt-2">
            <div className="relative flex-1">
              <Input
                type={showKey['googleMaps'] ? 'text' : 'password'}
                value={apiKeys.googleMaps}
                onChange={(e) => 
                  onUpdateKeys({ ...apiKeys, googleMaps: e.target.value })
                }
                placeholder="Enter your Google Maps API key"
                className="font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => toggleKeyVisibility('googleMaps')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                {showKey['googleMaps'] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyKey('googleMaps', apiKeys.googleMaps)}
              disabled={!apiKeys.googleMaps}
            >
              Copy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Get your API key from the{' '}
            <a 
              href="https://console.cloud.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
            . Make sure to restrict the API key to your domain.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">API Key Security</h3>
          <div className="bg-muted p-4 rounded-md space-y-2">
            <p className="text-sm">
              <strong>Important:</strong> Never share your API keys or commit them to version control.
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Use environment variables for production</li>
              <li>Restrict API keys to specific domains and IP addresses</li>
              <li>Rotate keys periodically</li>
              <li>Monitor usage for suspicious activity</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
