import React, { useState ,useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import "../static/textform.css";

export default function TextForm() {
    const {mode}= useContext(AuthContext);
    const [text, setText] = useState("");
    const [wordNumber, setWordNumber] = useState({
        words: 0,
        lines: 0
    })
    const handleUpper = () => {
        setText(text.toUpperCase());
    }
    const handleLower = () => {
        setText(text.toLowerCase());
    }
    const handleClear = (event) => {
        setText('');
        handleWordNumber(event);
    }
    function handleWordNumber(event) {
        if (event.target.value.trim() === "") {
            setWordNumber({
                words: 0,
                lines: 0
            })
        }
        else {
            setWordNumber({
                words: event.target.value.split(' ').length,
                lines: event.target.value.split("\n").length
            })
        }
    }
    const handleChange = (event) => {
        setText(event.target.value);
        handleWordNumber(event);
    }
    return (
        <>
        <div >
            <div className="ob"> <h4> OUR OBJECTIVE</h4></div>
            <div>
                <h5 className="my-5 info">
                    In this prospering technological world automation is the key to survive. Our project is aimed
                    at designing low-cost and easy to use system which aims at development of portable
                    automated shelters with the help of python and machine learning algorithm along with a
                    simple hardware unit which is easy to implement. Our project is a simple yet useful
                    implementation of automation technology. Apart from implementing portable shelters for a
                    user, we also tried to implement a website that would convey the information of shelters to
                    the user via website as well as email. The system is also quite innovative with respect of
                    material and technology in comparison to conventional shelters and easy to install.
                </h5>
            </div>
            <div className={`container ${mode.time === 'light' ? 'text-dark' : 'text-primary text-opacity-40'}`} >
                <h3 className='info '>Tell us</h3>
                <div className="my-3">
                    <textarea className="form-control" value={text} placeholder="Enter text here" onChange={handleChange} id="myBox" rows="8"></textarea>
                </div>
                {/* <button className="btn btn-primary mx-1" onClick={handleUpper}>Convert to upper case</button>
                <button className={`btn btn-primary mx-1 ${mode.time === 'light' ? "#2960cf" : "#34299db5"}`} onClick={handleLower}>Convert to lower case</button> */}
                <button className={`but btn btn-primary mx-1 ${mode.time === 'light' ? "#2960cf" : "#34299db5"}`} onClick={handleClear}>Clear text</button>
                <button className={`but btn btn-primary mx-1 ${mode.time === 'light' ? "#2960cf" : "#34299db5"}`} onClick={() => (alert("Thank you for your valuable feedback"))}>Submit</button>
                {/* <p >{wordNumber.words} words and {wordNumber.lines} lines</p>
                <p>{(0.008 * wordNumber.words).toPrecision(2)} minute read</p> */}
            </div>
        </div>
        </>
    )
}
