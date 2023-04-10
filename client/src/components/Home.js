import React, { useState } from 'react';
import "../static/1.jpeg";
import axios from '../api/axios';
import "../static/home.css";
import Navbar from './Navbar';


export default function Home() {
  const [search, changeSearch] = useState('');
  const [searchResult, changeResult] = useState();
  const [nor, changeNor] = useState(-1);
  const onSubmit = () => {
    axios.get(`searching/${search}`, (err) => {
      console.log(err);
    }).then((response) => {
      console.log(response.data);
      changeNor(response.data.length);
      changeResult(response.data);
    });
  }
  return (
    <>
    
    <Navbar />
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
            if (e.key === 'Enter' && search!=='') {
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
                  {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
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