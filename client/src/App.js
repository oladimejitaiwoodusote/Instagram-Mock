import Login from './componenets/Login';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Signup from './componenets/Signup';

function App() {

  function handleSignup(form){
    console.log(form)
  }

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup attemptSignup={handleSignup}/>}/>
      
    </Routes>
  );
}

export default App;
