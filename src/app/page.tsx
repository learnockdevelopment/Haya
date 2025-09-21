import { Suspense } from 'react';
import { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Haya - Home',
  description: 'Welcome to Haya - Your Digital Platform',
};

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  );
}
