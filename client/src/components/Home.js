import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import "../static/1.jpeg";
import api from '../api/axios';
import "../static/home.css";
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Cookies from "js-cookie";


export default function Home() {
  const nav = useNavigate();
  const { hasPassedOTP, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn === false | hasPassedOTP === false) {
      console.log("idhar", isLoggedIn, hasPassedOTP);
      return nav("/");
    }
    // const cookie = document.cookie;
    // const token = Cookies.get("key");
    // console.log(cookie);
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
  // let { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,

  // })

  return (
    <>

      <body>

        <header id="header" className="fixed-top ">
          <div className="container d-flex align-items-center">

            <Navbar />

          </div>
        </header>

        <div className='bg total'>

          {/* <form>
            <div classNameName="mb-3 mx-3">
              <label for="exampleInputEmail1" classNameName="form-label">Email address</label>
              <input type="email" classNameName="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div classNameName="mb-3 mx-3">
              <label for="exampleInputPassword1" classNameName="form-label">Password</label>
              <input type="password" classNameName="form-control" id="exampleInputPassword1" />
            </div>
            <div classNameName="mb-3 mx-3 form-check">
              <input type="checkbox" classNameName="form-check-input" id="exampleCheck1" />
              <label classNameName="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" classNameName="mx-3 btn btn-primary">Submit</button>
          </form> */}


          {/* <!-- ======= Hero Section ======= --> */}
          <section id="hero" className="d-flex align-items-center">

            <div className="container">
              <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
                  <h1>Electronic Portable Shelter</h1>
                  <h2>Helping the Mankind</h2>
                  <div className="d-flex justify-content-center justify-content-lg-start">
                    <a href="#about" className="btn-get-started scrollto">Get Started</a>
                    <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox btn-watch-video"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos-delay="200">
                  <img src="assets/img/hero-img.png" className="img-fluid animated" alt=""></img>
                </div>
              </div>
            </div>

          </section>
          {/* <!-- End Hero --> */}
          <div className='search-container mx-3'>

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
          {/* </div>
        </div> */}
          <div className='my-3'>
            <ul className='card-container'>
              {(searchResult !== undefined) && (searchResult.map(searchResult => (
                <li className='my-card-item'>
                  <div className="card my-card mx-3">
                    {/* <img src="..." classNameName="card-img-top" alt="..." /> */}
                    <div className="card-body">
                      <h5 className="card-title">{searchResult.city}</h5>
                      <p>state : {searchResult.state}</p>
                      <p>capacity : {searchResult.capacity}</p>
                      <p>Information on the facility in {searchResult.city}.</p>
                      {/* { isLoaded && <GoogleMap zoom={10} center={{lat: 44,lng:-80}} mapContainerclassName='map-container'></GoogleMap>} */}
                      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3773.8645178106567!2d76.7807!3d30.7649!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDU2JzEyLjEiTiA3MsKwNDknMTkuNiJF!5e0!3m2!1sen!2sin!4v1682444090022!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                      {/* <a href="#" classNameName="btn btn-primary">Go somewhere</a> */}
                      <iframe src={`https://www.google.com/maps?q=${searchResult.lat},${searchResult.long}&hl=es:&output=embed`} id="map"></iframe>
                      {/* <iframe id="map"></iframe> */}
                    </div>
                  </div>
                </li>
              )))}
            </ul>
            {(nor === 0) && <h4 className="mx-4">No results</h4>}
          </div>
          <section id="about" class="about" />
          <div className="footer-newsletter">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">


                  {/* <div className="container"> */}
                  {/* <div className="my-5">
          <div className="form-outline mx-auto my-5"> */}

                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>



        <main id="main">

          {/* <!-- ======= About Us Section ======= --> */}
          <section id="about" className="about">
            <div className="container" >

              <div className="section-title">
                <h2>About Us</h2>
              </div>

              <div className="row content">
                <div className="col-lg-6">
                  <p>
                    In this prospering technological world automation is the key to survive. Our project is aimed at designing low-cost and easy to use system which aims at development of portable automated shelters with the help of python and machine learning algorithm along with a simple hardware unit which is easy to implement. The motivation:
                  </p>
                  <ul>
                    <li><i className="ri-check-double-line"></i> Technology driven portable shelter</li>
                    <li><i className="ri-check-double-line"></i> Recycling of polymer waste in an eco-amicable way to develop</li>
                    <li><i className="ri-check-double-line"></i> To reduce Human Intervention</li>
                    <li><i className="ri-check-double-line"></i> To help digitize Country's Infrastructure</li>
                  </ul>
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                  <p>
                    Apart from implementing portable shelters for a user, we also tried to implement a website that would convey the information of shelters to the user via website as well as email. The system is also quite innovative with respect of material and technology in comparison to conventional shelters and easy to install.
                  </p>
                  <a href="#" className="btn-learn-more">Learn More</a>
                </div>
              </div>

            </div>
          </section>
          {/* <!-- End About Us Section -->

<!-- ======= Why Us Section ======= --> */}
          <section id="why-us" className="why-us section-bg">
            <div className="container-fluid">

              <div className="row">

                <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

                  <div className="content">
                    <h3><strong>Benefits of the Shelter</strong></h3>
                    <p>
                      {/* <!-- We added a few features that would help the visitors stay safe and secure --> */}
                    </p>
                  </div>

                  <div className="accordion-list">
                    <ul>
                      <li>
                        <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1"><span>01</span> Versatility <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">
                          <p>
                            Portable Shelters offer spacious storage solutions and different function to suit your needs. It has a variety of styles, colors, and sizes to choose from and makes an excellent choice for a car/truck garage, wood shed, garden shed, workshop, storage building, and much more, at only a fraction of the price of a wooden or steel building.
                          </p>
                        </div>
                      </li>

                      <li>
                        <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" className="collapsed"><span>02</span> Portability <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="accordion-list-2" className="collapse" data-bs-parent=".accordion-list">
                          <p>
                            If you need a temporary garage quickly then, this is the best way to get one. Say you are renting your property but you need a shelter to protect your vehicles, equipment or any other valuables. You don't have the rights unfortunately to construct a garage on the property you are renting. This makes portable shelters, the perfect solution for scenarios in which the garage is only needed temporarily.
                          </p>
                        </div>
                      </li>

                      <li>
                        <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" className="collapsed"><span>03</span> Multi-Purpose <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="accordion-list-3" className="collapse" data-bs-parent=".accordion-list">
                          <p>
                            Portable storage spaces such as portable shelters can be utilized to store pretty much anything and for any sizes of stuff, you have around your home where there is no other garage space available.
                            Portable shelter to store vehicles is probably the most popular use, including cars and trucks, campers, motorcycles, work vehicles, boats and more. It doesn't matter what you use, your temporary shelters will keep the weather off. This will increase the lifespan of your vehicles and large items by protecting them from damaging UV rays as well as moisture when it rains.
                          </p>
                        </div>
                      </li>

                      <li>
                        <a data-bs-toggle="collapse" data-bs-target="#accordion-list-4" className="collapsed"><span>04</span> Easy to Setup/Easy to Install <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="accordion-list-4" className="collapse" data-bs-parent=".accordion-list">
                          <p>
                            Portable shelters are rather simple to assemble compared to a permanent structure. It involves minimal tools and the tools required can be varied by the size of the temporary buildings.
                          </p>
                        </div>
                      </li>

                      <li>
                        <a data-bs-toggle="collapse" data-bs-target="#accordion-list-5" className="collapsed"><span>05</span> Save Time and Money <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                        <div id="accordion-list-5" className="collapse" data-bs-parent=".accordion-list">
                          <p>
                            The portable shelters take lesser time for installation when compared to a permanent garage or storage solution at a more affordable rate. These temporary building structures effectively store and protect your vehicles and other valuable items without the unwanted additional fees.
                          </p>
                        </div>
                      </li>

                    </ul>
                  </div>

                </div>

                <div className="col-lg-5 align-items-stretch order-1 order-lg-2 img" style={{ backgroundImage: 'url("assets/img/why-us.png")' }} data-aos-delay="150">&nbsp;</div>
              </div>

            </div>
          </section>
          {/* <!-- End Why Us Section -->

<!-- ======= Skills Section ======= --> */}
          <section id="skills" className="skills">
            <div className="container">

              <div className="row">
                <div className="col-lg-6 d-flex align-items-center" data-aos-delay="100">
                  <img src="assets/img/skills.png" className="img-fluid" alt=""></img>
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos-delay="100">
                  <h3>Technologies Used</h3>
                  <p className="fst-italic">
                    The software solutions that have been used for this project are
                  </p>

                  <div className="skills-content">

                    <div className="progress">
                      <span className="skill">HTML <i className="val">100%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">CSS <i className="val">100%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">React.js <i className="val">100%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">Node.js <i className="val">95%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">Express.js <i className="val">90%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">MySQL <i className="val">90%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>



                    <div className="progress">
                      <span className="skill">JavaScript <i className="val">85%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                    <div className="progress">
                      <span className="skill">Axios <i className="val">80%</i></span>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>
          {/* <!-- End Skills Section -->

<!-- ======= Services Section ======= --> */}
          <section id="services" className="services section-bg">
            <div className="container">

              <div className="section-title">
                <h2>Services</h2>
                <p>The Electronic Portable Shelter provides User-friendly Services for visitors.</p>
              </div>

              <div className="row">
                <div className="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos-delay="100">
                  <div className="icon-box">
                    <div className="icon"><i className="bx bxl-dribbble"></i></div>
                    <h4><a href="">Face Detection and Recognition</a></h4>
                    <p>It is implemented for security purposes.</p>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos-delay="200">
                  <div className="icon-box">
                    <div className="icon"><i className="bx bx-file"></i></div>
                    <h4><a href="">Shelter Tracking and Database Management</a></h4>
                    <p>For tracking where the shelters have been set up for easy database management and information transfer.</p>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos-delay="300">
                  <div className="icon-box">
                    <div className="icon"><i className="bx bx-tachometer"></i></div>
                    <h4><a href="">Heartbeat Monitoring</a></h4>
                    <p>Will be implemented for health related concerns.</p>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos-delay="400">
                  <div className="icon-box">
                    <div className="icon"><i className="bx bx-layer"></i></div>
                    <h4><a href="">Temperature Regulation</a></h4>
                    <p>For use in areas with harsh climatic conditions.</p>
                  </div>
                </div>

              </div>

            </div>
          </section>
          {/* <!-- End Services Section -->

<!-- ======= Cta Section ======= --> */}
          <section id="cta" className="cta">
            <div className="container">

              <div className="row">
                <div className="col-lg-9 text-center text-lg-start">
                  <h3>Call To Action</h3>
                  <p> Notify us whenever you need help.</p>
                </div>
                <div className="col-lg-3 cta-btn-container text-center">
                  <a className="cta-btn align-middle" href="#">Call To Action</a>
                </div>
              </div>

            </div>
          </section>
          {/* <!-- End Cta Section -->

<!-- ======= Portfolio Section ======= --> */}
          {/* <section id="portfolio" className="portfolio">
            <div className="container">

              <div className="section-title">
                <h2>Portfolio</h2>
                <p>Some Glimplses of our Project.</p>
              </div>

              <ul id="portfolio-flters" className="d-flex justify-content-center" data-aos-delay="100">
                <li data-filter="*" className="filter-active">All</li>
                <li data-filter=".filter-app">Hardware</li>
                <li data-filter=".filter-card">Software</li>
                <li data-filter=".filter-web">Work</li>
              </ul>

              <div className="row portfolio-container" data-aos-delay="200">

                <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-1.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>App 1</h4>
                    <p>App</p>
                    <a href="assets/img/portfolio/portfolio-1.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="App 1"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-2.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>Web 3</h4>
                    <p>Web</p>
                    <a href="assets/img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Web 3"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-3.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>App 2</h4>
                    <p>App</p>
                    <a href="assets/img/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="App 2"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-4.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>Card 2</h4>
                    <p>Card</p>
                    <a href="assets/img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Card 2"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-5.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>Web 2</h4>
                    <p>Web</p>
                    <a href="assets/img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Web 2"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-6.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>App 3</h4>
                    <p>App</p>
                    <a href="assets/img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="App 3"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-7.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>Card 1</h4>
                    <p>Card</p>
                    <a href="assets/img/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Card 1"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-8.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>Card 3</h4>
                    <p>Card</p>
                    <a href="assets/img/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Card 3"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                  <div className="portfolio-img"><img src="assets/img/portfolio/portfolio-9.jpg" className="img-fluid" alt=""></img></div>
                  <div className="portfolio-info">
                    <h4>Web 3</h4>
                    <p>Web</p>
                    <a href="assets/img/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title="Web 3"><i className="bx bx-plus"></i></a>
                    <a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
                  </div>
                </div>

              </div>

            </div>
          </section> */}
          {/* <!-- End Portfolio Section -->

<!-- ======= Team Section ======= --> */}
          <section id="team" className="team section-bg">
            <div className="container">

              <div className="section-title">
                <h2>Team</h2>
                <p>Memebers that have contributed to this project</p>
              </div>

              <div className="row">

                <div className="col-lg-6">
                  <div className="member d-flex align-items-start" data-aos-delay="100">
                    <div className="pic"><img src="assets/img/team/nakul.jpeg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                      <h4>Nakul Kankarwal</h4>
                      <span>19105070</span>
                      <p>Software</p>
                      <div className="social">
                        <a href=""><i className="ri-twitter-fill"></i></a>
                        <a href=""><i className="ri-facebook-fill"></i></a>
                        <a href=""><i className="ri-instagram-fill"></i></a>
                        <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4 mt-lg-0">
                  <div className="member d-flex align-items-start" data-aos-delay="200">
                    <div className="pic"><img src="assets/img/team/aniket.jpeg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                      <h4>Aniket Sood</h4>
                      <span>19105080</span>
                      <p>Software</p>
                      <div className="social">
                        <a href=""><i className="ri-twitter-fill"></i></a>
                        <a href=""><i className="ri-facebook-fill"></i></a>
                        <a href=""><i className="ri-instagram-fill"></i></a>
                        <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <div className="member d-flex align-items-start" data-aos-delay="300">
                    <div className="pic"><img src="assets/img/team/arihant.jpeg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                      <h4>Arihant Jain</h4>
                      <span>19105086</span>
                      <p>Software</p>
                      <div className="social">
                        <a href=""><i className="ri-twitter-fill"></i></a>
                        <a href=""><i className="ri-facebook-fill"></i></a>
                        <a href=""><i className="ri-instagram-fill"></i></a>
                        <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <div className="member d-flex align-items-start" data-aos-delay="400">
                    <div className="pic"><img src="assets/img/team/saksham.jpeg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                      <h4>Saksham Arora</h4>
                      <span>19105089</span>
                      <p>Hardware</p>
                      <div className="social">
                        <a href=""><i className="ri-twitter-fill"></i></a>
                        <a href=""><i className="ri-facebook-fill"></i></a>
                        <a href=""><i className="ri-instagram-fill"></i></a>
                        <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <div className="member d-flex align-items-start" data-aos-delay="400">
                    <div className="pic"><img src="assets/img/team/archit.jpeg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                      <h4>Archit Ghai</h4>
                      <span>19105102</span>
                      <p>Hardware</p>
                      <div className="social">
                        <a href=""><i className="ri-twitter-fill"></i></a>
                        <a href=""><i className="ri-facebook-fill"></i></a>
                        <a href=""><i className="ri-instagram-fill"></i></a>
                        <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <div className="member d-flex align-items-start" data-aos-delay="400">
                    <div className="pic"><img src="assets/img/team/utkarsh.jpeg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                      <h4>Utkarsh Thatai</h4>
                      <span>19105114</span>
                      <p>Software</p>
                      <div className="social">
                        <a href=""><i className="ri-twitter-fill"></i></a>
                        <a href=""><i className="ri-facebook-fill"></i></a>
                        <a href=""><i className="ri-instagram-fill"></i></a>
                        <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
          {/* <!-- End Team Section --> */}

          {/* <!-- ======= Frequently Asked Questions Section ======= --> */}
          {/* <section id="faq" className="faq section-bg">
            <div className="container">

              <div className="section-title">
                <h2>Frequently Asked Questions</h2>
                <p>We tried to answer some frequently asked questions by our friends and classmates.</p>
              </div>

              <div className="faq-list">
                <ul>
                  <li data-aos-delay="100">
                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">What? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                      <p>
                        answer
                      </p>
                    </div>
                  </li>

                  <li data-aos-delay="200">
                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2" className="collapsed">what? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        answer
                      </p>
                    </div>
                  </li>

                  <li data-aos-delay="300">
                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3" className="collapsed">what? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        answer
                      </p>
                    </div>
                  </li>

                  <li data-aos-delay="400">
                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-4" className="collapsed">what? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        answer
                      </p>
                    </div>
                  </li>

                  <li data-aos-delay="500">
                    <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-5" className="collapsed">what? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        answer
                      </p>
                    </div>
                  </li>

                </ul>
              </div>

            </div>
          </section> */}
          {/* <!-- End Frequently Asked Questions Section --> */}

          {/* <!-- ======= Contact Section ======= --> */}
          <section id="contact" className="contact">
            <div className="container">

              <div className="section-title">
                <h2>Contact</h2>
                <p>Contact us.</p>
              </div>

              <div className="row">

                <div className="col-lg-5 d-flex align-items-stretch">
                  <div className="info">
                    <div className="address">
                      <i className="bi bi-geo-alt"></i>
                      <h4>Location:</h4>
                      <p>PEC</p>
                    </div>

                    <div className="email">
                      <i className="bi bi-envelope"></i>
                      <h4>Email:</h4>
                      <p>redivivus@gmail.com</p>
                    </div>

                    <div className="phone">
                      <i className="bi bi-phone"></i>
                      <h4>Call:</h4>
                      <p>+1 5589 55488 55s</p>
                    </div>
                    <iframe src="https://www.google.com/maps?q=30.766365,76.781740&hl=es:&output=embed" id="map" frameborder="0" style={{ border: 0, width: '100%', height: '290px' }} allowfullscreen></iframe>
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style={{ border: 0, width: '100%', height: '290px' }} allowfullscreen></iframe> */}
                  </div>

                </div>

                <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                  <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label for="name">Your Name</label>
                        <input type="text" name="name" className="form-control" id="name" required></input>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="name">Your Email</label>
                        <input type="email" className="form-control" name="email" id="email" required></input>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="name">Subject</label>
                      <input type="text" className="form-control" name="subject" id="subject" required></input>
                    </div>
                    <div className="form-group">
                      <label for="name">Message</label>
                      <textarea className="form-control" name="message" rows="10" required></textarea>
                    </div>
                    <div className="my-3">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center"><button type="submit">Send Message</button></div>
                  </form>
                </div>

              </div>

            </div>
          </section>
          {/* <!-- End Contact Section --> */}

        </main>


      </body>
    </>

  )
}