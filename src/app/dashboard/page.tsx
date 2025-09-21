'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { FiUser, FiCreditCard, FiSettings, FiLogOut, FiPlus } from 'react-icons/fi';

const DashboardPage: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.welcome', { name: user.fullName })}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('dashboard.overview')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUser className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {t('dashboard.profileStatus')}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {t('common.active')}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiCreditCard className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {t('dashboard.paymentMethod')}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Tabby
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiSettings className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    {t('dashboard.accountType')}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 capitalize">
                    {user.role}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className='text-lg font-medium text-gray-900'>{t('dashboard.quickActions')}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <Link href="/payment">
                  <Button className="w-full justify-start">
                    <FiPlus className="w-4 h-4 mr-2" />
                    {t('payment.create')}
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <FiUser className="w-4 h-4 mr-2" />
                    {t('dashboard.viewProfile')}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <FiLogOut className="w-4 h-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className='text-lg font-medium text-gray-900'>{t('dashboard.recentActivity')}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  {t('dashboard.activity1')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  {t('dashboard.activity2')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  {t('dashboard.activity3')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
