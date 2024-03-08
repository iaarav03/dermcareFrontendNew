import React from 'react';
import { useNavigate } from 'react-router-dom';
import myimage from './assets/whoareyou.jpg';

const QuestionComponent = () => {
  const navigate = useNavigate();

  const handleClinicalClick = () => {
    navigate('/register'); // Redirect the user to the '/login' route for clinical users
  };

  const handlePatientClick = () => {
    navigate('/about'); // Redirect the user to the '/' route for patient users
  };

  return (
    <div
      className='bg-cover h-[100vh] flex flex-col items-center'
      style={{ backgroundImage: `url(${myimage})` }}
    >
      <div className='text-center'>
        <div className='mt-36 text-4xl text-white font-bold font-libreBaskerville'>
          Join DermCare today.
        </div>

        <div className='mt-20'>
          <div>
            <h1 className='mb-2 text-white font-bold text-2xl'>Account type:</h1>
          </div>
          <button
            className="inline-block px-6 py-3 mb-4 mr-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handlePatientClick} // Call handlePatientClick on click
          >
            Patient
          </button>
          <button
            className="inline-block px-6 py-3 mb-4 mr-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handleClinicalClick} // Call handleClinicalClick on click
          >
            Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
