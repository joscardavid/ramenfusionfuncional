import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, registerSchema } from '../schemas/auth';

const router = Router();

router.post('/login', validateRequest(loginSchema), AuthController.login);
router.post('/register', validateRequest(registerSchema), AuthController.register);

export { router as authRouter };