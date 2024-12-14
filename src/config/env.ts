import { z } from 'zod';

const envSchema = z.object({
  MODE: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3000'),
  VITE_API_URL: z.string().optional(),
});

const parsed = envSchema.safeParse({
  MODE: import.meta.env.MODE,
  PORT: import.meta.env.PORT,
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const config = {
  env: parsed.data.MODE,
  port: parseInt(parsed.data.PORT, 10),
  apiUrl: parsed.data.VITE_API_URL,
  isDev: parsed.data.MODE === 'development',
};