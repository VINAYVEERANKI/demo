import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import VehicleDocuments from "./manage-driver/vehicle-details/vehicle-documents/vehicle-documents";
import { useDispatch, useSelector } from "react-redux";
import * as driverAction from "../../redux/actions/manageDriversAction";
import DriversProfileDocument from "./manage-driver/driver-details/drivers-profile-document";
import DriversDocument from "./manage-driver/driver-details/driver-documents/drivers-document";
import VehicleDetails from "./manage-driver/vehicle-details/vehicle-details";
import InnerLayout from "../layout/innerLayout";
import ErrorMessagemodal from "../modals/errorMessageModal";
import { insertSpaceUnderScore, statusColor } from "../helper";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import { pendingApplicantReadAction } from "../../redux/actions/pendApplicantAction";
import RejectApplicationModal from "./manageDriverModals/reject-applicant-modal";
import DriverPasswordModal from "./manageDriverModals/passwordModal";
import { blockedApplicantReadAction } from "../../redux/actions/manageDrivers/blockedApplicantAction";
import DetailsModal from "../modals/detailsModal";
import { formatDateTime } from "../helper";
import { rejectApplicantReadAction } from "../../redux/actions/rejectedApplicantAction";
import ErrorPageComponent from "../errorPageComponent";
import { bannedApplicantReadAction } from "../../redux/actions/manageDrivers/bannedApplicantAction";
import { expiredprofileReadAction } from "../../redux/actions/expiredDocumentAction";
import {
  deleteDriverProfileReadAction,
  permdeleteDriverProfileReadAction,
} from "../../redux/actions/manageDrivers/deletedDriverAction";
import useDisplayToggle from "../useDisplayToggle";

