import { useState, useEffect } from 'react';
import { getTableAvailability, subscribeToTableUpdates } from '@/lib/api/tables';
import type { Table } from '@/types';

export function useTableAvailability(
  tables: Table[],
  selectedDate: Date | null,
  selectedTime: string | null
) {
  const [availableTables, setAvailableTables] = useState<Table[]>(tables);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      setAvailableTables(tables);
      return;
    }

    let mounted = true;

    const checkAvailability = async () => {
      setLoading(true);
      setError(null);

      try {
        const availabilityPromises = tables.map(async (table) => {
          const isAvailable = await getTableAvailability(
            table.id,
            selectedDate,
            selectedTime
          );
          return { ...table, isAvailable };
        });

        const updatedTables = await Promise.all(availabilityPromises);
        if (mounted) {
          setAvailableTables(updatedTables);
        }
      } catch (err) {
        if (mounted) {
          setError('Error checking table availability');
          console.error(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAvailability();

    // Subscribe to real-time updates
    const subscription = subscribeToTableUpdates(async (updatedTableId) => {
      if (!mounted) return;

      try {
        const updatedAvailability = await getTableAvailability(
          updatedTableId,
          selectedDate,
          selectedTime
        );

        setAvailableTables((current) =>
          current.map((table) =>
            table.id === updatedTableId
              ? { ...table, isAvailable: updatedAvailability }
              : table
          )
        );
      } catch (err) {
        console.error('Error updating table availability:', err);
      }
    });

    return () => {
      mounted = false;
      subscription.then((sub) => sub.unsubscribe());
    };
  }, [tables, selectedDate, selectedTime]);

  return {
    availableTables,
    loading,
    error,
  };
}