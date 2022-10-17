import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UnprotectedRoute from './components/misc/UnprotectedRoute';
// import User from './screens/User/User';
// import Adoptions from './screens/Adoptions/Adoptions';

<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@100&display=swap" rel="stylesheet"></link>

function App() {
  return (
    <div className="App">
      
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
          {/* <Route path='/profile' element={<User/>} />  */}
          {/* donde veo mi perfil , edito mi perfil , elimino mi perfil y veo mis likes */}
          {/* <Route path='adoptions' element={<Adoptions/>}/> */}
          {/* donde veo las adopciones , las creo , edito y elimino */}
      </Routes>
    </div>
  );
}

export default App;
