import React, {useState, useEffect} from 'react'
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


    function fetchUserProfile(){
        fetch(`/user_profile/${userId}`)
            .then(response => response.json())
            .then(data => setProfileUser(data))
            .catch(error => {
                console.error("Error fetching user profile:", error);
            });
    }
    
    useEffect(()=>{    
        fetchUserProfile()
        if (currentUser){       
        fetch(`/users_posts/${userId}`)
        .then(response => response.json())
        .then(data => {
            setPosts(data)
        })
        .catch(error => {
            console.log("Error fetching users posts:", error)
        })
         }
        else {
            console.log("Loading")
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
                <div className={posts.length > 0 ? "ProfilePage-posts_grid": "ProfilePage-no-posts"}>
                    {/* {profile_posts_thumbnails} */}
                    {posts.length > 0 ? (
                        profile_posts_thumbnails
                    ): (
                        <p>No posts to display</p>
                    )}
                </div>
                {selectedPost? <FullPost onPostDeleted={handlePostDeleted} user={currentUser} post={selectedPost} onClose={handleCloseModal}/>:null}
                {showEditForm? <EditProfileForm fetchUserProfile={fetchUserProfile} currentUser={currentUser} onClose={() => setShowEditForm(false)}/> : null}
            </div>
        )
    }

    else {
        return (
            <div className='ProfilePage_loader-container'>
                <div className='ProfilePage_loader'></div>
            </div>
        )
    }
}

export default ProfilePage