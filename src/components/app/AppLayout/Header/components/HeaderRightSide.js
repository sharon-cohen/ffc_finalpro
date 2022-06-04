import React from "react";
import UserActions from "./UserActions/UserActions";
import useAuth from "../../../../../hooks/useAuth";
import Notifications from "./Notifications";

const HeaderRightSide = ({ setIsPatientOpen, setIsTestOpen }) => {
  const { logout, isUserDoctor } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex align-items-stretch flex-shrink-0">
      <div className="d-flex align-items-center ms-1 ms-lg-3">
        <Notifications />
        <>
          {isUserDoctor && (
            <>
              <button
                className="btn btn-primary btn-sm mx-5"
                onClick={() => setIsTestOpen(true)}
              >
                Create Test
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsPatientOpen(true)}
              >
                Create Patient
              </button>
            </>
          )}
        </>
        <button
          type="button"
          className="btn btn-outline-danger fw-boldest mx-10"
          onClick={logout}
        >
          Logout
        </button>
        <span className="fw-boldest">{`Hey, ${user.fullName}`}</span>
      </div>
    </div>
  );
};

export default HeaderRightSide;
