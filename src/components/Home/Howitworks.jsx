import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'

function Howitworks() {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How EmployeeFI Works?</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus/>
            <p>Create your Account</p>
            <p></p>

          </div>
          <div className='card'>
            <MdFindInPage/>
            <p>Find your dream Job</p>or
            <p>Post Job</p>
            <p>Achieve Your Career Goals, Find Your Dream Job Here</p>
            

          </div>
          <div className='card'>
            <IoMdSend/>
            <p>Apply for Job</p>or
            <p>Recruit Candidates</p>
            <p>Your Path to Success, Apply the Job That Elevates Your Career</p>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default Howitworks
