import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import verified_icon from '../assets/images/verified_icon.svg'
import info_icon from '../assets/images/info_icon.svg'
import ServiceMenu from '../components/ServiceMenu'
import BestPricing from '../components/BestPricing'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointments = () => {

    const { serviceId } = useParams();
    const { services, backendUrl, token, getAllServices } = useContext(AppContext);
    const [serviceSlots, setServiceSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [serviceInfo, setServiceInfo] = useState(null);

    const fetchServiceInfo = async () => {
        const serviceInfo = services.find(ser => ser._id === serviceId);
        setServiceInfo(serviceInfo);
        //console.log(serviceInfo);
    }

    const getAvailableSlots = async () => {
        setServiceSlots([]);

        //get todays date
        let today = new Date();
        const noOfdays = 7;

        for (let i = 0; i < noOfdays; i++) {
            //debugger;
            // getting date with index 
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(18, 0, 0, 0)

            //let workingHours = 10;
            let startTime = 10;
            let curretnHour = currentDate.getHours();
            let currentMin = currentDate.getMinutes();

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                //currentDate.setHours(curretnHour > startTime ? currentDate.getHours() + 1 : startTime);
                //currentDate.setMinutes(currentMin > 30 ? 30 : 0);
                if (curretnHour >= startTime && currentMin > 30) {
                    currentDate.setHours(curretnHour + 1);
                    currentDate.setMinutes(0);
                }
                else if (curretnHour >= startTime && currentMin < 30) {
                    currentDate.setHours(curretnHour);
                    currentDate.setMinutes(30);
                }
                else {
                    currentDate.setHours(startTime);
                    currentDate.setMinutes(0);
                }

            } else {
                currentDate.setHours(startTime)
                currentDate.setMinutes(0)
            }



            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();
                const slotDate = day + '_' + month + '_' + year;
                const slotTime = formattedTime;

                const isSlotAvilable = serviceInfo.slots_booked[slotDate] && serviceInfo.slots_booked[slotDate].includes(slotTime)?false:true;

                //add slots to array
                if (isSlotAvilable) {
                    //console.log("Slot available");
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    });
                }

                
                // timeSlots.push({
                //     datetime: new Date(currentDate),
                //     time: formattedTime
                // });

                //Increment current time by 30min
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setServiceSlots(prev => ([...prev, timeSlots]));


        }
    }

    // call book appointment api
    const bookAppointment = async () => {

        if(!token) {
            toast.warn("Please login to book an appointment");
            return navigate('/login');
        }

        try {
            
            const date = serviceSlots[slotIndex][0].datetime;
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + '_' + month + '_' + year; 

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment',{serviceId, slotDate, slotTime},{headers:{token}});

            console.log(data.success);
            
            if (data.success) {
                
                toast.success(data.message);
                console.log("I am here");
                getAllServices();
                navigate('my-appointments');
            } 
            else {       
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {

        fetchServiceInfo();

    }, [services, serviceId]);

    useEffect(() => {
        getAvailableSlots()
    }, [serviceInfo]);

    useEffect(() => {
        console.log(serviceSlots)
    }, [serviceSlots]);


    return serviceInfo && (
        <div className='container-fluid'>
            {/*-------- Service Detail -----------*/}
            <div className='row'>
                <div className='col-md-3 col-xs-5 '>
                    <img className='w-100 rounded-lg img-thumbnail' src={serviceInfo.image} alt="" />
                </div>

                <div className='col-md-9 col-xs-7 flex-grow border border-secondary rounded py-3'>
                    {/* ------ Service detail-------- */}
                    <p className='d-flex align-items-center gap-2 h6 font-weight-medium text-secondary'>
                        {serviceInfo.name}
                        <img src={verified_icon} alt="" />
                    </p>
                    <div className='col-md-9 col-xs-12'>
                        <p className='d-flex align-items-center gap-1 mt-3 app-desc'>Description <img src={info_icon} alt="" /></p>
                        <p className='text-muted small mt-1 app-desc'>{serviceInfo.desc}</p>
                        <hr />
                        <p className='text-secondary font-weight-medium mt-2'>Appointment fee: <span className='text-dark'>$ {serviceInfo.fees} </span></p>
                    </div>
                </div>

            </div>
            <div className='row'>
                <div className='col-md-3'>

                </div>
                <div className='col-md-9'>
                    {/* -------- Date Slots --------- */}
                    <div className='ml-5 mt-4 fw-medium text-secondary'>
                        <p >Booking slots</p>
                        <div className='d-flex align-items-center w-100 overflow-auto mt-4' style={{ gap: '12px' }}>
                            {
                                serviceSlots.length && serviceSlots.map((item, index) => (
                                    <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 pointer appointment-date 
                                    ${slotIndex === index ? 'bg-primary text-white' : 'border border-primary'}`}>
                                        <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                        <p>{item[0] && item[0].datetime.getDate()}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* ------ Time Slots ---------- */}
                    <div className='d-flex align-items-center gap-3 w-100 overflow-auto mt-4'>
                        {
                            serviceSlots.length && serviceSlots[slotIndex].map((item, index) => (
                                <p onClick={() => setSlotTime(item.time)} key={index} className={`btn btn-light btn-sm badge rounded-pill px-4 py-2 pointer
                            ${item.time === slotTime ? 'bg-primary text-white' : 'border border-primary text-black'}`}>{item.time}</p>
                            ))}
                    </div>
                    <div>
                        <button onClick={bookAppointment} className='btn btn-primary btn-sm rounded-pill px-4 py-2 my-5'>Book an appointment</button>
                    </div>
                </div>
            </div>
            {/* ---------- Other Services ------------ */}
            <div>
                <BestPricing></BestPricing>
            </div>
        </div>
    )
}

export default Appointments