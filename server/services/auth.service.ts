import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import prisma from '../config/database';
import { config } from '../config/env';
import type { LoginCredentials } from '../types';
import { AppError } from '../utils/errors';

export class AuthService {
  static async login({ email, password }: LoginCredentials) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = await new SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(new TextEncoder().encode(config.jwtSecret));

    return { token, user: { ...user, password: undefined } };
  }

  static async register(data: LoginCredentials & { name: string }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return { ...user, password: undefined };
  }
}