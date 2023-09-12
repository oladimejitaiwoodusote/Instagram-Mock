import React from 'react'
import { Avatar } from '@mui/material'
import './ProfileHeader.css'

function ProfileHeader({user}) {
  return (
    <div className='profile-header'>
        <Avatar alt={user.username} src={user.avatar} className='profile-header_avatar'/>
        <div className='profile-header_info'>
            <h2 className="profile-header_username">{user.username}</h2>
            <p className="profile-header_name">{user.full_name}</p>
            <div className="profile-header_stats">
                
            </div>
        </div>
    </div>
  )
}

export default ProfileHeader