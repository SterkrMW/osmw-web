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
}

// Security: Only allow access to the User collection
const ALLOWED_COLLECTIONS = ['User'];

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

export async function createUser(username: string, email: string, password: string): Promise<void> {
  const usersCollection = await getUserCollection();
  
  // Check if user already exists
  const existingUser = await usersCollection.findOne({
    $or: [
      { username: username.toLowerCase() },
      { email: email }
    ]
  });
  
  if (existingUser) {
    if (existingUser.username === username.toLowerCase()) {
      throw new Error('Username already exists');
    }
    if (existingUser.email === email) {
      throw new Error('Email already exists');
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
  };
  
  await usersCollection.insertOne(userDoc);
}

export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
