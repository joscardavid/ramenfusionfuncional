import { logger } from './logger';
import { ReservationService } from '../services/reservations';
import type { CreateReservationDTO } from '../types/reservation';

export async function submitReservation(
  data: CreateReservationDTO
): Promise<{ success: boolean; message: string }> {
  try {
    logger.info('Submitting reservation:', data);

    const result = await ReservationService.createReservation(data);

    if (!result.success) {
      logger.error('Reservation submission failed:', result);
      return {
        success: false,
        message: 'Error al procesar la reservación'
      };
    }

    logger.info('Reservation created successfully:', result.data);
    return {
      success: true,
      message: 'Reservación confirmada exitosamente'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al procesar la reservación';
    logger.error('Reservation submission error:', error);
    return {
      success: false,
      message: errorMessage
    };
  }
}