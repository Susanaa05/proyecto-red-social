import { NavLink } from 'react-router-dom';
import nookLogo from "../assets/nook.png";
import { Home, Search, Plus, Bell, CircleUserRound, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Responsive navigation sidebar component.
 * Expands automatically on desktop and toggles visibility on mobile.
 */
function NavBar() {
  /** State for mobile menu visibility */
  const [isOpen, setIsOpen] = useState(false);

  /** State to detect if the user is on a desktop screen */
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  /** Toggles the mobile menu open or closed */
  const toggleMenu = () => setIsOpen(!isOpen);

  /**
   * Updates `isDesktop` state when the window is resized.
   * Cleans up the event listener on component unmount.
   */
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Sidebar container */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-black text-white flex flex-col items-center py-6 transition-all duration-300 z-50
          ${isDesktop ? 'w-64' : isOpen ? 'w-40' : 'w-16'}
        `}
      >
        {/* Menu button (only visible on mobile) */}
        {!isDesktop && (
          <button
            onClick={toggleMenu}
            className="bg-gray-900 p-2 rounded-md hover:bg-gray-800 transition mb-6"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}

        {/* Logo (visible when expanded or on desktop) */}
        {(isOpen || isDesktop) && (
          <img
            src={nookLogo}
            alt="Nook Logo"
            className={`transition-all duration-300 mb-8 
              ${isDesktop ? 'w-28' : 'w-16'}`}
          />
        )}

        {/* Navigation links */}
        <nav
          className={`
            flex flex-col w-full px-2
            ${isDesktop ? 'gap-12' : 'gap-8'}
          `}
        >
          {[
            { to: "/", label: "Home", icon: <Home /> },
            { to: "/searchPage", label: "Search", icon: <Search /> },
            { to: "/createPost", label: "Create", icon: <Plus /> },
            { to: "/notifications", label: "Notifications", icon: <Bell /> },
            { to: "/profile", label: "Profile", icon: <CircleUserRound /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 hover:text-purple-400 px-2 transition-colors ${
                  isActive ? 'text-purple-300' : ''
                } ${isDesktop ? 'text-lg font-medium' : 'text-base'}`
              }
              onClick={() => !isDesktop && setIsOpen(false)} // Closes menu after click on mobile
            >
              {/* Icon size adjusts between mobile and desktop */}
              <div className={`${isDesktop ? 'scale-125' : 'scale-100'} transition-transform`}>
                {icon}
              </div>

              {/* Label fades in/out depending on sidebar state */}
              <span
                className={`
                  overflow-hidden transition-all duration-300
                  ${isOpen || isDesktop ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                `}
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default NavBar;
