'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import apiClient from '@/lib/apiClient';
import { FiArrowLeft, FiSave, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

interface Tour {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  duration: number;
  maxGroupSize: number;
  category: string;
  difficulty: string;
  location: string;
  country: string;
  images: string[];
  videos: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const TourDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loadingTour, setLoadingTour] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    originalPrice: '',
    duration: '',
    maxGroupSize: '',
    category: '',
    difficulty: '',
    location: '',
    country: '',
    highlights: '',
    inclusions: '',
    exclusions: '',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) return;
      
      try {
        setLoadingTour(true);
        const data = await apiClient.get(`/api/admin/tours/${id}`, {
          requireAuth: true,
          token,
        });
        
        if (data.success) {
          const tourData = data.data.tour;
          setTour(tourData);
          setFormData({
            title: tourData.title || '',
            description: tourData.description || '',
            shortDescription: tourData.shortDescription || '',
            price: tourData.price?.toString() || '',
            originalPrice: tourData.originalPrice?.toString() || '',
            duration: tourData.duration?.toString() || '',
            maxGroupSize: tourData.maxGroupSize?.toString() || '',
            category: tourData.category || '',
            difficulty: tourData.difficulty || '',
            location: tourData.location || '',
            country: tourData.country || '',
            highlights: tourData.highlights?.join('\n') || '',
            inclusions: tourData.inclusions?.join('\n') || '',
            exclusions: tourData.exclusions?.join('\n') || '',
            isActive: tourData.isActive ?? true,
            isFeatured: tourData.isFeatured ?? false,
          });
        } else {
          router.push('/admin/tours');
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
        router.push('/admin/tours');
      } finally {
        setLoadingTour(false);
      }
    };

    if (token) {
      fetchTour();
    }
  }, [id, token, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const response = await fetch(`/api/admin/tours/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          maxGroupSize: parseInt(formData.maxGroupSize),
          duration: parseInt(formData.duration),
          highlights: formData.highlights.split('\n').filter(h => h.trim()),
          inclusions: formData.inclusions.split('\n').filter(i => i.trim()),
          exclusions: formData.exclusions.split('\n').filter(e => e.trim()),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setTour(data.data.tour);
        setIsEditing(false);
        alert('Tour updated successfully!');
      } else {
        alert(data.message || 'Failed to update tour');
      }
    } catch (error) {
      console.error('Error updating tour:', error);
      alert('An error occurred while updating the tour');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      const response = await fetch(`/api/admin/tours/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        router.push('/admin/tours');
      } else {
        alert('Failed to delete tour');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('An error occurred while deleting the tour');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingImages(true);
      const formData = new FormData();
      
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const response = await fetch(`/api/admin/tours/${id}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh tour data
        const tourResponse = await fetch(`/api/admin/tours/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (tourResponse.ok) {
          const tourData = await tourResponse.json();
          if (tourData.success) {
            setTour(tourData.data.tour);
          }
        }
        alert('Images uploaded successfully!');
      } else {
        alert(data.message || 'Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageDelete = async (imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/tours/${id}/images`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh tour data
        const tourResponse = await fetch(`/api/admin/tours/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (tourResponse.ok) {
          const tourData = await tourResponse.json();
          if (tourData.success) {
            setTour(tourData.data.tour);
          }
        }
        alert('Image deleted successfully!');
      } else {
        alert(data.message || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('An error occurred while deleting the image');
    }
  };

  if (loading || loadingTour) {
    return <LoadingSpinner />;
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour not found</h1>
          <Button onClick={() => router.push('/admin/tours')}>
            Back to Tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/admin/tours')}
                className="flex items-center space-x-2"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Tours</span>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">{tour.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isEditing ? "outline" : "primary"}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2"
              >
                {isEditing ? <FiEyeOff className="w-4 h-4" /> : <FiEdit className="w-4 h-4" />}
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex items-center space-x-2"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select Category</option>
                        <option value="adventure">Adventure</option>
                        <option value="cultural">Cultural</option>
                        <option value="nature">Nature</option>
                        <option value="beach">Beach</option>
                        <option value="city">City</option>
                        <option value="wildlife">Wildlife</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($)
                      </label>
                      <Input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price ($)
                      </label>
                      <Input
                        name="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (days)
                      </label>
                      <Input
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Group Size
                      </label>
                      <Input
                        name="maxGroupSize"
                        type="number"
                        value={formData.maxGroupSize}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="challenging">Challenging</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Highlights (one per line)
                    </label>
                    <textarea
                      name="highlights"
                      value={formData.highlights}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inclusions (one per line)
                      </label>
                      <textarea
                        name="inclusions"
                        value={formData.inclusions}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exclusions (one per line)
                      </label>
                      <textarea
                        name="exclusions"
                        value={formData.exclusions}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2"
                    >
                      <FiSave className="w-4 h-4" />
                      <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Information</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Title:</span> {tour.title}</p>
                        <p><span className="font-medium">Category:</span> {tour.category}</p>
                        <p><span className="font-medium">Location:</span> {tour.location}, {tour.country}</p>
                        <p><span className="font-medium">Duration:</span> {tour.duration} days</p>
                        <p><span className="font-medium">Max Group Size:</span> {tour.maxGroupSize} people</p>
                        <p><span className="font-medium">Difficulty:</span> {tour.difficulty}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Price:</span> ${tour.price}</p>
                        {tour.originalPrice && (
                          <p><span className="font-medium">Original Price:</span> ${tour.originalPrice}</p>
                        )}
                        <p><span className="font-medium">Status:</span> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            tour.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {tour.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </p>
                        <p><span className="font-medium">Featured:</span> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            tour.isFeatured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {tour.isFeatured ? 'Yes' : 'No'}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{tour.description}</p>
                  </div>

                  {tour.highlights && tour.highlights.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Highlights</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index} className="text-gray-700">{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tour.inclusions && tour.inclusions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Inclusions</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {tour.inclusions.map((inclusion, index) => (
                            <li key={index} className="text-gray-700">{inclusion}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {tour.exclusions && tour.exclusions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Exclusions</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {tour.exclusions.map((exclusion, index) => (
                            <li key={index} className="text-gray-700">{exclusion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tour Images</h3>
                <span className="text-sm text-gray-500">
                  {tour.images?.length || 0} images
                </span>
              </div>
              
              {/* Upload Section */}
              <div className="mb-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors ${
                    uploadingImages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploadingImages ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-primary-600 mb-1">+ Upload Images</div>
                      <div className="text-xs text-gray-500">Click to select multiple images</div>
                    </div>
                  )}
                </label>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                {tour.images && tour.images.length > 0 ? (
                  tour.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Tour image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleImageDelete(image)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete image"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📷</div>
                    <p>No images uploaded</p>
                    <p className="text-sm">Upload images to showcase this tour</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
