import React, { useState } from 'react'
import ModHeader from '../Common/Components/ModHeader'
import { FaBoxOpen, FaTrash, FaUserCheck } from 'react-icons/fa6'
import { IoIosTrendingUp } from 'react-icons/io'
import { FiUsers } from 'react-icons/fi'
import { deleteUserAPI, getAllDonationsAdminAPI, getAllNGOAdminAPI, getAllUsersAdminAPI, ngoVerificationAPI } from '../services/allAPI'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import PlatformImpactPie from './PlatformImpact'

function AdminHome() {
  const [ngoverification, setngoverification] = useState(true)
  const [allusersbutton, setallusersbutton] = useState(false)
  const [alldonationsbutton, setalldonationsbutton] = useState(false)
  const [token, setToken] = useState("")



  const [userslistDetails, setUserslistDetails] = useState([])
  const [donationslist, setDonationsList] = useState([])
  const [ngoList, setNgoList] = useState([])


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  const getAllNgos = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await getAllNGOAdminAPI(reqHeader)
    if (result.status == 200)
      setNgoList(result.data)
  }


  const getAllUsers = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await getAllUsersAdminAPI(reqHeader)
    if (result.status == 200)
      setUserslistDetails(result.data)
  }

  const getAllDonations = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }
    const result = await getAllDonationsAdminAPI(reqHeader)
    if (result.status == 200)
      setDonationsList(result.data)
  }

  useEffect(() => {
    if (token) {
      getAllUsers()
      getAllDonations()
      getAllNgos()
    }
  }, [token])

  const handleDeleteUser = async (id) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteUserAPI(id, reqHeader)
    if (result.status == 200) {
      Swal.fire({
        title: "User deleted Succesfully!",
        icon: "success"
      });
      getAllUsers()
    }
  }

  const handleVerifyNgo = async (id) => {
  const reqHeader = { Authorization: `Bearer ${token}` }
  await ngoVerificationAPI(id, "verify", reqHeader)
  getAllNgos()
}

const handleRejectNgo = async (id) => {
  const reqHeader = { Authorization: `Bearer ${token}` }
  await ngoVerificationAPI(id, "reject", reqHeader)
  getAllNgos()
}

