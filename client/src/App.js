import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './componenets/Login';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Signup from './componenets/Signup';
import ProfilePage from './componenets/ProfilePage';
import MainFeed from './componenets/MainFeed';
import Navbar from './componenets/Navbar';
import ImageUpload from './componenets/ImageUpload';
import DiscoverPage from './componenets/DiscoverPage';

function App() {
  const [currentUser, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/check_session`,{
      credentials: 'include'
    })
    .then(response => {
      if(response.ok){
        return response.json()
      }
      else {
        throw new Error('Session check failed')
      }
    })
    .then(data => setUser(data))
    .catch(error => {
      console.error("Error checking session:", error);
      if (location.pathname !== '/signup'){
        navigate('/')
      }
    });

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      else {
        throw new Error('Failed to fetch users')
      }
    })
    .then(data => setUsers(data))
    .catch(error => {
      console.error("Error fetching users:", error)
    })
  },[navigate, location.pathname])

  function handleSignup(userdata){
    fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`,{
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userdata),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => setUser(data))
  }
  
  function handleLogin(userdata){
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`,{
      method: "POST",
      headers:  {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userdata),
      credentials: 'include'
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

  function handleLogout(){
    fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`,{
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 204) {
          setUser(null)
          navigate('/')
      }
    })
    .catch(error => {
      console.error("Error during logout: ", error);
    });
  }

  return (
    <>
      {currentUser? <Navbar logout={handleLogout} currentUser={currentUser} users={users}/>:null}
      <Routes>
        <Route path="/" element={<Login attempLogin={handleLogin} currentUser={currentUser}/>}/>
        <Route path="/signup" element={<Signup attemptSignup={handleSignup} currentUser={currentUser}/>}/>
        <Route path="/profile_page/:userId" element={<ProfilePage currentUser={currentUser}/>}/>
        <Route path="/main_feed" element={<MainFeed currentUser={currentUser}/>}/>
        <Route path="/image_upload" element={<ImageUpload currentUser={currentUser}/>}/>
        <Route path="/discover_page" element={<DiscoverPage currentUser={currentUser}/>}/>
      </Routes>
    </>
  );
}

export default App;
