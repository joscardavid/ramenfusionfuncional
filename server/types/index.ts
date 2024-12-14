import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const reservationSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  timeSlot: z.string(),
  tableId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  birthday: z.string().optional(),
  purpose: z.enum(['visita', 'aniversario', 'cumpleaños', 'reunión']).optional(),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type CreateReservationDTO = z.infer<typeof reservationSchema>;
export type UpdateReservationDTO = Partial<CreateReservationDTO>;