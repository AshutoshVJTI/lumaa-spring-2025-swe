const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const migrations = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_complete BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

async function runMigrations() {
  let client;
  try {
    client = await pool.connect();
    console.log('Connected to database. Running migrations...');
    
    await client.query('BEGIN');
    await client.query(migrations);
    await client.query('COMMIT');
    
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Migration error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      where: error.where,
      schema: error.schema,
      table: error.table,
      constraint: error.constraint,
      file: error.file,
      line: error.line,
      routine: error.routine
    });
    process.exit(1);
  } finally {
    if (client) {
      client.release();
    }
  }
}

console.log('Starting migrations...');
runMigrations().catch(error => {
  console.error('Unhandled migration error:', error);
  process.exit(1);
}); 