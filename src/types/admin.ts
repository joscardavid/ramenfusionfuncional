import { Reservation } from './index';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  createdAt: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface DashboardStats {
  totalReservations: number;
  todayReservations: number;
  upcomingReservations: number;
  popularTables: Array<{
    tableId: string;
    reservations: number;
  }>;
}

export interface ReservationFilters {
  startDate?: Date;
  endDate?: Date;
  status?: 'confirmed' | 'cancelled' | 'completed';
  tableId?: string;
}