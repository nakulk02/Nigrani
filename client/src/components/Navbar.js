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
    const { setUser, setIsLoggedIn } = useContext(AuthContext);
    let nav = useNavigate();
    const handleLogout = () => {
        api.get('/logout', {
            headers: { 'Content-Type': 'application/json' },//specific data type sent
            withCredentials: true
        }).then((res) => {
            console.log(res);
            setIsLoggedIn(false);
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
                        Nigrani
                    </h1>
                    <div className="navbar" id="navbar">
                        <ul>
                            <li><Link className="nav-link scrollto active" to="">Home</Link></li>
                            <li><Link className="nav-link scrollto" to="/about">About</Link></li>
                            <li><a className="nav-link scrollto" href="#services">Services</a></li>
                            <li><a className="nav-link scrollto" href="#portfolio">Portfolio</a></li>
                            <li><a className="nav-link scrollto" href="#team">Team</a></li>
                            <li><button type="button" className="btn btn-link" onMouseDown={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </header>

        </>
    )
}

Navbar.propTypes = {
    title: PropTypes.string
}
