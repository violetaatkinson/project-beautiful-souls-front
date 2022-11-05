import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UnprotectedRoute from './components/misc/UnprotectedRoute';
import Profile from './screens/Profile/Profile'
import LikedPets from './screens/Adoptions/LikedPets/LikedPets';
import NewAdoption from './screens/Adoptions/NewAdoption/NewAdoption'
import AdoptionList from './screens/Adoptions/AdoptionList/AdoptionList'
import AdoptionDetail from './screens/Adoptions/AdoptionDetail/AdoptionDetail';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Search from './components/misc/Search/Search';
import Edit from './screens/Profile/Edit/Edit';
import NewAdopted from './screens/Adopted/NewAdopted/NewAdopted'
import ListAdopted from './screens/Adopted/ListAdopted/ListAdopted'




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
              <ProtectedRoute>
                <NewAdoption edit/>
              </ProtectedRoute>
            
            } />
            <Route path="/search" element={
              
                <Search/>
           
            }/>
            <Route path="/likedpets" element={
              <ProtectedRoute>
                 <LikedPets/>
              </ProtectedRoute>
              
            }/>
            <Route path="/adopted/create" element={
              <ProtectedRoute>
                <NewAdopted/>
              </ProtectedRoute>
           
         }/>
           <Route path="/adopted" element={
              
              <ListAdopted/>
           
         }/>
          
          
            
        </Routes>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default App;





// en adopciones poner un contador de cuantas mascotas hay en adopcion
// contador en cuantas mascotas se adoptaron
//chat de usuarios si like un pet que me aparezca la foto del perro y que pueda chatear con ese usuario
//que creo la adopcion
// notificaciones de likes, chat y de nuevas adopciones creadas y de nuevos duenos que han adoptado