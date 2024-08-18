import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../rideType-vehicleType/rideType-vehicleTypeComponents.css";
import Proceedbtn from "../../utilits/buttons/proceedbtn";
import { useDispatch } from "react-redux";
import SuccessMessagemodal from "../../modals/successMessageModal";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import {
  activeFaqOrTopicAction,
  inActiveFaqOrTopicAction,
} from "../../../redux/actions/faq/faqAction";
import SpinnerLoading from "../../utilits/spinnerLoading";

const UpdatedChangesModal = ({
  statusChangeShow,
  handleStatusChangeClose,
  handleStatusChange,
  setStatusValue,
  statusValue,
  faqData,
  zone_id,
  zone_status,
}) => {
  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (statusValue === true) {
        setLoading(true);
        dispatch(
          inActiveFaqOrTopicAction(
            {
              topic_id: faqData?.id,
              password: values?.password,
            },
            onInActiveSuccess,
            onInActiveError
          )
        );
      } else if (statusValue === false) {
        setLoading(true);
        dispatch(
          activeFaqOrTopicAction(
            {
              topic_id: faqData?.id,
              password: values?.password,
            },
            onActiveSuccess,
            onActiveError
          )
        );
      }
    },
  });

  const onActiveSuccess = (data) => {
    setLoading(false);
    setError(false);
    handleStatusChangeClose();
    handleSuccessMessageShow();
    handleStatusChange();
    setStatusValue(!statusValue);
    formik?.resetForm();
    console.log(data);
  };

  const onActiveError = (data) => {
    setLoading(false);
    console.log(data);
    setError(data?.data?.data);
  };

  const onInActiveSuccess = (data) => {
    setLoading(false);
    setError(false);
    handleStatusChangeClose();
    handleSuccessMessageShow();
    handleStatusChange();
    setStatusValue(!statusValue);
    formik?.resetForm();
    console.log(data);
  };

  const onInActiveError = (data) => {
    setLoading(false);
    console.log(data);
    setError(data?.data?.data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title="Topic Status Changed Successfully!"
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
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-3">
                <span className="primary_color">
                  Are you sure you want to update changes?
                </span>
              </div>

              <PasswordInputField
                // inputContainer={"px-5"}
                reason={false}
                itemName={"password"}
                inputValue={formik.values.password}
                onChangeFn={(e) => {
                  formik.handleChange(e);
                }}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.password}
                formikTouched={formik.touched.password}
                error={error}
              />
              <div className="red_color fw_500 ms-5">{error ?? null}</div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                containerClassName="px-4 border_radius_5px"
                  cancelFn={() => {
                    formik?.resetForm();
                    setError(false);
                    handleStatusChangeClose();
                  }}
                />
                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-3 py-1 border_none"
                >
                  <span className=" fs_18 white_color px-3">
                    {loading ? <SpinnerLoading /> : `Confirm`}
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

export default UpdatedChangesModal;
