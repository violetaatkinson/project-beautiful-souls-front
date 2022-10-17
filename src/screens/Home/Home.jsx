import React from "react";
// eslint-disable-next-line 
import home from "./Home.css";
import Cat from "../../assets/cat.png";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="home">
			<img src={Cat} alt="logo" height={190} />
			<h1>Beautiful Souls</h1>
			<p className="home-p">Don't have an account yet ?</p>
			<Link className="link" to="/register">Register</Link>
			<p>Do you have an account ?</p>
			<Link className="link-1" to="/login">Login</Link>
		</div>
	);
}
