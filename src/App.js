import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login/Login'

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route path='/' element={<Login />}/>
        </Routes>
    </div>
  );
}

export default App;
