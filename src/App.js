import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UnprotectedRoute from './components/misc/UnprotectedRoute';
import Profile from './screens/Profile/Profile'
import LikedPets from './screens/Adoptions/LikedPets/LikedPets';
import Dashboard from "./components/misc/Dashboard/Dashboard";
import NewAdoption from './screens/Adoptions/NewAdoption/NewAdoption'
import AdoptionList from './screens/Adoptions/AdoptionList/AdoptionList'
import AdoptionDetail from './screens/Adoptions/AdoptionDetail/AdoptionDetail';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Search from './components/misc/Search/Search';
import Edit from './screens/Profile/Edit/Edit';





function App() {
  const { isAuthenticationFetched } = useAuthContext()
  
  return (
    <div className="App">
       
      {isAuthenticationFetched ? (
        <Routes>
            <Route path='/' element={
              <UnprotectedRoute>
                <Home/>
              </UnprotectedRoute>}/>
            <Route path='/register' element={
              <UnprotectedRoute>
                <Register/>
              </UnprotectedRoute>} />
            <Route path='/login' element={
              <UnprotectedRoute>
                <Login/>
              </UnprotectedRoute>
            } />
            
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }/>
             <Route path='/edit/profile' element={
              <ProtectedRoute>
                <Edit edit/>
              </ProtectedRoute>
            }/>
            <Route path='/adoptions/create' element={
              <ProtectedRoute>
                <NewAdoption/>
              </ProtectedRoute>
            }/>
            <Route path='/adoptions' element={
              
                <AdoptionList/>
              
            }/>
            <Route path='/adoptions/:id' element={
              
                <AdoptionDetail/>
              
            }/>
            <Route path="/adoptions/edit/:id" element={
              
                <NewAdoption edit/>
            
            } />
            <Route path="/search" element={
              
                <Search/>
           
            }/>
            <Route path="/likedpets" element={
              
                 <LikedPets/>
              
            }/>
            
        </Routes>
      ) : <p>Loading...</p>}
        <Dashboard/>
    </div>
  );
}

export default App;


// el edit profile no funciona nose a donde redireccionarlo nose como llamar al usuario
// una vez que la info este editada como la mando al perfil
//hacer el delete del usuario
// hacer responsive create adoption , edit profil , search, favs 
// como hago las adopciones como tinder ?
// en adopciones poner un contador de cuantas mascotas hay en adopcion
// contador en cuantas mascotas se adoptaron
// una vez adoptado hacer form para las mascotas q ya estan adoptadas 
// si no hay mascotas creadas q no aparezca el cartel de create adoptions 
//sino algo como una imagen de crear una adopcion
// si no hay mascotas likeadas q no aparezca el cartel de create adoptions 
//sino algo como una imagen de crear una adopcion
