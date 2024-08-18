import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import successToast from "../utilits/successToast";
import errorToast from "../utilits/errorToast";
import PasswordInputField from "../form/passwordInputField";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import SuccessMessagemodal from "../modals/successMessageModal";
import {
  approveDriverRefAction,
  approveReferralAction,
} from "../../redux/actions/referrals/approveReferralAction";
import {
  rejectDriverefAction,
  rejectReferralAction,
} from "../../redux/actions/referrals/rejectReferralAction";
import {
  deleteDriverRefAction,
  deleteReferralAction,
} from "../../redux/actions/referrals/deleteReferralAction";
import SpinnerLoading from "../utilits/spinnerLoading";

const ReferralPasswordModal = ({
  changeUpdatePasswordshow,
  handleChangeUpdatePasswordClose,
  referralBackendData,
  statusBtn,
  title,
  type = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      const data = {
        referral_id: referralBackendData?.id,
        password: values?.ConfirmPassword,
      };
      if (type === "riderReferrals") {
        setLoading(true);
        {
          statusBtn === "Approve" &&
            dispatch(approveReferralAction(data, onSuccess, onError));
        }
        {
          statusBtn === "Reject" &&
            dispatch(rejectReferralAction(data, onSuccess, onError));
        }
        {
          statusBtn === "Delete" &&
            dispatch(deleteReferralAction(data, onSuccess, onError));
        }
      } else if (type === "driverReferrals") {
        if (statusBtn === "Approve") {
          setLoading(true);
          dispatch(approveDriverRefAction(data, onSuccess, onError));
        } else if (statusBtn === "Reject") {
          setLoading(true);
          dispatch(rejectDriverefAction(data, onSuccess, onError));
        } else if (statusBtn === "Delete") {
          setLoading(true);
          dispatch(deleteDriverRefAction(data, onSuccess, onError));
        }
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    handleSuccessMessageShow();
    handleChangeUpdatePasswordClose();
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
  };

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate(
      type === "driverReferrals" ? "/driver-referral" : "/rider-referral"
    );
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  return (
    <>
      <Modal
        centered
        show={changeUpdatePasswordshow}
        onHide={handleChangeUpdatePasswordClose}
        dialogClassName="ban_application_container"
        contentClassName="border_radius_10px"
        backdropClassName="rating_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center   mt-3 mb-4">
                <span className="fs_21 primary_color fw_600">{title}</span>
              </div>
              <PasswordInputField
                inputContainer={"px-4"}
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
              <div className="red_color fw_500 ps-4">{error}</div>
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handleChangeUpdatePasswordClose();
                    formik.resetForm();
                    setError(false);
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-5 py-1 border_none"
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

      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={() => {
          handleSuccessMessageClose();
        }}
        title={
          statusBtn === "Approve"
            ? "Referral successfully approved!"
            : statusBtn === "Reject"
            ? "Referral successfully rejected!"
            : statusBtn === "Delete"
            ? "Referral successfully deleted!"
            : "--"
        }
      />
    </>
  );
};
export default ReferralPasswordModal;
