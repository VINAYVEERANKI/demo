import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { manageDriverVehicleTypeListAction } from "../../redux/actions/manageDriversAction";
import "./manageDriversComponents.css";
import driverImage from "../../assets/images/profileimage.png";
import { BalanceStatus, formatDateTime } from "../helper";
import CheckBox from "../../assets/icons/green-checkbox-icon.svg";
import toggleIcon from "../../assets/icons/menu.svg";
import useDisplayToggle from "../useDisplayToggle";
import DriverPasswordModal from "./manageDriverModals/passwordModal";
import RejectApplicationModal from "./manageDriverModals/reject-applicant-modal";
import DetailsModal from "../modals/detailsModal";

const DriverProfileTop = ({ driverData, profileData, type }) => {
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  const dispatch = useDispatch();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [accountActionPopup, setAccountActionPopup] = useState(false);
  const [banAccountModalShow, setBanAccountModalShow] = useState(false);
  const [rejectApplicationShow, setRejectApplicationShow] = useState(false);
  const [allApproved, setAllApproved] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [passwordObject, setPasswordObject] = useState({});
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const handleDetailsModalClose = () => setDetailsModalShow(false);
  const handleDetailsModalShow = () => setDetailsModalShow(true);
  const menuOptions = [];

  console.log(driverData, type, "profileData");
  const sidebarData = [
    {
      label: "First Name",
      value: driverData?.driverDetails?.first_name
        ? driverData?.driverDetails?.first_name
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
      label: "Last Name",
      value: driverData?.driverDetails?.last_name
        ? driverData?.driverDetails?.last_name
        : "--",
      display: true,
    },
    {
      label: "Email ID",
      value: driverData?.driverDetails?.email
        ? driverData?.driverDetails?.email
        : "--",
      display: type !== "permanentlyDeletedDriverRideHistory" ? true : false,
    },
    {
      label: "Registered Zone",
      value: driverData?.driverDetails?.registered_zone_name?.zone_name
        ? driverData?.driverDetails?.registered_zone_name?.zone_name
        : "--",
      display: true,
    },
    {
      label: "Start Date",
      value: driverData?.driverDetails?.email
        ? driverData?.driverDetails?.email
        : "--",
      display: type !== "permanentlyDeletedDriverRideHistory" ? true : false,
    },
    {
      label: "Driver Type",
      value: driverData?.driverDetails?.driver_type
        ? driverData?.driverDetails?.driver_type
        : "--",
      display: true,
    },
    {
      label: "Total Riders Cancelled",
      value: driverData?.driverDetails?.rides_cancelled_count
        ? driverData?.driverDetails?.rides_cancelled_count
        : "--",
      display: type !== "permanentlyDeletedDriverRideHistory" ? true : false,
    },
    {
      label: "Current Balance",
      value: driverData?.driverDetails?.current_balance
        ? driverData?.driverDetails?.current_balance
        : "--",
      display: true,
    },
    {
      label: "Total Riders Denied",
      value: driverData?.driverDetails?.rides_denied_count
        ? driverData?.driverDetails?.rides_denied_count
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

  useEffect(() => {
    dispatch(
      manageDriverVehicleTypeListAction(onRideTypeSuccess, onRideTypeError)
    );
  }, []);

  const onRideTypeSuccess = (data) => {
    setVehicleTypeList(data?.data);
  };

  const onRideTypeError = (data) => {};

  const vehicleMakeName = vehicleTypeList?.vehicleMake?.find(
    (item) =>
      item?.id === driverData?.driverDetails?.vehicle_details?.vehicle_make
  )?.vehicle_make;

  const vehicleModelName = vehicleTypeList?.vehicleModel?.find(
    (item) =>
      item?.id === driverData?.driverDetails?.vehicle_details?.vehicle_model
  )?.vehicle_model;
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setAccountActionPopup,
  });

  useEffect(() => {
    const datas = {
      addressStatus:
        driverData?.driverDetails?.address_proof?.status ?? "Incomplete",
      dlStatus:
        driverData?.driverDetails?.driving_license?.status ?? "Incomplete",
      profileStatus:
        driverData?.driverDetails?.profile_pic?.status ?? "Incomplete",
      vehicleStatus:
        driverData?.driverDetails?.vehicle_insurance?.status ?? "Incomplete",
      vehicleRCStatus:
        driverData?.driverDetails?.vehicle_rc?.status ?? "Incomplete",
      vehicleImageStatus:
        driverData?.driverDetails?.vehicle_photos?.status ?? "Incomplete",
      backgroundVerifStatus:
        driverData?.driverDetails?.background_verification?.status ??
        "Incomplete",
      physicalVerifStatus:
        driverData?.driverDetails?.physical_verification?.status ??
        "Incomplete",
    };
    setApplicationStatus(datas);
    setAllApproved(
      Object.values(datas).every((status) => status === "Approved")
    );
  }, [driverData]);

  if (type === "manageDrivers" || type === "pendingApplications") {
    menuOptions.push(
      {
        title: "Approve Account",
        modalTitle: "Are you sure you want to approve this profile?",
        password: true,
        reason: false,
        disabled:
          type === "manageDrivers" || allApproved === false || is_approve
            ? true
            : false,
        type: "approve_account",
        successMessage: "Account has been approved successfully!",
        details: false,
        is_navigate: true,
      },
      // {
      //   title: "Reject Account",
      //   modalTitle: "Are you sure you want to reject this profile?",
      //   password: allApproved === true,
      //   reason: allApproved,
      //   disabled: type === "manageDrivers",
      //   type: "reject_account",
      //   successMessage: "Account has been rejected successfully!",
      //   details: false,
      //   is_navigate: true,
      //   reason_for_unapproved_fields: allApproved === true ? false : true,
      // },
      {
        title: "Ban Account",
        modalTitle: "Are you sure you want to ban this application?",
        password: true,
        reason: true,
        disabled: false,
        type: "ban_account",
        successMessage: "Application has been banned!",
        details: false,
        is_navigate: true,
      },
      {
        title: "Block Account",
        modalTitle: "Are you sure you want to block this profile?",
        password: true,
        reason: true,
        disabled: type === "pendingApplications",
        type: "block_account",
        successMessage: "Account has been blocked!",
        details: false,
        is_navigate: true,
      },
      {
        title: "Delete Account",
        modalTitle: "Are you sure you want to delete this profile?",
        password: driverData?.driverDetails?.current_balance >= 0,
        reason: true,
        disabled: false,
        type: "delete_account",
        successMessage: "Account has been Delete successfully!",
        details: false,
        is_navigate: true,
      }
    );
  } else if (type === "blockedDrivers") {
    {
      if (profileData?.state?.edit) {
        menuOptions?.push({
          title: "Unblock Driver",
          modalTitle: "Are you sure you want to unblock Driver?",
          password: true,
          reason: false,
          disabled: false,
          type: "unblock_driver",
          successMessage: "Account has been Unblocked successfully!",
          details: false,
          is_navigate: true,
        });
      }
    }
    menuOptions?.push({
      title: "View Block Details",
      modalTitle: "Block details",
      password: false,
      disabled: false,
      type: "driver_details",
      details: true,
    });
  } else if (type === "rejectedApplications") {
    menuOptions?.push({
      title: "View Reject Details",
      modalTitle: allApproved ? " Reject Details" : "Reject Application",
      password: false,
      reason: false,
      disabled: type === "manageDrivers",
      type: allApproved ? "driver_details" : "reject_account",
      details: allApproved,
      reason_for_unapproved_fields: allApproved === true ? false : true,
    });
  } else if (type === "bannedApplication") {
    menuOptions?.push({
      title: "View Banned Details",
      modalTitle: "Banned details",
      password: false,
      disabled: false,
      type: "driver_details",
      details: true,
    });
  } else if (type === "deletedDriverRideHistory") {
    menuOptions?.push(
      {
        title: "View Delete Details",
        modalTitle: "Deleted Details",
        password: false,
        reason: false,
        disabled: false,
        type: "driver_details",
        details: true,
      },
      {
        title: "Restore Account",
        modalTitle: "Are you sure you want to restore account?",
        password: true,
        reason: false,
        disabled: false,
        type: "restore_account",
        successMessage: "Account restored successfully!",
        details: false,
        is_navigate: true,
      },
      {
        title: "Delete Account Permanently",
        modalTitle: "Are you sure you want to delete this account permanently?",
        password: true,
        reason: false,
        disabled: false,
        type: "perm_del_driver",
        successMessage: "Account deleted permanently!",
        details: false,
        is_navigate: true,
      }
    );
  } else if (type === "permanentlyDeletedDrivers") {
    menuOptions?.push({
      title: "View Delete Details",
      modalTitle: "Deleted Details",
      password: false,
      reason: false,
      disabled: false,
      type: "driver_details",
      details: true,
    });
  }

  const menuDetails = [
    {
      label: "Deleted at",
      value: formatDateTime(driverData?.driverDetails?.deleted_at),
    },
    {
      label: "Deleted by",
      value: driverData?.driverDetails?.deletedBy?.user_name ?? "--",
    },
    {
      label: "Reason",
      value: driverData?.driverDetails?.deleted_reason ?? "--",
    },
  ];

  return (
    <div className={`sidebar_bg border_radius pb-3 row g-0`}>
      <DriverPasswordModal
        passwordShow={banAccountModalShow}
        handlePasswordClose={() => setBanAccountModalShow(false)}
        driverDetails={driverData?.driverDetails}
        id={driverData?.driverDetails?.id}
        reload={driverData}
        type="ban_account"
        passwordObject={passwordObject}
        mainType={type}
        rejectReason={rejectReason}
      />
      <RejectApplicationModal
        rejectApplicationShow={rejectApplicationShow}
        handleRejectApplicationClose={() => setRejectApplicationShow(false)}
        pendingApplicationStatus={applicationStatus}
        setRejectReason={setRejectReason}
        handlePasswordShow={() => setBanAccountModalShow(true)}
        setPasswordObject={setPasswordObject}
        type={type}
        driverDetails={driverData?.driverDetails}
      />
      <div className={`d-flex ps-3 pt-4 col-2`}>
        <img
          src={
            driverData?.driverDetails?.profile_pic?.photo
              ? driverData?.driverDetails?.profile_pic?.photo
              : driverImage
          }
          alt="profile"
          width={100}
          height={100}
          cross-origin="use-credentials"
          className="drivers_image border_radius_5px"
        />
      </div>
      <div className={`pt-3 col-10`}>
        <div
          className={`driver_car_details_container d-flex justify-content-between`}
        >
          <table className={`col-8`}>
            <tbody className={`row g-0`}>
              {sidebarData
                ?.filter?.((data) => data?.display)
                ?.map((item) => {
                  return (
                    <React.Fragment key={item?.label}>
                      <tr className={`col-6 row g-0`}>
                        <td
                          className={`secondary_color pe-1 fw_600 fs_13 py-1 col-6`}
                        >
                          {item.label}
                        </td>
                        <td
                          className={`${
                            item?.label === "Current Balance"
                              ? BalanceStatus(item.value)
                              : "primary_color"
                          }  fw_600 fs_13 py-1 ps-3 col-6`}
                          valign="top"
                        >
                          {item?.label === "Current Balance" && `₹`}
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
          <div className={`col-3 d-flex justify-content-between`}>
            <div>
              {driverData?.driverDetails?.vehicle_photos !== null && (
                <div
                  className={`Car_Details_Sec border_radius_5px d-xxl-flex gap-2 white_bg`}
                >
                  {carDetails.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          style={{ width: "80px" }}
                          className={`d-flex align-items-center justify-content-center justify-content-xxl-start col-xxl-3 col-4`}
                        >
                          <img
                            src={
                              driverData?.driverDetails?.vehicle_photos
                                ?.front_photo
                                ? driverData?.driverDetails?.vehicle_photos
                                    ?.front_photo
                                : driverImage
                            }
                            alt="veh_pic"
                            className="ps-2"
                            width={80}
                            height={50}
                            cross-origin="use-credentials"
                          />
                        </div>
                        <div className="col-xl-3 col-4 ps-xl-2 ps-0">
                          <div className=" fs_12 disabled_color">
                            {driverData?.driverDetails?.driver_id2 ?? "--"}
                          </div>
                          <div className=" fs_12 disabled_color text-nowrap">
                            {vehicleMakeName && vehicleModelName
                              ? vehicleMakeName + " - " + vehicleModelName
                              : "--"}
                          </div>
                          <div className=" fs_14  Vehicle_Reg_No">
                            {item?.vehicleRegestrationNumber ?? "--"}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
            {type === "deletedDriverRideHistory" &&
              profileData?.state?.menuEdit === true && (
                <div
                  className="fs_16 fw_600 position-relative cursor_pointer"
                  onClick={() => setAccountActionPopup(!accountActionPopup)}
                  ref={onClickRef}
                >
                  <div
                    style={{
                      boxShadow: "0px 3px 6px #00000029",
                      width: "28px",
                    }}
                    className={`p-1 text-center rounded-1`}
                  >
                    <img src={toggleIcon} width={15} height={15} alt="icon" />
                  </div>
                  {accountActionPopup ? (
                    <>
                      <div
                        className="driver_more_option_container white_bg border_radius_7px mt-4 me-3 py-1"
                        ref={insideClickRef}
                      >
                        {menuOptions?.map((item, index) => (
                          <>
                            <li
                              style={{ listStyle: "none" }}
                              className="cursor_pointer p-1 mx-2"
                            >
                              <button
                                className={`background_none border_none text-nowrap ${
                                  item?.disabled
                                    ? "disabled_color"
                                    : " primary_color"
                                }  fs_14 fw_600 cursor_pointer`}
                                onClick={() => {
                                  item?.password
                                    ? setBanAccountModalShow(true)
                                    : item?.reason_for_unapproved_fields
                                    ? setRejectApplicationShow(true)
                                    : item?.details
                                    ? handleDetailsModalShow()
                                    : handleErrorMessageShow();
                                  setPasswordObject(item);
                                }}
                                disabled={item?.disabled}
                              >
                                {item?.title}
                              </button>
                            </li>
                            {menuOptions?.length - 1 === index ? (
                              <></>
                            ) : (
                              <hr className="list_underline m-1" />
                            )}
                          </>
                        ))}
                        <hr className="list_underline m-1" />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}
            {type !== "deletedDriverRideHistory" && (
              <div
                className="fs_16 fw_600 position-relative cursor_pointer"
                onClick={() => setAccountActionPopup(!accountActionPopup)}
                ref={onClickRef}
              >
                <div
                  style={{
                    boxShadow: "0px 3px 6px #00000029",
                    width: "28px",
                  }}
                  className={`p-1 text-center rounded-1`}
                >
                  <img src={toggleIcon} width={15} height={15} alt="icon" />
                </div>
                {accountActionPopup ? (
                  <>
                    <div
                      className="driver_more_option_container white_bg border_radius_7px mt-4 me-3 py-1"
                      ref={insideClickRef}
                    >
                      {menuOptions?.map((item, index) => (
                        <>
                          <li
                            style={{ listStyle: "none" }}
                            className="cursor_pointer p-1 mx-2"
                          >
                            <button
                              className={`background_none border_none text-nowrap ${
                                item?.disabled
                                  ? "disabled_color"
                                  : " primary_color"
                              }  fs_14 fw_600 cursor_pointer`}
                              onClick={() => {
                                item?.password
                                  ? setBanAccountModalShow(true)
                                  : item?.reason_for_unapproved_fields
                                  ? setRejectApplicationShow(true)
                                  : item?.details
                                  ? handleDetailsModalShow()
                                  : handleErrorMessageShow();
                                setPasswordObject(item);
                              }}
                              disabled={item?.disabled}
                            >
                              {item?.title}
                            </button>
                          </li>
                          {menuOptions?.length - 1 === index ? (
                            <></>
                          ) : (
                            <hr className="list_underline m-1" />
                          )}
                        </>
                      ))}
                      <hr className="list_underline m-1" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <DetailsModal
        detailsModalShow={detailsModalShow}
        handleDetailsModalClose={handleDetailsModalClose}
        user={menuDetails}
        passwordObject={passwordObject}
      />
    </div>
  );
};

export default DriverProfileTop;
