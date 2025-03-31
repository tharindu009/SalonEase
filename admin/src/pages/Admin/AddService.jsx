import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddService = () => {

    const [serviceImg, setServiceImg] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [fees, setFees] = useState('');
    const [desc, setDesc] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!serviceImg) {
                return toast.error("Image Not Selected")
            }

            const formData = new FormData();
            formData.append('image', serviceImg);
            formData.append('name', serviceName);
            formData.append('fees', Number(fees));
            formData.append('desc', desc);

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-service', formData, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                setServiceImg(false);
                setServiceName('');
                setFees('');
                setDesc('');
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="container mt-4 mb-3">
                <h4 className='mb-2'>Add Service</h4>
                <div className='bg-white p-4 border rounded'>
                    <div className="align-items-start d-flex align-items-center mb-3 text-muted">
                        <label htmlFor="service-img">
                            <img className='upload-image w-16 bg-light cursor-pointer' src={serviceImg ? URL.createObjectURL(serviceImg) : assets.Upload_image} alt="" />
                        </label>
                        <input onChange={(e) => setServiceImg(e.target.files[0])} type="file" id='service-img' hidden />
                        <p className='px-4'>Upload Service <br /> Picture</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="ServiceName" className="form-label">Service name</label>
                            <input onChange={(e) => setServiceName(e.target.value)} value={serviceName} type="text" className="form-control" id="ServiceName" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="fees" className="form-label">Fees</label>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" className="form-control" id="fees" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Description</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className="form-control" id="desc" rows="3" required></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Add Service</button>
                </div>
            </div>
        </form>
    )
}

export default AddService