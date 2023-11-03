import React, {useState, useRef} from 'react'
import './EditProfileForm.css'

function EditProfileForm({currentUser, onClose}) {
    const [username, setUsername] = useState(currentUser.username)
    const [fullName, setFullName] = useState(currentUser.full_name)
    const [email, setEmail] = useState(currentUser.email);
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

        const formData = new FormData();
        formData.append('username', username)
        formData.append('fullName', fullName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)
        formData.append('currentPassword', currentPassword)

        fetch(`/edit_profile/${currentUser.id}`, {
            method: 'PATCH',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Profile updated successfully'){
                alert(data.message);
                if (avatarInputRef.current){
                    avatarInputRef.current.value = "";
                }
                onClose()
            } 
            else if(data.message === 'Incorrect current password'){
                alert(data.message);
            }

            else{
                alert(data.essage);
            }

        })
        .catch(err => {
            console.error('There was an error updating the profile', err);
        })
    }

  return (
    <div className='EditProfileForm_overlay'>
        <div className='EditProfileForm_container'>
            <form className='EditProfileForm_form' onSubmit={handleSubmit}>
                <input ref={avatarInputRef} className="EditProfileForm_file" type="file" accept="image" onChange={handleAvatarChange}/>
                <input className="EditProfileForm_text" type="text" placeholder='Username' value={username} onChange={e=> setUsername(e.target.value)}/>
                <input className="EditProfileForm_text" type="text" placeholder='Full Name' value={fullName} onChange={e=> setFullName(e.target.value)}/>
                <input className="EditProfileForm_text" type="text" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                <input className="EditProfileForm_text" type="text" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)}/>
                <input className="EditProfileForm_text" type="text" placeholder="Current Password" value={currentPassword} onChange={e=> setCurrentPassword(e.target.value)}/>
                <button className="EditProfileForm_button" type="submit">Update</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfileForm;