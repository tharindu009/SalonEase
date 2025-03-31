import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext);

    const navigate = useNavigate();

    const logout = () =>{
        navigate('/')
        aToken && setAToken ('')
        aToken && localStorage.removeItem('aToken')
    }

    return (
        <nav className="navbar navbar-light bg-white">
            <div className="container-fluid d-flex align-items-center gap-2 small">
                <a className="navbar-brand" href="#">
                    <img src={assets.admin_logo} alt="Logo" height="30" className="d-inline-block align-top" />
                </a>
                <p className='border px-2 py-0.5 rounded-pill border-secondary text-secondary'>{aToken ? 'Admin' : ''}</p>
                {/* <button className="btn btn-outline-secondary btn-sm me-2">Admin</button> */}
                <button onClick={logout} className="btn btn-primary px-4 py-2 rounded-pill">Logout</button>
            </div>
        </nav>
    )
}

export default Navbar