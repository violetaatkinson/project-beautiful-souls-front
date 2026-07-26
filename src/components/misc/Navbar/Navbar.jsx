import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell } from 'lucide-react'
import AuthContext from "../../../contexts/AuthContext";
import './Navbar.css'


function Navbar () {
    const { user } = useContext(AuthContext);

    return (
        <div className='navbar bg-light'>
            <Link className="link-unstyled nav-profile" to={"/profile"}>
                <img src={user.image} alt="user" className="rounded-circle user-img" width={32} height={32}/>
            </Link>

            <Link to="/search" className="link-unstyled brand-mark">
                <span className="brand-text">Beautiful Souls</span>
            </Link>

            <NavLink className="link-unstyled bell" to={"/notifications"}>
                {({ isActive }) => (
                    <Bell size={21} strokeWidth={2} fill={isActive ? 'currentColor' : 'none'} />
                )}
            </NavLink>
        </div>
    )
}

export default Navbar