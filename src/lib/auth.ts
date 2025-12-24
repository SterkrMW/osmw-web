import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import { getUserCollection } from '@/lib/gameDatabase';
import bcrypt from 'bcryptjs';
import { databaseConfig } from '@/config/database';
import crypto from 'crypto';

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
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
            characterName: user.characterName,
            race: user.race,
            gender: user.gender,
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
    async jwt({ token, user, account }) {
      if (user) {
        token.username = user.username;
        token.characterName = user.characterName;
        token.race = user.race;
        token.gender = user.gender;
        token.level = user.level;
      }
      if (account?.provider === 'discord' && account.providerAccountId) {
        token.discordId = account.providerAccountId;
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
        if (token.discordId) {
          (session as any).discordId = token.discordId;
        }
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