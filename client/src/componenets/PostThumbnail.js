import React from 'react'
import './PostThumbnail.css'


function PostThumbnail({post, onClick}) {
  return (
    <div className='PostThumbnail' onClick={onClick}>
        <img className="PostThumbnail-Image" src={post.image} alt="Post Thumbnail"/>
    </div>
  )
}

export default PostThumbnail