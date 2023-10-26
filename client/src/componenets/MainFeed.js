import React, { useEffect, useState } from 'react'
import Post from './Post'
import './MainFeed.css'


function MainFeed({currentUser}) {

  const [posts, setPosts] = useState([])
 
  useEffect(()=>{
      if (currentUser){
      fetch(`/users_followee_posts/${currentUser.id}`)
      .then(response => response.json())
      .then(data => {
          setPosts(data)
          console.log(1)
      })
      }
      else {
      }
      },[currentUser])

  const dummy = posts.map(post => {
    return <Post key={post.id} post={post} user={currentUser}/>
  })

  return (
    <div className='MainFeed_wrapper'>
      {dummy}
    </div>
  )
}

export default MainFeed