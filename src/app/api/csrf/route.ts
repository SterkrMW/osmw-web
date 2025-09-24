import { NextRequest, NextResponse } from 'next/server';
import { CSRFProtection } from '@/lib/csrf';

// GET endpoint to provide CSRF token to clients
export async function GET(request: NextRequest) {
  try {
    const token = CSRFProtection.generateToken();
    
    const response = NextResponse.json({ 
      token,
      message: 'CSRF token generated successfully' 
    });

    // Set CSRF token as HttpOnly cookie
    CSRFProtection.setCookieToken(response, token);

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}