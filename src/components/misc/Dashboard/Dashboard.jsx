import { PawPrint, Star, Home, MessageCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'

const NAV_ITEMS = [
    { to: '/adoptions', icon: PawPrint, label: 'Descubrir' },
    { to: '/myadoptions', icon: Star, label: 'Favoritos' },
    { to: '/search', icon: Home, label: 'Inicio' },
    { to: '/users', icon: MessageCircle, label: 'Chats' },
]

function Dashboard () {
    return (
        <div className='dashbord bg-light'>
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
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