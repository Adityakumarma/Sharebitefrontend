import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
       <section className="bg-(--green) text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Sharebite today and be part of the solution to food waste.
          </p>
          <Link to={"/login"}>
            <button className="bg-(--bg) hover:bg-orange-200 text-black  border border-(--green) rounded-2xl p-2 px-4 "  >
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    </>
  
  )
}

export default Footer