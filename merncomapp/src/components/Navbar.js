import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { useCard } from '../components/Contextreducer.js';
//import Badge from 'react-bootstrap/Badge'  <Badge pill bg="danger"> {data.length} </Badge>
import Actions from '../screens/Actions.js';
import Modal from '../screens/Modal.js';
export default function Navbar() {

  //let data = useCard();

  const [action,setaction] = useState(false)
  const navigate = useNavigate();
  const handleLogout =() =>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }



  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">Community Connect</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item">
                <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
              <Link className="nav-link active fs-5 " aria-current="page" to="/myParticipitation">My Participation</Link>
            </li>
             :"" } 

            </ul>

            {(!localStorage.getItem("authToken"))?
            <div className='d-flex'>
            
              <Link className="btn bg-white text-success mx-1 " to="/login">Login </Link>


              <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
            </div>
            : 
            <div>
             <div className="btn bg-white text-Success mx-1" onClick={()=>{setaction(true)}} > 

                My Action
              
            </div>
           {action? <Modal onClose={()=>setaction(false)}>{<Actions/>}</Modal>:null}
            <div className="btn bg-white text-danger mx-1" onClick={handleLogout} > 
                Logout
            </div>
            </div>
            }
          </div>
        </div>
      </nav>


    </div>
  )
}
