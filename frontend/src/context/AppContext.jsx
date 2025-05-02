import { createContext, useState, useEffect } from "react";
// import { prices } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [services, setServices] = useState([]);

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

    const [userData, setUserData] = useState(false);

    const getAllServices = async () => {
        try {

            const { data } = await axios.get(backendUrl + "/api/service/list");
            if (data.success) {
                setServices(data.services);
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

    const loadUserPorfileData = async () => {

        try {
            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } });
            if (data.success) {
                setUserData(data.user);
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
        getAllServices();
    }, [])

    useEffect(() => {
        if (token) {
            loadUserPorfileData();
        }
        else {
            setUserData(false);
        }
    }, [token])

    const value = {
        services, getAllServices,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserPorfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider