import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import CurrentUserProvider from "./contexts/currentUser";


function App() {
  return (
    <CurrentUserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/auth/login' />} />
            <Route path='auth/login' element={ <LoginForm /> } />
            <Route path='auth/signup' element={ <SignupForm /> } />
          </Routes>
        </Router>
      </div>
    </CurrentUserProvider>
  );
}

export default App;
