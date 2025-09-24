// Database configuration for connecting to game server's MongoDB
// The website should use a dedicated database user with read/write access only to the User collection
export const databaseConfig = {
  mongodb: {
    host: process.env.MONGODB_HOST || '57.129.41.184',
    port: parseInt(process.env.MONGODB_PORT || '27017'),
    // Use dedicated website user credentials (should have restricted permissions)
    username: process.env.MONGODB_WEBSITE_USERNAME || process.env.MONGODB_USERNAME || 'userMan',
    password: process.env.MONGODB_WEBSITE_PASSWORD || process.env.MONGODB_PASSWORD || 'OsMw1319userMan',
    database: process.env.MONGODB_DATABASE || 'MythWarServer',
  },
  security: {
    globalSalt: process.env.GLOBAL_SALT || 'reD3t_.=sqTVEsMXie6qYJ-v',
  },
};
