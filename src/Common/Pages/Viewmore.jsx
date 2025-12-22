import React from "react";
import Header from "../Components/Header";

export default function LearnMore() {
  return (
    <>
    <Header/>
      <div className="w-full bg-white py-12 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          
          
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Learn More About <span className="text-(--green)">ShareBite</span>
          </h2>
  
         
          <p className="text-gray-700 mb-6 leading-relaxed text-2xl">
            ShareBite is a platform that helps reduce food waste by connecting 
            donors such as restaurants and households with NGOs who distribute 
            meals to people in need. Our goal is to ensure that good food never 
            goes to waste and reaches those who need it the most.
          </p>
  
          
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-xl">
            <li>Donate surplus food easily</li>
            <li>NGOs get notified instantly</li>
            <li>Quick pickup and safe delivery</li>
            <li>Track your contribution and impact</li>
          </ul>
  
        </div>
      </div>
    </>
  );
}
