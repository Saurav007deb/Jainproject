import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
import Card from '../components/Card.js'
import image1 from '../components/images/image1.jpeg'

export default function Main() {

  const [search, setSearch] = useState('')

  const [Location, setLocation] = useState([])
  const [ProjectData, setProjectData] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/projectData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }

    });

    response = await response.json();

    setProjectData(response[0]);
    setLocation(response[1]);
   

  }

  useEffect(() => {
    loadData()
  }, [])




  return (
    <div>
      <div><Navbar /> </div>
      <div>
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
            <div className="carousel-inner" id='carousal'>
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  {/* <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
                </div>
              </div>

              <div className="carousel-item active">
                <img src={image1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={image1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={image1} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

        </div>
      </div>

      <div className='container'>
        {Location.length > 0 ? (
          Location.map((data, index) => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3'>{data.CategoryName}</div>
              <hr />
              {ProjectData.length > 0 ? (
                ProjectData.filter((item) => (item.LocationName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card 
                        
                        alldetails = {filterItems}
                      />
                    </div>
                  ))
              ) : (
                <div>No Projects Currently</div>
              )}
            </div>
          ))
        ) : (
          <p>No locations available</p>
        )}
      </div>

      <div>
        <Footer />
      </div>

    </div>
  )
}
