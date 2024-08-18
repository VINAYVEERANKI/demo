import React, { useEffect, useState } from "react";
import "./manageDriversComponents.css";
import CheckBox from "../../assets/icons/green-checkbox-icon.svg";
import { NavLink } from "react-router-dom";
import driverImage from "../../assets/images/profileimage.png";
import { BalanceStatus, getNewPath } from "../helper";
import { manageDriverVehicleTypeListAction } from "../../redux/actions/manageDriversAction";
import { useDispatch } from "react-redux";

const DriversProfileSidebar = ({ driverData, profileData, type }) => {
  const currentPath = window?.location?.pathname;
  const newPath = getNewPath(currentPath);
  const sidebarData = [
    {
      label: "Driver ID",
      value: driverData?.driverDetails?.driver_id2
        ? driverData?.driverDetails?.driver_id2
        : "--",
      display: true,
    },
    {
      label: "First Name",
      value: driverData?.driverDetails?.first_name
        ? driverData?.driverDetails?.first_name
        : "--",
      display: true,
    },
    {
      label: "Last Name",
      value: driverData?.driverDetails?.last_name
        ? driverData?.driverDetails?.last_name
        : "--",
      display: true,
    },
    {
      label: "Current Balance",
      value: driverData?.driverDetails?.current_balance
        ? driverData?.driverDetails?.current_balance
        : "--",
      display: true,
    },
    {
      label: "Phone Number",
      value: driverData?.driverDetails?.phone_number
        ? driverData?.driverDetails?.phone_number
        : "--",
      display: type !== "permanentlyDeletedDriverRideHistory" ? true : false,
    },
    {
      label: "Email ID",
      value: driverData?.driverDetails?.email
        ? driverData?.driverDetails?.email
        : "--",
      display: type !== "permanentlyDeletedDriverRideHistory" ? true : false,
    },
  ];
  const carDetails = [
    {
      vehicleMake: driverData?.driverDetails?.vehicle_details?.vehicle_make
        ? driverData?.driverDetails?.vehicle_details?.vehicle_make
        : "--",
      vehicleModel: driverData?.driverDetails?.vehicle_details?.vehicle_model
        ? driverData?.driverDetails?.vehicle_details?.vehicle_model
        : "--",
      vehicleRegestrationNumber: driverData?.driverDetails?.vehicle_details
        ?.vehicle_registration_number
        ? driverData?.driverDetails?.vehicle_details
            ?.vehicle_registration_number
        : "--",
    },
  ];

  console.log(driverData, "dskjkfjasjk");
  const dispatch = useDispatch();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [vehicleModelOptions, setVehicleModelOptions] = useState([]);
  const [vehicleMakeOptions, setVehicleMakeOptions] = useState([]);
  useEffect(() => {
    dispatch(
      manageDriverVehicleTypeListAction(onRideTypeSuccess, onRideTypeError)
    );
  }, []);

  const onRideTypeSuccess = (data) => {
    console.log(data, "dsfsdsasd");
    setVehicleTypeList(data?.data);
  };

  const onRideTypeError = (data) => {
    console.log(data);
  };

  const vehicleMakeName = vehicleTypeList?.vehicleMake?.find(
    (item) =>
      item?.id === driverData?.driverDetails?.vehicle_details?.vehicle_make
  )?.vehicle_make;

  const vehicleModelName = vehicleTypeList?.vehicleModel?.find(
    (item) =>
      item?.id === driverData?.driverDetails?.vehicle_details?.vehicle_model
  )?.vehicle_model;
  console.log(type, "dsfsfas");

  return (
    <>
      <div className="sidebar_bg border_radius pb-3 driver_sidebar_container">
        <div className="d-flex ps-3 pt-4 ">
          <img
            src={
              driverData?.driverDetails?.profile_pic?.photo
                ? driverData?.driverDetails?.profile_pic?.photo
                : driverImage
            }
            width={100}
            height={100}
            cross-origin="use-credentials"
            className="drivers_image border_radius_5px"
          />
        </div>
        <div className="px-3 pt-3">
          <div className="driver_car_details_container">
            <table>
              <thead>
                <tr>
                  <th
                    className="primary_color fw_500 text_underline"
                    colSpan="2"
                  >
                    Driver Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {sidebarData
                  ?.filter?.((data) => data?.display)
                  ?.map((item) => {
                    return (
                      <React.Fragment key={item?.label}>
                        <tr>
                          <td
                            className={`secondary_color pe-1 fw_600 fs_13 py-1`}
                          >
                            {item.label}
                          </td>
                          <td
                            className={`${
                              item?.label === "Current Balance"
                                ? BalanceStatus(item.value)
                                : "primary_color"
                            }  fw_600 fs_13 py-1 ps-3`}
                            valign="top"
                          >
                            {item.value}{" "}
                            {item?.is_verified && (
                              <span className="ms-1">
                                <img
                                  src={CheckBox}
                                  className="green_checkbox_icon"
                                  alt="icon"
                                />
                                <span className="fs_12 align-items-center green_color ps-1 fw_500">
                                  Verified
                                </span>
                              </span>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>

            {driverData?.driverDetails?.vehicle_photos !== null && (
              <div className="Car_Details_Sec mt-3 border_radius_5px d-xxl-flex gap-2 white_bg">
                {carDetails.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="d-flex align-items-center justify-content-center justify-content-xxl-start col-xxl-3 col-4 p-2">
                        <img
                          src={
                            driverData?.driverDetails?.vehicle_photos
                              ?.front_photo
                              ? driverData?.driverDetails?.vehicle_photos
                                  ?.front_photo
                              : driverImage
                          }
                          className="ps-2"
                          width={80}
                          height={80}
                          cross-origin="use-credentials"
                        />
                      </div>
                      <div className="col-xl-3 col-4 ps-xl-4 ps-0">
                        <div className="d-flex mt-2 p-2 gap-3 align-items-center">
                          <span className=" fs_12 disabled_color ps-2">
                            {vehicleMakeName ?? "--"}
                          </span>
                          <span className=" fs_12 disabled_color text-nowrap">
                            {vehicleModelName ?? "--"}
                          </span>
                        </div>
                        <div className=" fs_14  Vehicle_Reg_No p-2 ps-2">
                          {item?.vehicleRegestrationNumber}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            <div className="d-flex justify-content-center profile_btn_container">
              <NavLink
                className="border_none border_radius_3px fs_13  fw_500 px-5 white_color blue_color_bg text-decoration-none py-1 view_text"
                to={`${newPath}driver-details/${driverData?.driverDetails?.id}`}
                state={{
                  id: driverData?.driverDetails?.id,
                  edit: profileData?.state?.edit,
                }}
              >
                View Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriversProfileSidebar;
