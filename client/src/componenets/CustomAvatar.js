import React from 'react'
import './CustomAvatar.css'


function CustomAvatar({src,alt}) {
    return (
        <div className='custom-avatar' style={{backgroundImage: `url(${src})`}} title={alt}></div>
      )
}

export default CustomAvatar