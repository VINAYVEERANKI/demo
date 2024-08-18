import React from "react";
import { Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { removeUnderScore } from "../../helper";

const ViewNotificationModal = ({ messageShow, handleMessageClose, item }) => {
  // const navigate=useNavigate();
  return (
    <Modal
      centered
      show={messageShow}
      onHide={handleMessageClose}
      dialogClassName="appproved_successfully_container"
      contentClassName="border_radius_10px"
      backdropClassName="notification_backdrop"
      backdrop={"static"}
        keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center mt-3">
          <span className={`fs_23 primary_color fw_600`}>
            Application undergoing changes
          </span>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <span className="text-center fw_600 fs_16 spanish_gray_color">
            This application is currently being modified by{" "}
            <span className="fw_600">
              `{removeUnderScore(item?.updated_by)}`.{" "}
            </span>
            <br /> Do you want to view the application?
          </span>
        </div>

        <div className="d-flex justify-content-between px-lg-5 px-md-5 mt-4 mb-3">
        {/* button { */}
     {/* border-bottom: 2px solid transparent;  */}
{/* } */}
          <button
            className={`white_bg border_radius_5px py-1 px-5`}
            type="button"
            onClick={() => handleMessageClose()}
          >
            <span
              className={`d-flex justify-content-center align-items-center fs_lg_18 fs_sm_10 primary_color fw_500 `}
            >
              Go back
            </span>
          </button>
          <NavLink
            className=" primary_bg border_radius_5px px-2 py-1 border_none view_text text-decoration-none"
            to={`/pending-applications/driver-rideHistory/${item?.id}`}
            state={{
              id: item?.id,
            }}
          >
            <span className=" fs_lg_18 fs_sm_10 white_color ps-2">View Application</span>
          </NavLink>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewNotificationModal;
