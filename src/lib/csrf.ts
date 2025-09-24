import { NextRequest } from 'next/server';
import crypto from 'crypto';

// CSRF Protection Utility
export class CSRFProtection {
  private static readonly TOKEN_LENGTH = 32;
  private static readonly COOKIE_NAME = 'csrf-token';
  private static readonly HEADER_NAME = 'x-csrf-token';

  // Generate a cryptographically secure CSRF token
  static generateToken(): string {
    return crypto.randomBytes(this.TOKEN_LENGTH).toString('hex');
  }

  // Verify CSRF token from request
  static verifyToken(request: NextRequest): boolean {
    const cookieToken = request.cookies.get(this.COOKIE_NAME)?.value;
    const headerToken = request.headers.get(this.HEADER_NAME);

    if (!cookieToken || !headerToken) {
      return false;
    }

    // Use constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(cookieToken, 'hex'),
      Buffer.from(headerToken, 'hex')
    );
  }

  // Create response with CSRF cookie
  static setCookieToken(response: Response, token: string): void {
    const cookie = `${this.COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`;
    response.headers.set('Set-Cookie', cookie);
  }

  // Middleware to check CSRF on state-changing requests
  static async middleware(request: NextRequest): Promise<boolean> {
    const method = request.method;
    
    // Skip CSRF check for safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return true;
    }

    // Verify CSRF token for unsafe methods
    return this.verifyToken(request);
  }
}

// Custom error for CSRF failures
export class CSRFError extends Error {
  constructor() {
    super('CSRF token validation failed');
    this.name = 'CSRFError';
  }
}