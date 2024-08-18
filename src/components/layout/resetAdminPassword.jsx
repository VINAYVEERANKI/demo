import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../manage-admins/adminModals.css";
import { useFormik } from "formik";
import * as yup from "yup";
import eyeOn from "../../assets/icons/eye-on.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import { resetPasswordStyles } from "../mui-styles/mui-styles";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import SuccessMessagemodal from "../modals/successMessageModal";
import { useDispatch } from "react-redux";
import { logout, resetPasswordAction } from "../../redux/actions/authAction";
import errorToast from "../utilits/errorToast";
import { socket } from "../../redux/config";
import successToast from "../utilits/successToast";

const validationSchema = yup.object({
  oldPassword: yup
    .string("")
    .trim()
    .required("Please fill the fields to proceed"),
  confirmPassword: yup
    .string("")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Your password didn't match"),
    })
    .required("Please fill the fields to proceed"),
  password: yup.string("").trim().required("Please fill the fields to proceed"),
});

const ResetAdminPasswordModal = ({
  resetPasswordshow,
  handleResetPasswordClose,
}) => {
  const dispatch = useDispatch();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    handleLogout();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const handleLogout = () => {
    dispatch(logout());
    // successToast("You have been logged out");
  };
  const formikPass = useFormik({
    initialValues: {
      oldPassword: "",
      confirmPassword: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        resetPasswordAction(
          {
            old_password: values.oldPassword,
            new_password: values.password,
            confirm_password: values.password,
          },
          onSuccess,
          onError
        )
      );
    },
  });

  const onSuccess = (data) => {
    handleResetPasswordClose();
    handleSuccessMessageShow();
    formikPass?.resetForm();
   
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
  };


  const [user_id, setUser_id] = useState("");
  const [socket_id, setSocket_id] = useState("");
  useEffect(() => {
    setUser_id(localStorage.getItem("id"));
  }, []);

  console.log(user_id, "kjhaskldada");

  useEffect(() => {
    socket.on("admin_logout", (data) => {
      setSocket_id(data);
    });
  }, [socket]);

  useEffect(() => {
    if (user_id) {
      if (socket_id === user_id) {
        dispatch(logout());
        successToast("You have been logged out");
      }
    }
  }, [socket_id]);

  console.log(socket_id, "ksjdfakdas");



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
                Reset Password
              </div>
              <div className="d-flex position-relative mb-4">
                <TextField
                  size="small"
                  style={{ width: "100%" }}
                  sx={resetPasswordStyles.select}
                  id="oldPassword"
                  name="oldPassword"
                  label="Enter old password"
                  type={oldPasswordVisible ? "text" : "password"}
                  autoComplete="off"
                  value={formikPass.values.oldPassword}
                  onChange={formikPass.handleChange}
                  error={
                    formikPass.touched.oldPassword &&
                    Boolean(formikPass.errors.oldPassword)
                  }
                  helperText={
                    formikPass.touched.oldPassword &&
                    formikPass.errors.oldPassword
                  }
                />
                <div className={`password_visible_icon cursor_pointer `}>
                  <img
                    onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                    src={oldPasswordVisible ? eyeOn : eyeOff}
                    alt="password visibility on or off"
                  />
                </div>
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
                  <span className="fs_18 white_color ps-2">Proceed</span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={"Password Reseted Successfully!"}
      />
    </>
  );
};

export default ResetAdminPasswordModal;
