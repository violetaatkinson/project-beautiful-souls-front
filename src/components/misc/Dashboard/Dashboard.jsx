import { Home, PawPrint, MessageCircle, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'

// El corazón de "Liked Pets" ya no vive acá (esa pantalla se sacó del
// todo). En su lugar va el chat, y el chat le cede su lugar viejo al
// perfil, que antes solo se podía abrir tocando el avatar de arriba.
// Profile usa "User" (silueta simple, sin círculo propio) para que
// quede igual de "plano" que Home/PawPrint/MessageCircle. CircleUserRound
// traía su propio círculo dibujado adentro del ícono, y al rellenarlo en
// el estado activo terminaba pareciendo un puntito azul sólido en vez de
// un ícono normal.
const NAV_ITEMS = [
    { to: '/search', icon: Home },
    { to: '/adoptions', icon: PawPrint },
    { to: '/users', icon: MessageCircle },
    { to: '/profile', icon: User },
]

function Dashboard () {
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
        </div>
    )
}

export default Dashboard