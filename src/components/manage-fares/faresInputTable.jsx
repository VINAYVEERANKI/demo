import React from "react";
import FaresInputForm from "./faresInputForm";
import { removeUnderScore } from "../helper";
import "../../components/manage-fares/manage-fare/manageFaresTables.css";

const FaresInputTable = ({
  faresData = [],
  keyOrder = [],
  disableTable,
  mainType = "",
  reload,
  setReload,
  editingStatus,
  setEditingStatus,
  pricingModule,
  tableType,
  subZoneId,
  mainZoneId,
  manageZareEdit,
  is_editable,
}) => {
  const disableItems = [];
  if (
    mainType === "localDefaultFare" ||
    mainType === "specialZoneDefaultFare"
  ) {
    disableItems.push("parking_fee", "transport_hub_fee", "booking_fee");
  } else if (mainType === "RentalDefaultFare") {
    disableItems.push("booking_fee");
  } else if (mainType === "oneWayDefaultFare") {
    disableItems.push("booking_fee");
  } else if (mainType === "RoundTripDefaultFare") {
    disableItems.push("booking_fee");
  }

  console.log(faresData.length ? "aaaaaa" : "aaaaaaaapp");

  return (
    <div className="mx-2 mt-3 d-flex">
      <div className="table_rideType">
        <div className="d-flex  ">
          <div className="">
            <div className="py-2 fw_500 fs_14  text-nowrap pale_blue_bg input_width_fares">
              <span className="ps-3">
                {mainType === "RentalDefaultFare" ||
                mainType === "RentalManageFare"
                  ? "Package Time"
                  : "Ride Type"}
              </span>
            </div>
          </div>
          {keyOrder.map((key) => (
            <div>
              <div
                className={`${
                  disableItems.includes(key)
                    ? "dark_grey_color text-center pale_blue_bg input_width_fares"
                    : "primary_color text-center pale_blue_bg input_width_fares"
                } py-2 fw_500 fs_14 text-nowrap "`}
                key={key}
              >
                {key
                  ? removeUnderScore(key) + `${key === "base_km" ? "" : "(₹)"} `
                  : "--"}
              </div>
            </div>
          ))}

          <div className="">
            <input
              className="empty_fares_width border_none outline_none py-2 fs_14"
              disabled
            />
          </div>
        </div>

        {faresData.length ? (
          <div className="mb-4">
            {faresData?.map((item, idx) => {
              return (
                <FaresInputForm
                  key={idx}
                  item={item}
                  disableItems={disableItems}
                  keyOrder={keyOrder}
                  disableTable={disableTable}
                  mainType={mainType}
                  reload={reload}
                  setReload={setReload}
                  editingStatus={editingStatus}
                  setEditingStatus={setEditingStatus}
                  pricingModule={pricingModule}
                  tableType={tableType}
                  subZoneId={subZoneId}
                  mainZoneId={mainZoneId}
                  manageZareEdit={manageZareEdit}
                  is_editable={is_editable}
                />
              );
            })}
          </div>
        ) : (
          <div className="empty_fare_table ">
            <div className="fs_sm_13 fs_16 position-absolute top-50 start-50 translate-middle">
              ---This table is empty ---
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaresInputTable;
