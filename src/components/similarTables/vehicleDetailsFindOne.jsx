import React from "react";
import { BalanceStatus } from "../helper";
import DriversDocumentsTable from "../manage-drivers/manageDriversTable/driversDocumentsTable";
import { NavLink } from "react-router-dom";
import driverImage from "../../assets/images/profileimage.png";
import VehicleDocumentsTable from "../manage-drivers/manageDriversTable/vehicleDocumentsTable";

const VehicleDetailsFindOne = ({
  driverData,
  type,
  driverId = "01",
  profileData,
}) => {
  console.log(driverData, "dattaaaa");

  return (
    <div>
      <table className="d-flex col-12 fs_13 gap-3">
        <tbody itemScope="col" className={`d-flex align-items-center col-1`}>
          <img
            src={driverData?.vehicle_photos?.front_photo ?? driverImage}
            alt="image"
            width={80}
          />
        </tbody>
        <tbody itemScope="col" className="col-3">
          <tr>
            <td className={`disabled_color  py-1`}>Vehicle Make</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.vehicle_make}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color  py-1`}>Vehicle Model</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.vehicle_model}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color  py-1`}>
              Vehicle Registration Year
            </td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.vehicle_registration_year}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color  py-1`}>Vehicle Color</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.vehicle_colour}
            </td>
          </tr>
        </tbody>
        <tbody itemScope="col" className="col-3">
          <tr>
            <td className={`disabled_color py-1`}>Vehicle Fuel</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.vehicle_fuel}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>
              Vehicle Registration Number
            </td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.vehicle_registration_number}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>AC/Non-AC</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.ac != null
                ? driverData?.vehicle_details?.ac === "ac"
                  ? "A/C"
                  : "Non-A/C"
                : "--"}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Km During Registration</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.km_during_registration}
            </td>
          </tr>
        </tbody>
        <tbody itemScope="col" className="col-4">
          <tr>
            <td className={`disabled_color py-1`}>Fitness Test Passed?</td>
            <td className={`primary_color`}>
              {driverData?.vehicle_details?.fitness_test_passed}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Ride Type (Default)</td>
            <td className={`primary_color`}>
              {driverData?.rideTypeDefualtName?.ride_type}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Ride Type (Applicable)</td>
            <td className={`primary_color`}>
              {driverData?.rideTypeApplicableName?.map((item, index) => (
                <React.Fragment>
                  {item?.ride_type +
                    (index <
                    (driverData?.rideTypeApplicableName?.length - 1 &&
                      driverData?.rideTypeApplicableName?.length > 0)
                      ? ","
                      : "")}
                </React.Fragment>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      <VehicleDocumentsTable name="Vehicle Documents" driverData={driverData} />
      {profileData.state.edit ? (
        <NavLink
          to={`/manage-drivers/driver-details-edit/${driverId}`}
          className={`d-flex justify-content-end`}
          style={{ textDecoration: "none" }}
        >
          <button
            className={`primary_bg text-white border-0 py-1 px-5 rounded-2 my-2`}
          >
            Edit
          </button>
        </NavLink>
      ) : null}
    </div>
  );
};

export default VehicleDetailsFindOne;
