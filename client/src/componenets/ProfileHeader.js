import React, {useState, useEffect} from 'react'
import './ProfileHeader.css'
import CustomAvatar from './CustomAvatar'

function ProfileHeader({profileUser, currentUser, onClick}) {

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/is_following/${currentUser.id}/${profileUser.id}`)
    .then(response => response.json())
    .then(data => setIsFollowing(data.message))
    .catch(error => {
      console.error("Error checking follow status:", error)
    })
  },[currentUser.id, profileUser.id])

  function handleFollowToggle(){
    const method = isFollowing? 'DELETE': 'POST'
    const endpoint = isFollowing? `${process.env.REACT_APP_API_BASE_URL}/unfollow/${currentUser.id}/${profileUser.id}`: `${process.env.REACT_APP_API_BASE_URL}/follow/${currentUser.id}/${profileUser.id}`

    fetch(endpoint, {
      method: method
    })
    .then(response => response.json())
    .then(data => console.log(data))

    if (isFollowing){
      profileUser.followersCount -= 1;
    } else {
      profileUser.followersCount += 1;
    }

    setIsFollowing(!isFollowing);
  }

  return (
    <div className='profile-header'>
        <CustomAvatar src={profileUser.avatar} alt={profileUser.username}/>
        <div className='profile-header_info'>
            <div className='profile-header_action'>
              <h2 className="profile-header_username">{profileUser.username}</h2>
              {profileUser.id === currentUser.id? 
              <button className='profile-header-following-button' onClick={onClick}>Edit Profile</button>
              : (
                isFollowing
                ? <button className="profile-header-following-button" onClick={handleFollowToggle}>Following</button>
                : <button className="profile-header-follow-button" onClick={handleFollowToggle}>Follow</button>
              )}
            </div>
            <div className="profile-header_stats">
                <span><strong>{profileUser.postsCount} <span className="profile-header_stats_text">posts</span></strong></span>
                <span><strong>{profileUser.followersCount} <span className="profile-header_stats_text">followers</span></strong></span>
                <span><strong>{profileUser.followingCount} <span className="profile-header_stats_text">following</span></strong></span>
            </div>
            <p className="profile-header_name">{profileUser.full_name}</p>
        </div>
    </div>
  )
}

export default ProfileHeader