import React from 'react'
import {Link} from 'react-router-dom'
import './UserProfilePreview.css'
import { Avatar } from '@mui/material'

function UserProfilePreview({user, resetSearch}) {
  return (
    <Link to={`/profile_page/${user.id}`} style={{textDecoration:'none', color: 'inherit'}} onClick={resetSearch}>
        <div className='user_preview'>
            <Avatar src={user.avatar} alt={user.username}/>
            <div className='user_preview_info'>
                <div className='user_username'>{user.username}</div>
                <div className="user_preview_name_stats">
                    <div>{user.full_name} • {user.followersCount} followers</div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default UserProfilePreview