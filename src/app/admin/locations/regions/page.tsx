'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiMapPin } from 'react-icons/fi';

import apiClient from '@/lib/apiClient';
interface Region {
  _id: string;
  name: string;
  country: string;
  countryCode: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

const RegionsManagement: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/locations/regions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setRegions(data.data.regions);
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRegions();
    }
  }, [token]);

  const handleDelete = async (regionId: string) => {
    if (!confirm('Are you sure you want to delete this region?')) return;

    try {
      const response = await fetch(`/api/admin/locations/regions/${regionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setRegions(regions.filter(region => region._id !== regionId));
      }
    } catch (error) {
      console.error('Error deleting region:', error);
    }
  };

  const handleToggleStatus = async (regionId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/locations/regions/${regionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (response.ok) {
        setRegions(regions.map(region => 
          region._id === regionId 
            ? { ...region, isActive: !currentStatus }
            : region
        ));
      }
    } catch (error) {
      console.error('Error updating region status:', error);
    }
  };

  const filteredRegions = regions.filter(region => {
    const matchesSearch = region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = countryFilter === '' || region.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  const uniqueCountries = [...new Set(regions.map(region => region.country))].sort();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Regions Management</h1>
        <p className="mt-2 text-gray-600">
          Manage locations and destinations
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <Button
          onClick={() => window.location.href = '/admin/locations/regions/new'}
          className="flex items-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New Region
        </Button>
      </div>

      {/* Regions Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No regions found.
                </td>
              </tr>
            ) : (
              filteredRegions.map((region) => (
                <tr key={region._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {region.image ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={region.image}
                            alt={region.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <FiMapPin className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {region.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Order: {region.sortOrder}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {region.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {region.countryCode}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {region.description || 'No description'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(region._id, region.isActive)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        region.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {region.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => window.location.href = `/admin/locations/regions/${region._id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.location.href = `/admin/locations/regions/${region._id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(region._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionsManagement;



