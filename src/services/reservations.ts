import { supabase } from '../config/supabase';
import { TableService } from './tables';
import { logger } from '../utils/logger';
import type { CreateReservationDTO } from '../types/reservation';

export class ReservationService {
  static async createReservation(data: CreateReservationDTO) {
    try {
      logger.info('Creating reservation:', data);

      // Check table availability first
      const isAvailable = await TableService.checkTableAvailability(
        data.tableId,
        data.date,
        data.timeSlot
      );

      if (!isAvailable) {
        logger.warn('Table not available:', {
          tableId: data.tableId,
          date: data.date,
          timeSlot: data.timeSlot
        });
        return {
          success: false,
          message: 'La mesa seleccionada no está disponible para el horario elegido'
        };
      }

      const formattedDate = new Date(data.date).toISOString().split('T')[0];

      // Start transaction
      const { data: reservation, error: reservationError } = await supabase
        .from('reservations')
        .insert([{
          table_id: data.tableId,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone,
          date: formattedDate,
          time_slot: data.timeSlot,
          purpose: data.purpose,
          status: 'confirmed'
        }])
        .select()
        .single();

      if (reservationError) {
        logger.error('Error creating reservation:', reservationError);
        return {
          success: false,
          message: 'Error al crear la reservación'
        };
      }

      // Create notification
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert([{
          reservation_id: reservation.id,
          type: 'confirmation',
          status: 'pending',
          recipient_email: reservation.customer_email,
          subject: 'Confirmación de Reserva - Ramen Fusion',
          content: `
            Estimado/a ${reservation.customer_name},
            
            Su reserva para el día ${reservation.date} a las ${reservation.time_slot} 
            ha sido confirmada.
            
            ¡Gracias por elegir Ramen Fusion!
          `
        }]);

      if (notificationError) {
        logger.error('Error creating notification:', notificationError);
      }

      logger.info('Reservation created successfully:', reservation);

      return {
        success: true,
        data: reservation,
        message: 'Reservación confirmada exitosamente'
      };
    } catch (error) {
      logger.error('Reservation creation failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al procesar la reservación'
      };
    }
  }
}