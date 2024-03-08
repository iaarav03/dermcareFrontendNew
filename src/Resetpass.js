import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store";
import { useNavigate } from "react-router-dom";

const uservalidate = (errors, values) => {
  if (!values.username) {
    errors.username = "Username required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username";
  }
  return errors;
};

const Resetpass = () => {
  const username = useAuthStore((state) => state.auth.username);
  const navigate = useNavigate();

  const getUser = async ({ username }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/user/${username}`);
      return { data };
    } catch (error) {
      return { error: "Password doesn't Match...!" };
    }
  };

  const verifyuser = async (username, password) => {
    try {
      const { data } = await axios.put('http://localhost:5000/resetpass', { username, password });
            console.log(data);
    } catch (error) {
      // Show an error notification when login fails
      toast.error('Login failed');
      console.error('Error fetching data:', error);
    }
  };



  const formik = useFormik({
    initialValues: {
      username: "",
      newPassword: "",
    },
    validate: (values) => uservalidate({}, values),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      // Handle form submission here
      // You can access the values using values.username and values.newPassword

      verifyuser(values.username,values.newPassword);
    },

  });

  return (
    <div className="container mx-auto">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Reset password
          </h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              {...formik.getFieldProps("username")}
              className={`mt-1 p-2 w-full border ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("newPassword")}
              className={`mt-1 p-2 w-full border ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white  px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resetpass;
