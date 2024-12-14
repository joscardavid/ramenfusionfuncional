import React from 'react';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { isOperatingDay } from '../../utils/helpers';
import { WEEKDAYS_ES } from '../../utils/constants';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePreviousMonth} className="p-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>
        <button onClick={handleNextMonth} className="p-2">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS_ES.map((day, index) => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day.slice(0, 3)}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            index + 1
          );
          const isSelected = isSameDay(selectedDate, date);
          const isToday = isSameDay(new Date(), date);
          const isOperating = isOperatingDay(date);
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <button
              key={index}
              onClick={() => isOperating && !isPast && onDateSelect(date)}
              disabled={!isOperating || isPast}
              className={cn(
                'h-10 w-full rounded-md flex items-center justify-center relative',
                'transition-colors',
                {
                  'bg-primary text-white': isSelected,
                  'font-semibold': isToday,
                  'text-gray-400 cursor-not-allowed': !isOperating || isPast,
                  'hover:bg-surface': isOperating && !isPast && !isSelected,
                }
              )}
            >
              {index + 1}
              {isToday && <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-1" />}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Horario de atención:</p>
        <p>Miércoles a Domingo: 12:00 PM - 10:00 PM</p>
        <p>Lunes y Martes: Cerrado</p>
      </div>
    </div>
  );
}