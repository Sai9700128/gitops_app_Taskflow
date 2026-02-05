const mysql = require('mysql2/promise');

let pool;

const initializeDatabase = async () => {
  // Step 1: Connect WITHOUT database (to create it if needed)
  const tempConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  // Step 2: Create database if not exists
  await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  console.log(`✅ Database '${process.env.DB_NAME}' ready`);
  await tempConnection.end();

  // Step 3: Now create pool WITH database
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

const testConnection = async () => {
  try {
    // Initialize database first
    await initializeDatabase();

    // Test the connection
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
};

const getPool = () => pool;

module.exports = { getPool, testConnection };