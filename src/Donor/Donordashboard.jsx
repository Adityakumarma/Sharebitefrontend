import React, { useEffect, useState } from 'react'
import { FaBoxOpen } from 'react-icons/fa6'
import { IoIosTrendingUp } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'
import { CiLocationOn } from 'react-icons/ci'
import { BsClock } from 'react-icons/bs'
import ModHeader from '../Common/Components/ModHeader'
import { addDonationAPI, getAllDonationsAPI } from '../services/allAPI'
import Swal from 'sweetalert2'
import serverURL from '../services/serverURL'

function Donordashboard() {
    const [donationmodal, setdonationmodal] = useState(false)
    const [all, setall] = useState(true)
    const [available, setavailable] = useState(false)
    const [claimed, setclaimed] = useState(false)
    const [completed, setcompleted] = useState(false)
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")

    const [allDonations, setAllDonations] = useState([]);
    const [availableDonations, setAvailableDonations] = useState([])
    const [claimedDonations, setClaimedDonations] = useState([])
    const [completedDonations, setCompletedDonations] = useState([])

    const [donationDetails, setDonationDetails] = useState({
        foodtype: "",
        quantity: "",
        description: "",
        pickuptime: "",
        pickupaddress: "",
        contactnumber:"",
        uploadImages: []
    })
    // console.log(donationDetails);
    const reset = () => {
        setDonationDetails({
            foodtype: "",
            quantity: "",
            description: "",
            pickuptime: "",
            pickupaddress: "",
            contactnumber : "",
            uploadImages: []
        })
        setPreview("")
    }

    useEffect(() => {
        if (token) {
            getAllDonations();
        }
    }, [token]);

    const getAllDonations = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        const result = await getAllDonationsAPI(reqHeader);
        if (result.status === 200) {
            const Donations = result.data
            setAllDonations(Donations);
            setAvailableDonations(Donations.filter(d => d.status == "available"))
            setClaimedDonations(Donations.filter(d => d.status == "claimed"))
            setCompletedDonations(Donations.filter(d => d.status == "completed"))
        }
    };

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setDonationDetails(prev => ({
            ...prev,
            uploadImages: [...prev.uploadImages, file]
        }))

        setPreview(URL.createObjectURL(file))
    }
    // console.log(preview);

    const handleAddDonations = async () => {
        const { foodtype, quantity, description, pickuptime, pickupaddress,contactnumber, uploadImages } = donationDetails
        if (!foodtype || !quantity || !description || !pickuptime || !pickupaddress ||!contactnumber || uploadImages.length == 0) {
            Swal.fire({
                title: "fill form Completely!",
                icon: "info"
            });

        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData()

            reqBody.append("foodtype", foodtype)
            reqBody.append("quantity", quantity)
            reqBody.append("description", description)
            reqBody.append("pickuptime", pickuptime)
            reqBody.append("pickupaddress", pickupaddress)
            reqBody.append("contactnumber", contactnumber)


            uploadImages.forEach(img => {
                reqBody.append("uploadImages", img)
            })

            try {
                const result = await addDonationAPI(reqBody, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    Swal.fire({
                        title: "Donation added Successfully!",
                        icon: "success"
                    });
                    getAllDonations()
                    reset()
                    setdonationmodal(false)
                }

            } catch (error) {
                Swal.fire({
                    title: "Something went wrong!",
                    icon: "warning"
                });
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])


    return (
        <>
            <ModHeader />

            <div className="container mx-auto px-10 py-10">


                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

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
                            <p className="text-4xl font-semibold">{availableDonations.length}</p>
                            <p className="text-gray-600">Available</p>
                        </div>
                    </div>

                    {/* Claimed */}
                    <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
                        <FaBoxOpen className="text-5xl text-orange-500" />
                        <div className="ml-6">
                            <p className="text-4xl font-semibold">{claimedDonations.length}</p>
                            <p className="text-gray-600">Claimed</p>
                        </div>

                    </div>

                    {/* Completed */}
                    <div className="flex items-center p-6 bg-white shadow-md rounded-xl border">
                        <TiTick className="text-5xl text-green-700 bg-green-200 rounded-full p-2" />
                        <div className="ml-6">
                            <p className="text-4xl font-semibold">{completedDonations.length}</p>
                            <p className="text-gray-600">Completed</p>
                        </div>
                    </div>
                </div>


                <div className="flex justify-between items-center mt-16">
                    <div>
                        <h1 className="text-3xl font-semibold">My Donations</h1>
                        <p className="text-gray-600">Manage your food donations</p>
                    </div>

                    <button onClick={() => setdonationmodal(true)} className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
                        + Create Donation
                    </button>
                </div>

                <div className="w-115 bg-gray-200 p-2 rounded-xl mt-4 flex ms-100">

                    <p
                        onClick={() => {
                            setall(true);
                            setavailable(false);
                            setclaimed(false);
                            setcompleted(false);
                        }}
                        className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${all ? "bg-white text-black" : "text-gray-700"}`}
                    >
                        All({allDonations.length})
                    </p>

                    <p
                        onClick={() => {
                            setall(false);
                            setavailable(true);
                            setclaimed(false);
                            setcompleted(false);
                        }}
                        className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${available ? "bg-white text-black" : "text-gray-700"}`}
                    >
                        Available({availableDonations.length})
                    </p>

                    <p
                        onClick={() => {
                            setall(false);
                            setavailable(false);
                            setclaimed(true);
                            setcompleted(false);
                        }}
                        className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${claimed ? "bg-white text-black" : "text-gray-700"}`}
                    >
                        Claimed({claimedDonations.length})
                    </p>

                    <p
                        onClick={() => {
                            setall(false);
                            setavailable(false);
                            setclaimed(false);
                            setcompleted(true);
                        }}
                        className={`ms-5 cursor-pointer px-3 py-1 rounded-xl 
      ${completed ? "bg-white text-black" : "text-gray-700"}`}
                    >
                        Completed({completedDonations.length})
                    </p>

                </div>



                {all &&

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

                        {allDonations.map(item => (
                            <div key={item._id} className="border rounded-xl overflow-hidden shadow-md bg-white">
                                <img
                                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{item.foodtype}</h2>
                                        <span className="px-4 py-1 text-sm bg-green-100 text-(--green) rounded-full">
                                            {item.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 mt-3">{item.userMail}</p>
                                    <p className="text-gray-700 mt-1">{item.description} </p>

                                    {/* Details */}
                                    <div className="mt-5  text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <FaBoxOpen /> <span>{item.quantity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CiLocationOn /> <span>{item.pickupaddress}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                                        </div>
                                        <hr className='mt-3 mb-1' />
                                        {item.claimed ? <h1 >Claimed By : <span className='text-(--green)'>Hope Kitchen</span></h1> : <div></div>}
                                    </div>
                                </div>
                            </div>
                        ))

                        }
                    </div>}

                {available &&
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {availableDonations.map(item => (
                            <div className="border rounded-xl overflow-hidden shadow-md bg-white">
                                <img
                                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{item.foodtype}</h2>
                                        <span className="px-4 py-1 text-sm bg-green-100 text-(--green) rounded-full">
                                            Available
                                        </span>
                                    </div>

                                    <p className="text-gray-500 mt-3">{item.userMail}</p>
                                    <p className="text-gray-700 mt-1">{item.description} </p>

                                    {/* Details */}
                                    <div className="mt-5  text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <FaBoxOpen /> <span>{item.quantity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CiLocationOn /> <span>{item.pickupaddress}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}


                {claimed &&
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {claimedDonations.map(item => (
                            <div className="border rounded-xl overflow-hidden shadow-md bg-white">
                                <img
                                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{item.fooditem}</h2>
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
                                            <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                                        </div>

                                    </div>
                                    <hr className='mt-3 mb-1' />
                                    <h1 >Claimed By : <span className='text-(--green)'>{item.claimedBy}</span></h1>
                                </div>
                            </div>
                        ))
                        }
                    </div>}


                {completed &&
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {completedDonations.map(item => (
                            <div className="border rounded-xl overflow-hidden shadow-md bg-white">
                                <img
                                    src={`${serverURL}/imguploads/${item.uploadImages[0]}`}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{item.foodtype}</h2>
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
                                            <BsClock /> <span>Pick By : {new Date(item.pickuptime).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <hr className='mt-3 mb-1' />
                                    <h1 >Claimed By : <span className='text-(--green)'>{item.claimedBy}</span></h1>
                                </div>

                            </div>
                        ))}
                    </div>}

            </div>





            {donationmodal &&
                <div className='relative z-10 overflow y-hidden '>
                    <div className='bg-gray-500/75 fixed inset-0 '>
                        <div className='flex justify-center items-center min-h-screen scroll-auto'>
                            <div className='bg-white rounded-2xl md:w-220 w-100'>
                                <div className=' flex justify-between items-center p-3'>
                                    <h3 className='text-2xl ms-28 text-(--orange)'>Create new Donation</h3>
                                    <button onClick={() => setdonationmodal(false)}>X</button>


                                </div>
                                <div className='ms-5 flex flex-col-1 gap-10'>
                                    <div>
                                        <div>
                                            <label htmlFor="">Food Type :</label> <br />
                                            <input value={donationDetails.foodtype} onChange={(e) => setDonationDetails({ ...donationDetails, foodtype: e.target.value })} className='w-95 shadow h-8' type="text" placeholder='eg: Prepared meals' />
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="">Quantity :</label> <br />
                                            <input value={donationDetails.quantity} onChange={(e) => setDonationDetails({ ...donationDetails, quantity: e.target.value })} className='w-95 shadow h-8' type="text" placeholder='eg: 20 servings' />
                                        </div>
                                        <div className='mt-3' >
                                            <label htmlFor="">Description :</label> <br />
                                            <textarea value={donationDetails.description} onChange={(e) => setDonationDetails({ ...donationDetails, description: e.target.value })} className='w-95 shadow h-15' type="text" placeholder='eg: Description about the food item' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='mt-3'>
                                            <label htmlFor="">Pickup By (Date & Time) :</label> <br />
                                            <input value={donationDetails.pickuptime} onChange={(e) => setDonationDetails({ ...donationDetails, pickuptime: e.target.value })} className='w-95 shadow h-8 ' type="datetime-local" placeholder='' />
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="">Pickup Address :</label> <br />
                                            <input value={donationDetails.pickupaddress} onChange={(e) => setDonationDetails({ ...donationDetails, pickupaddress: e.target.value })} className='w-95 shadow h-8 ' type="text" placeholder='address' />
                                        </div>
                                        <div className='mt-3'>
                                            <label htmlFor="">Contact Number :</label> <br />
                                            <input value={donationDetails.contactnumber} onChange={(e) => setDonationDetails({ ...donationDetails, contactnumber: e.target.value })} className='w-95 shadow h-8 ' type="text" placeholder='contact' />
                                        </div>
                                        <div className='mt-3'>
                                            {preview ?
                                                <img
                                                    src={preview}
                                                    className="w-24 h-24 ms-20 mt-5 rounded-full cursor-pointer"
                                                    alt="upload"
                                                /> :
                                                <label htmlFor="foodimg"> Food Image :
                                                    <input onChange={(e) => handleFile(e)} type="file" id="foodimg" hidden />
                                                    <img
                                                        src="https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Image-Transparent-Free-PNG.png"
                                                        className="w-24 h-24 ms-20 mt-5 rounded-full cursor-pointer"
                                                        alt="upload"
                                                    />
                                                </label>

                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='float-right me-5'>
                                    <button onClick={handleAddDonations} className=' hover:bg-green-600 px-10 m-3 p-2 mt-7 bg-(--green) rounded me-5 text-white'> Create Donation </button>
                                    <button className='p-2 rounded border hover:bg-(--orange) px-5' onClick={() => { setdonationmodal(false), reset() }} > Cancel </button>

                                </div>
                            </div>


                        </div>

                    </div>

                </div>

            }
        </>
    )
}

export default Donordashboard
