import { NavLink } from 'react-router-dom';
import nookLogo from "../assets/nook.png";
import { Home } from 'lucide-react';

function NavBar() {

    const linkClass =
        " hover:text-purple-400";

    const activeClass =
        " text-white font-semibold flex flex-row gap-2";

    return (
        <aside className='fixed top-0 left-0 h-full w-50 bg-black text-white flex flex-col items-center py-10 space-y-10 px-10' >

            <nav className='flex flex-col gap-10 w-full '>

                <img src={nookLogo} alt="Logo Nook" className="w-24 " />

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                ><Home />
                    <p>Home</p>
                </NavLink>

                <NavLink
                    to="/searchPage"
                    end
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    Search
                </NavLink>

                <NavLink
                    to="/notifications"
                    end
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    Notifications
                </NavLink>

                <NavLink
                    to="/createPost"
                    end
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    Create
                </NavLink>

                <NavLink
                    to="/profile"
                    end
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    Profile
                </NavLink>

            </nav >
        </aside>


    )

}
export default NavBar;