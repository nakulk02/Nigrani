import React from 'react'

export default function Otp() {
    return (
        <>
            <form className="form-inline">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Enter OTP</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputPassword" placeholder="" />
                    <div><i className="bi bi-box-arrow-in-right">fvdfv</i>
                    </div>
                </div>
                <button className="btn btn-primary mb-2" >Resend OTP</button>
            </form>
        </>
    )
}