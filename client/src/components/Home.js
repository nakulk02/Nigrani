import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../static/1.jpeg";
import api from '../api/axios';
import "../static/home.css";
import Navbar from './Navbar';
import Cookies from "js-cookie";
import { AuthContext } from '../context/AuthContext';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

export default function Home() {
  const nav = useNavigate();
  const { hasPassedOTP, isLoggedIn } = useContext(AuthContext);
  const [search, changeSearch] = useState('');
  const [searchResult, changeResult] = useState();
  useEffect(() => {
    const cookie=document.cookie ;
    const token = Cookies.get("key");
    console.log(cookie);
    if (isLoggedIn === false | hasPassedOTP === false) {
      console.log("idhar", isLoggedIn, hasPassedOTP);
      return nav("/");
    }
  }, [isLoggedIn, hasPassedOTP, searchResult]);
  // const iframeData = document.getElementById('map');
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
  // const mapChange=()=>{
    // }
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    let map_url = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
  // maps settings

  return (
    <>
      <Navbar />

      <div className='bg total'>

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
                  <div className="card-body">
                    <h5 className="card-title">{searchResult.city}</h5>
                    <p>state : {searchResult.state}</p>
                    <p>capacity : {searchResult.capacity}</p>
                    <p>Information on the facility in {searchResult.city}.</p>
                    <iframe src = {`https://www.google.com/maps?q=${searchResult.lat},${searchResult.long}&hl=es:&output=embed`} id="map"></iframe>
                  </div>
                </div>
              </li>
            )))}
          </ul>
          {(nor === 0) && <h4 className="mx-4">No results</h4>}
        </div>
      </div >
    </>

  )
}
