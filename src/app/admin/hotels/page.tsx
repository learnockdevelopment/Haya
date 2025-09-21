'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

import apiClient from '@/lib/apiClient';
interface Hotel {
  _id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  address: string;
  starRating: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: string;
}

const HotelsManagement: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/api/admin/hotels', {
          requireAuth: true,
          token,
        });
        if (data.success) {
          setHotels(data.data.hotels);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHotels();
    }
  }, [token]);

  const handleDelete = async (hotelId: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    try {
      await apiClient.delete(`/api/admin/hotels/${hotelId}`, {
        requireAuth: true,
        token,
      });
      setHotels(hotels.filter(hotel => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const handleToggleStatus = async (hotelId: string, currentStatus: boolean) => {
    try {
      await apiClient.patch(`/api/admin/hotels/${hotelId}`, { isActive: !currentStatus }, {
        requireAuth: true,
        token,
      });
      setHotels(hotels.map(hotel => 
        hotel._id === hotelId 
          ? { ...hotel, isActive: !currentStatus }
          : hotel
      ));
    } catch (error) {
      console.error('Error updating hotel status:', error);
    }
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'active' && hotel.isActive) ||
                         (statusFilter === 'inactive' && !hotel.isActive);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hotels Management</h1>
        <p className="mt-2 text-gray-600">
          Manage your hotel listings and rooms
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search hotels..."
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
        <div className="flex gap-2">
          <Button
            onClick={() => window.location.href = '/admin/hotels/rooms'}
            variant="outline"
            className="flex items-center"
          >
            <FiEye className="w-4 h-4 mr-2" />
            View Rooms
          </Button>
          <Button
            onClick={() => window.location.href = '/admin/hotels/new'}
            className="flex items-center"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add New Hotel
          </Button>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amenities
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
            {filteredHotels.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No hotels found.
                </td>
              </tr>
            ) : (
              filteredHotels.map((hotel) => (
                <tr key={hotel._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {hotel.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {hotel.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {hotel.location}
                    </div>
                    <div className="text-sm text-gray-500">
                      {hotel.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < hotel.starRating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({hotel.ratings.count} reviews)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {hotel.amenities.slice(0, 3).join(', ')}
                      {hotel.amenities.length > 3 && ` +${hotel.amenities.length - 3} more`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(hotel._id, hotel.isActive)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        hotel.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {hotel.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => window.location.href = `/admin/hotels/${hotel._id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.location.href = `/admin/hotels/${hotel._id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
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

export default HotelsManagement;


