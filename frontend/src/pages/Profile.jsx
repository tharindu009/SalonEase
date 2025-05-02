import React, { useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Profile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [userData, setUserData] = useState(false);

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

    const loadUserPorfileData = async () => {

        try {
            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } });
            if (data.success) {
                console.log(data.userData);

                setUserData(data.userData);

                console.log(userData.name);
            }
            else {
                console.log(data.message);
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            loadUserPorfileData();
        }
        else {
            setUserData(false);
        }
    }, [token])


    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)

            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }


    return userData ? (
        <div className="container mt-5">
            <div className="d-flex flex-column gap-2">
                <small>
                    {isEdit
                        ? <input className='bg-light text-primary h1 font-weight-medium' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                        : <p className='font-weight-bold display-4 text-dark mt-4'>{userData.name}</p>
                    }

                    <hr className='bg-secondary' />

                    <div>
                        <p className='text-muted text-decoration-underline mt-3'>CONTACT INFORMATION</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                            <p className='font-medium'>Email id:</p>
                            <p className='text-blue-500'>{userData.email}</p>

                            <p className='font-medium'>Phone:</p>

                            {isEdit
                                ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                                : <p className='text-blue-500'>{userData.phone}</p>
                            }


                        </div>
                    </div>

                    <div>
                        <p className='text-muted text-decoration-underline mt-3'>BASIC INFORMATION</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                            <p className='font-medium'>Gender:</p>

                            {isEdit
                                ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <p className='text-gray-500'>{userData.gender}</p>
                            }

                            <p className='font-medium'>Birthday:</p>

                            {isEdit
                                ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                : <p className='text-gray-500'>{userData.dob}</p>
                            }

                        </div>
                    </div>

                    <div className='mt-10'>

                        {isEdit
                            ? <button onClick={updateUserProfileData} className='btn btn-light px-4 py-2 rounded-pill font-weight-light'>Save information</button>
                            : <button onClick={() => setIsEdit(true)} className='btn btn-light px-4 py-2 rounded-pill font-weight-light'>Edit</button>
                        }

                    </div>
                </small>
            </div>
        </div>

    ) : null
}

export default Profile