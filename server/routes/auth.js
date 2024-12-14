import { Router } from 'express';
import { AuthService } from '../services/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../schemas/auth.js';

const router = Router();

router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export { router as authRouter };