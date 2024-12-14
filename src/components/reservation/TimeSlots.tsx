import React from 'react';
import { generateTimeSlots } from '../../utils/helpers';
import { Button } from '../ui/Button';
import { isOperatingDay } from '../../utils/helpers';

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export function TimeSlots({ selectedDate, selectedTime, onTimeSelect }: TimeSlotsProps) {
  const timeSlots = generateTimeSlots();
  const isValidDay = isOperatingDay(selectedDate);

  if (!isValidDay) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 font-medium">Lo sentimos, estamos cerrados este día.</p>
        <p className="text-gray-500 mt-2">Por favor seleccione un día entre miércoles y domingo.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {timeSlots.map((time) => (
        <Button
          key={time}
          variant={selectedTime === time ? 'primary' : 'outline'}
          onClick={() => onTimeSelect(time)}
          className="w-full"
        >
          {time}
        </Button>
      ))}
    </div>
  );
}