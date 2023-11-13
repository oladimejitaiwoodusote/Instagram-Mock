import React, {useState, useEffect} from 'react'
import './DiscoverPage.css'
import FullPost from './FullPost'
import PostThumbnail from './PostThumbnail'

function DiscoverPage({currentUser}) {
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        if (currentUser){
            fetch(`/user_discovery/${currentUser.id}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => {
                console.error("Error fetching discovery posts:", error);
            })
            .finally(() => setIsLoading(false))
        }
    },[currentUser])

    const discoveries = posts.map(post => {
        return <PostThumbnail key={post.id} post={post} onClick={()=> setSelectedPost(post)}/>
    })

    function handleCloseModal(){
        setSelectedPost(null)
    }

    if (isLoading){
        return (
            <div className='DiscoverPage_loader-container'>
                <div className='DiscoverPage_loader'></div>
            </div>
        )
    }
    else {

        return (
          <div className='discover_wrapper'>
              <hr className='discover_line_breaker'></hr>
              <div className='discover_page_grid'>
                  {discoveries}
                  {selectedPost? <FullPost post={selectedPost} user={currentUser} onClose={handleCloseModal}/>:null}
              </div>
          </div>
        )
    }
}
export default DiscoverPage