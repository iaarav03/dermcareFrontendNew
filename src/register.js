import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleAlreadyRegisteredClick = () => {
    navigate('/user'); // Navigate to '/user' route when the button is clicked
  };


  const fetchData = async (values) => {
    try {
      toast.info('Registering...', { autoClose: false });

      const response = await axios.post('https://dermcareserver.onrender.com/register', values);
      
      if (response.status === 'username already exists') {
        toast.dismiss();
        toast.error('Username already exists');
      } else {
        toast.dismiss();
        toast.success('Registration successful');
       setTimeout( ()=>navigate('/user', { replace: true }),2000); // Replace with your actual route
      }
    } catch (error) {
      setError('Error registering user.');
      console.error('Error fetching data:', error);
    }
  };


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      profile: '',
    },
    onSubmit: (values) => fetchData(values),
  });


  const responseMessage = (response) => {
    console.log(response);
};

const errorMessage = (error) => {
  console.log(error);
};
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Register</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 p-2 w-full border border-red-300 rounded-lg"
                {...formik.getFieldProps('username')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 p-2 w-full border border-red-300 rounded-lg"
                {...formik.getFieldProps('password')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="mt-1 p-2 w-full border border-red-300 rounded-lg"
                {...formik.getFieldProps('email')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
                Profile
              </label>
              <input
                id="profile"
                type="text"
                className="mt-1 p-2 w-full border border-red-300 rounded-lg"
                {...formik.getFieldProps('profile')}
              /> 
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
              >
                Register
              </button>
            </div>
            <div className="text-center">
            <button
              onClick={handleAlreadyRegisteredClick}
              className="text-blue-700 hover:underline"
            >
              Already Registered? Go to User Dashboard
            </button>
          </div>
          </form>
          <div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      <ToastContainer />

 </>
      
  );
};

export default Register;
