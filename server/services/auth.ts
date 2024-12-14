import bcrypt from 'bcryptjs';
import { db } from '../config/database';
import { createToken } from '../utils/jwt';
import { AppError } from '../utils/errors';
import type { LoginInput, RegisterInput } from '../schemas/auth';

export class AuthService {
  static async login({ email, password }: LoginInput) {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = await createToken(user);
    return { token, user: { ...user, password: undefined } };
  }

  static async register({ email, password, name }: RegisterInput) {
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO users (id, email, name, password, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(crypto.randomUUID(), email, name, hashedPassword, 'staff');

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    return { ...user, password: undefined };
  }
}