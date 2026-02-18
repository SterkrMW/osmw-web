'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageContainer, Card, Button, Input, BackLink } from '@/components/ui';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Client-side password validation for better UX
  useEffect(() => {
    if (!password) {
      setValidationErrors([]);
      return;
    }

    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('At least 6 characters');
    }
    if (password.length > 14) {
      errors.push('Maximum 14 characters');
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      errors.push('Letters and numbers only');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('At least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('At least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('At least one number');
    }

    setValidationErrors(errors);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (validationErrors.length > 0) {
      setError('Please fix password requirements');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
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

  if (!token) {
    return (
      <Card variant="glass" title="Invalid Link">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-400/30">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-cyan-100 mb-2">Invalid Reset Link</h3>
          <p className="text-cyan-300/70 mb-6">
            This password reset link is invalid. Please request a new one.
          </p>
          <Link 
            href="/forgot-password"
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            Request New Reset Link
          </Link>
        </div>
      </Card>
    );
  }

  if (success) {
    return (
      <Card variant="glass" title="Password Reset">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-cyan-100 mb-2">Password Reset Successful</h3>
          <p className="text-cyan-300/70 mb-6">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/80 to-teal-600/80 hover:from-cyan-500 hover:to-teal-600 text-white font-bold rounded transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass" title="Set New Password">
      <p className="text-cyan-300/70 mb-6">
        Enter your new password below. Make sure it meets all the requirements.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="password"
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          
          {/* Password requirements checklist */}
          {password && (
            <div className="mt-2 space-y-1">
              <PasswordRequirement met={password.length >= 6 && password.length <= 14}>
                6-14 characters
              </PasswordRequirement>
              <PasswordRequirement met={/^[a-zA-Z0-9]+$/.test(password)}>
                Letters and numbers only
              </PasswordRequirement>
              <PasswordRequirement met={/[A-Z]/.test(password)}>
                At least one uppercase letter
              </PasswordRequirement>
              <PasswordRequirement met={/[a-z]/.test(password)}>
                At least one lowercase letter
              </PasswordRequirement>
              <PasswordRequirement met={/[0-9]/.test(password)}>
                At least one number
              </PasswordRequirement>
            </div>
          )}
        </div>

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          disabled={isLoading || !password || !confirmPassword || validationErrors.length > 0 || password !== confirmPassword}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Card>
  );
}

function PasswordRequirement({ met, children }: { met: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-400' : 'text-cyan-300/50'}`}>
      {met ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
        </svg>
      )}
      {children}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <PageContainer maxWidth="md" centerContent>
      <div className="w-full">
        <BackLink href="/" className="mb-6">
          ← Back to Login
        </BackLink>

        <Suspense fallback={
          <Card variant="glass" title="Loading...">
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
          </Card>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
