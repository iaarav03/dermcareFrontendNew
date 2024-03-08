import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPatient from './Doctor';

const DoctorDashboard = () => {
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);

  const toggleAddPatientModal = () => {
    setAddPatientModalOpen(!isAddPatientModalOpen);
  };

  const showAllPatients = async () => {
    try {
      const response = await axios.get('https://dermcareserver.onrender.com/pdata');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://dermcareserver.onrender.com/delete/${id}`);
      // Update state or trigger a re-fetch after removing
      showAllPatients();
    } catch (error) {
      console.error('Error removing patient:', error);
    }
  };

  useEffect(() => {
    showAllPatients();
  },[]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e3f6fd]">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-md p-8 animate__animated animate__fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-gray-800">Doctor Dashboard</h1>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="inline-block px-6 py-3 mb-4 mr-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-indigo-400 to-purple-500 rounded-md hover:from-indigo-500 hover:to-purple-600   rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={showAllPatients}
          >
            Refresh Patients
          </button>

          <button
            className="inline-block px-6 py-3 mb-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-indigo-400 to-purple-500 rounded-md hover:from-indigo-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
            onClick={toggleAddPatientModal}
          >
            Add Patient
          </button>
        </div>

        {patients.length > 0 && (
          <div className="mt-8  ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Details:</h2>
            {patients.map((patient) => (
              <div key={patient._id} className="bg-[#d3dbe7] p-4 mb-2 rounded-md">
                <p className="text-lg font-josefin-sans ">
                  {patient.name} - {patient.number} 
                  <br></br>
                    {patient.email} 
                </p>
                
                <h1 className="text-xl">
                   Description: {patient.note}
                </h1>
                <div className="flex mt-2">
                  <button
                 className="inline-block px-6 py-2 mb-4 text-sm font-semibold text-white transition-all duration-300 ease-in-out transform bg-red-600 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                    onClick={() => handleRemove(patient._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAddPatientModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white shadow-md rounded-lg p-8 w-96 z-10">
              <AddPatient onClose={toggleAddPatientModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
