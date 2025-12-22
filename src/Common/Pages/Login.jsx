import React, { useState } from 'react'
import Header from '../Components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../../services/allAPI'
import Swal from 'sweetalert2'


function Login() {
  
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      Swal.fire({
        title: "Fill Form Completely!",
        icon: "info"
      });
    } else {
      try {
        const result = await loginAPI(userDetails)
        if (result.status == 200) {
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
          Swal.fire({
            title: "Logged in Succesfully!",
            icon: "success"
          });
          setUserDetails({
            email: "",
            password: ''
          })
          const user = JSON.parse(sessionStorage.getItem("existingUser"))
          if (user.role == "donor") {
            navigate("/donor-dash")
          } else if (user.role == "ngo") {
            navigate("/ngo-dash")
          } else {
            navigate("/adminhome")
          }

        } else if (result.status == 400) {
          Swal.fire({
            title: "User Not Found, Please Register!",
            icon: "info"
          });
          setUserDetails({
            email: "",
            password: ''
          })

        } else if (result.status == 401) {
          Swal.fire({
            title: "Invalid Credentials!",
            icon: "info"
          });
          setUserDetails({
            password: ''
          })
        } else if (result.status == 402) {
          Swal.fire({
            title: "verification Pending",
            text: "wait for Admin Approval!",
            icon: "info"
          });
          setUserDetails({
            email: "",
            password: ''
          })
        }else if (result.status == 404) {
          Swal.fire({
            title: "Login Unsuccessfull",
            text: "Admin Rejected!",
            icon: "warning"
          });
          setUserDetails({
            email: "",
            password: ''
          })
        }else{
          Swal.fire({
            title: "Something Went Wrong!",
            icon : "error"
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (

    <>

      <Header />
      <div className='mx-120 mt-30 w-100 p-8 border rounded-xl shadow-2xl '>
        <h1 className='text-3xl text-center text-(--green) font-bold mb-7'>Login</h1>
        <label className='' htmlFor="">Email :</label> <br />
        <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='mt-1 w-80 h-8 shadow ' type="text" placeholder=' Enter email' /> <br /> <br />
        <label className='' htmlFor="">Password :</label> <br />
        <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className='mt-1 w-80 h-8 shadow' type="text" placeholder=' Enter password' />
        <button onClick={handleLogin} type='button' className='mt-9 text-white bg-(--green) px-36  rounded p-2 hover:bg-gray-600'>LOGIN</button>
        <Link to={"/register"}><p className='text-gray-600 text-center mt-1'><span className='text-(--orange)'>Register</span> if you are new here!</p></Link>

      </div>

    </>
  )
}

export default Login