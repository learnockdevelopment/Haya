'use client';

import React, { useState } from 'react';
import { apiClient } from '@/lib/apiClient';

const TestTourCreation: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testCreateTour = async () => {
    setLoading(true);
    setResult('Testing tour creation...');

    try {
      const tourData = {
        title: {
          en: 'Test Tour',
          ar: 'جولة تجريبية'
        },
        description: {
          en: 'This is a test tour description',
          ar: 'هذا وصف جولة تجريبية'
        },
        shortDescription: {
          en: 'Short test description',
          ar: 'وصف مختصر للاختبار'
        },
        price: 1000,
        duration: 5,
        category: '507f1f77bcf86cd799439011', // Random ObjectId
        type: '507f1f77bcf86cd799439012', // Random ObjectId
        source: '507f1f77bcf86cd799439013', // Random ObjectId
        destination: '507f1f77bcf86cd799439014', // Random ObjectId
        difficulty: 'easy',
        maxGroupSize: 20,
        minGroupSize: 2,
        highlights: {
          en: ['Test highlight 1', 'Test highlight 2'],
          ar: ['نقطة مميزة 1', 'نقطة مميزة 2']
        },
        inclusions: {
          en: ['Included 1', 'Included 2'],
          ar: ['مشمول 1', 'مشمول 2']
        },
        exclusions: {
          en: ['Not included 1'],
          ar: ['غير مشمول 1']
        },
        requirements: ['Requirement 1', 'Requirement 2'],
        tags: ['tag1', 'tag2'],
        departureDate: new Date('2024-06-01'),
        returnDate: new Date('2024-06-05'),
        cancellationPolicy: 'Free cancellation up to 24 hours',
        isActive: true,
        isFeatured: false
      };

      const response = await apiClient.post('/api/admin/tours', tourData, {
        requireAuth: true,
        token: 'test-token' // This will fail auth but we can see the API response
      });

      setResult(`✅ Success: ${JSON.stringify(response, null, 2)}`);
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`);
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testGetCategories = async () => {
    setLoading(true);
    setResult('Testing categories API...');

    try {
      const response = await apiClient.get('/api/admin/categories');
      setResult(`✅ Categories: ${JSON.stringify(response, null, 2)}`);
    } catch (error: any) {
      setResult(`❌ Categories Error: ${error.message}`);
      console.error('Categories error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Tour Creation Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testGetCategories}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Categories API
          </button>
          
          <button
            onClick={testCreateTour}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Tour Creation
          </button>
        </div>

        {loading && <p>Loading...</p>}
        
        {result && (
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Result:</h3>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestTourCreation;

