import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserCollection } from '@/lib/gameDatabase';
import bcrypt from 'bcryptjs';
import { databaseConfig } from '@/config/database';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const usersCollection = await getUserCollection();
          
          const user = await usersCollection.findOne({
            username: credentials.username.toLowerCase()
          });

          if (!user) {
            return null;
          }

          // Validate password using the same method as user creation
          const crypto = require('crypto');
          const md5Password = crypto.createHash('md5').update(credentials.password).digest('hex');
          const processedPassword = md5Password.toLowerCase() + databaseConfig.security.globalSalt;
          const isValidPassword = await bcrypt.compare(processedPassword, user.password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            characterName: user.characterName || null,
            race: user.race || null,
            gender: user.gender || null,
            level: user.level || 1
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.characterName = user.characterName;
        token.race = user.race;
        token.gender = user.gender;
        token.level = user.level;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
        session.user.characterName = token.characterName as string;
        session.user.race = token.race as string;
        session.user.gender = token.gender as string;
        session.user.level = token.level as number;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  }
};