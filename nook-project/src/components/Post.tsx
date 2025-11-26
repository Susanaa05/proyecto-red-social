import React from "react";
import { useState } from "react";
import { Bookmark, MapPin, BookmarkCheck, MessageCircle, Heart, Send } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addComment } from '../store/postsSlice';
import type { Comment } from '../store/postsSlice';

// Extended Interface for Post with comments
interface PostProps {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  visitors: string[];
  comments?: Comment[];
}

const Post: React.FC<PostProps> = ({
  id,
  image,
  title,
  category,
  description,
  visitors,
  comments = [],
}) => {
  const [added, setAdded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleAddClick = () => {
    setAdded(!added);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id || '1',
      userAvatar: user.avatar || 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg',
      username: user.userName || 'Alex_S',
      text: newComment,
      timestamp: Date.now(),
    };

    dispatch(addComment({ postId: id, comment }));
    setNewComment('');
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl mx-auto mb-6">
      
      {/* === MAIN IMAGE SECTION === */}
      <div className="relative w-full h-[500px] sm:h-[500px] md:h-[450px] lg:h-[500px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-28 backdrop-blur-md bg-black/40 sm:h-24" />

        {/* === CONTENT SECTION === */}
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
              <span className="text-white font-bold text-2xl sm:text-base">
                {visitors.length}
              </span>
            </div>

            {/* === ACTION BUTTONS === */}
            <div className="flex gap-3">
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

              <button className="px-6 py-3 flex flex-row sm:px-3 sm:py-1.5 bg-purple-500 text-white rounded-xl text-lg sm:text-xs font-medium hover:bg-purple-600 transition-colors items-center">
                <MapPin />
                How to go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === INTERACTIONS BAR === */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button 
              onClick={handleLikeClick}
              className={`flex items-center gap-2 transition-colors ${
                liked ? "text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Heart fill={liked ? "currentColor" : "none"} size={24} />
              <span className="font-medium">Like</span>
            </button>

            {/* Comment Button */}
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <MessageCircle size={24} />
              <span className="font-medium">Comment</span>
              {comments.length > 0 && (
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {comments.length}
                </span>
              )}
            </button>

            
          </div>
        </div>
      </div>

      {/* === COMMENTS SECTION === */}
      {showComments && (
        <div className="p-4">
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-4">
            <img 
              src={user?.avatar || 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'} 
              alt="Your avatar" 
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="bg-purple-500 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.username} 
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{comment.username}</span>
                        <span className="text-gray-500 text-sm">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 px-2">

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;