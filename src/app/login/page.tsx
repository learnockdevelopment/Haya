'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, user, loading } = useAuth();
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('common.fieldRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('common.validEmail');
    }

    if (!formData.password) {
      newErrors.password = t('common.fieldRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const success = await login(formData.email, formData.password);
    setIsLoading(false);

    if (success) {
      router.push('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Right side: Form */}
      <div className=" w-full max-w-md mx-auto space-y-8">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-marck font-bold  mb-2 md:mb-4 text-primary-500 text-center rounded-full px-3 py-1 md:px-4 md:py-2">
          {t("auth.welcomeBack")}!
        </h2>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("auth.login")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("auth.dontHaveAccount")}{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("auth.register")}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6 form-container" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label={t("auth.email")}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              leftIcon={<FiMail className="w-5 h-5 text-gray-400" />}
              placeholder={t("auth.email")}
              required
            />
            <Input
              label={t("auth.password")}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              leftIcon={<FiLock className="w-5 h-5 text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-1 rounded password-toggle-btn"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              }
              placeholder={t("auth.password")}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                {t("auth.rememberMe")}
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("auth.forgotPassword")}
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {t("auth.login")}
            </Button>
          </div>
        </form>
      </div>
      {/* Left side: Image */}
      <div className="hidden md:flex  items-center  h-full">
        <img
          src="/images/login.png" // Change to your image path
          alt="Login Side"
          className=" w-full max-w-3xl h-auto object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default LoginPage;
