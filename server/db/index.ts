import { Database } from 'sqlite3';
import { Client } from 'pg';
import { config, isDevelopment } from '../config';

let db: any;

if (isDevelopment) {
  // SQLite for development
  db = new Database(':memory:', (err) => {
    if (err) {
      console.error('Error opening database:', err);
    } else {
      console.log('Connected to SQLite database');
    }
  });
} else {
  // PostgreSQL for production
  const client = new Client({
    connectionString: config.database.url,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));

  db = client;
}

export default db;