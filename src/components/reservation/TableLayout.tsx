import React from 'react';
import { Users2 } from 'lucide-react';
import { TableService } from '../../services/tables';
import { cn } from '../../utils/helpers';
import { logger } from '../../utils/logger';
import type { Table } from '../../types';

interface TableLayoutProps {
  tables: Table[];
  selectedTableId: string | null;
  onTableSelect: (tableId: string) => void;
  selectedDate: Date;
  selectedTime: string;
}

export function TableLayout({
  tables: initialTables,
  selectedTableId,
  onTableSelect,
  selectedDate,
  selectedTime
}: TableLayoutProps) {
  const [tables, setTables] = React.useState<Table[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchAvailableTables() {
      try {
        setLoading(true);
        setError(null);
        
        logger.info('Fetching available tables for:', {
          date: selectedDate,
          time: selectedTime
        });

        const availableTables = await TableService.getAvailableTables(
          selectedDate,
          selectedTime
        );

        logger.info('Available tables:', availableTables);
        setTables(availableTables);
      } catch (err) {
        const errorMessage = 'Error al cargar la disponibilidad de mesas';
        setError(errorMessage);
        logger.error(errorMessage, err);
      } finally {
        setLoading(false);
      }
    }

    if (selectedDate && selectedTime) {
      fetchAvailableTables();
    }
  }, [selectedDate, selectedTime]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando disponibilidad...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary hover:underline"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  if (tables.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay mesas disponibles para la fecha y hora seleccionada.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square bg-surface rounded-lg p-4">
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => table.isAvailable && onTableSelect(table.id)}
          className={cn(
            'absolute transform -translate-x-1/2 -translate-y-1/2',
            'p-2 rounded-lg transition-all duration-200',
            {
              'bg-green-100 hover:bg-green-200': table.isAvailable && selectedTableId !== table.id,
              'bg-red-100': !table.isAvailable,
              'bg-primary text-white scale-105': selectedTableId === table.id,
              'cursor-not-allowed opacity-50': !table.isAvailable,
            }
          )}
          style={{
            left: `${table.coordinates.x}%`,
            top: `${table.coordinates.y}%`,
            minWidth: table.seats >= 5 ? '120px' : '80px',
          }}
          disabled={!table.isAvailable}
          title={table.isAvailable ? 'Mesa disponible' : 'Mesa ocupada'}
        >
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xs font-medium">{table.label}</span>
            <div className="flex items-center space-x-1">
              <Users2 className="w-4 h-4" />
              <span>{table.seats}</span>
            </div>
          </div>
        </button>
      ))}

      <div className="absolute bottom-4 left-4 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span>Ocupada</span>
          </div>
        </div>
      </div>
    </div>
  );
}