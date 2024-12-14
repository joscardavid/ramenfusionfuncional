import { supabase } from './supabase';
import type { Table } from '@/types';

export async function getTableAvailability(
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

export async function subscribeToTableUpdates(
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