import { Router } from 'express';
import { body } from 'express-validator';
import { ReservationService } from '../services/reservation.service';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/authenticate';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const reservations = await ReservationService.findAll(req.query);
    res.json(reservations);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const reservation = await ReservationService.findById(req.params.id);
    res.json(reservation);
  })
);

router.post(
  '/',
  [
    body('date').isISO8601(),
    body('timeSlot').notEmpty(),
    body('tableId').notEmpty(),
    body('customerName').notEmpty(),
    body('customerEmail').isEmail(),
    body('customerPhone').notEmpty(),
    validateRequest,
  ],
  asyncHandler(async (req, res) => {
    const reservation = await ReservationService.create(req.body);
    res.status(201).json(reservation);
  })
);

router.patch(
  '/:id',
  [
    body('date').optional().isISO8601(),
    body('timeSlot').optional().notEmpty(),
    body('tableId').optional().notEmpty(),
    body('customerEmail').optional().isEmail(),
    validateRequest,
  ],
  asyncHandler(async (req, res) => {
    const reservation = await ReservationService.update(req.params.id, req.body);
    res.json(reservation);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await ReservationService.delete(req.params.id);
    res.status(204).send();
  })
);

export { router };