import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../adminModals.css";
import { useFormik } from "formik";
import * as yup from "yup";
import eyeOn from "../../../assets/icons/eye-on.svg";
import eyeOff from "../../../assets/icons/eye-off.svg";
import { resetPasswordStyles } from "../../mui-styles/mui-styles";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import {
  logout,
  resetLogoutPasswordAction,
} from "../../../redux/actions/authAction";
import successToast from "../../utilits/successToast";
import { socket } from "../../../redux/config";

// const passwordRegex =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validationSchema = yup.object({
  confirmPassword: yup
    .string("")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Your password didn't match"),
    })
    .required("Please fill the fields to proceed"),
  password: yup
    .string("")
    // .matches(passwordRegex, "Invalid password")
    .trim()
    .required("Please fill the fields to proceed"),
});

function ResetPasswordModal({
  resetPasswordshow,
  handleResetPasswordClose,
  formik,
  action,
  admin_id,
}) {
  const dispatch = useDispatch();
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState("");
  const formikPass = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.setFieldValue("password", values.password);
      handleResetPasswordClose();
      handleSuccessMessageShow();
      formikPass?.resetForm();
      if (action === "edit") {
        dispatch(
          resetLogoutPasswordAction(
            {
              admin_id: admin_id,
              password: values.password,
              confirm_password: values.confirmPassword,
            },
            onSuccess,
            onError
          )
        );
      }

      if (action === "create" && formik?.values?.password === "") {
        setPasswordSuccessMsg("Password Created Successfully!");
      } else {
        setPasswordSuccessMsg("Password Reseted Successfully!");
      }
    },
  });

  const onSuccess = (data) => {
    console.log(data?.data?.id, "kjhaskldada");
    successToast("Password Reset Successfully");
  };
  const onError = (data) => {
    console.log(data, "kjhaskldada");
  };

  return (
    <>
      <Modal
        centered
        show={resetPasswordshow}
        onHide={handleResetPasswordClose}
        dialogClassName="create_password_container"
        contentClassName="create_password_card_radius"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikPass.handleSubmit}>
              <div className="d-flex justify-content-center fs_20 primary_color fw_600  mt-1 mb-4">
                {action === "create" && formik?.values?.password === ""
                  ? "Create Password"
                  : "Reset Password"}
              </div>
              <div className="d-flex position-relative">
                <TextField
                  size="small"
                  style={{ width: "100%" }}
                  sx={resetPasswordStyles.select}
                  id="password"
                  name="password"
                  label="Enter new password"
                  type={resetPasswordVisible ? "text" : "password"}
                  autoComplete="off"
                  value={formikPass.values.password}
                  onChange={formikPass.handleChange}
                  error={
                    formikPass.touched.password &&
                    Boolean(formikPass.errors.password)
                  }
                  helperText={
                    formikPass.touched.password && formikPass.errors.password
                  }
                />
                <div className={`password_visible_icon cursor_pointer `}>
                  <img
                    onClick={() =>
                      setResetPasswordVisible(!resetPasswordVisible)
                    }
                    src={resetPasswordVisible ? eyeOn : eyeOff}
                    alt="password visibility on or off"
                  />
                </div>
              </div>
              <div className="d-flex position-relative">
                <TextField
                  className="mt-4"
                  size="small"
                  style={{ width: "100%" }}
                  sx={resetPasswordStyles.select}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  label="Confirm new password"
                  autoComplete="off"
                  value={formikPass.values.confirmPassword}
                  onChange={formikPass.handleChange}
                  error={
                    formikPass.touched.confirmPassword &&
                    Boolean(formikPass.errors.confirmPassword)
                  }
                  helperText={
                    formikPass.touched.confirmPassword &&
                    formikPass.errors.confirmPassword
                  }
                />
                <div
                  className={`password_confirm_visible_icon cursor_pointer `}
                >
                  <img
                    onClick={() =>
                      setconfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    src={confirmPasswordVisible ? eyeOn : eyeOff}
                    alt="password visibility on or off"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between pt-2 mt-4 px-lg-5 px-md-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handleResetPasswordClose();
                    formikPass?.resetForm();
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="submit"
                >
                  <span className=" fs_18 white_color ps-2">Proceed</span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={passwordSuccessMsg}
      />
    </>
  );
}

export default ResetPasswordModal;
