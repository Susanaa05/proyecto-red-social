import React from 'react';

interface PostProps {
  image: string;
  title: string;
  category: string;
  description: string;
}

const Post: React.FC<PostProps> = ({
  image,
  title,
  category,
  description
}) => {
  // Datos de ejemplo de personas que han visitado
  const visitors = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl">
      {/* Contenedor principal de la imagen con todo el contenido superpuesto */}
      <div className="relative w-full h-[500px]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Fondo borroso en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-28 backdrop-blur-md bg-black/40" />
        
        {/* Contenido sobre el fondo borroso */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Título y categoría en la misma línea */}
          <div className="flex items-center gap-4 mb-2">
            <h3 className="font-bold text-3xl">{title}</h3>
            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-base font-medium">
              {category}
            </span>
          </div>

          {/* Descripción */}
          <p className="text-xl opacity-90 mb-3">{description}</p>

          {/* Contador de visitantes y botones */}
          <div className="flex items-center justify-between">
            {/* Fotos de personas y contador */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {visitors.map((visitor, index) => (
                  <div key={index} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={visitor} 
                      alt={`Visitor ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-white font-bold text-2xl">31</span>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl text-lg font-medium hover:bg-white/30 transition-colors border border-white/30">
                Add to list
              </button>
              <button className="px-6 py-3 bg-purple-500 text-white rounded-xl text-lg font-medium hover:bg-purple-600 transition-colors">
                How to go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;