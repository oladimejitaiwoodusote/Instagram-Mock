import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faEnvelope, faCompass, faPlusSquare, faUser, faSearch} from '@fortawesome/free-solid-svg-icons'
import {GoHomeFill} from 'react-icons/go'
import {CgAddR, CgProfile} from 'react-icons/cg'
import {MdOutlineExplore} from 'react-icons/md'
import {BiMessageRoundedDetail} from 'react-icons/bi'


function Navbar() {
  return (
    <div className="navbar_wrapper">
      <nav className="navbar">
        <div className="navbar_logo-wrapper">
          {/* Replace with your actual logo */}
          <span className="instagram-logo">Instagram</span>
        </div>
        <div className='navbar_search'>
            <FontAwesomeIcon icon={faSearch} className="navabar_search-icon" />
            <input type="text" placeholder="Search" className="navbar_search-input" />
        </div>
        <div className='navbar_icons'>
            <NavLink className="navbar_link" to="/main_feed" activeClassName="active-link">
                <GoHomeFill className='navbar_icon'/>
            </NavLink>
            <NavLink className="navbar_link" to="/image_upload" activeClassName="active-link">
                <CgAddR/>
            </NavLink>
            <NavLink className="navbar_link" to="/profile_page" activeClassName="active-link">
                <CgProfile/>
            </NavLink>
            <NavLink className="navbar_link" to="/discoveries" activeClassName="active-link">
                <MdOutlineExplore/>
            </NavLink>
            <NavLink className="navbar_link" to="/message" activeClassName="active-link">
                <BiMessageRoundedDetail/>
            </NavLink>
        </div>
        {/* You can include other navigation links/icons here as needed */}
      </nav>
    </div>

    
  )
}

export default Navbar