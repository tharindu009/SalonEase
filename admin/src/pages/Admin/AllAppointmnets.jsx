
import React, { useEffect, useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';


const AllAppointmnets = () => {

  const { aToken } = useContext(AdminContext);
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  console.log("atoken", aToken);

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
      //console.log("getAllAppointments");
      if (data.success) {
        //console.log(data.appointments);
        setAppointments(data.appointments);
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log("cancelAppointment", appointmentId);
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (aToken) {
      //console.log("atoken");
      getAllAppointments();
      cancelAppointment();
    }
  }, [aToken])


  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  return (
    <div className='container mt-4 mb-3'>
      <h4 className='mb-2'>All Appointments</h4>
      <div className='bg-white p-4 border rounded'>
        <div className='row border-bottom py-3 bg-body-secondary text-bold'>
          <p className='col-1'>#</p>
          <p className='col-3'>Customer Name</p>
          <p className='col-2'>Service</p>
          <p className='col-3'>Date & Time</p>
          <p className='col-2'>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='row border-bottom py-2' key={index}>
            <p className='col-1'>{index + 1}</p>
            <p className='col-3'>{item.userData.name}</p>
            <p className='col-2'>{item.serviceData.name}</p>
            <p className='col-3'>{slotDateFormat(item.slotDate)} | {item.slotTime} </p>
            <div className='col-2'>
              {/* <button className='btn btn-danger'>Cancel</button> */}
              {item.cancelled ? <p className='text-danger small font-weight-medium'>Cancelled</p> : item.isCompleted ? <p className='text-success small fw-medium'>Completed</p> :
                <img className='w-25 pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointmnets