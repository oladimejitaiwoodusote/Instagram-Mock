import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import './Post.css'
import {AiOutlineHeart} from 'react-icons/ai'
import {FiMessageCircle} from 'react-icons/fi'
import {FcLike} from 'react-icons/fc'


function Post({post, user, onClick}) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [likes, setLikes] = useState(post.likes || 0)
  const [isLiked, setIsLiked] = useState(false)

  const commentInputRef = useRef(null)

  useEffect(()=> {
    fetch(`http://localhost:5555/comments/${post.id}`)
    .then(response => response.json())
    .then(data => setComments(data.length))
  },[post.id])

  useEffect(()=> {
    fetch(`http://localhost:5555/likes/${post.id}`)
    .then(response => response.json())
    .then(data => setLikes(data.length))
  })  

  useEffect(()=> {
    fetch(`http://localhost:5555/like_status/${post.id}/${user.id}`)
    .then(response => response.json())
    .then(data => setIsLiked(data.message))
  },[post.id, user.id]) 

  function handleLikeClick(){
    const method = isLiked ? "DELETE": "POST"
    const endpoint = isLiked ? `http://localhost:5555/unlike/${post.id}/${user.id}` : `http://localhost:5555/like/${post.id}/${user.id}`

    fetch(endpoint, {
        method: method,
    })
    .then(response => response.json())
    .then(data => {
        setIsLiked(data.isLiked)
        setLikes(data.likesCount)
    })
    }

  function submitHandler(e){
    e.preventDefault()
    const comment = {
      "text": newComment,
      "user_id": user.id,
      "post_id": post.id
    }
    
    fetch(`http://localhost:5555/comment`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(comment => setComments(comments + 1))
    setNewComment("")
  }

  function changeHandler(e){
    if (e.key === 'Enter' && !e.shiftKey){
      e.preventDefault()
      if (newComment.trim() !== ""){
        submitHandler(e)
      }
    }
    else{
      setNewComment(e.target.value)
      autoResize(e.target)
    }
  }
  
  function autoResize(e){
    e.style.height = 'auto';
    e.style.height = (e.scrollHeight) + 'px';

  }

  function handleCommentIconClick(){
    commentInputRef.current.focus()
  }

  return (
    <div className="post">
      <div className='post_header'>
      <Avatar
            className="post_avatar"
            alt={post.username}
            src={post.avatar}
            />
        <Link to={`/profile_page/${post.user_id}`} style={{textDecoration:'none', color: 'inherit'}}>
            <h4>{post.username}</h4>
        </Link>
      </div>
      <img className='post_image' src={post.image} alt={post.caption}/>
      <div className="post_engagement">
          <div className="post_engagement_icons">
              <button className='post_icon_button' onClick={handleLikeClick}>
                  {isLiked? <FcLike/>: <AiOutlineHeart/>}
              </button>
              <button className='post_icon_button' onClick={handleCommentIconClick}>
                  <FiMessageCircle/>
              </button>
          </div>
          <p >{likes} likes </p>
          <div className="post_caption_container">
            <Link to={`/profile_page/${post.user_id}`} style={{textDecoration:'none', color: 'inherit'}}>
                <span className="post_username">{post.username}</span>
            </Link>
            <span className="post_caption">  {post.caption}</span>
          </div>
      </div>
      <div className ="post_comment_section">
        {comments === 0? null: <p onClick={onClick}>View all {comments} comments</p>}
        <form onSubmit={submitHandler}>
          <div className='post_comment_form'>
            <textarea className="post_comment_input" 
                      placeholder='Add a comment...' 
                      name="comment" 
                      value={newComment} 
                      onChange={(e)=> {changeHandler(e); autoResize(e.target)}} 
                      rows="1"
                      onKeyDown={changeHandler}
                      ref={commentInputRef}></textarea>
            {newComment?  <button className="post_comment_button" type="submit">Post</button>: null}           
          </div>
        </form>
      </div>    
      <hr className="post_separator"/>  
    </div>
  )
}

export default Post