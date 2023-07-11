import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Header from '../header/Header';

function List_car() {
  const URL = "http://localhost:7000"
  const [data, setData] = useState([])
  const token = window.sessionStorage.getItem("jwt_token");

  useEffect(() => {
    axios.get(`${URL}/car`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
      setData(res.data.data)
    }).catch((err) => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      });
    })

  }, [])

  async function searchData(e) {
    axios.post(`${URL}/car/searchData`, { search: e.target.value }, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
      setData(res.data.data)
    }).catch((err) => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }
  const carList = data.map((d) => {
    return <li key={d._id}>
      <h3> {d.brand} {d.model}</h3>
      <p>manufacturing : {d.manufacturing_year}</p>
      <p>fuel type : {d.fuel_type}</p>
      <p>kms driven : {d.kms_driven}</p>
      <p>ownership : {d.ownership}</p>
      <Link to={"/View_car/" + d._id}>
        <button>View in details</button>
      </Link>
    </li>

  })
  return (
    <>
      <Header />
      <div className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4'>List Of Cars</h2>

        <div className="form">
          <i className="fa fa-search"></i>
          <input type="text" className="form-control form-input" placeholder="Search by brand or model..." onChange={searchData} />
          <span className="left-pan"><i className="fa fa-microphone"></i></span>
        </div>

        <ul class="tilesWrap" >
          {
            data.length != 0 ?
              carList
              :
              <span>
                There are no record to show
              </span>
          }

        </ul>

      </div>
    </>
  )
}

export default List_car
