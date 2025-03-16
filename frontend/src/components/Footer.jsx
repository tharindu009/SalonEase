import React from 'react'
import logo from '../assets/images/logo.svg'


const Footer = () => {
    return (
        <div className='mx-5 mx-md-3'>
            <div className='d-flex flex-column my-5 mt-5'>
                <div className='row g-4'>
                {/*------ Left Section --------*/}
                <div className='col-md-6 col-sm-12'>
                    <img className='mb-2' src={logo} alt='logo'></img>
                    <p className='w-80 w-md-66 text-secondary'>
                        Lorem ipsum dolor sit amet elit. Quisque eu lectus a leo dictum nec non quam. Tortor eu placerat rhoncus, lorem quam iaculis felis, sed lacus neque id eros.
                    </p>

                </div>

                {/*-------- Center Section ---------*/}
                <div className='col-md-3 col-sm-12'>
                    <p className='fs-5'>
                        COMPANY
                    </p>
                    <ul className='d-flex flex-column gap-2 text-secondary'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/*-------- Right Section ---------*/}
                <div className='col-md-3 col-sm-12'>
                    <p className='fs-5'>
                        GET IN TOUCH
                    </p>
                    <ul className='d-flex flex-column gap-2 text-secondary'>
                        <li>+012 345 67890</li>
                        <li>info@salonease.com</li>
                    </ul>
                </div>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 @ salonease - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer