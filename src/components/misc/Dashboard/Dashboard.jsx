import look from '../../../assets/look.png'
import logo from '../../../assets/cat.png'
import star from '../../../assets/star.png'
import chat from '../../../assets/chat.png'
import { Link } from 'react-router-dom'
// eslint-disable-next-line 
import dash from './Dashboard.css'

function Dashboard () {
    return (
        <div className='dashbord mt-4'>
            <Link className="link-unstyled" to={"/adoptions"}>
                <img src={logo} alt="logo" width={53}/>
            </Link>
            <Link className="link-unstyled" to={"/likedpets"}>
                <img src={star} alt="star" width={40}/>
            </Link>
            <Link className="link-unstyled" to={"/search"}>
                <img src={look} alt="look" width={40}/>
            </Link>
            <Link className="link-unstyled" to={"/chat"}>
                <img src={chat} alt="chat" width={40}/>
            </Link>
        </div>
    )
}

export default Dashboard

