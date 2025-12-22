import React from 'react'
import Header from '../Components/Header'
import { FiTrendingDown } from 'react-icons/fi'
import { FaHeart, FaUsers } from 'react-icons/fa6'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import CountUp from "react-countup";

function Landingpage() {
  return (
    <>
    <Header/>
    <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl mb-6 text-gray-900 font-bold">
              No meal wasted,<br />every bite shared.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect restaurants, households, and NGOs to reduce food waste and help those in need. 
              Join our community making a real difference, and help us eradicate the starving Society.
            </p>
            <div className="flex gap-4">
             <Link to={"/login"}>
                <button  className="  bg-(--green) hover:bg-green-800 hover:text-white  border border-(--green) rounded-2xl p-2 px-3 ">
                  Get Started
                </button>
             </Link >
             <Link to={"/learn-more"}>
                <button className=" border hover:bg-(--orange) hover:text-white hover:border-(--orange) rounded-2xl p-2 px-3" >
                  Learn More
                </button>
             </Link>
            </div>
          
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1593113630400-ea4288922497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5fGVufDF8fHx8MTc2MjYxNDg4MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Food donation"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>


      <div className='flex justify-center mt-3 mb-3'>
        <div className=' '>
          <h1 className='text-8xl text-(--green)'><CountUp start={0} end={2500} duration={2.5} /> +</h1>
          <p className='text-2xl ms-10  text-gray-600 '>Meals Shared</p>
        </div>
         <div className=' ms-30  '>
          <h1 className='text-8xl text-(--green)'><CountUp start={0} end={150} duration={2.5} />+</h1>
          <p className='text-2xl ms-3  text-gray-600 '>Active Donors</p>
        </div>
         <div className=' ms-30 '>
          <h1 className='text-8xl text-(--green)'><CountUp start={0} end={45} duration={2.5} />+</h1>
          <p className='text-2xl ms-3  text-gray-600 ' >NGO Partners</p>
        </div>
      </div >


         <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Why Choose Sharebite?</h2>
            <p className="text-xl text-gray-600">Making food donation simple, safe, and impactful</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-(--green) rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingDown className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Reduce Waste</h3>
              <p className="text-gray-600">
                Help prevent perfectly good food from ending up in landfills. Every donation counts.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-(--bg) rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="w-8 h-8 text-red-700" />
              </div>
              <h3 className="text-xl mb-3">Feed Communities</h3>
              <p className="text-gray-600">
                Connect surplus food with people who need it most through verified NGO partners.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-(--bg) rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Build Community</h3>
              <p className="text-gray-600">
                Join a network of restaurants, households, and organizations making a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to make an impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl mb-6 text-(--green)">For Donors</h3>
              <div >
                <div className="flex gap-4">
                  <div className=" w-8 h-8 bg-(--green) text-white rounded-full flex items-center justify-center">1</div>
                  <div className='mb-4'>
                    <h4 className="mb-1">Register & Verify</h4>
                    <p className="text-sm text-gray-600">Create your account as a restaurant or individual donor</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className=" w-8 h-8 bg-(--green) text-white rounded-full flex items-center justify-center">2</div>
                  <div className='mb-4'>
                    <h4 className="mb-1">List Surplus Food</h4>
                    <p className="text-sm text-gray-600">Add details about the food, quantity, and pickup time</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className=" w-8 h-8 bg-(--green) text-white rounded-full flex items-center justify-center">3</div>
                  <div className='mb-4'>
                    <h4 className="mb-1">Get Confirmation</h4>
                    <p className="text-sm text-gray-600">NGOs claim your donation and schedule pickup</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl mb-6 text-(--green)">For NGOs</h3>
              <div >
                <div className="flex gap-4">
                  <div className=" w-8 h-8 bg-(--green) text-white rounded-full flex items-center justify-center">1</div>
                  <div className='mb-4'>
                    <h4 className="mb-1">Register & Get Verified</h4>
                    <p className="text-sm text-gray-600">Submit your NGO details for admin verification</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className=" w-8 h-8 bg-(--green) text-white rounded-full flex items-center justify-center">2</div>
                  <div className='mb-4' >
                    <h4 className="mb-1">Browse Donations</h4>
                    <p className="text-sm text-gray-600">View nearby available donations on the map</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className=" w-8 h-8 bg-(--green) text-white rounded-full flex items-center justify-center">3</div>
                  <div className='mb-4'>
                    <h4 className="mb-1">Claim & Distribute</h4>
                    <p className="text-sm text-gray-600">Pick up donations and distribute to those in need</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>


    </>
  )
}

export default Landingpage