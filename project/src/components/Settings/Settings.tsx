import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Download,
  Upload,
  Database
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Settings() {
  const { auth } = useAuth();

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: <User className="text-blue-600" size={20} />,
      items: [
        { label: 'Personal Information', description: 'Update your name, email, and profile picture' },
        { label: 'Password & Security', description: 'Change your password and enable 2FA' },
        { label: 'Account Preferences', description: 'Manage your account settings' },
      ]
    },
    {
      title: 'Notifications',
      icon: <Bell className="text-green-600" size={20} />,
      items: [
        { label: 'Email Notifications', description: 'Configure which emails you receive' },
        { label: 'Push Notifications', description: 'Manage browser and mobile notifications' },
        { label: 'Task Reminders', description: 'Set up automatic task deadline reminders' },
      ]
    },
    {
      title: 'Privacy & Permissions',
      icon: <Shield className="text-purple-600" size={20} />,
      items: [
        { label: 'Role Management', description: 'View and manage user roles and permissions' },
        { label: 'Data Privacy', description: 'Control how your data is used and shared' },
        { label: 'Activity Log', description: 'View your recent activity and access history' },
      ]
    },
    {
      title: 'Appearance',
      icon: <Palette className="text-orange-600" size={20} />,
      items: [
        { label: 'Theme Settings', description: 'Choose between light, dark, or auto theme' },
        { label: 'Display Options', description: 'Customize the interface layout and density' },
        { label: 'Language & Region', description: 'Set your preferred language and timezone' },
      ]
    },
    {
      title: 'Data Management',
      icon: <Database className="text-red-600" size={20} />,
      items: [
        { label: 'Export Data', description: 'Download your projects, tasks, and activity data' },
        { label: 'Import Data', description: 'Import data from other project management tools' },
        { label: 'Data Retention', description: 'Manage how long your data is stored' },
      ]
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xl">
              {auth.user?.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{auth.user?.name}</h3>
            <p className="text-gray-600">{auth.user?.email}</p>
            <span className="inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200 capitalize">
              {auth.user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              {section.icon}
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
            </div>
            
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Demo Note */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Globe className="text-yellow-600 mt-1" size={20} />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Demo Application</h4>
            <p className="text-sm text-yellow-700 mt-1">
              This is a demonstration of the Project Management Tool. In a production environment, 
              these settings would be fully functional and connected to a backend API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}