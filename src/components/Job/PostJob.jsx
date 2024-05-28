import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function PostJob() {
   
  const  {isauthorized,user} = useContext(Context);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("")
  const [category, setcategory] = useState("")
  const [country, setcountry] = useState("")
  const [city, setcity] = useState("")
  const [location, setlocation] = useState("")
  const [salaryFrom, setsalaryFrom] = useState("")
  const [salaryTo, setsalaryTo] = useState("")
  const [fixedsalary,setfixedsalary] = useState("")
  const [salaryType, setsalaryType] = useState("default");

  const handleJobPost = async(e) => {
    e.preventDefault();
    if(salaryType === "fixedsalary"){
      setsalaryFrom("");
      setsalaryTo("");
    }
    else if(salaryType === "Ranged Salary"){
      setfixedsalary("");
    }
    else{
      setsalaryFrom("");
      setsalaryTo("");
      setfixedsalary("");
    }

    await axios.post("https://employeefi-job-seeker-app.onrender.com/get/job/createjob" , fixedsalary.length>=4 ? {title,category,country,city,location, fixedsalary,description}:{title,category,country,city,location, salaryFrom,salaryTo,description},{withCredentials:true , headers:{"Content-Type":"application/json",},})
    .then((res) => toast.success(res.data.message))
    .catch((err) => {
      toast.error(err.response.data.message);
      console.log(err);
    })
    settitle("");
    setcategory("");
    setcountry("")
    setcity("")
    setsalaryFrom("")
    setdescription("")
    setsalaryTo("")
    setfixedsalary("")
    setlocation("");
  }

  const navigate = useNavigate();
  if(!isauthorized || user && user.role !== "Employee"){
    navigate("/");
  }






  return (
    <>
     <div className="job_post page">
       <div className='container'>
        <h3>Posted New Job</h3>
        <form onSubmit={handleJobPost}>
          <div className='wrapper'>
            <input type='text' value={title} onChange={(e) => settitle(e.target.value)} placeholder='Job Title'/>
            <select value={category} onChange={(e) => setcategory(e.target.value)}>
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

          <div className="wrapper">
            <input type='text' value={country} onChange={(e) => setcountry(e.target.value)} placeholder='Country'/>
            <input type='text' value={city} onChange={(e) => setcity(e.target.value)} placeholder='City'/>
          </div>

          <input type='text' value={location} onChange={(e) => setlocation(e.target.value)} placeholder='Location'/>

          <div className='salary_wrapper'>
            <select value={salaryType} onChange={(e) => setsalaryType(e.target.value)}>
              <option value="default">Select Salary Type</option>
              <option value="fixedsalary">Starting Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div >
              {
                salaryType === "default" ? (<p>Please Provide Salary Type *</p>) : 
                salaryType === "fixedsalary" ? (
                  <input type='number' placeholder='Enter Starting Salary' value={fixedsalary} onChange={(e) => setfixedsalary(e.target.value)}/>
                ) : (
                  <div className='ranged_salary'>
                    <input type='number' placeholder='Ranged From' value={salaryFrom} onChange={(e) => setsalaryFrom(e.target.value)}/>
                    <input type='number' placeholder='Ranged To' value={salaryTo} onChange={(e) => setsalaryTo(e.target.value)}/>
                       
                  </div>
                )
              }

            </div>

          </div>

          <textarea rows={"10"} value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Description'/>
          <button type='submit'>Posted Job</button>


        </form>

       </div>
     </div>
    </>
  )
}

export default PostJob
