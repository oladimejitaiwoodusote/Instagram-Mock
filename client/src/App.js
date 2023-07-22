import {useEffect, useState} from 'react'
import Login from './componenets/Login';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Signup from './componenets/Signup';

function App() {

  function handleSignup(userdata){
  }

  function handleLogin(userdata){
    
  }

  return (
    <Routes>
      <Route path="/login" element={<Login attempLogin={handleLogin}/>}/>
      <Route path="/signup" element={<Signup attemptSignup={handleSignup}/>}/>
      
    </Routes>
  );
}

export default App;
