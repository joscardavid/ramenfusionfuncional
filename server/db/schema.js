export const TABLES = {
  USERS: 'users',
  TABLES: 'tables',
  RESERVATIONS: 'reservations'
};

export const SCHEMA = {
  [TABLES.USERS]: `
    CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'staff',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  
  [TABLES.TABLES]: `
    CREATE TABLE IF NOT EXISTS ${TABLES.TABLES} (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      seats INTEGER NOT NULL,
      is_available BOOLEAN DEFAULT true
    )
  `,
  
  [TABLES.RESERVATIONS]: `
    CREATE TABLE IF NOT EXISTS ${TABLES.RESERVATIONS} (
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
      FOREIGN KEY (table_id) REFERENCES ${TABLES.TABLES}(id)
    )
  `
};