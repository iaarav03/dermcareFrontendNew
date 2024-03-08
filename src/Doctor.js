import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPatient({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dermcareserver.onrender.com/pregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        console.log('Patient added successfully');
        // Redirect or update your patient list here
        onClose(); // Close the modal

        // Display a success toast
        toast.success('Patient added successfully', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error('Failed to add patient');
        
        toast.error('Failed to Add')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white shadow-md rounded-lg p-8 w-3/4 max-w-xl z-10 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-center">Appointment form</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-600 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 w-full rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-600 font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 w-full rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="text-gray-600 font-bold mb-2">
              Number:
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="p-4 w-full rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="text-gray-600 font-bold mb-2">
              Disease Specifications
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="resize-none p-4 w-full rounded-lg border border-gray-300 focus:outline-none"
              placeholder="Enter Your Note"
              required
            />
          </div>
          {/* Submit button */}
          <div className="flex justify-end">
            <button
              className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full"
              type="submit"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
