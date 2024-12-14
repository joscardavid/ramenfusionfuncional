import { format as fnsFormat, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date, formatStr: string = "EEEE, d 'de' MMMM 'de' yyyy"): string => {
  if (!isValid(date)) return '';
  return fnsFormat(date, formatStr, { locale: es });
};

export const formatTime = (time: string): string => {
  const [hour, period] = time.split(' ');
  return `${hour} ${period}`;
};