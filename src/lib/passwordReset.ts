import crypto from 'crypto';
import { Collection } from 'mongodb';
import { getDatabase } from './gameDatabase';

const TOKEN_EXPIRY_HOURS = 1;
const MAX_TOKENS_PER_HOUR = 3;

export interface PasswordResetToken {
  _id: string;           // SHA-256 hash of the token
  userId: string;        // Reference to User._id
  email: string;         // For rate limiting
  expiresAt: Date;       // Token expiration
  createdAt: Date;       // For rate limiting checks
}

/**
 * Get the PasswordResetToken collection
 */
export async function getPasswordResetTokenCollection(): Promise<Collection<PasswordResetToken>> {
  const database = await getDatabase();
  return database.collection<PasswordResetToken>('PasswordResetToken');
}

/**
 * Generate a cryptographically secure reset token
 * Returns both the raw token (to send to user) and its hash (to store in DB)
 */
export function generateResetToken(): { token: string; tokenHash: string } {
  // Generate 32 random bytes, base64url encode for URL-safe token
  const token = crypto.randomBytes(32).toString('base64url');
  // Store SHA-256 hash in database (never store raw token)
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  
  return { token, tokenHash };
}

/**
 * Hash a token for lookup in the database
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Check if the user has exceeded the rate limit for password reset requests
 */
export async function checkRateLimit(email: string): Promise<boolean> {
  const collection = await getPasswordResetTokenCollection();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  const recentTokens = await collection.countDocuments({
    email: email.toLowerCase(),
    createdAt: { $gte: oneHourAgo }
  });
  
  return recentTokens < MAX_TOKENS_PER_HOUR;
}

/**
 * Create a password reset token for a user
 */
export async function createPasswordResetToken(userId: string, email: string): Promise<string> {
  const collection = await getPasswordResetTokenCollection();
  const normalizedEmail = email.toLowerCase();
  
  // Check rate limit BEFORE any deletions
  const withinLimit = await checkRateLimit(normalizedEmail);
  if (!withinLimit) {
    console.log(`[PasswordReset] Rate limit exceeded for email: ${normalizedEmail}`);
    throw new Error('Too many password reset requests. Please try again later.');
  }
  
  // Only invalidate the most recent token for this user (not delete - keep for rate limiting)
  // We'll mark old tokens as expired instead of deleting them
  await collection.updateMany(
    { userId, expiresAt: { $gt: new Date() } },
    { $set: { expiresAt: new Date() } } // Expire immediately
  );
  
  // Generate new token
  const { token, tokenHash } = generateResetToken();
  
  // Store the token hash
  const tokenDoc: PasswordResetToken = {
    _id: tokenHash,
    userId,
    email: normalizedEmail,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000),
    createdAt: new Date(),
  };
  
  await collection.insertOne(tokenDoc);
  console.log(`[PasswordReset] Token created for user: ${userId}, email: ${normalizedEmail}`);
  
  // Return the raw token to send to user
  return token;
}

/**
 * Validate a password reset token and return the associated user ID
 * Returns null if token is invalid or expired
 */
export async function validateResetToken(token: string): Promise<{ userId: string; email: string } | null> {
  const collection = await getPasswordResetTokenCollection();
  const tokenHash = hashToken(token);
  
  const tokenDoc = await collection.findOne({
    _id: tokenHash,
    expiresAt: { $gt: new Date() }
  });
  
  if (!tokenDoc) {
    return null;
  }
  
  return {
    userId: tokenDoc.userId,
    email: tokenDoc.email,
  };
}

/**
 * Delete a password reset token after it has been used
 */
export async function deleteResetToken(token: string): Promise<void> {
  const collection = await getPasswordResetTokenCollection();
  const tokenHash = hashToken(token);
  
  await collection.deleteOne({ _id: tokenHash });
}

/**
 * Clean up expired tokens (can be called periodically)
 */
export async function cleanupExpiredTokens(): Promise<number> {
  const collection = await getPasswordResetTokenCollection();
  
  const result = await collection.deleteMany({
    expiresAt: { $lt: new Date() }
  });
  
  return result.deletedCount;
}
