'use client'
import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash, FaPaperPlane, FaSave } from 'react-icons/fa'
import { useGetEmailSettingsQuery, useUpdateEmailSettingsMutation, useTestEmailSettingsMutation } from '@/lib/redux/apiSlice'
import type { EmailSettings, UpdateEmailSettingsRequest, TestEmailRequest } from '@/lib/types/admin'

const EmailSettings = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'settings' | 'test'>('settings')
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [testMessage, setTestMessage] = useState('')
  
  const [formData, setFormData] = useState<UpdateEmailSettingsRequest>({
    host: '',
    port: 587,
    username: '',
    password: '',
    from_address: '',
    from_name: '',
    encryption: 'tls',
    is_active: false,
    mail_driver: 'smtp',
  })

  const [testData, setTestData] = useState<TestEmailRequest>({
    to_email: '',
    subject: 'Test Email from Admin Panel',
    message: 'This is a test email to verify your email settings are working correctly.'
  })

  // Fetch email settings
  const { data: emailSettingsData, isLoading, error, refetch } = useGetEmailSettingsQuery(undefined)
  const [updateEmailSettings] = useUpdateEmailSettingsMutation()
  const [testEmailSettings] = useTestEmailSettingsMutation()

  // Update form data when settings are fetched
  useEffect(() => {
    if (emailSettingsData?.data) {
      const settings = emailSettingsData.data
      console.log(settings.is_active)
      setFormData({
        host: settings.host || '',
        port: settings.port || 587,
        username: settings.username || '',
        password: settings.password || '',
        from_address: settings.from_address || '',
        from_name: settings.from_name || '',
        encryption: settings.encryption || 'tls',
        is_active: settings.is_active || '',
        mail_driver: settings.mail_driver || 'smtp'
      })
    }
  }, [emailSettingsData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? String(value) : value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage('')
    setErrorMessage('')
    
    try {
      const res = await updateEmailSettings(formData).unwrap()
      if (res.success) {
        setSuccessMessage('Email settings saved successfully!')
        refetch()
      }
    } catch (error: any) {
      console.error('Failed to save email settings:', error)
      setErrorMessage(error?.data?.message || 'Failed to save email settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setTesting(true)
    setTestMessage('')
    
    try {
      const res = await testEmailSettings(testData).unwrap()
      if (res.success) {
        setTestMessage('Test email sent successfully! Check the recipient inbox.')
      } else {
        setTestMessage('Failed to send test email: ' + (res.message || 'Unknown error'))
      }
    } catch (error: any) {
      console.error('Failed to send test email:', error)
      setTestMessage('Failed to send test email: ' + (error?.data?.message || 'Unknown error'))
    } finally {
      setTesting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> Failed to load email settings. Please try again.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Email Settings</h2>
        <p className="text-gray-600 mt-1">Configure SMTP settings for automated customer emails</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'settings', label: 'SMTP Configuration', icon: FaSave },
            { id: 'test', label: 'Test Email', icon: FaPaperPlane }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'settings' | 'test')}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Success and Error Messages */}
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {successMessage}
                </div>
              )}
              
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* SMTP Configuration */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">SMTP Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host *
                      </label>
                      <input
                        type="text"
                        name="host"
                        value={formData.host}
                        onChange={handleInputChange}
                        placeholder="e.g., smtp.gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port *
                      </label>
                      <input
                        type="number"
                        name="port"
                        value={formData.port}
                        onChange={handleInputChange}
                        placeholder="587"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username *
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="your-email@gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Your email password or app password"
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Encryption *
                      </label>
                      <select
                        name="encryption"
                        value={formData.encryption}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="none">None</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Driver *
                      </label>
                      <select
                        name="mail_driver"
                        value={formData.mail_driver}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="smtp">SMTP</option>
                        <option value="mail">Mail</option>
                        <option value="sendmail">Sendmail</option>
                        <option value="log">Log</option> 
                      </select>
                    </div>
                  </div>
                </div>

                {/* From Email Configuration */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">From Email Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Email *
                      </label>
                      <input
                        type="email"
                        name="from_address"
                        value={formData.from_address}
                        onChange={handleInputChange}
                        placeholder="noreply@yourcompany.com"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name *
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      Enable email sending
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    When enabled, the system will send automated emails to customers
                  </p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <FaSave size={16} />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'test' && (
            <div className="space-y-6">
              {/* Test Message */}
              {testMessage && (
                <div className={`px-4 py-3 rounded ${
                  testMessage.includes('successfully') 
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'
                }`}>
                  {testMessage}
                </div>
              )}

              <form onSubmit={handleTestEmail} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Send Test Email</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Send a test email to verify your SMTP configuration is working correctly.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Email *
                      </label>
                      <input
                        type="email"
                        name="to_email"
                        value={testData.to_email}
                        onChange={handleTestInputChange}
                        placeholder="test@example.com"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={testData.subject}
                        onChange={handleTestInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={testData.message}
                        onChange={handleTestInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div> */}
                  </div>
                </div>

                {/* Test Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={testing || !formData.is_active}
                    className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <FaPaperPlane size={16} />
                    {testing ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>
                
                {!formData.is_active && (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <strong>Note:</strong> Email sending is currently disabled. Enable it in the SMTP Configuration tab to send test emails.
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailSettings 