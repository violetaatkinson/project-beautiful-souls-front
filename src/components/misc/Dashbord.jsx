import look from '../../assets/look.png'
import logo from '../../assets/cat.png'
import star from '../../assets/star.png'
import chat from '../../assets/chat.png'
import { Link } from 'react-router-dom'
// eslint-disable-next-line 
import dash from './Dashbord.css'

function Dashboard () {
    return (
        <div className='dashbord'>
            <Link className="link-unstyled" to={"/adoptions"}>
                <img src={logo} alt="logo" width={65}/>
            </Link>
            <img src={star} alt="star" width={45}/>
            <Link className="link-unstyled" to={"/search"}>
                <img src={look} alt="look" width={45}/>
            </Link>

            <img src={chat} alt="chat" width={45}/>
        </div>
    )
}

export default Dashboard

