import React, {useState, useEffect} from 'react'
import Post from './Post'


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

    const profile_posts = posts.map(post => {
        return <Post key={post.id} post={post} user={currentUser}/>
    })

    if (currentUser){
        return (
            <div>
                {profile_posts}
            </div>
        )
    }

    else {
        return ("LOADING...")
    }
}

export default ProfilePage