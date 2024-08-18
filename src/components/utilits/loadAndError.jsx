import React from "react";
import EmptyTable from "./emptyTable";

const LoadAndError = ({
  children,
  loader = false,
  error = false,
  status = false,
  errorMessage = "",
}) => {
  return (
    <>
      {(loader === false && error) || (loader === false && status) ? (
        <EmptyTable status={status} error={error} errorMessage={errorMessage}/>
      ) : (
        children
      )}
    </>
  );
};

export default LoadAndError;
