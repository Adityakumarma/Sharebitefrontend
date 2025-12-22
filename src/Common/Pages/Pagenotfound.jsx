
import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
    <div className=' ms-75 mt-20'><img src="https://cu-alumni.org/pages/docs/page-not-found-404.gif" alt="" /></div>

    <Link to={"/"}><button className='bg-(--green) text-white px-4 py-2 rounded ms-160 mt-7'> Back To Home</button></Link>
    </>
  )
}

export default PagenotFound