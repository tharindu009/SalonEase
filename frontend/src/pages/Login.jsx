import React, { useContext, useEffect, useState } from 'react'

const Login = () => {

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    }

    return (
        <form className='min-vh-80 d-flex align-items-center'>
            <div className='d-flex flex-column gap-3 m-auto align-items-start p-4 min-w-340px min-w-sm-96 border rounded-xl text-secondary text-small shadow-lg'>
                <h4 className='font-weight-semibold'>{state === 'Sign Up'?"Create Account" : "Login"}</h4>
                <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
                {
                    state === "Sign Up" && <div className='container-fluid'>
                    <p>Full Name</p>
                    <input className='border border-dark-subtle rounded w-100 p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
                </div>
                    
                }
                
                <div className='container-fluid'>
                    <p>Email</p>
                    <input className='border border-dark-subtle rounded w-100 p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                </div>
                <div className='container-fluid'>
                    <p>Password</p>
                    <input className='border border-dark-subtle rounded w-100 p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password } required/>
                </div>
                <button className='btn btn-primary w-100 py-2 my-2 rounded text-base'>{state === 'Sign Up'?"Create Account" : "Login"}</button>
                {
                    state === "Sign Up"
                    ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary text-decoration-underline pointer'>Login here</span></p>
                    : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary text-decoration-underline pointer'>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login