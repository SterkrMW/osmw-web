'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlassCard, GradientButton, FormField, FormInput, BackToHomepage, PageContainer } from '@/components/ui';
import { validatePassword, validateEmail, validateUsername } from '@/lib/validation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    confirmAge: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Comprehensive validation
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      setError(usernameValidation.errors[0]);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the Terms of Service');
      return;
    }

    if (!formData.confirmAge) {
      setError('You must confirm you are 18 years or older');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      // Registration successful
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    
    setFormData(prev => ({
      ...prev,
      [target.name]: value
    }));
  };

  return (
    <PageContainer maxWidth="2xl" centerContent>
      <div className="w-full">
        <GlassCard 
          title={isSuccess ? "Registration Successful!" : "Create New Account"}
          headerClassName="text-center"
          contentClassName="p-6"
        >
          {isSuccess ? (
            <div className="text-center space-y-6">
              <div className="text-green-400 text-6xl mb-4">?</div>
              <p className="text-cyan-100/90 text-lg mb-6">
                Your account has been created successfully!
              </p>
              <p className="text-cyan-100/70 text-sm mb-6">
                You can now log in with your new account credentials.
              </p>
              <div className="space-y-3">
                <Link href="/login">
                  <GradientButton variant="primary" fullWidth size="lg">
                    Go to Login
                  </GradientButton>
                </Link>
                <Link href="/">
                  <GradientButton variant="secondary" fullWidth>
                    Back to Homepage
                  </GradientButton>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-cyan-100/90 text-sm text-center mb-6">Join the Open Source Myth War community</p>
              <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-900/50 border border-red-400/50 rounded text-red-200 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Username" required>
                  <FormInput
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose your username"
                    required
                  />
                </FormField>

                <FormField label="Email" required>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormField>

                <FormField label="Password" required>
                  <FormInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </FormField>

                <FormField label="Confirm Password" required>
                  <FormInput
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </FormField>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="confirmAge"
                    checked={formData.confirmAge}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-cyan-600 bg-slate-800 border-cyan-400 rounded focus:ring-cyan-500"
                    required
                  />
                  <label className="text-sm text-cyan-100/90">
                    I confirm that I am <strong className="text-cyan-300">18 years of age or older</strong>. 
                    This server does not accept registrations from minors under 18 years of age.
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-cyan-600 bg-slate-800 border-cyan-400 rounded focus:ring-cyan-500"
                    required
                  />
                  <label className="text-sm text-cyan-100/90">
                    I accept the{' '}
                    <Link href="/terms" target="_blank" className="text-cyan-300 hover:text-cyan-200 underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" target="_blank" className="text-cyan-300 hover:text-cyan-200 underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

                <GradientButton
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  fullWidth
                  size="lg"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </GradientButton>
              </form>

              <div className="mt-6 pt-4 border-t border-cyan-500/20 text-center">
                <p className="text-cyan-100/70 text-sm mb-3">
                  Already have an account?
                </p>
                <Link href="/login">
                  <GradientButton variant="secondary" fullWidth>
                    Login to Existing Account
                  </GradientButton>
                </Link>
              </div>
            </>
          )}
        </GlassCard>

        <div className="mt-4 text-center">
          <BackToHomepage />
        </div>
      </div>
    </PageContainer>
  );
}