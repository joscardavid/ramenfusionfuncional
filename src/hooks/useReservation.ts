import { useState } from 'react';
import { createReservation, getTableAvailability } from '@/lib/api/reservations';
import { logger } from '@/utils/logger';
import type { CreateReservationDTO, ReservationResponse } from '@/types/reservation';

export function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReservation = async (data: CreateReservationDTO): Promise<ReservationResponse> => {
    setLoading(true);
    setError(null);

    try {
      logger.info('Submitting reservation:', data);

      // Check table availability first
      const isAvailable = await getTableAvailability(
        data.tableId,
        data.date,
        data.timeSlot
      );

      if (!isAvailable) {
        throw new Error('Table is not available for the selected time');
      }

      const result = await createReservation(data);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create reservation');
      }

      logger.info('Reservation submitted successfully:', result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      logger.error('Reservation submission failed:', errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitReservation,
    loading,
    error,
  };
}