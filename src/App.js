import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UnprotectedRoute from './components/misc/UnprotectedRoute';
import Profile from './screens/Profile/Profile'

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
          <Route path='/profile' element={<Profile/>}/>
          
       
      </Routes>
    </div>
  );
}

export default App;
