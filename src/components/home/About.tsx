import React from 'react';

export function About() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
            <p className="text-gray-600 mb-4">
              En Ramen Fusion, fusionamos la autenticidad del ramen japonés con innovadores 
              sabores contemporáneos. Cada plato es una obra maestra cuidadosamente elaborada 
              por nuestros chefs expertos.
            </p>
            <p className="text-gray-600">
              Utilizamos ingredientes frescos y técnicas tradicionales para crear una 
              experiencia gastronómica única que deleitará sus sentidos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&q=80" 
              alt="Ramen Bowl" 
              className="rounded-lg w-full h-64 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1632709810780-b5a4343cebec?auto=format&fit=crop&q=80" 
              alt="Restaurant Interior" 
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}