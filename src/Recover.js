import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store";
import { useNavigate } from "react-router-dom";

const uservalidate = (error = {}, values) => {
  if (!values.firstname) {
    error.firstname = "OTP required";
  }
  return error;
};

const Recover = () => {
  const [otp, setOtp] = useState(null);
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);

  useEffect(() => {
    const getUser = async ({ username }) => {
      try {
        const { data } = await axios.get(`http://localhost:5000/user/${username}`);
        return { data };
      } catch (error) {
        return { error: "Password doesn't Match...!" };
      }
    };
  
    const fetchData = async () => {
      try {
        const { data: { code }, status } = await axios.get('http://localhost:5000/getotp', { params: { username } });

        if (status === 201) {
          let { data: { email } } = await getUser({ username });
          let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
          await axios.post('http://localhost:5000/registermail', { username, useremail: email, text, subject: "Password Recovery OTP" });
          setOtp(code);
          console.log(code);
        }
      } catch (error) {
        console.error('Error fetching OTP:', error);
      }
    };

    fetchData();
  }, [username]);

  const verifyuser = async (otpValue) => {
    try {
      const { status } = await axios.get(`http://localhost:5000/verifyotp`, { params: { code: otpValue } });
      if (status === 201) {
        navigate('/resetpass', { replace: true });
      } else {
        console.log("Invalid OTP");
        // You can display an error message to the user here if needed
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };


  const formik = useFormik({
    initialValues: {
      firstname: "",
    },
    validate: uservalidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      verifyuser(values.firstname);
    },
  });
  

                 
 


  return (
    <>
      <div className="container mx-auto">
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Please enter the otp you received{" "}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                {...formik.getFieldProps("firstname")}
                className={`mt-1 p-2 w-full border ${
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg`}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.firstname}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Recover;





