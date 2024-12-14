import { Router } from 'express';
import { ReservationsService } from '../services/reservations.js';
import { TablesService } from '../services/tables.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const reservations = await ReservationsService.findAll(req.query);
    res.json(reservations);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { tableId, date, timeSlot } = req.body;

    // Check availability first
    const isAvailable = await TablesService.checkAvailability(
      tableId,
      date,
      timeSlot
    );

    if (!isAvailable) {
      return res.status(400).json({
        message: 'Table not available for selected time'
      });
    }

    const reservation = await ReservationsService.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const reservation = await ReservationsService.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const reservation = await ReservationsService.update(req.params.id, req.body);
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await ReservationsService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as reservationsRouter };