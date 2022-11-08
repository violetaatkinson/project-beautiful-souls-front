import { getNotifications } from "../../services/NotificationService";
import { useState, useEffect } from "react";
import { NavbarLayout } from "../../layout/NavbarLayout";

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
                            <div>
                                <p>{notification.title} from {notification.user.userName}</p>
                            </div>

                    )
                    })}
            </div>
        </NavbarLayout>
            
        )
}

export default Notification

