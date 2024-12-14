import Database from 'better-sqlite3';
import { TABLES } from './config/tables.js';

let db;

export async function initDb() {
  db = new Database('data.db');

  // Initialize tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'staff',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tables (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      seats INTEGER NOT NULL,
      is_available BOOLEAN DEFAULT true
    );

    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      table_id TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      birthday TEXT,
      purpose TEXT,
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (table_id) REFERENCES tables(id)
    );
  `);

  // Seed tables if empty
  const tableCount = db.prepare('SELECT COUNT(*) as count FROM tables').get();
  
  if (tableCount.count === 0) {
    const insert = db.prepare('INSERT INTO tables (id, type, seats, is_available) VALUES (?, ?, ?, ?)');
    
    for (const table of TABLES) {
      insert.run(table.id, table.type, table.seats, table.isAvailable ? 1 : 0);
    }
  }

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}