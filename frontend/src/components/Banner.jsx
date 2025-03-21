import React from 'react'
import bannerImg from "../assets/images/banner_img.png"
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className=' d-flex header-section rounded px-3 px-sm-4 px-md-5 px-lg-3 my-5 mx-md-5'>
            
            {/*------- Right Side --------- */}
            <div className='d-none d-md-block col-md-6 banner order-md-2'>
            <img className='w-100 position-absolute bottom-0 banner-img' src={bannerImg} alt="" />
            </div>
            {/*------- Left Side --------- */}
            <div className='flex-fill col-md-6 py-4 py-md-5 py-lg-6 py-xl-8 ps-lg-5 order-md-1'>
            <h1 className='display-6 font-weight-semibold'>
                    Book Appointment <br/> with ease
                </h1>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className="btn btn-light px-4 py-2 rounded-pill font-weight-light" href="#services">Create Account</button>

            </div>
            
        </div>

    );
}

export default Banner