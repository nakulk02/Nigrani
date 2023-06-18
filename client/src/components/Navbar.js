import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import '../static/navbar.css';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { setUser, setIsLoggedIn, setHasPassedOTP } = useContext(AuthContext);
    let nav = useNavigate();
    const handleLogout = () => {
        api.get('/logout', {
            headers: { 'Content-Type': 'application/json' },//specific data type sent
            withCredentials: true
        }).then((res) => {
            console.log(res);
            setIsLoggedIn(false);
            setHasPassedOTP(false);
            setUser();
            nav("/");
        }).catch((err) => {
            alert('Error in logging out');
            console.log(err);
        });
    }
    return (
        <>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto">
                        Redivivus
                        {/* <a href="index.html">Redivivus</a> */}
                    </h1>

                    {/* <nav className={`navbar navbar-expand-lg mx-2 navbar-${props.timeMode.time} bg-${props.timeMode.time}`}> */}
                    {/* <div className="container-fluid"> */}
                    {/* <a className="navbar-brand" href="#">{props.title}</a> */}
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button> */}
                    <div className="navbar" id="navbar">
                        {/* <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Search inventory</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about">About us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="True">Disabled</a>
                                    </li>s
                                </ul> */}

                        <ul>
                        {/* to="/about" */}
                            <li><Link className="nav-link scrollto active" to="">Home</Link></li>
                            <li><a className="nav-link scrollto" href="#about">About</a></li>
                            <li><a className="nav-link scrollto" href="#services">Services</a></li>
                            {/* <li><a className="nav-link scrollto" href="#portfolio">Portfolio</a></li> */}
                            <li><a className="nav-link scrollto" href="#team">Team</a></li>
                            <li><button type="button" className="btn btn-link" onMouseDown={handleLogout}>Logout</button></li>
                            {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                                        <ul>
                                        <li><a href="#">Drop Down 1</a></li>
                                        <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                            <li><a href="#">Deep Drop Down 1</a></li>
                                            <li><a href="#">Deep Drop Down 2</a></li>
                                            <li><a href="#">Deep Drop Down 3</a></li>
                                            <li><a href="#">Deep Drop Down 4</a></li>
                                            <li><a href="#">Deep Drop Down 5</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Drop Down 2</a></li>
                                        <li><a href="#">Drop Down 3</a></li>
                                        <li><a href="#">Drop Down 4</a></li>
                                        </ul>
                                    </li> */}
                            {/* <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                                    <li><a className="getstarted scrollto" href="#about">Get Started</a></li> */}
                        </ul>

                        {/* <div className="form-check form-switch my-2 float-end">
                                    <input className="form-check-input" type="checkbox" onClick={props.toggle} id="flexSwitchCheckDefault" />
                                    <label className={`form-check-label ${props.timeMode.toggle_label_color}`} htmlFor="flexSwitchCheckDefault">{props.timeMode.text}</label>
                                </div> */}
                    </div>
                    {/* </div> */}
                    {/* </nav> */}
                </div>
            </header>

        </>
    )
}

Navbar.propTypes = {
    title: PropTypes.string
}