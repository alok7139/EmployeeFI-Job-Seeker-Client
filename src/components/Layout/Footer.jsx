import React from 'react'
import { Context } from '../../main'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {FaLinkedin , FaGithub} from 'react-icons/fa'
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  const {isauthorized,setisauthorized,user }  =useContext(Context)
  return (
    <>
     <footer className={isauthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By EmployeeFI</div>
      <div>
        <Link to={'/'} target=''><FaGithub/></Link>
        <Link to={'/'} target=''><FaLinkedin/></Link>
        <Link to={'/'} target=''><AiFillInstagram /></Link>
      </div>
     </footer>
    </>
  )
}

export default Footer
