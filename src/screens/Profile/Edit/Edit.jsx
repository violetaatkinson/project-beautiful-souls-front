import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { updateUser, getCurrentUser } from "../../../services/UserService";
import backArrow from "../../../assets/go-back.png";
import { Link } from "react-router-dom";
import './Edit.css'

const Edit = ({ edit }) => {
	const { user, getUser } = useAuthContext();
	const navigate = useNavigate();

	const [userState, setUserState] = useState({
		userName: "",
		email: "",
		firstName: "",
		lastName: "",
		age: "",
		gender: "",
		phoneNumber: "",
		image: "",
	});

	useEffect(() => {
		if (edit) {
			getCurrentUser().then((userFetched) => {
				Object.keys(userFetched).forEach((key) => {
					if (userFetched[key] === null) {
						delete userFetched[key];
					}
				});
				setUserState((prevState) => ({ ...prevState, ...userFetched }));
			});
		}
	}, [edit]);

	const handleOnChange = (event) => {
		const { value, name, type, files } = event.target;
		if (type === "file") {
			setUserState({ ...userState, [name]: files[0] });
		} else {
			setUserState({ ...userState, [name]: value });
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();
		for (let value in userState) {
			formData.append(value, userState[value]);
		}

		if (edit) {
			updateUser(user.id, formData).then((edited) => {
				getUser();
				navigate("/profile");
			});
		}
	};

	return (
		<div>
			<Link className="link-unstyled" to={"/search"}>
				<img src={backArrow} alt="back" width={20} className="mt-5 search-arrow" />
			</Link>
			<h1 className="text-center mb-2 edit-tt">Edit Your Profile</h1>
			<div className="Create">
				<form onSubmit={onSubmit} className=" mt-3  g-3">
					<div className="row align-items-center">
						<div className="col-md-6">
							<label className="form-label" htmlFor="userName">
								User Name
							</label>
							<input
								className="form-control"
								value={userState.userName}
								onChange={handleOnChange}
								name="userName"
								type="text"
								id="userName"
								placeholder="user name"
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label" htmlFor="email">
								Email
							</label>
							<input
								className="form-control"
								value={userState.email}
								onChange={handleOnChange}
								name="email"
								type="text"
								id="email"
								placeholder="email"
							/>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col mt-3">
							<label className="form-label" htmlFor="firstname">
								First name
							</label>
							<input
								className="form-control"
								value={userState.firstName}
								onChange={handleOnChange}
								name="firstName"
								type="text"
								id="firstname"
								placeholder="first name"
							/>
						</div>
						<div className="col mt-3">
							<label className="form-label" htmlFor="lastname">
								Last Name
							</label>
							<input
								className="form-control"
								value={userState.lastName}
								onChange={handleOnChange}
								name="lastName"
								type="text"
								id="lastname"
								placeholder="last name"
							/>
						</div>
					</div>
					<div className="row d-flex justify-content-around  ">
						<div className="col-3 mt-2">
							<label className="form-label" htmlFor="gender">
								Gender
							</label>
							<input
								className="form-control"
								value={userState.gender}
								onChange={handleOnChange}
								name="gender"
								type="text"
								id="gender"
								placeholder="Gender"
							/>
						</div>
						<div className="col-3 mt-2 ">
							<label className="form-label" htmlFor="age">
								Age
							</label>
							<input
								className="form-control "
								value={userState.age}
								onChange={handleOnChange}
								name="age"
								type="number"
								id="age"
								placeholder="Age"
							/>
						</div>
						<div className="col-5 mt-2">
							<label className="form-label" htmlFor="phonenumber">
								Phone Number
							</label>
							<input
								className="form-control"
								value={userState.phoneNumber}
								onChange={handleOnChange}
								name="phoneNumber"
								type="text"
								id="phonenumber"
								placeholder="Phone number"
							/>
						</div>
					</div>
					<div className="input-group mb-3 mt-4">
						<input
							type="file"
							className="form-control"
							id="file"
							name="image"
							onChange={handleOnChange}
						/>
						<label className="input-group-text" htmlFor="image">
							Upload
						</label>
					</div>
					<div className="mt-4 mb-4">
						<button type="submit" className="button form-control">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Edit;
