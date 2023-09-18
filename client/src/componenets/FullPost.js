import React, {useState, useEffect} from 'react'
import './FullPost.css'
import Avatar from '@mui/material/Avatar';


function FullPost({post, onClose}) {
    const [comments, setComments] = useState([])

    // useEffect(()=> {
    //     fetch(`/comments/${post.id}`)
    //     .then(response => response.json())
    //     .then(data => setComments(data))
    // },[post.id])

    const commentSection = comments.map(comment => {
        return <h4 className='FullPost_comment' key={comment.id}>
                    <strong>{comment.user}</strong>
               </h4>
    })

  return (
    <div className='FullPost'>
        <div className='FullPost_content'>
            <img src={post.image} alt="Post content" className="FullPost_image"/>
            <div className="FullPost_details">
                <div className="FullPost_header">
                    <Avatar src={post.avatar} alt={post.username}/>
                    <p>{post.username}</p>
                </div>
                <div className="FullPost_comments">
                    {/*commentSection*/}
                </div>
                <input type="text" placeholder="Add a comment..."/>
            </div>
        </div>
        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default FullPost