import React from "react";

// Component that displays user stories (similar to Instagram or Facebook)
const Stories: React.FC = () => {
  // Array containing story data: id, user name, story image, and profile image
  const stories = [
    {
      id: 1,
      name: "Mia Park",
      storyImg: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800",
      profileImg:
        "https://i.pinimg.com/1200x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg",
    },
    {
      id: 2,
      name: "Andre Lee",
      storyImg:
        "https://i.pinimg.com/1200x/fb/3a/a4/fb3aa460fecd3b0a68e30c13e8c74d51.jpg",
      profileImg:
        "https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg",
    },
    {
      id: 3,
      name: "Luna Kim",
      storyImg:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      profileImg:
        "https://i.pinimg.com/1200x/f5/9c/90/f59c9088e58a7baaa3b463ddca7dbab2.jpg",
    },
    {
      id: 4,
      name: "Alex Rivera",
      storyImg:
        "https://i.pinimg.com/1200x/b4/5c/b7/b45cb75c5071e17ea3cefb99f8b85b80.jpg",
      profileImg:
        "https://i.pinimg.com/736x/3c/2b/ad/3c2badd0b9688bcb810ef699afc3f7c1.jpg",
    },
  ];

  return (
    // Horizontal scrollable container for stories
    <div
      className="
        flex gap-4 overflow-x-auto overflow-y-hidden py-2 px-1
        scrollbar-hide scroll-smooth snap-x snap-mandatory
      "
    >
      {/* Loop through each story and render it */}
      {stories.map((story) => (
        <div
          key={story.id}
          className="
            relative flex-shrink-0 rounded-xl overflow-hidden shadow-md cursor-pointer
            transition-transform hover:scale-105 snap-start
            w-[38vw] h-[55vw] max-w-[150px] max-h-[200px] sm:w-[150px] sm:h-[200px]
          "
        >
          {/* Main story image */}
          <img
            src={story.storyImg}
            alt={story.name}
            className="w-full h-full object-cover"
          />

          {/* Blurred background at the bottom for better text visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-14 backdrop-blur-md bg-black/25" />

          {/* Profile image + username displayed at the bottom left */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {/* Profile border gradient (like Instagram) */}
            <div className="relative w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500">
              <img
                src={story.profileImg}
                alt={story.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Username text */}
            <span className="text-white text-xs font-medium drop-shadow-md truncate max-w-[60px]">
              {story.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
