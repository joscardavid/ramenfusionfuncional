import { OPERATING_DAYS, OPENING_HOUR, CLOSING_HOUR } from '../constants';
import prisma from '../config/database';

export function validateReservationTime(date: Date, timeSlot: string): boolean {
  const day = date.getDay();
  const hour = parseInt(timeSlot.split(':')[0]);

  // Check if it's an operating day
  if (!OPERATING_DAYS.includes(day)) {
    return false;
  }

  // Check if it's within operating hours
  if (hour < OPENING_HOUR || hour >= CLOSING_HOUR) {
    return false;
  }

  // Check if the date is not in the past
  const now = new Date();
  if (date < now) {
    return false;
  }

  return true;
}

export async function isTableAvailable(
  tableId: string,
  date: Date,
  timeSlot: string,
  excludeReservationId?: string
): Promise<boolean> {
  const hour = parseInt(timeSlot.split(':')[0]);
  const startTime = new Date(date);
  startTime.setHours(hour, 0, 0, 0);
  
  const endTime = new Date(startTime);
  endTime.setHours(hour + 1, 0, 0, 0);

  const existingReservation = await prisma.reservation.findFirst({
    where: {
      tableId,
      date: {
        gte: startTime,
        lt: endTime,
      },
      status: 'CONFIRMED',
      NOT: excludeReservationId ? { id: excludeReservationId } : undefined,
    },
  });

  return !existingReservation;
}