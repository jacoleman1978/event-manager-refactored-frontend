import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import CurrentUserProvider from "./contexts/currentUser";
import DisplayContainer from "./components/DisplayContainer";

function App() {
  return (
    <CurrentUserProvider>
      <div className="App">
        
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/auth/login' />} />
            <Route path='/auth/login' element={ <LoginForm /> } />
            <Route path='/auth/signup' element={ <SignupForm /> } />
            <Route path='/tasks/priority' 
              element={ <DisplayContainer isTask={true} isEvent= {false} viewType={'priority'}/>} />
            <Route path='/tasks/duedate' 
              element={ <DisplayContainer isTask={true} isEvent={false} viewType={'duedate'}/>} />
            <Route path='/tasks/new' 
              element={ <DisplayContainer isTask={true} isEvent={false} viewType={'new'}/>} />
            <Route path='/tasks/edit/:eventId' 
              element={ <DisplayContainer isTask={true} isEvent={false} viewType={'edit'}/>} />
            <Route path='/events/week/:week' 
              element={ <DisplayContainer isTask={false} isEvent={true} viewType={'week'}/>} />
            <Route path='/events/day/:day' 
              element={ <DisplayContainer isTask={false} isEvent={true} viewType={'day'}/>} />
            <Route path='/events/new' 
              element={ <DisplayContainer isTask={false} isEvent={true} viewType={'new'}/>} />
            <Route path='/events/edit/:eventId' 
              element={ <DisplayContainer isTask={false} isEvent={true} viewType={'edit'}/>} />
            <Route path='/groups' 
              element={ <DisplayContainer isTask={false} isEvent={false} viewType={'groups'}/>} />
            < Route path='/groups/new' 
              element={ <DisplayContainer isTask={false} isEvent={false} viewType={'groups'}/>} />
            <Route path='/settings' 
              element={ <DisplayContainer isTask={false} isEvent={false} viewType={'settings'}/>} />
          </Routes>
        </Router>
      </div>
    </CurrentUserProvider>
  );
}

export default App;
