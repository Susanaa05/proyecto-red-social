import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
}

const SuggestedUsers: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([
    {
      id: 1,
      name: "Juan Pérez",
      username: "@juan.perez_01",
      isFollowing: false
    },
    {
      id: 2,
      name: "Ana Martinez",
      username: "@ana.miz_",
      isFollowing: false
    },
    {
      id: 3,
      name: "María Gómez",
      username: "@maria_gmz",
      isFollowing: false
    },
    {
      id: 4,
      name: "Carlos",
      username: "@carlos.rodz",
      isFollowing: false
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
    <div className="mt-5">
      <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">SUGGESTED</h3>
      <div className="flex flex-col gap-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            <div className="flex-1">
              <div className="font-bold text-sm text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500">{user.username}</div>
            </div>
            <button 
              className={`
                px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200
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