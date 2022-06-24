import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials,setCredentials] =useState({email:"",password:""})

    let history=useNavigate();

    const handleSubmit=async(e)=>{
       e.preventDefault();
       const response = await fetch("http://localhost:4000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        props.showAlert("Logged In Successfully","success")
        history("/");
        
        
      }
      else{
        props.showAlert("Invalid Credential","danger")
      }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='mt-3'>
             <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emai" className="form-label">Email address</label>
                    <input onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label value={credentials.password} htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login