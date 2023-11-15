import React from 'react'
import './EngagementSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {FiMessageCircle} from 'react-icons/fi'

function EngagementSection({isLiked, onLikeClick, onCommentIconClick, likes}) {
  return (
    <div className='FullPost_engagement'>
        <div className='FullPost_engagement_icons'>
            <button className='FullPost_icon_button' onClick={onLikeClick}>
                <FontAwesomeIcon icon={isLiked? solidHeart: regularHeart} className={isLiked? 'FullPost_liked': ''}/>
            </button>
            <button className='FullPost_icon_button' onClick={onCommentIconClick}>
                <FiMessageCircle/>
            </button>
        </div>
        <p>{likes} likes</p>
    </div>
  )
}

export default EngagementSection