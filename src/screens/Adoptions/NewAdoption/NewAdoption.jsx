import { useState } from 'react';
import { createAdoption } from '../../../services/AdoptionService';


const DoAdoption = () => {
 
    const [data, setAdoptions] = useState({
        name:"",
        years :"",
        specie:"",
        description:"",
        gender:"",
        image:"",
        size:"",
    });
    
    const handleOnChange = (event) => {
        const { value, name} = event.target
            setAdoptions({...data, [name]: value})
    };
    
   const onSubmit = (event) => {
        event.preventDefault()
        createAdoption(data)
        .then((response) => {
            console.log(response)
            // redijo
    })
   }


    return (
        <div className='Create'>
            <h1 className='text-center'>Create adoption</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <input 
                            value={data.name}
                            onChange={handleOnChange} 
                            name="name" 
                            type="text"  
                            id="name" 
                            placeholder="name" />
                    </div>
                    <div>
                        <input 
                            value={data.years}
                            onChange={handleOnChange} 
                            name="years" 
                            type="text"  
                            id="years" 
                            placeholder="years" />
                    </div>
                    <div>
                        <input 
                            value={data.description}
                            onChange={handleOnChange} 
                            name="description" 
                            type="text"  
                            id="description" 
                            placeholder="description" />
                    </div>
                    <div>
                       <select value={data.specie} onChange={handleOnChange} name="specie" id="specie">
                            <option value="" disabled={true}>Select specie</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Reptile">Reptile</option>
                       </select>
                    </div>
                    <div>
                       <select value={data.gender} onChange={handleOnChange} name="gender" id="gender">
                            <option value="" disabled={true}>Select gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                       </select>
                            
                    </div>
                    <div>
                        <input 
                            value={data.image}
                            onChange={handleOnChange} 
                            name="image" 
                            type="file"  
                            id="image" 
                            placeholder="image" />
                    </div>
                    <div>
                        <select value={data.size} onChange={handleOnChange} name="size" id="size" >
                            <option value="" disabled={true}>Select size</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Medium</option>
                        </select> 
                    </div>
                    <button type="submit" className="btn mt-4" >Submit</button>
                </form> 
        </div>
    )
    
}

export default DoAdoption
