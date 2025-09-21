'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiSave, FiRefreshCw, FiGlobe, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES, SupportedLanguage, getLanguageDisplayName, getLanguageFlag } from '@/lib/multilingual';

interface TranslationSettings {
  isTranslatable: boolean;
  defaultLanguage: SupportedLanguage;
  enabledLanguages: SupportedLanguage[];
  autoTranslate: boolean;
  translationProvider: 'manual' | 'google' | 'azure' | 'openai';
  translationApiKey?: string;
}

const TranslationSettings: React.FC = () => {
  const { token } = useAuth();
  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<TranslationSettings>({
    isTranslatable: true,
    defaultLanguage: 'en',
    enabledLanguages: ['en', 'ar'],
    autoTranslate: false,
    translationProvider: 'manual',
    translationApiKey: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings/translation', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching translation settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings/translation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        alert('Translation settings saved successfully!');
      } else {
        alert('Error saving translation settings');
      }
    } catch (error) {
      console.error('Error saving translation settings:', error);
      alert('Error saving translation settings');
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageToggle = (language: SupportedLanguage) => {
    setSettings(prev => ({
      ...prev,
      enabledLanguages: prev.enabledLanguages.includes(language)
        ? prev.enabledLanguages.filter(lang => lang !== language)
        : [...prev.enabledLanguages, language]
    }));
  };

  const handleTranslatableToggle = () => {
    setSettings(prev => ({
      ...prev,
      isTranslatable: !prev.isTranslatable
    }));
  };

  const handleAutoTranslateToggle = () => {
    setSettings(prev => ({
      ...prev,
      autoTranslate: !prev.autoTranslate
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FiGlobe className="w-6 h-6 mr-2 text-blue-600" />
            Translation Settings
          </h2>
          <p className="text-gray-600">Configure multilingual content management</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchSettings}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center"
          >
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            {/* Enable Translation */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Enable Multilingual Content
                </label>
                <p className="text-xs text-gray-500">
                  Allow content to be translated into multiple languages
                </p>
              </div>
              <button
                onClick={handleTranslatableToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.isTranslatable ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.isTranslatable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Default Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Language
              </label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => setSettings(prev => ({ ...prev, defaultLanguage: e.target.value as SupportedLanguage }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>
                    {getLanguageFlag(lang)} {getLanguageDisplayName(lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto Translate */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auto Translate
                </label>
                <p className="text-xs text-gray-500">
                  Automatically translate content when adding new languages
                </p>
              </div>
              <button
                onClick={handleAutoTranslateToggle}
                disabled={!settings.isTranslatable}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoTranslate && settings.isTranslatable ? 'bg-blue-600' : 'bg-gray-200'
                } ${!settings.isTranslatable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoTranslate && settings.isTranslatable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Enabled Languages */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Enabled Languages</h3>
          <div className="space-y-2">
            {SUPPORTED_LANGUAGES.map(lang => (
              <div key={lang} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getLanguageFlag(lang)}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {getLanguageDisplayName(lang)}
                  </span>
                  <span className="text-xs text-gray-500">({lang})</span>
                </div>
                <button
                  onClick={() => handleLanguageToggle(lang)}
                  disabled={!settings.isTranslatable || (lang === settings.defaultLanguage && settings.enabledLanguages.length === 1)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    settings.enabledLanguages.includes(lang)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${
                    !settings.isTranslatable || (lang === settings.defaultLanguage && settings.enabledLanguages.length === 1)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {settings.enabledLanguages.includes(lang) ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Provider */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Translation Provider</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <select
                value={settings.translationProvider}
                onChange={(e) => setSettings(prev => ({ ...prev, translationProvider: e.target.value as any }))}
                disabled={!settings.autoTranslate}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="manual">Manual Translation</option>
                <option value="google">Google Translate</option>
                <option value="azure">Azure Translator</option>
                <option value="openai">OpenAI</option>
              </select>
            </div>

            {settings.translationProvider !== 'manual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={settings.translationApiKey || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, translationApiKey: e.target.value }))}
                  placeholder={`Enter ${settings.translationProvider} API key`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Statistics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Content Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Languages</span>
              <span className="text-sm font-medium">{settings.enabledLanguages.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Translation Status</span>
              <span className={`text-sm font-medium ${
                settings.isTranslatable ? 'text-green-600' : 'text-red-600'
              }`}>
                {settings.isTranslatable ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Auto Translate</span>
              <span className={`text-sm font-medium ${
                settings.autoTranslate ? 'text-green-600' : 'text-gray-600'
              }`}>
                {settings.autoTranslate ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationSettings;



