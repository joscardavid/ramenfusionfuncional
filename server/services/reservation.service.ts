import prisma from '../config/database';
import { transporter } from '../config/email';
import { AppError } from '../utils/errors';
import { isTableAvailable, validateReservationTime } from '../utils/validation';
import type { CreateReservationDTO, UpdateReservationDTO } from '../types';

export class ReservationService {
  static async create(data: CreateReservationDTO) {
    if (!validateReservationTime(data.date, data.timeSlot)) {
      throw new AppError('Invalid reservation time', 400);
    }

    const isAvailable = await isTableAvailable(
      data.tableId,
      data.date,
      data.timeSlot
    );

    if (!isAvailable) {
      throw new AppError('Table not available for selected time', 400);
    }

    const reservation = await prisma.reservation.create({
      data,
      include: { table: true },
    });

    // Send confirmation email
    await this.sendConfirmationEmail(reservation);

    return reservation;
  }

  static async update(id: string, data: UpdateReservationDTO) {
    const currentReservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!currentReservation) {
      throw new AppError('Reservation not found', 404);
    }

    if (data.date || data.timeSlot || data.tableId) {
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

    return prisma.reservation.update({
      where: { id },
      data,
      include: { table: true },
    });
  }

  static async delete(id: string) {
    await prisma.reservation.delete({ where: { id } });
  }

  static async findById(id: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { table: true },
    });

    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }

    return reservation;
  }

  static async findAll(filters: {
    date?: Date;
    status?: string;
    tableId?: string;
  }) {
    return prisma.reservation.findMany({
      where: filters,
      include: { table: true },
      orderBy: { date: 'asc' },
    });
  }

  private static async sendConfirmationEmail(reservation: any) {
    const { customerEmail, customerName, date, timeSlot } = reservation;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: customerEmail,
      subject: 'Confirmación de Reservación - Ramen Fusion',
      html: `
        <h1>¡Gracias por su reservación!</h1>
        <p>Estimado/a ${customerName},</p>
        <p>Su reservación ha sido confirmada para el ${date} a las ${timeSlot}.</p>
      `,
    });
  }
}