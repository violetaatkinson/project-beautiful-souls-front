import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createMessage, getMessages } from "../../services/MessageService";
import { getPetDetail } from "../../services/PetService";
import { useSocket } from "../../contexts/SocketContext";

import { NavbarLayout } from "../../layout/NavbarLayout";
import "./Chat.css";

const TYPING_THROTTLE_MS = 2000;
const TYPING_HIDE_AFTER_MS = 2500;

const MessageCreated = () => {
	const { id, petId } = useParams();
	const socket = useSocket();
	const [messages, setMessages] = useState([]);
	const [pet, setPet] = useState();
	const [otherIsTyping, setOtherIsTyping] = useState(false);

	const [text, setText] = useState("");
	const lastTypingSentAt = useRef(0);
	const typingTimeout = useRef(null);

	// Carga inicial por REST (esto no cambia: sigue siendo la fuente de
	// verdad del historial). Los mensajes que lleguen DESPUÉS de esto ya
	// entran por el socket, no por polling.
	useEffect(() => {
		getMessages(id, petId).then((messages) => {
			setMessages(messages);
		});
		getPetDetail(petId).then(setPet);
	}, [id, petId]);

	useEffect(() => {
		if (!socket) return undefined;

		const onNewMessage = (message) => {
			const isThisConversation =
				String(message.pet?._id || message.pet) === String(petId) &&
				(String(message.sender?._id || message.sender) === String(id) ||
					String(message.receiver?._id || message.receiver) === String(id));

			if (!isThisConversation) return;

			setMessages((prev) =>
				prev.some((m) => m._id === message._id) ? prev : [...prev, message],
			);
			setOtherIsTyping(false);
		};

		const onTyping = ({ from, pet: typingPet }) => {
			if (String(from) !== String(id) || String(typingPet) !== String(petId)) {
				return;
			}
			setOtherIsTyping(true);
			clearTimeout(typingTimeout.current);
			typingTimeout.current = setTimeout(
				() => setOtherIsTyping(false),
				TYPING_HIDE_AFTER_MS,
			);
		};

		socket.on("message:new", onNewMessage);
		socket.on("typing", onTyping);

		return () => {
			socket.off("message:new", onNewMessage);
			socket.off("typing", onTyping);
			clearTimeout(typingTimeout.current);
		};
	}, [socket, id, petId]);

	const handleOnChange = (event) => {
		const { value } = event.target;
		setText(value);

		if (!socket) return;
		const now = Date.now();
		if (now - lastTypingSentAt.current > TYPING_THROTTLE_MS) {
			lastTypingSentAt.current = now;
			socket.emit("typing", { to: id, pet: petId });
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (!text.trim()) return;

		createMessage({ receiver: id, pet: petId, msg: text }).then((response) => {
			setMessages((prev) =>
				prev.some((m) => m._id === response._id) ? prev : [...prev, response],
			);
			setText("");
		});
	};

	return (
		<NavbarLayout>
			<div className="Chat">
				{pet && (
					<Link to={`/adoptions/${pet._id}`} className="link-unstyled chat-pet-header">
						<ArrowLeft size={20} />
						<img src={pet.image} alt={pet.name} className="chat-pet-avatar" />
						<div>
							<p className="chat-pet-label">Talking about</p>
							<h6 className="chat-pet-name text-capitalize">{pet.name}</h6>
						</div>
					</Link>
				)}

				<section>
					{messages.map((message) => {
						const userIsSender = message.sender.id !== id;
						return (
							<div
								className={`Chat-message ${userIsSender ? "own-sender" : ""}`}
								key={message._id}
							>
								<div className="Chat-message-avatar">
									<img
										src={message.sender.image}
										alt={message.sender.userName}
									/>
								</div>
								<div className="Chat-message-body">
									<h6>{userIsSender ? "Me" : message.sender.userName}</h6>
									<p>{message.msg}</p>
								</div>
							</div>
						);
					})}
					{otherIsTyping && (
						<p className="Chat-typing-indicator">Typing...</p>
					)}
				</section>
				<form onSubmit={onSubmit}>
					<div className="Chat-send-box">
						<input
							className="form-control mb-2 mt-1 chat-form"
							value={text}
							onChange={handleOnChange}
							name="msg"
							type="text"
							id="msg"
							placeholder="Your Message"
						/>
						<button type="submit" className="btn btn-primary mt-1 mb-2">
							Send
						</button>
					</div>
				</form>
			</div>
		</NavbarLayout>
	);
};

export default MessageCreated;
