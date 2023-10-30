import React, { useState } from 'react'
import { Link  , useNavigate} from 'react-router-dom'
import './Login.css'
import {auth} from  './firebase.js'
function Login() {
  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const signIn = e =>{
    e.preventDefault();
    // d0o some firebase login shitttttt!!
    auth 
      .signInWithEmailAndPassword(email,password)
      .then((auth )=> {
        if(auth){
          navigate('/');
        }
        console.log("I m working"+auth)
      })
  }
  const register= e =>{
    e.preventDefault();
    // Do some firebase register shitee
    auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth)=>{ // it successfully created a user with email and password
          console.log(auth)
          if(auth){
            navigate('/');
          }
        })
        .catch(error => alert(error.message))
  }
  return (
   
    <div className='login'>
        <Link to='/'><img className='login__logo' src="https://www.demandsphere.com/wp-content/uploads/2018/02/Amazon_logo.png" alt="" scrSet="" /></Link>
        <div className="login__container">
          <h1>Sign-In</h1>
          <form action="">
            <h5>Email</h5>
            <input type="email" value={email} onChange= {e=>setEmail(e.target.value)} />
            <h5>Password</h5>
            <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
          </form>
          <p>By singing in you agree to the Amazone Fake Clone Condition of use & sale. Please see our Privacy notice, cookies notice and our interest based notice.</p>
          <button className='login__registerButton' onClick={register}>Create Amazone Account</button>
        </div>
    </div>
  )
}

export default Login
