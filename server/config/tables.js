import type { Table } from '../types';

export const TABLES: Table[] = [
  // Bar Area (4 seats)
  {
    id: 'bar',
    type: 'bar',
    seats: 4,
    isAvailable: true,
    coordinates: { x: 15, y: 15 },
    label: 'BARRA 4P',
  },
  // 4-seater tables
  {
    id: 'table-4-1',
    type: '4-seater',
    seats: 4,
    isAvailable: true,
    coordinates: { x: 25, y: 45 },
    label: 'MESA 4P',
  },
  {
    id: 'table-4-2',
    type: '4-seater',
    seats: 4,
    isAvailable: true,
    coordinates: { x: 25, y: 75 },
    label: 'MESA 4P',
  },
  // 2-seater tables
  {
    id: 'table-2-1',
    type: '2-seater',
    seats: 2,
    isAvailable: true,
    coordinates: { x: 50, y: 45 },
    label: 'MESA 2P',
  },
  {
    id: 'table-2-2',
    type: '2-seater',
    seats: 2,
    isAvailable: true,
    coordinates: { x: 50, y: 75 },
    label: 'MESA 2P',
  },
  // 5-seater tables
  {
    id: 'table-5-1',
    type: '5-seater',
    seats: 5,
    isAvailable: true,
    coordinates: { x: 80, y: 30 },
    label: 'MESA 5P',
  },
  {
    id: 'table-5-2',
    type: '5-seater',
    seats: 5,
    isAvailable: true,
    coordinates: { x: 80, y: 60 },
    label: 'MESA 5P',
  },
  // VIP table (8 seats)
  {
    id: 'vip',
    type: '8-seater',
    seats: 8,
    isAvailable: true,
    coordinates: { x: 80, y: 90 },
    label: 'VIP 8P',
  },
];