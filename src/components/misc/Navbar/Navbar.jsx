import { NavLink } from "react-router-dom";
import { Bell } from 'lucide-react'
import './Navbar.css'


function Navbar () {
    return (
        <div className='navbar bg-light'>
            <NavLink className="link-unstyled bell" to={"/notifications"}>
                {({ isActive }) => (
                    <Bell size={22} strokeWidth={2} fill={isActive ? 'currentColor' : 'none'} />
                )}
            </NavLink>
        </div>
    )
}

export default Navbar