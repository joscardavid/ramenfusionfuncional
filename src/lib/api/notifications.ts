import { supabase } from './supabase';
import type { Reservation } from '@/types';

export async function createNotification(reservation: Reservation) {
  const { error } = await supabase
    .from('notifications')
    .insert([
      {
        reservation_id: reservation.id,
        type: 'confirmation',
        recipient_email: reservation.customerEmail,
        subject: 'Confirmación de Reserva - Ramen Fusion',
        content: `
          Estimado/a ${reservation.customerName},
          
          Su reserva para el día ${new Date(reservation.date).toLocaleDateString()} 
          a las ${reservation.timeSlot} ha sido confirmada.
          
          ¡Gracias por elegir Ramen Fusion!
        `,
      },
    ]);

  if (error) {
    console.error('Error creating notification:', error);
  }
}