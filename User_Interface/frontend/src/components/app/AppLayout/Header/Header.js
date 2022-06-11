import React from "react";
import NavigationItems from "./components/NavigationItems";
import HeaderRightSide from "./components/HeaderRightSide";

const Header = ({ setIsPatientOpen, setIsTestOpen }) => {
  return (
    <div className="header align-items-stretch header-dark">
      <div className="container-fluid d-flex align-items-stretch justify-content-between">
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          <NavigationItems />
          <HeaderRightSide
            setIsPatientOpen={setIsPatientOpen}
            setIsTestOpen={setIsTestOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
