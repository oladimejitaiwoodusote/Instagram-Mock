import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faEnvelope, faCompass, faHeart, faUser} from '@fortawesome/free-solid-svg-icons'


function Navbar() {
  return (
    <div className="navbar">
       <nav className='navbar'>
        <NavLink className="navbar-link" to='/main_feed' activeClassName="active-link">
            <FontAwesomeIcon icon={faHome} className="icon"/>
        </NavLink>
       </nav>
    </div>
    
  )
}

export default Navbar