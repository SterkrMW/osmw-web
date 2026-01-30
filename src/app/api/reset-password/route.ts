import { NextRequest, NextResponse } from 'next/server';
import { updateUserPassword } from '@/lib/gameDatabase';
import { validateResetToken, deleteResetToken } from '@/lib/passwordReset';
import { validatePassword } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Validate the new password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors[0] },
        { status: 400 }
      );
    }

    // Validate the reset token
    const tokenData = await validateResetToken(token);
    
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token. Please request a new password reset.' },
        { status: 400 }
      );
    }

    // Update the user's password
    await updateUserPassword(tokenData.userId, password);

    // Delete the used token (one-time use)
    await deleteResetToken(token);

    return NextResponse.json(
      { message: 'Password has been reset successfully. You can now log in with your new password.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while resetting your password. Please try again.' },
      { status: 500 }
    );
  }
}
