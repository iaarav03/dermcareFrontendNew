// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

import { FaFacebookF, FaLinkedinIn,FaInstagram } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-[#1F1B3A] p-8 text-white text-center font-serif">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {/* Pages */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <div className="w-20 font-bold text-3xl px-10">
        <Link to="/">
          <span className="text-blue-600">Derm</span>
          <span className="text-black">Care</span>
        </Link>
      </div>
          <p className="text-left font-sans text-gray-300">
          
DermCare is your trusted destination for comprehensive skincare solutions, committed to enhancing your skin health and well-being. Our platform provides a wealth of information about various skin conditions, empowering you with knowledge to understand and manage your skin's unique needs. Whether you're looking to explore the intricacies of different skin diseases or seeking personalized advice, DermCare is here for you
          </p>
          <div className="flex justify-center space-x-4 mt-4 h-7 ">
        
            <Link to="https://www.facebook.com/" target="_blank">
            <FaFacebookF size="100%" />
            </Link>
          
            
            <Link to="https://www.linkedin.com/" target="_blank">
            <FaLinkedinIn size="100%"  />
           
            
            </Link>
            <Link to="https://www.instagram.com/" target="_blank">
            <FaInstagram  size="100%"/>
            
            </Link>
            {/* Add other social media links */}
          </div>
        </div>

        {/* Navigation */}
        <div className=" flex flex-col">
        <div>
           <h3 className="text-2xl font-bold mb-4">Navigation</h3>  
        </div>
         <div>
<Link className="font-sans" to="/">Home</Link>
         </div>
         <div>
             <Link className="font-sans" to="about">Skin Health A-Z</Link>
            </div> 
           
            <div>
             <Link className="font-sans " to="appointment">Appointment</Link>
            </div>
          
         
         
         
        </div>

        {/* Contact */}
        <div className="col-span-1 md:col-span-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <Link className="font-sans" to="" target="_blank">Malviya Nagar,Jaipur</Link>
          <Link className="font-sans" to="tel: +910000000000">Rajasthan</Link>
          <Link className="font-sans" to="mailto: ppppppp@gmail.com">+919999999999</Link>
        </div>

        {/* Support */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          {/* <h3 className="text-2xl font-bold mb-4">Support</h3> */}
          <p className="font-sans">Help us shape a better platform</p>
          <div className="mt-4">
            <Link to="/" className="font-sans bg-slate-400 text-white px-6 py-2 bg-gradient-to-r from-zinc-700 to-gray-900 hover:from-zinc-900 hover:to-stone-900 ">Join Us Today</Link>
          </div>
        </div>
      </div>

      <hr className="my-8 border-t border-gray-600" />

      <p className="font-sans ">Copyright &copy;DermCare</p>
    </footer>
  );
};

export default Footer;
