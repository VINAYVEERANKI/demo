import React, { useState } from "react";
import VehicleInsuranceModal from "./edit-modal/vehicle-insurance-modal";
import VehicleRCModal from "./edit-modal/vehicle-rc-modal";
import VehiclePhotoModal from "./edit-modal/vehicle-photo-modal";
import PhysicalVerifModal from "./edit-modal/physical-verif-modal";
import { formatDateTime, statusColor } from "../../../../helper";

const VehicleDocuments = ({
  profileData,
  driverDetails,
  driverData,
  setDriverData,
  type,
}) => {
  const [action, setAction] = useState("");
  // edit
  const [vehicleInsuranceshow, setVehicleInsuranceShow] = useState(false);
  const handleVehicleInsuranceClose = () => setVehicleInsuranceShow(false);
  const handleVehicleInsuranceShow = () => setVehicleInsuranceShow(true);

  const [vehicleRegistrationShow, setVehicleRegistrationShow] = useState(false);
  const handleVehicleRegistrationClose = () =>
    setVehicleRegistrationShow(false);
  const handleVehicleRegistrationShow = () => setVehicleRegistrationShow(true);

  const [vehiclePhotoshow, setVehiclePhotoShow] = useState(false);
  const handleVehiclePhotoClose = () => setVehiclePhotoShow(false);
  const handleVehiclePhotoShow = () => setVehiclePhotoShow(true);

  const [physicalVerifModalshow, setPhysicalVerifModalshow] = useState(false);
  const handlephysicalVerifModalClose = () => setPhysicalVerifModalshow(false);
  const handlephysicalVerifModalShow = () => setPhysicalVerifModalshow(true);

  const vehicleInsurancedata = driverDetails?.vehicle_insurance;
  const vehicleRCdata = driverDetails?.vehicle_rc;
  const vehiclePhotosdata = driverDetails?.vehicle_photos;
  const physicalVerificationData = driverDetails?.physical_verification;

  const vehicleDocumentData = [
    {
      title: "Vehicle Insurance",
      details: vehicleInsurancedata?.vehicle_insurance_id
        ? vehicleInsurancedata?.vehicle_insurance_id
        : "--",
      status: vehicleInsurancedata?.status
        ? vehicleInsurancedata?.status
        : "Incomplete",
      expiryDate: formatDateTime(
        vehicleInsurancedata?.expiry_date,
        "D/MMM/YYYY"
      ),
      expiryStatus: vehicleInsurancedata?.expiry_status
        ? vehicleInsurancedata?.expiry_status
        : "--",
      modalShowFn: () => handleVehicleInsuranceShow(),
    },
    {
      title: "Vehicle RC",
      details: vehicleRCdata?.vehicle_rc_id
        ? vehicleRCdata?.vehicle_rc_id
        : "--",
      status: vehicleRCdata?.status ? vehicleRCdata?.status : "Incomplete",
      expiryDate: formatDateTime(vehicleRCdata?.expiry_date, "D/MMM/YYYY"),
      expiryStatus: vehicleRCdata?.expiry_status
        ? vehicleRCdata?.expiry_status
        : "--",
      modalShowFn: () => handleVehicleRegistrationShow(),
    },
    {
      title: "Vehicle Images",
      details: "--",
      status: vehiclePhotosdata?.status
        ? vehiclePhotosdata?.status
        : "Incomplete",
      expiryDate: "--",
      expiryStatus: "--",
      modalShowFn: () => handleVehiclePhotoShow(),
    },
    {
      title: "Physical Verification",
      details: "--",
      status: physicalVerificationData?.status
        ? physicalVerificationData?.status
        : "Incomplete",
      expiryDate: "--",
      expiryStatus: "--",
      modalShowFn: () => handlephysicalVerifModalShow(),
    },
  ];

  return (
    <div className="mt-3">
      <VehicleInsuranceModal
        vehicleInsuranceshow={vehicleInsuranceshow}
        handleVehicleInsuranceClose={handleVehicleInsuranceClose}
        driverData={driverData}
        setDriverData={setDriverData}
        vehicleInsurancedata={vehicleInsurancedata}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />

      <VehicleRCModal
        vehicleRegistrationShow={vehicleRegistrationShow}
        handleVehicleRegistrationClose={handleVehicleRegistrationClose}
        driverData={driverData}
        setDriverData={setDriverData}
        vehicleRCdata={vehicleRCdata}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />
      <VehiclePhotoModal
        vehiclePhotoshow={vehiclePhotoshow}
        handleVehiclePhotoClose={handleVehiclePhotoClose}
        driverData={driverData}
        setDriverData={setDriverData}
        vehiclePhotosdata={vehiclePhotosdata}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />
      <PhysicalVerifModal
        physicalVerifModalshow={physicalVerifModalshow}
        handlephysicalVerifModalClose={handlephysicalVerifModalClose}
        driverData={driverData}
        setDriverData={setDriverData}
        physicalVerificationData={physicalVerificationData}
        action={action}
        setAction={setAction}
        id={driverDetails?.id}
        is_editable={profileData.state.edit}
        type={type}
      />

      <span className="primary_color fw_600 fs_18 text_underline">
        Vehicle Documents
      </span>
      <div>
        <div className="col-md-12 driver_document_table_container">
          <table className="table mt-2 ">
            <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="first_list documne_name_heading">
                  <span className="primary_color fs_14 fw_600 ps-3">
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

            <tbody className="light_blue_bg ">
              {vehicleDocumentData?.map((item) => (
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
                          : item?.expiryStatus === "Valid"
                          ? "green_color"
                          : "primary_color"
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
                    {profileData.state?.edit &&
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
export default VehicleDocuments;
