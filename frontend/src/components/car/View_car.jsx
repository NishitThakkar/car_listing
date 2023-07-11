import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../header/Header'
import { Carousel } from 'react-bootstrap'

function View_car() {
  let { id } = useParams()
  const [data, setData] = useState([])
  const URL = "http://localhost:7000"
  const token = window.sessionStorage.getItem("jwt_token");
  const user = JSON.parse(window.sessionStorage.getItem("userDetail"));

  useEffect(() => {
    if (id) {
      axios.get(`${URL}/car/` + id, { headers: { "Authorization": `JWT ${window.sessionStorage.getItem("jwt_token")}` } }).then((res) => {
        setData(res.data.data[0])
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }

  }, [])

  let picture = []

  if (data.length !== 0) {
    picture = data.imgUrl.map((d) => {
      return <Carousel.Item style={{ height: 500 }}>
        <img
          className="d-block w-50 m-auto"
          src={`${URL}/${d}`}
          alt="First slide"
        />
      </Carousel.Item>
    })
  }

  return (
    <>
      <Header />
      <div class=" container mt-4 text-start ">
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>Car Details</h2>

        <Carousel>
          {
            picture
          }
        </Carousel>

        <ul class="tilesWrap tilesWrap_view_car" >
          <li key={data._id}>
            <h2> {data.brand} {data.model}</h2>
            <p><span className='fw-bold'> manufacturing : </span> {data.manufacturing_year}</p>
            <p><span className='fw-bold'> fuel type : </span> {data.fuel_type}</p>
            <p><span className='fw-bold'> kms driven : </span> {data.kms_driven} km.</p>
            <p><span className='fw-bold'> ownership : </span> {data.ownership}</p>
            <p><span className='fw-bold'> fuel_type : </span> {data.fuel_type}</p>
            <p><span className='fw-bold'> register_number : </span> {data.register_number}</p>
            <p><span className='fw-bold'> Insurance : </span> {data.Insurance}</p>
            <p><span className='fw-bold'> ownership : </span> {data.ownership}</p>
            <p><span className='fw-bold'> spare_key : </span> {data.spare_key}</p>
            <p><span className='fw-bold'> engine_capacity : </span> {data.engine_capacity} CC</p>
            <h3 className='gradient-border fw-bold'>Contect for inquiry : {data.contect_number}</h3>
          </li>
        </ul>
      </div>
    </>
  )
}

export default View_car