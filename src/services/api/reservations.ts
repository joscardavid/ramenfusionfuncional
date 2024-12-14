import type { Reservation } from '../../types';

export async function getReservations() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [];
}

export async function createReservation(data: Omit<Reservation, 'id'>) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    message: 'Reservación confirmada exitosamente',
  };
}

export async function getReservationById(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return null;
}

export async function updateReservation(id: string, data: Partial<Reservation>) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    message: 'Reservación actualizada exitosamente',
  };
}

export async function deleteReservation(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    message: 'Reservación eliminada exitosamente',
  };
}