import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {GiHamburgerMenu} from 'react-icons/gi'

function Navbar() {
  const [show, setshow] = useState(false);
  const {isauthorized,setisauthorized,user} = useContext(Context);
  const navigate = useNavigate();

  const handlelogout = async() => {
    try {
      const res = await axios.get("https://employeefi-job-seeker-app.onrender.com/get/user/logout" , {withCredentials:true});
      toast.success(res.data.message);
      setisauthorized(false);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
      setisauthorized(false);
    }
  }
  return (
    <>
      <nav className={isauthorized ? 'navbarShow' : 'navbarHide'}>
          <div className="container">
              <div className='logo'>
              <img
              src='/logoemployeefi.png'
              alt='logo'
              />
              

            </div> 
            <ul className={!show ? "menu" : "show-menu menu"}>
                 <li>
                  <Link to={'/'} onClick={() => setshow(false)}>
                    Home
                  </Link>
                 </li>
                 <li>
                  <Link to={'/job/getall'} onClick={() => setshow(false)}>
                    All Jobs
                  </Link>
                 </li>
                 <li>
                  <Link to={'/application/user'} onClick={() => setshow(false)}>
                     {
                      user && user.role === "Employee" ? "CANDIDATE'S APPLICATIONS" : "MY APPLICATIONS"
                     }
                  </Link>
                 </li>
                 {
                  user && user.role === "Employee" ? (
                    <>
                      <li>
                        <Link to={'/job/create'}  onClick={() => setshow(false)}>Post jobs</Link>
                      </li>
                      <li>
                        <Link to={'/job/user'}  onClick={() => setshow(false)}>View jobs</Link>
                      </li>
                    </>
                  ) : <></>
                 }
                 <button onClick={handlelogout}>Logout</button>
            </ul>
            <div className='hamburger'>
                <GiHamburgerMenu onClick={() => setshow(!show)}/>
            </div>
          </div>
      </nav>
    </>
  )
}

export default Navbar
