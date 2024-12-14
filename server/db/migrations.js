import { SCHEMA } from './schema.js';

export async function runMigrations(db) {
  console.log('Running database migrations...');

  try {
    // Create tables
    for (const [table, schema] of Object.entries(SCHEMA)) {
      await db.exec(schema);
      console.log(`✓ Created table: ${table}`);
    }

    // Add any additional migrations here
    // Example:
    // await db.exec(`ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT`);

    console.log('✓ All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}