import React, {useEffect, useContext} from 'react';
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

function Navbar() {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
    }, [location]);

    const navigate = useNavigate();

    const { showalert } = useContext(alertContext);

    const handleLogout = () => {
        localStorage.removeItem("CloudBookAuthToken");
        navigate("/login")
        showalert("Logged out successfully", "success")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CloudBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'? "active": ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">Action</a></li>
                                    <li><a className="dropdown-item" href="/">Another action</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true" href="/">Disabled</a>
                            </li>
                        </ul>
                        {!localStorage.getItem("CloudBookAuthToken") && 
                        <form className="d-flex" role="search">
                            <Link className="btn btn-success" role="button" to="/login">Login</Link>
                            <Link className="btn btn-primary mx-2" role="button" to="/signup">Signup</Link>
                        </form>
                        }
                        {localStorage.getItem("CloudBookAuthToken") && <div className="btn btn-danger" role="button" onClick={handleLogout}>Logout</div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
