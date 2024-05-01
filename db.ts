// db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: 5432, // or your PostgreSQL port
});

export default pool;
