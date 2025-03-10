import React from 'react'
import hairservice from "../assets/images/hair_service.png"
import haircolor from "../assets/images/hair_color.png"
import texturing from "../assets/images/hair_texturing.png"
import nailservice from "../assets/images/nail_service.png"

const ServiceMenu = () => {
    return (
        <div id='services' className='d-flex flex-column align-items-center py-4 text-dark'>
            <h1 className='font-weight-medium'>Our Services</h1>
            <p>Simply browse through our extensive list of services, schedule your appointment hassle-free.</p>
            <div className='spacing'></div>
            <div className='container'>
                <div class="row">
                    <div class="col-lg-3 col-12">
                        <div class="single-features">
                            <div class="signle-icon">
                                <img className='service-pics rounded-circle' src={hairservice} alt="" />
                            </div>
                            <h4>Hair Service</h4>
                        </div>

                    </div>
                    <div class="col-lg-3 col-12">
                        <div class="single-features">
                            <div class="signle-icon">
                                <img className='service-pics rounded-circle' src={haircolor} alt="" />
                            </div>
                            <h4>Hair Coloring</h4>
                        </div>

                    </div>
                    <div class="col-lg-3 col-12">
                        <div class="single-features">
                            <div class="signle-icon">
                                <img className='service-pics rounded-circle' src={texturing} alt="" />
                            </div>
                            <h4>Texturing</h4>
                        </div>

                    </div>
                    <div class="col-lg-3 col-12">
                        <div class="single-features">
                            <div class="signle-icon">
                                <img className='service-pics rounded-circle' src={nailservice} alt="" />
                            </div>
                            <h4>Nail Service</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceMenu