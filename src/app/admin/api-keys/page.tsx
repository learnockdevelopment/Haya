'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import apiClient from '@/lib/apiClient';
import { FiKey, FiCopy, FiRefreshCw, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';

interface ApiKeyConfig {
  enabled: boolean;
  key: string;
  headerName: string;
  allowedRoutes: string[];
  excludedRoutes: string[];
}

const ApiKeyManagement: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [config, setConfig] = useState<ApiKeyConfig>({
    enabled: false,
    key: '',
    headerName: 'x-api-key',
    allowedRoutes: [],
    excludedRoutes: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const data = await apiClient.get('/api/admin/settings/api-keys', {
        requireAuth: true,
        token,
      });
      setConfig(data.config);
    } catch (error) {
      console.error('Error fetching API key config:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    try {
      setSaving(true);
      const data = await apiClient.post('/api/admin/settings/api-keys/generate', {}, {
        requireAuth: true,
        token,
      });
      setConfig(prev => ({ ...prev, key: data.key }));
      setMessage('New API key generated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error generating API key:', error);
      setMessage('Error generating API key');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = async () => {
    try {
      setSaving(true);
      await apiClient.put('/api/admin/settings/api-keys', config, {
        requireAuth: true,
        token,
      });
      setMessage('API key configuration updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating config:', error);
      setMessage('Error updating configuration');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(config.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const addRoute = (type: 'allowed' | 'excluded') => {
    const newRoute = prompt('Enter route path (e.g., /api/tours):');
    if (newRoute) {
      setConfig(prev => ({
        ...prev,
        [type === 'allowed' ? 'allowedRoutes' : 'excludedRoutes']: [
          ...prev[type === 'allowed' ? 'allowedRoutes' : 'excludedRoutes'],
          newRoute
        ]
      }));
    }
  };

  const removeRoute = (type: 'allowed' | 'excluded', index: number) => {
    setConfig(prev => ({
      ...prev,
      [type === 'allowed' ? 'allowedRoutes' : 'excludedRoutes']: 
        prev[type === 'allowed' ? 'allowedRoutes' : 'excludedRoutes'].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Key Management</h1>
          <p className="text-gray-600">Manage API key configuration and security settings</p>
        </div>
        <Button
          onClick={updateConfig}
          disabled={saving}
          className="flex items-center"
        >
          {saving ? (
            <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FiKey className="w-4 h-4 mr-2" />
          )}
          {saving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Key Configuration */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Key Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enabled"
                checked={config.enabled}
                onChange={(e) => setConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="enabled" className="ml-2 text-sm font-medium text-gray-700">
                Enable API Key Validation
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Name
              </label>
              <input
                type="text"
                value={config.headerName}
                onChange={(e) => setConfig(prev => ({ ...prev, headerName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="x-api-key"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <div className="flex">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={config.key}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  {showKey ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-r-md"
                >
                  {copied ? <FiCheck className="w-4 h-4 text-green-600" /> : <FiCopy className="w-4 h-4" />}
                </button>
              </div>
              <Button
                onClick={generateNewKey}
                disabled={saving}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </div>
          </div>
        </div>

        {/* Route Configuration */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Configuration</h2>
          
          <div className="space-y-6">
            {/* Allowed Routes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Allowed Routes
                </label>
                <Button
                  onClick={() => addRoute('allowed')}
                  size="sm"
                  variant="outline"
                >
                  Add Route
                </Button>
              </div>
              <div className="space-y-2">
                {config.allowedRoutes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className="text-sm text-gray-700">{route}</span>
                    <button
                      onClick={() => removeRoute('allowed', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {config.allowedRoutes.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No allowed routes configured</p>
                )}
              </div>
            </div>

            {/* Excluded Routes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Excluded Routes
                </label>
                <Button
                  onClick={() => addRoute('excluded')}
                  size="sm"
                  variant="outline"
                >
                  Add Route
                </Button>
              </div>
              <div className="space-y-2">
                {config.excludedRoutes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className="text-sm text-gray-700">{route}</span>
                    <button
                      onClick={() => removeRoute('excluded', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {config.excludedRoutes.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No excluded routes configured</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Usage Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Header Name:</strong> {config.headerName}</p>
          <p><strong>API Key:</strong> {config.key ? '••••••••••••••••' : 'Not set'}</p>
          <p><strong>Example Request:</strong></p>
          <pre className="bg-blue-100 p-3 rounded text-xs overflow-x-auto">
{`curl -H "${config.headerName}: ${config.key}" \\
  http://localhost:3000/api/tours`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManagement;

