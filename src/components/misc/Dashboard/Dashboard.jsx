import { Home, Compass, Heart, MessageCircle, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'

const NAV_ITEMS = [
    { to: '/search', icon: Home, label: 'Home' },
    { to: '/adoptions', icon: Compass, label: 'Explore' },
    { to: '/likes', icon: Heart, label: 'Likes' },
    { to: '/users', icon: MessageCircle, label: 'Chats' },
    { to: '/profile', icon: User, label: 'Profile' },
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