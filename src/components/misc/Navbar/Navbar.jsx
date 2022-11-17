import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { NavLink } from 'react-router-dom'

import notification from '../../../assets/notificacion-gray.png'
import notificationC from '../../../assets/notificacion.png'
// eslint-disable-next-line 
import nabvar from './Navbar.css'


function Navbar () {
    const { user } = useContext(AuthContext);

    return (
        <div className='navbar bg-light'>
            <Link className="link-unstyled" to={"/profile"}>
                <img src={user.image} alt="user" className="rounded-circle m-2 user-img" width={60} height={60}/>
            </Link>
                <h3 className="title">Beautiful Souls</h3>
            <NavLink className="link-unstyled bell" to={"/notifications"}>
                {
                    ({ isActive }) => (
                        <img src={isActive ? notificationC : notification} alt="notification" width={40}/>
                    )
                }
            </NavLink>
        </div>
    )
}

export default Navbar

