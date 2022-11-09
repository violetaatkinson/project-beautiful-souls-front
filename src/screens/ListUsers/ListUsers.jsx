import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarLayout } from "../../layout/NavbarLayout";
import { getUsers,  getLikes  } from "../../services/UserService";
import { likeAdoptions } from "../../services/AdoptionService";
import superlike from '../../assets/extralike.png'

import './ListUsers.css'
const ListUsers = () => {
    const [likes, setLikes] = useState([]);
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
		getUsers().then((users) => {
			setUsers(users);
            console.log(users)
		});
	}, []);

    return (
        <NavbarLayout>

            <section>
                <hr></hr>
                <form className="d-flex list-user">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-dark" type="submit">Search</button>
                </form>
            </section>

            <section>
                <hr></hr>
                <h4 className="mt-1 new-matches">New Matches</h4>
                <div className="container">
                    <div className="row">
                        {likes.map((like) => {
                            return(
                                <div key={like._id} className="col-4 like">
                                    <img src={like.image} alt={like.name} width={110} height={145} className="mt-3 matches-img"/>
                                    <Link className="link-unstyled like-name" to={`/adoptions/${like._id}`}>
                                        <h5>{like.name}</h5>
                                        <img src={superlike} alt="like" className="dislke-pet" width={30} onClick={() => handleLike(like._id)}/>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section>
                <hr></hr>
                <h4 className="mt-1 new-matches">Messages</h4>
                    {users.map((user) => {
                        return (
                            <Link key={user.id} to={`/chat/${user.id}`} className="link-unstyled">
                                <div className="mt-3 chat-user">
                                    <img src={user.image} alt={user.name} className="rounded-circle border mt-2 mb-3" width="70" height="70"/>
                                    <h6>{user.userName}</h6>
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