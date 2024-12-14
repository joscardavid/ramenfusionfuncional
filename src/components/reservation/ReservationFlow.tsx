import React from 'react';
import { X } from 'lucide-react';
import { Calendar } from './Calendar';
import { TimeSlots } from './TimeSlots';
import { TableLayout } from './TableLayout';
import { ReservationForm } from './ReservationForm';
import { ReservationSummary } from './ReservationSummary';
import { Button } from '../ui/Button';
import { submitReservation } from '../../utils/api';
import { logger } from '../../utils/logger';
import type { ReservationFormData } from '../../types/reservation';

interface ReservationFlowProps {
  onClose: () => void;
}

export function ReservationFlow({ onClose }: ReservationFlowProps) {
  const [step, setStep] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedTableId, setSelectedTableId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<ReservationFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleTableSelect = (tableId: string) => {
    setSelectedTableId(tableId);
    setStep(4);
  };

  const handleFormSubmit = async (data: ReservationFormData) => {
    logger.info('Form submitted:', data);
    setFormData(data);
    setStep(5);
  };

  const handleConfirmReservation = async () => {
    if (!selectedTableId || !selectedTime || !formData) {
      setError('Faltan datos requeridos para la reservación');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const reservationData = {
        tableId: selectedTableId,
        date: selectedDate,
        timeSlot: selectedTime,
        ...formData
      };

      logger.info('Submitting reservation:', reservationData);

      const result = await submitReservation(reservationData);

      if (result.success) {
        setSuccess(true);
        logger.info('Reservation submitted successfully');
      } else {
        setError(result.message);
        logger.error('Reservation submission failed:', result.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al procesar la reservación';
      setError(message);
      logger.error('Reservation submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 className="text-2xl font-bold text-primary mb-4">¡Reservación Confirmada!</h3>
          <p className="text-gray-600 mb-6">
            Hemos enviado un correo electrónico con los detalles de su reservación.
          </p>
          <Button onClick={onClose} className="w-full">
            Volver al Inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Reservar Mesa</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {step >= 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Seleccione una fecha</h3>
                <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
              </div>
            )}

            {step >= 2 && selectedDate && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Seleccione una hora</h3>
                <TimeSlots 
                  selectedDate={selectedDate}
                  selectedTime={selectedTime} 
                  onTimeSelect={handleTimeSelect} 
                />
              </div>
            )}

            {step >= 3 && selectedDate && selectedTime && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Seleccione una mesa</h3>
                <TableLayout
                  tables={[]}
                  selectedTableId={selectedTableId}
                  onTableSelect={handleTableSelect}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Complete sus datos</h3>
                <ReservationForm 
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}

            {step === 5 && formData && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Confirmar Reservación</h3>
                <ReservationSummary
                  date={selectedDate}
                  time={selectedTime!}
                  tableId={selectedTableId!}
                  {...formData}
                />
                
                {error && (
                  <p className="text-red-500 mt-4 text-center">{error}</p>
                )}

                <div className="flex space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(4)}
                    disabled={isSubmitting}
                  >
                    Volver
                  </Button>
                  <Button
                    onClick={handleConfirmReservation}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Confirmando...' : 'Confirmar Reservación'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}