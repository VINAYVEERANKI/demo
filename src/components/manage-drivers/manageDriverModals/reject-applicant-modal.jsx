import React from "react";
import Modal from "react-bootstrap/Modal";
import "../manageDriversComponents.css";
import { statusColor } from "../../helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Okaybtn from "../../utilits/buttons/okaybtn";

function RejectApplicationModal({
  rejectApplicationShow,
  handleRejectApplicationClose,
  pendingApplicationStatus,
  handlePasswordShow,
  setPasswordObject,
  setRejectReason,
  type,
  driverDetails,
}) {
  const makeRequiredField = (status) =>
    status !== "Approved"
      ? Yup.string("").trim().required("Please fill this field to proceed")
      : Yup.string("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      addressproof_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.address_proof?.addressproof_rejected_reason
            ? driverDetails?.address_proof?.addressproof_rejected_reason
            : ""
          : "",
      drivinglicense_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.driving_license?.drivinglicense_rejected_reason
            ? driverDetails?.driving_license?.drivinglicense_rejected_reason
            : ""
          : "",
      profilepic_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.profile_pic?.profilepic_rejected_reason
            ? driverDetails?.profile_pic?.profilepic_rejected_reason
            : ""
          : "",
      vehicleinsurance_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.vehicle_insurance?.vehicleinsurance_rejected_reason
            ? driverDetails?.vehicle_insurance?.vehicleinsurance_rejected_reason
            : ""
          : "",
      vehiclerc_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.vehicle_rc?.vehiclerc_rejected_reason
            ? driverDetails?.vehicle_rc?.vehiclerc_rejected_reason
            : ""
          : "",
      vehiclephotos_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.vehicle_photos?.vehiclephotos_rejected_reason
            ? driverDetails?.vehicle_photos?.vehiclephotos_rejected_reason
            : ""
          : "",
      physical_verification_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.physical_verification
              ?.physical_verification_rejected_reason
            ? driverDetails?.physical_verification
                ?.physical_verification_rejected_reason
            : ""
          : "",
      background_verification_rejected_reason:
        type === "rejectedApplications"
          ? driverDetails?.background_verification
              ?.background_verification_rejected_reason
            ? driverDetails?.background_verification
                ?.background_verification_rejected_reason
            : ""
          : "",
      action: "saveChanged",
    },
    validationSchema: Yup.object({
      addressproof_rejected_reason: makeRequiredField(
        pendingApplicationStatus.addressStatus
      ),
      drivinglicense_rejected_reason: makeRequiredField(
        pendingApplicationStatus.dlStatus
      ),
      vehicleinsurance_rejected_reason: makeRequiredField(
        pendingApplicationStatus.vehicleStatus
      ),
      profilepic_rejected_reason: makeRequiredField(
        pendingApplicationStatus.profileStatus
      ),
      vehiclerc_rejected_reason: makeRequiredField(
        pendingApplicationStatus.vehicleRCStatus
      ),
      vehiclephotos_rejected_reason: makeRequiredField(
        pendingApplicationStatus.vehicleImageStatus
      ),
      physical_verification_rejected_reason: makeRequiredField(
        pendingApplicationStatus.physicalVerifStatus
      ),
      background_verification_rejected_reason: makeRequiredField(
        pendingApplicationStatus.backgroundVerifStatus
      ),
    }),
    onSubmit: (values) => {
      setRejectReason(values);
      handlePasswordShow();
      setPasswordObject({
        title: "Reject Account",
        modalTitle: "Are you sure you want to reject this profile?",
        password: true,
        reason: false,
        disabled: false,
        type: "reject_account",
        successMessage: "Account has been rejected successfully!",
        details: false,
        is_navigate: true,
      });
    },
  });

  const rejectApplicationFieldData = [
    {
      title: "Address Proof",
      status: pendingApplicationStatus.addressStatus,
      reason_required: pendingApplicationStatus.addressStatus !== "Approved",
      field: "addressproof_rejected_reason",
    },
    {
      title: "Driving License",
      status: pendingApplicationStatus.dlStatus,
      reason_required: pendingApplicationStatus.dlStatus !== "Approved",
      field: "drivinglicense_rejected_reason",
    },
    {
      title: "Profile Picture",
      status: pendingApplicationStatus.profileStatus,
      reason_required: pendingApplicationStatus.profileStatus !== "Approved",
      field: "profilepic_rejected_reason",
    },
    {
      title: "Vehicle Insurance",
      status: pendingApplicationStatus.vehicleStatus,
      reason_required: pendingApplicationStatus.vehicleStatus !== "Approved",
      field: "vehicleinsurance_rejected_reason",
    },
    {
      title: "Vehicle RC",
      status: pendingApplicationStatus.vehicleRCStatus,
      reason_required: pendingApplicationStatus.vehicleRCStatus !== "Approved",
      field: "vehiclerc_rejected_reason",
    },
    {
      title: "Vehicle Images",
      status: pendingApplicationStatus.vehicleImageStatus,
      reason_required:
        pendingApplicationStatus.vehicleImageStatus !== "Approved",
      field: "vehiclephotos_rejected_reason",
    },
    {
      title: "Physical Verification",
      status: pendingApplicationStatus.physicalVerifStatus,
      reason_required:
        pendingApplicationStatus.physicalVerifStatus !== "Approved",
      field: "physical_verification_rejected_reason",
    },
    {
      title: "Background Verification",
      status: pendingApplicationStatus.backgroundVerifStatus,
      reason_required:
        pendingApplicationStatus.backgroundVerifStatus !== "Approved",
      field: "background_verification_rejected_reason",
    },
  ];
  return (
    <>
      <Modal
        centered
        show={rejectApplicationShow}
        onHide={handleRejectApplicationClose}
        dialogClassName="reject_application_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-2">
            <div className="d-flex justify-content-between">
              <div>
                <span className="fs_20 fw_700 primary_color">
                  Reject Application
                </span>
              </div>
              <div>
                <button
                  className="border_none background_none"
                  type="button"
                  onClick={() => handleRejectApplicationClose()}
                >
                  <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
                </button>
              </div>
            </div>
            <hr className="m-0 mt-2" />
            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-2">
                <div className="col-3">
                  <span className="reject_application_heading fw_600 fs_16">
                    Document Name
                  </span>
                </div>
                <div className="col-3 text-center">
                  <span className="reject_application_heading fw_600 fs_16">
                    Review Status
                  </span>
                </div>
                <div className="col-6">
                  <span className="reject_application_heading fw_600 fs_16">
                    Reason For Rejection
                  </span>
                </div>
              </div>
              {rejectApplicationFieldData
                ?.filter((item) => item?.reason_required === true)
                ?.map((item) => (
                  <div className="row mt-4">
                    <div className="col-3">
                      <span className="fs_16 primary_color fw_500">
                        {item?.title}
                      </span>
                    </div>
                    <div className="col-3 text-center">
                      <span
                        className={`fs_16 ${statusColor(item?.status)} fw_600`}
                      >
                        {item?.status}
                      </span>
                    </div>
                    <div className="col-6">
                      <textarea
                        className={
                          formik.errors[`${item?.field}`] &&
                          formik.touched[`${item?.field}`]
                            ? ` reject_application_textArea_error w-100 resize_none fs_16  border_radius_3px outline_none ps-2 fw_500`
                            : `w-100 resize_none fs_16 reject_application_textArea border_radius_3px outline_none ps-2 fw_500`
                        }
                        placeholder="Write your reasons here"
                        name={item?.field}
                        value={formik.values[`${item?.field}`]}
                        onChange={formik.handleChange}
                        disabled={type === "rejectedApplications"}
                      />
                      {formik.errors[`${item?.field}`] &&
                        formik.touched[`${item?.field}`] && (
                          <div className="red_color fs_14">
                            {formik.errors[`${item?.field}`]}
                          </div>
                        )}
                    </div>
                  </div>
                ))}

              <div
                className={`d-flex ${
                  type === "rejectedApplications"
                    ? "justify-content-center"
                    : "justify-content-end mt-4 mb-2  gap-3"
                }  `}
              >
                {type === "rejectedApplications" ? (
                  <Okaybtn okayFn={handleRejectApplicationClose} />
                ) : (
                  <>
                    <button
                      className="primary_color px-4 white_bg  border_radius_5px ms-5 reject_cancel_btn"
                      type="button"
                      onClick={() => handleRejectApplicationClose()}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <i className="ri-close-circle-fill primary_color fs_16"></i>
                        <span className="fs_18 fw_500">Cancel </span>
                      </span>
                    </button>
                    <button
                      className="px-5 border_none primary_bg fs_18 reject_btn border_radius_5px white_color ms-3 "
                      type="submit"
                      onClick={() => {
                        formik.handleSubmit();
                        formik.setFieldValue("action", "saveChanged");
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RejectApplicationModal;
