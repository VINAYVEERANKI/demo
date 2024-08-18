import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerLoading = () => {
  return (
    <>
      <Spinner
        as="span"
        size="sm"
        animation="border"
        className="mx-3"
        variant="secondary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default SpinnerLoading;
