import React from "react";

const ErrorField = ({ formikError, formikTouched }) => {
  return (
    <>
      {formikError && formikTouched && (
        <div className="dark_red_color fs_14">{formikError}</div>
      )}
    </>
  );
};

export default ErrorField;
