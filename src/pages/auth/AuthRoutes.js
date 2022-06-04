import React, { useEffect } from "react";
import bg from "../../media/illustrations/sketchy-1/14.png";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const AuthRoutes = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("bg-lighten");
    return () => {
      document.body.classList.remove("bg-");
    };
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
        overflow: "auto",
      }}
      className=" d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
    >
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        <div className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AuthRoutes;
