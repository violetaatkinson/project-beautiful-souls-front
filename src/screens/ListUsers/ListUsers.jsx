import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarLayout } from "../../layout/NavbarLayout";
import { getUsers,  getLikes  } from "../../services/UserService";

import './ListUsers.css'
const ListUsers = () => {
    const [likes, setLikes] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
		getLikes()
      .then((dbLikes) =>
       setLikes(dbLikes.filter((like) => like))); // Te quita los nulls y los undefined
	}, []);


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
                <h4 className="mt-1">New Matches</h4>
                <div className="container">
                    <div className="row">
                        {likes.map((like) => {
                            return(
                                <div key={like._id} className="col-12 col-md-6 col-lg-4 like">
                                    <img src={like.image} alt={like.name} width={110} height={145} className="mt-3"/>
                                    <Link className="link-unstyled like-name" to={`/adoptions/${like._id}`}>
                                        <h5>{like.name}</h5>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section>
                <hr></hr>
                <h4 className="mt-1">Messages</h4>
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