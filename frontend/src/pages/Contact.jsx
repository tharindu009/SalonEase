import React from 'react'
import contactus from '../assets/images/contactus.jpg'

const Contact = () => {
    return (
        <div>
            <div className='text-center display-4 pt-5 text-secondary'>
                <h1>Contact Us</h1>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                        <img src={contactus} alt="" />
                    </div>
                    <div className='col-md-8 col-sm-12 row g-3 d-flex justify-content-center'>
                        <p class="font-weight-semibold h5 text-muted">OUR OFFICE</p>
                        <p class="text-muted">54709 Main Street <br /> Suite 350, Saskatoon, SK</p>
                        <p class="text-muted">Tel: (123) 456-7890 <br /> Email: info@salonease.com</p>

                        <p class="text-muted">Learn more about our team and job openings.</p>
                        <button class="btn btn-outline-dark px-4 py-2">Contat Us</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact