import React, { useState, useContext } from 'react';
import login_img from '../static/login_img.png';
import '../static/login.css';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const USER_REGEX = new RegExp(/\W/);
const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,30}$');


export default function Login() {
    const { person, setPerson, setUser } = useContext(AuthContext);
    let nav = useNavigate();
    const personLogin = async (e, res) => {
        e.preventDefault();
        if (USER_REGEX.test(person['username'])) {
            alert('Invalid username');
            return;
        }
        // if(!PASSWORD_REGEX.test(person['password']))
        // {
        //     alert('Invalid password');
        //     return;
        // }
        // setPerson({
        //     username: document.getElementById("username_id").value,
        //     password: document.getElementById("password_id").value
        // })
        // console.log("person",person,document.getElementById("username_id").value);
        await api.post('/login', person, {
            headers: { 'Content-Type': 'application/json' },//specific data type sent
            withCredentials: true
        }).then((res) => {
            // console.log(res);
            const accessToken = res?.data?.accessToken;
            // console.log(accessToken);
            console.log("res", res.data);
            if (res.data.length === 0) {
                alert("username or password is incorrect");
            }
            else {
                setUser(res.data);
                nav("/home");
            }
        }).catch((err) => {
            alert('Please enter correct username and password');
            console.log(err);
        });
    }
    return (
        <>
            <form onSubmit={personLogin}>
                <div className='con'>
                    <img src={login_img} alt="Avatar" className="avatar" />
                </div>
                <div className="inpu">
                    <input id="username_id" type="text" required={true} onChange={(e) => {
                        setPerson({
                            username: document.getElementById("username_id").value,
                            password: document.getElementById("password_id").value
                        })
                    }} autoComplete="on" />
                    <label className="form-label">User name</label>
                </div>

                <div className="inpu">
                    <input id="password_id" type="password" required={true} onChange={(e) => {
                        setPerson({
                            username: document.getElementById("username_id").value,
                            password: document.getElementById("password_id").value
                        })
                    }} />
                    <label className="form-label" >Password</label>
                </div>

                {/* <div className="row mb-4">
                    <div className=" col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div> */}
                <div className='sub'>
                    <button className='sub_but' type="submit">
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    {/* <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button> */}
                </div>
            </form>
        </>
    )
}

// username: "vikram_singh",
// password: "vikram@2"