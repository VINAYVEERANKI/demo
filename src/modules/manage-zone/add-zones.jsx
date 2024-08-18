import React, { useState } from "react";
import AddZoneDetails from "../../components/manage-zones/manage-zone/add-zones-details";
import "./manage-zone.css";

const AddZones = () => {
  const [tab, setTab] = useState("ZoneDetails");

  const navbarList = [
    { label: "Zone Details", value: "ZoneDetails", enable: true },
    { label: "Local & Oustation (Defined Cities)", enable: false },
    { label: "Special Zones & Tolls", enable: false },
    { label: "Deleted Intra Zones", enable: false },
  ];

  return (
    <>
        <div className="manage_zone_container p-3 pb-4 mx-3 my-4">
          <span className="primary_color fs_26 fw_500 px-3">Add New Zone</span>
          <div className="mt-2 row">
            <div className="mt-4">
              <div className="d-flex gap-4 p-2 text-nowrap mx-4 overflow_x_auto manage_zone_heading_container border_radius_7px">
                {navbarList?.map((item) => {
                  return (
                    <React.Fragment key={item?.label}>
                      {item?.enable === true ? (
                        <button
                          onClick={() => {
                            setTab(item?.value);
                          }}
                          className={
                            tab === item?.value
                              ? " cursor-pointer  text-decoration-none background_none px-4  list_heading_border fw_400 orange_yellow_color"
                              : "cursor-pointer text-decoration-none fw_400  white_color fs_16 px-4 list_heading_border background_none"
                          }
                        >
                          {item?.label}
                        </button>
                      ) : (
                        <button
                          className={
                            "cursor-pointer text-decoration-none fw_400  white_color fs_16 pe-4 list_heading_border background_none"
                          }
                        >
                          {item?.label}
                        </button>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="  mx-4  ">
                {tab === "ZoneDetails" && <AddZoneDetails />}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default AddZones;
