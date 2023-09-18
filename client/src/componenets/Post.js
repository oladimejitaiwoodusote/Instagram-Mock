import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import './Post.css'

function Post({post, user}) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(()=> {
    fetch(`/comments/${post.id}`)
    .then(response => response.json())
    .then(data => setComments(data))
  },[post.id])

  const commentSection = comments.map(comment => {
    return <h4 className="post_comment" key ={comment.id}>
              <strong>{comment.user}</strong> {comment.text}
          </h4>
  })

  function submitHandler(e){
    e.preventDefault()
    const comment = {
      "text": newComment,
      "user_id": user.id,
      "post_id": post.id
    }
    
    fetch(`/comment`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(comment => setComments([...comments, comment]))
    setNewComment("")
  }

  function changeHandler(e){
    setNewComment(e.target.value)
  }
  
  return (
    <div className="post">
      <div className='post_header'>
      <Avatar
            className="post_avatar"
            alt={post.username}
            src={post.avatar}
            />
        <h3>{post.username}</h3>
      </div>
      <img className='post_image' src={post.image}/>
      <h4 className='post_text'><strong>{post.username}</strong> {post.caption}</h4>
      <div className ="post_comment_section">
        {commentSection}
        <form onSubmit={submitHandler}>
          <input placeholder='Enter comment...' name="comment" value={newComment} onChange={changeHandler}></input>
        </form>
      </div>
      
    </div>
  )
}

export default Post