import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarLayout } from "../../layout/NavbarLayout";
import {  getLikes, getUsersLiked  } from "../../services/UserService";
import { likeAdoptions } from "../../services/AdoptionService";
import superlike from '../../assets/extralike.png'

import './ListUsers.css'
import { listMessages } from "../../services/MessageService";
const ListUsers = () => {
    const [likes, setLikes] = useState([]);
    const [users, setUsers] = useState([]);
    // const [searchField, setSearchField] = useState("");
    // const [likesFiltered, setLikesFiltered] = useState("");
    const [chats, setChats] = useState([])

    useEffect(() => {
        listMessages()
            .then(chats => {
                console.log(chats);
                setChats(chats)
            })
    })
  
    useEffect(() => {
		getLikes()
            .then((dbLikes) =>
            setLikes(dbLikes.filter((like) => like))); // Te quita los nulls y los undefined
	}, []);

    const handleLike = (id) => {
		likeAdoptions(id).then((res) => {
			const likedPet = likes.filter((pet) => pet._id !== id);
			setLikes(likedPet);
            // hacer un setPets, pero quitandome la pet que tiene este id
		});
	};

    // filtrar solo los usuarios con los que haya hecho match de su pet

    // search del pet.name y que tambien me devuelva el owner de ese pet
    // const search = () => {
    //     const likesFiltered = likes.filter((like) => like.name.toLowerCase().startsWith(searchField.toLowerCase()))
    //     setLikesFiltered(likesFiltered)
    // }

 
    useEffect(() => {
		getUsersLiked().then((users) => {
			setUsers(users);
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
                                    <div key={like._id} className="container-card">
                                        <img src={like.image} alt={like.name} width={110} height={145} className="mt-3 matches-img"/>
                                        <Link className="link-unstyled like-name" to={`/adoptions/${like._id}`}>
                                            <h5>{like.name}</h5>
                                            <img src={superlike} alt="like" className="dislke-pet" width={30} onClick={() => handleLike(like._id)}/>
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
                <h4 className="new-matches">Start a conversation</h4>
                {users.length > 0  ?
                    <div className="container-user-matches">  
                        {users.map((user) => {
                            return (
                                <Link key={user.id} to={`/users/chat/${user.id}`} className="link-unstyled">
                                    <div className="mt-3 container-card-matches ">
                                        <span className="container-match">
                                            <img src={user.image} alt={user.name} className="rounded-circle border mt-2 mb-3" width="70" height="70"/>
                                            <p className="text-secondary">{user.userName}</p>
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                :   <div className="text-secondary mt-2">
                        <p>First create an adoption ...</p>
                    </div>
                }
            </section>
            
            <section>
            
                    <hr></hr>    
                    <h4 className="mt-1 new-matches">Messages</h4>

                    {chats.map((user) => {
                        return (
                            <Link key={user.id} to={`/users/chat/${user.id}`} className="link-unstyled">
                                <div className="mt-3 chat-user">
                                    <span className="users-list">
                                        <img src={user.image} alt={user.name} className="rounded-circle border mt-2 mb-3" width="70" height="70"/>
                                        <h6>{user.userName}</h6>
                                    </span>
                                        <p className="text-secondary chat-w">Chat with me ...</p>
                                    <hr></hr>
                                </div>
                            </Link>
                        )
                    })}

            </section>
        </NavbarLayout>
    )
}

export default ListUsers



