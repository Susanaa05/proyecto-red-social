import { useNavigate } from 'react-router-dom';
import { Home, Map, Search, Bell, PlusCircle, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout, updateProfile } from '../store/authSlice';
import { openEditProfileModal, closeEditProfileModal } from '../store/uiSlice';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get user data and modal state from Redux
  const user = useAppSelector((state) => state.auth.user);
  const isEditModalOpen = useAppSelector((state) => state.ui.isEditProfileModalOpen);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || 'Alex',
    userName: user?.userName || 'Alex_S',
    location: user?.location || 'Cali, Colombia',
    avatar: user?.avatar || 'https://i.pinimg.com/736x/42/66/fd/4266fde4546eb6262abce6b8802d4cd3.jpg'
  });

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
            <div className="w-40 h-48 rounded-full flex-shrink-0 overflow-hidden border-4 border-gray-200">
              <img 
                src={user?.avatar || editForm.avatar}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Info and Stats */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user?.firstName || editForm.firstName}</h1>
                <p className="text-gray-600 text-lg">@{user?.userName || editForm.userName}</p>
              </div>
              
              <div className="flex gap-12">
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
              className="px-8 py-3 text-white rounded-full font-medium transition-colors flex items-center gap-2 text-lg" 
              style={{backgroundColor: '#7c6593'}}
            >
              <span>🌐</span> All
            </button>
            <button 
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-lg hover:bg-[#7c6593] hover:text-white"
            >
              San Antonio
            </button>
            <button 
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-lg hover:bg-[#7c6593] hover:text-white"
            >
              Tierradentro
            </button>
            <button 
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-medium transition-colors text-lg hover:bg-[#7c6593] hover:text-white"
            >
              Lengua de Mariposa
            </button>
          </div>
        </div>

        {/* Posts Grid - Instagram Style 4 Columns */}
        <div className="grid grid-cols-4 gap-1">
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/1200x/1b/03/07/1b0307811f10ba4453af49f6da9f4bc3.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/69/e6/d7/69e6d75b2b3654559138638390c21a56.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/28/51/f2/2851f21b7f2eddc6aa6d6cce6b91c78d.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/61/5a/8a/615a8a32c8abe60efccf2b37997c2571.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
         
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/7f/01/78/7f017860c8448b7318ac3e59ca866713.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/92/b8/1d/92b81d5d9ba8186e8800556d5cd5fdcf.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/b0/d4/52/b0d452428acb1e999a3611169c820717.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/1200x/98/07/fb/9807fb2ab484f3e6f447076bb88f7f28.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://i.pinimg.com/1200x/75/94/01/7594012b4b3bad6323f02747fe5a6e12.jpg" 
              alt="Post" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
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
            
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <img 
                src={editForm.avatar} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border border-gray-200"
              />
              <button className="text-[#7c6593] font-medium hover:text-[#5a4569] transition-colors duration-200 text-sm">
                Change profile picture
              </button>
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
