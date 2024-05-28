import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import ResumeModel from './ResumeModel'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function MyApplication() {
  const {isauthorized,user } = useContext(Context)
  const navigate = useNavigate();

  const [application, setapplication] = useState([])
  const [modalopen, setmodalopen] = useState(false)
  const [resumemodal, setresumemodal] = useState("");
  

  useEffect(() => {
    try {
      if(user && user.role === "Employee"){
        axios.get("https://employeefi-job-seeker-app.onrender.com/get/application/employee/getall" , {withCredentials:true})
        .then((res) => {
          setapplication(res.data.application)
        })
      }
      else{
        axios.get("https://employeefi-job-seeker-app.onrender.com/get/application/jobseeker/getall" , {withCredentials:true})
        .then((res) => {
          setapplication(res.data.application)
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  } , [isauthorized])

  useEffect(() => {
    if (!isauthorized) {
      navigate('/login');
    }
  }, [isauthorized, navigate]);

   const deleteapplication = async(id) => {
    try {
       await axios.delete(`https://employeefi-job-seeker-app.onrender.com/get/application/delete/${id}` , {withCredentials:true})
      .then((res) => {
        toast.success(res.data.message);
        setapplication(prevApplication => {
          prevApplication.filter(application => application._id !== id)
        });
      });
      navigate("/");
    } catch (error) {
        toast.error(error.response.data.message);
    }
   }

   const openmodal = (imageUrl) => {
     setresumemodal(imageUrl)
     setmodalopen(true);
   }
   const closemodal = () => {
     setmodalopen(false);
   }

  return (
    <>
        <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          { application.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            application.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteapplication={deleteapplication}
                  openmodal={openmodal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Candidate's Applications</h1>
          {application.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            application.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openmodal={openmodal}
                />
              );
            })
          )}
        </div>
      )}
      {modalopen && (
        <ResumeModel imageUrl={resumemodal} onClose={closemodal} />
      )}
    </section>
    </>
  )
}

export default MyApplication

const JobSeekerCard = ({ element, deleteapplication, openmodal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverletter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openmodal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteapplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openmodal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverletter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openmodal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
