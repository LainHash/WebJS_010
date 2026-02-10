import mysql from "mysql2/promise";
import "dotenv/config";

export const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  database: process.env.DB_NAME || "my_database",
};

let pool = null;

export const initializeDatabase = async () => {
  if (!pool) {
    pool = await mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 50,
      queueLimit: 0,
    });
    console.log("Database pool created successfully");
  }
  return pool;
};
