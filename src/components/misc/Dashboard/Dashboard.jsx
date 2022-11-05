import look from '../../../assets/look.png'
import lookGold from '../../../assets/look-gold.png'
import logo from '../../../assets/cat.png'
import star from '../../../assets/star.png'
import starGold from '../../../assets/star-gold.png'
import chat from '../../../assets/chat.png'
import chatGold from '../../../assets/chat-gold.png'

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
                            <img src={isActive ? starGold : star} alt="star" width={45}/>
                    )
                }
            </NavLink>
            <NavLink className="link-unstyled" to={"/search"}>
                {
                    ({ isActive }) => (
                        <img src={isActive ? lookGold : look} alt="look" width={45}/>
                    )
                }
            </NavLink>
            <NavLink className="link-unstyled" to={"/users"}>
                {
                    ({ isActive }) => (
                        <img src={isActive ? chatGold : chat} alt="chat" width={45}/>
                    )
                }
            </NavLink>
        </div>
    )
}

export default Dashboard


