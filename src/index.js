import React from "react";
import ReactDom from "react-dom/client";

import {
  createBrowserRouter,
  Outlet,
  
  RouterProvider,
} from "react-router-dom"; // Import createBrowserRouter and Route4
import {  DoctorAuth, Passauth } from "./auth.js";
import Password from "./Password";
import Register from "./register";
import Resetpass from "./Resetpass.js";
import User from "./username";
import Recover from "./Recover.js";
import QuestionComponent from "./whoareyou.js";
import About from "./About.js";

import Chat from "./chat.js";


import Getp from "./getpatient.js";
import Navbar from "./Navbar.js";
import Body from "./start.js";
import Acne from "./acne.js";


import Appointment from "./Appointment.js";
import Footer from "./Footer.js";
import ThankYou from "./ThankYou.js";
// import { GoogleOAuthProvider } from '@react-oauth/google';

const Applayout = () => {
  return (
    <>
    {/* <GoogleOAuthProvider clientId="724167038914-49fe9dh35f2oadgref65pc15b7m2c9od.apps.googleusercontent.com">  */}
      <Navbar />
      <Outlet />
      <Chat />
      <Footer/>
      {/* </GoogleOAuthProvider> */}
    </>
  );
};

// Use createBrowserRouter
const App = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/acne",
        element: <Acne />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/choose",
        element: <QuestionComponent />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/password",
        element: (
          <Passauth>
            <Password />
          </Passauth>
        ),
      },
      {
        path: "/recover",
        element: <Recover />,
      },
      {
        path: "/resetpass",
        element: <Resetpass />,
      },
      {
        path: "/getp",
        element: (
          <DoctorAuth>
            {" "}
            <Getp />{" "}

          </DoctorAuth>
        ),
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    
      {
        path:"/appointment",
        element:<Appointment/>
      },
      {
        path:"/thanks",
        element:<ThankYou/>
      }
    ],
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={App} />);

// ... validate function and Login component remain the same
