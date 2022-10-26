import {  useState , useEffect } from "react";
import { useParams,  useNavigate } from 'react-router-dom';
import { updateUser } from '../../../services/UserService'

const Edit = ({edit}) => {
    const { id } = useParams()
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
		userName: "",
		email: "",
        firstName:"",
		lastName: "",
		age: "",
		gender: "",
		phoneNumber: "",
		image: "",
	});

    useEffect(() => {
        if (edit) {
            updateUser(id)
            .then(user => setUser(user))
        }
      }, [id, edit])

      console.log( updateUser(id));

    const handleOnChange = (event) => {
		const { value, name , type, files  } = event.target;
		if (type === 'file') {
            setUser({ ...user, [name]: files[0] })
		} else {
            setUser({ ...user, [name]: value }) 
		}

	};

    const onSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData()

		for (let value in user) {
			formData.append(value, user[value])
		  }
          
        if (edit) {
			updateUser(id,formData)
            .then((edited) => {
				console.log(edited);
				navigate("/edit/profile");
			});
			
		} 
		
	};

	return (
		<div className="Create">
			<h1 className="text-center mt-3">Edit Your Profile</h1>
            <form onSubmit={onSubmit} className=" mt-3  g-3">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="username">User Name</label>
                        <input
							className="form-control"
							value={user.userName}
							onChange={handleOnChange}
							name="username"
							type="text"
							id="username"
							placeholder="user name"
						/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
							className="form-control"
							value={user.email}
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
                        <label className="form-label" htmlFor="firstname">First name</label>
                        <input
							className="form-control"
							value={user.firstName}
							onChange={handleOnChange}
							name="firstname"
							type="text"
							id="firstname"
							placeholder="first name"
						/>
                    </div>
                    <div className="col mt-3">
                        <label className="form-label" htmlFor="lastname">Last Name</label>
                        <input
							className="form-control"
							value={user.lastName}
							onChange={handleOnChange}
							name="lastname"
							type="text"
							id="lastname"
							placeholder="last name"
						/>
                    </div>
                </div>
                <div className="row d-flex justify-content-around  ">
                    <div className="col-md-5 mt-2">
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <input
							className="form-control"
							value={user.gender}
							onChange={handleOnChange}
							name="gender"
							type="text"
							id="gender"
							placeholder="Gender"
						/>
                    </div>
                    <div className="col-md-2 mt-2 ">
                        <label className="form-label" htmlFor="age">Age</label>
                        <input
							className="form-control "
							value={user.age}
							onChange={handleOnChange}
							name="age"
							type="number"
							id="age"
							placeholder="Age"
						/>
                    </div>
                    <div className="col-md-5 mt-2">
                        <label className="form-label" htmlFor="age">Phone Number</label>
                        <input
							className="form-control"
							value={user.phoneNumber}
							onChange={handleOnChange}
							name="phonenumber"
							type="text"
							id="phonenumber"
							placeholder="Phone number"
						/>
                    </div>
                </div>
                <div className="input-group mb-3 mt-4">
                    <input type="file" className="form-control" id="inputGroupFile02" name="image" onChange={handleOnChange}/>
                    <label className="input-group-text" for="inputGroupFile02" htmlFor="image">Upload</label>
                </div>
                <div className="mt-4 mb-4">
                    <button type="submit" className="button form-control">Submit</button>
                </div>	
            </form>
		</div>
	);
};

export default Edit;

