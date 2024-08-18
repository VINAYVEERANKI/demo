import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../rider-complaints-components.css"
import SuccessMessagemodal from "../../modals/successMessageModal";
import SpinnerLoading from "../../utilits/spinnerLoading";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import {
  driverCompAssignAction,
  driverCompInitiateAction,
  riderCompAssignAction,
  riderCompInitiateAction,
} from "../../../redux/actions/complaints/pendingComplaintsAction";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import {
  driverInProgCompReAssignAction,
  riderInProgCompReAssignAction,
} from "../../../redux/actions/complaints/inprogressComplaintsAction";
import {
  closeDriverComplaintAction,
  closeRiderComplaintAction,
  forwardDriverComplaintAction,
  forwardRiderComplaintAction,
  resolveDriverComplaintAction,
  resolveRiderComplaintAction,
} from "../../../redux/actions/complaints/myComplaintsAction";
import { socket } from "../../../redux/config";

const ComplaintsPasswordModal = ({
  complaintPassShow,
  handleComplaintPassClose,
  handlePendComplaintsViewClose,
  id,
  title = "",
  type,
  complaintType = "",
  handleAssignComplaintsClose,
  adminId,
  setReload,
  reload,
  status,
  driverID,
  riderID,
}) => {
  console.log(id, "llll;;;");
  console.log(driverID, "jhdfjhas");
  console.log(type, "lllzxvxzvl;;;");
  console.log(complaintType, "llll;;; type");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function ToReload() {
    if (
      type === "driverComplaints" ||
      (type === "riderComplaints" &&
        (complaintType === "forwardComplaint" ||
          complaintType === "closeComplaint" ||
          complaintType === "resolveComplaint"))
    ) {
      window.location.reload();
    }
  }

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
    ToReload();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);


  const [ADMINID, setADMINID] = useState("");
  const [adminUserName, setAdminUserName] = useState("");

  useEffect(() => {
    setADMINID(localStorage.getItem("id"));
    setAdminUserName(localStorage.getItem("user_name"));
  }, []);

  const [currentMessage, setCurrentMessage] = useState("");
  const [file, setFile] = useState({
    img: null,
    imgType: null,
    imgName: null,
  });

  const toady = new Date();

  const handleSend = async () => {
    const messageData = {
      driverId: driverID ?? null,
      riderId: riderID ?? null,
      adminId: ADMINID,
      roomId: driverID ?? riderID ?? "",
      author: adminUserName,
      file: file,
      messageData: currentMessage,
      time: null,
      complaintId: id,
      type: "complaint",
      reAssignedAt: toady,
      forwardedAt: null,
    };

    await socket.emit("send_message", messageData);
  };
  const handleForwardSend = async () => {
    const messageData = {
      driverId: driverID ?? null,
      riderId: riderID ?? null,
      adminId: ADMINID,
      roomId: driverID ?? riderID ?? "",
      author: adminUserName,
      file: file,
      messageData: currentMessage,
      time: null,
      complaintId: id,
      type: "complaint",
      reAssignedAt: null,
      forwardedAt: toady,
    };

    await socket.emit("send_message", messageData);
  };

  const formik = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      const data = {
        complaint_id: id,
        password: values?.ConfirmPassword,
      };

      const assignData = {
        complaint_id: id,
        admin_id: adminId,
        password: values?.ConfirmPassword,
      };
      setLoading(true);
      if (type === "driverPendingComplaints") {
        if (complaintType === "initiateComplaint") {
          dispatch(driverCompInitiateAction(data, onSuccess, onError));
        } else if (complaintType === "assignComplaint") {
          dispatch(driverCompAssignAction(assignData, onSuccess, onError));
        }
      } else if (type === "riderPendingComplaints") {
        if (complaintType === "initiateComplaint") {
          dispatch(riderCompInitiateAction(data, onSuccess, onError));
        } else if (complaintType === "assignComplaint") {
          dispatch(riderCompAssignAction(assignData, onSuccess, onError));
        }
      } else if (type === "driverInprogressComplaints") {
        dispatch(
          driverInProgCompReAssignAction(assignData, onSuccess, onError)
        );
        handleSend();
      } else if (type === "riderInprogressComplaints") {
        dispatch(riderInProgCompReAssignAction(assignData, onSuccess, onError));
        handleSend();
      } else if (type === "driverComplaints") {
        if (complaintType === "closeComplaint") {
          dispatch(closeDriverComplaintAction(data, onSuccess, onError));
        } else if (complaintType === "resolveComplaint") {
          dispatch(resolveDriverComplaintAction(data, onSuccess, onError));
        } else if (complaintType === "forwardComplaint") {
          dispatch(
            forwardDriverComplaintAction(assignData, onSuccess, onError)
          );
          handleForwardSend();
        }
      } else if (type === "riderComplaints") {
        if (complaintType === "closeComplaint") {
          dispatch(closeRiderComplaintAction(data, onSuccess, onError));
        } else if (complaintType === "resolveComplaint") {
          dispatch(resolveRiderComplaintAction(data, onSuccess, onError));
        } else if (complaintType === "forwardComplaint") {
          dispatch(forwardRiderComplaintAction(assignData, onSuccess, onError));
          handleForwardSend();
        }
      } else if (type === "driverCallComplaint") {
        if (complaintType === "closeComplaint") {
          dispatch(closeDriverComplaintAction(data, onSuccess, onError));
        } else if (complaintType === "resolveComplaint") {
          dispatch(resolveDriverComplaintAction(data, onSuccess, onError));
        }
      } else if (type === "riderCallComplaint") {
        if (complaintType === "closeComplaint") {
          dispatch(closeRiderComplaintAction(data, onSuccess, onError));
        } else if (complaintType === "resolveComplaint") {
          dispatch(resolveRiderComplaintAction(data, onSuccess, onError));
        }
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    handleComplaintPassClose();
    handleSuccessMessageShow();
    if (
      complaintType === "closeComplaint" ||
      complaintType === "resolveComplaint"
    ) {
    } else {
      handlePendComplaintsViewClose();
    }
    if (
      complaintType === "assignComplaint" ||
      type === "forwardComplaint" ||
      type === "driverInprogressComplaints" ||
      type === "riderInprogressComplaints"
    ) {
      handleAssignComplaintsClose();
    }
    formik.resetForm();
    console.log(data);
  };
  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    errorToast(data?.data?.data);
    formik.resetForm();
    if (type === "forwardComplaint") {
      handleAssignComplaintsClose();
    }
    console.log(data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          complaintType === "closeComplaint"
            ? "Complaint Closed Successfully!"
            : complaintType === "resolveComplaint"
            ? "Complaint Resolved Successfully!"
            : complaintType === "initiateComplaint"
            ? "Complaint Initiated Successfully!"
            : status === "Reassigned" ||
              status === "Assigned" ||
              status === "Initiated"
            ? "Complaint Reassigned Successfully!"
            : complaintType === "forwardComplaint"
            ? "Complaint Forwarded Successfully!"
            : "Complaint Assigned Successfully!"
        }
        type={type}
      />

      <Modal
        centered
        show={complaintPassShow}
        onHide={handleComplaintPassClose}
        dialogClassName="ban_application_container"
        contentClassName="border_radius_10px"
        backdropClassName="rating_password_modal_backdrop"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center   mt-3 mb-4">
                <div className="fs_21 primary_color fw_600 text-center ">
                  {title}
                </div>
              </div>

              <PasswordInputField
                inputContainer={"px-sm-4"}
                itemName={"ConfirmPassword"}
                inputValue={formik.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formik.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.ConfirmPassword}
                formikTouched={formik.touched.ConfirmPassword}
                error={error}
              />
              <div className="red_color fw_500 ps-sm-4">{error ?? null}</div>
              <div className="  d-flex justify-content-between pt-2 mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    handleComplaintPassClose();
                    formik.resetForm();
                    setError(false);
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="sumbit"
                  disabled={loading}
                >
                  <span className=" fs_18 white_color">
                    {loading ? <SpinnerLoading /> : "Proceed"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ComplaintsPasswordModal;
