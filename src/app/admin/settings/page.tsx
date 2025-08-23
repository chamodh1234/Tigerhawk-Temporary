'use client'
import React, { useState } from 'react'
import { FaEnvelope, FaCog, FaShieldAlt } from 'react-icons/fa'
import EmailSettings from './components/EmailSettings'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'general' | 'security'>('email')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system configuration and preferences</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'email', label: 'Email Settings', icon: FaEnvelope },
            { id: 'general', label: 'General Settings', icon: FaCog },
            { id: 'security', label: 'Security Settings', icon: FaShieldAlt }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'email' | 'general' | 'security')}
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
          {activeTab === 'email' && <EmailSettings />}
          
          {activeTab === 'general' && (
            <div className="text-center py-12">
              <FaCog size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">General Settings</h3>
              <p className="text-gray-600">General settings configuration will be available soon.</p>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="text-center py-12">
              <FaShieldAlt size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
              <p className="text-gray-600">Security settings configuration will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 