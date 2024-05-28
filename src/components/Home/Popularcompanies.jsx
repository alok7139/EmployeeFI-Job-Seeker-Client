import React from 'react'
import { FaMicrosoft, FaAmazon , FaGoogle} from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";

function Popularcompanies() {

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Flipkart",
     
      openPositions: 5,
      icon: <SiFlipkart />,
    },
    {
      id: 3,
      title: "Amazon",
  
      openPositions: 20,
      icon: <FaAmazon />,
    },
    {
      id: 4,
      title: "Google",
  
      openPositions: 30,
      icon: <FaGoogle />,
    },
  ];

  return (
    <div className='companies'>
      <div className='container'>
        <h3>Top Recruiting Companies</h3>
        <div className='banner'>
          {
            companies.map((item) => {
              return (
                <div className='card' key={item.id}>
                  <div className='content'>
                    <div className='icon'>{item.icon}</div>
                    <div className='text'>
                      <p>{item.title}</p>
                      <p>PAN INDIA</p>
                    </div>
                  </div>
                  <button>Open Position {item.openPositions}</button>

                </div>
              )
            })
          }

        </div>



      </div>
      
    </div>
  )
}

export default Popularcompanies
