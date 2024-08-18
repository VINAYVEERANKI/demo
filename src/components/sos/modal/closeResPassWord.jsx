import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../complaints/rider-complaints-components.css";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import {
  closeRiderSOSAction,
  closeSOSAction,
  resolveRiderSOSAction,
} from "../../../redux/actions/sos/mySOSAction";
import { resolveSOSAction } from "../../../redux/actions/sos/mySOSAction";
import eyeOn from "../../../assets/icons/eye-on.svg";
import eyeOff from "../../../assets/icons/eye-off.svg";

const SOSCloseResPasswordModal = ({
  sosClosedResPassW,
  handlesosClosedResPassW,
  handleSosViewClose,
  id,
  title = "",
  type,
  complaintType = "",
  handleAssignSosClose,
  setReload,
  reload,
}) => {
  console.log(id, "jjjjjjjjkajsbd");
  console.log(complaintType, "jjjjjjjjkajsbd");

  function ToReload() {
    if (complaintType === "closeSos" || complaintType === "resolveSos") {
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

  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  const [IsCallShow, setIsCallShow] = useState("callID");

  const formik = useFormik({
    initialValues: {
      password: ``,
      isCall: `callID`,
      CallID: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
      isCall: Yup.string(),
      CallID: Yup.string().when("isCall", {
        is: "callID",
        then: Yup.string().required("Enter the Call ID*"),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const closeResData = {
        sos_id: id,
        call_id: values?.CallID ?? "",
        password: values?.password,
      };
      if (type === "driverSos") {
        if (complaintType === "closeSos") {
          dispatch(closeSOSAction(closeResData, onSuccess, onError));
          console.log("askjdkas");
        } else if (complaintType === "resolveSos") {
          dispatch(resolveSOSAction(closeResData, onSuccess, onError));
        }
      } else if (type === "riderSos") {
        if (complaintType === "closeSos") {
          dispatch(closeRiderSOSAction(closeResData, onSuccess, onError));
        } else if (complaintType === "resolveSos") {
          dispatch(resolveRiderSOSAction(closeResData, onSuccess, onError));
        }
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    handlesosClosedResPassW();
    handleSuccessMessageShow();
    handleSosViewClose();
    if (complaintType === "driverPendingAssign") {
      handleAssignSosClose();
    }
    setReload(!reload);
    formik.resetForm();
    console.log(data);
    console.log("jakjsdlkasdlakdlk");
  };
  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    setReload(!reload);
    errorToast(data?.data?.data);
    console.log(data);
    console.log("jakjsdlkasdlakdlk");
  };

  function handleIsCallShowButton(e) {
    formik.resetForm();
    setIsCallShow(e.target.value);
    let event = {
      target: {
        name: "isCall",
        value: e.target.value,
      },
    };
    formik.handleChange(event);
  }

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          type === "inprogressRiderSos" || type === "inprogressDriverSos"
            ? "SOS Reassigned successfully!"
            : complaintType === "driverPendingInitiate"
            ? "SOS initiated successfully!"
            : complaintType === "closeSos"
            ? "SOS Closed successfully!"
            : complaintType === "resolveSos"
            ? "SOS Resolved successfully!"
            : complaintType === "forwardSos"
            ? "SOS Forward successfully!"
            : "SOS assigned successfully!"
        }
      />

      <Modal
        centered
        show={sosClosedResPassW}
        onHide={handlesosClosedResPassW}
        dialogClassName="ban_application_container"
        contentClassName="border_radius_10px"
        backdropClassName="rating_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-between align-items-center ">
                <span className=" fs_22 primary_color fw_600  text-center">
                  {title}
                </span>
                <i
                  className="ri-close-circle-fill fs_22 cursor_pointer"
                  onClick={() => handlesosClosedResPassW()}
                />
              </div>
              <hr className="ash_color m-0" />

              <div className="px-sm-5 px-2 mt-4">
                <span className=" fs_16 primary_color fw_600   text-nowrap">
                  Did you call the customer?
                </span>

                <div className="d-flex  justify-content-left  gap-2 ms-2 mt-2">
                  <input
                    className=""
                    type="radio"
                    id="callID"
                    checked={IsCallShow === "callID"}
                    value="callID"
                    onChange={handleIsCallShowButton}
                  />
                  <label
                    className={
                      IsCallShow === "callID"
                        ? "fs_16 fw_500 primary_color"
                        : "fs_15 fw_500 ash_color"
                    }
                    htmlFor="callID"
                  >
                    Yes
                  </label>
                </div>
                <div className="d-flex justify-content-left  gap-2 ms-2">
                  <input
                    className=""
                    type="radio"
                    id="noCall"
                    checked={IsCallShow === "noCall"}
                    value="noCall"
                    onChange={handleIsCallShowButton}
                  />
                  <label
                    className={
                      IsCallShow === "callID"
                        ? "fs_15 fw_500 ash_color "
                        : "fs_16 fw_500 primary_color"
                    }
                    htmlFor="noCall"
                  >
                    NO
                  </label>
                </div>
              </div>

              {IsCallShow === "callID" ? (
                <>
                  <div className="d-sm-flex gap-3 px-sm-5 ms-2 mt-3">
                    <label
                      className={
                        formik.errors.CallID && formik.touched.CallID
                          ? "fs_16 fw_500 red_color text-nowrap pt-1"
                          : "fs_16 fw_500 primary_color text-nowrap pt-1"
                      }
                    >
                      Call ID
                    </label>
                    <div className="w-100">
                      <input
                        id="CallID"
                        name="CallID"
                        value={formik.values.CallID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="input_border_dark border_radius_3px outline_none p-1 ps-2"
                        placeholder="Enter the call ID"
                      />
                      <div>
                        {formik.errors.CallID && formik.touched.CallID && (
                          <span className="red_color fw_500">
                            {formik.errors.CallID}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <hr className="suva_grey_color mt-4" />

              <div className="px-sm-5 mt-4">
                <label
                  htmlFor="password"
                  className={
                    (formik.errors.password && formik.touched.password) || error
                      ? ` fs_16 fw_500 mb-2 red_color`
                      : ` fs_16 fw_500 mb-2 primary_color`
                  }
                >
                  Please submit your password to confirm
                </label>
                <div>
                  <div className="d-flex position-relative">
                    <input
                      type={resetPasswordVisible ? "text" : "password"}
                      className={
                        (formik.errors.password && formik.touched.password) ||
                        error
                          ? ` password_error background_none w-100 border_radius_3px py-1 outline_none ps-2`
                          : `background_none w-100 border_radius_3px py-1 password_input outline_none ps-2`
                      }
                      placeholder="Please enter your password"
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setError(false);
                      }}
                    />
                    <div className="restore_password_visible cursor_pointer">
                      <img
                        onClick={() =>
                          setResetPasswordVisible(!resetPasswordVisible)
                        }
                        src={resetPasswordVisible ? eyeOn : eyeOff}
                        alt="password visibility on or off"
                      />
                    </div>
                  </div>
                  <div style={{ height: "25px" }}>
                    {formik.errors.password && formik.touched.password && (
                      <span className="red_color fw_500 ">
                        {formik.errors.password}
                      </span>
                    )}
                    {error && (
                      <span className="red_color fw_500 ">{error}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4 px-sm-5 mb-3 ">
                <button
                  className="  white_bg border_radius_5px px-2 py-1  "
                  type="button"
                  onClick={() => {
                    handlesosClosedResPassW();
                    formik.resetForm();
                    setError(false);
                    setIsCallShow("callID");
                  }}
                >
                  <span className="d-flex justify-content-center align-items-center px-sm-4">
                    <i className="ri-close-circle-fill primary_color fs_18"></i>

                    <span className=" fs_18 primary_color ps-2 fw_500 ">
                      Cancel
                    </span>
                  </span>
                </button>
                <button
                  className={`white_color primary_bg fs_16 px-sm-5 px-3 py-1 border_radius_5px border_none`}
                  type="submit"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SOSCloseResPasswordModal;