const DriverDetailComponent = ({ type = "", profileData = {} }) => {
  const navigate = useNavigate();
  const [documentShow, setDocumentShow] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [allApproved, setAllApproved] = useState(false);
  const [profileEditDisabled, setProfileEditDisabled] = useState(false);
  const [vehicleDetailsDisabled, setVehicleDetailsDisabled] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [passwordShow, setPasswordShow] = useState(false);
  const handlePasswordClose = () => setPasswordShow(false);
  const handlePasswordShow = () => setPasswordShow(true);

  const dispatch = useDispatch();
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);
  const params = useParams();

  const [driverData, setDriverData] = useState(false);
  const [is_approve, setIs_approve] = useState(false);
  console.log(is_approve, "ddkfhal");

  const {
    data: { data: driverDetails },
    loading,
    error,
  } = useSelector((store) =>
    type === "manageDrivers"
      ? store.manageDriverReducer
      : type === "pendingApplications"
      ? store.pendingApplicantReducer
      : type === "blockedDrivers"
      ? store.blockedApplicantReducer
      : type === "rejectedApplications"
      ? store.rejectApplicantReducer
      : type === "bannedApplication"
      ? store.bannedApplicantReducer
      : type === "expiredDocuments"
      ? store.expiredApplicantReducer
      : type === "deletedDrivers"
      ? store.deletedDriverReducer
      : store.perDeletedDriverReducer
  );

  useEffect(() => {
    const driverId = {
      driver_id: params?.id,
    };
    if (type === "manageDrivers") {
      dispatch(driverAction.driverProfileReadAction(driverId, onError));
    } else if (type === "pendingApplications") {
      dispatch(pendingApplicantReadAction(driverId, onError));
    } else if (type === "blockedDrivers") {
      dispatch(blockedApplicantReadAction(driverId, onError));
    } else if (type === "rejectedApplications") {
      dispatch(rejectApplicantReadAction(driverId, onError));
    } else if (type === "bannedApplication") {
      dispatch(bannedApplicantReadAction(driverId, onError));
    } else if (type === "expiredDocuments") {
      dispatch(expiredprofileReadAction(driverId, onError));
    } else if (type === "deletedDrivers") {
      dispatch(deleteDriverProfileReadAction(params?.id, onError));
    } else if (type === "permanentlyDeletedDrivers") {
      dispatch(permdeleteDriverProfileReadAction(params?.id, onError));
    }
  }, [driverData, type]);

  const onError = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const datas = {
      addressStatus: driverDetails?.address_proof?.status ?? "Incomplete",
      dlStatus: driverDetails?.driving_license?.status ?? "Incomplete",
      profileStatus: driverDetails?.profile_pic?.status ?? "Incomplete",
      vehicleStatus: driverDetails?.vehicle_insurance?.status ?? "Incomplete",
      vehicleRCStatus: driverDetails?.vehicle_rc?.status ?? "Incomplete",
      vehicleImageStatus: driverDetails?.vehicle_photos?.status ?? "Incomplete",
      backgroundVerifStatus:
        driverDetails?.background_verification?.status ?? "Incomplete",
      physicalVerifStatus:
        driverDetails?.physical_verification?.status ?? "Incomplete",
    };
    setApplicationStatus(datas);
    setAllApproved(
      Object.values(datas).every((status) => status === "Approved")
    );
  }, [driverDetails]);

  const [rejectApplicationShow, setRejectApplicationShow] = useState(false);
  const handleRejectApplicationClose = () => setRejectApplicationShow(false);
  const handleRejectApplicationShow = () => setRejectApplicationShow(true);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const handleDetailsModalClose = () => setDetailsModalShow(false);
  const handleDetailsModalShow = () => setDetailsModalShow(true);
  const [passwordObject, setPasswordObject] = useState({});
  const menuOptions = [];

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
      {
        title: "Reject Account",
        modalTitle: "Are you sure you want to reject this profile?",
        password: allApproved === true,
        reason: allApproved,
        disabled: type === "manageDrivers",
        type: "reject_account",
        successMessage: "Account has been rejected successfully!",
        details: false,
        is_navigate: true,
        reason_for_unapproved_fields: allApproved === true ? false : true,
      },
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
        password: driverDetails?.current_balance >= 0,
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
  } else if (type === "deletedDrivers") {
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

  console.log(menuOptions, "slkfsdfslf");

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDocumentShow,
  });
  const buttonList = [
    (profileData.state.edit && type !== "expiredDocuments") ||
    type === "bannedApplication" ||
    type === "blockedDrivers" ||
    type === "rejectedApplications" ||
    type === "deletedDrivers" ? (
      <i
        className="ri-more-2-fill fs_20 p-1 fw_700 grey_color_bg border_radius_3px cursor_pointer"
        onClick={() => {
          setDocumentShow(!documentShow);
        }}
        ref={onClickRef}
      ></i>
    ) : (
      <></>
    ),
  ];
  const blockDetails = [];
  if (type === "blockedDrivers") {
    blockDetails?.push(
      {
        label: "Blocked at",
        value: formatDateTime(driverDetails?.blocked_at),
      },
      {
        label: "Blocked by",
        value: driverDetails?.blockedBy?.user_name ?? "--",
      },
      {
        label: "Reason",
        value: driverDetails?.blocked_reason ?? "--",
      }
    );
  } else if (type === "bannedApplication") {
    blockDetails?.push(
      {
        label: "Banned at",
        value: formatDateTime(driverDetails?.banned_at),
      },
      {
        label: "Banned by",
        value: driverDetails?.bannedBy?.user_name ?? "--",
      },
      {
        label: "Reason",
        value: driverDetails?.banned_reason ?? "--",
      }
    );
  } else if (
    type === "deletedDrivers" ||
    type === "permanentlyDeletedDrivers"
  ) {
    blockDetails?.push(
      {
        label: "Deleted at",
        value: formatDateTime(driverDetails?.deleted_at),
      },
      {
        label: "Deleted by",
        value: driverDetails?.deletedBy?.user_name ?? "--",
      },
      {
        label: "Reason",
        value: driverDetails?.deleted_reason ?? "--",
      }
    );
  } else if (type === "rejectedApplications") {
    blockDetails?.push(
      {
        label: "Rejected at",
        value: formatDateTime(driverDetails?.rejected_at),
      },
      {
        label: "Rejected by",
        value: driverDetails?.rejectedBy?.user_name ?? "--",
      },
      {
        label: "Reason",
        value: driverDetails?.rejected_reason ?? "--",
      }
    );
  }

  const statusList = [];
  if (type === "manageDrivers") {
    statusList.push({ value: "Active", backGroundColor: "active_container" });
  } else if (type === "bannedApplication") {
    statusList.push({ value: "Banned", backGroundColor: "inactive_container" });
  } else if (type === "blockedDrivers") {
    statusList.push({
      value: "Blocked",
      backGroundColor: "blocked_active_container",
    });
  } else if (type === "rejectedApplications") {
    statusList.push({
      value: "Rejected",
      backGroundColor: "inactive_container",
    });
  } else if (type === "expiredDocuments") {
    statusList.push({
      value: "Expired Documents",
      backGroundColor: "inactive_container",
    });
  } else if (type === "pendingApplications") {
    statusList.push(
      {
        value: driverDetails?.doc_status
          ? insertSpaceUnderScore(driverDetails?.doc_status)
          : "",
        backGroundColor:
          driverDetails?.doc_status === "New_application"
            ? "new_application_conatiner"
            : "re_approval_conatiner",
      },
      {
        value: driverDetails?.doc_details,
        backGroundColor:
          driverDetails?.doc_details === "Complete"
            ? "active_container"
            : "inactive_container",
      }
    );
  }

  console.log(driverDetails, "sdfsdfsfd");

  return (
    <>
      <DriverPasswordModal
        passwordShow={passwordShow}
        handlePasswordClose={handlePasswordClose}
        driverDetails={driverDetails}
        setDriverData={setDriverData}
        id={driverDetails?.id}
        reload={driverData}
        setReload={setDriverData}
        passwordObject={passwordObject}
        mainType={type}
        rejectReason={rejectReason}
      />
      <RejectApplicationModal
        rejectApplicationShow={rejectApplicationShow}
        handleRejectApplicationClose={handleRejectApplicationClose}
        pendingApplicationStatus={applicationStatus}
        setRejectReason={setRejectReason}
        handlePasswordShow={handlePasswordShow}
        setPasswordObject={setPasswordObject}
        type={type}
        driverDetails={driverDetails}
      />
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title="Driver account cannot be deleted"
        is_description={true}
        description="This driver account cannot be deleted as it has an existing negative Current Balance."
        descriptionTextColor="spanish_gray_color"
        contentDiv={
          <>
            <span className="spanish_gray_color">
              Current Balance(₹):
              <span
                className={`${statusColor(
                  driverDetails?.current_balance
                )} fw_600`}
              >
                {driverDetails?.current_balance
                  ? parseFloat(driverDetails?.current_balance).toFixed(1)
                  : "--"}
              </span>
            </span>
          </>
        }
      />
      <DetailsModal
        detailsModalShow={detailsModalShow}
        handleDetailsModalClose={handleDetailsModalClose}
        user={blockDetails}
        passwordObject={passwordObject}
      />
      {loading ? (
        <LoadingSpinnerTable />
      ) : error ? (
        <ErrorPageComponent />
      ) : (
        <InnerLayout
          mainHeading={` Driver ID - ${
            driverDetails?.driver_id2 ? driverDetails?.driver_id2 : "--"
          }`}
          statusList={statusList}
          backBtnClassName="ms-3"
          buttons={buttonList}
        >
          <span className="d-flex align-items-center my-2 gap-1 ms-2  pb-2 main_heading_border_bottom"></span>
          <div className="scrollable_vehicle_details_container px-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="primary_color fw_600 fs_18">Driver Details</span>
              <span className="pe-2">
                {documentShow ? (
                  <div
                    className="account_details_container p-2"
                    ref={insideClickRef}
                  >
                    <ul className="menu_list p-2  mb-0 primary_color fs_14 fw_600 text-center">
                      {menuOptions?.map((item, index) => (
                        <>
                          <li className="cursor_pointer">
                            <button
                              className={`background_none border_none ${
                                item?.disabled
                                  ? "disabled_color"
                                  : " primary_color"
                              }  fs_14 fw_600 cursor_pointer`}
                              onClick={() => {
                                item?.password
                                  ? handlePasswordShow()
                                  : item?.reason_for_unapproved_fields
                                  ? handleRejectApplicationShow()
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
                      <li
                        className="cursor_pointer"
                        onClick={() =>
                          navigate(
                            `/premium-history/currentbalance/${driverDetails?.id}`
                          )
                        }
                      >
                        Premium History
                      </li>
                    </ul>
                  </div>
                ) : null}
              </span>
            </div>

            <div className="profile_document_container p-2 ps-3 mt-2 pb-3">
              <DriversProfileDocument
                profileData={profileData}
                driverDetails={driverDetails}
                profileEditDisabled={profileEditDisabled}
                setProfileEditDisabled={setProfileEditDisabled}
                vehicleDetailsDisabled={vehicleDetailsDisabled}
                setVehicleDetailsDisabled={setVehicleDetailsDisabled}
                driverData={driverData}
                setDriverData={setDriverData}
                type={type}
                setIs_approve={setIs_approve}
              />
              <DriversDocument
                profileData={profileData}
                driverDetails={driverDetails}
                driverData={driverData}
                setDriverData={setDriverData}
                type={type}
              />
            </div>
            <div className="mt-3">
              <span className="primary_color fw_600 fs_18">
                Vehicle Details
              </span>
            </div>
            <div className="profile_document_container  p-2 ps-3 mt-2 mb-3">
              <VehicleDetails
                vehicleData={profileData}
                driverDetails={driverDetails}
                vehicleDetailsDisabled={vehicleDetailsDisabled}
                setVehicleDetailsDisabled={setVehicleDetailsDisabled}
                profileEditDisabled={profileEditDisabled}
                setProfileEditDisabled={setProfileEditDisabled}
                driverData={driverData}
                setDriverData={setDriverData}
                type={type}
                setIs_approve={setIs_approve}
              />
              <VehicleDocuments
                profileData={profileData}
                driverDetails={driverDetails}
                driverData={driverData}
                setDriverData={setDriverData}
                type={type}
              />
            </div>
          </div>
        </InnerLayout>
      )}
    </>
  );
};

export default DriverDetailComponent;
