import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./contexts/AuthContext";
import { SocketContextProvider } from "./contexts/SocketContext";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <SocketContextProvider>
      <Router>
        <App />
      </Router>
    </SocketContextProvider>
  </AuthContextProvider>
);

reportWebVitals();