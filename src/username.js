import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './store';

const User = () => {
  const navigate = useNavigate();

  const fetchData = async (username) => {
    try {
      const response = await axios.post('https://dermcareserver.onrender.com/authenticate', { username });
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setUsername = useAuthStore((state) => state.setUsername);

  const usernamevalidate = async (values) => {
    const errors = {};

    if (!values.firstname) {
      

      errors.firstname = 'Username required';
    } else if (values.firstname.includes(' ')) {
      errors.firstname = 'Invalid username';
    }

    if (values.firstname) {
      try {
        const response = await fetchData(values.firstname);
        if (response.status !== 200) {
          errors.firstname = 'Username not registered';
          toast.error('Username not registered');
        } else {
          toast.success('Success');
          navigate('/password');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching data');
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
    },
    validate: usernamevalidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.firstname);
    },
  });

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full min-h-screen flex items-center justify-center">
          <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                {...formik.getFieldProps('firstname')}
                className={`mt-1 p-2 w-full border ${
                  formik.touched.firstname && formik.errors.firstname ? 'border-red-500' : 'border-gray-300'
                } rounded-lg`}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.firstname}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default User;
