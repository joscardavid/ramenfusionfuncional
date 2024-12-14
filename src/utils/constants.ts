export const OPENING_HOUR = 12; // 12:00 PM
export const CLOSING_HOUR = 22; // 10:00 PM

export const OPERATING_DAYS = [3, 4, 5, 6, 0]; // Wed, Thu, Fri, Sat, Sun (0-6)

export const RESERVATION_PURPOSES = [
  { value: 'visita', label: 'Visita Regular' },
  { value: 'aniversario', label: 'Aniversario' },
  { value: 'cumpleaños', label: 'Cumpleaños' },
  { value: 'reunión', label: 'Reunión' },
] as const;

export const WEEKDAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];