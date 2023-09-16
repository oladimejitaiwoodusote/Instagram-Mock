import React, {useState, useEffect} from 'react'
// import Post from './Post'
import PostThumbnail from './PostThumbnail'
import ProfileHeader from './ProfileHeader'
import './ProfilePage.css'
import FullPost from './FullPost'

function ProfilePage({currentUser}) {
    const [posts, setPosts] = useState([])

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

    // const profile_posts = posts.map(post => {
    //     return <Post key={post.id} post={post} user={currentUser}/>
    // })

    const profile_posts_thumbnails = posts.map(post => {
        return <PostThumbnail key={post.id} post={post}/>
    })

    const mockPost = {
        id: 500000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tyler_the_creator.jpg/220px-Tyler_the_creator.jpg",
        username: "sample",
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tyler_the_creator.jpg/220px-Tyler_the_creator.jpg",
        caption: "cartman"

    }


    if (currentUser){
        return (
            <div>
                <ProfileHeader user={currentUser}/>
                <hr className='ProfilePage_divider'/>
                <div className="ProfilePage-posts_grid">
                    {profile_posts_thumbnails}
                    <FullPost post={mockPost}/>
                </div>
            </div>
        )
    }

    else {
        return ("LOADING...")
    }
}

export default ProfilePage