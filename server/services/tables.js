import { supabase } from '../config/supabase.js';

export const TablesService = {
  async findAll() {
    const { data, error } = await supabase
      .from('tables')
      .select('*');

    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async checkAvailability(tableId, date, timeSlot) {
    const { data, error } = await supabase
      .from('reservations')
      .select('id')
      .eq('table_id', tableId)
      .eq('date', date)
      .eq('time_slot', timeSlot)
      .eq('status', 'confirmed')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !data;
  }
};