import React from 'react'
import Avatar from '@mui/material/Avatar';

function Post({post}) {
  return (
    <div>
      <div>
      <Avatar
            className="post_avatar"
            alt="post_username"
            src="post_avatar"
            />
        <h3>Username</h3>
      </div>
      <img className='post_image' src={post.image}/>
      <h4 className='post_caption'><strong>Username</strong>{post.caption}</h4>
    </div>
  )
}

export default Post