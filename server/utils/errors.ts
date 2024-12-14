export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handlePrismaError(error: any): AppError {
  console.error('Database Error:', error);

  if (error.code === 'P2002') {
    return new AppError('Duplicate entry found', 400);
  }

  if (error.code === 'P2025') {
    return new AppError('Record not found', 404);
  }

  return new AppError('Database error occurred', 500);
}