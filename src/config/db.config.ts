export const dbConfig = () => ({
  database: {
    port: parseInt(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },
});
