export interface ReservationFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  purpose?: 'visita' | 'aniversario' | 'cumpleaños' | 'reunión';
}

export interface CreateReservationDTO extends ReservationFormData {
  tableId: string;
  date: Date;
  timeSlot: string;
}

export interface ReservationResponse {
  success: boolean;
  data?: {
    id: string;
    table_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    date: string;
    time_slot: string;
    status: string;
    purpose?: string;
    created_at: string;
  };
  error?: string;
}