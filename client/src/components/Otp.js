import React from 'react';
import { useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Otp() {
    const nav = useNavigate();
    const { setHasPassedOTP, isLoggedIn, setUser, person, hasPassedOTP } = useContext(AuthContext);
    useEffect(() => {
        if (isLoggedIn === false) {
            return nav("/");
        }
        if (isLoggedIn === true & hasPassedOTP === true) {
            console.log("idhar", isLoggedIn, hasPassedOTP);
            return nav("/home");
        }
    }, [isLoggedIn, hasPassedOTP]);
    const [OTP, setOTP] = useState();
    const resendOTP = async (e) => {
        e.preventDefault();
        api.post('/resend_otp', person).then(() => {
            alert('A new Otp has been sent to the registered mobile number.');
        }).catch((err) => {
            console.log(err);
            alert('A problem has occured while sending OTP.');
        })
    }
    const checkOTP = async (e) => {
        e.preventDefault();
        console.log('ervrrgv', OTP, person);
        await api.post('/otp', { otp: OTP, per: person }, {
            headers: { 'Content-Type': 'application/json' }, //specific data type sent
            withCredentials: true
        }).then((res) => {
            console.log(res);
            setHasPassedOTP(true);
            setUser(res.data);
            nav('/home');
        }
        ).catch((err) => {
            setHasPassedOTP(false);
            console.log(err);
            // api.post('/resend_otp', person).then(() => {
            //     alert('A new Otp has been sent to the registered mobile number.');
            // }).catch((err) => {
            //     console.log(err);
            //     alert('A problem has occured while sending OTP.');
            // })
            resendOTP();

        })

    }
    return (
        <>
            <form className="form-inline" onSubmit={checkOTP}>
                <label htmlFor="inputPassword" className="col-sm-3 mx-3 col-form-label">Enter OTP sent to registered mobile number</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control mx-3" id="inputOTP" required={true} placeholder="" onChange={(e) => setOTP(e.target.value)} />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-success" onMouseDown={checkOTP}>
                                    <i className="bi bi-box-arrow-in-right mb-2">Enter</i>
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn btn-primary mb-2" onMouseDown={resendOTP}>Resend OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}