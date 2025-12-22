import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landingpage from './Common/Pages/Landingpage'
import Viewmore from './Common/Pages/Viewmore'
import PagenotFound from './Common/Pages/Pagenotfound'
import Login from './Common/Pages/Login'
import Register from './Common/Pages/Register'
import Donordashboard from './Donor/Donordashboard'
import Volunteerdashboard from './Volunteer/Volunteerdashboard'
import AdminHome from './Admin/AdminHome'


function App() {
  return (
    <>
      <Routes>
        {/* Common */}
        <Route path='/' element={<Landingpage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/learn-more' element={<Viewmore />} />
        

        {/* Donor */}
        <Route path='/donor-dash' element={<Donordashboard />} />

        {/* NGO */}
        <Route path='/ngo-dash' element={<Volunteerdashboard />} />

        {/* Admin */}
        <Route path="/adminhome" element={<AdminHome />} />

        <Route path='*' element={<PagenotFound />} />

      </Routes>
    </>
  )
}

export default App