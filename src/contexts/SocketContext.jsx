import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AuthContext from "./AuthContext";
import { getAccessToken } from "../token/AccessToken";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

// El back sirve los sockets sobre el mismo server http, no bajo /api
// (Socket.IO tiene su propio path interno, /socket.io). REACT_APP_API_URL
// apunta a ".../api", así que le sacamos ese sufijo para conectar al
// server correcto.
const SOCKET_URL = (
	process.env.REACT_APP_API_URL || "http://localhost:3001/api"
).replace(/\/api\/?$/, "");

export const SocketContextProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [socket, setSocket] = useState(null);
	const socketRef = useRef(null);

	useEffect(() => {
		if (!user) {
			socketRef.current?.disconnect();
			socketRef.current = null;
			setSocket(null);
			return;
		}

		const token = getAccessToken();
		if (!token) return undefined;

		const newSocket = io(SOCKET_URL, { auth: { token } });
		socketRef.current = newSocket;
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export default SocketContext;
