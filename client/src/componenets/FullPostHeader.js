import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import './FullPostHeader.css'

function FullPostHeader({user, post, onOptionsClick, showOptions, onEditClick, onDeleteClick}) {
  return (
    <div className="FullPost_header">
        <div className="FullPost_user_info">
            <Avatar src={post.avatar} alt={post.username}/>
            <Link to ={`/profile_page/${post.user_id}`} style={{textDecoration:'none', color: 'inherit'}}>                    
                <p>{post.username}</p>
            </Link>
        </div>
        {post.user_id === user.id && (
            <div className="FullPost_options">
                <button className="FullPost_options_button" onClick={onOptionsClick}>...</button>
                {showOptions && (
                    <div className='FullPost_options_menu'>
                        <button className='FullPost_edit_button' onClick={onEditClick}>Edit</button>
                        <button className='FullPost_delete_button' onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>
        )}
    </div>
    )
}

export default FullPostHeader