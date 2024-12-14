import React from 'react';

const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1617421753170-46511a8d73fc?auto=format&fit=crop&q=80',
    alt: 'Interior del Restaurante'
  },
  {
    url: 'https://images.unsplash.com/photo-1622443853375-3b6d5f0586bd?auto=format&fit=crop&q=80',
    alt: 'Preparación de Ramen'
  },
  {
    url: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&q=80',
    alt: 'Ramen Bowl'
  },
  {
    url: 'https://images.unsplash.com/photo-1576877138403-8ec2f82cb1f3?auto=format&fit=crop&q=80',
    alt: 'Ingredientes Frescos'
  }
];

export function Gallery() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestra Experiencia</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un vistazo a nuestro ambiente acogedor y la pasión que ponemos en cada plato
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg aspect-square group"
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}