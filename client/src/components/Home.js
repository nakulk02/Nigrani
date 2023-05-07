import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../static/1.jpeg";
import api from '../api/axios';
import "../static/home.css";
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';
import { GoogleMap, useLoadScript,Marker } from '@react-google-maps/api'

export default function Home() {
  const nav = useNavigate();
  const { hasPassedOTP, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn === false | hasPassedOTP === false) {
      console.log("idhar", isLoggedIn, hasPassedOTP);
      return nav("/");
    }
  }, [isLoggedIn, hasPassedOTP]);

  const [search, changeSearch] = useState('');
  const [searchResult, changeResult] = useState();
  const [nor, changeNor] = useState(-1);
  const onSubmit = async () => {
    await api.get(`searching/${search}`).then((response) => {
      console.log(response.data);
      changeNor(response.data.length);
      changeResult(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  
  // maps settings
  let { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,

  })

  return (
    <>

      <Navbar />

{/* 

      <!-- ======= Hero Section ======= -->
      <section id="hero" class="d-flex align-items-center">

        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1>Electronic Portable Shelter</h1>
              <h2>Helping the Mankind</h2>
              <div class="d-flex justify-content-center justify-content-lg-start">
                <a href="#about" class="btn-get-started scrollto">Get Started</a>
                <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
              </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src="assets/img/hero-img.png" class="img-fluid animated" alt="">
            </div>
          </div>
        </div>

      </section>
      <!-- End Hero --> */}





      <div className='bg total'>

        {/* <form>
        <div className="mb-3 mx-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 mx-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 mx-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="mx-3 btn btn-primary">Submit</button>
      </form> */}

        <div className="my-5">
          <div className="form-outline mx-auto my-5">
            <input type="search" id="form1" autoComplete='off' onChange={(e) => {
              changeSearch(e.target.value);
            }} onKeyDown={(e) => {
              if (e.key === 'Enter' && search !== '') {
                if (nor === 0) {
                  changeNor(-1);
                }
                onSubmit();
              }
            }}
              className="form-control" placeholder='Search location' />
            <button type="button" className="bt" onClick={onSubmit}><h5>Submit</h5></button>

          </div>
        </div>
        <div className='my-3'>
          <ul>
            {(searchResult !== undefined) && (searchResult.map(searchResult => (
              <li>
                <div className="card my-3 mx-3">
                  {/* <img src="..." className="card-img-top" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title">{searchResult.city}</h5>
                    <p>state : {searchResult.state}</p>
                    <p>capacity : {searchResult.capacity}</p>
                    <p>Information on the facility in {searchResult.city}.</p>
                    { isLoaded && <GoogleMap zoom={10} center={{lat: 44,lng:-80}} mapContainerClassName='map-container'></GoogleMap>}
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3773.8645178106567!2d76.7807!3d30.7649!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDU2JzEyLjEiTiA3MsKwNDknMTkuNiJF!5e0!3m2!1sen!2sin!4v1682444090022!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <iframe id="map"></iframe>
                  </div>
                </div>
              </li>
            )))}
          </ul>
          {(nor === 0) && <h4 className="mx-4">No results</h4>}
        </div>
      </div>
    </>

  )
}