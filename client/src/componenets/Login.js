import React, {useState} from 'react'
import './Login.css'

function Login({attempLogin}) {

    const [formData, setForm] = useState(
        {
            username: "",
            password: ""
        }

    )
    
    function changeHandler(e){
        setForm({...formData, [e.target.name]: e.target.value})
    }

    function submitHandler(e){
        e.preventDefault()
        attempLogin(formData)
    }

  return (
    <div className='login-container'>
        <div className='login-formContainer'>
            <h1 className='login-logo'>Instagram</h1>
            <form className='login-form' onSubmit={submitHandler}>
                <input className='login-input-field' name='username' placeholder='Username' onChange={changeHandler} value={formData.username}/>
                <input className='login-input-field' name='password' placeholder='Password' onChange={changeHandler} value={formData.password}/>
                <input className='login-submit-button' type='submit' value='Log in'/>
            </form>
        </div>
        <div className='login-signup-only'>
            <p className='login-signup-text'> Don't have an account?
                <button className='login-signup-button'>Sign up</button>
            </p>

        </div>
    </div>
  )
}

export default Login