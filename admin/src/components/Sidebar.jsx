import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets';

const Sidebar = () => {


    const { aToken } = useContext(AdminContext);


    return (
        // <div className='container d-flex flex-column flex-md-row'>
        <nav className='navbar navbar-expand-md navbar-light d-flex flex-md-column'>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent'
                aria-expanded='false' aria-label='Toggle Navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse w-100 bg-white' id='navbarSupportedContent'>{
                aToken &&
                <ul>
                    <NavLink to={'/admin-dashboard'} className={({ isActive }) => `d-flex align-items-center gap-3 py-3 px-3 px-md-9 min-w-72 cursor-pointer 
                        ${isActive ? 'bg-light border-end border-primary' : ''}`}>
                        <img className='svg-size' src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to={'/all-appointments'} className={({ isActive }) => `d-flex align-items-center gap-3 py-3 px-3 px-md-9 min-w-72 cursor-pointer 
                        ${isActive ? 'bg-light border-end border-primary' : ''}`}>
                        <img className='svg-size' src={assets.appointments_icon} alt="" />
                        <p>All Appointments</p>
                    </NavLink>
                    <NavLink to={'/add-service'} className={({ isActive }) => `d-flex align-items-center gap-3 py-3 px-3 px-md-9 min-w-72 cursor-pointer 
                        ${isActive ? 'bg-light border-end border-primary' : ''}`}>
                        <img className='svg-size' src={assets.add_icon} alt="" />
                        <p>Add Service</p>
                    </NavLink>
                    <NavLink to={'/service-list'} className={({ isActive }) => `d-flex align-items-center gap-3 py-3 px-3 px-md-9 min-w-72 cursor-pointer 
                        ${isActive ? 'bg-light border-end border-primary' : ''}`}>
                        <img className='svg-size' src={assets.list_icon} alt="" />
                        <p>All Service</p>
                    </NavLink>
                    <NavLink to={'/customers-list'} className={({ isActive }) => `d-flex align-items-center gap-3 py-3 px-3 px-md-9 min-w-72 cursor-pointer 
                        ${isActive ? 'bg-light border-end border-primary' : ''}`}>
                        <img className='svg-size' src={assets.people_icon} alt="" />
                        <p>Customers</p>
                    </NavLink>
                </ul>
            }
            </div>
        </nav>
        // </div>
    )
}

export default Sidebar