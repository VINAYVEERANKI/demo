import React from "react";
import Modal from "react-bootstrap/Modal";
import Okaybtn from "../utilits/buttons/okaybtn";
import "../modals/modal.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import successToast from "../utilits/successToast";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import logoutImage from "../../assets/images/logout.png";

const LogoutModal = ({ logoutModalshow, handleLogoutModalClose }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    successToast("You have been logged out");
  };
  return (
    <Modal
      centered
      show={logoutModalshow}
      onHide={handleLogoutModalClose}
      dialogClassName="appproved_successfully_container"
      contentClassName="border_radius_10px"
      backdropClassName="create_password_modal_backdrop"
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex flex-column  mt-3">
          <span className={`fs_23 primary_color fw_600 text-center`}>
            Are you sure you want to Logout ?
          </span>
          <div className="text-center mt-1">
            <img src={logoutImage} alt="logout-icon" />{" "}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 cursor_pointer py-3">
          <Cancelbtn
            cancelFn={() => {
              handleLogoutModalClose();
            }}
          />
          <Okaybtn
            okay="Logout"
            btnType="submit"
            className="fs_16"
            iconShow={false}
            okayFn={handleLogout}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
