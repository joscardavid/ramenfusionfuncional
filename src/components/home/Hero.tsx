import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onReserve: () => void;
}

export function Hero({ onReserve }: HeroProps) {
  return (
    <div className="relative h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Auténtico Ramen Fusión
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Una experiencia culinaria única que combina la tradición japonesa con sabores contemporáneos
          </p>
          <Button 
            size="lg"
            onClick={onReserve}
            className="bg-primary hover:bg-primary/90"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Reservar Mesa
          </Button>
        </div>
      </div>
    </div>
  );
}