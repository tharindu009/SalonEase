import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/globals/reset.css";
import "./styles/globals/colors.css";
import "./styles/globals/typography.css";
import "./styles/globals/util.css";
import "./styles/styles.css";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Service from "./pages/Service";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import MyAppointment from "./pages/MyAppointment";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';


 const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/service' element={<Service />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/appointments' element={<Appointments />}/>
        <Route path='/my-appointment' element={<MyAppointment />}/>
        <Route path='/appointments/:serviceId' element={<Appointments />}/>
      </Routes>
      <Footer/>
    </div>
  )
 }

 export default App