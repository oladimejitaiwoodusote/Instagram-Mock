import React from 'react'
import './PostThumbnail.css'


function PostThumbnail({post}) {
  return (
    <div className='PostThumbnail'>
        <img className="PostThumbnail-Image" src={post.image} alt="Post Thumbnail"/>
    </div>
  )
}

export default PostThumbnail