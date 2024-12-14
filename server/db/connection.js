import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

let db = null;
let isInitializing = false;
let initPromise = null;

export async function initDb() {
  // Return existing database if already initialized
  if (db) return db;

  // Return existing promise if initialization is in progress
  if (isInitializing) return initPromise;

  isInitializing = true;
  initPromise = initializeDatabase();

  try {
    db = await initPromise;
    return db;
  } finally {
    isInitializing = false;
    initPromise = null;
  }
}

async function initializeDatabase() {
  try {
    const sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    });

    const opfsDb = await sqlite3.oo1.OpfsDb('/mydb.sqlite3');

    // Create a wrapper around the database with a familiar API
    const wrapper = {
      prepare: (sql) => {
        const stmt = opfsDb.prepare(sql);
        return {
          run: (...params) => {
            try {
              return stmt.run(params);
            } catch (error) {
              console.error('Error executing query:', sql, error);
              throw error;
            }
          },
          get: (...params) => {
            try {
              return stmt.get(params);
            } catch (error) {
              console.error('Error executing query:', sql, error);
              throw error;
            }
          },
          all: (...params) => {
            try {
              return stmt.all(params);
            } catch (error) {
              console.error('Error executing query:', sql, error);
              throw error;
            }
          },
        };
      },
      exec: (sql) => {
        try {
          return opfsDb.exec(sql);
        } catch (error) {
          console.error('Error executing query:', sql, error);
          throw error;
        }
      },
      transaction: (fn) => {
        try {
          opfsDb.exec('BEGIN');
          const result = fn(wrapper);
          opfsDb.exec('COMMIT');
          return result;
        } catch (error) {
          opfsDb.exec('ROLLBACK');
          throw error;
        }
      },
    };

    console.log('✓ Database initialized successfully');
    return wrapper;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return db;
}