'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';
import MultilingualInput from '@/components/admin/MultilingualInput';
import { MultilingualContent, MultilingualArray, createMultilingualContent, createMultilingualArray } from '@/lib/multilingual';

import apiClient from '@/lib/apiClient';
interface Category {
  _id: string;
  title: MultilingualContent;
}

interface Type {
  _id: string;
  title: MultilingualContent;
}

interface Tag {
  _id: string;
  name: string;
}

interface Region {
  _id: string;
  name: MultilingualContent;
  country: MultilingualContent;
  city: MultilingualContent;
}

const NewMultilingualTourPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const [formData, setFormData] = useState({
    title: createMultilingualContent({ en: '', ar: '' }),
    description: createMultilingualContent({ en: '', ar: '' }),
    shortDescription: createMultilingualContent({ en: '', ar: '' }),
    category: '',
    type: '',
    source: '',
    destination: '',
    price: '',
    actualPrice: '',
    departureDate: '',
    returnDate: '',
    images: [] as string[],
    tags: [] as string[],
    highlights: createMultilingualArray({ en: [], ar: [] }),
    inclusions: createMultilingualArray({ en: [], ar: [] }),
    exclusions: createMultilingualArray({ en: [], ar: [] }),
    itinerary: [] as Array<{
      day: number;
      title: MultilingualContent;
      description: MultilingualContent;
      activities: MultilingualArray;
    }>,
    maxGroupSize: '',
    duration: '',
    difficulty: 'easy' as 'easy' | 'moderate' | 'challenging' | 'expert',
    isTranslatable: true,
    defaultLanguage: 'en'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, typesRes, tagsRes, regionsRes] = await Promise.all([
        apiClient.get('/api/admin/categories?entityType=tour', { requireAuth: true, token }), {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        apiClient.get('/api/admin/types?entityType=tour', { requireAuth: true, token }), {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        apiClient.get('/api/admin/tags?entityType=tour', { requireAuth: true, token }), {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/locations/regions', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (typesRes.ok) setTypes(await typesRes.json());
      if (tagsRes.ok) setTags(await tagsRes.json());
      if (regionsRes.ok) setRegions(await regionsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultilingualChange = (field: string, value: MultilingualContent | MultilingualArray) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const handleImageAdd = (imageUrl: string) => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleItineraryAdd = () => {
    const newDay = formData.itinerary.length + 1;
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: newDay,
          title: createMultilingualContent({ en: '', ar: '' }),
          description: createMultilingualContent({ en: '', ar: '' }),
          activities: createMultilingualArray({ en: [], ar: [] })
        }
      ]
    }));
  };

  const handleItineraryUpdate = (index: number, field: string, value: MultilingualContent | MultilingualArray) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleItineraryRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/admin/tours');
      } else {
        console.error('Error creating tour');
      }
    } catch (error) {
      console.error('Error creating tour:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Tour (Multilingual)</h1>
            <p className="text-gray-600">Add a new tour with support for multiple languages</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <MultilingualInput
                value={formData.title}
                onChange={(value) => handleMultilingualChange('title', value)}
                type="text"
                label="Title"
                required
                className="col-span-2"
              />
              
              <MultilingualInput
                value={formData.shortDescription}
                onChange={(value) => handleMultilingualChange('shortDescription', value)}
                type="text"
                label="Short Description"
                placeholder="Brief description of the tour"
              />
              
              <MultilingualInput
                value={formData.description}
                onChange={(value) => handleMultilingualChange('description', value)}
                type="textarea"
                label="Description"
                placeholder="Detailed description of the tour"
                rows={4}
              />
            </div>
          </div>

          {/* Tour Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Tour Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source *
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Source</option>
                    {regions.map(region => (
                      <option key={region._id} value={region._id}>
                        {region.city.en} - {region.country.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination *
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Destination</option>
                    {regions.map(region => (
                      <option key={region._id} value={region._id}>
                        {region.city.en} - {region.country.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Date *
                  </label>
                  <input
                    type="datetime-local"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return Date
                  </label>
                  <input
                    type="datetime-local"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Group Size *
                  </label>
                  <input
                    type="number"
                    name="maxGroupSize"
                    value={formData.maxGroupSize}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (days) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty *
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Pricing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Price (if different)
                </label>
                <input
                  type="number"
                  name="actualPrice"
                  value={formData.actualPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Classification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.title.en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  {types.map(type => (
                    <option key={type._id} value={type._id}>
                      {type.title.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Multilingual Arrays */}
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <h2 className="text-lg font-semibold mb-4">Tour Details (Multilingual)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MultilingualInput
                value={formData.highlights}
                onChange={(value) => handleMultilingualChange('highlights', value)}
                type="array"
                label="Highlights"
                placeholder="Tour highlights"
              />
              
              <MultilingualInput
                value={formData.inclusions}
                onChange={(value) => handleMultilingualChange('inclusions', value)}
                type="array"
                label="Inclusions"
                placeholder="What's included"
              />
              
              <MultilingualInput
                value={formData.exclusions}
                onChange={(value) => handleMultilingualChange('exclusions', value)}
                type="array"
                label="Exclusions"
                placeholder="What's not included"
              />
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Itinerary</h2>
              <button
                type="button"
                onClick={handleItineraryAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Add Day
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Day {day.day}</h3>
                    <button
                      type="button"
                      onClick={() => handleItineraryRemove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <MultilingualInput
                      value={day.title}
                      onChange={(value) => handleItineraryUpdate(index, 'title', value)}
                      type="text"
                      label="Day Title"
                      placeholder="Day title"
                    />
                    
                    <MultilingualInput
                      value={day.activities}
                      onChange={(value) => handleItineraryUpdate(index, 'activities', value)}
                      type="array"
                      label="Activities"
                      placeholder="Activities for this day"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <MultilingualInput
                      value={day.description}
                      onChange={(value) => handleItineraryUpdate(index, 'description', value)}
                      type="textarea"
                      label="Day Description"
                      placeholder="Detailed description of the day"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <div className="space-y-2">
              {tags.map(tag => (
                <label key={tag._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag._id)}
                    onChange={() => handleTagToggle(tag._id)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Images</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Image URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleImageAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).parentElement?.querySelector('input');
                    if (input) {
                      handleImageAdd(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Tour image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
          >
            <FiSave className="w-4 h-4 mr-2" />
            {loading ? 'Creating...' : 'Create Tour'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMultilingualTourPage;



