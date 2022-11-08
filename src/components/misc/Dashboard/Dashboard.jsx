import menu from '../../../assets/menu-gray.png'
import menuC from '../../../assets/menu.png'
import logo from '../../../assets/cat.png'
import star from '../../../assets/star-gray.png'
import starC from '../../../assets/star.png'
import chat from '../../../assets/chat-gray.png'
import chatC from '../../../assets/chat.png'

import { NavLink } from 'react-router-dom'
// eslint-disable-next-line 
import dash from './Dashboard.css'



function Dashboard () {
    return (
        <div className='dashbord mt-auto '>
            <NavLink className="link-unstyled" to={"/adoptions"}>
                <img src={logo} alt="logo" width={53} height={53} />
            </NavLink>
            <NavLink className="link-unstyled" to={"/likedpets"}>
                {
                    ({ isActive }) => (
                            <img src={isActive ? starC : star} alt="star" width={45}/>
                    )
                }
            </NavLink>
            <NavLink className="link-unstyled" to={"/search"}>
                {
                    ({ isActive }) => (
                        <img src={isActive ? menuC : menu} alt="menu" width={45}/>
                    )
                }
            </NavLink>
            <NavLink className="link-unstyled" to={"/users"}>
                {
                    ({ isActive }) => (
                        <img src={isActive ? chatC : chat} alt="chat" width={45}/>
                    )
                }
            </NavLink>
        </div>
    )
}

export default Dashboard


