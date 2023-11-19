import React, {useState, useRef} from 'react'
import './EditProfileForm.css'

function EditProfileForm({currentUser, onClose, fetchUserProfile}) {
    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");

    const avatarInputRef = useRef(null)

    function handleAvatarChange(e){
        const file = e.target.files[0];
        setAvatar(file);
    }

    function handleSubmit(e){
        e.preventDefault()

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(email && !emailPattern.test(email)){
            alert("Please enter a valid email address.");
            return;
        }

        const formData = new FormData();
        formData.append('username', username)
        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)
        formData.append('currentPassword', currentPassword)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/edit_profile/${currentUser.id}`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Profile updated successfully'){
                alert(data.message);
                if (avatarInputRef.current){
                    avatarInputRef.current.value = "";
                }
                fetchUserProfile()
                onClose()
            } 
            else if(data.message === 'Incorrect current password'){
                alert(data.message);
            }

            else{
                alert(data.message);
            }

        })
        .catch(err => {
            console.error('There was an error updating the profile', err);
        })
    }

  return (
    <div className='EditProfileForm_overlay'onClick={onClose}>
        <div className='EditProfileForm_container' onClick={(e)=> e.stopPropagation()}>
            <form className='EditProfileForm_form' onSubmit={handleSubmit}>
                <input ref={avatarInputRef} className="EditProfileForm_file" type="file" accept="image" onChange={handleAvatarChange}/>
                <input className="EditProfileForm_text" type="text" placeholder='Username' value={username} onChange={e=> setUsername(e.target.value)}/>
                <input className="EditProfileForm_text" type="text" placeholder='Full Name' value={fullName} onChange={e=> setFullName(e.target.value)}/>
                <input className="EditProfileForm_text" type="text" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                <input className="EditProfileForm_text" type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)}/>
                <input className="EditProfileForm_text" type="password" placeholder="Current Password" value={currentPassword} onChange={e=> setCurrentPassword(e.target.value)}/>
                <button className="EditProfileForm_button" type="submit">Update</button>
            </form>
            <button className="EditProfileForm_close_button" onClick={onClose}>Close</button>
        </div>
    </div>
  )
}

export default EditProfileForm;