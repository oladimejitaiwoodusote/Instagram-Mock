import React, {useState, useEffect, useRef} from 'react'
import './FullPost.css'
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function FullPost({post, onClose, user}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState(null)
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const commentInputRef = useRef(null)

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

    const commentSection = comments.map(comment => {
        return <div className="FullPost_username_caption">
                    <Avatar src={comment.avatar} alt={comment.user}/>
                    <div className="FullPost_caption_container">
                        <span className='FullPost_username'>{comment.user}</span>
                        <p className='FullPost_caption'>{comment.text}</p>
                    </div>
               </div>
    })

    function handleCommentIconClick(){
        commentInputRef.current.focus()
    }
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
        .then(comment => setComments([...comments,comment]))
        setNewComment("")
    }

    function changeHandler(e){
        setNewComment(e.target.value)
    }

  return (
    <div className='FullPost'>
        <div className='FullPost_content'>
            <img src={post.image} alt="Post content" className="FullPost_image"/>
            <div className="FullPost_details">
                <div className="FullPost_header">
                    <Avatar src={post.avatar} alt={post.username}/>
                    <p>{post.username}</p>
                </div>
                <hr className="FullPost_separator" />
                <div className="FullPost_username_caption">
                    <Avatar src={post.avatar} alt={post.username}/>
                    <div className="FullPost_caption_container">
                        <span className='FullPost_username'>{post.username}</span>
                        <p className='FullPost_caption'>{post.caption}</p>
                    </div>
                </div>
                <div className="FullPost_footer">
                    <div className="FullPost_comments_scrollable">
                        {commentSection}
                    </div>
                    <hr className="FullPost_separator" />
                    <div className="FullPost_engagement">
                        <div className="FullPost_engagement_icons">
                            <button className="FullPost_icon_button">
                                <FontAwesomeIcon icon={isLiked? solidHeart : regularHeart} className={isLiked? 'FullPost_liked':''}/>
                            </button>
                            <button className='FullPost_icon_button' onClick={handleCommentIconClick}>
                                <FontAwesomeIcon icon={faComment}/>
                            </button>
                        </div>
                        <p>{likes} likes</p>
                    </div>
                </div>
                <hr className="FullPost_separator"/>
                <form onSubmit={submitHandler}>
                    <div className="FullPost_comment_section">
                            <input type="text" placeholder="Add a comment..." value={newComment} onChange={changeHandler} ref={commentInputRef} />
                            <button type="submit" className="FullPost_comment_button">POST</button>
                    </div>
                </form>
            </div>
        </div>
        <button className="FullPost_close_button" onClick={onClose}>Close</button>
    </div>
  )
}

export default FullPost