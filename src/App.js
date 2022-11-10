import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UnprotectedRoute from './components/misc/UnprotectedRoute';
import Profile from './screens/Profile/Profile'
import MyPetsCreated from './screens/Adoptions/MyPetsCreated/MyPetsCreated';
import NewAdoption from './screens/Adoptions/NewAdoption/NewAdoption'
import AdoptionList from './screens/Adoptions/AdoptionList/AdoptionList'
import AdoptionDetail from './screens/Adoptions/AdoptionDetail/AdoptionDetail';
import ProtectedRoute from './components/misc/ProtectedRoute';
import Search from './components/misc/Search/Search';
import Edit from './screens/Profile/Edit/Edit';
import NewAdopted from './screens/Adopted/NewAdopted/NewAdopted'
import ListAdopted from './screens/Adopted/ListAdopted/ListAdopted'
import Chat from './screens/Chat/Chat'
import ListUsers from './screens/ListUsers/ListUsers';
import Notification from './screens/Notifications/Notifications';




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

            <Route path="/adoptions/edit/:id" element={
              <ProtectedRoute>
                <NewAdoption edit/>
              </ProtectedRoute>
            
            } />
            <Route path="/likedpets" element={
              <ProtectedRoute>
                 <MyPetsCreated/>
              </ProtectedRoute>
              
            }/>
            <Route path="/adopted/create" element={
             
                <NewAdopted/>
              
           
         }/>
            <Route path="/search" element={<Search/>}/>
           <Route path="/adopted" element={<ListAdopted/>}/>
           <Route path="/chat/:id" element={<Chat/>}/>
           <Route path="/users" element={<ListUsers/>}/>
           <Route path='/adoptions' element={<AdoptionList/>}/>
           <Route path='/adoptions/:id' element={<AdoptionDetail/>}/>
           <Route path='/notifications' element={<Notification/>}/>
          
            
        </Routes>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default App;





// cuando voy a subir una foto en los adoptados no me deja y antes si podia
// cuando este en el chat aparezca el icono del chat en color no en gris y una linea de conversacion
// se podria poner el la pag de usuarios la linea de solo el primer mesaje debajo del nombre del user?
// que solo aparezca el owner de ese pet likeado 
// el input para agregar cosas
// que el search funcione y filre x ese pet y el owner de ese pet
// en new matches que tenga una barra q vaya como un carrousel
