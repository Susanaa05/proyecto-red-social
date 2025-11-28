import { useNavigate } from 'react-router-dom';
import { Home, Map, Search, Bell, PlusCircle, User, Camera } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout, updateProfile } from '../store/authSlice';
import { openEditProfileModal, closeEditProfileModal } from '../store/uiSlice';
import { supabase } from '../lib/supabase';
import type { Post } from '../store/postsSlice';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user data and modal state from Redux
  const user = useAppSelector((state) => state.auth.user);
  const isEditModalOpen = useAppSelector((state) => state.ui.isEditProfileModalOpen);
  
  // Nuevo estado para los posts del usuario
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  
  // Nuevo estado para el filtro activo
  const [activeFilter, setActiveFilter] = useState('all');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || 'Alex',
    userName: user?.userName || 'Alex_S',
    location: user?.location || 'Cali, Colombia',
    avatar: user?.avatar || 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'
  });

  // Estado para la preview de la nueva imagen
  const [avatarPreview, setAvatarPreview] = useState<string>(editForm.avatar);

  // 👇 FUNCIÓN PARA CARGAR POSTS DEL USUARIO
  const fetchUserPosts = async () => {
    if (!user) return;
    
    try {
      setLoadingPosts(true);
      console.log('📡 Cargando posts del usuario:', user.id);
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error cargando posts del usuario:', error);
        return;
      }
      
      if (data) {
        console.log('✅ Posts del usuario cargados:', data.length);
        // Transformar datos de Supabase al formato de la app
        const transformedPosts: Post[] = data.map(post => ({
          id: post.id,
          image: post.image_url,
          title: post.title,
          category: post.category,
          description: post.description,
          visitors: [],
          likes: 0,
          isLiked: false,
          location: post.location,
          tags: post.tags
        }));
        setUserPosts(transformedPosts);
      }
    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Effect para cargar los posts del usuario
  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  // Effect para escuchar cuando se crean nuevos posts
  useEffect(() => {
    const handlePostCreated = () => {
      console.log('🔄 Post creado, recargando posts...');
      fetchUserPosts();
    };

    window.addEventListener('postCreated', handlePostCreated);
    
    return () => {
      window.removeEventListener('postCreated', handlePostCreated);
    };
  }, []);

  // 👇 FUNCIÓN CLAVE PARA NAVEGAR A DETALLES DEL POST
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  // Filtrar posts del usuario según el filtro activo
  const filteredUserPosts = activeFilter === 'all' 
    ? userPosts 
    : userPosts.filter(post => post.location === activeFilter);

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/maps', icon: Map, label: 'Maps' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/create', icon: PlusCircle, label: 'Create' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  // Update edit form when user data changes
  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName,
        userName: user.userName,
        location: user.location,
        avatar: user.avatar,
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  // Modal transition effects
  useEffect(() => {
    if (isEditModalOpen) {
      setTimeout(() => setIsModalVisible(true), 100);
    } else {
      setIsModalVisible(false);
    }
  }, [isEditModalOpen]);

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => dispatch(closeEditProfileModal()), 300);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para manejar el cambio de foto de perfil
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validar tamaño del archivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Crear URL temporal para la preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target?.result as string;
        setAvatarPreview(newAvatarUrl);
        setEditForm(prev => ({ ...prev, avatar: newAvatarUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para abrir el selector de archivos
  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Función para usar una foto de ejemplo (para testing)
  const handleUseSamplePhoto = () => {
    const samplePhotos = [
      'https://i.pinimg.com/736x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg',
      'https://i.pinimg.com/736x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg',
      'https://i.pinimg.com/736x/f5/9c/90/f59c9088e58a7baaa3b463ddca7dbab2.jpg',
      'https://i.pinimg.com/736x/3c/2b/ad/3c2badd0b9688bcb810ef699afc3f7c1.jpg',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    ];
    
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    setAvatarPreview(randomPhoto);
    setEditForm(prev => ({ ...prev, avatar: randomPhoto }));
  };

  const handleSaveChanges = () => {
    // Dispatch action to update user profile in Redux
    dispatch(updateProfile(editForm));
    closeModal();
  };

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* MAIN CONTENT */}
      <div className="p-6">
        {/* Header - Profile Picture + Info + Edit Button */}
        <div className="mb-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-8">
            {/* Profile Picture */}
            <div className="w-40 h-48 rounded-full flex-shrink-0 overflow-hidden border-4 border-gray-200 relative group">
              <img 
                src={user?.avatar || editForm.avatar}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              {/* Overlay para cambiar foto en el perfil principal */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Camera className="text-white w-8 h-8" />
              </div>
            </div>
            
            {/* Info and Stats */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user?.firstName || editForm.firstName}</h1>
                <p className="text-gray-600 text-lg">@{user?.userName || editForm.userName}</p>
              </div>
              
              <div className="flex gap-12">
                <div>
                  <div className="font-bold text-gray-900 text-xl">{userPosts.length}</div>
                  <div className="text-gray-600">Posts</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xl">135</div>
                  <div className="text-gray-600">Following</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xl">2031</div>
                  <div className="text-gray-600">Followers</div>
                </div>
              </div>
            </div>
            
            {/* Edit Profile Button */}
            <button 
              className="px-8 py-3 bg-gray-200 rounded-lg text-gray-800 font-semibold transition-colors hover:bg-[#7c6593] hover:text-white"
              onClick={() => dispatch(openEditProfileModal())}
            >
              Edit Profile
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900">{user?.firstName || editForm.firstName}</h1>
                <p className="text-gray-400 text-xl">@{user?.userName || editForm.userName}</p>
              </div>
              
              <button 
                className="px-6 py-2 bg-gray-200 rounded-lg text-gray-800 font-semibold transition-colors text-sm hover:bg-[#7c6593] hover:text-white"
                onClick={() => dispatch(openEditProfileModal())}
              >
                Edit Profile
              </button>
            </div>
            
            <div className="flex gap-8 text-lg">
              <div>
                <span className="font-semibold text-gray-900">{userPosts.length}</span> Posts
              </div>
              <div>
                <span className="font-semibold text-gray-900">135</span> Following
              </div>
              <div>
                <span className="font-semibold text-gray-900">2031</span> Followers
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Horizontal Layout */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <img 
                src="https://i.pinimg.com/736x/d5/ec/73/d5ec73a8c387e093e05aa82d762c6183.jpg" 
                alt="In common" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <img 
                src="https://i.pinimg.com/736x/3b/5c/ce/3b5cce10f573a4b38c5509010b6de2ec.jpg" 
                alt="In common" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <img 
                src="https://i.pinimg.com/736x/17/df/6b/17df6beaa9ca3a8ae74f2bbbd4e4d690.jpg" 
                alt="In common" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-sm text-gray-600">In common</div>
          </div>

          <div className="bg-gray-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">210</div>
            <div className="text-sm text-gray-600">Want to try</div>
          </div>

          <div className="bg-gray-200 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">210</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
        </div>

        {/* PLACES SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Places</h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 text-lg ${
                activeFilter === 'all' 
                  ? 'text-white bg-[#7c6593]' 
                  : 'bg-gray-200 text-gray-700 hover:bg-[#7c6593] hover:text-white'
              }`}
            >
              <span>🌐</span> All
            </button>
            
            <button 
              onClick={() => setActiveFilter('San Antonio')}
              className={`px-8 py-3 rounded-full font-medium transition-colors text-lg ${
                activeFilter === 'San Antonio'
                  ? 'text-white bg-[#7c6593]' 
                  : 'bg-gray-200 text-gray-700 hover:bg-[#7c6593] hover:text-white'
              }`}
            >
              San Antonio
            </button>
            
            <button 
              onClick={() => setActiveFilter('Tierradentro')}
              className={`px-8 py-3 rounded-full font-medium transition-colors text-lg ${
                activeFilter === 'Tierradentro'
                  ? 'text-white bg-[#7c6593]' 
                  : 'bg-gray-200 text-gray-700 hover:bg-[#7c6593] hover:text-white'
              }`}
            >
              Tierradentro
            </button>
            
            <button 
              onClick={() => setActiveFilter('Lengua de Mariposa')}
              className={`px-8 py-3 rounded-full font-medium transition-colors text-lg ${
                activeFilter === 'Lengua de Mariposa'
                  ? 'text-white bg-[#7c6593]' 
                  : 'bg-gray-200 text-gray-700 hover:bg-[#7c6593] hover:text-white'
              }`}
            >
              Lengua de Mariposa
            </button>
          </div>
        </div>

        {/* Posts Grid - Instagram Style 4 Columns */}
        {loadingPosts ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c6593]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1">
            {filteredUserPosts.map((post) => (
              <div 
                key={post.id} 
                className="aspect-[3/4] overflow-hidden relative group cursor-pointer"
                onClick={() => handlePostClick(post.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handlePostClick(post.id)}
                aria-label={`View post ${post.title}`}
              >
                <img 
                  src={post.image} 
                  alt={`Post: ${post.title}`} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay con información al hacer hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-start p-2">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {post.location || 'No location'}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Mensaje si no hay posts */}
            {filteredUserPosts.length === 0 && (
              <div className="col-span-4 text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📷</div>
                <p className="text-gray-500 text-lg">No posts yet</p>
                <p className="text-gray-400 text-sm">Share your first adventure!</p>
                <button 
                  onClick={() => dispatch(openEditProfileModal())}
                  className="mt-4 px-6 py-2 bg-[#7c6593] text-white rounded-lg font-medium hover:bg-[#6a5478] transition-colors"
                >
                  Create your first post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== EDIT PROFILE MODAL ===== */}
      {isEditModalOpen && (
        <div 
          className={`fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 ${
            isModalVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          <div 
            className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl transition-all duration-300 transform ${
              isModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title */}
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">EDIT PROFILE</h2>
            
            {/* Avatar Section - MEJORADO */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img 
                  src={avatarPreview} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                />
                <div className="absolute bottom-2 right-2 bg-[#7c6593] rounded-full p-2 cursor-pointer hover:bg-[#6a5478] transition-colors">
                  <Camera size={16} className="text-white" />
                </div>
              </div>
              
              {/* Input file oculto */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleChangePhotoClick}
                  className="text-[#7c6593] font-medium hover:text-[#5a4569] transition-colors duration-200 text-sm"
                >
                  Change profile picture
                </button>
                <button 
                  onClick={handleUseSamplePhoto}
                  className="text-gray-500 font-medium hover:text-gray-700 transition-colors duration-200 text-xs"
                >
                  Use sample photo
                </button>
              </div>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              {/* First Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#7c6593] focus:border-[#7c6593] transition-all duration-200 bg-white"
                />
              </div>

              {/* User Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  User
                </label>
                <input
                  type="text"
                  value={editForm.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#7c6593] focus:border-[#7c6593] transition-all duration-200 bg-white"
                />
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#7c6593] focus:border-[#7c6593] transition-all duration-200 bg-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSaveChanges}
                className="flex-1 bg-[#7c6593] text-white py-3 rounded-lg font-medium hover:bg-[#6a547f] transition-colors duration-200"
              >
                Save changes
              </button>
              
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;