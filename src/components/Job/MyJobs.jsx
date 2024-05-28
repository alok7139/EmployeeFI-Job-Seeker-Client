import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
// import { Job } from '../../../../server/models/jobschema';
import { FaCheck } from 'react-icons/fa';
import {RxCross2} from 'react-icons/rx'

function MyJobs() {
   const {isauthorized,user} = useContext(Context)
   

   const [myjobs, setmyJobs] = useState([])
   const [editingmode, seteditingmode] = useState(null)
   const navigate = useNavigate();

   useEffect(() => {
    const fetchjobs = async() => {
      try {
        const {data} = await axios.get("https://employeefi-job-seeker-app.onrender.com/get/job/getmyjob" , {withCredentials:true})
        setmyJobs(data.myjobs)
      } catch (error) {
        toast.error(error.response.data.message);
        setmyJobs([]);
      }
    }
    fetchjobs();
   },[]); 

  useEffect(() => {
    if (!isauthorized || (user && user.role !== 'Employee')) {
      navigate('/');
    }
  }, [isauthorized, user, navigate]);

   // function for enabling editing
   const handleenable = (JobID) => {
    seteditingmode(JobID);
   }

   // fucntion for disabling editing
   const handledisable= (JobID) => {
    seteditingmode(JobID);
   }

   // function for editing job
   const handleupdatejob = async(JobID) => {
    const updatejob = myjobs.find((Job) => Job._id === JobID);
    await axios.put(`https://employeefi-job-seeker-app.onrender.com/get/job/update/${JobID}` , updatejob , {withCredentials:true})
    .then((res) => {
      toast.success(res.data.message);
      seteditingmode(null);
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
   };

   // fiunction for deleting job
   const handlejobdelete = async(JobID) => {
    await axios.delete(`https://employeefi-job-seeker-app.onrender.com/get/job/delete/${JobID}` , {withCredentials:true},)
    .then((res) => {
      toast.success(res.data.message);
      setmyJobs(prevJobs => prevJobs.filter((job) => job._id !== JobID))
    }).catch((error) => {
       toast.error(error.response.data.message)
    })
   }

   const handleInputchange = (JobID , field , value) => {
      setmyJobs(prevJobs => 
        prevJobs.map((job) => 
          job._id === JobID ? {...job , [field] : value} : job
        )
      );
   }



  return (
    <>
     <div className='myJobs page'>
      <div className='container'>
        <h3>Posted Jobs</h3>
        {
          myjobs && myjobs.length>0 ? (<>
            
            <div className='banner'>
              {
                myjobs.map((item) => (
                  // return (
                    <div className='card' key={item._id}>
                      <div className='content'>
                        <div className='short_fields'>
                          <div>
                            <span>Title: </span>
                            <input type='text' disabled = {editingmode !== item._id ? true : false}
                            value={item.title} onChange={(e) => handleInputchange(item._id , "title" , e.target.value)}
                            />
                          </div>
                          <div>
                            <span>Country: </span>
                            <input type='text' disabled = {editingmode !== item._id ? true : false}
                            value={item.country} onChange={(e) => handleInputchange(item._id , "country" , e.target.value)}
                            />
                          </div>
                          <div>
                            <span>City: </span>
                            <input type='text' disabled = {editingmode !== item._id ? true : false}
                            value={item.city} onChange={(e) => handleInputchange(item._id , "city" , e.target.value)}
                            />
                          </div>
                          <div>
                            <span>Category: </span>
                            <select value={item.category} onChange={(e) => handleInputchange(item._id , "category" , e.target.value)} disabled={editingmode !== item._id ? true : false}>
                            <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="App Development">
                   App Development
                </option>
                <option value="Data Analyst">
                  Data Analyst
                </option>
                <option value="Software Engineer/C++">
                   Software Engineer/C++
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
                            </select>
                          </div>

                          <div >
                            <span>Salary:{
                               item.fixedsalary ? <input type='number'  value={item.fixedsalary} onChange={(e) => handleInputchange(item._id , "category" , e.target.value)} disabled={editingmode !== item._id ? true : false}/> :
                                <div>
                                    <input type='number'  value={item.salaryFrom} onChange={(e) => handleInputchange(item._id , "salaryFrom" , e.target.value)} disabled={editingmode !== item._id ? true : false}/> 
                                    <input type='number'  value={item.salaryTo} onChange={(e) => handleInputchange(item._id , "salaryTo" , e.target.value)} disabled={editingmode !== item._id ? true : false}/> 
                                </div>
                              } </span>
                            </div>

                            <div>
                               <span>Expired:</span>
                               <select value={item.expired} onChange={(e) => handleInputchange(item._id , "expired" , e.target.value)} disabled={editingmode !== item._id ? true : false}>
                                  <option value={true}>True</option>
                                  <option value={false}>False</option>
                               </select>
                            </div>

                        </div>

                        <div className="long_field">
                          <div>
                              <span>Description: </span>
                              <textarea rows={'5'} value={item.description} onChange={(e) => handleInputchange(item._id , "description" , e.target.value)} disabled={editingmode !== item._id ? true : false}/>
                          </div>
                          <div>
                              <span>Location: </span>
                              <textarea rows={'5'} value={item.location} onChange={(e) => handleInputchange(item._id , "location" , e.target.value)} disabled={editingmode !== item._id ? true : false}/>
                          </div>
                        </div>
                        </div>

                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {
                              editingmode === item._id ? (
                                <>
                                <button onClick={() => handleupdatejob(item._id)} className='check_btn'><FaCheck/></button>
                                <button onClick={() => handledisable()} className='cross_btn'><RxCross2/></button>
                                </>
                              ) : <button onClick={() => handleenable(item._id)} className='edit_btn'>Edit</button>
                            }
                          </div>
                          <button onClick={() => handlejobdelete(item._id)} className='delete_btn'>Delete</button>
                        </div>

                    </div>
                  // )
                ))
              }

            </div>
            
          </>) : <p>No Jobs Posted</p>
        }

      </div>
      </div>
    </>
  )
}

export default MyJobs
