import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/gameDatabase';
import { createPasswordResetToken } from '@/lib/passwordReset';
import { sendPasswordResetEmail } from '@/lib/email';
import { validateEmail } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Always return success to prevent email enumeration
    // Process the actual reset in the background
    const successResponse = NextResponse.json(
      { message: 'If an account with that email exists, a password reset link has been sent.' },
      { status: 200 }
    );

    // Look up user by email
    console.log(`[ForgotPassword] Looking up user by email: ${email}`);
    const user = await getUserByEmail(email);
    
    if (!user) {
      // Don't reveal that the email doesn't exist
      console.log(`[ForgotPassword] No user found with email: ${email}`);
      return successResponse;
    }
    
    console.log(`[ForgotPassword] User found: ${user._id}`);

    try {
      // Create password reset token
      console.log(`[ForgotPassword] Creating reset token for user: ${user._id}`);
      const token = await createPasswordResetToken(user._id, email);

      // Send the reset email
      console.log(`[ForgotPassword] Sending reset email to: ${email}`);
      await sendPasswordResetEmail(email, token);
      console.log(`[ForgotPassword] Email sent successfully to: ${email}`);
    } catch (error) {
      // Log the error but don't reveal it to the user
      console.error('[ForgotPassword] Failed to process password reset:', error);
      
      // Check if it's a rate limit error - we can reveal this
      if (error instanceof Error && error.message.includes('Too many password reset requests')) {
        return NextResponse.json(
          { error: 'Too many password reset requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return successResponse;
  } catch (error) {
    console.error('Forgot password error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
