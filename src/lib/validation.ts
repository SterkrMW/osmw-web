// Strong password validation utility
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  // Minimum length check
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Maximum length check (prevent DoS attacks)
  if (password.length > 15) {
    errors.push('Password must be less than 15 characters');
  }

  // Alphanumeric only check (game client requirement)
  if (!/^[a-zA-Z0-9]+$/.test(password)) {
    errors.push('Password can only contain letters and numbers');
  }

  // Uppercase letter check
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Lowercase letter check
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Common password patterns check
  const commonPatterns = [
    /password/i,
    /123456/,
    /qwerty/i,
    /abc123/i,
    /admin/i,
    /letmein/i,
    /welcome/i,
    /monkey/i,
    /dragon/i
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains common patterns that are easy to guess');
      break;
    }
  }

  // Sequential characters check (e.g., 123, abc, etc.)
  if (/123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
    errors.push('Password should not contain sequential characters');
  }

  // Repeated characters check
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters (3 or more in a row)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
}

// Username validation
export function validateUsername(username: string): PasswordValidationResult {
  const errors: string[] = [];

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (username.length > 20) {
    errors.push('Username must be less than 20 characters');
  }

  // Alphanumeric only check (game client requirement)
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    errors.push('Username can only contain letters and numbers');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}