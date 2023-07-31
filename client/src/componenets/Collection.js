import React from 'react'
import Post from './Post'

function Collection({currentUser, posts}) {

    const collection = posts.map(post => {
        return <Post key={post.id} post ={post}/>
    })

  return (
    <div>
        {collection}
    </div>
  )
}

export default Collection