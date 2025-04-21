import React from 'react'
import aboutus from '../assets/images/aboutus.jpg'

const About = () => {
    return (
        <div>
            <div className='text-center display-4 pt-5 text-secondary'>
                <h1>ABOUT <span className='text-muted font-weight-semibold'>US</span></h1>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                        <img className='w-100' src={aboutus} alt="" />
                    </div>
                    <div className='col-md-8 col-sm-12 row g-3 d-flex justify-content-center'>
                        <p>At SalonEase., we believe that great hair is the key to confidence and self-expression.
                            Our expert stylists are passionate about creating stunning hairstyles, tailored cuts,
                            and vibrant colors that complement your unique personality. From classic trims to trendy transformations,
                            we use top-quality products and the latest techniques to deliver exceptional results.
                            Step into our salon for a relaxing, luxurious experience, and let us help you achieve the perfect look.
                            Book your appointment today and discover the beauty of expert hair care!</p>
                        <hr />
                        <h3 class="text-dark">Our Vision</h3>
                        <p>At SalonEase., our vision is to be the go-to destination for exceptional hair and beauty services,
                            where creativity, expertise, and innovation come together to enhance confidence and self-expression.
                            We strive to create a welcoming and luxurious salon experience, empowering our clients with personalized styles that reflect their unique beauty.
                            Through continuous learning, premium products, and outstanding customer care, we aim to set new standards in the beauty industry and inspire confidence in everyone we serve.</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default About