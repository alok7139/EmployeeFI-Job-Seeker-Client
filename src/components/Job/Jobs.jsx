import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function Jobs() {
  const [jobs, setjobs] = useState([]);

  const {isauthorized} = useContext(Context)

  const naviagte = useNavigate();

  useEffect(() => {
   try {
     axios.get("https://employeefi-job-seeker-app.onrender.com/get/job/getall" , {withCredentials:true})
     .then((res) => {
      setjobs(res.data);
     })
   } catch (error) {
     console.log(error)
   }
  },[])


  if(!isauthorized){
    naviagte('/login');
  }
  return (
    <>
     <section className='jobs page'>
      <div className='container'>
        <h1>Available Jobs</h1>
        <div className='banner'>
          {
            jobs.jobs && jobs.jobs.map((item) =>{
              return (
                <div className='card' key={item._id}>
                  <p>{item.title}</p>
                  <p>{item.category}</p>
                  <p>{item.country}</p>
                  <Link to={`/job/${item._id}`}>Job Details</Link>
                  </div>
              )
            })
          }

        </div>

      </div>

     </section>
    </>
  )
}

export default Jobs
