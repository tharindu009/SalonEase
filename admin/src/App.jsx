import react, { useContext } from 'react'
import Login from './pages/login'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/globals/reset.css";
import "./styles/globals/colors.css";
import "./styles/globals/typography.css";
import "./styles/globals/util.css";
import "./styles/styles.css";
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointmnets from './pages/Admin/AllAppointmnets';
import AddService from './pages/Admin/AddService';
import ServiceList from './pages/Admin/ServiceList';
import CustomersList from './pages/Admin/CustomersList';

const App = () => {

  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className='bg-container'>
      <ToastContainer />
      <Navbar />
      <div className='d-flex align-items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointmnets />} />
          <Route path='/add-service' element={<AddService />} />
          <Route path='/service-list' element={<ServiceList />} />
          <Route path='/customers-list' element={<CustomersList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
