import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';
import type { Table } from '../types';

export class TableService {
  static async checkTableAvailability(
    tableId: string,
    date: Date,
    timeSlot: string
  ): Promise<boolean> {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      
      logger.info('Checking table availability:', {
        tableId,
        date: formattedDate,
        timeSlot
      });

      // First check if table exists and is available
      const { data: table, error: tableError } = await supabase
        .from('tables')
        .select('status')
        .eq('id', tableId)
        .single();

      if (tableError) {
        logger.error('Error fetching table:', tableError);
        return false;
      }

      if (!table || table.status !== 'available') {
        logger.warn('Table not available:', { tableId, status: table?.status });
        return false;
      }

      // Then check for existing reservations
      const { data: reservations, error: reservationError } = await supabase
        .from('reservations')
        .select('id')
        .eq('table_id', tableId)
        .eq('date', formattedDate)
        .eq('time_slot', timeSlot)
        .eq('status', 'confirmed');

      if (reservationError) {
        logger.error('Error checking reservations:', reservationError);
        return false;
      }

      const isAvailable = !reservations?.length;
      
      logger.info('Table availability result:', { 
        tableId, 
        date: formattedDate, 
        timeSlot, 
        isAvailable
      });

      return isAvailable;
    } catch (error) {
      logger.error('Error checking table availability:', error);
      return false;
    }
  }

  static async getAvailableTables(date: Date, timeSlot: string): Promise<Table[]> {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      
      logger.info('Fetching available tables:', { date: formattedDate, timeSlot });

      // Get all tables
      const { data: tables, error: tablesError } = await supabase
        .from('tables')
        .select('*');

      if (tablesError) {
        throw tablesError;
      }

      // Get reserved tables for the time slot
      const { data: reservations, error: reservationsError } = await supabase
        .from('reservations')
        .select('table_id')
        .eq('date', formattedDate)
        .eq('time_slot', timeSlot)
        .eq('status', 'confirmed');

      if (reservationsError) {
        throw reservationsError;
      }

      const reservedTableIds = new Set(reservations?.map(r => r.table_id) || []);

      const availableTables = tables.map(table => ({
        id: table.id,
        type: table.type,
        seats: table.seats,
        isAvailable: !reservedTableIds.has(table.id) && table.status === 'available',
        coordinates: getTableCoordinates(table.number),
        label: getTableLabel(table)
      }));

      logger.info('Available tables:', availableTables);
      return availableTables;
    } catch (error) {
      logger.error('Error fetching available tables:', error);
      throw new Error('Error al obtener las mesas disponibles');
    }
  }
}

function getTableCoordinates(tableNumber: string) {
  const coordinates: Record<string, { x: number; y: number }> = {
    'BAR-01': { x: 15, y: 15 },
    'T4-01': { x: 25, y: 45 },
    'T4-02': { x: 25, y: 75 },
    'T2-01': { x: 50, y: 45 },
    'T2-02': { x: 50, y: 75 },
    'T5-01': { x: 80, y: 30 },
    'T5-02': { x: 80, y: 60 },
    'VIP-01': { x: 80, y: 90 }
  };
  return coordinates[tableNumber] || { x: 0, y: 0 };
}

function getTableLabel(table: any): string {
  const typeLabels: Record<string, string> = {
    'bar': 'BARRA',
    '2-seater': 'MESA 2P',
    '4-seater': 'MESA 4P',
    '5-seater': 'MESA 5P',
    '8-seater': 'VIP 8P'
  };
  return typeLabels[table.type] || `MESA ${table.seats}P`;
}