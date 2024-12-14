import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RESERVATION_PURPOSES } from '../../utils/constants';
import { Button } from '../ui/Button';

const reservationSchema = z.object({
  customerName: z.string().min(2, 'El nombre es requerido'),
  customerEmail: z.string().email('Correo electrónico inválido'),
  customerPhone: z.string().min(10, 'Teléfono inválido'),
  purpose: z.enum(['visita', 'aniversario', 'cumpleaños', 'reunión']).optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
  isSubmitting?: boolean;
}

export function ReservationForm({ onSubmit, isSubmitting = false }: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          {...register('customerName')}
          className="w-full p-2 border rounded-md"
          placeholder="Juan Pérez"
          disabled={isSubmitting}
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
        <input
          {...register('customerEmail')}
          type="email"
          className="w-full p-2 border rounded-md"
          placeholder="juan@ejemplo.com"
          disabled={isSubmitting}
        />
        {errors.customerEmail && (
          <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teléfono</label>
        <input
          {...register('customerPhone')}
          className="w-full p-2 border rounded-md"
          placeholder="+58 412 1234567"
          disabled={isSubmitting}
        />
        {errors.customerPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Motivo de Reserva</label>
        <select 
          {...register('purpose')} 
          className="w-full p-2 border rounded-md"
          disabled={isSubmitting}
        >
          <option value="">Seleccionar motivo</option>
          {RESERVATION_PURPOSES.map((purpose) => (
            <option key={purpose.value} value={purpose.value}>
              {purpose.label}
            </option>
          ))}
        </select>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Procesando...' : 'Continuar'}
      </Button>
    </form>
  );
}