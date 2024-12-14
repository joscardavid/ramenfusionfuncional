import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError, handlePrismaError } from '../utils/errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    return res.status(prismaError.statusCode).json({
      status: 'error',
      message: prismaError.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}