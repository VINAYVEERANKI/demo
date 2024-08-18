import React, { useState } from "react";
import "../../../manageDriversComponents.css";
import AddressProofModal from "./edit-modal/address-proof-modal"
import BackgroundVerifModal from "./edit-modal/background-verif-modal";
import BankDetailsModal from "./edit-modal/bank-details-modal";
import DrivingLicenseModal from "./edit-modal/driving-license-modal";
import ProfilePhotoModal from "./edit-modal/profile-photo-modal";
import { formatDateTime, statusColor } from "../../../../helper";

const DriversDocument = ({
  profileData,
  driverDetails,
  driverData,
  setDriverData,
  type = "",
}) => {
  const [action, setAction] = useState("");

  const [addressProofModalShow, setAddressProofModalShow] = useState(false);
  const handleAddressProofModalClose = () => setAddressProofModalShow(false);
  const handleAddressProofModalShow = () => setAddressProofModalShow(true);

  const [licenseModalShow, setLicenseModalShow] = useState(false);
  const handleLicenseModalClose = () => setLicenseModalShow(false);
  const handlelicenseModalShow = () => setLicenseModalShow(true);

  const [bankdetailsModalShow, setBankdetailsModalShow] = useState(false);
  const handleBankDetailsModalClose = () => setBankdetailsModalShow(false);
  const handleBankDetailsModalShow = () => setBankdetailsModalShow(true);

  const [profilePhotoShow, setProfilePhotoShow] = useState(false);
  const handleProfilePhotoClose = () => setProfilePhotoShow(false);
  const handleProfilePhotoShow = () => setProfilePhotoShow(true);

  const [backgroundVerifModalshow, setBackgroundVerifModalshow] =
    useState(false);
  const handlebackgroundVerifModalClose = () =>
    setBackgroundVerifModalshow(false);
  const handlebackgroundVerifModalShow = () =>
    setBackgroundVerifModalshow(true);

  const addressProofdata = driverDetails?.address_proof;
  const bankDetailsdata = driverDetails?.bank_details;
  const drivingLicensedata = driverDetails?.driving_license;
  const profilePictureData = driverDetails?.profile_pic;
  const backgroundVerificationData = driverDetails?.background_verification;

  const driverDocumentData = [
    {
      title: "Address Proof",
      details: addressProofdata?.address ? addressProofdata?.address : "--",
      status: addressProofdata?.status
        ? addressProofdata?.status
        : "Incomplete",
      expiryDate: "--",
      expiryStatus: "--",
      modalShowFn: () => handleAddressProofModalShow(),
    },
    {
      title: "Bank Details",
      details: bankDetailsdata?.account_number
        ? bankDetailsdata?.account_number
        : "--",
      status: "--",
      expiryDate: "--",
      expiryStatus: "--",
      modalShowFn: () => handleBankDetailsModalShow(),
    },
    {
      title: "Driving License",
      details: drivingLicensedata?.driving_license_id
        ? drivingLicensedata?.driving_license_id
        : "--",
      status: drivingLicensedata?.status
        ? drivingLicensedata?.status
        : "Incomplete",
      expiryDate: drivingLicensedata?.expiry_date
        ? formatDateTime(drivingLicensedata?.expiry_date, "D/MMM/YYYY")
        : "--",
      expiryStatus: driverDetails?.driving_license?.expiry_status
        ? driverDetails?.driving_license?.expiry_status
        : "--",
      modalShowFn: () => handlelicenseModalShow(),
    },
    {
      title: "Profile Picture",
      details: "--",
      status: profilePictureData?.status
        ? profilePictureData?.status
        : "Incomplete",
      expiryDate: "--",
      expiryStatus: "--",
      modalShowFn: () => handleProfilePhotoShow(),
    },
    {
      title: "Background Verification",
      details: "--",
      status: backgroundVerificationData?.status
        ? backgroundVerificationData?.status
        : "Incomplete",
      expiryDate: "--",
      expiryStatus: "--",
      modalShowFn: () => handlebackgroundVerifModalShow(),
    },
  ];

  return (
    <div className="mt-3">
      <AddressProofModal
        addressProofModalShow={addressProofModalShow}
        handleAddressProofModalClose={handleAddressProofModalClose}
        addressProofdata={addressProofdata}
        driverData={driverData}
        setDriverData={setDriverData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData?.state?.edit}
        type={type}
      />
      <DrivingLicenseModal
        licenseModalShow={licenseModalShow}
        handleLicenseModalClose={handleLicenseModalClose}
        drivingLicensedata={drivingLicensedata}
        driverData={driverData}
        setDriverData={setDriverData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />
      <BankDetailsModal
        bankdetailsModalShow={bankdetailsModalShow}
        handleBankDetailsModalClose={handleBankDetailsModalClose}
        bankDetailsdata={bankDetailsdata}
        driverData={driverData}
        setDriverData={setDriverData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />
      <ProfilePhotoModal
        profilePhotoShow={profilePhotoShow}
        handleProfilePhotoClose={handleProfilePhotoClose}
        profilePictureData={profilePictureData}
        driverData={driverData}
        setDriverData={setDriverData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />
      <BackgroundVerifModal
        backgroundVerifModalshow={backgroundVerifModalshow}
        handlebackgroundVerifModalClose={handlebackgroundVerifModalClose}
        backgroundVerificationData={backgroundVerificationData}
        driverData={driverData}
        setDriverData={setDriverData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />

      <span className="primary_color fw_600 fs_18 text_underline">
        Driver Documents
      </span>
      <div>
        <div className="col-md-12 driver_document_table_container">
          <table className="table mt-2">
            <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="first_list documne_name_heading">
                  <span className="primary_color fs_14 fw_600 ps-3 ">
                    Document Name
                  </span>
                </th>
                <th scope="col" className="documnet_details_heading">
                  <span className="primary_color fs_14 fw_600">
                    Document Details
                  </span>
                </th>
                <th scope="col">
                  <span className="primary_color fs_14 fw_600">
                    Review Status
                  </span>
                </th>
                <th scope="col">
                  <span className="primary_color fs_14 fw_600">
                    Expiry Date
                  </span>
                </th>
                <th scope="col">
                  <span className="primary_color fs_14 fw_600">
                    Expiry Status
                  </span>
                </th>

                <th className={`${styles.last_list} transparent_bg`}></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg">
              {driverDocumentData?.map((item) => (
                <tr className="text-nowrap" key={item?.title}>
                  <td>
                    <span className="secondary_color fs_14 fw_500 ps-3">
                      {item?.title}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.details}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${statusColor(item?.status)} fs_14 fw_600`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.expiryDate}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span
                      className={`${
                        item?.expiryStatus === "Expired"
                          ? "red_color"
                          : "green_color"
                      }  fs_14 fw_500`}
                    >
                      {item?.expiryStatus}
                    </span>
                  </td>

                  <td className="">
                    <button
                      className="border_none border_radius fs_13 me-4 fw_500 px-3 white_color blue_color_bg"
                      type="button"
                      onClick={() => {
                        setAction("view");
                        item?.modalShowFn();
                      }}
                    >
                      View
                    </button>
                    {profileData?.state?.edit &&
                      type !== "deletedDrivers" &&
                      type !== "permanentlyDeletedDrivers" && (
                        <button
                          className="border_none border_radius primary_bg white_color fs_13 px-3"
                          onClick={() => {
                            setAction("edit");
                            item?.modalShowFn();
                          }}
                        >
                          Edit
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriversDocument;
