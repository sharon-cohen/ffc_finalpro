import React from "react";
import { useNavigate } from "react-router-dom";

const UserActionsMenu = () => {
  const navigate = useNavigate();
  const currentUser = {
    first_name: "Omer",
    last_name: "Cohen",
    email: "omercoav@gmail.com",
  };
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-275px py-4"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img src="/media/avatars/150-5.jpg" alt="user" />
          </div>
          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.first_name} {currentUser?.last_name}
              <span className="badge badge-light-danger fw-bolder fs-8 px-2 py-1 ms-2">
                BETA
              </span>
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>
      <div className="separator my-2" />
      <div className="menu-item px-5">
        <button
          onClick={async () => {
            localStorage.removeItem("token");
            await navigate("/auth/login");
          }}
          className="menu-link px-5 btn w-100"
          type="button"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserActionsMenu;
