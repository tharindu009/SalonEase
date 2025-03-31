import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const ServiceList = () => {

  const { services, aToken, getAllServices } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllServices()
    }
  }, [aToken])


  return (
    <div className="mt-4">
    <h4 className='mb-2'>All Doctors</h4>
    <div className='container'>
    <div className="row">
      {services.map((item, index) => (
        <div className="col-md-4 col-lg-4 overflow-hidden group" key={index}>
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
                <input type="checkbox" checked={item.available} />
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