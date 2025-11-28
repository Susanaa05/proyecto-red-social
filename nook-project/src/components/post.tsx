import React from "react";
import { useState } from "react";
import { Bookmark, MapPin, BookmarkCheck, MessageCircle, Share } from 'lucide-react';
import { LikeButton } from './LikeButton';
import { useAppSelector } from '../store/hooks';
import { CommentsSection } from './CommentsSection';

// Interface defining the expected props for the Post component
interface PostProps {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  visitors: string[];
  initialLikes?: number;
  initialIsLiked?: boolean;
}

const Post: React.FC<PostProps> = ({
  id,
  image,
  title,
  category,
  description,
  visitors,
  initialLikes = 0,
  initialIsLiked = false
}) => {
  const [added, setAdded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  /**
   * Toggles the 'added' state when the "Add to list" button is clicked.
   */
  const handleAddClick = () => {
    setAdded(!added);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl mx-auto mb-6">
      
      {/* === MAIN IMAGE SECTION === */}
      <div className="relative w-full h-[500px] sm:h-[500px] md:h-[450px] lg:h-[500px]">
        {/* Main post image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Blurred overlay at the bottom for better text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-28 backdrop-blur-md bg-black/40 sm:h-24" />

        {/* === CONTENT SECTION (title, category, buttons, etc.) === */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-4 text-white">
          
          {/* Post title and category badge */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-bold text-3xl sm:text-xl">{title}</h3>
            <span className="bg-black/70 text-white px-4 py-2 rounded-full text-base font-medium sm:text-xs sm:px-2 sm:py-1">
              {category}
            </span>
          </div>

          {/* Post description */}
          <p className="text-xl opacity-90 mb-3 sm:text-sm">{description}</p>

          <div className="flex items-center justify-between flex-wrap gap-3">
            
            {/* === VISITORS SECTION === */}
            <div className="flex items-center gap-3">
              {/* Display visitors as overlapping circular avatars */}
              <div className="flex -space-x-3">
                {visitors.map((visitor, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 sm:w-7 sm:h-7 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={visitor}
                      alt={`Visitor ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Total number of visitors */}
              <span className="text-white font-bold text-2xl sm:text-base">
                {visitors.length}
              </span>
            </div>

            {/* === ACTION BUTTONS === */}
            <div className="flex gap-3">
              
              {/* Button to add or remove the post from the user's list */}
              <button
                onClick={handleAddClick}
                className={`px-6 py-3 flex flex-row items-center gap-2 sm:px-3 sm:py-1.5 rounded-xl text-lg sm:text-xs font-medium border transition-colors ${
                  added
                    ? "bg-purple-500 text-white border-purple-600 hover:bg-purple-600"
                    : "bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                }`}
              >
                {added ? <BookmarkCheck /> : <Bookmark />}
                {added ? "Added" : "Add to list"}
              </button>

              {/* Button that hypothetically shows directions to the location */}
              <button className="px-6 py-3 flex flex-row sm:px-3 sm:py-1.5 bg-purple-500 text-white rounded-xl text-lg sm:text-xs font-medium hover:bg-purple-600 transition-colors items-center">
                <MapPin />
                How to go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === INTERACTIONS BAR - LIKE, COMMENT, SHARE === */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <LikeButton 
            postId={id}
            initialLikes={initialLikes}
            initialIsLiked={initialIsLiked}
          />

          {/* Comment Button */}
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <MessageCircle size={24} />
            <span className="font-medium">
              {showComments ? 'Hide' : 'Comment'}
            </span>
          </button>

          {/* Share Button */}
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
            <Share size={24} />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* === COMMENTS SECTION === */}
      <CommentsSection 
        postId={id}
        showComments={showComments}
      />
    </div>
  );
};

export default Post;