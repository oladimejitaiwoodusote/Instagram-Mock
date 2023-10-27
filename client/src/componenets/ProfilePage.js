import React, {useState, useEffect} from 'react'
// import Post from './Post'
import PostThumbnail from './PostThumbnail'
import ProfileHeader from './ProfileHeader'
import './ProfilePage.css'
import FullPost from './FullPost'
import Post from './Post'

function ProfilePage({currentUser}) {
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)


    useEffect(()=>{
        if (currentUser){
        fetch(`/users_posts/${currentUser.id}`)
        .then(response => response.json())
        .then(data => {
            setPosts(data)
        })
         }
        else {
        }
    },[currentUser])

    function handleThumbnailClick(post){
        setSelectedPost(post)
    }

    const profile_posts_thumbnails = posts.map(post => {
        return <PostThumbnail key={post.id} post={post} onClick={()=> handleThumbnailClick(post)}/>
    })

    function handleCloseModal(){
        setSelectedPost(null);
    }

    function handlePostDeleted(deletedPostId){
        const updatedPosts = posts.filter(post => post.id !== deletedPostId)
        setPosts(updatedPosts);
    }


    if (currentUser){
        return (
            <div>
                <ProfileHeader user={currentUser}/>
                <hr className='ProfilePage_divider'/>
                <div className="ProfilePage-posts_grid">
                    {profile_posts_thumbnails}
                </div>
                {selectedPost? <FullPost onPostDeleted={handlePostDeleted} user={currentUser} post={selectedPost} onClose={handleCloseModal}/>:null}

            </div>
        )
    }

    else {
        return ("LOADING...")
    }
}

export default ProfilePage