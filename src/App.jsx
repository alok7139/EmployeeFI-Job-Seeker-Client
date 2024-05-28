import React, { useEffect } from 'react'
import './App.css'
import { useState , useContext } from 'react'
import { Context } from './main'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import Jobdetails from './components/Job/Jobdetails'
import Myjobs from './components/Job/MyJobs'
import PostJob from './components/Job/PostJob'
import Application from './components/Application/Application'
import MyApplication from './components/Application/MyApplication'
import Notfound from './components/Notfound/Notfound'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'


function App() {

   const {isauthorized,setisauthorized,user,setuser} = useContext(Context);
   

   // iseffect jab chalta hai jab page refeesh hoga bar bar 
   useEffect(() => {
    const fetchuser = async() =>{
      try {
        const response = await axios.get("https://employeefi-job-seeker-app.onrender.com/get/user/getuser" , {withCredentials:true});
        setuser(response.data.user);
        setisauthorized(true);
        console.log(isauthorized)
      } catch (error) {
        setisauthorized(false);
      }
    }
    fetchuser();
   } , [isauthorized]);

   

   





  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/job/getall' element={<Jobs/>}/>
        <Route path='/job/:id' element={<Jobdetails/>}/>
        <Route path='/job/create' element={<PostJob/>}/>
        <Route path='/job/user' element={<Myjobs/>}/>
        <Route path='/application/user' element={<MyApplication/>}/>
        <Route path='/application/:id' element={<Application/>}/>
        
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      <Footer/>
      <Toaster position='top-center' autoClose={500000} hideProgressBar/>

    </>
  )
}

export default App
