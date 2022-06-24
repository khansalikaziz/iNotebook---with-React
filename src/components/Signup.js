import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials,setCredentials] =useState({email:"",password:"",name:"",cpassword:""})
    let history=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;

        const response = await fetch("http://localhost:4000/api/auth/createuser", {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({name,email,password})
       });
       const json=await response.json();
       console.log(json);
       if(json.success){
         //save the auth token and redirect
         localStorage.setItem('token',json.authtoken);
         history("/");
         props.showAlert("Account Created Successfully","success")
         
       }
       else{
         props.showAlert("Invalid Credential","danger")
       }
     }
 
     const onChange=(e)=>{
         setCredentials({...credentials,[e.target.name]:e.target.value})
     }

    return (
        <div className='container mt-2'>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name='name' type="text" className="form-control" id="name" onChange={onChange}  aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name='email' type="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input minLength={5} required name='password' onChange={onChange} type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label  htmlFor="cpassword" className="form-label">Password</label>
                    <input required  minLength={5} name='cpassword' onChange={onChange} type="password" className="form-control" id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup