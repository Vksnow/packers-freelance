import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_db',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_POOL_SIZE || '10'),
  queueLimit: 0,
});

// Optional event logs
pool.on('connection', () => console.log('MySQL pool connection created'));
pool.on('acquire', () => console.log('MySQL connection acquired'));
pool.on('release', () => console.log('MySQL connection released'));

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down MySQL pool...');
  await pool.end();
  process.exit(0);
});

export default pool;
