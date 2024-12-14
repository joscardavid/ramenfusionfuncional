import { Router } from 'express';
import { TableService } from '../services/table.service';
import { authenticate } from '../middleware/authenticate';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tables = await TableService.findAll();
    res.json(tables);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const table = await TableService.findById(req.params.id);
    res.json(table);
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const table = await TableService.update(req.params.id, req.body);
    res.json(table);
  })
);

export { router };