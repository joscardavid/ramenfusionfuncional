import { getDb } from '../connection.js';
import { TABLES } from '../schema.js';
import { generateId } from '../../utils/ids.js';

export const UsersRepository = {
  async create({ email, name, password, role = 'staff' }) {
    const db = getDb();
    const id = generateId();
    
    await db.prepare(
      `INSERT INTO ${TABLES.USERS} (id, email, name, password, role)
       VALUES (?, ?, ?, ?, ?)`
    ).run(id, email, name, password, role);

    return this.findById(id);
  },

  async findById(id) {
    const db = getDb();
    return db.prepare(
      `SELECT * FROM ${TABLES.USERS} WHERE id = ?`
    ).get(id);
  },

  async findByEmail(email) {
    const db = getDb();
    return db.prepare(
      `SELECT * FROM ${TABLES.USERS} WHERE email = ?`
    ).get(email);
  },

  async update(id, data) {
    const db = getDb();
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    
    await db.prepare(
      `UPDATE ${TABLES.USERS} SET ${fields} WHERE id = ?`
    ).run(...Object.values(data), id);

    return this.findById(id);
  },
};