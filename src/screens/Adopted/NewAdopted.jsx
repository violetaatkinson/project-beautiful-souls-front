import { createAdopted  } from '../../services/AdoptedService'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import css from './NewAdopted.css'
import backArrow from "../../assets/go-back.png";

const Adopted = () => {
    
    const navigate = useNavigate();
    
    const [data, setAdopted] = useState({
		image: "",
        content: ""	
	});

    const handleOnChange = (event) => {
		const { value, name , type, files  } = event.target;
		if (type === 'file') {
            setAdopted({ ...data, [name]: files[0] })
		} else {
            setAdopted({ ...data, [name]: value }) // C://djakldjalksjd
		}

	};

    const onSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData()

		for (let value in data) {
			formData.append(value, data[value])
		  }


          createAdopted (formData).then((response) => {
				console.log(response);
				navigate("/adopted");
			});
		}

	return (
		<div>
        <Link className="link-unstyled" to={"/search"}>
			<img src={backArrow} alt="back" width={20} className="mt-4 search-arrow " />
		</Link>
        <div className='new-adopted'>
		 	<h1 className="text-center mt-3">Already Adopted</h1>
                <form onSubmit={onSubmit} className=" mt-3 ">
                    <div className=" input-group mb-3 mt-4">
                        <input
                            className="form-control"
                            placeholder="Add file"
                            type="file"
                            name="image"
                            id="file"
                            onChange={handleOnChange}  
                        />
                        <label className="input-group-text" htmlFor="image">Upload</label>
                    </div>
                    <div className="mt-3">
                        <label className="form-label" htmlFor="content">Tell Your Story</label>
                        <br></br>    
                            <textarea
                                className="form-control "
                                value={data.content}
                                onChange={handleOnChange}
                                name="content"
                                type="text"
                                id="content"
                                placeholder="content"
                            />
                    </div>
                    <div className="mt-4 mb-4">
                        <button type="submit" className="button form-control">Submit</button>
                    </div>
                </form>

        </div>
		</div>
	);
}

export default Adopted;

