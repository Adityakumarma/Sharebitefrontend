import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Swal from 'sweetalert2'
import { registerAPI } from '../../services/allAPI'

function Register() {
  const [donor, setdonor] = useState(true)
  const [ngo, setngo] = useState(false)
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    address: "",
    license: "",
    role: "donor"
  })

  const handleRegister = async () => {
    const { name, contact, email, password, address, license } = userDetails
    if (donor) {
      if (!name || !contact || !email || !password) {
        Swal.fire({
          title: "Fill Form Completely!",
          icon: "info"
        });
      }
    }
    if (ngo) {
      if (!name || !contact || !email || !password || !address || !license) {
        Swal.fire({
          title: "Fill Form Completely!",
          icon: "info"
        });
      }
    }

    try {
      const result = await registerAPI(userDetails)
      if (result.status == 200) {
        Swal.fire({
          title: "Registration Successfull!",
          icon: "success"
        });
        setUserDetails({
          name: "",
          contact: "",
          email: "",
          password: "",
          address: "",
          license: "",
        })
        navigate("/login")
      }
      else if (result.status == 400) {
        Swal.fire({
          title: "User Already Exists!",
          icon: "warning"
        });
        setUserDetails({
          name: "",
          contact: "",
          email: "",
          password: "",
          address: "",
          license: "",
        })
      }
    } catch (error) {
      console.log("Something went wrong!");

    }
  }

  return (
    <>

      <Header />
      <div className='mx-120 mt-30 w-100 p-8 border rounded-xl shadow-2xl mb-15'>
        <h1 className='text-3xl text-center text-(--green) font-bold mb-7'>Register</h1>

        <div className='flex justify-center items-center my-8 font-medium text-lg'>
          <h1 style={{ marginLeft: "-70px" }} className=' text-xl'>I am a :</h1>
          <p onClick={() => { setngo(false), setdonor(true), setUserDetails({ ...userDetails, role: "donor" }) }} className={donor ? " ms-10 text-(--orange) p-3 border-gray-200 border-t rounded cursor-pointer " : ' ms-10 p-3 border-b border-gray-200 cursor-pointer'}>Donor</p>
          <p onClick={() => { setngo(true), setdonor(false), setUserDetails({ ...userDetails, role: "ngo" }) }} className={ngo ? "  text-(--orange) p-3 border-gray-200 border-t rounded cursor-pointer " : ' p-3 border-b border-gray-200 cursor-pointer'}>NGO</p>
        </div>



        {donor && <div>
          <label className='' htmlFor="">Name :</label> <br />
          <input value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter Name ' /> <br /> <br />
          <label className='' htmlFor="">Contact Number :</label> <br />
          <input value={userDetails.contact} onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter Contact number ' /> <br /> <br />
          <label className='' htmlFor="">Email :</label> <br />
          <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter email' /> <br /> <br />
          <label className='' htmlFor="">Password :</label> <br />
          <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className='mt-1 w-80 h-8 shadow' type="text" placeholder=' Enter password' />
        </div>}

        {ngo && <div>
          <label className='' htmlFor="">Organization Name :</label> <br />
          <input value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter Organization Name ' /> <br /> <br />
          <label className='' htmlFor="">Address :</label> <br />
          <input value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter Address ' /> <br /> <br />
          <label className='' htmlFor="">Contact Number :</label> <br />
          <input value={userDetails.contact} onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter Contact number ' /> <br /> <br />
          <label className='' htmlFor="">Registration No. / License No. <span className='text-red-500'>*</span> :</label> <br />
          <input value={userDetails.license} onChange={(e) => setUserDetails({ ...userDetails, license: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter details ' /> <br /> <br />
          <label className='' htmlFor="">Email :</label> <br />
          <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter email' /> <br /> <br />
          <label className='' htmlFor="">Password :</label> <br />
          <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className='mt-1 w-80 h-8 shadow' type="text" placeholder=' Enter password' />

        </div>}

        <button type='button' onClick={handleRegister} className='mt-9 text-white bg-(--green) px-36  rounded p-2 hover:bg-gray-600'>Register</button>
        <Link to={"/login"}><p className='text-gray-600 text-center mt-1'> Already Registered? then  <span className='text-(--orange)'>Login</span></p></Link>

      </div>
    </>
  )
}

export default Register