const verifiedNgoCount = ngoList.filter(ngo => ngo.status == "verified").length
const pendingNgoCount = ngoList.filter(ngo => ngo.status == "pending").length
const availableDonationsCount = donationslist.filter(item => item.status == "available").length
const claimedDonationsCount = donationslist.filter(item => item.status == "claimed").length
const completedDonationsCount = donationslist.filter(item => item.status == "completed").length
const donorsCount = userslistDetails.filter(item => item.role == "donor").length


  return (
    <>
      <ModHeader />

      <div className="container mx-auto px-10 py-10" >
        <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
        <p className='text-xl text-gray-500 mt-2'>Manage users, verify NGOs, and monitor platform activity</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">


          <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
            <FiUsers className="text-5xl text-blue-600" />
            <div className="ml-6">
              <p className="text-4xl font-semibold">{userslistDetails.length}</p>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>


          <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
            <FaBoxOpen className="text-5xl text-(--green)" />
            <div className="ml-6">
              <p className="text-4xl font-semibold">{donationslist.length}</p>
              <p className="text-gray-600">Total Donations</p>
            </div>
          </div>


          <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
            <FaUserCheck className="text-5xl text-orange-500" />
            <div className="ml-6">
              <p className="text-4xl font-semibold">{verifiedNgoCount}</p>
              <p className="text-gray-600">Verified NGO's</p>
            </div>

          </div>


          <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
            <IoIosTrendingUp className="text-5xl text-red-500 bg-green-200 rounded-full p-2" />
            <div className="ml-6">
              <p className="text-4xl font-semibold">{pendingNgoCount}</p>
              <p className="text-gray-600">Pending Verifications</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">


          <div className=" items-center p-6 bg-white shadow-2xl rounded-xl border ">
            <h1 className='text-2xl mb-8'>Donation Status</h1>
            <h1 className='mb-2 text-gray-600'>Available  <span className=' ms-65 text-(--green)'>{availableDonationsCount}</span></h1>
            <h1 className='mb-2 text-gray-600'>Claimed  <span className=' ms-67 text-(--green)'>{claimedDonationsCount}</span></h1>
            <h1 className='mb-2 text-gray-600'>Completed <span className=' ms-63 text-(--green)'>{completedDonationsCount}</span></h1>
          </div>


          <div className=" items-center p-6 bg-white shadow-2xl rounded-xl border ">
            <h1 className='text-2xl mb-8'>User Distribution</h1>
            <h1 className='mb-2 text-gray-600'>Donors <span className=' ms-65 text-(--green)'>{donorsCount}</span></h1>
            <h1 className='mb-2 text-gray-600'>NGOs  <span className=' ms-67 text-(--green)'>{verifiedNgoCount}</span></h1>
            <h1 className='mb-2 text-gray-600'>Admins <span className=' ms-65 text-(--green)'>1</span></h1>
          </div>


          <div className=" items-center p-6 bg-white shadow-2xl rounded-xl border ">
            <h1 className='text-2xl mb-5'>Platform Impact</h1>
            <div className=' h-64'>
               <PlatformImpactPie 
      completed={completedDonationsCount}
      pending={availableDonationsCount}
      verifiedNgos={verifiedNgoCount}
    />
            </div>
</div>
          

          <div className="w-110 bg-gray-300 p-2 rounded-xl mt-4 flex ms-80">

            <p
              onClick={() => {
                setngoverification(true);
                setallusersbutton(false);
                setalldonationsbutton(false);
              }}
              className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${ngoverification ? "bg-white text-black" : "text-gray-700"}`}
            >
              NGO Verification({ngoList.length})
            </p>

            <p
              onClick={() => {
                setngoverification(false);
                setallusersbutton(true);
                setalldonationsbutton(false);
              }}
              className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${allusersbutton ? "bg-white text-black" : "text-gray-700"}`}
            >
              All Users({userslistDetails.length})
            </p>

            <p
              onClick={() => {
                setngoverification(false);
                setallusersbutton(false);
                setalldonationsbutton(true);
              }}
              className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${alldonationsbutton ? "bg-white text-black" : "text-gray-700"}`}
            >
              All Donations({donationslist.length})
            </p>



          </div>



        </div>

        {ngoverification && <div className='border p-7 mt-8 rounded-2xl w-240 m-10 ms-20 shadow-2xl '>
          <h1 className='text-3xl'>NGO Verification Requests</h1>
          <p className='text-gray-600 mb-14'>Review and verify NGO applications</p>
          <table >
            <thead>
              <tr className="border-b border-gray-200 ">
                <th className="py-3 px-10">Organization</th>
                <th className="py-3 px-10">Registration No. / License No.</th>
                <th className="py-3 px-10">Contact</th>
                <th className="py-3 px-10">Status</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {ngoList.map(item => (
                <tr className="border-b border-gray-200 ">
                  <td className="py-3 px-10">{item.name} <br />
                    <span className='text-gray-600'>{item.address}</span>
                  </td>
                  <td className="py-3 px-18 ">{item.license}</td>
                  <td className="py-3 px-8 "> {item.contact}</td>
                  <td className="py-3 px-8"><div className='p-2 bg-(--bg)   rounded-2xl'>
                    {item.status}</div></td>
                  <td className="py-3 px-8"> {item.status == "pending" ? (<><p onClick={()=>handleVerifyNgo(item._id)} className='p-2 bg-(--green)  rounded-xl hover:bg-green-800 hover:text-white px-3 cursor-pointer'>verify</p>
                    <p onClick={()=>handleRejectNgo(item._id)} className=' mt-1 p-2 bg-(--orange) rounded-xl hover:text-white hover:bg-red-500 px-3 cursor-pointer'>Reject</p> </>) : (<p className='ms-6'>-</p>)}
                  </td>
                </tr>
              ))}

            </tbody>


          </table>
        </div>}

        {allusersbutton &&
          <div className='border p-7 mt-8 rounded-2xl w-250 m-10 ms-20 shadow-2xl'>
            <h1 className='text-3xl'>All Users</h1>
            <p className='text-gray-600 mb-14'>View and manage platform users</p>
            <table className='ms-10' >
              <thead>
                <tr className="border-b border-gray-200  ">
                  <th className="py-3 px-10">Name</th>
                  <th className="py-3 px-10">Email</th>
                  <th className="py-3 px-10">Role</th>
                  <th className="py-3 px-10">Contact</th>
                  <th className="py-3 px-10">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {userslistDetails.map(item => (
                  <tr className="border-b border-gray-200 ">
                    <td className="py-3 px-10">{item.name}
                    </td>
                    <td className="py-3 px-8">{item.email}</td>
                    <td className="py-3 px-8 "> <div className='text-red-500 border border-gray-300 rounded-2xl w-15 h-8 mt-1 ms-3 px-3 p-1 '>{item.role}</div></td>
                    <td className="py-3 px-8">{item.contact}</td>
                    <td className="py-3 px-8"> {item.status == "verified" ? <div className=' bg-gray-300 px-3 rounded-2xl w-15 ms-3 p-2 text-green-600 '>active</div> : <div className=' bg-gray-300 px-3 rounded-2xl w-18 ms-3 p-2 text-red-600 '>Inactive</div>}</td>
                    <td><FaTrash onClick={()=> handleDeleteUser(item._id)} className='ms-7 text-red-500 cursor-pointer' /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}

        {alldonationsbutton && 
        <div className='border p-7 mt-8 rounded-2xl w-290 shadow-2xl ms-9'>
          <h1 className='text-3xl'>All Donations</h1>
          <p className='text-gray-600 mb-14'>Manage all donation activity</p>
          <table >
            <thead>
              <tr className="border-b border-gray-200 ">
                <th className="py-3 px-10">Food Type</th>
                <th className="py-3 px-10">Donor</th>
                <th className="py-3 px-10">Quantity</th>
                <th className="py-3 px-10">Location</th>
                <th className="py-3 px-10">Contact</th>
                <th className="py-3 px-10">Status</th>
                <th className="py-3 px-10">Claimed By</th>
              </tr>
            </thead>
            <tbody>
              {donationslist.map((item) => (
                <tr className="border-b border-gray-200 ">
                  <td className="py-3 px-10">{item.foodtype}</td>
                  <td className="py-3 px-8">{item.userMail}</td>
                  <td className="py-3 px-8 ">{item.quantity}</td>
                  <td className="py-3 px-8  text-gray-600">{item.pickupaddress}</td>
                  <td className="py-3 px-8 ">{item.contactnumber}</td>
                  <td className="py-3 px-8"> <div className=' bg-gray-300 px-3 rounded-2xl w-20 ms-3 p-2 text-(--green) '>{item.status}</div></td>
                  <td className='px-8'>{item.claimedBy ? item.claimedBy : <span className='text-red-600' >None Claimed</span>}</td>
                </tr>
              ))}

            </tbody>


          </table>
        </div>}

      </div>


    </>
  )
}



export default AdminHome                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          