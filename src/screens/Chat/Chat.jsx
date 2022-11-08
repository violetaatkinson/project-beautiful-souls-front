import { useState, useEffect } from "react";
import useInterval from "use-interval";
import { useParams } from "react-router-dom";
import { createMessage, getMessages } from "../../services/MessageService";
import { Link } from "react-router-dom";

import { NavbarLayout } from "../../layout/NavbarLayout";
import "./Chat.css";

const MessageCreated = () => {
	const { id } = useParams();
	const [messages, setMessages] = useState([]);

	const [text, setText] = useState("");

	useEffect(() => {
		getMessages(id).then((messages) => {
			setMessages(messages);
		});
	}, [id]);

	useInterval(() => {
		getMessages(id).then((messages) => {
			setMessages(messages);
		});
	}, 3000);

	const handleOnChange = (event) => {
		const { value } = event.target;
		setText(value);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		createMessage({ receiver: id, msg: text }).then((response) => {
			setMessages([...messages, response]);
			setText("");
		});
	};

	return (
		<NavbarLayout>
			<div className="Chat">
				<section>
					{messages.map((message) => {
						const userIsSender = message.sender.id !== id;
						return (
							<div
								className={`Chat-message ${userIsSender ? "own-sender" : ""}`}
								key={message.id}
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
				</section>
				<form onSubmit={onSubmit}>
					<div className="Chat-send-box">
						<input
							className="form-control"
							value={text}
							onChange={handleOnChange}
							name="msg"
							type="text"
							id="msg"
							placeholder="Your Message"
						/>
						<button type="submit" className="btn btn-dark">
							Send
						</button>
					</div>
				</form>
			</div>
		</NavbarLayout>
	);
};

export default MessageCreated;
