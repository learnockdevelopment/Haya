'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiSave, FiRefreshCw, FiDatabase, FiMail, FiShield, FiGlobe } from 'react-icons/fi';
import TranslationSettings from '@/components/admin/TranslationSettings';

import apiClient from '@/lib/apiClient';
const AdminSettingsPage: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'translation'>('general');
  const [settings, setSettings] = useState({
    siteName: 'Haya Travel',
    siteDescription: 'Your Digital Travel Platform',
    siteUrl: 'https://haya-travel.com',
    adminEmail: 'admin@haya-travel.com',
    supportEmail: 'support@haya-travel.com',
    maxFileSize: '10',
    allowedFileTypes: 'jpg,jpeg,png,gif,webp',
    enableRegistration: true,
    enableEmailVerification: false,
    enableTwoFactor: false,
    maintenanceMode: false,
    defaultLanguage: 'en',
    timezone: 'UTC',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would typically save to your database
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        siteName: 'Haya Travel',
        siteDescription: 'Your Digital Travel Platform',
        siteUrl: 'https://haya-travel.com',
        adminEmail: 'admin@haya-travel.com',
        supportEmail: 'support@haya-travel.com',
        maxFileSize: '10',
        allowedFileTypes: 'jpg,jpeg,png,gif,webp',
        enableRegistration: true,
        enableEmailVerification: false,
        enableTwoFactor: false,
        maintenanceMode: false,
        defaultLanguage: 'en',
        timezone: 'UTC',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">Manage system settings and configuration</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center"
          >
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            General Settings
          </button>
          <button
            onClick={() => setActiveTab('translation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'translation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Translation Settings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiGlobe className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Description
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site URL
              </label>
              <input
                type="url"
                name="siteUrl"
                value={settings.siteUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select
                  name="defaultLanguage"
                  value={settings.defaultLanguage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="SAR">SAR</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiMail className="w-5 h-5 mr-2 text-green-600" />
            <h2 className="text-lg font-semibold">Email Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableEmailVerification"
                  checked={settings.enableEmailVerification}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Enable Email Verification</span>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiShield className="w-5 h-5 mr-2 text-red-600" />
            <h2 className="text-lg font-semibold">Security Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableRegistration"
                  checked={settings.enableRegistration}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Enable User Registration</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableTwoFactor"
                  checked={settings.enableTwoFactor}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Maintenance Mode</span>
              </label>
            </div>
          </div>
        </div>

        {/* File Upload Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiDatabase className="w-5 h-5 mr-2 text-purple-600" />
            <h2 className="text-lg font-semibold">File Upload Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max File Size (MB)
              </label>
              <input
                type="number"
                name="maxFileSize"
                value={settings.maxFileSize}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allowed File Types
              </label>
              <input
                type="text"
                name="allowedFileTypes"
                value={settings.allowedFileTypes}
                onChange={handleInputChange}
                placeholder="jpg,jpeg,png,gif,webp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Dubai">Dubai</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Format
                </label>
                <select
                  name="dateFormat"
                  value={settings.dateFormat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Translation Settings Tab */}
      {activeTab === 'translation' && (
        <TranslationSettings />
      )}
    </div>
  );
};

export default AdminSettingsPage;
