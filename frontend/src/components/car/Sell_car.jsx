import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Header from '../header/Header';

function Sell_car() {

  const URL = "http://localhost:7000"
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("jwt_token");
  const user = JSON.parse(window.sessionStorage.getItem("userDetail"));

  const [image, setImage] = useState([])
  const [brand, setBrand] = useState("")
  const [manufacturing_year, setManufacturing_year] = useState("")
  const [model, setModel] = useState("")
  const [kms_driven, setKms_driven] = useState("")
  const [fuel_type, setFuelType] = useState("")
  const [register_number, setRegisterNumber] = useState("")
  const [Insurance, setInsurance] = useState("")
  const [ownership, setOwnership] = useState("")
  const [spare_key, setSpareKey] = useState("")
  const [engine_capacity, setEngineCapacity] = useState("")
  const [contect_number, setContectNumber] = useState("")

  useEffect(() => {
    if (!token) {
      navigate("/Login")
    }
    if (id) {
      axios.get(`${URL}/car/${id}`, { headers: { "Authorization": `JWT ${token}` } }).then((res) => {
        setBrand(res.data.data[0].brand)
        setManufacturing_year(res.data.data[0].manufacturing_year)
        setModel(res.data.data[0].model)
        setKms_driven(res.data.data[0].kms_driven)
        setFuelType(res.data.data[0].fuel_type)
        setRegisterNumber(res.data.data[0].register_number)
        setInsurance(res.data.data[0].Insurance)
        setSpareKey(res.data.data[0].spare_key)
        setEngineCapacity(res.data.data[0].engine_capacity)
        setOwnership(res.data.data[0].ownership)
        setContectNumber(res.data.data[0].contect_number)
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }, [])

  async function submitData() {
    let formData = new FormData();
    formData.append("car_details", JSON.stringify({
      brand, manufacturing_year, model, kms_driven, fuel_type, register_number, Insurance, ownership, spare_key, engine_capacity, contect_number, userId: user._id
    }));

    for (let i = 0; i < image.length; i++) {
      formData.append(`images`, image[i]);
    }

    if (id) {
      axios.put(`${URL}/car/${id}`, formData, { headers: { "Authorization": `JWT ${token}`, "Content-Type": "multipart/form-data" } }).then((res) => {
        toast.success("Car details updated successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate("/My_car")
      }).catch((err) => {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    } else {
      axios.post(`${URL}/car`, formData, { headers: { "Authorization": `JWT ${token}`, "Content-Type": "multipart/form-data" } }).then((res) => {

        toast.success("Car details created successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
      }).catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }

  return (
    <>
      <Header />

      <div className='container'>
        <h2 className='py-3 bg-info bg-opacity-10 border border-info rounded my-4 text-center'>Sell Car Here</h2>

        <div>
          <div className="mb-3 mt-5 text-start w-50 m-auto" >

            <input multiple onChange={(e) => { setImage(e.target.files) }} type="file" className='mb-3' /> <br />

            <label htmlFor='brand' className="form-label">Brand</label>
            <select class="form-select" aria-label="Default select example" id="brand" name="brand" value={brand} onChange={(e) => { setBrand(e.target.value) }} >
              <option selected >Select a brand</option>
              <option value="Maruti suzuki" >Maruti suzuki</option>
              <option value="Hundai" >Hundai</option>
              <option value="Tata" >Tata</option>
              <option value="Mahindra" >Mahindra</option>
              <option value="Toyota" >Toyota</option>
            </select> <br />

            <label htmlFor="Model" className="form-label">Model</label>
            <input type="text" className="form-control" placeholder='Car model' id="Model" value={model} onChange={(e) => { setModel(e.target.value) }} required /><br />

            <label htmlFor="manufacturing_year" className="form-label">Manufacturing year</label>
            <input type="number" className="form-control" placeholder='Car Manufacturing year' id="manufacturing_year" value={manufacturing_year} onChange={(e) => { setManufacturing_year(e.target.value) }} /><br />

            <label htmlFor='fuel_type' className="form-label">Fuel Type</label>
            <select class="form-select" aria-label="Default select example" id="fuel_type" value={fuel_type} onChange={(e) => { setFuelType(e.target.value) }} >
              <option selected >Select a fuel type</option>
              <option value="Petrol" >Petrol</option>
              <option value="Diesel" >Diesel</option>
              <option value="CNG" >CNG</option>
            </select> <br />

            <label htmlFor="kms_driven" className="form-label">Kms Driven</label>
            <input type="number" className="form-control" placeholder='Car Manufacturing year' id="kms_driven" value={kms_driven} onChange={(e) => { setKms_driven(e.target.value) }} /><br />

            <label htmlFor="engine_capacity" className="form-label">Engine capacity</label>
            <input type="number" className="form-control" placeholder='Engine capacity' id="engine_capacity" value={engine_capacity} onChange={(e) => { setEngineCapacity(e.target.value) }} /><br />

            <label htmlFor='spare_key' className="form-label">Spare key</label>
            <select class="form-select" aria-label="Default select example" id="spare_key" value={spare_key} onChange={(e) => { setSpareKey(e.target.value) }} >
              <option selected >Select car spare key</option>
              <option value="Yes" >Yes</option>
              <option value="No" >No</option>
            </select> <br />

            <label htmlFor='ownership' className="form-label">Ownership</label>
            <select class="form-select" aria-label="Default select example" id="ownership" value={ownership} onChange={(e) => { setOwnership(e.target.value) }} >
              <option selected >Select car ownership</option>
              <option value="1st" >1st</option>
              <option value="2nd" >2nd</option>
              <option value="3rd" >3rd</option>
              <option value="3rd+" >3rd+</option>
            </select> <br />

            <label htmlFor='Insurance' className="form-label">Insurance</label>
            <select class="form-select" aria-label="Default select example" id="Insurance" value={Insurance} onChange={(e) => { setInsurance(e.target.value) }} >
              <option selected >Select car Insurance</option>
              <option value="Yes" >Yes</option>
              <option value="No" >No</option>
            </select> <br />

            <label htmlFor="register_number" className="form-label">Register number</label>
            <input type="text" className="form-control" placeholder='Register number' id="title" value={register_number} onChange={(e) => { setRegisterNumber(e.target.value) }} /><br />

            <label htmlFor="register_number" className="form-label">Contect number</label>
            <input type="number" className="form-control" placeholder='Contect number' id="title" value={contect_number} onChange={(e) => { setContectNumber(e.target.value) }} /><br />

          </div>
          <button type="button" className="btn btn-primary mb-3" onClick={submitData}>
            {id ? "update" : "submit"}
          </button>
        </div>

      </div>

    </>
  )
}

export default Sell_car