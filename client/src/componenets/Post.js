import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import './Post.css'
import {AiOutlineHeart} from 'react-icons/ai'
import {FiMessageCircle} from 'react-icons/fi'
import {FcLike} from 'react-icons/fc'


function Post({post, user}) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [likes, setLikes] = useState(post.likes || 0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(()=> {
    fetch(`/comments/${post.id}`)
    .then(response => response.json())
    .then(data => setComments(data))
  },[post.id])

  useEffect(()=> {
    fetch(`/likes/${post.id}`)
    .then(response => response.json())
    .then(data => setLikes(data.length))
  })  

  useEffect(()=> {
    fetch(`/like_status/${post.id}/${user.id}`)
    .then(response => response.json())
    .then(data => setIsLiked(data.message))
  },[post.id, user.id]) 

  function handleLikeClick(){
    const endpoint = isLiked ? `/unlike/${post.id}/${user.id}` : `/like/${post.id}/${user.id}`

    fetch(endpoint, {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => {
        setIsLiked(data.isLiked)
        setLikes(data.likesCount)
    })
    }

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
        <h4>{post.username}</h4>
      </div>
      <img className='post_image' src={post.image}/>
      <div className="post_engagement">
          <div className="post_engagement_icons">
              <button className='post_icon_button' onClick={handleLikeClick}>
                  {console.log(isLiked)}
                  {isLiked? <FcLike/>: <AiOutlineHeart/>}
              </button>
              <button className='post_icon_button'>
                  <FiMessageCircle/>
              </button>
          </div>
          <p>{likes} likes</p>
      </div>
      <h4 className='post_text'><strong>{post.username}</strong> {post.caption}</h4>
      <div className ="post_comment_section">
        {commentSection}
        <form onSubmit={submitHandler}>
          <input placeholder='Add a comment...' name="comment" value={newComment} onChange={changeHandler}></input>
        </form>
      </div>      
    </div>
  )
}

export default Post