import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';

<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@100&display=swap" rel="stylesheet"></link>

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
