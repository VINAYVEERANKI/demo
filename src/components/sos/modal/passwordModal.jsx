import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../complaints/rider-complaints-components.css";
import SuccessMessagemodal from "../../modals/successMessageModal";
import SpinnerLoading from "../../utilits/spinnerLoading";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import {
  driverSOSAssignAction,
  driverSOSInitiateAction,
  riderSOSAssignAction,
  riderSOSInitiateAction,
} from "../../../redux/actions/sos/pendingSosAction";
import {
  driverInProgSOSReAssignAction,
  riderInProgSOSReAssignAction,
} from "../../../redux/actions/sos/inprogressSosAction";
import { forwardRiderSOSAction } from "../../../redux/actions/sos/mySOSAction";
import { forwardSOSAction } from "../../../redux/actions/sos/mySOSAction";
import { socket } from "../../../redux/config";

const SOSPasswordModal = ({
  sosPasswordModal,
  handleSosPassClose,
  handleSosViewClose,
  id,
  title = "",
  type,
  complaintType = "",
  handleAssignSosClose,
  adminId,
  setReload,
  reload,
  driverID,
  riderID,
}) => {
  function ToReload() {
    if (complaintType === "forwardSos") {
      window.location.reload();
    }
  }
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
    ToReload();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [currentMessage, setCurrentMessage] = useState("");
  const [file, setFile] = useState({
    img: null,
    imgType: null,
    imgName: null,
  });

  const [ADMINID, setADMINID] = useState("");
  const [adminUserName, setAdminUserName] = useState("");

  useEffect(() => {
    setADMINID(localStorage.getItem("id"));
    setAdminUserName(localStorage.getItem("user_name"));
  }, []);

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
      sosId: id,
      type: "sos",
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
      sosId: id,
      type: "sos",
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
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const data = {
        sos_id: id,
        password: values?.ConfirmPassword,
      };
      const assignData = {
        sos_id: id,
        admin_id: adminId,
        password: values?.ConfirmPassword,
      };
      if (type === "pendingDriverSos") {
        if (complaintType === "sosInitiate") {
          dispatch(driverSOSInitiateAction(data, onSuccess, onError));
        } else if (complaintType === "sosAssign") {
          dispatch(driverSOSAssignAction(assignData, onSuccess, onError));
        }
      } else if (type === "pendingRiderSos") {
        if (complaintType === "sosInitiate") {
          dispatch(riderSOSInitiateAction(data, onSuccess, onError));
        } else if (complaintType === "sosAssign") {
          dispatch(riderSOSAssignAction(assignData, onSuccess, onError));
        }
      } else if (type === "inprogressDriverSos") {
        dispatch(driverInProgSOSReAssignAction(assignData, onSuccess, onError));
        handleSend();
      } else if (type === "inprogressRiderSos") {
        dispatch(riderInProgSOSReAssignAction(assignData, onSuccess, onError));
        handleSend();
      } else if (type === "riderSos") {
        if (complaintType === "forwardSos") {
          dispatch(forwardRiderSOSAction(assignData, onSuccess, onError));
          handleForwardSend();
        }
      } else if (type === "driverSos") {
        if (complaintType === "forwardSos") {
          dispatch(forwardSOSAction(assignData, onSuccess, onError));
          handleForwardSend();
        }
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    handleSosPassClose();
    handleSuccessMessageShow();
    handleSosViewClose();
    if (
      complaintType === "sosAssign" ||
      type === "inprogressDriverSos" ||
      type === "inprogressRiderSos" ||
      complaintType === "forwardSos"
    ) {
      handleAssignSosClose();
    }
    setReload(!reload);
    formik.resetForm();
    console.log(data);
  };
  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    setReload(!reload);
    errorToast(data?.data?.data);
    console.log(data);
  };
  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          type === "inprogressRiderSos" || type === "inprogressDriverSos"
            ? "SOS Reassigned successfully!"
            : complaintType === "sosInitiate"
            ? "SOS Initiated successfully!"
            : type === "closeSos"
            ? "SOS Closed successfully!"
            : type === "resolveSos"
            ? "SOS Resolved successfully!"
            : complaintType === "forwardSos"
            ? "SOS Forward successfully!"
            : "SOS Assigned successfully!"
        }
      />

      <Modal
        centered
        show={sosPasswordModal}
        onHide={handleSosPassClose}
        dialogClassName="ban_application_container"
        contentClassName="border_radius_10px"
        backdropClassName="rating_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center text-center  mt-3 mb-4">
                <span className="fs_21 primary_color fw_600 ">
                  {title}
                </span>
              </div>
              <PasswordInputField
                // inputContainer={"px-sm-4"}
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
              <div className="red_color fw_500 ps-sm-4">{error}</div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handleSosPassClose();
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
export default SOSPasswordModal;
