import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {

    const { backendUrl, token, getAllServices } = useContext(AppContext);

    const [appointments, setAppointments] = useState([]);

    const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {

            const {data} = await axios.get(backendUrl + "/api/user/appointments",{headers:{token}});
            
            if(data.success){
                setAppointments(data.appointments.reverse());
                console.log(data.appointments);
            }
            
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // Function to cancel an appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            //console.log(appointmentId);
            const {data} = await axios.post(backendUrl + "/api/user/cancel-appointment",{appointmentId},{headers:{token}});
            
            if(data.success){
                toast.success(data.message);
                getUserAppointments();
                getAllServices();
            }
            else{
                toast.error(data.message);
            }
            
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(token){
            getUserAppointments();
        }
    },[]);

  return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Appointments</h2>
            </div>
            {appointments.map((item,index) => (
                <div key={index} className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-2">
                            <img
                                src={item.serviceData.image}
                                className="img-fluid rounded-start"
                                alt=""
                            />
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{item.serviceData.name}</h5>
                                <p className="card-text fw-bold">
                                    Date & Time: <span className='fw-lighter'> {slotDateFormat(item.slotDate)} | {item.slotTime} </span>
                                </p>
                                <div className="d-flex justify-content-end">
                                {item.cancelled && (
                    <p className='text-danger'>Appointment Cancelled</p>
                  )}
                                    {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="btn btn-outline-danger">
                                        Cancel appointment
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyAppointments;