import React, {useState, useEffect} from 'react'
import Collection from './Collection'
import Post from './Post'


function ProfilePage({currentUser}) {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        if (currentUser){
        fetch(`/users_posts/${currentUser.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(currentUser)
            console.log(data)
            setPosts(data)
        })
        console.log("If")
         }
        else {
            console.log("Else")
        }
    },[currentUser])

    // const profile_posts = posts.map(post => {
    //     return <Post key={post.id} post={post}/>
    // })

    if (currentUser){
        return (
            <div>
                {console.log(currentUser)}
                {console.log(posts)}
                <Collection currentUser={currentUser} posts={posts}/>
            </div>
        )
    }

    else {
        return ("LOADING...")
    }
}

export default ProfilePage