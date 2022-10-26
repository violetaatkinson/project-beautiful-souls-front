import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import logo from '../../../assets/cat.png'
import bell from '../../../assets/bell.png'

function Navbar () {
    const { user } = useContext(AuthContext);

    return (
        <div className='dashbord'>
           <img src={user.image} alt="user" width={40}/>
           <img src={logo} alt="logo" width={40}/>
           <img src={bell} alt ="bell" width={40}/>
        </div>
    )
}

export default Navbar