import React from "react";
import { useState } from "react";
import { Bookmark, MapPin, BookmarkCheck, MessageCircle, Share, Send, Trash2 } from 'lucide-react';
import { LikeButton } from './LikeButton';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addComment, deleteComment } from '../store/postsSlice';
import type { Comment } from '../store/postsSlice';

// Interface defining the expected props for the Post component
interface PostProps {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  visitors: string[];
  comments?: Comment[];
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
  comments = [],
  initialLikes = 0,
  initialIsLiked = false
}) => {
  const [added, setAdded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  /**
   * Toggles the 'added' state when the "Add to list" button is clicked.
   */
  const handleAddClick = () => {
    setAdded(!added);
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

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment({ postId: id, commentId }));
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

  const isCommentAuthor = (comment: Comment) => {
    return comment.userId === (user?.id || '1');
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
            {comments.length > 0 && (
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                {comments.length}
              </span>
            )}
          </button>

          {/* Share Button */}
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
            <Share size={24} />
            <span className="font-medium">Share</span>
          </button>
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
                <div key={comment.id} className="flex gap-3 group">
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.username} 
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-3 relative group">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{comment.username}</span>
                        <span className="text-gray-500 text-sm">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                      
                      {/* Delete Button - Solo para el autor, aparece en hover */}
                      {isCommentAuthor(comment) && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete comment"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
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