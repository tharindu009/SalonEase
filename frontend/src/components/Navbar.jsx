import React, { useContext, useState } from 'react'
import logo from '../assets/images/logo.svg'
import profile_pic from '../assets/images/profile_pic.png'
import dropdown_icon from '../assets/images/dropdown_icon.svg'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (

        <div className="d-flex justify-content-between align-items-center text-sm py-2 mb-5 border-bottom border-secondary">
            <img onClick={() => navigate('/')} className='img-fluid w-44 pointer' src={logo} alt="Logo" />
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="toggler-icon top-bar"></span>
                    <span className="toggler-icon middle-bar"></span>
                    <span className="toggler-icon bottom-bar"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <NavLink className="navbar-nav ms-auto" to='/'>
                        <li className="nav-item nav-link">
                            Home
                        </li>
                        <hr />
                    </NavLink>
                    <NavLink className="navbar-nav ms-auto" to="/service">
                        <li className="nav-item nav-link">
                            Services
                        </li>
                        <hr />
                    </NavLink>
                    <NavLink className="navbar-nav ms-auto" to="/about">
                        <li className="nav-item nav-link">
                            About Us
                        </li>
                        <hr />
                    </NavLink>
                    <NavLink className="navbar-nav ms-auto" to="/contact">
                        <li className="nav-item nav-link">
                            Contact Us
                        </li>
                        <hr />
                    </NavLink>
                </div>
            </nav>
            <div className='d-flex align-items-center gap-4 '>
                {
                    token
                        ? <div className='d-flex align-items-center gap-2 cursor-pointer position-relative'>
                            <img className="rounded-circle profile-pic border border-primary" src={profile_pic} alt="profile picture" />


                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className='w-20' src={dropdown_icon} alt="" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item pointer" onClick={() => navigate('/my-profile')}>My Profile</a></li>
                                        <li><a className="dropdown-item pointer" onClick={() => navigate('/my-appointments')}>My Appointments</a></li>
                                        <li><a className="dropdown-item pointer" onClick={logout}>Logout</a></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                        : <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className="btn btn-primary text-white px-4 py-2 rounded-pill font-weight-light d-none d-md-block" >Create Account</button>
                }
            </div>
        </div >

    )
}

export default Navbar