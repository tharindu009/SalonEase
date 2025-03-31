import react, { useState, useContext } from 'react';
import { assets } from "../assets/assets";
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { data } from 'react-router-dom';


const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const { setAToken, backendUrl } = useContext(AdminContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { setAToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === "Admin") {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

                if (data.success) {
                    setAToken(data.token);
                    localStorage.setItem('aToken', data.token);
                    console.log(data.token);
                }
                else {
                    toast.error(data.message);
                }
            }
            else {

            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-vh-80 d-flex align-items-center'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <p>  <br />
                            <br /></p>
                    </div>
                </div>
                <div className='row'>
                    <div className='gap-3 m-auto p-4 min-w-340px min-w-sm-96 border rounded-xl text-secondary text-sm shadow-lg col-md-3'>
                        <h4 className='text-center font-weight-semibold'>{state} Login</h4>
                        <br />
                        <div className='container-fluid'>
                            <p>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-dark-subtle rounded w-100 p-2 mt-1' type="email" placeholder="Email" required />
                        </div>
                        <br />
                        <div className='container-fluid'>
                            <p>Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-dark-subtle rounded w-100 p-2 mt-1' type="password" placeholder="Password" required />
                        </div>
                        <br />
                        <button className='btn btn-primary w-100 py-2 my-2 rounded text-base'>Login</button>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login