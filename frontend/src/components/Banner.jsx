import React from 'react'
import bannerImg from "../assets/images/banner_img.png"
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='d-flex bg-light rounded px-3 px-sm-4 px-md-5 px-lg-3 my-5 mx-md-5'>
            {/*------- Left Side --------- */}
            <div className='flex-fill py-4 py-md-5 py-lg-6 py-xl-8 ps-lg-5'>
            <h1 className='display-6 text-info font-weight-semibold'>
                    Book Appointment <br/> with ease
                </h1>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className="btn btn-primary text-white px-4 py-2 rounded-pill font-weight-light pointer" href="#services">Book Appointment</button>

            </div>
            {/*------- Right Side --------- */}
            <div className='d-none d-md-block col-md-6 banner'>
            <img className='w-100 position-absolute bottom-1 end-0 banner-img' src={bannerImg} alt="" />
            </div>
        </div>
    )
}

export default Banner