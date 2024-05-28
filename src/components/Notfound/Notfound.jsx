import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <section className='page notfound'>
      <div className='content'>
        <img
        src='/notfound.png'
        alt='notfound'
        />
        <Link to={'/'}>Home</Link>

      </div>

    </section>
  )
}

export default Notfound
