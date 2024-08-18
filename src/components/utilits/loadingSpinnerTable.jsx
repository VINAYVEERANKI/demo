import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinnerTable = ({
  containerClassName = "position-absolute top-50 end-50  ",
}) => {
  return (
    <div className={`${containerClassName}`}>
      <Spinner animation="border" variant="secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinnerTable;
