'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { GlassCard, GradientButton, FormField, FormInput, PageContainer } from '@/components/ui';
import { validatePassword, validateEmail, validateUsername } from '@/lib/validation';

function ErrorHandler({ setError }: { setError: (error: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'OAuthSignin') {
      setError('Discord authentication failed. Please check that Discord Client ID and Secret are configured correctly, and that the redirect URI matches your Discord app settings.');
    } else if (errorParam === 'OAuthCallback') {
      setError('Discord callback error. Please try again.');
    } else if (errorParam === 'OAuthCreateAccount') {
      setError('Failed to create Discord session. Please try again.');
    } else if (errorParam === 'Configuration') {
      setError('Discord OAuth configuration error. Please check your environment variables.');
    }
  }, [searchParams, setError]);

  return null;
}

function OAuthErrorTroubleshooting() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  
  if (errorParam !== 'OAuthSignin') {
    return null;
  }

  return (
    <div className="p-3 bg-yellow-900/50 border border-yellow-400/50 rounded text-yellow-200 text-xs text-left space-y-2">
      <p className="font-semibold">Troubleshooting OAuth Error:</p>
      <ul className="list-disc list-inside space-y-1 ml-2">
        <li>Verify DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET are set in your environment variables</li>
        <li>Check that your Discord app redirect URI matches: <code className="bg-slate-800 px-1 rounded">{typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/callback/discord</code></li>
        <li>Ensure your Discord application is properly configured in the Discord Developer Portal</li>
      </ul>
    </div>
  );
}

function RegisterPageContent() {
  const { data: session, status } = useSession();
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
  const [isDiscordLoading, setIsDiscordLoading] = useState(false);

  const hasDiscordAuth = session && session.discordId;


  const handleDiscordLogin = async () => {
    setIsDiscordLoading(true);
    setError('');
    try {
      await signIn('discord', { callbackUrl: window.location.origin + '/' });
    } catch (error) {
      console.error('Discord login error:', error);
      setError('Failed to connect with Discord. Please try again.');
      setIsDiscordLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!hasDiscordAuth) {
      setError('Please authenticate with Discord first');
      return;
    }

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

  if (status === 'loading') {
    return (
      <PageContainer maxWidth="2xl" centerContent>
        <div className="w-full">
          <GlassCard 
            title="Loading..."
            headerClassName="text-center"
            contentClassName="p-6"
          >
            <div className="text-center">
              <p className="text-cyan-100/90">Please wait...</p>
            </div>
          </GlassCard>
        </div>
      </PageContainer>
    );
  }

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
            </div>
          ) : !hasDiscordAuth ? (
            <div className="space-y-6">
              <p className="text-cyan-100/90 text-sm text-center mb-6">
                To register for Open Source Myth War, you must first authenticate with Discord.
                Our game heavily relies on Discord interactions, so this step ensures you have Discord set up.
              </p>
              {error && (
                <div className="p-3 bg-red-900/50 border border-red-400/50 rounded text-red-200 text-sm text-center">
                  {error}
                </div>
              )}
              <Suspense fallback={null}>
                <ErrorHandler setError={setError} />
                <OAuthErrorTroubleshooting />
              </Suspense>
              <GradientButton
                onClick={handleDiscordLogin}
                disabled={isDiscordLoading}
                variant="primary"
                fullWidth
                size="lg"
                className="flex items-center justify-center gap-3"
              >
                {isDiscordLoading ? (
                  'Connecting to Discord...'
                ) : (
                  <>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
                    </svg>
                    Login with Discord
                  </>
                )}
              </GradientButton>
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
                    I accept the Terms of Service and Privacy Policy
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
            </>
          )}
        </GlassCard>
      </div>
    </PageContainer>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <PageContainer maxWidth="2xl" centerContent>
        <div className="w-full">
          <GlassCard 
            title="Loading..."
            headerClassName="text-center"
            contentClassName="p-6"
          >
            <div className="text-center">
              <p className="text-cyan-100/90">Please wait...</p>
            </div>
          </GlassCard>
        </div>
      </PageContainer>
    }>
      <RegisterPageContent />
    </Suspense>
  );
}
