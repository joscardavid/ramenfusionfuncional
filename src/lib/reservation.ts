import { supabase } from '@/config/supabase';
import type { Table, Reservation } from '@/types';

export async function checkTableAvailability(
  tableId: string,
  date: Date,
  timeSlot: string
): Promise<boolean> {
  const startTime = new Date(date);
  startTime.setHours(parseInt(timeSlot.split(':')[0]), 0, 0, 0);

  const { data, error } = await supabase
    .from('table_availability')
    .select('*')
    .eq('table_id', tableId)
    .eq('date', startTime.toISOString().split('T')[0])
    .eq('time_slot', timeSlot)
    .single();

  if (error) {
    console.error('Error checking availability:', error);
    return false;
  }

  return !data || data.status === 'available';
}

export async function createReservation(
  reservation: Omit<Reservation, 'id'>
): Promise<{ success: boolean; error?: string }> {
  // Start a transaction
  const { data: newReservation, error: reservationError } = await supabase
    .from('reservations')
    .insert([reservation])
    .select()
    .single();

  if (reservationError) {
    console.error('Error creating reservation:', reservationError);
    return { success: false, error: 'Error creating reservation' };
  }

  // Update table availability
  const { error: availabilityError } = await supabase
    .from('table_availability')
    .insert([
      {
        table_id: reservation.tableId,
        date: new Date(reservation.date).toISOString().split('T')[0],
        time_slot: reservation.timeSlot,
        status: 'reserved',
        reservation_id: newReservation.id,
      },
    ]);

  if (availabilityError) {
    console.error('Error updating availability:', availabilityError);
    // Rollback reservation
    await supabase
      .from('reservations')
      .delete()
      .eq('id', newReservation.id);
    return { success: false, error: 'Error updating table availability' };
  }

  return { success: true };
}

export async function subscribeToTableAvailability(
  onUpdate: (tableId: string) => void
) {
  return supabase
    .channel('table_availability_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'table_availability',
      },
      (payload) => {
        onUpdate(payload.new.table_id);
      }
    )
    .subscribe();
}