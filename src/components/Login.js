import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

function Login() {

    const [user, setuser] = useState();
    const navigate = useNavigate();
    const { showalert } = useContext(alertContext);

    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        });
        const json = await response.json();
        console.log(json)
        if (response.status === 200 && json) {
            localStorage.setItem('CloudBookAuthToken', json.authToken)
            navigate('/')
            showalert("Logged in successfully", "success")
        }
        else{
            showalert(json.error, "danger")
        }
    }
    return (
        <div className='my-5'>
            <form onSubmit={handleSubmit} method="post" className='row justify-content-center align-items-center my-5'>
                <div className="card w-50 my-5">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' required aria-describedby="emailHelp" onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' required onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
