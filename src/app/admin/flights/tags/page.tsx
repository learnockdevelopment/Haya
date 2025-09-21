'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

import apiClient from '@/lib/apiClient';
interface Tag {
  _id: string;
  name: string;
  
  
  
  slug: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const FlightTagsPage: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [tagss, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    
    
    
    type: 'flights'
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await apiClient.get('/api/admin/tags?entityType=flight', { requireAuth: true, token }), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.success) {
        setTags(response.data.tags || []);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTag 
        ? `/api/admin/flights/tags/${editingTag._id}`
        : '/api/admin/tags';
      
      const method = editingTag ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchTags();
        setShowCreateForm(false);
        setEditingTag(null);
        setFormData({
          name: '',
          
          
          
          type: 'flights'
        });
      }
    } catch (error) {
      console.error('Error saving tags:', error);
    }
  };

  const handleEdit = (tags: Tag) => {
    setEditingTag(tags);
    setFormData({
      name: tags.name,
      
      
      
      type: tags.type
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tags?')) {
      try {
        const response = await fetch(`/api/admin/flights/tags/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          await fetchTags();
        }
      } catch (error) {
        console.error('Error deleting tags:', error);
      }
    }
  };

  const filteredTags = tagss.filter(tags =>
    tags.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900">Flight Tags</h1>
          <p className="text-gray-600">Manage flights tags and classifications</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Tag
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editingTag ? 'Edit Tag' : 'Create New Tag'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Adventure, Luxury, Family"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingTag ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingTag(null);
                  setFormData({
                    name: '',
                    
                    
                    
                    type: 'flights'
                  });
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tags List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTags.map((tags) => (
                <tr key={tags._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                    <div className="text-sm font-medium text-gray-900">
                      {tags.name}
                    </div>
                  </td>
                  
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tags.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tags.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(tags)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tags._id)}
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

      {filteredTags.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tags found</p>
        </div>
      )}
    </div>
  );
};

export default FlightTagsPage;