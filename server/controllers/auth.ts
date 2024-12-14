import { Request, Response } from 'express';
import { AuthService } from '../services/auth';
import { LoginInput, RegisterInput } from '../schemas/auth';
import { asyncHandler } from '../utils/asyncHandler';

export class AuthController {
  static login = asyncHandler(async (req: Request<{}, {}, LoginInput>, res: Response) => {
    const result = await AuthService.login(req.body);
    res.json(result);
  });

  static register = asyncHandler(async (req: Request<{}, {}, RegisterInput>, res: Response) => {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  });
}