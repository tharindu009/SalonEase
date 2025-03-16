import React, { Component } from 'react'
import hair_service from '../assets/images/hair_cut.png'
import hair_color from '../assets/images/hair_coloring.png'
import hair_text from '../assets/images/hair_texture.png'
import beard_style from '../assets/images/beard_style.png'
import BestPricing from '../components/BestPricing'

const Service = () => {
    return (
        <div>
        <div className="service">
        <div className="container">
            <div className="section-header text-center">
                <p>Our Salon Services</p>
                <h2>Best Salon Services for You</h2>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="service-item">
                        <div className="service-img">
                            <img src={hair_service} alt="hair service"/>
                        </div>
                        <h3>Hair Style</h3>
                        <p>
                            Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="service-item">
                        <div className="service-img">
                            <img src={hair_color} alt="hair coloring"/>
                        </div>
                        <h3>Hair Color</h3>
                        <p>
                            Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="service-item">
                        <div className="service-img">
                            <img src={hair_text} alt="hair textering"/>
                        </div>
                        <h3>Hair Texturing</h3>
                        <p>
                            Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                        </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="service-item">
                        <div className="service-img">
                            <img src={beard_style} alt="Beard Style"/>
                        </div>
                        <h3>Beard Style</h3>
                        <p>
                            Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BestPricing/>
    </div>
    )
}

export default Service