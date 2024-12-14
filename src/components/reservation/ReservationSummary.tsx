import React from 'react';
import { Calendar, Clock, Users2 } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { useTable } from '../../hooks/useTable';
import type { ReservationFormData } from '../../types/reservation';

interface ReservationSummaryProps extends ReservationFormData {
  date: Date;
  time: string;
  tableId: string;
}

export function ReservationSummary({
  date,
  time,
  tableId,
  customerName,
  customerEmail,
  customerPhone,
  purpose,
}: ReservationSummaryProps) {
  const { table, isLoading, error } = useTable(tableId);

  if (isLoading) {
    return (
      <div className="bg-surface p-6 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !table) {
    return (
      <div className="bg-surface p-6 rounded-lg">
        <p className="text-red-500">Error al cargar los detalles de la mesa</p>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg space-y-4">
      <h4 className="text-lg font-semibold">Resumen de Reservación</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span>{formatDate(date)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Users2 className="w-5 h-5 text-primary" />
          <span>{table.label} ({table.seats} personas)</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4 pt-4">
        <h5 className="font-medium mb-2">Datos del Cliente</h5>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Nombre:</span> {customerName}</p>
          <p><span className="font-medium">Email:</span> {customerEmail}</p>
          <p><span className="font-medium">Teléfono:</span> {customerPhone}</p>
          {purpose && (
            <p><span className="font-medium">Motivo:</span> {purpose}</p>
          )}
        </div>
      </div>
    </div>
  );
}