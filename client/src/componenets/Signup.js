import React, {useEffect, useState} from 'react'
import './Signup.css';

function Signup({attemptSignup}) {

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
        attemptSignup(formData)
    }

  return (
    <div className = 'signup-container'> 
        <div className='signup-formContainer'>
            <h1 className='signup-logo'>Instagram</h1>
            <form className='signup-form' onSubmit={submitHandler}>
                <input className='signup-input-field' name="email" placeholder="Email" onChange={changeHandler} value={formData.email}/>
                <input className='signup-input-field' name="full_name" placeholder="Full Name" onChange={changeHandler} value={formData.full_name}/>
                <input className='signup-input-field' name="username" placeholder="Username" onChange={changeHandler} value={formData.username}/>
                <input className='signup-input-field' name="password" placeholder="Password" onChange={changeHandler} value={formData.password}/>
                <input className='signup-submit-button'type="submit" value='Sign up'/>
            </form>
        </div>  
        <div className='signup-login-only'>
            <p className='signup-login-text'> Have an account?
                <button className='signup-login-button'>Log in</button>
            </p>
        </div>
    </div>
    
  )
}

export default Signup