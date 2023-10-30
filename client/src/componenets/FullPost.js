import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import './FullPost.css'
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {FiMessageCircle} from 'react-icons/fi'

function FullPost({post, onClose, user, onPostDeleted}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState(null)
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const[editedCaption, setEditedCaption] = useState(post.caption);

    const commentInputRef = useRef(null)
    
    useEffect(()=> {
        fetch(`/comments/${post.id}`)
        .then(response => response.json())
        .then(data => setComments(data))
        console.log(post.user_id)
        console.log(user.id)
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

    const commentSection = comments.map(comment => {
        return <div className="FullPost_username_caption">
                    <Avatar src={comment.avatar} alt={comment.user}/>
                    <div className="FullPost_caption_container">
                        <Link to={`/profile_page/${comment.user_id}`} style={{textDecoration:'none', color: 'inherit'}}>
                            <span className='FullPost_username'>{comment.user}</span>
                        </Link>
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

        const textarea = commentInputRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.scollTop = textarea.scrollHeight;
    }

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

    function handleEditSubmit(e){
        e.preventDefault()
        fetch(`/edit_post/${post.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                caption: editedCaption
            })
        })
        .then(response => response.json())
        .then(updatedPost => {
            post.caption = updatedPost.caption;
            setEditMode(false);
        })
        .catch(error => {
            console.error("There was an error updating the post:", error);
        });
    }
    
    function handleEditClick(){
        if (editMode){
            handleEditSubmit();
        } else {
            setEditMode(true);
        }
    }
    function handleDeleteClick(){
        fetch(`/delete_post/${post.id}`, {
            method: "DELETE",
        })
        .then(response => {
            if(response.ok) {
                onPostDeleted(post.id)
                onClose();
            } else {
                console.error('Failed to delete post');
            }
        })

    }

    function handleOptionsClick(){
        setShowOptions(prev => !prev)
    }

  return (
    <div className='FullPost'>
        <div className='FullPost_content'>
            <img src={post.image} alt="Post content" className="FullPost_image"/>
            <div className="FullPost_details">
                <div className="FullPost_header">
                    <div className="FullPost_user_info">
                        <Avatar src={post.avatar} alt={post.username}/>
                        <Link to ={`/profile_page/${post.user_id}`} style={{textDecoration:'none', color: 'inherit'}}>                    
                            <p>{post.username}</p>
                        </Link>
                    </div>
                    {post.user_id === user.id && (
                        <div className="FullPost_options">
                            <button className="FullPost_options_button" onClick={handleOptionsClick}>...</button>
                            {showOptions && (
                                <div className='FullPost_options_menu'>
                                    <button className='FullPost_edit_button' onClick={handleEditClick}>Edit</button>
                                    <button className='FullPost_delete_button' onClick={handleDeleteClick}>Delete</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <hr className="FullPost_separator" />
                <div className="FullPost_username_caption">
                    <Avatar src={post.avatar} alt={post.username}/>
                    <div className="FullPost_caption_container">
                        <Link to ={`/profile_page/${post.user_id}`} style={{textDecoration:'none', color: 'inherit'}}>
                            <span className='FullPost_username'>{post.username}</span>
                        </Link>
                        {
                            editMode?
                            <form onSubmit={handleEditSubmit}>
                                <input type="text" value={editedCaption} onChange={e => setEditedCaption(e.target.value)}/>
                            </form>
                            :
                            <span className='FullPost_caption'>{post.caption}</span>
                        }
                    </div>
                </div>
                <div className="FullPost_footer">
                    <div className="FullPost_comments_scrollable">
                        {commentSection}
                    </div>
                    <hr className="FullPost_separator" />
                    <div className="FullPost_engagement">
                        <div className="FullPost_engagement_icons">
                            <button className="FullPost_icon_button" onClick={handleLikeClick}>
                                <FontAwesomeIcon icon={isLiked? solidHeart : regularHeart} className={isLiked? 'FullPost_liked':''}/>
                            </button>
                            <button className='FullPost_icon_button' onClick={handleCommentIconClick}>
                                <FiMessageCircle/>
                            </button>
                        </div>
                        <p>{likes} likes</p>
                    </div>
                </div>
                <hr className="FullPost_separator"/>
                <form onSubmit={submitHandler}>
                        <div className="FullPost_comment_section">
                                <input placeholder='Add a comment...' value={newComment} onChange={changeHandler} ref={commentInputRef}/>
                                <button type="submit" className="FullPost_comment_button">Post</button>
                        </div>
                </form>
            </div>
        </div>
        <button className="FullPost_close_button" onClick={onClose}>Close</button>
    </div>
  )
}

export default FullPost