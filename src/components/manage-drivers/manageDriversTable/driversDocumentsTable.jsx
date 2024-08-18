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
import AddressProofModal from "../manage-driver/driver-details/driver-documents/edit-modal/address-proof-modal";
import BankDetailsModal from "../manage-driver/driver-details/driver-documents/edit-modal/bank-details-modal";
import DrivingLicenseModal from "../manage-driver/driver-details/driver-documents/edit-modal/driving-license-modal";
import ProfilePhotoModal from "../manage-driver/driver-details/driver-documents/edit-modal/profile-photo-modal";
import BackgroundVerifModal from "../manage-driver/driver-details/driver-documents/edit-modal/background-verif-modal";

const DriversDocumentsTable = ({ type, name = "Documents", driverData }) => {
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [addressProofModalShow, setAddressProofModalShow] = useState(false);
  const [bankDetailsModalShow, setBankDetailsModalShow] = useState(false);
  const [drivingLicenseModalShow, setDrivingLicenseModalShow] = useState(false);
  const [profilePictureModalShow, setProfilePictureModalShow] = useState(false);
  const [editable, setEditable] = useState();
  const [backgroundVerifModalShow, setBackgroundVerifModalShow] =
    useState(false);
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

  const items = [
    {
      document_name: "Address Proof",
      document_details:
        driverData?.driverDetails?.address_proof?.address ?? "-",
      review_status: driverData?.driverDetails?.address_proof?.status ?? "--",
      expiry_date:
        driverData?.driverDetails?.address_proof?.expiry_date ?? null,
      expiry_status:
        driverData?.driverDetails?.address_proof?.expiry_status ?? "-",
    },
    {
      document_name: "Bank Details",
      document_details:
        driverData?.driverDetails?.bank_details?.account_number ?? "-",
      review_status: driverData?.driverDetails?.bank_details?.status ?? "-",
      expiry_date: driverData?.driverDetails?.bank_details?.expiry_date ?? null,
      expiry_status:
        driverData?.driverDetails?.bank_details?.expiry_status ?? "-",
    },
    {
      document_name: "Driving License",
      document_details:
        driverData?.driverDetails?.driving_license?.driving_license_id ?? "-",
      review_status: driverData?.driverDetails?.driving_license?.status ?? "-",
      expiry_date:
        driverData?.driverDetails?.driving_license?.expiry_date ?? null,
      expiry_status:
        driverData?.driverDetails?.driving_license?.expiry_status ?? "-",
    },
    {
      document_name: "Profile Picture",
      document_details: driverData?.driverDetails?.profile_pic?.photo ?? "-",
      review_status:
        driverData?.driverDetails?.physical_verification?.status ?? "-",
      expiry_date:
        driverData?.driverDetails?.vehicle_photos?.expiry_date ?? null,
      expiry_status:
        driverData?.driverDetails?.vehicle_photos?.expiry_status ?? "-",
    },
    {
      document_name: "Background Verification",
      document_details:
        driverData?.driverDetails?.background_verification?.photo_1 ?? "-",
      review_status:
        driverData?.driverDetails?.background_verification?.status ?? "-",
      expiry_date:
        driverData?.driverDetails?.background_verification?.expiry_date ?? null,
      expiry_status:
        driverData?.driverDetails?.background_verification?.expiry_status ??
        "-",
    },
  ];
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

  return (
    <React.Fragment>
      <AddressProofModal
        addressProofModalShow={addressProofModalShow}
        handleAddressProofModalClose={() => setAddressProofModalShow(false)}
        addressProofdata={driverData?.driverDetails?.address_proof}
        is_editable={editable ? true : false}
      />
      <BankDetailsModal
        bankdetailsModalShow={bankDetailsModalShow}
        handleBankDetailsModalClose={() => setBankDetailsModalShow(false)}
        bankDetailsdata={driverData?.driverDetails?.bank_details}
        is_editable={editable ? true : false}
      />
      <DrivingLicenseModal
        licenseModalShow={drivingLicenseModalShow}
        handleLicenseModalClose={() => setDrivingLicenseModalShow(false)}
        drivingLicensedata={driverData?.driverDetails?.driving_license}
        is_editable={editable ? true : false}
      />
      <ProfilePhotoModal
        profilePhotoShow={profilePictureModalShow}
        handleProfilePhotoClose={() => setProfilePictureModalShow(false)}
        profilePictureData={driverData?.driverDetails?.profile_pic}
        is_editable={editable ? true : false}
      />
      <BackgroundVerifModal
        backgroundVerifModalshow={backgroundVerifModalShow}
        handlebackgroundVerifModalClose={() =>
          setBackgroundVerifModalShow(false)
        }
        backgroundVerificationData={
          driverData?.driverDetails?.background_verification
        }
        is_editable={editable ? true : false}
      />
      <div
        style={{ borderBottom: "1.5px solid #1A3869", width: "fit-content" }}
        className="mt-2 primary_color fw_500"
      >
        {name}
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
                  {item?.document_name === "Profile Picture" ||
                  item?.document_name === "Background Verification" ? (
                    <img
                      src={item?.document_details}
                      width={90}
                      height={50}
                      alt="images"
                    />
                  ) : (
                    item?.document_details
                  )}
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
                      : item?.expiry_status === "Invalid"
                      ? "color_F60000"
                      : "primary_color"
                  }`}
                >
                  {item?.expiry_status ? item?.expiry_status : "-"}
                </span>
              </td>
              <td className="d-flex pt-1">
                <span className="d-flex">
                  <button
                    type="button"
                    onClick={() => {
                      setEditable(false),
                        item?.document_name === "Address Proof"
                          ? setAddressProofModalShow(true)
                          : item?.document_name === "Bank Details"
                          ? setBankDetailsModalShow(true)
                          : item?.document_name === "Driving License"
                          ? setDrivingLicenseModalShow(true)
                          : item?.document_name === "Profile Picture"
                          ? setProfilePictureModalShow(true)
                          : item?.document_name === "Background Verification" &&
                            setBackgroundVerifModalShow(true);
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
                          item?.document_name === "Address Proof"
                            ? setAddressProofModalShow(true)
                            : item?.document_name === "Bank Details"
                            ? setBankDetailsModalShow(true)
                            : item?.document_name === "Driving License"
                            ? setDrivingLicenseModalShow(true)
                            : item?.document_name === "Profile Picture"
                            ? setProfilePictureModalShow(true)
                            : item?.document_name ===
                                "Background Verification" &&
                              setBackgroundVerifModalShow(true);
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
      {/* <AddressProofModal
        addressProofModalShow={addressProofModalShow}
        handleAddressProofModalClose={()=>setAddressProofModalShow(false)}
        addressProofdata={addressProofdata}
        driverData={driverData}
        setDriverData={setDriverData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData?.state?.edit}
        type={type}
      /> */}
    </React.Fragment>
  );
};

export default DriversDocumentsTable;
