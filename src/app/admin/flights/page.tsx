'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import apiClient from '@/lib/apiClient';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

interface Flight {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  airline: string;
  flightNumber: string;
  source: string;
  destination: string;
  price: number;
  actualPrice?: number;
  departureDate: string;
  returnDate?: string;
  departureTime: string;
  arrivalTime: string;
  class: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const FlightsManagement: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/api/admin/flights', {
          requireAuth: true,
          token,
        });
        if (data.success) {
          setFlights(data.data.flights);
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFlights();
    }
  }, [token]);

  const handleDelete = async (flightId: string) => {
    if (!confirm('Are you sure you want to delete this flight?')) return;

    try {
      const response = await fetch(`/api/admin/flights/${flightId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setFlights(flights.filter(flight => flight._id !== flightId));
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  const handleToggleStatus = async (flightId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/flights/${flightId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (response.ok) {
        setFlights(flights.map(flight => 
          flight._id === flightId 
            ? { ...flight, isActive: !currentStatus }
            : flight
        ));
      }
    } catch (error) {
      console.error('Error updating flight status:', error);
    }
  };

  const filteredFlights = flights.filter(flight => {
    const matchesSearch = flight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flight.airline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'active' && flight.isActive) ||
                         (statusFilter === 'inactive' && !flight.isActive);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Flights Management</h1>
        <p className="mt-2 text-gray-600">
          Manage your flight bookings and schedules
        </p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search flights..."
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
          onClick={() => window.location.href = '/admin/flights/new'}
          className="flex items-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New Flight
        </Button>
      </div>

      {/* Flights Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Airline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class
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
            {filteredFlights.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No flights found.
                </td>
              </tr>
            ) : (
              filteredFlights.map((flight) => (
                <tr key={flight._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {flight.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {flight.flightNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {flight.source} → {flight.destination}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(flight.departureDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flight.airline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${flight.price}
                      {flight.actualPrice && flight.actualPrice < flight.price && (
                        <span className="ml-2 text-green-600 font-medium">
                          (${flight.actualPrice})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {flight.class.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(flight._id, flight.isActive)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        flight.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {flight.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => window.location.href = `/admin/flights/${flight._id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.location.href = `/admin/flights/${flight._id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(flight._id)}
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

export default FlightsManagement;


