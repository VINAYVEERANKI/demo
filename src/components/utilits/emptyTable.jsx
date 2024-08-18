import React from "react";

const EmptyTable = ({
  status = false,
  error = false,
  errorMessage = "---Failed to load data---",
}) => {
  return error ? (
    <tr className="position-absolute top-50 start-50 translate-middle  fs_sm_13 fs_16">
      <td> {errorMessage ? errorMessage : "---Failed to load data---"}</td>
    </tr>
  ) : status ? (
    <tr className="fs_sm_13 fs_16 position-absolute top-50 start-50 translate-middle">
      <td> ---This table is empty ---</td>
    </tr>
  ) : (
    <></>
  );
};

export default EmptyTable;
