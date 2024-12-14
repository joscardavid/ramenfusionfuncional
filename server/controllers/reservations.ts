import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendConfirmationEmail } from '../utils/email';
import { isTableAvailable, validateReservationTime } from '../utils/validation';
import { ReservationCreateInput, ReservationUpdateInput } from '../types';
import { AppError } from '../utils/errors';

const prisma = new PrismaClient();

export async function getReservations(req: Request, res: Response) {
  try {
    const { date, status, tableId } = req.query;
    
    const filters: any = {};
    if (date) filters.date = new Date(date as string);
    if (status) filters.status = status;
    if (tableId) filters.tableId = tableId;

    const reservations = await prisma.reservation.findMany({
      where: filters,
      include: { table: true },
      orderBy: { date: 'asc' },
    });

    res.json(reservations);
  } catch (error) {
    throw new AppError('Error fetching reservations', 500);
  }
}

export async function getReservation(req: Request, res: Response) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: req.params.id },
      include: { table: true },
    });
    
    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }
    
    res.json(reservation);
  } catch (error) {
    throw new AppError('Error fetching reservation', 500);
  }
}

export async function createReservation(req: Request, res: Response) {
  try {
    const data: ReservationCreateInput = req.body;

    // Validate reservation time
    if (!validateReservationTime(data.date, data.timeSlot)) {
      throw new AppError('Invalid reservation time', 400);
    }

    // Check table availability
    const isAvailable = await isTableAvailable(data.tableId, data.date, data.timeSlot);
    if (!isAvailable) {
      throw new AppError('Table not available for selected time', 400);
    }

    const reservation = await prisma.reservation.create({
      data,
      include: { table: true },
    });

    // Send confirmation email
    await sendConfirmationEmail(reservation);

    res.status(201).json(reservation);
  } catch (error) {
    throw new AppError('Error creating reservation', 500);
  }
}

export async function updateReservation(req: Request, res: Response) {
  try {
    const data: ReservationUpdateInput = req.body;
    const { id } = req.params;

    // If updating time or table, validate availability
    if (data.date || data.timeSlot || data.tableId) {
      const currentReservation = await prisma.reservation.findUnique({
        where: { id },
      });

      if (!currentReservation) {
        throw new AppError('Reservation not found', 404);
      }

      const checkDate = data.date || currentReservation.date;
      const checkTime = data.timeSlot || currentReservation.timeSlot;
      const checkTableId = data.tableId || currentReservation.tableId;

      if (!validateReservationTime(checkDate, checkTime)) {
        throw new AppError('Invalid reservation time', 400);
      }

      const isAvailable = await isTableAvailable(
        checkTableId,
        checkDate,
        checkTime,
        id
      );
      
      if (!isAvailable) {
        throw new AppError('Table not available for selected time', 400);
      }
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data,
      include: { table: true },
    });

    res.json(reservation);
  } catch (error) {
    throw new AppError('Error updating reservation', 500);
  }
}

export async function deleteReservation(req: Request, res: Response) {
  try {
    await prisma.reservation.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    throw new AppError('Error deleting reservation', 500);
  }
}