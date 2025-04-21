import React from 'react'
import header_image from '../assets/images/header_image.png'

const Header = () => {
  return (

    <div className="header-section rounded">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end order-md-2">
            <img src={header_image} alt="Baber Group" className="img-fluid" />
          </div>
          <div className="col-md-6 text-white text-center text-md-start order-md-1 py-3">
            <h1>Book Appointment</h1>
            <h1>with ease</h1>
            <p>simply check our services offerd, schedule your appointment hassle-free.</p>
            <a href="#services" className="btn btn-light mt-3 rounded-pill px-5">Book appointment →</a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Header