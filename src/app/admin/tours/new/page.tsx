'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import GlobalLanguageSelector from '@/components/admin/GlobalLanguageSelector';
import SimpleMultilingualField from '@/components/admin/SimpleMultilingualField';
import apiClient from '@/lib/apiClient';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

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

interface Language {
  _id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  isDefault: boolean;
}

const NewTourPage: React.FC = () => {
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
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
    type: 'domestic',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (user && token) {
      fetchReferenceData();
    }
  }, [user, token]);

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

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Parse duration to extract number (e.g., "10 hours" -> 10)
      const durationMatch = formData.duration.match(/(\d+)/);
      const durationNumber = durationMatch ? parseInt(durationMatch[1]) : 1;

      const data = await apiClient.post('/api/admin/tours', {
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          maxGroupSize: parseInt(formData.maxGroupSize),
          minGroupSize: parseInt(formData.minGroupSize),
          duration: durationNumber,
          highlights: formData.highlights,
          inclusions: formData.inclusions,
          exclusions: formData.exclusions,
          requirements: formData.requirements.split(',').map(h => h.trim()).filter(h => h),
          tags: formData.tags.split(',').map(h => h.trim()).filter(h => h),
          departureDate: new Date(formData.departureDate),
          returnDate: new Date(formData.returnDate),
          images: ['/images/placeholder-tour.jpg'], // Placeholder image
          featuredImage: '/images/placeholder-tour.jpg',
          startDates: [new Date(formData.departureDate)],
          endDates: [new Date(formData.returnDate)],
          bookingDeadline: new Date(),
          isTranslatable: true,
          defaultLanguage: 'en',
        }, {
          requireAuth: true,
          token,
        });

      if (data.success) {
        router.push('/admin/tours');
      } else {
        alert(data.message || 'Failed to create tour');
      }
    } catch (error) {
      console.error('Error creating tour:', error);
      alert('Failed to create tour');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="mr-4"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
              <GlobalLanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
          </div>
          <p className="text-gray-600">
            Add a new travel tour to your platform
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Title *
                </label>
                <SimpleMultilingualField
                  value={formData.title}
                  onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                  currentLanguage={currentLanguage!}
                  placeholder="Enter tour title"
                  required
                />
              </div>

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
                  Price *
                </label>
                <Input
                  name="price"
                  type="number"
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
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="Enter original price (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <Input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 3 days, 1 week"
                  required
                />
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
                  <option value="extreme">Extreme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Group Size *
                </label>
                <Input
                  name="maxGroupSize"
                  type="number"
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
                  name="minGroupSize"
                  type="number"
                  value={formData.minGroupSize}
                  onChange={handleChange}
                  placeholder="Enter min group size"
                  required
                />
              </div>
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <SimpleMultilingualField
                  value={formData.shortDescription}
                  onChange={(value) => setFormData(prev => ({ ...prev, shortDescription: value }))}
                  currentLanguage={currentLanguage!}
                  placeholder="Enter short description"
                  type="textarea"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <SimpleMultilingualField
                  value={formData.description}
                  onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                  currentLanguage={currentLanguage!}
                  placeholder="Enter detailed description"
                  type="textarea"
                  rows={5}
                  required
                />
              </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highlights
              </label>
                <SimpleMultilingualField
                  value={formData.highlights}
                  onChange={(value) => setFormData(prev => ({ ...prev, highlights: value }))}
                  currentLanguage={currentLanguage!}
                  placeholder="Enter highlights"
                  type="array"
                  required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Included
                </label>
                  <SimpleMultilingualField
                    value={formData.inclusions}
                    onChange={(value) => setFormData(prev => ({ ...prev, inclusions: value }))}
                    currentLanguage={currentLanguage!}
                    placeholder="What's included"
                    type="array"
                  />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Not Included
                </label>
                  <SimpleMultilingualField
                    value={formData.exclusions}
                    onChange={(value) => setFormData(prev => ({ ...prev, exclusions: value }))}
                    currentLanguage={currentLanguage!}
                    placeholder="What's not included"
                    type="array"
                  />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Policy *
              </label>
              <textarea
                name="cancellationPolicy"
                value={formData.cancellationPolicy}
                onChange={handleChange}
                placeholder="Enter cancellation policy"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements (comma-separated)
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Enter requirements"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date *
                </label>
                <Input
                  name="departureDate"
                  type="date"
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
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source *
                </label>
                <Input
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="e.g., New York, Dubai"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination *
                </label>
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Paris, Tokyo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Type *
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags separated by commas"
              />
            </div>

            <div className="flex items-center space-x-4">
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

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="flex items-center"
              >
                <FiSave className="w-4 h-4 mr-2" />
                Create Tour
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTourPage;
