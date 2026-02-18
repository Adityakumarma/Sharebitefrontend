import React, { useState } from 'react'
import { FaBoxOpen } from 'react-icons/fa6'
import { IoIosTrendingUp } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'
import { CiLocationOn, CiPhone } from 'react-icons/ci'
import { BsClock } from 'react-icons/bs'
import ModHeader from '../Common/Components/ModHeader'
import { claimDonationAPI, completeDonationAPI, getAllDonationsAPI, getAvailableDonationsAPI, getMyDonationsAPI } from '../services/allAPI'
import { useEffect } from 'react'
import Swal from "sweetalert2"
import serverURL from '../services/serverURL'

function Volunteerdashboard() {
  const [availabledonation, setavailabledonation] = useState(true)
  const [claimed, setclaimed] = useState(false)
  const [Completed, setcompleted] = useState(false)
  const [available, setAvailable] = useState([])
  const [ngoDonations, setNgoDonations] = useState([])

  const [claimedDonations, setClaimedDonations] = useState([])
  const [completedDonations, setCompletedDonations] = useState([])
  const [allDonations, setAllDonations] = useState([]);


  const [token, setToken] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    
  }, [])


  useEffect(() => {
    setClaimedDonations(ngoDonations.filter(item => item.status == "claimed"))
    setCompletedDonations(ngoDonations.filter(item => item.status == "completed"))
  }, [ngoDonations])

  const getAllDonations = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };

    const result = await getAllDonationsAPI(reqHeader);
    if (result.status === 200) {
      const Donations = result.data
      setAllDonations(Donations);
    }
  }


    const getAvailableDonations = async () => {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const res = await getAvailableDonationsAPI(reqHeader)

      if (res.status === 200) {
        setAvailable(res.data)
      }
    }

    const getNgoDonations = async () => {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const res = await getMyDonationsAPI(reqHeader)

      if (res.status === 200) {
        setNgoDonations(res.data)
      }
    }
    useEffect(() => {
      if (token) {
        getAvailableDonations()
        getNgoDonations()
        getAllDonations()
      }
    }, [token])

    const handleClaim = async (id) => {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const res = await claimDonationAPI(id, reqHeader)

      if (res.status == 200) {
        Swal.fire("Success", "Donation Claimed", "success")
        getAvailableDonations()
        getNgoDonations()
      }
    }

    const handleComplete = async (id) => {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const res = await completeDonationAPI(id, reqHeader)
      if (res.status === 200) {
        Swal.fire("Completed", "Donation Marked Completed", "success")
        getNgoDonations()
      }
    }

    return (
      <>
        <ModHeader />
        <div className="container mx-auto px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 ">

            {/* Total Donations */}
            <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
              <FaBoxOpen className="text-5xl text-green-600" />
              <div className="ml-6">
                <p className="text-4xl font-semibold">{allDonations.length}</p>
                <p className="text-gray-600">Total Donations</p>
              </div>
            </div>

            {/* Available */}
            <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
              <IoIosTrendingUp className="text-5xl text-blue-600" />
              <div className="ml-6">
                <p className="text-4xl font-semibold">{available.length}</p>
                <p className="text-gray-600">Active pickups</p>
              </div>
            </div>

            {/* Claimed */}
            <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
              <TiTick className="text-5xl text-green-700 bg-green-200 rounded-full p-2" />
              <div className="ml-6">
                <p className="text-4xl font-semibold">{completedDonations.length}</p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>

            {/* Completed */}
            <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
              <CiLocationOn className="text-5xl text-(--orange) bg-orange-200 rounded-full p-2" />
              <div className="ml-6">
                <p className="text-4xl font-semibold">{available.length}</p>
                <p className="text-gray-600">Nearby</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-16">
            <div>
              <h1 className="text-3xl font-semibold">Browse Donations</h1>
              <p className="text-gray-600">Find and claim food donations in your area</p>
            </div>
          </div>
          <div className="w-115 bg-gray-200 p-2 rounded-xl mt-4 flex ms-100">

            <p
              onClick={() => {
                setavailabledonation(true);
                setclaimed(false);
                setcompleted(false);
              }}
              className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${availabledonation ? "bg-white text-black" : "text-gray-700"}`}
            >
              Available Donations({available.length})
            </p>

            <p
              onClick={() => {
                setavailabledonation(false);
                setclaimed(true);
                setcompleted(false);
              }}
              className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${claimed ? "bg-white text-black" : "text-gray-700"}`}
            >
              My Claimed({claimedDonations.length})
            </p>

            <p
              onClick={() => {
                setavailabledonation(false);
                setclaimed(false);
                setcompleted(true);
              }}
              className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${Completed ? "bg-white text-black" : "text-gray-700"}`}
            >
              Completed({completedDonations.length})
            </p>



          </div>

          {availabledonation &&
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
              {available.map(item => (
                <div className="border rounded-xl overflow-hidden shadow-md bg-white ">
                  <img
                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                    alt=""
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">{item.foodtype}</h2>
                      <span className="px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                        Available
                      </span>
                    </div>

                    <p className="text-gray-500 mt-3">{item.userMail}</p>
                    <p className="text-gray-700 mt-1">{item.description} </p>


                    <div className="mt-5  text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaBoxOpen /> <span>{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CiLocationOn /> <span>{item.pickupaddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CiPhone /> <span>{item.contactnumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button type='button' onClick={() => handleClaim(item?._id)} className='px-25 m-2 p-2 bg-(--green) rounded ms-3 me-3 text-white hover:bg-green-600'>Claim Donation</button>
                  </div>
                </div>
              ))}


            </div>}

          {claimed &&
            <div className='flex gap-6 mt-4'>
              {claimedDonations.map(item => (
                <div className="border rounded-xl overflow-hidden shadow-md bg-white w-85 mt-4">
                  <img
                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                    alt=""
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">{item.foodtype}</h2>
                      <span className="px-4 py-1 text-sm bg-orange-200 text-(--orange) rounded-full">
                        Claimed
                      </span>
                    </div>

                    <p className="text-gray-500 mt-3">{item.userMail}</p>
                    <p className="text-gray-700 mt-1">{item.description} </p>


                    <div className="mt-5  text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaBoxOpen /> <span>{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CiLocationOn /> <span>{item.pickupaddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CiPhone /> <span>{item.contactnumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                      </div>
                      <hr className='mt-3 mb-1' />
                      <h1 >Claimed By : <span className='text-(--green)'>{item.claimedBy}</span></h1>
                    </div>
                  </div>
                  <div>
                    <button type='button' onClick={() => handleComplete(item._id)} className='px-25 m-2 p-2 bg-white rounded ms-3 border border-gray-400 me-3 text-black hover:bg-(--orange)'>Mark as Completed</button>
                  </div>
                </div>
              ))}
            </div>}

          {Completed &&
            <div className='flex gap-6 mt-4'>
              {completedDonations.map(item => (
                <div className="border rounded-xl overflow-hidden shadow-md bg-white w-80 mt-4">
                  <img
                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                    alt=""
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">{item.fooditem}</h2>
                      <span className="px-4 py-1 text-sm bg-green-200 text-green-700 rounded-full">
                        Completed
                      </span>
                    </div>

                    <p className="text-gray-500 mt-3">{item.userMail}</p>
                    <p className="text-gray-700 mt-1">{item.description} </p>


                    <div className="mt-5  text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaBoxOpen /> <span>{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CiLocationOn /> <span>{item.pickupaddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CiPhone /> <span>{item.contactnumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                      </div>
                      <hr className='mt-3 mb-1' />
                      <h1 >Claimed By : <span className='text-(--green)'>{item.claimedBy}</span></h1>
                    </div>
                  </div>

                </div>
              ))}


            </div>}

        </div>


      </>
    )
  }

  export default Volunteerdashboard