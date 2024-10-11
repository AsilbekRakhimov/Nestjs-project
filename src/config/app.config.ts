export const appConfig = () => ({
  appConfig: {
    port: parseInt(process.env.APP_PORT) || 8080,
    host: process.env.APP_HOST || 'localhost',
  },
});
