import classNames from "classnames";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Logo from "../../../../../../src/LOGO.png";



const CSS_itemsContainer =
  "menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch";

const navItemsDoc = [
  // {
  //   displayName: "FFC",
  //   linkTo: "/app/dashboard",
  // },
  {
    displayName: "My Patients",
    linkTo: "/app/patients",
  },
  {
    displayName: "Current Treatments",
    linkTo: "/app/treatmentsspecs",
  },
  {
    displayName: "History",
    linkTo: "/app/history",
  },
];
const navItemsPatient = [
  // {
  //   displayName: "FFC",
  //   linkTo: "/app/dashboard",
  // },
];

const NavigationItems = () => {
  const { isUserDoctor } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigationItems = isUserDoctor ? navItemsDoc : navItemsPatient;
  return (
    <div className="d-flex align-items-stretch">
      <div className="header-menu align-items-stretch">
        <div className={CSS_itemsContainer}>
        <Link to="/app/dashboard">
          <img
            src={Logo}
            alt="example"
          />
        </Link>
          {navigationItems.map((n) => (
            <div
              key={n.displayName}
              className={classNames({
                ["menu-item menu-lg-down-accordion me-lg-1"]: true,
                here: pathname === n.linkTo,
              })}
            >
              <button
                className="btn menu-link py-3"
                type="button"
                onClick={() => navigate(n.linkTo)}
              >
                <span className="menu-title ">{n.displayName}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationItems;
