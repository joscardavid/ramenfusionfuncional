import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOperatingDay(date: Date): boolean {
  const day = date.getDay();
  // 0 = Sunday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  return [0, 3, 4, 5, 6].includes(day);
}

export function generateTimeSlots() {
  const slots = [];
  for (let hour = 12; hour < 22; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    slots.push(`${displayHour}:00 ${period}`);
  }
  return slots;
}