import React from "react";

const Stories: React.FC = () => {
  const stories = [
    {
      id: 1,
      name: "Mia Park",
      storyImg: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800",
      profileImg: "https://i.pinimg.com/1200x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg",
    },
    {
      id: 2,
      name: "Andre Lee",
      storyImg: "https://i.pinimg.com/1200x/fb/3a/a4/fb3aa460fecd3b0a68e30c13e8c74d51.jpg",
      profileImg: "https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg",
    },
    {
      id: 3,
      name: "Luna Kim",
      storyImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      profileImg: "https://i.pinimg.com/1200x/f5/9c/90/f59c9088e58a7baaa3b463ddca7dbab2.jpg",
    },
    {
      id: 4,
      name: "Alex Rivera",
      storyImg: "https://i.pinimg.com/1200x/b4/5c/b7/b45cb75c5071e17ea3cefb99f8b85b80.jpg",
      profileImg: "https://i.pinimg.com/736x/3c/2b/ad/3c2badd0b9688bcb810ef699afc3f7c1.jpg",
    },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto p-4 scrollbar-hide">
  {stories.map((story) => (
    <div
      key={story.id}
      className="relative w-36 h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105"
    >
      {/* Imagen principal */}
      <img
        src={story.storyImg}
        alt={story.name}
        className="w-full h-full object-cover"
      />

      {/* Degradado negrito */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Mini perfil + nombre */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={story.profileImg}
              alt={story.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <span className="text-white text-sm font-medium drop-shadow-md">
          {story.name}
        </span>
      </div>
    </div>
  ))}
  </div>
 );
};

export default Stories;
