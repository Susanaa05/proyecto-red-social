import React from 'react';

interface PostProps {
  image: string;
  title: string;
  category: string;
  description: string;
  visitors: string[];
}

const Post: React.FC<PostProps> = ({
  image,
  title,
  category,
  description,
  visitors
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl">
      <div className="relative w-full h-[500px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute bottom-0 left-0 right-0 h-28 backdrop-blur-md bg-black/40" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="font-bold text-3xl">{title}</h3>
            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-base font-medium">
              {category}
            </span>
          </div>

          <p className="text-xl opacity-90 mb-3">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {visitors.map((visitor, index) => (
                  <div key={index} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src={visitor} alt={`Visitor ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-white font-bold text-2xl">{visitors.length}</span>
            </div>

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
