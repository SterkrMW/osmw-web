import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    email: string;
    characterName?: string;
    race?: string;
    gender?: string;
    level?: number;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      characterName?: string;
      race?: string;
      gender?: string;
      level?: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string;
    characterName?: string;
    race?: string;
    gender?: string;
    level?: number;
    discordId?: string;
  }
}