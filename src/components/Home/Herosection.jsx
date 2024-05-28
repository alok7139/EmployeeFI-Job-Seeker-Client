import React from 'react'
import {FaSuitcase , FaBuilding , FaUsers , FaUserPlus} from 'react-icons/fa'

function Herosection() {


  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className='heroSection'>
      <div className='container'>
        <div className='title'>
          <h1>Discover Your Dream Job Today</h1>
          <i style={{fontSize:"20px"}}>
          Welcome to <b style={{color:"darkviolet"}}>EmployeeFI</b>, where your professional aspirations meet their perfect match. Our platform is designed to connect you with opportunities that not only align with your skills and passions but also propel your career to new heights. Whether you are seeking a role that challenges you, a company that values your contributions, or a position that offers significant growth potential, <b style={{color:"darkviolet"}}>EmployeeFI</b> is here to guide you every step of the way. Unlock your potential and take the next step towards achieving your career goals with us. Your dream job is just a click away.
          </i>

        </div>
        <div className='image'>
          <img src='/heroS.jpg' alt='hero'/>

        </div>

      </div>

      <div className="details">
        {
          details.map((item) => {
            return (
              <div className='card' key={item.id}>
                <div className='icon'>{item.icon}</div>
                <div>
                  <p>{item.title}</p>
                  <p>{item.subTitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>

      
    </div>
  )
}

export default Herosection
