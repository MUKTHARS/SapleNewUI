// src/app/page.tsx - UPDATED
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { EnterpriseSection } from './components/EnterpriseSection';
import { UseCasesSection } from './components/UseCasesSection';
import { StatsSection } from './components/StatsSection';
import { CtaSection } from './components/CtaSection';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function Home() {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Check if user has a workspace
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/workspace/current/`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          if (response.ok) {
            // User has workspace, redirect to dashboard
            router.push('/dashboard');
          } else if (response.status === 404) {
            // User doesn't have workspace, stay on home page
            // The UserSection will show the "Create Workspace" button
            setIsChecking(false);
          } else {
            // Other error, stay on home page
            setIsChecking(false);
          }
        } catch (error) {
          console.error('Failed to check workspace:', error);
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ErrorBoundary>
        <HeroSection />
        <FeaturesSection />
        <EnterpriseSection />
        <UseCasesSection />
        <StatsSection />
        <CtaSection />
      </ErrorBoundary>
    </div>
  );
}