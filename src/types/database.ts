export type TableStatus = 'available' | 'reserved' | 'blocked' | 'maintenance';

export interface Table {
  id: string;
  number: string;
  type: string;
  seats: number;
  status: TableStatus;
  created_at: string;
  updated_at: string;
}

export interface TableAvailability {
  id: string;
  table_id: string;
  date: string;
  time_slot: string;
  status: TableStatus;
  reservation_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  table_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date: string;
  time_slot: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  reservation_id: string;
  type: 'confirmation' | 'cancellation' | 'reminder';
  status: 'pending' | 'sent' | 'failed';
  recipient_email: string;
  subject: string;
  content: string;
  sent_at?: string;
  created_at: string;
  updated_at: string;
}