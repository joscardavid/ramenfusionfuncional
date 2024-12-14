import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

export function Info() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Horario</h3>
            <p className="text-gray-600">Miércoles a Domingo</p>
            <p className="text-gray-600">12:00 PM - 10:00 PM</p>
            <p className="text-gray-500 text-sm">Última reserva: 10:00 PM</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
            <p className="text-gray-600">URB. MORRO 2 SAN DIEGO</p>
            <p className="text-gray-600">Valencia, Venezuela</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Contacto</h3>
            <p className="text-gray-600">+58 412 1234567</p>
            <p className="text-gray-600">info@ramenfusion.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}