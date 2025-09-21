'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/lib/apiClient';
import { 
  FiHome, 
  FiUsers, 
  FiMapPin, 
  FiNavigation, 
  FiHome as FiBuilding, 
  FiKey, 
  FiMessageSquare, 
  FiTag, 
  FiLayers, 
  FiSettings,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['main']);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  const menuItems = [
    {
      id: 'main',
      title: 'Dashboard',
      icon: FiHome,
      href: '/admin',
      children: []
    },
    {
      id: 'tours',
      title: 'Tours',
      icon: FiMapPin,
      href: '/admin/tours',
      children: [
        { title: 'All Tours', href: '/admin/tours' },
        { title: 'Add Tour', href: '/admin/tours/new' },
        { title: 'Add Tour (Multilingual)', href: '/admin/tours/new-multilingual' },
        { title: 'Categories', href: '/admin/tours/categories' },
        { title: 'Types', href: '/admin/tours/types' },
        { title: 'Tags', href: '/admin/tours/tags' }
      ]
    },
    {
      id: 'flights',
      title: 'Flights',
      icon: FiNavigation,
      href: '/admin/flights',
      children: [
        { title: 'All Flights', href: '/admin/flights' },
        { title: 'Add Flight', href: '/admin/flights/new' },
        { title: 'Categories', href: '/admin/flights/categories' },
        { title: 'Types', href: '/admin/flights/types' },
        { title: 'Tags', href: '/admin/flights/tags' }
      ]
    },
    {
      id: 'hotels',
      title: 'Hotels',
      icon: FiBuilding,
      href: '/admin/hotels',
      children: [
        { title: 'All Hotels', href: '/admin/hotels' },
        { title: 'Add Hotel', href: '/admin/hotels/new' },
        { title: 'Hotel Rooms', href: '/admin/hotels/rooms' },
        { title: 'Add Room', href: '/admin/hotels/rooms/new' },
        { title: 'Categories', href: '/admin/hotels/categories' },
        { title: 'Types', href: '/admin/hotels/types' },
        { title: 'Tags', href: '/admin/hotels/tags' }
      ]
    },
    {
      id: 'visas',
      title: 'Visas',
      icon: FiKey,
      href: '/admin/visas',
      children: [
        { title: 'All Visas', href: '/admin/visas' },
        { title: 'Add Visa', href: '/admin/visas/new' },
        { title: 'Categories', href: '/admin/visas/categories' },
        { title: 'Types', href: '/admin/visas/types' },
        { title: 'Tags', href: '/admin/visas/tags' }
      ]
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: FiMessageSquare,
      href: '/admin/reviews',
      children: []
    },
    {
      id: 'locations',
      title: 'Locations',
      icon: FiMapPin,
      href: '/admin/locations',
      children: [
        { title: 'All Regions', href: '/admin/locations/regions' },
        { title: 'Add Region', href: '/admin/locations/regions/new' }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      icon: FiUsers,
      href: '/admin/users',
      children: []
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: FiSettings,
      href: '/admin/settings',
      children: [
        { title: 'General Settings', href: '/admin/settings' },
        { title: 'API Keys', href: '/admin/api-keys' }
      ]
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || user.role !== 'admin') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 lg:flex lg:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-900">Haya Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <div>
                  <button
                    onClick={() => item.children.length > 0 ? toggleMenu(item.id) : router.push(item.href)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      expandedMenus.includes(item.id)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.title}
                    </div>
                    {item.children.length > 0 && (
                      expandedMenus.includes(item.id) ? 
                        <FiChevronDown className="w-4 h-4" /> : 
                        <FiChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {item.children.length > 0 && expandedMenus.includes(item.id) && (
                    <ul className="mt-1 ml-8 space-y-1">
                      {item.children.map((child, index) => (
                        <li key={index}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, {user.fullName}
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View Site
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
