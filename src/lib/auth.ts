import { jwtVerify, SignJWT } from 'jose';
import type { User } from '../types/admin';

const JWT_SECRET = new TextEncoder().encode(
  import.meta.env.VITE_JWT_SECRET || 'your-secret-key'
);

export async function createToken(user: User): Promise<string> {
  const token = await new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export function getTokenFromStorage(): string | null {
  return localStorage.getItem('adminToken');
}

export function setTokenToStorage(token: string): void {
  localStorage.setItem('adminToken', token);
}

export function removeTokenFromStorage(): void {
  localStorage.removeItem('adminToken');
}