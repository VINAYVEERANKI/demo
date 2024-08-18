import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import LoadAndError from "../../utilits/loadAndError";
import Savebtn from "../../utilits/buttons/savebtn";
import Resetbtn from "../../utilits/buttons/resetbtn";
import { statusColor } from "../../helper";

const RideTypeZoneModal = ({
  rideTypeZoneModal,
  handleRideTypeZoneClose,
  formik,
  type,
  setSearch,
  filteredRideTypeZone,
  zoneEditable,
  zoneLoading,
}) => {
  console.log(zoneEditable, "asdadasdsda");

  const handleDocumentationAvailabilityChange = (checked, zoneId) => {
    const existingPermission = formik.values.applicable_zone_permission?.find(
      (permission) => permission.zone_id === zoneId
    );

    if (checked) {
      if (!existingPermission) {
        formik.setFieldValue("applicable_zone_permission", [
          ...formik.values.applicable_zone_permission,
          {
            zone_id: zoneId,
            documentation_availablity: true,
            booking_availablity: false,
          },
        ]);
      } else {
        const updatedPermission = {
          ...existingPermission,
          documentation_availablity: true,
        };
        if (!existingPermission.booking_availablity) {
          updatedPermission.booking_availablity = false;
        }
        formik.setFieldValue(
          "applicable_zone_permission",
          formik.values.applicable_zone_permission.map((permission) =>
            permission.zone_id === zoneId ? updatedPermission : permission
          )
        );
      }
    } else {
      const updatedPermission = {
        ...existingPermission,
        documentation_availablity: false,
      };
      if (!existingPermission.booking_availablity) {
        updatedPermission.booking_availablity = false;
      }
      formik.setFieldValue(
        "applicable_zone_permission",
        formik.values.applicable_zone_permission.map((permission) =>
          permission.zone_id === zoneId ? updatedPermission : permission
        )
      );
    }
  };

  const handleBookingAvailabilityChange = (checked, zoneId) => {
    const existingPermission = formik.values.applicable_zone_permission?.find(
      (permission) => permission.zone_id === zoneId
    );

    if (checked) {
      if (!existingPermission) {
        formik.setFieldValue("applicable_zone_permission", [
          ...formik.values.applicable_zone_permission,
          {
            zone_id: zoneId,
            documentation_availablity: true,
            booking_availablity: true,
          },
        ]);
      } else {
        const updatedPermission = {
          ...existingPermission,
          booking_availablity: true,
          documentation_availablity: true,
        };
        formik.setFieldValue(
          "applicable_zone_permission",
          formik.values.applicable_zone_permission.map((permission) =>
            permission.zone_id === zoneId ? updatedPermission : permission
          )
        );
      }
    } else {
      const updatedPermission = {
        ...existingPermission,
        booking_availablity: false,
      };
      formik.setFieldValue(
        "applicable_zone_permission",
        formik.values.applicable_zone_permission.map((permission) =>
          permission.zone_id === zoneId ? updatedPermission : permission
        )
      );
    }
  };

  return (
    <>
      <Modal
        show={rideTypeZoneModal}
        onHide={handleRideTypeZoneClose}
        dialogClassName="ride_type_zone_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        centered
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body className="p-0">
          <div className="d-flex align-items-center rideType_zone_heading_container py-2 px-2">
            <i
              className="ri-arrow-left-s-line primary_color fs_26 fw_700 cursor_pointer"
              onClick={() => {
                handleRideTypeZoneClose();
              }}
            />
            <span className="fs_24 fw_600 primary_color text-center flex-grow-1">
              Applicable Zones & Permissions
            </span>
          </div>
          <div className="d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-end px-3">
              <div className="mt-3 w_40 position-relative">
                <input
                  className="w-100 border_radius zone_input fs_14 ps-2 outline_none py-1"
                  placeholder="Search 'Zone' here"
                  id="zoneSearch"
                  onChange={(e) => {
                    setSearch(e.target.value?.toLowerCase());
                  }}
                />
                <label className="search_icon" htmlFor="zoneSearch">
                  <i className="ri-search-line primary_color"></i>
                </label>
              </div>
            </div>
            <div className="zone_scroll_bar_container mt-2 px-3">
              <table className="table text-nowrap no_border_table">
                <thead className="table_heading">
                  <tr className="fs_16 fw_500 primary_color white_bg">
                    <th scope="col" className="">
                      Zone Name
                    </th>
                    <th className="">Zone Status</th>
                    <th className="text-center">Documentation Availability</th>
                    <th className="text-center">
                      {type !== "CreateRideType" && "Booking Availability"}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className=" ">
                  <LoadAndError
                    loader={zoneLoading}
                    //   error={error}
                    status={filteredRideTypeZone?.length === 0}
                  >
                    {filteredRideTypeZone?.map((item) => (
                      <tr key={item.value} className={""}>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.label ? item?.label : "--"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`${statusColor(
                              item?.status
                            )} fs_14 fw_500`}
                          >
                            {item?.status ? item?.status : "--"}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="secondary_color fs_14">
                            <input
                              type="checkbox"
                              checked={
                                formik.values.applicable_zone_permission?.find(
                                  (permission) =>
                                    permission?.zone_id === item.value
                                )?.documentation_availablity
                              }
                              disabled={
                                item?.status === "Archived" ||
                                zoneEditable === false ||
                                formik.values.applicable_zone_permission?.find(
                                  (permission) =>
                                    permission?.zone_id === item.value
                                )?.booking_availablity
                              }
                              onChange={(e) => {
                                handleDocumentationAvailabilityChange(
                                  e.target.checked,
                                  item.value
                                );
                              }}
                            />
                          </span>
                        </td>
                        <td className="text-center">
                          {type !== "CreateRideType" && (
                            <span className="secondary_color fs_14">
                              <input
                                type="checkbox"
                                checked={
                                  formik.values.applicable_zone_permission?.find(
                                    (permission) =>
                                      permission?.zone_id === item.value
                                  )?.booking_availablity
                                }
                                disabled={
                                  item?.status === "Archived" ||
                                  zoneEditable === false
                                }
                                onChange={(e) => {
                                  handleBookingAvailabilityChange(
                                    e.target.checked,
                                    item.value
                                  );
                                }}
                              />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </LoadAndError>
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center gap-4 rideType_zone_down_btns_container py-3 px-2">
              <button
                className="body_bg border_none py-1 px-sm-4 px-2 border_radius_5px fw_600 d-flex align-items-center gap-2"
                type="button"
                onClick={() => {
                  // formik.resetForm();
                  handleRideTypeZoneClose();
                }}
              >
                <i className="ri-arrow-left-s-line primary_color fs_20 fw_700 cursor_pointer"></i>{" "}
                Go Back
              </button>
              <Resetbtn onResetFn={() => formik.resetForm()} />
              <Savebtn submitFn={() => handleRideTypeZoneClose()} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RideTypeZoneModal;
