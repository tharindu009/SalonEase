import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';



const BestPricing = () => {

    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [services, setServices] = useState([]);

    const getAllServices = async () => {
        try {

            const { data } = await axios.get(backendUrl + "/api/service/list");
            if (data.success) {
                setServices(data.services);
            }
            else {
                console.log(data.message);
                //toast.error(data.message);
            }

        } catch (error) {
            console.log(error.message);
            //toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllServices();
    }, [])

    return (
        <div className='d-flex flex-column align-items-center my-4 text-dark mx-md-5'>
            <p className='col-sm-4 text-center small text-secondary'>Our Best Pricing</p>
            <h3 className='font-weight-medium'>We Provide Best Price in the City</h3>
            <div className="container price">
                <div className='row'>
                    {services.slice(0, 12).map((item, index) => (
                        <div onClick={() => { navigate(`/appointments/${item._id}`); scrollTo(0, 0) }} key={index} className="col-lg-3 col-md-4 col-sm-6 pointer">
                            <div className="price-item">
                                <div className="price-img">
                                    <img src={item.image} alt="Image" />
                                </div>
                                <div className="price-text">
                                    <h2>{item.name}</h2>
                                    <h3>{item.price}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestPricing