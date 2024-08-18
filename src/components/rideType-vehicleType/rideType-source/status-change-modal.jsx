import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../rideType-vehicleTypeComponents.css";
import Proceedbtn from "../../utilits/buttons/proceedbtn";
import { useDispatch } from "react-redux";
import { zoneStatusChangeAction } from "../../../redux/actions/manageFaresAction";
import SuccessMessagemodal from "../../modals/successMessageModal";
import PasswordInputField from "../../form/passwordInputField";

function StatusChangeModal({
  statusChangeShow,
  handleStatusChangeClose,
  handleStatusChange,
  setStatusValue,
  statusValue,
  zone_id,
  zone_status,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [error, setError] = useState(false);

  const formRef = useRef();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        zoneStatusChangeAction(
          {
            main_zone_id: zone_id,
            zones_status:
              zone_status === "Active"
                ? "Inactive"
                : zone_status === "Inactive"
                ? "Active"
                : "",
            password: values?.password,
          },
          onSuccess,
          onError
        )
      );
    },
  });

  const onSuccess = (data) => {
    console.log(data);
    setLoading(false);
    formik?.resetForm();
    handleStatusChangeClose();
    handleSuccessMessageShow();
    handleStatusChange();
    setStatusValue(!statusValue);
    localStorage.setItem(
      "zone_status",
      zone_status === "Active"
        ? "Inactive"
        : zone_status === "Inactive"
        ? "Active"
        : ""
    );
  };

  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    console.log(data);
  };

  console.log(error);

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title="Status Changed Successfully"
      />
      <Modal
        centered
        show={statusChangeShow}
        onHide={handleStatusChangeClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-3">
                <span className="primary_color">
                  Are you sure you want to change the status?
                </span>
              </div>

              <PasswordInputField
                inputContainer={"px-lg-5 px-md-5 px-sm-0"}
                reason={false}
                itemName={"password"}
                inputValue={formik.values.password}
                onChangeFn={(e) => {
                  formik.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.password}
                formikTouched={formik.touched.password}
                error={error}
              />
              <span className="red_color fw_500 px-5">{error}</span>

              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5  px-sm-0 mb-3 mx-3">
                <button
                  type="button"
                  className=" white_bg border_radius_5px px-4 py-1 "
                  onClick={() => {
                    handleStatusChangeClose();
                    setError(false);
                  }}
                >
                  <div className="d-flex">
                    <span className=" fs_18 primary_color fw_600">
                      Go Back
                    </span>
                  </div>
                </button>

                <Proceedbtn loading={loading} submitFn={handleSubmit} />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default StatusChangeModal;
