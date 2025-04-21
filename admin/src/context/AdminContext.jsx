import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [services, setService] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    //Get All Services
    const getAllServices = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/service-list", {}, { headers: { aToken } });
            if (data.success) {
                setService(data.services);
                console.log(data.services);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    //Change Availability
    const changeAvailability = async (serId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { serId }, { headers: { aToken } });
            //console.log(serId);
            //Check data available
            if (data.success) {
                toast.success(data.message);
                getAllServices();
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } });
            console.log(data);
            console.log("getAllAppointments");
            if (data.success) {
                console.log(data.appointments);
                setAppointments(data.appointments);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl, services,
        getAllServices, changeAvailability,
        appointments, setAppointments,
        getAllAppointments
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider