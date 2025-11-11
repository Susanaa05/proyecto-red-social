/**
 * LoginMapSection Component
 * Displays the decorative map section with profile pictures
 * Only visible on desktop screens (lg and above)
 */

function LoginMapSection() {
  // Profile pictures data
  const profiles = [
    {
      id: 1,
      position: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      image: "https://i.pinimg.com/736x/d8/f8/b4/d8f8b4f591c29fb209c4a7dc33160dd5.jpg",
      alt: "User 1"
    },
    {
      id: 2,
      position: "right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2",
      image: "https://i.pinimg.com/736x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg",
      alt: "User 2"
    },
    {
      id: 3,
      position: "bottom-0 left-1/3 transform -translate-x-1/2 translate-y-1/2",
      image: "https://i.pinimg.com/736x/f5/9c/90/f59c9088e58a7baaa3b463ddca7dbab2.jpg",
      alt: "User 3"
    },
    {
      id: 4,
      position: "bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2",
      image: "https://i.pinimg.com/736x/3c/2b/ad/3c2badd0b9688bcb810ef699afc3f7c1.jpg",
      alt: "User 4"
    }
  ];

  return (
    <div className="hidden lg:flex w-1/2 justify-center items-center relative">
      {/* Main circular container with map */}
      <div className="relative w-[400px] h-[400px]">
        
        {/* Map background - Simulated map SVG */}
        <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
          <div className="w-full h-full bg-gray-200">
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-80">
              {/* Grid pattern background */}
              <rect fill="#e5e7eb" width="400" height="400"/>
              <path fill="#d1d5db" d="M0 0h200v200H0zm200 200h200v200H200z"/>
              
              {/* Simulated streets/roads */}
              <g fill="#9ca3af" opacity="0.3">
                <rect x="50" y="50" width="80" height="4" rx="2"/>
                <rect x="50" y="70" width="120" height="4" rx="2"/>
                <rect x="50" y="90" width="60" height="4" rx="2"/>
                <rect x="250" y="150" width="80" height="4" rx="2"/>
                <rect x="250" y="170" width="100" height="4" rx="2"/>
                <rect x="100" y="250" width="80" height="4" rx="2"/>
                <rect x="100" y="270" width="120" height="4" rx="2"/>
                
                {/* Vertical streets */}
                <rect x="150" y="0" width="4" height="150" rx="2"/>
                <rect x="280" y="50" width="4" height="200" rx="2"/>
                <rect x="180" y="200" width="4" height="150" rx="2"/>
              </g>
            </svg>
          </div>
        </div>

        {/* Profile pictures positioned around the circle */}
        {profiles.map((profile) => (
          <div key={profile.id} className={`absolute ${profile.position}`}>
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <img 
                src={profile.image}
                alt={profile.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginMapSection;