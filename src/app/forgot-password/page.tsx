'use client';

import { useState } from 'react';
import { PageContainer, Card, Button, Input, BackLink } from '@/components/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer maxWidth="md" centerContent>
      <div className="w-full">
        <BackLink href="/" className="mb-6">
          ← Back to Login
        </BackLink>

        <Card variant="glass" title="Reset Password">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-cyan-100 mb-2">Check Your Email</h3>
              <p className="text-cyan-300/70 mb-6">
                If an account with that email exists, we&apos;ve sent you a password reset link.
                Please check your inbox and spam folder.
              </p>
              <p className="text-cyan-300/50 text-sm">
                The link will expire in 1 hour.
              </p>
            </div>
          ) : (
            <>
              <p className="text-cyan-300/70 mb-6">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  error={error}
                />

                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading || !email}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
