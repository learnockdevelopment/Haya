'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import apiClient from '@/lib/apiClient';
import { FiPlus, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

interface Type {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  entityType: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const TypesPage: React.FC = () => {
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [types, setTypes] = useState<Type[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingType, setEditingType] = useState<Type | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    entityType: 'tour',
    sortOrder: 0,
    isActive: true
  });

  const entityTypes = [
    { value: 'tour', label: 'Tours' },
    { value: 'visa', label: 'Visas' },
    { value: 'flight', label: 'Flights' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'package', label: 'Packages' }
  ];

  useEffect(() => {
    if (user && token) {
      fetchTypes();
    }
  }, [user, token]);

  const fetchTypes = async () => {
    try {
      setLoadingData(true);
      const response = await apiClient.get('/api/admin/types', { requireAuth: true, token });
      if (response.success) {
        setTypes(response.data.types || []);
      }
    } catch (error) {
      console.error('Error fetching types:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingType) {
        const response = await apiClient.put(`/api/admin/types/${editingType._id}`, formData, { requireAuth: true, token });
        if (response.success) {
        await fetchTypes();
          setShowForm(false);
          setEditingType(null);
          resetForm();
        }
      } else {
        const response = await apiClient.post('/api/admin/types', formData, { requireAuth: true, token });
        if (response.success) {
        await fetchTypes();
          setShowForm(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving type:', error);
    }
  };

  const handleEdit = (type: Type) => {
    setEditingType(type);
    setFormData({
      title: type.title,
      description: type.description,
      shortDescription: type.shortDescription,
      entityType: type.entityType,
      sortOrder: type.sortOrder,
      isActive: type.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this type?')) {
      try {
        const response = await apiClient.delete(`/api/admin/types/${id}`, { requireAuth: true, token });
        if (response.success) {
        await fetchTypes();
        }
      } catch (error) {
        console.error('Error deleting type:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      entityType: 'tour',
      sortOrder: 0,
      isActive: true
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingType(null);
    resetForm();
  };

  if (loading || loadingData) {
    return <LoadingSpinner />;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.push('/admin')}
            variant="outline"
            className="mb-4"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Types Management</h1>
              <p className="text-gray-600">Manage types for different entity types</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Type
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingType ? 'Edit Type' : 'Add New Type'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter type title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entity Type *
                  </label>
                  <select
                    name="entityType"
                    value={formData.entityType}
                    onChange={(e) => setFormData(prev => ({ ...prev, entityType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {entityTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter type description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <Input
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Enter short description"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <Input
                    name="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingType ? 'Update' : 'Create'} Type
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Types List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Types</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sort Order
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
                {types.map((type) => (
                  <tr key={type._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {type.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {entityTypes.find(t => t.value === type.entityType)?.label || type.entityType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {type.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {type.sortOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        type.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {type.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(type)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(type._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypesPage;
