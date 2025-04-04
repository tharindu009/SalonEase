import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const ServiceList = () => {

  const { services, aToken, getAllServices,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllServices()
    }
  }, [aToken])


  return (
    <div className=" mt-4 mb-3">
    <div className='container'>
    <h4 className='mb-2'>All Services</h4>
    <div className="row">
      {services.map((item, index) => (
        <div className="col-md-2 overflow-hidden group" key={index}>
          <div className="card pointer">
            <div className="text-center">
              <img
                src={item.image}
                alt={item.name}
                className="mt-3"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            </div>
            <div className="card-body text-center">
              <h6 className="card-title">{item.name}</h6>
              <p className="card-text text-seconday">$ {item.fees}</p>
              <div className='mt-2 d-flex align-items-center gap-1 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p className='text-secondary service-check'>Available </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  </div>
  )
}

export default ServiceList