'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ColorPicker from '@/components/ui/ColorPicker';

export default function ColorsPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            {t('colors.title')}
          </h1>
          <p className="text-lg text-text-secondary">
            {t('colors.subtitle')}
          </p>
        </div>

        <div className="bg-background-primary border border-border-primary rounded-lg p-6 shadow-sm">
          <ColorPicker showAllPalettes={true} />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Colors Preview */}
          <div className="bg-background-secondary border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Primary Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded"></div>
                <span className="text-sm font-mono">primary-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded"></div>
                <span className="text-sm font-mono">primary-600</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-700 rounded"></div>
                <span className="text-sm font-mono">primary-700</span>
              </div>
            </div>
          </div>

          {/* Secondary Colors Preview */}
          <div className="bg-background-secondary border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Secondary Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-500 rounded"></div>
                <span className="text-sm font-mono">secondary-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-600 rounded"></div>
                <span className="text-sm font-mono">secondary-600</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-700 rounded"></div>
                <span className="text-sm font-mono">secondary-700</span>
              </div>
            </div>
          </div>

          {/* Accent Colors Preview */}
          <div className="bg-background-secondary border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Accent Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-500 rounded"></div>
                <span className="text-sm font-mono">accent-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-600 rounded"></div>
                <span className="text-sm font-mono">accent-600</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-700 rounded"></div>
                <span className="text-sm font-mono">accent-700</span>
              </div>
            </div>
          </div>

          {/* Status Colors Preview */}
          <div className="bg-background-secondary border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Status Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-500 rounded"></div>
                <span className="text-sm font-mono">success-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-500 rounded"></div>
                <span className="text-sm font-mono">warning-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-error-500 rounded"></div>
                <span className="text-sm font-mono">error-500</span>
              </div>
            </div>
          </div>

          {/* Special Colors Preview */}
          <div className="bg-background-secondary border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Special Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gold-500 rounded"></div>
                <span className="text-sm font-mono">gold-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded"></div>
                <span className="text-sm font-mono">purple-500</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-500 rounded"></div>
                <span className="text-sm font-mono">teal-500</span>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-background-secondary border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Usage Examples</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
                Primary Button
              </button>
              <button className="w-full px-4 py-2 bg-secondary-100 text-secondary-900 rounded hover:bg-secondary-200 transition-colors">
                Secondary Button
              </button>
              <div className="p-3 bg-success-100 border border-success-300 text-success-800 rounded text-sm">
                Success message example
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-background-secondary border border-border-primary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">How to Use</h3>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h4 className="font-medium text-text-primary mb-2">In Tailwind CSS:</h4>
              <pre className="bg-background-primary border border-border-primary rounded p-2 text-sm overflow-x-auto">
                <code>
{`className="bg-primary-500 text-white hover:bg-primary-600"`}
                </code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">In CSS:</h4>
              <pre className="bg-background-primary border border-border-primary rounded p-2 text-sm overflow-x-auto">
                <code>
{`background-color: var(--color-primary-500);`}
                </code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">In TypeScript:</h4>
              <pre className="bg-background-primary border border-border-primary rounded p-2 text-sm overflow-x-auto">
                <code>
{`import { colors } from '@/lib/colors';
const primaryColor = colors.primary[500];`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
