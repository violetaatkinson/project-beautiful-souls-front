import { getNotifications } from "../../services/NotificationService";
import { useState, useEffect } from "react";
import { NavbarLayout } from "../../layout/NavbarLayout";
import message from '../../assets/mensaje.png'
import './Notifications.css'
const Notification = () => {
    
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
		getNotifications().then((notification) => {
			setNotifications(notification);
		});
	}, []);
    console.log(notifications)
    return (
        <NavbarLayout>
            <div>
                {notifications.map((notification) => {
                    return(
                        <div key={notification._id} className='notification mb-3 mt-2'>
                            <img src={notification.user.image} alt={notification.user.userName} className="notification-img"/>
                            <p className="mt-2">{notification.user.userName}</p>
                            <p className="text-secondary mt-2 ">{notification.title}</p>
                            
                            {notification.type === "Message" ? <img src={message} alt="message" width={22} height={22} className="mt-2"/>: null}
                        </div>
                )
                })}
            </div>
        </NavbarLayout>
            
        )
}

export default Notification
