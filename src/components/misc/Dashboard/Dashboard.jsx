import { Home, PawPrint, Heart, MessageCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'

const NAV_ITEMS = [
    { to: '/search', icon: Home },
    { to: '/adoptions', icon: PawPrint },
    { to: '/likes', icon: Heart },
    { to: '/users', icon: MessageCircle },
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