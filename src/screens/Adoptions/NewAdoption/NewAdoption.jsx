// import { useState, useEffect } from 'react';
// import { createAdoption } from '../../../services/AdoptionService';
// import { useAuthContext } from '../../../contexts/AuthContext';

// const DoAdoption = () => {
//   const { user, getUser } = useAuthContext();
//     const [data, setAdoptions] = useState({
//         name:"",
//         years :"",
//         specie:"",
//         description:"",
//         gender:"",
//         image:"",
//         size:"",
//         owner:""
        
//     });
    
//     useEffect((getUser) => {
//         createAdoption()
//         .then((adoptionCreated) => {
//             setAdoptions(adoptionCreated.data)
//         })
//     }, [user]);
    
//     const handleOnChange = (event) => {
//         const { value, name} = event.target
//             setAdoptions({...data, [name]: value})
//     };
    
//    const onSubmit = (event) => {
//     event.preventDefault()
        
//    }


//     return (
//         <div className='Create'>
//             <h1 className='text-center'>Create adoption</h1>
           
                
               
            
//         </div>
//     )
    
// }

// export default DoAdoption