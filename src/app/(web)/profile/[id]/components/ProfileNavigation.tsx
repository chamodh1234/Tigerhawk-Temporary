'use client'
import React from 'react'

interface Tab {
  id: string
  label: string
}

interface ProfileNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: <T extends string>(tab: T) => void
}

const ProfileNavigation = ({ tabs, activeTab, onTabChange }: ProfileNavigationProps) => {
  return (
    <div className="flex justify-center">
      <nav className="flex space-x-1 bg-white shadow-sm border border-gray-200 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-6 py-3 text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProfileNavigation 