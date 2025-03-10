import React from 'react'
import header_image from '../assets/images/header_image.png'

const Header = () => {
    return (
        <div className='d-flex flex-column flex-md-row flex-wrap bg-light rounded px-3 px-md-4 px-lg-5'>
            <div className='col-md-6 d-flex flex-column align-items-start justify-content-center gap-4 py-10 mx-auto mb-[-30px] header-image-left'>
                <p className='display-6 text-info font-weight-semibold'>
                    Book Appointment <br/> with ease
                </p>
                <div className='d-flex flex-column flex-md-row align-items-center gap-3 text-primary small fw-light'>
                    <p>
                        simply check our services offerd<br className='d-none d-sm-block' /> schedule your appointment hassle-free.
                    </p>
                </div>
                <a className="btn btn-primary text-white px-4 py-2 rounded-pill font-weight-light pointer" href="#services">Book Appointment</a>
            </div>
            {/*--------------*/}
            <div className='d-flex flex-column justify-content-center col-md-6 position-relative'>
                <img className='position-absolute bottom-2 h-auto rounded d-none d-md-block' src={header_image} alt="" />
            </div>

        </div>

    )
}

export default Header