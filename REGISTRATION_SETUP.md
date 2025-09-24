# User Registration Setup

This document explains how to set up user registration for the Myth War website.

## Overview

The website supports user registration that integrates directly with the game server's MongoDB database. Users can register through the website and their accounts will be available in the game.

## Configuration

### Environment Variables

Create a `.env.local` file in the website directory with the following variables:

```env
# MongoDB Configuration (should match game server config)
MONGODB_HOST=127.0.0.1
MONGODB_PORT=27017
# Use dedicated website user credentials for security
MONGODB_WEBSITE_USERNAME=website_user
MONGODB_WEBSITE_PASSWORD=secure_password
# Fallback to main credentials if website user not set up
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_DATABASE=MythWarServer

# Security Configuration (should match game server config)
GLOBAL_SALT=Ch@ngeInPr0duct1on:)

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Database Setup

1. Ensure MongoDB is running on your system
2. Make sure the database configuration matches your game server's configuration
3. The website will connect to the same MongoDB instance as the game server

### Security Setup (Recommended)

For production environments, create a dedicated MongoDB user with restricted permissions:

```javascript
// Connect to MongoDB as admin and create restricted user
use MythWarServer
db.createUser({
  user: "website_user",
  pwd: "secure_password",
  roles: [
    {
      role: "readWrite",
      db: "MythWarServer",
      collection: "User"
    }
  ]
})
```

This ensures the website can only access the User collection and cannot read or modify other game data.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see Configuration section)

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- **Email Support**: User accounts now include email addresses
- **Password Security**: Passwords are hashed using the same method as the game server
- **Duplicate Prevention**: Checks for existing usernames and email addresses
- **Input Validation**: Comprehensive validation for usernames, emails, and passwords
- **Age Verification**: Requires users to confirm they are 18+ years old
- **Terms Acceptance**: Users must accept terms of service

## Database Schema

The User collection in MongoDB now includes:

```typescript
{
  username: string,        // Lowercase username (used as key)
  email: string,          // User's email address
  password: string,       // Bcrypt hashed password
  characters: number[],   // Array of character IDs
  isAdmin: boolean        // Admin status
}
```

## API Endpoints

### POST /api/register

Registers a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string", 
  "password": "string"
}
```

**Response:**
- 201: User created successfully
- 400: Validation error or user already exists
- 500: Internal server error

## Security Notes

- **Collection Access**: The website is restricted to only access the User collection
- **Database User**: Use a dedicated MongoDB user with limited permissions for the website
- **Password Security**: Passwords are processed the same way as the game server (MD5 + global salt + bcrypt)
- **Data Validation**: Usernames are stored in lowercase for consistency, email addresses are validated
- **No Game Data Exposure**: The website cannot access player data, guilds, items, or other game collections
- **CSRF Protection**: No CSRF protection is currently implemented (can be added if needed)

## Testing

1. Navigate to `/register` on the website
2. Fill out the registration form
3. Check the MongoDB database to verify the user was created
4. Test logging in with the game client using the new credentials
