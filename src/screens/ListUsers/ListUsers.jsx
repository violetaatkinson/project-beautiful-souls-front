import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarLayout } from "../../layout/NavbarLayout";
import { getUsers } from "../../services/UserService";

const ListUsers = () => {
   
    const [users, setUsers] = useState([]);

    useEffect(() => {
		getUsers().then((users) => {
			setUsers(users);
            console.log(users)
		});
	}, []);

    return (
        <NavbarLayout>
            {users.map((user) => {
                return (
                    <Link key={user.id} to={`/chat/${user.id}`}>
                        <div className="mt-3">
                            <p>{user.userName}</p>
                            <img src={user.image} alt={user.name} className="rounded-circle border mt-2 mb-3" width="70" height="70"/>
                            <hr></hr>
                        </div>
                    </Link>
                )
            })}
        </NavbarLayout>
    )
}

export default ListUsers