import React, {useEffect, useContext, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Application() {
   const [name, setname] = useState("")
   const [email, setemail] = useState("")
   const [coverletter, setcoverletter] = useState("")
   const [phone, setphone] = useState("")
   const [address, setaddress] = useState("")
   const [resume, setresume] = useState(null)

   const {isauthorized, user} = useContext(Context);
   const navigate = useNavigate();

   // function to hanlde the file input changes
   const handlefilechange = (e) => {
    const resume = e.target.files[0];

    setresume(resume);
   };

   const {id} = useParams();
   const handleapplication = async(e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name",name);
    formdata.append("email",email);
    formdata.append("phone",phone);
    formdata.append("address" , address);
    formdata.append("coverletter",coverletter);
    formdata.append("resume",resume);
    formdata.append("jobId",id);

    try {
      const {data} = await axios.post("https://employeefi-job-seeker-app.onrender.com/get/application/post/resume" ,formdata , {withCredentials:true , headers:{"Content-Type" : "multipart/form-data"}})
      setname("");
      setemail("")
      setcoverletter("")
      setphone("")
      setaddress("")
      setresume("")
      toast.success(data.message);
      navigate("/job/getall")
    } catch (error) {
      toast.error(error.response.data.message);
    }
   }

   
   useEffect(() => {
    if (!isauthorized || (user && user.role === 'Employee')) {
      navigate('/');
    }
  }, [isauthorized, user, navigate]);


  return (
    <>
     <section className='application'>
      <div className='container'>
        <h3>Application Form </h3>
        <form onSubmit={handleapplication}>
          <input type='text' placeholder='Name' value={name} onChange={(e) => setname(e.target.value)}/>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)}/>
          <input type='number' placeholder='Phone Number' value={phone} onChange={(e) => setphone(e.target.value)}/>
          <input type='text' placeholder='Address' value={address} onChange={(e) => setaddress(e.target.value)}/>
          
          <textarea value={coverletter} onChange={(e) => setcoverletter(e.target.value)} placeholder='Cover Letter'/>
           
           <div>
             <label style={{textAlign:"start" , display:"block" , fontSize:"20px"}}>
              Select Resume
             </label>
             <input type='file'accept='.jpg , .png , .webp' onChange={handlefilechange} style={{width:"100%"}}/>
           </div>
           <button type='submit'>Submit</button>
           
        </form>

      </div>

     </section>
    </>
  )
}

export default Application
