'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiGlobe, 
  FiCalendar,
  FiEdit3,
  FiSave,
  FiX,
  FiCamera,
  FiLock,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProfileData {
  fullName: string;
  userName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { user, loading, updateUser, refreshUser } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bio: '',
    location: '',
    website: '',
    avatar: '',
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      console.log('Setting profile data, user avatar:', user.avatar);
      setProfileData({
        fullName: user.fullName || '',
        userName: user.userName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        avatar: user.avatar || '',
      });
    }
  }, [user, loading, router]);

  // Refresh user data when component mounts to get latest avatar
  useEffect(() => {
    if (user && !loading) {
      refreshUser();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('common.maxFileSize', { size: '5MB' }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error(t('common.allowedFormats', { formats: 'image/*' }));
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Image upload successful, new avatar URL:', data.avatar);
        setProfileData(prev => ({
          ...prev,
          avatar: data.avatar,
        }));
        // Update global user state
        updateUser({ avatar: data.avatar });
        // Refresh user data from server to ensure consistency
        await refreshUser();
        toast.success(t('profile.imageUpdated'));
      } else {
        console.error('Image upload failed:', data.message);
        toast.error(data.message || t('profile.imageFailed'));
      }
    } catch (error) {
      toast.error(t('profile.imageFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const data = await apiClient.put('/api/profile/update', profileData, {
        requireAuth: true,
        token,
      });

      if (data.success) {
        toast.success(t('profile.updateSuccess'));
        setIsEditing(false);
        // Refresh user data
        window.location.reload();
      } else {
        toast.error(data.message || t('profile.updateFailed'));
      }
    } catch (error) {
      toast.error(t('profile.updateFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t('common.passwordsMatch'));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(t('common.minLength', { min: 6 }));
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t('profile.passwordChanged'));
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error(data.message || t('profile.passwordFailed'));
      }
    } catch (error) {
      toast.error(t('profile.passwordFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {profileData.avatar ? (
                      <>
                        <img
                          src={profileData.avatar}
                          alt={t('profile.title')}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', profileData.avatar);
                            console.error('Image error:', e);
                            console.error('Full image URL:', window.location.origin + profileData.avatar);
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', profileData.avatar);
                            console.log('Full image URL:', window.location.origin + profileData.avatar);
                          }}
                        />
                        {/* <div className="absolute top-0 left-0 text-xs bg-black bg-opacity-50 text-white p-1">
                          {profileData.avatar}
                        </div> */}
                      </>
                    ) : (
                      <FiUser className="w-10 h-10 text-primary-600" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-1 cursor-pointer hover:bg-primary-700 transition-colors">
                    <FiCamera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profileData.fullName}
                  </h1>
                  <p className="text-primary-100">@{profileData.userName}</p>
                  <p className="text-primary-100 text-sm">{profileData.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="bg-white text-primary-600 hover:bg-gray-100"
                    >
                      <FiSave className="w-4 h-4 mr-2" />
                      {isLoading ? t('common.loading') : t('common.save')}
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary-600"
                    >
                      <FiX className="w-4 h-4 mr-2" />
                      {t('common.cancel')}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-primary-600 hover:bg-gray-100"
                  >
                    <FiEdit3 className="w-4 h-4 mr-2" />
                    {t('profile.editProfile')}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.personalInfo')}</h2>
                
                <div className="space-y-4 form-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('auth.fullName')}
                    </label>
                    <Input
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={t('auth.fullName')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('auth.userName')}
                    </label>
                    <Input
                      name="userName"
                      value={profileData.userName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={t('auth.userName')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('auth.email')}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">{t('common.required')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.phone')}
                    </label>
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={t('profile.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.dateOfBirth')}
                    </label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('profile.additionalInfo')}</h2>
                
                <div className="space-y-4 form-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.bio')}
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={t('profile.bioPlaceholder')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.location')}
                    </label>
                    <Input
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={t('profile.locationPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('profile.website')}
                    </label>
                    <Input
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={t('profile.websitePlaceholder')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Security</h2>
                {!isChangingPassword && (
                  <Button
                    onClick={() => setIsChangingPassword(true)}
                    variant="outline"
                    className="text-primary-600 border-primary-600 hover:bg-primary-50"
                  >
                    <FiLock className="w-4 h-4 mr-2" />
                    {t('profile.changePassword')}
                  </Button>
                )}
              </div>

              {isChangingPassword && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('profile.currentPassword')}
                      </label>
                      <div className="relative">
                        <Input
                          name="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder={t('profile.currentPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 p-1 rounded password-toggle-btn"
                        >
                          {showCurrentPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('profile.newPassword')}
                      </label>
                      <div className="relative">
                        <Input
                          name="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder={t('profile.newPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 p-1 rounded password-toggle-btn"
                        >
                          {showNewPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('profile.confirmNewPassword')}
                      </label>
                      <div className="relative">
                        <Input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder={t('profile.confirmNewPassword')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 p-1 rounded password-toggle-btn"
                        >
                          {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="bg-primary-600 text-white hover:bg-primary-700"
                      >
                        {isLoading ? t('common.loading') : t('profile.changePassword')}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                        }}
                        variant="outline"
                      >
                        {t('common.cancel')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
