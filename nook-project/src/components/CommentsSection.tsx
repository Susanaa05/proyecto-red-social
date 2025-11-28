import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Send, MessageCircle, Trash2 } from "lucide-react";
import { useAppSelector } from "../store/hooks";

interface CommentsSectionProps {
  postId: number;
  showComments: boolean;
}

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
}

export const CommentsSection = ({ postId, showComments }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  // Cargar comentarios existentes
  useEffect(() => {
    if (!showComments) return;

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select(`
            *,
            profiles:user_id (
              username,
              avatar_url
            )
          `)
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (!error && data) {
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId, showComments]);

  const addComment = async () => {
    if (!newComment.trim() || loading) return;

    if (!user) {
      alert('Please log in to comment');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({ 
          post_id: postId, 
          user_id: user.id,
          content: newComment.trim()
        })
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      if (data) {
        setComments(prev => [...prev, data]);
        setNewComment("");
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment');
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error deleting comment');
    }
  };

  if (!showComments) return null;

  return (
    <div className="border-t border-gray-100">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Comments ({comments.length})
          </h3>
        </div>
        
        {/* Formulario para comentar */}
        <div className="flex gap-3 mb-6">
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
              onKeyPress={(e) => e.key === 'Enter' && addComment()}
            />
            <button
              onClick={addComment}
              disabled={loading || !newComment.trim()}
              className="bg-purple-500 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Lista de comentarios */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 group">
              <img
                src={comment.profiles.avatar_url || 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'}
                alt={comment.profiles.username}
                className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-white"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-3 relative group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{comment.profiles.username}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="text-gray-700">{comment.content}</div>
                  
                  {/* Delete button - solo para el autor */}
                  {user && comment.user_id === user.id && (
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete comment"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {comments.length === 0 && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
              <MessageCircle size={32} className="mx-auto mb-2 text-gray-300" />
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};