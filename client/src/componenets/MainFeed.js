import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from './Post'
import FullPost from './FullPost'
import './MainFeed.css'
import UserProfilePreview from './UserProfilePreview'



function MainFeed({currentUser}) {

  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const navigate = useNavigate()
 
  useEffect(()=>{
      if (currentUser){
      fetch(`/users_followee_posts/${currentUser.id}`)
      .then(response => response.json())
      .then(data => {
          setPosts(data)
      })
      }
      else {
        navigate("/")
      }
      },[currentUser])


  function handlePostClick(post){
    setSelectedPost(post)
    console.log(post)
  }

  function handleCloseModal(){
    setSelectedPost(null);
  }
  const posts_feed = posts.map(post => {
    return <Post key={post.id} onClick={()=> handlePostClick(post)} post={post} user={currentUser}/>
  })

  return (
    <div className='MainFeed_wrapper'>
      {posts_feed}
      {selectedPost? <FullPost post={selectedPost} user={currentUser} onClose={handleCloseModal}/>:null}
    </div>
  )
}

export default MainFeed