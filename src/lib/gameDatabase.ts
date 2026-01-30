import { MongoClient, Db, Collection } from 'mongodb';
import bcrypt from 'bcryptjs';
import { databaseConfig } from '../config/database';
import crypto from 'crypto';

let client: MongoClient | null = null;
let db: Db | null = null;

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  characters: unknown[];
  isAdmin: boolean;
  characterName?: string;
  race?: string;
  gender?: string;
  level?: number;
  discordId?: string;
}

// Security: Only allow access to specific collections
const ALLOWED_COLLECTIONS = ['User', 'PasswordResetToken'];

export async function getDatabase(): Promise<Db> {
  if (!db) {
    const connectionString = `mongodb://${databaseConfig.mongodb.username}:${databaseConfig.mongodb.password}@${databaseConfig.mongodb.host}:${databaseConfig.mongodb.port}/${databaseConfig.mongodb.database}?authSource=${databaseConfig.mongodb.database}`;
    
    client = new MongoClient(connectionString);
    
    await client.connect();
    db = client.db(databaseConfig.mongodb.database);
  }
  return db;
}

// Restricted access to only the User collection
export async function getUserCollection(): Promise<Collection<User>> {
  const database = await getDatabase();
  return database.collection<User>('User');
}

// Security wrapper to prevent access to other collections
export async function getCollection(collectionName: string): Promise<Collection> {
  if (!ALLOWED_COLLECTIONS.includes(collectionName)) {
    throw new Error(`Access to collection '${collectionName}' is not allowed. Only User collection access is permitted.`);
  }
  
  const database = await getDatabase();
  return database.collection(collectionName);
}

export async function createUser(username: string, email: string, password: string, discordId?: string): Promise<void> {
  const usersCollection = await getUserCollection();
  
  // Check if user already exists
  const existingUser = await usersCollection.findOne({
    $or: [
      { username: username.toLowerCase() },
      { email: email },
      ...(discordId ? [{ discordId: discordId }] : [])
    ]
  });
  
  if (existingUser) {
    if (existingUser.username === username.toLowerCase()) {
      throw new Error('Username already exists');
    }
    if (existingUser.email === email) {
      throw new Error('Email already exists');
    }
    if (discordId && existingUser.discordId === discordId) {
      throw new Error('Discord account already registered');
    }
  }
  
  // Hash the password using the same method as the game server
  const md5Password = crypto.createHash('md5').update(password).digest('hex');
  const processedPassword = md5Password.toLowerCase() + databaseConfig.security.globalSalt;
  const hashedPassword = await bcrypt.hash(processedPassword, 10);
  
  // Create new user document with username as _id to match game server format
  const userDoc: User = {
    _id: username.toLowerCase(), // Use username as _id to match game server format
    username: username.toLowerCase(),
    email: email,
    password: hashedPassword,
    characters: [],
    isAdmin: false,
    ...(discordId ? { discordId: discordId } : {})
  };
  
  await usersCollection.insertOne(userDoc);
}

/**
 * Find a user by their email address
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const usersCollection = await getUserCollection();
  
  return usersCollection.findOne({ email: email });
}

/**
 * Update a user's password
 * Uses the same hashing method as createUser for consistency with game server
 */
export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  const usersCollection = await getUserCollection();
  
  // Hash the password using the same method as the game server
  const md5Password = crypto.createHash('md5').update(newPassword).digest('hex');
  const processedPassword = md5Password.toLowerCase() + databaseConfig.security.globalSalt;
  const hashedPassword = await bcrypt.hash(processedPassword, 10);
  
  const result = await usersCollection.updateOne(
    { _id: userId },
    { $set: { password: hashedPassword } }
  );
  
  if (result.matchedCount === 0) {
    throw new Error('User not found');
  }
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
