import { supabase } from '../config/supabase.js';

export const ReservationsService = {
  async create(data) {
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert([{
        table_id: data.tableId,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        date: new Date(data.date).toISOString().split('T')[0],
        time_slot: data.timeSlot,
        status: 'confirmed'
      }])
      .select()
      .single();

    if (error) throw error;
    return reservation;
  },

  async findAll(filters = {}) {
    const query = supabase
      .from('reservations')
      .select('*, tables(*)');

    if (filters.date) {
      query.eq('date', filters.date);
    }
    if (filters.status) {
      query.eq('status', filters.status);
    }
    if (filters.tableId) {
      query.eq('table_id', filters.tableId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, tables(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};