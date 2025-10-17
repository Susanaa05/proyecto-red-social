import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
  profileImg: string;
}

const SuggestedUsers: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([
    {
      id: 1,
      name: "Juan Pérez",
      username: "@juan.perez_01",
      isFollowing: false,
      profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Ana Martinez",
      username: "@ana.miz_",
      isFollowing: false,
      profileImg: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "María Gómez",
      username: "@maria_gmz",
      isFollowing: false,
      profileImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Carlos",
      username: "@carlos.rodz",
      isFollowing: false,
      profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ]);

  const toggleFollow = (userId: number) => {
    setSuggestedUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">SUGGESTED</h3>
      <div className="flex flex-col gap-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            {/* Contenedor de información del usuario con foto */}
            <div className="flex items-center gap-3 flex-1">
              {/* Foto de perfil */}
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={user.profileImg} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Nombre y username */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-gray-900 truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate">{user.username}</div>
              </div>
            </div>

            {/* Botón Follow */}
            <button 
              className={`
                px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 flex-shrink-0
                ${user.isFollowing 
                  ? 'bg-[#7C6593] text-white border-[#7C6593] hover:bg-[#6a5478]' 
                  : 'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
              onClick={() => toggleFollow(user.id)}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;