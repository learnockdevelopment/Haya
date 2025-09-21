'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import apiClient from '@/lib/apiClient';
import { FiCreditCard, FiShoppingCart, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PaymentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const router = useRouter();

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

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = t('payment.amountRequired');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('common.fieldRequired');
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = t('common.fieldRequired');
    }

    if (!formData.customerEmail) {
      newErrors.customerEmail = t('common.fieldRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = t('common.validEmail');
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = t('common.fieldRequired');
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

    try {
      const data = await apiClient.post('/api/payment/tabby/create', {
        orderId: `ORDER-${Date.now()}`,
        amount: parseFloat(formData.amount),
        description: formData.description,
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
        },
        items: [
          {
            title: formData.description,
            description: formData.description,
            quantity: 1,
            unit_price: parseFloat(formData.amount),
            reference_id: `ITEM-${Date.now()}`,
          },
        ],
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        failureUrl: `${window.location.origin}/payment/failure`,
      });

      if (data.success) {
        // Redirect to Tabby checkout
        window.location.href = data.data.checkout_url;
      } else {
        toast.error(data.message || t('payment.createFailed'));
      }
    } catch (error) {
      console.error('Payment creation error:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('payment.create')}
            </h1>
            <p className="text-gray-600">
              {t('payment.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiShoppingCart className="w-5 h-5 mr-2" />
                {t('payment.details')}
              </h3>
              
              <Input
                label={t('payment.amount')}
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                error={errors.amount}
                placeholder={t('payment.amount')}
                step="0.01"
                min="0"
                required
              />

              <Input
                label={t('payment.description')}
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                placeholder={t('payment.description')}
                required
              />
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FiUser className="w-5 h-5 mr-2" />
                {t('payment.customerDetails')}
              </h3>
              
              <Input
                label={t('payment.customerName')}
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                error={errors.customerName}
                placeholder={t('payment.customerName')}
                required
              />

              <Input
                label={t('payment.customerEmail')}
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                error={errors.customerEmail}
                leftIcon={<FiMail className="w-5 h-5 text-gray-400" />}
                placeholder={t('payment.customerEmail')}
                required
              />

              <Input
                label={t('payment.customerPhone')}
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                error={errors.customerPhone}
                leftIcon={<FiPhone className="w-5 h-5 text-gray-400" />}
                placeholder={t('payment.customerPhone')}
                required
              />
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('payment.process')}
              </Button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              {t('payment.information')}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• {t('payment.info1')}</li>
              <li>• {t('payment.info2')}</li>
              <li>• {t('payment.info3')}</li>
              <li>• You'll receive confirmation via email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
