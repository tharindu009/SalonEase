import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Dashboard = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { aToken } = useContext(AdminContext);
  const [dashData, setDashData] = useState(false);

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
      if (data.success) {
        setDashData(data.dashData);
        //console.log("Dashboard data", data.dashData);
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
      getDashboardData();
    }
  }, [aToken])


  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  return dashData && (

    <div className="container mt-4 mb-3">
      <h4 className='mb-2'>Dashboard</h4>
      <div className='bg-white p-4 border rounded'>
        <div className='row'>
          <div className='col-md-4 mb-3'>
            <div className="card text-center">
              <div className="card-body d-flex flex-column align-items-center">
                <img className='svg-size-2' src={assets.appointments_icon} alt="" />
                <h5 className="card-title">Appointments</h5>
                <p className="card-text h4 text-info">{dashData.appointments}</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className="card text-center">
              <div className="card-body d-flex flex-column align-items-center">
                <img className='svg-size-2' src={assets.customer_icon} alt="" />
                <h5 className="card-title">Customers</h5>
                <p className="card-text h4 text-info">{dashData.clients}</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-3'>
            <div className="card text-center">
              <div className="card-body d-flex flex-column align-items-center">
                <img className='svg-size-2' src={assets.list_icon} alt="" />
                <h5 className="card-title">Services</h5>
                <p className="card-text h4 text-info">{dashData.services}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row py-2 d-flex justify-content-between'>
          <hr />
          <img className='svg-size-2' src={assets.list_icon} alt="" />
          <h5>Latest Appointments</h5>
        </div>
        <div className='row border-bottom py-3 bg-body-secondary text-bold'>
          <p className='col-1'>#</p>
          <p className='col-3'>Customer Name</p>
          <p className='col-2'>Service</p>
          <p className='col-3'>Date & Time</p>
          <p className='col-2'>Action</p>
        </div>
        {dashData.latestappointments.map((item, index) => (
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

export default Dashboard