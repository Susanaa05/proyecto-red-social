import React, { useState } from "react";
import usersData from "../data/suggestedUsers.json"; // Import user data from JSON

// Type definition for a user
interface User {
  id: number;
  name: string;
  username: string;
  isFollowing: boolean;
  profileImg: string;
}

const SuggestedUsers: React.FC = () => {
  // State containing the list of suggested users
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>(usersData);

  // Function to toggle the "Follow" state of a user
  const toggleFollow = (userId: number) => {
    setSuggestedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing } // Switch follow/unfollow
          : user
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Section title */}
      <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">
        SUGGESTED
      </h3>

      {/* List of suggested users */}
      <div className="flex flex-col gap-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            
            {/* User info and profile image */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={user.profileImg}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and username */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-gray-900 truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user.username}
                </div>
              </div>
            </div>

            {/* Follow / Following button */}
            <button
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 flex-shrink-0
                ${
                  user.isFollowing
                    ? "bg-[#7C6593] text-white border-[#7C6593] hover:bg-[#6a5478]"
                    : "bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              onClick={() => toggleFollow(user.id)}
            >
              {user.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
