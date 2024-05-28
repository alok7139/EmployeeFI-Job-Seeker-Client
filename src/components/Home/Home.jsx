import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom';
import Herosection from './Herosection'
import Howitworks from './Howitworks'
import Popularcategory from './Popularcategory'
import Popularcompanies from './Popularcompanies'


function Home() {
  const {isauthorized} = useContext(Context);
  if(!isauthorized){
    return <Navigate to={'/login'}/>
  }
  return (
    <section className='homePage page'>
      <Herosection/>
      <Howitworks/>
      <Popularcategory/>
      <Popularcompanies/>

    </section>
  )
}

export default Home
