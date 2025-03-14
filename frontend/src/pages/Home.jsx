import React from 'react'
import Header from '../components/header'
import ServiceMenu from '../components/ServiceMenu'
import Banner from '../components/Banner'
import BestPricing from '../components/BestPricing'

const Home = () => {
    return (
        <div>
            <Header/>
            <ServiceMenu/>
            <BestPricing/>
            <Banner/>
        </div> 
    )
}

export default Home