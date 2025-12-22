import React from 'react'
import logo from "../../assets/Sharebitelogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'

function ModHeader() {
    const navigate = useNavigate()
    const logout = ()=>{
        sessionStorage.clear()
        navigate("/login")
    }
    return (
        <>
            
                <div className='flex mt-5'>
                    <img className='ms-5' width={"50px"} src={logo} alt="" />
                    <Link to={"/"}><h1 className='font-bold text-center text-3xl mt-1 ms-2' style={{ color: "#84994F" }}>ShareBite</h1></Link>
                  
                        <div className='ms-240 mt-3'>
                           <p onClick={logout} className=' ms-3 border rounded shadow-lg p-1 w-20 flex text-(--orange) hover:text-(--black)'> <LuLogOut className='mt-1 me-3' />Logout</p>
                        </div>
                   
                </div>
                <hr className='mt-5 shadow-lg text-(--green)' />
            


        </>
    )
}

export default ModHeader