import React from 'react'
import logo from "../../assets/Sharebitelogo.png"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            
                <div className='flex mt-5 bg-white'>
                    <img className='ms-5' width={"50px"} src={logo} alt="" />
                  <Link to={"/"}><h1 className='font-bold text-center text-3xl mt-1 ms-2' style={{color:"#84994F"}}>ShareBite</h1></Link>
                </div>
                <hr className='mt-3 shadow-lg text-(--green)' />
            
            

        </>
    )
}

export default Header