import { useState, useEffect } from "react";
import {createAdoption, updateAdoption, getAdoptionsDetail, } from "../../../services/AdoptionService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import backArrow from "../../../assets/go-back.png";

// eslint-disable-next-line
import NewAdoption from "./NewAdoption.css";

// si edit es true, necesito un useEffect donde traerme el adoption actual, pera rellenar los campos

const DoAdoption = ({ edit }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [data, setAdoptions] = useState({
		name: "",
		years: "",
		specie: "",
		description: "",
		gender: "",
		image: "",
		size: "",
	});

	useEffect(() => {
		if (edit) {
			getAdoptionsDetail(id).then((edited) => setAdoptions(edited));
		}
	}, [id, edit]);

	const handleOnChange = (event) => {
		const { value, name, type, files } = event.target;
		if (type === "file") {
			setAdoptions({ ...data, [name]: files[0] });
		} else {
			setAdoptions({ ...data, [name]: value }); // C://djakldjalksjd
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();

		for (let value in data) {
			formData.append(value, data[value]);
		}

		if (edit) {
			updateAdoption(id, formData).then((edited) => console.log(edited));
		} else {
			createAdoption(formData).then((response) => {
				console.log(response);
				navigate("/adoptions");
			});
		}
	};

	return (
		<div>
			<Link className="link-unstyled" to={"/search"}>
				<img
					src={backArrow}
					alt="back"
					width={20}
					className="mt-5 search-arrow"
				/>
			</Link>
			<h1 className="text-center mb-4 create-tt">Create adoption</h1>
			<div className="Create">
				<form onSubmit={onSubmit} className=" mt-3">
					<div>
						<label className="form-label" htmlFor="name">
							Name
						</label>
						<br></br>
						<input
							className="form-control "
							value={data.name}
							onChange={handleOnChange}
							name="name"
							type="text"
							id="name"
							placeholder="Pet name"
						/>
					</div>
					<div className="row align-items-center">
						<div className="col mt-2">
							<label className="form-label" htmlFor="years">
								Years
							</label>
							<input
								className="form-control"
								value={data.years}
								onChange={handleOnChange}
								name="years"
								type="number"
								id="years"
								placeholder="years"
							/>
						</div>
						<div className="col mt-2">
							<label className="form-label" htmlFor="sizes">
								Sizes
							</label>
							<br></br>
							<select
								className="form-select"
								size="2"
								aria-label="size 3 select example"
								value={data.size}
								onChange={handleOnChange}
								name="size"
								id="size"
							>
								<option value>Select size</option>
								<option value="Small">Small</option>
								<option value="Medium">Medium</option>
								<option value="Large">Large</option>
							</select>
						</div>
						<div className="col mt-2">
							<label className="form-label" htmlFor="gender">
								Gender
							</label>
							<br></br>
							<select
								className="form-select"
								size="2"
								aria-label="efault select example"
								value={data.gender}
								onChange={handleOnChange}
								name="gender"
								id="gender"
							>
								<option value>Select gender</option>
								<option value="Female">Female</option>
								<option value="Male">Male</option>
							</select>
						</div>
					</div>
					<div className="mt-2">
						<label className="form-label" htmlFor="specie">
							Specie
						</label>
						<br></br>
						<select
							className="form-control"
							aria-label="Default select example"
							value={data.specie}
							onChange={handleOnChange}
							name="specie"
							id="specie"
						>
							<option value>Select specie</option>
							<option value="Dog">Dog</option>
							<option value="Cat">Cat</option>
							<option value="Bird">Bird</option>
							<option value="Reptile">Reptile</option>
						</select>
					</div>

					<div className="mt-3">
						<label className="form-label" htmlFor="description">
							About my pet
						</label>
						<br></br>
						<input
							className="form-control "
							value={data.description}
							onChange={handleOnChange}
							name="description"
							type="text"
							id="description"
							placeholder="description"
						/>
					</div>
					<div className=" input-group mb-3 mt-4">
						<input
							placeholder="Add file"
							type="file"
							name="image"
							id="file"
							className="form-control"
							onChange={handleOnChange}
						/>
						<label
							class="input-group-text"
							for="inputGroupFile02"
							htmlFor="image"
						>
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

export default DoAdoption;
