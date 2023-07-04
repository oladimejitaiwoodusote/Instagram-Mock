import Login from './componenets/Login';
import './App.css';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
