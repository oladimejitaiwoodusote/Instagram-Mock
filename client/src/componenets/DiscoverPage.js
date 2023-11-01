import React, {useState, useEffect} from 'react'
import './DiscoverPage.css'
import FullPost from './FullPost'
import PostThumbnail from './PostThumbnail'

function DiscoverPage({currentUser}) {
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)

    useEffect(()=> {
        if (currentUser){
            fetch(`/user_discovery/${currentUser.id}`)
            .then(response => response.json())
            .then(data => setPosts(data))
        }
    },[currentUser])

    const discoveries = posts.map(post => {
        return <PostThumbnail key={post.id} post={post} onClick={()=> setSelectedPost(post)}/>
    })

    function handleCloseModal(){
        setSelectedPost(null)
    }

  return (
    <div className='discover_wrapper'>
        <hr className='discover_line_breaker'></hr>
        <div className='discover_page_grid'>
            {discoveries}
            {console.log(selectedPost)}
            {selectedPost? <FullPost post={selectedPost} user={currentUser} onClose={handleCloseModal}/>:null}
        </div>
    </div>
  )
}

export default DiscoverPage