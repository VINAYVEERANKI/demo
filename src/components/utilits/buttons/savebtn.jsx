import React from "react";
import { Spinner } from "react-bootstrap";
const Savebtn = ({
  submitFn,
  btnClassName = "light_green_bg px-5",
  containerClassName = "ms-3",
  type = "submit",
  onChangeFn,
  loader = false,
  disabled,
}) => {
  return (
    <button
      className={`${btnClassName}  white_color border_none ${containerClassName}  border_radius_5px fw_400 py-2 d-flex align-items-center gap-2`}
      onClick={() => {
        submitFn();
      }}
      // onChange={() => {
      //   onChangeFn();
      // }}
      type={type}
      disabled={disabled}
    >
      {loader ? (
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
      ) : (
        <>
          {" "}
          <i className="ri-save-fill"></i> SAVE
        </>
      )}
    </button>
  );
};

export default Savebtn;
