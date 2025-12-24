// Database configuration for connecting to game server's MongoDB
// The website should use a dedicated database user with read/write access only to the User collection

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const databaseConfig = {
  mongodb: {
    host: getRequiredEnv('MONGODB_HOST'),
    port: parseInt(getRequiredEnv('MONGODB_PORT'), 10),
    username: getRequiredEnv('MONGODB_WEBSITE_USERNAME'),
    password: getRequiredEnv('MONGODB_WEBSITE_PASSWORD'),
    database: getRequiredEnv('MONGODB_DATABASE'),
  },
  security: {
    globalSalt: getRequiredEnv('GLOBAL_SALT'),
  },
};
