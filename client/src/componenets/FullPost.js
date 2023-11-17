import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import FullPostHeader from './FullPostHeader';
import CommentSection from './CommentSection';
import EngagementSection from './EngagementSection';
import './FullPost.css'
import Avatar from '@mui/material/Avatar';

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
        fetch(`http://localhost:5555/comments/${post.id}`)
        .then(response => response.json())
        .then(data => setComments(data))
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

        fetch(`http://localhost:5555/comment`,{
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

    function handleEditSubmit(e){
        e.preventDefault()
        fetch(`http://localhost:5555/edit_post/${post.id}`,{
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
        fetch(`http://localhost:5555/delete_post/${post.id}`, {
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
    <div className='FullPost' onClick={onClose}>
        <div className='FullPost_content' onClick={(e)=> e.stopPropagation()}>
            <img src={post.image} alt="Post content" className="FullPost_image"/>
            <div className="FullPost_details">
                <FullPostHeader user={user} post={post} onOptionsClick={handleOptionsClick} showOptions={showOptions} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
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
                        <CommentSection comments={comments}/>
                    </div>
                    <hr className="FullPost_separator" />
                    <EngagementSection isLiked={isLiked} onLikeClick={handleLikeClick} onCommentIconClick={handleCommentIconClick} likes={likes}/>
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