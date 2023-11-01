import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import {GoHomeFill} from 'react-icons/go'
import {CgAddR, CgProfile} from 'react-icons/cg'
import {MdOutlineExplore} from 'react-icons/md'
import {BiMessageRoundedDetail} from 'react-icons/bi'
import {AiOutlineInstagram, AiOutlineSearch, AiOutlineLogout} from 'react-icons/ai'
import UserProfilePreview from './UserProfilePreview'


function Navbar({currentUser, logout}) {



  return (
    <div className="navbar_wrapper">
      <nav className="navbar">
        <div className="navbar_logo-wrapper">
          {/* Replace with your actual logo */}
          <NavLink to="/main_feed" style={{textDecoration:'none', color: 'inherit'}}>
              <span className="navbar_instagram-logo">Instagram-Clone</span>
              <AiOutlineInstagram/>
          </NavLink>
        </div>
        <div className='navbar_search'>
            <AiOutlineSearch className="navbar_search-icon"/>
            <input type="text" placeholder="Search" className="navbar_search-input" />
        </div>
        <div className='navbar_icons'>
            <NavLink className="navbar_link" to="/main_feed" activeClassName="active-link">
                <GoHomeFill className='navbar_icon'/>
            </NavLink>
            <NavLink className="navbar_link" to="/image_upload" activeClassName="active-link">
                <CgAddR/>
            </NavLink>
            <NavLink className="navbar_link" to={`/profile_page/${currentUser.id}`} activeClassName="active-link">
                <CgProfile/>
            </NavLink>
            <NavLink className="navbar_link" to="/discoveries" activeClassName="active-link">
                <MdOutlineExplore/>
            </NavLink>
            <div className="navbar_link" activeClassName="active-link">
                <AiOutlineLogout onClick={logout}/>
            </div>
        </div>
        {/* You can include other navigation links/icons here as needed */}
      </nav>
    </div>

    
  )
}

export default Navbar