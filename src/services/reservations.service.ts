import { api } from '../lib/api';
import { API_ENDPOINTS } from '../config/api';
import type { Reservation } from '../types';

export const ReservationsService = {
  async getAll(params?: Record<string, any>) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return api.get(`${API_ENDPOINTS.reservations.list}?${queryString}`);
  },

  async getById(id: string) {
    return api.get(API_ENDPOINTS.reservations.get(id));
  },

  async create(data: Omit<Reservation, 'id'>) {
    return api.post(API_ENDPOINTS.reservations.create, data);
  },

  async update(id: string, data: Partial<Reservation>) {
    return api.patch(API_ENDPOINTS.reservations.update(id), data);
  },

  async delete(id: string) {
    return api.delete(API_ENDPOINTS.reservations.delete(id));
  },
};