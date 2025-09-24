'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassCard, GradientButton, FormField, FormInput, BackToHomepage, PageContainer } from '@/components/ui';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Authentication system not yet implemented - disable login
    setError('Login is currently disabled. Authentication system is under development.');
    return;

    setIsLoading(true);
    // TODO: Implement actual login with NextAuth and CSRF protection
    setTimeout(() => {
      if (formData.username && formData.password) {
        router.push('/');
      } else {
        setError('Please enter both username and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageContainer maxWidth="md" centerContent>
      <div className="w-full">
        <GlassCard 
          title="Player Login"
          headerClassName="text-center"
          contentClassName="p-6"
        >
          <p className="text-cyan-100/90 text-sm text-center mb-6">Enter your account details</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}

                <FormField label="Username" required>
                  <FormInput
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </FormField>

                <FormField label="Password" required>
                  <FormInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </FormField>

                <GradientButton
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  fullWidth
                  size="lg"
                >
                  {isLoading ? 'Logging in...' : 'Login to Account'}
                </GradientButton>
              </form>

              <div className="mt-6 pt-4 border-t border-cyan-500/20 text-center">
                <p className="text-cyan-100/70 text-sm mb-3">
                  Don&apos;t have an account yet?
                </p>
                <Link href="/register">
                  <GradientButton variant="secondary" fullWidth>
                    Create New Account
                  </GradientButton>
                </Link>
              </div>

        </GlassCard>

        <div className="mt-4 text-center">
          <BackToHomepage />
        </div>
      </div>
    </PageContainer>
  );
}