import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { config } from '../config/env';
import { AppError } from '../utils/errors';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError('Authentication required', 401);
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(config.jwtSecret)
    );
    
    req.user = payload;
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}