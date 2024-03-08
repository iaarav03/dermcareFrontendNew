import React, { useState } from 'react';

import { Link,useNavigate } from 'react-router-dom';

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
const navigate=useNavigate();
const handleSubmit=()=>{
  navigate('/choose');
}
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <nav className=" z-50 flex justify-between items-center bg-white">
      <div className="w-20 py-5 font-bold text-3xl px-10">
        <Link to="/">
          <span className="text-blue-600">Derm</span>
          <span className="text-black">Care</span>
        </Link>
      </div>
      <div>
        <ul className="hidden md:flex items-center space-x-16 px-64">
       
          <li><Link to="/about" className="hover:text-color-green ease-in duration-200 text-xl font-semibold">Skin Health A-Z</Link></li>
          <li><Link to="/appointment" className="hover:text-color-green ease-in duration-200 text-xl font-semibold">Appointment With Doctor </Link></li>
          <li><button onClick={()=>{handleSubmit();}}  className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 px-5 py-4 rounded-md capitalize font-bold hover:opacity-90 ease-in duration-200 font-l">Sign In</button></li>
    
        </ul>
      </div>
      {/* Short Screen */}
      <div id="hamburger" className="md:hidden cursor-pointer z-50" onClick={toggleModal}>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Menu
  </button>
</div>
      <div id="menu" className={`md:hidden bg-white min-h-[100vh] right-0 top-[8%] w-full flex items-center absolute inset-0 px-10 z-50 ${modalOpen ? 'block' : 'hidden'}`}>
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 py-10">
        <li><Link to="/"  className="hover:text-color-green ease-in duration 200 text-2xl" onClick={toggleModal}>Home</Link></li>
          <li><Link to="about"  className="hover:text-color-green ease-in duration 200 text-2xl" onClick={toggleModal}>Skin Health A-Z</Link></li>
          <li><Link to="/appointment"  className="hover:text-color-green ease-in duration 200 text-2xl" onClick={toggleModal}>Appointment With Doctor</Link></li>
          <li><button onClick={() => { handleSubmit(); toggleModal(); }} className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 px-5 py-4 rounded-md capitalize font-bold hover:opacity-90 ease-in duration-200 font-l">Sign In</button></li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
