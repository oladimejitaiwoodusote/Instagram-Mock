import React from 'react'
import './UserProfilePreview.css'
import { Avatar } from '@mui/material'

function UserProfilePreview({user}) {
  return (
    <div className='user_preview'>
        <Avatar src={user.avatar} alt={user.username}/>
        <div className='user_preview_info'>
            <div className='user_username'>{user.username}</div>
            <div className="user_preview_name_stats">
                <div>{user.full_name} • {user.followersCount} followers</div>
            </div>
        </div>
    </div>
  )
}

export default UserProfilePreview