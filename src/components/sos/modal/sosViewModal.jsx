import moment from "moment";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  applicationAge,
  driverNavigateFn,
  navigationFn,
  removeUnderScore,
  riderNavigateFn,
  statusColor,
} from "../../helper";
// import "../rider-complaints-components.css";
import AssignSOSModal from "./assignSOSModal";
import SOSPasswordModal from "./passwordModal";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import {
  driverPendingSOSAction,
  riderPendingSOSAction,
} from "../../../redux/actions/sos/pendingSosAction";
import {
  driverInprogressSOSAction,
  riderInprogressSOSAction,
} from "../../../redux/actions/sos/inprogressSosAction";
import usePermissions from "../../usePermissionChecker";

const SOSViewModal = ({
  sosViewModal,
  handleSosViewClose,
  id,
  type,
  setReload,
  reload,
  sosCurrentData,
}) => {
  const { canRead, canWrite } = usePermissions();
  const location = useLocation();
  const pagePermissions = {
    pendingRiderSos: "pending_create_rider_sos",
    inprogressRiderSos: "inprogress_rider_sos",
    pendingDriverSos: "pending_create_driver_sos",
    inprogressDriverSos: "inprogress_driver_sos",
  };
  const permission = pagePermissions[type];
  console.log(id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  // const [sosCurrentData, setSosCurrentData] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   if (type === "pendingRiderSos") {
  //     dispatch(
  //       riderPendingSOSAction(
  //         {
  //           sos_id: id,
  //         },
  //         onFetchSuccess,
  //         onFetchError
  //       )
  //     );
  //   } else if (type === "pendingDriverSos") {
  //     dispatch(
  //       driverPendingSOSAction(
  //         {
  //           sos_id: id,
  //         },
  //         onFetchSuccess,
  //         onFetchError
  //       )
  //     );
  //   } else if (type === "inprogressRiderSos") {
  //     dispatch(
  //       riderInprogressSOSAction(
  //         {
  //           sos_id: id,
  //         },
  //         onFetchSuccess,
  //         onFetchError
  //       )
  //     );
  //   } else if (type === "inprogressDriverSos") {
  //     dispatch(
  //       driverInprogressSOSAction(
  //         {
  //           sos_id: id,
  //         },
  //         onFetchSuccess,
  //         onFetchError
  //       )
  //     );
  //   }
  //   //  else if (type === "driverResolvedClosedComplaints") {
  //   //   dispatch(
  //   //     driverResColsedComplaintAction(
  //   //       {
  //   //         complaint_id: id,
  //   //       },
  //   //       onFetchSuccess,
  //   //       onFetchError
  //   //     )
  //   //   );
  //   // } else if (type === "riderResolvedClosedComplaints") {
  //   //   dispatch(
  //   //     riderResClosedComplaintAction(
  //   //       {
  //   //         complaint_id: id,
  //   //       },
  //   //       onFetchSuccess,
  //   //       onFetchError
  //   //     )
  //   //   );
  //   // }
  // }, [id, type, reload]);

  // const onFetchSuccess = (data) => {
  //   setLoading(false);
  //   setSosCurrentData(data?.data);
  //   console.log(data);
  // };

  // const onFetchError = (data) => {
  //   setLoading(false);
  //   console.log(data);
  // };

  console.log(type, sosCurrentData, "asjjdsakjdsd");

  const [sosPasswordModal, setSosPasswordModal] = useState(false);
  const handleSosPassClose = () => setSosPasswordModal(false);
  const handleSosPassShow = () => setSosPasswordModal(true);

  const [assignSosModal, setAssignSosModal] = useState(false);
  const handleAssignSosClose = () => setAssignSosModal(false);
  const handleAssignSosShow = () => setAssignSosModal(true);

  const [cannotInitiateShow, setCannotInitiateShow] = useState(false);
  const handleCannotInitiateClose = () => setCannotInitiateShow(false);
  const handleCannotInitiateShow = () => setCannotInitiateShow(true);

  const [cannotAssignShow, setCannotAssignShow] = useState(false);
  const handleCannotAssignClose = () => setCannotAssignShow(false);
  const handleCannotAssignShow = () => setCannotAssignShow(true);

  // function cannotInitiate() {
  //   if (sosCurrentData.sos_status === "Initiated") {
  //     handleCannotInitiateShow();
  //   } else handleSosPassShow();
  // }

  // function cannotAssign() {
  //   if (sosCurrentData.sos_status === "Assigned") {
  //     handleCannotAssignShow();
  //   } else handleAssignSosShow();
  // }

  console.log(sosCurrentData, "skdjns");

  const bookingDetails = [];

  const bookingData = [
    {
      label: "Booking ID",
      value: sosCurrentData?.booking?.booking_id_2 ?? "--",
      navLink: true,
      link: sosCurrentData?.booking
        ? navigationFn(
            sosCurrentData?.booking?.booking_classification,
            sosCurrentData?.booking?.id
          )
        : location?.pathname,
      display: true,
    },
    {
      label: "Booking Classification",
      value: sosCurrentData?.booking?.booking_classification
        ? removeUnderScore(sosCurrentData?.booking?.booking_classification)
        : "--",
      display: true,
    },
  ];

  const riderIDData = [
    {
      label: "Rider ID",
      value: sosCurrentData?.rider?.rider_id2 ?? "--",
      navLink: true,
      link: sosCurrentData?.rider ? riderNavigateFn(sosCurrentData?.rider, sosCurrentData?.rider?.id) : location?.pathname,
      display: true,
    },
    {
      label: "Rider First Name",
      value: sosCurrentData?.rider?.first_name ?? "--",
      display: true,
    },
    {
      label: "Rider Last Name",
      value: sosCurrentData?.rider?.last_name ?? "--",
      display: sosCurrentData?.booking ? false : true,
    },
  ];

  const driverIDData = [
    {
      label: "Driver ID",
      value: sosCurrentData?.driver?.driver_id2 ?? "--",
      navLink: true,
      link: sosCurrentData?.driver ? driverNavigateFn(sosCurrentData?.driver, sosCurrentData?.driver?.id) : location?.pathname,
      display: true,
    },
    {
      label: "Driver First Name",
      value: sosCurrentData?.driver?.first_name ?? "--",
      display: true,
    },
    {
      label: "Driver Last Name",
      value: sosCurrentData?.driver?.last_name ?? "--",
      display: sosCurrentData?.booking ? false : true,
    },
  ];

  if (sosCurrentData?.booking) {
    bookingDetails.splice(0, 0, ...bookingData);
  }
  if (sosCurrentData?.rider) {
    bookingDetails.push(...riderIDData);
  }
  if (sosCurrentData?.driver) {
    bookingDetails.push(...driverIDData);
  }

  const SOSDetails = [
    {
      label: "Received At",
      value: sosCurrentData?.sos_created_at
        ? moment(sosCurrentData?.sos_created_at).format("DD-MM-YYYY,HH-mm")
        : "no data",
      display: sosCurrentData?.source === "Call" ? false : true,
    },

    {
      label: sosCurrentData?.initiated_at
        ? "Initiated at"
        : sosCurrentData?.assigned_at
        ? "Assigned at"
        : sosCurrentData?.generated_at
        ? "Generated At"
        : "Initiated at/ Assigned at",
      value: sosCurrentData?.initiated_at
        ? moment(sosCurrentData?.initiated_at).format("DD-MM-YYYY,HH-mm")
        : sosCurrentData?.assigned_at
        ? moment(sosCurrentData?.assigned_at).format("DD-MM-YYYY,HH-mm")
        : sosCurrentData?.generated_at
        ? moment(sosCurrentData?.generated_at).format("DD-MM-YYYY,HH-mm")
        : "--",
      display: true,
    },
    {
      label: sosCurrentData?.initiated_by
        ? "Initiated by"
        : sosCurrentData?.assigned_by
        ? "Assigned by"
        : sosCurrentData?.generated_by
        ? "Generated By"
        : "Initiated by/ Assigned by",
      value:
        sosCurrentData?.InitiatedBy?.user_name ??
        sosCurrentData?.AssignedBy?.user_name ??
        sosCurrentData?.GeneratedBy?.user_name ??
        "--",
      display: true,
    },
    {
      label: "Current Owner",
      value: sosCurrentData?.CurrentOwnerName?.user_name ?? "Pending",
      display: true,
    },
    {
      label: "SOS Age",
      value: sosCurrentData?.sos_created_at
        ? applicationAge(new Date(sosCurrentData?.sos_created_at))
        : sosCurrentData?.generated_at
        ? applicationAge(new Date(sosCurrentData?.generated_at))
        : "--",
      display: true,
    },
    {
      label: "Last Active At",
      value: sosCurrentData?.last_active_at
        ? moment(sosCurrentData?.last_active_at).format("DD-MM-YYYY,HH-mm")
        : "--",
      display: true,
    },
  ];

  const reassignData = [
    {
      label: "Reassigned at",
      value: sosCurrentData?.re_assigned_at
        ? moment(sosCurrentData?.re_assigned_at).format("DD-MM-YYYY,HH:mm")
        : "--",
      display: true,
    },
    {
      label: "Reassigned by",
      value: sosCurrentData?.ReAssignedBy?.user_name ?? "--",
      display: true,
    },
  ];

  if (sosCurrentData?.sos_status === "Reassigned") {
    if (sosCurrentData?.source === "Call") {
      const startIndex = SOSDetails.length - 2;
      SOSDetails.splice(startIndex, 0, ...reassignData);
    } else {
      const startIndex = SOSDetails.length - 3;
      SOSDetails.splice(startIndex, 0, ...reassignData);
    }
  }

  const resolvedOrClosedData = [
    {
      label:
        sosCurrentData?.sos_status === "Resolved"
          ? "Resolved at"
          : sosCurrentData?.sos_status === "Closed"
          ? "Closed at"
          : "--",
      value:
        sosCurrentData?.sos_status === "Resolved" && sosCurrentData?.resolved_at
          ? moment(sosCurrentData?.resolved_at).format("DD-MM-YYYY,HH:mm")
          : sosCurrentData?.sos_status === "Closed" && sosCurrentData?.closed_at
          ? moment(sosCurrentData?.closed_at).format("DD-MM-YYYY,HH:mm")
          : "--",
      display: true,
    },
    {
      label:
        sosCurrentData?.sos_status === "Resolved"
          ? "Resolved by"
          : sosCurrentData?.sos_status === "Closed"
          ? "Closed by"
          : "--",
      value:
        sosCurrentData?.sos_status === "Resolved"
          ? sosCurrentData?.ReslovedBy?.user_name
          : sosCurrentData?.sos_status === "Closed"
          ? sosCurrentData?.ClosedBy?.user_name
          : "",
      display: true,
    },
  ];

  if (
    sosCurrentData?.sos_status === "Resolved" ||
    sosCurrentData?.sos_status === "Closed"
  ) {
    SOSDetails.push(...resolvedOrClosedData);
  }

  return (
    <>
      <SOSPasswordModal
        sosPasswordModal={sosPasswordModal}
        handleSosPassClose={handleSosPassClose}
        handleSosViewClose={handleSosViewClose}
        id={sosCurrentData?.id}
        // complaintType="driverPendingInitiate"
        driverID={sosCurrentData?.driver?.id}
        riderID={sosCurrentData?.rider?.id}
        type={type}
        complaintType={action}
        title="Are you sure you want to initiate the SOS?"
        setReload={setReload}
        reload={reload}
      />
      <AssignSOSModal
        handleSosViewClose={handleSosViewClose}
        assignSosModal={assignSosModal}
        handleAssignSosClose={handleAssignSosClose}
        type={type}
        id={sosCurrentData?.id}
        setReload={setReload}
        reload={reload}
        complaintType={action}
        driverID={sosCurrentData?.driver?.id}
        riderID={sosCurrentData?.rider?.id}
      />
      {/* <SuccessMessagemodal
        successMessageShow={cannotInitiateShow}
        handleSuccessMessageClose={handleCannotInitiateClose}
        subsection={true}
        title="Complaint cannot be initiated!"
        description="Complaint cannot be initiated. Kindly refresh the homepage."
        title_color="red_color"
      />
      <SuccessMessagemodal
        successMessageShow={cannotAssignShow}
        handleSuccessMessageClose={handleCannotAssignClose}
        subsection={true}
        title="Complaint cannot be Assigned!"
        description="Complaint cannot be Assigned. Kindly refresh the homepage."
        title_color="red_color"
      /> */}

      <Modal
        centered
        show={sosViewModal}
        onHide={handleSosViewClose}
        dialogClassName="rider_complaints_view_container"
        contentClassName="border_radius_10px"
        backdropClassName="rider_complaints_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          {loading && <LoadingSpinnerTable />}
          <>
            <div className="d-flex justify-content-between align-items-center  mt-1">
              <span className="d-flex align-items-center">
                <span className="fs_22 primary_color fw_600">
                  {sosCurrentData?.sos_id2 ?? "--"}
                </span>
                <span className="secondary_color fs_13 fw_500">
                  (Source : {sosCurrentData?.source ?? "--"})
                </span>
              </span>

              <span
                onClick={() => handleSosViewClose()}
                className="cursor_pointer"
              >
                <i className="ri-close-circle-fill primary_color fs_22" />
              </span>
            </div>

            <div className="ms-3 mt-2">
              <span className="primary_color fs_15 fw_500">SOS status :</span>
              <span
                className={`${statusColor(
                  sosCurrentData?.sos_status
                )} text-lg-end fs_15 fw_500`}
              >
                {" "}
                {sosCurrentData?.sos_status ?? "--"}
              </span>
            </div>

            <div className="booking_ID_container p-2 border_radius_10px mt-3 ms-sm-3 ">
              <table>
                <tbody>
                  {bookingDetails?.map(
                    (item, index) =>
                      item?.display && (
                        <tr className="fs_15 fw_500" key={item?.label}>
                          <td className="text-nowrap sonic_silver_color w-25">
                            {item?.label}
                          </td>
                          <td
                            className={`${
                              item?.label === "Booking Classification"
                                ? "sonic_silver_color"
                                : "primary_color"
                            } text-sm-wrap ps-sm-5 ps-1`}
                          >
                            {item?.navLink ? (
                              <NavLink
                                to={item?.link}
                                className="primary_color"
                              >
                                {item?.value}
                              </NavLink>
                            ) : (
                              item?.value
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>

            <div className="ms-3 mt-4">
              <table className="w-100">
                <tbody>
                  {SOSDetails?.map(
                    (item, index) =>
                      item?.display && (
                        <tr className="fs_15 fw_500" key={item?.id}>
                          <td className="text-nowrap sonic_silver_color w-25">
                            {item?.label}
                          </td>
                          <td className="ps-sm-5 ps-2 primary_color">
                            {item?.value}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            {sosCurrentData?.sos_status === "Resolved" ||
            sosCurrentData?.sos_status === "Closed" ? (
              <></>
            ) : (
              <>
                {canWrite(permission) === false ? (
                  <></>
                ) : (
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    {type === "pendingRiderSos" ||
                    type === "pendingDriverSos" ? (
                      <>
                        <button
                          className="primary_border white_bg primary_color border_radius_3px fw_500 fs_15 py-1 px-sm-3"
                          type="button"
                          onClick={() => {
                            setAction("sosAssign");
                            handleAssignSosShow();
                          }}
                        >
                          Assign The SOS
                        </button>
                        <button
                          className="border_none border_radius_3px primary_bg white_color fw_500 fs_15 py-1 px-sm-3"
                          type="button"
                          onClick={() => {
                            setAction("sosInitiate");
                            handleSosPassShow();
                          }}
                        >
                          Initiate The SOS
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="border_none border_radius_3px primary_bg white_color fw_500 fs_15 py-1 px-3"
                          type="button"
                          onClick={() => {
                            setAction("sosReassign");
                            handleAssignSosShow();
                          }}
                        >
                          Reassign The SOS
                        </button>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SOSViewModal;
