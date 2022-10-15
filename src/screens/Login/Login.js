import React from "react";
import Login from "./Login.css";
import Angel from "../../assets/angel.png";

export default function login() {
	return (
		<div className="Login">
			<img src={Angel} alt="logo" height={200} />
			<h1>Beautiful Souls</h1>
			<p>Don't have an account yet ?</p>
			<p>Do you have an account ?</p>
		</div>
	);
}
