import {useEffect, useState} from 'react'
import Login from './componenets/Login';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Signup from './componenets/Signup';
import ProfilePage from './componenets/ProfilePage';
import MainFeed from './componenets/MainFeed';


function App() {
  const [currentUser, setUser] = useState(null)

  useEffect(()=> {
    fetch('/check_session')
    .then((response => {
      if(response.ok){
        response.json()
      .then(data => setUser(data))
      }
    }))
  },[])

  function handleSignup(userdata){
    fetch('/signup',{
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userdata) 
    })
    .then(response => response.json())
    .then(data => setUser(data))
  }
  
  function handleLogin(userdata){
    fetch('/login',{
      method: "POST",
      headers:  {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userdata)
    })
    .then(response => {
      if(response.ok){
        response.json()
        .then(data => setUser(data))
      }
      else {
        response.json()
        .then(data => alert(data.message))
      }
    })
  }

  return (
    <Routes>
      <Route path="/login" element={<Login attempLogin={handleLogin}/>}/>
      <Route path="/signup" element={<Signup attemptSignup={handleSignup} currentUser={currentUser}/>}/>
      <Route path="/profile_page" element={<ProfilePage currentUser={currentUser}/>}/>
      <Route path="/main_feed" element={<MainFeed currentUser={currentUser}/>}/>
      
    </Routes>
  );
}

export default App;
