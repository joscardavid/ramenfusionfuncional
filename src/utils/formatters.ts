import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale/es';

export const formatDate = (date: Date | string, formatStr = "EEEE, d 'de' MMMM 'de' yyyy"): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (!isValid(dateObj)) return '';
  
  try {
    return format(dateObj, formatStr, { locale: es });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatTime = (time: string): string => {
  if (!time) return '';
  const [hour, period] = time.split(' ');
  return `${hour} ${period}`;
};