import React from 'react'
import './login.css';

export default function Login() {
  return (
    <div className='signin-container'>
        <h1>Sign in</h1>
        <div className='signin-fields'>
            <label for="email">Email</label>
            <input type='text' id='email' className='signin-input'></input>
        </div>
        <div className='signin-fields'>
            <label for="password">Password</label>
            <input type='text' id='password' className='signin-input'></input>
        </div>
        <div className='signin-fields'>
            <button className='signin'>Sign in</button>
        </div>
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png" className='g-signin-img'></img>
    </div>
  )
}
