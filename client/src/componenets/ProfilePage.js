import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import PostThumbnail from './PostThumbnail'
import ProfileHeader from './ProfileHeader'
import './ProfilePage.css'
import FullPost from './FullPost'
import EditProfileForm from './EditProfileForm'

function ProfilePage({currentUser}) {
    const {userId} = useParams()
    const [profileUser, setProfileUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)
    const [showEditForm, setShowEditForm] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{    
        fetch(`/user_profile/${userId}`)
            .then(response => response.json())
            .then(data => setProfileUser(data))
        if (currentUser){
        
        fetch(`/users_posts/${userId}`)
        .then(response => response.json())
        .then(data => {
            setPosts(data)
        })
         }
        else {
            navigate("/")
        }
    },[currentUser, userId])

    useEffect(()=> {
        setSelectedPost(null)
    }, [userId])

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


    if (currentUser && profileUser){
        return (
            <div>
                <ProfileHeader profileUser={profileUser} currentUser={currentUser} onClick={()=> setShowEditForm(true)}/>
                <hr className='ProfilePage_divider'/>
                <div className="ProfilePage-posts_grid">
                    {profile_posts_thumbnails}
                </div>
                {selectedPost? <FullPost onPostDeleted={handlePostDeleted} user={currentUser} post={selectedPost} onClose={handleCloseModal}/>:null}
                {showEditForm? <EditProfileForm currentUser={currentUser} onClose={() => setShowEditForm(false)}/> : null}
            </div>
        )
    }

    else {
        return ("LOADING...")
    }
}

export default ProfilePage