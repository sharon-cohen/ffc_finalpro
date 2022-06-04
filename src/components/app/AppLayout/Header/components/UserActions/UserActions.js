import React from "react";
import profile from "../../../../../../media/avatars/150-2.jpg";
import UserActionsMenu from "./UserActionsMenu";

const UserActions = () => {
  return (
    <div className="d-flex align-items-center ms-1 ms-lg-3">
      <div
        className="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <img src={profile} alt="user" />
        <UserActionsMenu />
      </div>
    </div>
  );
};

export default UserActions;
