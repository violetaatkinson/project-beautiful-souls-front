import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UnprotectedRoute from './components/misc/UnprotectedRoute';
import Profile from './screens/Profile/Profile'
import NewAdoption from './screens/Adoptions/NewAdoption/NewAdoption'
import AdoptionList from './screens/Adoptions/AdoptionList/AdoptionList'
import ProtectedRoute from './components/misc/ProtectedRoute';
import { useAuthContext } from './contexts/AuthContext';

<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@100&display=swap" rel="stylesheet"></link>

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
            <Route path='/adoptions/create' element={
              <ProtectedRoute>
                <NewAdoption/>
              </ProtectedRoute>
            }/>
            <Route path='/adoptions' element={<AdoptionList/>}/>
            <Route path='adoptions/:id' element={<AdoptionList/>}/>
        </Routes>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default App;
