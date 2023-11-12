import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import {GoHomeFill} from 'react-icons/go'
import {CgAddR, CgProfile} from 'react-icons/cg'
import {MdOutlineExplore} from 'react-icons/md'
import {AiOutlineInstagram, AiOutlineSearch, AiOutlineLogout} from 'react-icons/ai'
import UserProfilePreview from './UserProfilePreview'

function Navbar({currentUser, logout, users}){
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const handler = setTimeout(()=> {
      setDebouncedSearch(search)
    }, 300);

    return ()=> {
      clearTimeout(handler)
    }
  }, [search])

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  function resetSearch(){
    setSearch("")
  }

  return (
    <div className="navbar_wrapper">
      <nav className="navbar">
        <div className="navbar_logo-wrapper">
          <NavLink to="/main_feed" style={{textDecoration:'none', color: 'inherit'}}>
              <span className="navbar_instagram-logo">Instagram-Clone</span>
              <AiOutlineInstagram/>
          </NavLink>
        </div>
        <div className='navbar_search'>
            <AiOutlineSearch className="navbar_search-icon"/>
            <input type="text" placeholder="Search" className="navbar_search-input" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className='navbar_icons'>
            <NavLink className="navbar_link" to="/main_feed" aria-label='Home'>
                <GoHomeFill className='navbar_icon'/>
            </NavLink>
            <NavLink className="navbar_link" to="/image_upload" aria-label="Add Post">
                <CgAddR/>
            </NavLink>
            <NavLink className="navbar_link" to={`/profile_page/${currentUser.id}`} aria-label="Profile">
                <CgProfile/>
            </NavLink>
            <NavLink className="navbar_link" to="/discover_page" aria-label="Explore">
                <MdOutlineExplore/>
            </NavLink>
            <div className="navbar_link" aria-label='Logout'>
                <AiOutlineLogout onClick={logout}/>
            </div>
        </div>
        {search &&
          <div className="navbar_search_results">
             {filteredUsers.map(user => {
              return <UserProfilePreview key={user.id} user={user} resetSearch={resetSearch}/>
             }
             )}
          </div>
        }
      </nav>
    </div>

    
  )
}

export default Navbar