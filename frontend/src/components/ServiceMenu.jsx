import React from 'react'
import hairservice from "../assets/images/hair_cut.png"
import haircolor from "../assets/images/hair_coloring.png"
import texturing from "../assets/images/hair_texture.png"
import nailservice from "../assets/images/beard_style.png"

const ServiceMenu = () => {
    return (
        <div id='services' className='d-flex flex-column align-items-center py-5 text-dark'>
            <h1 className='font-weight-medium'>Our Services</h1>
            <p>Simply browse through our extensive list of services, schedule your appointment hassle-free.</p>
            <div className='spacing'></div>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-3 col-12">
                        <div className="single-features">
                            <div className="signle-icon">
                                <img className='service-pics rounded-circle' src={hairservice} alt="" />
                            </div>
                            <h4>Hair Style</h4>
                        </div>

                    </div>
                    <div className="col-lg-3 col-12">
                        <div className="single-features">
                            <div className="signle-icon">
                                <img className='service-pics rounded-circle' src={haircolor} alt="" />
                            </div>
                            <h4>Hair Coloring</h4>
                        </div>

                    </div>
                    <div className="col-lg-3 col-12">
                        <div className="single-features">
                            <div className="signle-icon">
                                <img className='service-pics rounded-circle' src={texturing} alt="" />
                            </div>
                            <h4>Texturing</h4>
                        </div>

                    </div>
                    <div className="col-lg-3 col-12">
                        <div className="single-features">
                            <div className="signle-icon">
                                <img className='service-pics rounded-circle' src={nailservice} alt="" />
                            </div>
                            <h4>Beard Style</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceMenu