import React from 'react'
import header_image from '../assets/images/header_image.png'

const Header = () => {
    return (
        <div className='d-flex flex-column flex-md-row flex-wrap bg-light rounded p-3 p-md-4 p-lg-5'>
            <div className='col-md-6 d-flex flex-column align-items-start justify-content-center gap-4 py-6 mx-auto'>
                <h1 className='display-6 text-info font-weight-semibold'>
                    Book Appointment <br/> with ease
                </h1>
                <div className='d-flex flex-column flex-md-row align-items-center gap-3 text-primary small fw-light'>
                    <p>
                        simply check our services offerd<br className='d-none d-sm-block' /> schedule your appointment hassle-free.
                    </p>
                </div>
                <a className="btn btn-primary text-white px-4 py-2 rounded-pill font-weight-light pointer" href="#services">Book Appointment</a>
            </div>
            {/*--------------*/}
            <div className='d-flex flex-column justify-content-center col-md-6 position-relative'>
                <img className='w-100 position-absolute h-auto rounded d-none d-md-block' src={header_image} alt="" />
            </div>

        </div>

    )
}

export default Header