// CREAR: src/pages/PostDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { LikeButton } from "../components/LikeButton";
import { CommentsSection } from "../components/CommentsSection";
import { ArrowLeft, Calendar, MapPin, User, MessageCircle } from "lucide-react";
import { useAppSelector } from "../store/hooks";

interface PostDetailType {
  id: number;
  image_url: string;
  title: string;
  category: string;
  description: string;
  created_at: string;
  location?: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
}

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id (
              username,
              avatar_url
            )
          `)
          .eq('id', postId)
          .single();

        if (error) {
          console.error('Error fetching post:', error);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c6593]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-[#7c6593] hover:text-[#6a5478] font-semibold"
          >
            Return back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#7c6593] hover:text-[#6a5478] transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* Post principal */}
        <div className="bg-white">
          {/* Imagen del post */}
          <div className="relative">
            <img 
              src={imageError ? 'https://via.placeholder.com/800x600?text=Image+Not+Found' : post.image_url} 
              alt={post.title}
              className="w-full h-96 object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          
          {/* Contenido del post */}
          <div className="p-6">
            {/* Header del post */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {post.location && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span className="text-sm">{post.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Información del usuario */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
              {post.profiles.avatar_url ? (
                <img
                  src={post.profiles.avatar_url}
                  alt={post.profiles.username}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#7c6593] border-2 border-white flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900">@{post.profiles.username}</div>
                <div className="text-gray-500 text-sm">Posted this content</div>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6 p-4 bg-gray-50 rounded-xl">
              {post.description}
            </p>

            {/* Acciones */}
            <div className="flex items-center gap-4 mb-6 p-4 border-t border-b border-gray-200">
              <LikeButton 
                postId={post.id} 
                initialLikes={0}
                initialIsLiked={false}
              />
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <MessageCircle size={20} />
                <span className="font-semibold">Comments</span>
              </button>
            </div>

            {/* Sección de comentarios */}
            <CommentsSection 
              postId={post.id} 
              showComments={showComments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};