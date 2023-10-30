import React from 'react'
import './ProfileHeader.css'
import CustomAvatar from './CustomAvatar'

function ProfileHeader({user}) {
  return (
    <div className='profile-header'>
        <CustomAvatar src={user.avatar} alt={user.username}/>
        <div className='profile-header_info'>
            <h2 className="profile-header_username">{user.username}</h2>
            <div className="profile-header_stats">
                <span><strong>{user.postsCount} <span className="profile-header_stats_text">posts</span></strong></span>
                <span><strong>{user.followersCount} <span className="profile-header_stats_text">followers</span></strong></span>
                <span><strong>{user.followingCount} <span className="profile-header_stats_text">following</span></strong></span>
            </div>
            <p className="profile-header_name">{user.full_name}</p>
        </div>
    </div>
  )
}

export default ProfileHeader