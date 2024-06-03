import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Logging() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
let navigate = useNavigate()

  const handleSumit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    })

    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter valid Details");
    }
    if (json.success) {
      navigate("/");
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
    }


  }

  const onchanged = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });


  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSumit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchanged} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchanged} />
          </div>

          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I am a new User</Link>
        </form>
      </div>


    </div>
  )
}
