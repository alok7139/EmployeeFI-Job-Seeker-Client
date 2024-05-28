import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main';
import axios from 'axios';

export default function Jobdetails() {

  const {id} = useParams();
  const [job, setjob] = useState({})
  const navigate = useNavigate();

  const {isauthorized,user} = useContext(Context);

  useEffect(() => {
    axios.get(`https://employeefi-job-seeker-app.onrender.com/get/job/${id}` , {withCredentials:true,})
    .then((res) => {
      setjob(res.data.job);
    }).catch((error) =>{
      navigate('/notfound')
    })
  },[])


  if(!isauthorized){
    navigate('/login');
  }

  const formatDate = (dateString) => {
    // Ensure the date string is valid and parse it
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // If date is invalid, return an empty string or a default value
        return '';
    }

    // Extract the date part in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
  

 


  return (
    <>
    <div className="jobDetail page">
      <div className='container'>
        <h1>Job Details</h1>
        <div className='banner'>
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Posted Date: <span>{formatDate(job.jobPostedOn)}</span>
          </p>
          <p> 
            Salary : {job.fixedsalary ? (<span>{job.fixedsalary}</span>) : (<span>{job.salaryFrom} - {job.salaryTo}</span>)}
          </p>

          <p>
            {
              user && user.role === "Employee" ? <></> : 
              <Link to={`/application/${job._id}`}>Apply Now</Link>
            }
          </p>

        </div>

      </div>
    </div>
    </>
  )
}
