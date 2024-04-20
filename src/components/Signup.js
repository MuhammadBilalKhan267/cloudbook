import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

function Signup() {
    const [user, setuser] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();
    const {showalert} = useContext(alertContext);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.cpassword) {return showalert("Passwords do not match", "danger")}
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
        });
        const json = await response.json();
        console.log(json);
        if (response.status === 200 && json) {
            navigate('/login')
            showalert("User created successfully", "success")
        }
        else {
            showalert(json.error, "danger")
        }
    }
    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className='my-5'>
            <form onSubmit={handleSubmit} method="post" className='row justify-content-center align-items-center my-5'>
                <div className="card w-50 my-5">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp" required minLength={3} onChange={onChange} />
                            <div id="nameHelp" className="form-text">We'll never share your name with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' required aria-describedby="emailHelp" onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' required minLength={8} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name='cpassword' required minLength={8} onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
