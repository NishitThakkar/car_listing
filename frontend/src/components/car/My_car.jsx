import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../header/Header';

function My_car() {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("jwt_token");
  const URL = "http://localhost:7000"

  useEffect(() => {
    if (!token) {
      navigate("/Login")
    } else {
      axios.get(`${URL}/car/my_car/${JSON.parse(window.sessionStorage.getItem("userDetail"))._id}`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        setData(res.data.data[0].myCar)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }, [])
  function deleteData(id) {
    axios.delete(`${URL}/car/${id}`, { headers: { "Authorization": `JWT ${token}` } }).then(() => {
      axios.get(`${URL}/car/my_car/${JSON.parse(window.sessionStorage.getItem("userDetail"))._id}`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        toast.success("Deleted successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
        setData(res.data.data[0].myCar)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
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
      <p className='abcde'>
        <Link to={"/View_car/" + d._id}>
          <button className='btn btn-info'>View</button>
        </Link>
        <Link to={"/Sell_car/" + d._id}>
          <button className='btn btn-warning'>Update</button>
        </Link>
      </p>
      <td><button className='btn btn-danger' onClick={() => { deleteData(d._id) }}>Delete</button></td>

    </li>

  })


  return (
    <>
      <Header />
      <div className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>My Cars</h2>
        <ul class="tilesWrap tilesWrap_mycar" >
          {
            data.length !== 0 ?
              carList :
              <span>
                There are no record to show
              </span>
          }
        </ul>

      </div>
    </>
  )
}

export default My_car