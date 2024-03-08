import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';

const uservalidate = (error = {}, values) => {
  if (!values.firstname) {
    error.firstname = toast.error('username required');
  }
    else if (values.firstname.includes(" ")) {
    error.firstname = toast.error("invalid username");
  }
  return error;
};

const usernamevalidate = (values) => {
  const errors = uservalidate({}, values);
  return errors;
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
    },
    validate: usernamevalidate, // Corrected placement of the validation function
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="w-full min-h-screen flex items-center justify-center">
          <form onSubmit={formik.handleSubmit}>
            <label>firstname</label>
            <input
              className="border rounded-lg"
              type="text"
              name='firstname'
              {...formik.getFieldProps('firstname')}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div>{formik.errors.firstname}</div>
            ) : null}
           
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
