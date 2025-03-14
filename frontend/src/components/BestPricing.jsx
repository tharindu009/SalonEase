import React from 'react'
import { prices } from '../assets/assets'



const BestPricing = () => {
    return (
        <div className='d-flex flex-column align-items-center my-4 text-dark mx-md-5'>
            <p className='col-sm-4 text-center small text-secondary'>Our Best Pricing</p>
            <h3 className='font-weight-medium'>We Provide Best Price in the City</h3>
            <div class="container price">
                <div className='row'>

                    {prices.slice(0, 12).map((item, index) => (
                        <div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="price-item">
                                <div class="price-img">
                                    <img src={item.image} alt="Image" />
                                </div>
                                <div class="price-text">
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