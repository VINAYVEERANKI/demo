import React, { useState } from "react";
import { useNavigate } from "react-router";
import Switch from "react-switch";
import StatusChangeModal from "../rideType-vehicleType/rideType-source/status-change-modal";
import usePermissions from "../usePermissionChecker";

const ManageFaresLayout = ({
  children,
  location,
  navBarList,
  PathName,
  mainNavigate = "",
  edit = false,
  params,
}) => {
  const id = params?.split("&");
  const zone_id = id?.[0];
  const zone_status = localStorage?.getItem("zone_status");

  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [statusValue, setStatusValue] = useState(
    zone_status === "Inactive" ? false : zone_status === "Active" ? true : null
  );
  const handleStatusChange = (nextChecked) => {
    return setChecked(nextChecked);
  };
  const [statusChangeShow, setstatusChangeShowShow] = useState(false);
  const handleStatusChangeClose = () => setstatusChangeShowShow(false);
  const handleStatusChangeShow = () => setstatusChangeShowShow(true);
  return (
    <>
      <StatusChangeModal
        statusChangeShow={statusChangeShow}
        handleStatusChangeClose={handleStatusChangeClose}
        handleStatusChange={handleStatusChange}
        setChecked={setChecked}
        setStatusValue={setStatusValue}
        statusValue={statusValue}
        zone_id={zone_id}
        zone_status={zone_status}
      />
      <div className="default_fare_container  p-3 pb-4 mx-3 my-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="back_icon"
              onClick={() => {
                navigate(mainNavigate);
              }}
            >
              <i className="ri-arrow-left-s-line fs_30 fw_700 primary_color"></i>
            </button>
            <span className="primary_color fw_600 fs_21 ">{location}</span>
          </div>
        </div>

        <div className="manage_fare_list_container mt-4">
          <div className=" manage_fare_heading_container d-flex  py-2  text-nowrap primary_bg border_radius">
            {navBarList?.map((item) => {
              return (
                <button
                  onClick={() => {
                    navigate(item?.navigation, {
                      state: { fare: item?.fare, edit: edit },
                    });
                  }}
                  className={
                    PathName === item?.value
                      ? " cursor-pointer text-decoration-none background_none  px-5 border_right border-top-0 border-start-0 border-bottom-0  fw_500 tertiary_color"
                      : `cursor-pointer text-decoration-none fw_500 white_color fs_16 px-5 border_right  border-top-0 border-start-0 border-bottom-0   background_none`
                  }
                  key={item?.navigation}
                  disabled={PathName === item?.value}
                >
                  {item?.label}
                </button>
              );
            })}
          </div>
          <div className="mx-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ManageFaresLayout;
