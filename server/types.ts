import { Prisma } from '@prisma/client';

export type ReservationCreateInput = Prisma.ReservationCreateInput;
export type ReservationUpdateInput = Prisma.ReservationUpdateInput;

export interface TableAvailability {
  tableId: string;
  available: boolean;
}