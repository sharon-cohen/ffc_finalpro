import React from "react";

const TableIndicator = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div
          className="indicator-progress d-flex text-white justify-content-center"
          style={{
            position: "absolute",
            left: "calc(50% - 32px)",
            top: "50%",
          }}
        >
          <span className="spinner-border  align-middle ms-2" />
        </div>
      )}
    </>
  );
};

export default TableIndicator;
