import React, { useState } from "react";
import styles from "../../../modules/manage-admins/manage-admins.module.css";
import SearchInputfield from "../../form/searchInputfield";
import { NavLink, useLocation } from "react-router-dom";
import {
  BalanceStatus,
  formatAmount,
  formatDateTime,
  removeUnderScore,
} from "../../helper";
import usePermissions from "../../usePermissionChecker";
import moment from "moment";
import VehicleInsuranceModal from "../manage-driver/vehicle-details/vehicle-documents/edit-modal/vehicle-insurance-modal";
import VehicleRCModal from "../manage-driver/vehicle-details/vehicle-documents/edit-modal/vehicle-rc-modal";
import VehiclePhotoModal from "../manage-driver/vehicle-details/vehicle-documents/edit-modal/vehicle-photo-modal";
import PhysicalVerifModal from "../manage-driver/vehicle-details/vehicle-documents/edit-modal/physical-verif-modal";

const VehicleDocumentsTable = ({ type, driverData }) => {
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [vehicleInsuranceShow, setVehicleInsuranceShow] = useState(false);
  const [vehicleRCShow, setVehicleRCShow] = useState(false);
  const [vehicleImagesShow, setVehicleImagesShow] = useState(false);
  const [physicalVerificationShow, setPhysicalVerificationShow] =
    useState(false);
  const [editable, setEditable] = useState();
  const params = useLocation();
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    manageDrivers: "manage_drivers",
    blockedDrivers: "blocked_driver",
    rejectApplication: "rejected_application",
    bannedApplication: "banned_application",
    expiredDocuments: "expired_documents",
  };
  const permission = pagePermissions[type];

  const requestSort = "";
  const sortConfig = "";
  const tableHeading = [
    { title: "Document Name", value: "document_name", display: true },
    { title: "Document Details", value: "document_details", display: true },
    { title: "Review Status", value: "review_status", display: true },
    {
      title: "Expiry Date",
      value: "expiry_date",
      display: true,
    },
    {
      title: "Expiry Status",
      value: "expiry_status",
      display: true,
    },
  ];

  const items = [
    {
      document_name: "Vehicle Insurance",
      document_details:
        driverData?.vehicle_insurance?.vehicle_insurance_id ?? "--",
      review_status: driverData?.vehicle_insurance?.status ?? "--",
      expiry_date: driverData?.vehicle_insurance?.expiry_date ?? null,
      expiry_status: driverData?.vehicle_insurance?.expiry_status ?? "--",
    },
    {
      document_name: "Vehicle RC",
      document_details: driverData?.vehicle_rc?.vehicle_rc_id ?? "--",
      review_status: driverData?.vehicle_rc?.status ?? "--",
      expiry_date: driverData?.vehicle_insurance?.expiry_date ?? null,
      expiry_status: driverData?.vehicle_insurance?.expiry_status ?? "--",
    },
    {
      document_name: "Vehicle Images",
      document_details: "-",
      review_status: driverData?.vehicle_photos?.status,
      expiry_date: driverData?.vehicle_photos?.expiry_date ?? null,
      expiry_status: driverData?.vehicle_photos?.expiry_status ?? "-",
    },
    {
      document_name: "Physical Verification",
      document_details:
        driverData?.physical_verification?.physical_verification_id ?? "-",
      review_status: driverData?.physical_verification?.status ?? "-",
      expiry_date: driverData?.vehicle_photos?.expiry_date ?? null,
      expiry_status: driverData?.vehicle_photos?.expiry_status ?? "-",
    },
  ];
  return (
    <React.Fragment>
      <VehicleInsuranceModal
        vehicleInsuranceshow={vehicleInsuranceShow}
        handleVehicleInsuranceClose={() => setVehicleInsuranceShow(false)}
        vehicleInsurancedata={driverData?.vehicle_insurance}
        is_editable={
          params?.pathname.includes("/manage-drivers/driver-details-edit/") &&
          editable === true
            ? true
            : false
        }
      />
      <VehicleRCModal
        vehicleRegistrationShow={vehicleRCShow}
        handleVehicleRegistrationClose={() => setVehicleRCShow(false)}
        vehicleRCdata={driverData?.vehicle_rc}
        is_editable={
          params?.pathname.includes("/manage-drivers/driver-details-edit/") &&
          editable === true
            ? true
            : false
        }
      />
      <VehiclePhotoModal
        vehiclePhotoshow={vehicleImagesShow}
        handleVehiclePhotoClose={() => setVehicleImagesShow(false)}
        vehiclePhotosdata={driverData?.vehicle_photos}
        is_editable={
          params?.pathname.includes("/manage-drivers/driver-details-edit/") &&
          editable === true
            ? true
            : false
        }
      />
      <PhysicalVerifModal
        physicalVerifModalshow={physicalVerificationShow}
        handlephysicalVerifModalClose={() => setPhysicalVerificationShow(false)}
        physicalVerificationData={driverData?.physical_verification}
        is_editable={
          params?.pathname.includes("/manage-drivers/driver-details-edit/") &&
          editable === true
            ? true
            : false
        }
      />
      <div
        style={{ borderBottom: "1.5px solid #1A3869", width: "fit-content" }}
        className="mt-2 primary_color fw_500"
      >
        Vehicle Documents
      </div>
      <table className="w-100 my-2">
        <thead>
          <tr className={`pale_blue_bg`}>
            <th
              scope="col"
              style={{ minWidth: "10px" }}
              className={`${styles.first_list} transparent_bg`}
            ></th>
            {tableHeading
              ?.filter((item) => item?.display === true)
              .map((item, index) => {
                const isActiveSortIndex = activeSortIndex === index;
                return (
                  <React.Fragment key={index}>
                    <SearchInputfield
                      title={item?.title}
                      requestSort={requestSort}
                      sortName={item?.value}
                      key={item?.title}
                      index={index}
                      isActiveSortIndex={isActiveSortIndex}
                      setActiveSortIndex={setActiveSortIndex}
                      sortConfig={sortConfig}
                      colorName={`primary_color m-1 my-2`}
                    />
                  </React.Fragment>
                );
              })}
            <th
              scope="col"
              className={`${styles.last_list} transparent_bg`}
            ></th>
          </tr>
        </thead>

        <tbody>
          {items?.map((item) => (
            <tr className={`${styles.border_bottom_DDE1E6}`} key={item?.id}>
              <td></td>
              <td className="py-2">
                <span className="secondary_color fs_14 fw_500">
                  {item?.document_name ? item?.document_name : "--"}
                </span>
              </td>
              <td>
                <span className="secondary_color fs_14 fw_500">
                  {item?.document_details ? item?.document_details : "--"}
                </span>
              </td>
              <td>
                <span
                  className={`secondary_color fs_14 fw_500 ${
                    item?.review_status === "Approved"
                      ? "green_color"
                      : "color_F60000"
                  }`}
                >
                  {item?.review_status ? item?.review_status : "--"}
                </span>
              </td>

              <td>
                <span className="secondary_color fs_14 fw_500">
                  {item?.expiry_date
                    ? moment(item?.expiry_date).format("DD/MMMM/YYYY")
                    : "-"}
                </span>
              </td>
              <td>
                <span
                  className={`secondary_color fs_14 fw_500 ${
                    item?.expiry_status === "Valid"
                      ? "green_color"
                      : item?.expiry_status === "-"
                      ? ``
                      : "color_F60000"
                  }`}
                >
                  {item?.expiry_status ? item?.expiry_status : "--"}
                </span>
              </td>
              <td className="d-flex pt-1">
                <span className="d-flex">
                  <button
                    type="button"
                    onClick={() => {
                      setEditable(false),
                        item?.document_name === "Vehicle Insurance"
                          ? setVehicleInsuranceShow(true)
                          : item?.document_name === "Vehicle RC"
                          ? setVehicleRCShow(true)
                          : item?.document_name === "Vehicle Images"
                          ? setVehicleImagesShow(true)
                          : item?.document_name === "Physical Verification" &&
                            setPhysicalVerificationShow(true);
                    }}
                    className={`border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text`}
                  >
                    View
                  </button>
                  {/* <NavLink
                    className={`border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text`}
                    to={`/manage-drivers/driver-rideHistory/01`}
                    state={{
                      id: item?.id,
                    }}
                  >
                    View
                  </NavLink> */}
                </span>
                {params?.pathname.includes(
                  "/manage-drivers/driver-details-edit/"
                ) && (
                  <span className="d-flex">
                    <button
                      className={`border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color primary_bg view_text`}
                      type="button"
                      onClick={() => {
                        setEditable(true),
                          item?.document_name === "Vehicle Insurance"
                            ? setVehicleInsuranceShow(true)
                            : item?.document_name === "Vehicle RC"
                            ? setVehicleRCShow(true)
                            : item?.document_name === "Vehicle Images"
                            ? setVehicleImagesShow(true)
                            : item?.document_name === "Physical Verification" &&
                              setPhysicalVerificationShow(true);
                      }}
                    >
                      Edit
                    </button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default VehicleDocumentsTable;
