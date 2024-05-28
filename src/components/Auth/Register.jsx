import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate ,Link} from 'react-router-dom'
import { FaPencilAlt, FaRegUser } from 'react-icons/fa'
import {MdOutlineMailOutline} from 'react-icons/md'
import {FaPhoneFlip} from 'react-icons/fa6'
import {RiLock2Fill} from 'react-icons/ri'



function Register() {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [phone, setphone] = useState("")
  const [role, setrole] = useState("")

  const {isauthorized,setisauthorized,user,setuser} = useContext(Context)

  const handleregister = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("https://employeefi-job-seeker-app.onrender.com/get/user/register" , {name,email,phone,password,role} , {withCredentials:true , headers:{"Content-Type" : "application/json"},});
      toast.success(data.message);
      setname("")
      setemail("")
      setphone("");
      setpassword("");
      setrole("");
      setisauthorized(true);
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
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
          <h3>Create a new Account</h3>
        </div>
        <form>
           <div className="inputTag">
            <label>
              Register As
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
              Name
            </label>
            <div>
              <input type='text' value={ name} onChange={(e) => setname(e.target.value)} placeholder='Enter Your Name'/>
              <FaPencilAlt/>
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
              Phone
            </label>
            <div>
              <input type='number' value={phone} onChange={(e) => setphone(e.target.value)} placeholder='Enter Your Number'/>
              <FaPhoneFlip/>
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
           <button onClick={handleregister} type='submit'>Register</button>
           <Link to='/login'>Login</Link>
        </form>
      </div>
      <div className="banner">
        <img
        src='/register.png'
        alt='register'
        />
      </div>

     </div>
    </>
  )
}

export default Register
