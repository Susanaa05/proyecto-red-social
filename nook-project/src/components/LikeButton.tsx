// CREAR: src/components/LikeButton.tsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  postId: number;
}

export const LikeButton = ({ postId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Cargar estado inicial de likes
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        // Obtener conteo de likes
        const { count, error: countError } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', postId);

        if (!countError) {
          setLikeCount(count || 0);
        }

        // Verificar si usuario actual dio like
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
          const { data } = await supabase
            .from('likes')
            .select('*')
            .eq('post_id', postId)
            .eq('user_id', user.user.id)
            .single();

          setIsLiked(!!data);
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    if (loading) return;
    
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      alert('Please log in to like posts');
      return;
    }

    setLoading(true);
    try {
      if (isLiked) {
        // Quitar like
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.user.id);
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        // Dar like
        await supabase
          .from('likes')
          .insert({ 
            post_id: postId, 
            user_id: user.user.id 
          });
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error updating like:', error);
      alert('Error updating like');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
        isLiked 
          ? 'bg-red-500 text-white shadow-md hover:bg-red-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
      <span className="font-semibold">{likeCount}</span>
    </button>
  );
};