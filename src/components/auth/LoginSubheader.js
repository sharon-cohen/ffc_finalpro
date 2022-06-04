import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const LoginSubheader = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const successRegister = searchParams.get("successRegister");
  const [displaySuccess, setDisplaySuccess] = useState(successRegister);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplaySuccess(false);
    }, 7500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {displaySuccess && (
        <h3 className="text-success">
          Register Successful, lets begin your journey
        </h3>
      )}
      {!displaySuccess && (
        <div className="text-gray-400 fw-bold fs-4">
          {`New Here? `}
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="btn btn-link text-hover-success"
          >
            Create an Account
          </button>
        </div>
      )}
    </>
  );
};

export default LoginSubheader;
