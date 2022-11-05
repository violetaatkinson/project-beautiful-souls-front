import look from '../../../assets/look.png'
import logo from '../../../assets/cat.png'
import star from '../../../assets/star.png'
import chat from '../../../assets/chat.png'
import { Link } from 'react-router-dom'
// eslint-disable-next-line 
import dash from './Dashboard.css'

function Dashboard () {
    return (
        <div className='dashbord mt-5 '>
            <Link className="link-unstyled" to={"/adoptions"}>
                <img src={logo} alt="logo" width={53} height={53} />
            </Link>
            <Link className="link-unstyled" to={"/likedpets"}>
                <img src={star} alt="star" width={45}/>
            </Link>
            <Link className="link-unstyled" to={"/search"}>
                <img src={look} alt="look" width={45}/>
            </Link>
            <Link className="link-unstyled" to={"/chat"}>
                <img src={chat} alt="chat" width={45}/>
            </Link>
        </div>
    )
}

export default Dashboard

