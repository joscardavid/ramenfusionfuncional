import React from 'react';

const FEATURED_DISHES = [
  {
    name: 'Tonkotsu Ramen',
    description: 'Caldo cremoso de cerdo, chashu, huevo marinado, brotes de bambú',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80',
    price: '15.99'
  },
  {
    name: 'Miso Ramen',
    description: 'Caldo de miso, cerdo picante, maíz, algas nori',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80',
    price: '14.99'
  },
  {
    name: 'Shoyu Ramen',
    description: 'Caldo de soya, pollo asado, espinacas, champiñones',
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&q=80',
    price: '13.99'
  }
];

export function Menu() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platos Destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nuestra selección de platos más populares, preparados con ingredientes 
            frescos y técnicas tradicionales japonesas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_DISHES.map((dish) => (
            <div key={dish.name} className="bg-surface rounded-lg overflow-hidden shadow-md">
              <img 
                src={dish.image} 
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>
                  <span className="text-primary font-semibold">${dish.price}</span>
                </div>
                <p className="text-gray-600">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}