import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Results2 = () => {
  const { state } = useLocation();
  console.log(state, "THIS_IS_THE_PROJECT");
  return (
    <div className="container">
      <h1>TEST GRAPHS</h1>
    <Link to = "../../public/index2.html">HII</Link>
    <Link to = "../../public/index2.html">HII</Link>
    <Link to = "../../public/index2.html">HII</Link>
    <Link to = "../../public/index2.html">HII</Link>

    </div>
  );
};

export default Results2;
