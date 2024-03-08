import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';

const uservalidate = (error = {}, values) => {
  if (!values.firstname) {
    error.firstname = 'Password required';
  } else if (values.firstname.includes(' ')) {
    error.firstname = 'Invalid password';
  }
  return error;
};

const usernamevalidate = (values) => {
  const errors = uservalidate({}, values);
  return errors;
};

const Password = () => {
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);
  const [data, setData] = useFetch(username);

  const verifyuser = async (username, password) => {
    try {
      const { data } = await axios.post('https://dermcareserver.onrender.com/login', { username, password });
      let { token } = data;
      localStorage.setItem('token', token);
      if (token) {
        // Show a success notification when successfully logged in
        toast.success('Login successful');
        setTimeout( ()=>navigate('/Getp', { replace: true }),2000);
      }
    } catch (error) {
      // Show an error notification when login fails
      toast.error('Login failed');
      console.error('Error fetching data:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
    },
    validate: usernamevalidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      verifyuser(username, values.firstname);
    },
  });

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Hello {data?.apidata?.username}</h2>
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="firstname"
                type="password"
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
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Password;
