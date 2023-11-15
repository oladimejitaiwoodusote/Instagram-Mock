import React from 'react'
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'
import './CommentSection.css'

function CommentSection({comments}) {
    const commentslist = comments.map(comment => {
        return <div className='FullPost_username_caption'>
                    <Avatar src={comment.avatar} alt={comment.user}/>
                    <div className='FullPost_caption_container'>
                        <Link to={`/profile_page/${comment.user_id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                            <span className='FullPost_username'>{comment.user}</span>
                        </Link>
                        <p className='FullPost_caption'>{comment.text}</p>
                    </div>
               </div>
    })

  return (
    <div>
        {commentslist}
    </div>
  )
}

export default CommentSection