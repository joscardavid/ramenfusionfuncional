import { useState, useCallback } from 'react';
import { createReservation, getReservations } from '@/lib/api/reservations';
import { createNotification } from '@/lib/api/notifications';
import type { Reservation } from '@/types';

export function useReservations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReservation = useCallback(async (
    data: Omit<Reservation, 'id'>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createReservation(data);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      await createNotification(data as Reservation);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing reservation');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReservations = useCallback(async (filters?: {
    date?: Date;
    status?: string;
    tableId?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getReservations(filters);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching reservations');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submitReservation,
    fetchReservations,
    loading,
    error,
  };
}