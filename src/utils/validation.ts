import { z } from 'zod';

export const reservationSchema = z.object({
  customerName: z.string().min(2, 'El nombre es requerido'),
  customerEmail: z.string().email('Correo electrónico inválido'),
  customerPhone: z.string().min(10, 'Teléfono inválido'),
  birthday: z.string().optional(),
  purpose: z.enum(['visita', 'aniversario', 'cumpleaños', 'reunión']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;