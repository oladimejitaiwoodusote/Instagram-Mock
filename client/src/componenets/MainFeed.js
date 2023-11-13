import React, { useEffect, useState } from 'react'
import Post from './Post'
import FullPost from './FullPost'
import './MainFeed.css'



function MainFeed({currentUser}) {

  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
 
  useEffect(()=>{
      if (currentUser){
      fetch(`/users_followee_posts/${currentUser.id}`)
      .then(response => response.json())
      .then(data => {
          setPosts(data)
      })
      .catch(error => {
        console.error("Error fetching main feed posts:", error)
      })
      .finally(() => {
        setIsLoading(false);
      })
      }
      },[currentUser])


  function handlePostClick(post){
    setSelectedPost(post)
  }

  function handleCloseModal(){
    setSelectedPost(null);
  }
  const posts_feed = posts.map(post => {
    return <Post key={post.id} onClick={()=> handlePostClick(post)} post={post} user={currentUser}/>
  })

  return (
    <div className='MainFeed_wrapper'>
      {isLoading ? (
        <div className='MainFeed_loader-container'>
            <div className='MainFeed_loader'></div>
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            posts_feed
          ) : (
            <p>No posts to display</p>
          )}
          {selectedPost? <FullPost post={selectedPost} user={currentUser} onClose={handleCloseModal}/>:null}
        </>
      )}
    </div>
  )
}

export default MainFeed