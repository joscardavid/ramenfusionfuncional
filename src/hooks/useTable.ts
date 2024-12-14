import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';
import type { Table } from '../types';

export function useTable(tableId: string) {
  const [table, setTable] = useState<Table | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTable() {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: tableError } = await supabase
          .from('tables')
          .select('*')
          .eq('id', tableId)
          .single();

        if (tableError) {
          throw tableError;
        }

        if (!data) {
          throw new Error('Mesa no encontrada');
        }

        setTable({
          id: data.id,
          type: data.type,
          seats: data.seats,
          isAvailable: data.status === 'available',
          coordinates: getTableCoordinates(data.number),
          label: getTableLabel(data)
        });
      } catch (err) {
        logger.error('Error fetching table:', err);
        setError('Error al cargar los detalles de la mesa');
      } finally {
        setIsLoading(false);
      }
    }

    if (tableId) {
      fetchTable();
    }
  }, [tableId]);

  return { table, isLoading, error };
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