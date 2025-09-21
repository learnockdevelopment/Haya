'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

import apiClient from '@/lib/apiClient';
interface Visa {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  actualPrice?: number;
  region: string;
  processingTime: string;
  validityPeriod: string;
  requirements: string[];
  documents: string[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: string;
}

const VisasManagement: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [visas, setVisas] = useState<Visa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/api/admin/visas', {
          requireAuth: true,
          token,
        });
        if (data.success) {
          setVisas(data.data.visas);
        }
      } catch (error) {
        console.error('Error fetching visas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchVisas();
    }
  }, [token]);

  const handleDelete = async (visaId: string) => {
    if (!confirm('Are you sure you want to delete this visa?')) return;

    try {
      await apiClient.delete(`/api/admin/visas/${visaId}`, {
        requireAuth: true,
        token,
      });
      setVisas(visas.filter(visa => visa._id !== visaId));
    } catch (error) {
      console.error('Error deleting visa:', error);
    }
  };

  const handleToggleStatus = async (visaId: string, currentStatus: boolean) => {
    try {
      await apiClient.patch(`/api/admin/visas/${visaId}`, { isActive: !currentStatus }, {
        requireAuth: true,
        token,
      });
      setVisas(visas.map(visa => 
        visa._id === visaId 
          ? { ...visa, isActive: !currentStatus }
          : visa
      ));
    } catch (error) {
      console.error('Error updating visa status:', error);
    }
  };

  const filteredVisas = visas.filter(visa => {
    const matchesSearch = visa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'active' && visa.isActive) ||
                         (statusFilter === 'inactive' && !visa.isActive);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Visas Management</h1>
        <p className="mt-2 text-gray-600">
          Manage your visa services and applications
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search visas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <Button
          onClick={() => window.location.href = '/admin/visas/new'}
          className="flex items-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New Visa
        </Button>
      </div>

      {/* Visas Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Processing Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity
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
            {filteredVisas.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No visas found.
                </td>
              </tr>
            ) : (
              filteredVisas.map((visa) => (
                <tr key={visa._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {visa.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {visa.shortDescription}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visa.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${visa.price}
                      {visa.actualPrice && visa.actualPrice < visa.price && (
                        <span className="ml-2 text-green-600 font-medium">
                          (${visa.actualPrice})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visa.processingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visa.validityPeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(visa._id, visa.isActive)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        visa.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {visa.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => window.location.href = `/admin/visas/${visa._id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.location.href = `/admin/visas/${visa._id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(visa._id)}
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

export default VisasManagement;


