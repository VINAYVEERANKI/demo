import React from "react";
import ErrorImage from "../assets/images/error-image.png";

const ErrorPageComponent = ({
  title = "Something Went Wrong! Please Try Again Later",
  description = `Lorem ipsum dolor sit amet consectetur. Semper curabitur viverra
potenti eget. Nunc pulvinar cras quam vitae risus ac lorem.
consectetur. Semper curabitur viverra potenti eget. Nunc pulvinar cras
quam vitae risus ac lorem`,
}) => {
  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 `}>
      <div className={`d-flex flex-column w-50`}>
        <span className="text-center">
          <img src={ErrorImage} alt="error" />
        </span>
        <span className="text-center primary_color fw_600 fs_26 pt-3">
          {title}
        </span>
        <span className=" d-flex justify-content-center text-center secondary_color fw_500">
          {description}
        </span>
      </div>
    </div>
  );
};

export default ErrorPageComponent;
