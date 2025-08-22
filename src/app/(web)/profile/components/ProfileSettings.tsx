'use client'
import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useGetUserProfileQuery, useUpdateUserBioDataMutation, useUpdateUserAddressMutation, useChangePasswordMutation, useGetUserPreferencesQuery, useUpdateUserPreferencesMutation } from '@/lib/redux/apiSlice'
import type { UserProfile, UpdateBioDataRequest, UpdateAddressRequest, ChangePasswordRequest, UserPreferences, UpdatePreferencesRequest } from '@/lib/types/user'



const ProfileSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile')
  const [savingBioData, setSavingBioData] = useState(false)
  const [savingAddress, setSavingAddress] = useState(false)
  const [savingPreferences, setSavingPreferences] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: false,
    smsNotifications: false,
    marketingEmails: false
  })

  // Fetch user profile from backend
  const { data: profileData, isLoading, error ,refetch:refetchProfile} = useGetUserProfileQuery(undefined)
 // const { data: preferencesData, isLoading: preferencesLoading, refetch: refetchPreferences } = useGetUserPreferencesQuery(undefined)
  const [updateBioData] = useUpdateUserBioDataMutation()
  const [updateAddress] = useUpdateUserAddressMutation()
  const [changePassword] = useChangePasswordMutation()
  const [updatePreferences] = useUpdateUserPreferencesMutation()

  console.log("profileData", profileData) 
  // Update form data when profile is fetched
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data.user
      setFormData(prev => ({
        ...prev,
        firstName: profile.name.split(' ')[0] || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone_number || '',
        street: profile.street || '',
        city: profile.city || '',
        state: profile.state || '',
        zipCode: profile.zip || '',
        country: profile.country || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        emailNotifications: profile.email_notifications || false,
        smsNotifications: profile.sms_notifications || false,
        marketingEmails: profile.marketing_notifications || false
      }))
    }
  }, [profileData])

  // Update preferences when preferences data is fetched

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleBioDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingBioData(true)
    
    try {
      const bioData: UpdateBioDataRequest = {
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone
      }
      
      await updateBioData(bioData).unwrap()
      console.log('Bio data updated successfully')
    } catch (error) {
      console.error('Failed to update bio data:', error)
    } finally {
      setSavingBioData(false)
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingAddress(true)
    
    try {
      const addressData: UpdateAddressRequest = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country
      }
      
     const res = await updateAddress(addressData).unwrap()
     if(res.success){
      refetchProfile()
       console.log("res", res)
      console.log('Address updated successfully')
     }
    
    } catch (error) {
      console.error('Failed to update address:', error)
    } finally {
      setSavingAddress(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingPassword(true)
    setPasswordError('')
    setPasswordSuccess('')
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('New password and confirm password do not match')
      setSavingPassword(false)
      return
    }
    
    if (formData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long')
      setSavingPassword(false)
      return
    }
    
    try {
      const passwordData: ChangePasswordRequest = {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword
      }
      
      const res = await changePassword(passwordData).unwrap()
      if (res.success) {
        setPasswordSuccess('Password changed successfully!')
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
        console.log('Password changed successfully')
      }
    } catch (error: any) {
      console.error('Failed to change password:', error)
      setPasswordError(error?.data?.message || 'Failed to change password. Please try again.')
    } finally {
      setSavingPassword(false)
    }
  }

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingPreferences(true)
    
    try {
      const preferencesData: UpdatePreferencesRequest = {
        email_notifications: formData.emailNotifications,
        sms_notifications: formData.smsNotifications,
        marketing_emails: formData.marketingEmails
      }
      
      const res = await updatePreferences(preferencesData).unwrap()
      if (res.success) {
        refetchProfile()
        console.log('Preferences updated successfully')
      }
    } catch (error) {
      console.error('Failed to update preferences:', error)
    } finally {
      setSavingPreferences(false)
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
        <strong>Error:</strong> Failed to load profile data. Please try again.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Settings Navigation */}
      <div className="bg-white shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'profile', label: 'Profile Information' },
            { id: 'security', label: 'Security' },
            { id: 'preferences', label: 'Preferences' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Bio Data Form */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <form onSubmit={handleBioDataSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        disabled={true}
                        type="email"
                        name="email"
                        value={formData.email}
                       // onChange={handleInputChange}
                        className="w-full text-gray-500 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={savingBioData}
                      className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {savingBioData ? 'Saving...' : 'Save Bio Data'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Address Form */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                <form onSubmit={handleAddressSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={savingAddress}
                      className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {savingAddress ? 'Saving...' : 'Save Address'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Change Password</h3>
                <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
              </div>
              
              <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Error and Success Messages */}
              {passwordError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {passwordError}
                </div>
              )}
              
              {passwordSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {passwordSuccess}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {isLoading && (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}
              
              <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive order updates via email</p>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive order updates via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={formData.smsNotifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Marketing Emails</h4>
                    <p className="text-sm text-gray-600">Receive promotional emails and offers</p>
                  </div>
                  <input
                    type="checkbox"
                    name="marketingEmails"
                    checked={formData.marketingEmails}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPreferences}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {savingPreferences ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings 