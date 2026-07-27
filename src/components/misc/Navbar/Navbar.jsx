import { Link, NavLink } from "react-router-dom";
import { Bell } from 'lucide-react'
import './Navbar.css'


function Navbar () {
    return (
        <div className='navbar bg-light'>
            {/* El acceso al perfil se mudó al nav de abajo (Dashboard), donde
                ahora se ve el avatar real del usuario. Este espacio queda
                vacío a propósito para que "Beautiful Souls" se siga viendo
                centrado en el grid de 3 columnas. */}
            <span aria-hidden="true" />

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