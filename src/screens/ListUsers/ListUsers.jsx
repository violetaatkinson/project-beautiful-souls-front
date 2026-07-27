import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, PawPrint } from "lucide-react";
import { NavbarLayout } from "../../layout/NavbarLayout";
import { getLikes, getUsersLiked } from "../../services/UserService";
import { listMessages } from "../../services/MessageService";
import { useSocket } from "../../contexts/SocketContext";

import './ListUsers.css'

const ListUsers = () => {
    const socket = useSocket();
    const [likes, setLikes] = useState([]);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [chats, setChats] = useState([]);

    const loadChats = () => {
        listMessages().then((chats) => setChats(chats));
    };

    useEffect(() => {
        loadChats();
    }, []);

    // Cuando llega un mensaje nuevo por socket (venga de esta pantalla o de
    // otra), refrescamos la lista de conversaciones para que la vista previa
    // y el orden queden al día sin tener que recargar la pantalla.
    useEffect(() => {
        if (!socket) return undefined;

        socket.on("message:new", loadChats);
        return () => socket.off("message:new", loadChats);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    useEffect(() => {
        getLikes().then((dbLikes) => setLikes(dbLikes.filter((like) => like)));
    }, []);

    useEffect(() => {
        // Cada fila es un par (usuario, mascota): alguien que likeó una de
        // mis mascotas puntuales, no solo "un usuario" suelto. Así se sabe
        // de entrada por cuál mascota se interesó, antes incluso de
        // empezar a chatear.
        getUsersLiked().then((rows) => setInterestedUsers(rows));
    }, []);

    return (
        <NavbarLayout align="top">
            <div className="matches-screen">
                <div className="matches-search">
                    <Search size={17} strokeWidth={2} />
                    <input type="search" placeholder="Search" aria-label="Search" />
                </div>

                <section className="matches-section">
                    <h4 className="matches-heading">New matches</h4>
                    {likes.length > 0 ? (
                        <div className="avatar-row">
                            {likes.map((like) => (
                                <Link
                                    key={like._id}
                                    className="link-unstyled avatar-row-item"
                                    to={`/adoptions/${like._id}`}
                                >
                                    <div className="avatar-circle">
                                        {like.image ? (
                                            <img src={like.image} alt={like.name} />
                                        ) : (
                                            <PawPrint size={22} strokeWidth={1.8} />
                                        )}
                                    </div>
                                    <p className="avatar-row-label text-capitalize">{like.name}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <EmptyRow
                            icon={<Heart size={22} strokeWidth={2} />}
                            title="No matches yet"
                            text="Pets you like will show up here."
                        />
                    )}
                </section>

                <section className="matches-section">
                    <h4 className="matches-heading">Interested in your pets</h4>
                    {interestedUsers.length > 0 ? (
                        <div className="avatar-row">
                            {interestedUsers.map(({ user, pet }) => (
                                <Link
                                    key={`${user.id}_${pet.id}`}
                                    className="link-unstyled avatar-row-item"
                                    to={`/users/chat/${user.id}/${pet.id}`}
                                >
                                    <div className="avatar-circle">
                                        {user.image && <img src={user.image} alt={user.userName} />}
                                    </div>
                                    <p className="avatar-row-label text-capitalize">{user.userName}</p>
                                    <p className="avatar-row-sublabel text-capitalize">
                                        likes {pet.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <EmptyRow
                            icon={<PawPrint size={22} strokeWidth={2} />}
                            title="No interest yet"
                            text="People who like your pets will show up here."
                        />
                    )}
                </section>

                <section className="matches-section">
                    <h4 className="matches-heading">Messages</h4>
                    {chats.length > 0 ? (
                        <div className="chat-list">
                            {chats.map((chat) => (
                                <Link
                                    key={`${chat.user.id}_${chat.pet.id}`}
                                    to={`/users/chat/${chat.user.id}/${chat.pet.id}`}
                                    className="link-unstyled chat-row"
                                >
                                    <div className="avatar-circle chat-row-avatar">
                                        {chat.user.image && (
                                            <img src={chat.user.image} alt={chat.user.userName} />
                                        )}
                                    </div>
                                    <div className="chat-row-body">
                                        <div className="chat-row-top">
                                            <h6 className="text-capitalize">{chat.user.userName}</h6>
                                            <span className="chat-row-pet">
                                                <img
                                                    src={chat.pet.image}
                                                    alt={chat.pet.name}
                                                    className="chat-pet-thumb"
                                                />
                                                <span className="text-capitalize">{chat.pet.name}</span>
                                            </span>
                                        </div>
                                        <p className="chat-row-preview">{chat.lastMessage}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <EmptyRow
                            icon={<PawPrint size={22} strokeWidth={2} />}
                            title="No messages yet"
                            text="Start a conversation from a pet's profile."
                        />
                    )}
                </section>
            </div>
        </NavbarLayout>
    )
}

const EmptyRow = ({ icon, title, text }) => (
    <div className="matches-empty">
        <span className="matches-empty-icon">{icon}</span>
        <div>
            <p className="matches-empty-title">{title}</p>
            <p className="matches-empty-text">{text}</p>
        </div>
    </div>
);

export default ListUsers
