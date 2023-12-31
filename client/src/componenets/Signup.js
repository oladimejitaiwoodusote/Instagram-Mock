import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Signup.css';

function Signup({attemptSignup, currentUser}) {

    const navigate = useNavigate()
    const [formData, setForm] = useState(
        {
            email: "",
            full_name: "",
            username: "",
            password: "",
        }
    )

    function changeHandler(e){
        setForm({...formData, [e.target.name]: e.target.value})
    }

    function submitHandler(e){
        e.preventDefault()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (formData.email && !emailPattern.test(formData.email)){
            alert("Please enter a valid email address.")
            return;
        }
        
        attemptSignup(formData)
    }

    useEffect(()=> {
        if (currentUser){
            navigate('/main_feed')
        }
    })

    function clickHandler(){
        navigate('/')
    }

  return (
    <div className = 'signup-container'> 
        <div className='signup-formContainer'>
            <h1 className='signup-logo'>Instagram</h1>
            <p className='signup-text'>Sign up to see photos and videos from your friends</p>
            <form className='signup-form' onSubmit={submitHandler}>
                <input className='signup-input-field' name="email" placeholder="Email" onChange={changeHandler} value={formData.email}/>
                <input className='signup-input-field' name="full_name" placeholder="Full Name" onChange={changeHandler} value={formData.full_name}/>
                <input className='signup-input-field' name="username" placeholder="Username" onChange={changeHandler} value={formData.username}/>
                <input className='signup-input-field' type="password" name="password" placeholder="Password" onChange={changeHandler} value={formData.password}/>
                <input className='signup-submit-button'type="submit" value='Sign up'/>
            </form>
        </div>  
        <div className='signup-login-only'>
            <p className='signup-login-text'> Have an account?
                <button className='signup-login-button' onClick={clickHandler}>Log in</button>
            </p>
        </div>
    </div>
    
  )
}

export default Signup