import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL
}

const { Pool } = pg;
const connection = new Pool(dbConfig);

export default connection;
