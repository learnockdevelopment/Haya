'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiClient } from '@/lib/apiClient';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import SimpleMultilingualInput from '@/components/admin/SimpleMultilingualInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Tour {
  _id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  shortDescription: { en: string; ar: string };
  price: number;
  originalPrice?: number;
  duration: number;
  location: string;
  country: string;
  city: string;
  category: string;
  difficulty: string;
  maxGroupSize: number;
  minGroupSize: number;
  highlights: { en: string[]; ar: string[] };
  inclusions: { en: string[]; ar: string[] };
  exclusions: { en: string[]; ar: string[] };
  cancellationPolicy: string;
  requirements: string[];
  tags: string[];
  departureDate: string;
  returnDate: string;
  destination: string;
  source: string;
  type: string;
  isActive: boolean;
  isFeatured: boolean;
  images: string[];
  featuredImage: string;
}

interface Category {
  _id: string;
  title: string;
}

interface Type {
  _id: string;
  title: string;
}

interface Tag {
  _id: string;
  title: string;
}

interface Region {
  _id: string;
  name: string;
  country: string;
}

const EditTourPage: React.FC = () => {
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tour, setTour] = useState<Tour | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    shortDescription: { en: '', ar: '' },
    price: '',
    originalPrice: '',
    duration: '',
    location: '',
    country: '',
    city: '',
    category: '',
    difficulty: 'easy',
    maxGroupSize: '',
    minGroupSize: '',
    highlights: { en: [], ar: [] },
    inclusions: { en: [], ar: [] },
    exclusions: { en: [], ar: [] },
    cancellationPolicy: '',
    requirements: '',
    tags: '',
    departureDate: '',
    returnDate: '',
    destination: '',
    source: '',
    type: '',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user && user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    if (user && token) {
      fetchTourData();
      fetchReferenceData();
    }
  }, [user, loading, token, tourId]);

  const fetchTourData = async () => {
    try {
      const response = await apiClient.get(`/api/admin/tours/${tourId}`, {
        requireAuth: true,
        token,
      });

      if (response.success) {
        const tourData = response.data.tour;
        setTour(tourData);
        setFormData({
          title: tourData.title || { en: '', ar: '' },
          description: tourData.description || { en: '', ar: '' },
          shortDescription: tourData.shortDescription || { en: '', ar: '' },
          price: tourData.price?.toString() || '',
          originalPrice: tourData.originalPrice?.toString() || '',
          duration: tourData.duration?.toString() || '',
          location: tourData.location || '',
          country: tourData.country || '',
          city: tourData.city || '',
          category: tourData.category || '',
          difficulty: tourData.difficulty || 'easy',
          maxGroupSize: tourData.maxGroupSize?.toString() || '',
          minGroupSize: tourData.minGroupSize?.toString() || '',
          highlights: tourData.highlights || { en: [], ar: [] },
          inclusions: tourData.inclusions || { en: [], ar: [] },
          exclusions: tourData.exclusions || { en: [], ar: [] },
          cancellationPolicy: tourData.cancellationPolicy || '',
          requirements: Array.isArray(tourData.requirements) ? tourData.requirements.join(', ') : '',
          tags: Array.isArray(tourData.tags) ? tourData.tags.join(', ') : '',
          departureDate: tourData.departureDate ? new Date(tourData.departureDate).toISOString().split('T')[0] : '',
          returnDate: tourData.returnDate ? new Date(tourData.returnDate).toISOString().split('T')[0] : '',
          destination: tourData.destination || '',
          source: tourData.source || '',
          type: tourData.type || '',
          isActive: tourData.isActive ?? true,
          isFeatured: tourData.isFeatured ?? false,
        });
      } else {
        alert('Failed to fetch tour data');
        router.push('/admin/tours');
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      alert('Failed to fetch tour data');
      router.push('/admin/tours');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReferenceData = async () => {
    try {
      const [categoriesRes, typesRes, tagsRes, regionsRes] = await Promise.all([
        apiClient.get('/api/admin/categories', { requireAuth: true, token }),
        apiClient.get('/api/admin/types', { requireAuth: true, token }),
        apiClient.get('/api/admin/tags', { requireAuth: true, token }),
        apiClient.get('/api/admin/regions', { requireAuth: true, token }),
      ]);

      if (categoriesRes.success) setCategories(categoriesRes.data.categories || []);
      if (typesRes.success) setTypes(typesRes.data.types || []);
      if (tagsRes.success) setTags(tagsRes.data.tags || []);
      if (regionsRes.success) setRegions(regionsRes.data.regions || []);
    } catch (error) {
      console.error('Error fetching reference data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const durationMatch = formData.duration.match(/(\d+)/);
      const durationNumber = durationMatch ? parseInt(durationMatch[1]) : 1;

      const data = await apiClient.put(`/api/admin/tours/${tourId}`, {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        maxGroupSize: parseInt(formData.maxGroupSize),
        minGroupSize: parseInt(formData.minGroupSize),
        duration: durationNumber,
        requirements: formData.requirements.split(',').map(h => h.trim()).filter(h => h),
        tags: formData.tags.split(',').map(h => h.trim()).filter(h => h),
        departureDate: new Date(formData.departureDate),
        returnDate: new Date(formData.returnDate),
      }, {
        requireAuth: true,
        token,
      });

      if (data.success) {
        router.push('/admin/tours');
      } else {
        alert(data.message || 'Failed to update tour');
      }
    } catch (error) {
      console.error('Error updating tour:', error);
      alert('Failed to update tour');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Tour</h1>
            <p className="text-gray-600">Update tour information</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <SimpleMultilingualInput
                  value={formData.title}
                  onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                  placeholder="Enter tour title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <SimpleMultilingualInput
                  value={formData.description}
                  onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                  placeholder="Enter tour description"
                  type="textarea"
                  rows={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <SimpleMultilingualInput
                  value={formData.shortDescription}
                  onChange={(value) => setFormData(prev => ({ ...prev, shortDescription: value }))}
                  placeholder="Enter short description"
                  type="textarea"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price
                  </label>
                  <Input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="Enter original price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours) *
                  </label>
                  <Input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 10 hours"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Type</option>
                    {types.map(type => (
                      <option key={type._id} value={type._id}>{type.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty *
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source *
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Source</option>
                    {regions.map(region => (
                      <option key={region._id} value={region._id}>{region.name}, {region.country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Destination</option>
                    {regions.map(region => (
                      <option key={region._id} value={region._id}>{region.name}, {region.country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Group Size *
                  </label>
                  <Input
                    type="number"
                    name="maxGroupSize"
                    value={formData.maxGroupSize}
                    onChange={handleChange}
                    placeholder="Enter max group size"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Group Size *
                  </label>
                  <Input
                    type="number"
                    name="minGroupSize"
                    value={formData.minGroupSize}
                    onChange={handleChange}
                    placeholder="Enter min group size"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date *
                  </label>
                  <Input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date *
                  </label>
                  <Input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlights
                </label>
                <SimpleMultilingualInput
                  value={formData.highlights}
                  onChange={(value) => setFormData(prev => ({ ...prev, highlights: value }))}
                  placeholder="Enter highlights"
                  type="array"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Included
                  </label>
                  <SimpleMultilingualInput
                    value={formData.inclusions}
                    onChange={(value) => setFormData(prev => ({ ...prev, inclusions: value }))}
                    placeholder="What's included"
                    type="array"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Not Included
                  </label>
                  <SimpleMultilingualInput
                    value={formData.exclusions}
                    onChange={(value) => setFormData(prev => ({ ...prev, exclusions: value }))}
                    placeholder="What's not included"
                    type="array"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements (comma-separated)
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Enter requirements separated by commas"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <textarea
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <textarea
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  placeholder="Enter cancellation policy"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/admin/tours')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Tour'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTourPage;
