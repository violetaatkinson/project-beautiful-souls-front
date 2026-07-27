import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarLayout } from "../../layout/NavbarLayout";
import { getLikes, getUsersLiked } from "../../services/UserService";
import { likeAdoptions } from "../../services/AdoptionService";
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
		getLikes()
            .then((dbLikes) =>
            setLikes(dbLikes.filter((like) => like))); // Te quita los nulls y los undefined
	}, []);

    // eslint-disable-next-line no-unused-vars
    const handleLike = (id) => {
		likeAdoptions(id).then((res) => {
			const likedPet = likes.filter((pet) => pet._id !== id);
			setLikes(likedPet);
            // hacer un setPets, pero quitandome la pet que tiene este id
		});
	};

    useEffect(() => {
        // Cada fila es un par (usuario, mascota): alguien que likeó una de
        // mis mascotas puntuales, no solo "un usuario" suelto. Así se sabe
        // de entrada por cuál mascota se interesó, antes incluso de
        // empezar a chatear.
		getUsersLiked().then((rows) => {
			setInterestedUsers(rows);
		});
	}, []);

    return (
        <NavbarLayout>

            <section>

                <form className="d-flex list-user mt-2">
                    <input className="form-control me-2 bg-light" type="search" placeholder="Search" aria-label="Search"/>
                </form>
            </section>

            <section>
                <hr></hr>
                <h4 className="mt-1  new-matches">New matches</h4>
                    { likes.length > 0  ?

                    <div className="container-likes">

                            {likes.map((like) => {
                                return(
                                    <div key={like._id} className="container-card ">
                                        <img src={like.image} alt={like.name} width={110} height={145} className="mt-3 matches-img"/>
                                        <Link className="link-unstyled like-name" to={`/adoptions/${like._id}`}>
                                            <h5 className="text-capitalize">{like.name}</h5>

                                        </Link>
                                    </div>
                                )
                            })}

                    </div>

                    : <div>
                        <p className="text-secondary no-matches mt-4 ">No matches yet ....</p>
                      </div>
                    }
            </section>


            <section>
                <hr></hr>
                <h4 className="new-matches">Interested in your pets</h4>
                {interestedUsers.length > 0  ?
                    <div className="container-user-matches">
                        {interestedUsers.map(({ user, pet }) => (
                            <Link
                                key={`${user.id}_${pet.id}`}
                                to={`/users/chat/${user.id}/${pet.id}`}
                                className="link-unstyled"
                            >
                                <div className="mt-3 container-card-matches ">
                                    <span className="container-match">
                                        <img src={user.image} alt={user.userName} className="rounded-circle border mt-2 mb-3" width="70" height="70"/>
                                        <p className="text-secondary better text-capitalize interested-user-name">{user.userName}</p>
                                        <p className="text-secondary interested-in-pet text-capitalize">likes {pet.name}</p>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                :   <div className="text-secondary mt-2">
                        <p className="new-matches">First create an adoption ...</p>
                    </div>
                }
            </section>

            <section>

                    <hr></hr>
                    <h4 className="mt-1 new-matches">Messages</h4>

                    {chats.map((chat) => (
                        <Link
                            key={`${chat.user.id}_${chat.pet.id}`}
                            to={`/users/chat/${chat.user.id}/${chat.pet.id}`}
                            className="link-unstyled"
                        >
                            <div className="mt-3 chat-user">
                                <div className="chat-user-row">
                                    <img src={chat.user.image} alt={chat.user.userName} className="chat-user-avatar" />
                                    <div className="chat-user-info">
                                        <h6 className="text-capitalize">{chat.user.userName}</h6>
                                        <p className="chat-pet-ref text-capitalize">
                                            <img src={chat.pet.image} alt={chat.pet.name} className="chat-pet-thumb" />
                                            {chat.pet.name}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-secondary chat-last-message">{chat.lastMessage}</p>
                                <hr></hr>
                            </div>
                        </Link>
                    ))}

            </section>
        </NavbarLayout>
    )
}

export default ListUsers
