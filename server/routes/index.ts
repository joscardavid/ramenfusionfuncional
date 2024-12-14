import { Router } from 'express';
import { authRouter } from './auth';
import { reservationsRouter } from './reservations';
import { tablesRouter } from './tables';

const router = Router();

router.use('/auth', authRouter);
router.use('/reservations', reservationsRouter);
router.use('/tables', tablesRouter);

export { router as apiRouter };