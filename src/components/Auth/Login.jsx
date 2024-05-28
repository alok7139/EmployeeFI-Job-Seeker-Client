import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate ,Link} from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import {MdOutlineMailOutline} from 'react-icons/md'
import {RiLock2Fill} from 'react-icons/ri'

function Login() {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [role, setrole] = useState("")

  const {isauthorized,setisauthorized} = useContext(Context)

  const handlelogin = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("https://employeefi-job-seeker-app.onrender.com/get/user/login" , {email,password,role} , {withCredentials:true , headers:{"Content-Type" : "application/json"}});
      toast.success(data.message);

      setemail("")
      setpassword("");
      setrole("");
      setisauthorized(true);
    } catch (error) {
        toast.error(error.response.data.message);
        // console.log(error);
    }
  }

  if(isauthorized){
    return <Navigate to={'/'}/>;
  }





  return (
    <>
     <div className='authPage'>
      <div className="container">
        <div className="header">
          <img
          src="https://cdn-icons-png.flaticon.com/512/3090/3090108.png"
          style={{height:"auto" , display:"block" , margin:"0 auto", maxWidth:"100%" , borderRadius:"50%"}}
          alt='logo'
          />
          <h3>Login</h3>
        </div>
        <form>
           <div className="inputTag">
            <label>
              Login As
            </label>
            <div>
              <select value={role} onChange={(e) => setrole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employee">Employee</option>
                <option value="Job Seeker">
                  Job Seeker
                </option>
              </select>
              <FaRegUser/>
            </div>
           </div>
           
           <div className="inputTag">
            <label>
              Email
            </label>
            <div>
              <input type='email' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter Your Email'/>
              <MdOutlineMailOutline/>
            </div>
           </div>
           
            <div className="inputTag">
            <label>
              Password
            </label>
            <div>
              <input type='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter Your Password'/>
              <RiLock2Fill/>
            </div>
           </div>
           <button type='submit' onClick={handlelogin} >Login</button>
           <Link to='/register'>Register</Link>
        </form>
      </div>
      <div className="banner">
        <img
        src='/login.png'
        alt='login'
        />
      </div>

     </div>
    </>
  )
}

export default Login

