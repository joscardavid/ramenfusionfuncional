import { z } from 'zod';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3000'),
  JWT_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const config = {
  env: parsed.data.NODE_ENV,
  port: parseInt(parsed.data.PORT, 10),
  jwtSecret: parsed.data.JWT_SECRET,
  isDev: parsed.data.NODE_ENV === 'development',
};