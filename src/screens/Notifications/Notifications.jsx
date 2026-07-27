import { useState, useEffect } from "react";
import { Bell, Heart, MessageCircle, PawPrint } from "lucide-react";
import { getNotifications, clearNotifications } from "../../services/NotificationService";
import { NavbarLayout } from "../../layout/NavbarLayout";
import "./Notifications.css";

const ICONS = {
	Like: { icon: Heart, className: "notif-icon-like" },
	Message: { icon: MessageCircle, className: "notif-icon-message" },
	Post: { icon: PawPrint, className: "notif-icon-post" },
};

const getText = (notification) => {
	const name = notification.user?.userName || "Someone";
	if (notification.type === "Like") return `${name} liked one of your pets`;
	if (notification.type === "Message") return `${name} sent you a message`;
	if (notification.type === "Post") return notification.description || "Your pet is live";
	return notification.title;
};

const timeAgo = (date) => {
	const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
	if (minutes < 1) return "now";
	if (minutes < 60) return `${minutes}m`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h`;
	return `${Math.floor(hours / 24)}d`;
};

const Notifications = () => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getNotifications()
			.then((notifications) => setNotifications(notifications))
			.finally(() => setLoading(false));
	}, []);

	const handleClearAll = () => {
		if (!window.confirm("Clear all notifications?")) return;
		clearNotifications().then(() => setNotifications([]));
	};

	return (
		<NavbarLayout align="top">
			<div className="notifs-screen">
				<div className="notifs-header">
					<h1 className="notifs-title">Notifications</h1>
					{notifications.length > 0 && (
						<button type="button" className="notifs-clear-btn" onClick={handleClearAll}>
							Clear all
						</button>
					)}
				</div>

				{loading ? null : notifications.length > 0 ? (
					<div className="notifs-list">
						{notifications.map((notification) => {
							const { icon: Icon, className } =
								ICONS[notification.type] || ICONS.Post;
							return (
								<div key={notification._id} className="notif-row">
									<span className={`notif-icon ${className}`}>
										<Icon size={18} strokeWidth={2} fill={notification.type === "Like" ? "currentColor" : "none"} />
									</span>
									<div className="notif-body">
										<p className="notif-text">{getText(notification)}</p>
										<p className="notif-time">{timeAgo(notification.createdAt)}</p>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="notifs-empty">
						<span className="empty-logo">
							<Bell size={26} strokeWidth={2.2} />
						</span>
						<h5>No notifications yet</h5>
						<p>Likes, messages and updates will show up here.</p>
					</div>
				)}
			</div>
		</NavbarLayout>
	);
};

export default Notifications;
