import { useState, useEffect } from "react";
import { createAdoption } from "../../../services/AdoptionService";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import NewAdoption from "./NewAdoption.css";

// si edit es true, necesito un useEffect donde traerme el adoption actual, pera rellenar los campos

const DoAdoption = ({ edit }) => {
	const navigate = useNavigate();
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

	}, [])

	const handleOnChange = (event) => {
		const { value, name , type, files  } = event.target;
		if (type === 'file') {
		  setAdoptions({ ...data, [name]: files[0] })
		} else {
		  setAdoptions({ ...data, [name]: value }) // C://djakldjalksjd
		}

		

	};

	const onSubmit = (event, values) => {
		event.preventDefault();
		const formData = new FormData()

		for (let value in values) {
			formData.append(value, values[value])
		  }

		if (edit) {
			// llamare al servicio de editar
		} else {

			createAdoption(data, formData).then((response) => {
				console.log(response);
				navigate("/adoptions");
			});
		}

	};

	return (
		<div className="Create">
			<h1 className="text-center mt-3">Create adoption</h1>
			<form onSubmit={onSubmit} className=" mt-3">
				<div>
					<label className="form-label">Name</label>
					<br></br>
					<input
						className="form-control"
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
						<label className="form-label">Years</label>
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
						<label className="form-label">Sizes</label>
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
							<option selected>Select size</option>
							<option value="Small">Small</option>
							<option value="Medium">Medium</option>
							<option value="Large">Large</option>
						</select>
					</div>
					<div className="col mt-2">
						<label className="form-label">Gender</label>
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
							<option selected>Select gender</option>
							<option value="Female">Female</option>
							<option value="Male">Male</option>
						</select>
					</div>    
				</div>
                <div className="mt-2">
                    <label className="form-label">Specie</label>
					<br></br>
                    <select className="form-control" aria-label="Default select example" value={data.specie} onChange={handleOnChange} name="specie" id="specie">
                        <option selected>Select specie</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                    </select>
                </div>
                <div className="mt-3">
                    <label className="form-label">Image</label>
                    <input
					 	placeholder="Add file"
          				type="file"
          				name="image"
          				id="file"
         				onChange={handleOnChange}
          				/>
				</div>		
         


                <div className="mt-3">
                    <label className="form-label">About my pet</label>
                    <br></br>
					<textarea
						className="form-control "
						value={data.description}
						onChange={handleOnChange}
						name="description"
						type="text"
						id="description"
						placeholder="description"
					/>
                </div>
                    
                <div className="mt-4 mb-4">
                    <button type="submit" className="btn form-control">Submit</button>
                </div>
			
			</form>
		</div>
	);
};

export default DoAdoption;
