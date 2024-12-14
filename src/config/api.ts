import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().optional(),
  MODE: z.enum(['development', 'production']).default('development'),
});

const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  MODE: import.meta.env.MODE,
});

export const config = {
  apiUrl: env.VITE_API_URL || 'http://localhost:3000/api',
  isDev: env.MODE === 'development',
};

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  reservations: {
    list: '/reservations',
    create: '/reservations',
    get: (id: string) => `/reservations/${id}`,
    update: (id: string) => `/reservations/${id}`,
    delete: (id: string) => `/reservations/${id}`,
  },
  tables: {
    list: '/tables',
    get: (id: string) => `/tables/${id}`,
    availability: '/tables/availability',
  },
};