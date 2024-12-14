export type TableType = '2-seater' | '4-seater' | '5-seater' | '8-seater' | 'bar';

export interface Table {
  id: string;
  type: TableType;
  seats: number;
  isAvailable: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  label: string;
}

export interface Reservation {
  id: string;
  date: Date;
  timeSlot: string;
  tableId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  birthday?: Date;
  purpose?: 'visita' | 'aniversario' | 'cumpleaños' | 'reunión';
}