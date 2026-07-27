import { useContext } from 'react'
import { Home, PawPrint, MessageCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import './Dashboard.css'

// El corazón de "Liked Pets" ya no vive acá (esa pantalla se sacó del
// todo). En su lugar va el chat, y el chat le cede su lugar viejo al
// perfil, que antes solo se podía abrir tocando el avatar de arriba.
const NAV_ITEMS = [
    { to: '/search', icon: Home },
    { to: '/adoptions', icon: PawPrint },
    { to: '/users', icon: MessageCircle },
]

function Dashboard () {
    const { user } = useContext(AuthContext)

    return (
        <div className='dashbord bg-light'>
            {NAV_ITEMS.map(({ to, icon: Icon }) => (
                <NavLink key={to} className="dash-item link-unstyled" to={to}>
                    {({ isActive }) => (
                        <span className={`dash-pill ${isActive ? 'active' : ''}`}>
                            <Icon
                                size={24}
                                strokeWidth={2}
                                fill={isActive ? 'currentColor' : 'none'}
                            />
                        </span>
                    )}
                </NavLink>
            ))}
            <NavLink className="dash-item link-unstyled" to="/profile">
                {({ isActive }) => (
                    <span className={`dash-pill dash-pill-profile ${isActive ? 'active' : ''}`}>
                        <img src={user?.image} alt="" className="dash-profile-img" />
                    </span>
                )}
            </NavLink>
        </div>
    )
}

export default Dashboard