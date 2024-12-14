import { supabase } from '@/config/supabase';
import { logger } from '@/utils/logger';
import type { CreateReservationDTO } from '@/types';

export async function createReservation(data: CreateReservationDTO) {
  try {
    logger.info('Creating reservation with data:', data);

    // Test connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from('tables')
      .select('count(*)')
      .single();

    if (connectionError) {
      logger.error('Supabase connection test failed:', connectionError);
      throw new Error('Database connection failed');
    }

    logger.info('Connection test successful:', connectionTest);

    // Start transaction
    const { data: reservation, error: reservationError } = await supabase
      .from('reservations')
      .insert([{
        table_id: data.tableId,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        date: new Date(data.date).toISOString().split('T')[0],
        time_slot: data.timeSlot,
        notes: data.notes,
        status: 'confirmed'
      }])
      .select()
      .single();

    if (reservationError) {
      logger.error('Error creating reservation:', reservationError);
      throw reservationError;
    }

    logger.info('Reservation created successfully:', reservation);

    // Update table availability
    const { error: availabilityError } = await supabase
      .from('table_availability')
      .insert([{
        table_id: data.tableId,
        date: new Date(data.date).toISOString().split('T')[0],
        time_slot: data.timeSlot,
        status: 'reserved',
        reservation_id: reservation.id
      }]);

    if (availabilityError) {
      logger.error('Error updating table availability:', availabilityError);
      // Rollback reservation
      await supabase
        .from('reservations')
        .delete()
        .eq('id', reservation.id);
      throw availabilityError;
    }

    return { success: true, data: reservation };
  } catch (error) {
    logger.error('Reservation creation failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function getTableAvailability(
  tableId: string,
  date: Date,
  timeSlot: string
) {
  try {
    logger.info('Checking table availability:', { tableId, date, timeSlot });

    const { data, error } = await supabase
      .from('table_availability')
      .select('*')
      .eq('table_id', tableId)
      .eq('date', date.toISOString().split('T')[0])
      .eq('time_slot', timeSlot)
      .single();

    if (error) {
      logger.error('Error checking table availability:', error);
      throw error;
    }

    logger.info('Table availability result:', data);
    return !data || data.status === 'available';
  } catch (error) {
    logger.error('Table availability check failed:', error);
    return false;
  }
}