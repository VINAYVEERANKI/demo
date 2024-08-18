import React from "react";
import Modal from "react-bootstrap/Modal";
import NoButton from "../utilits/buttons/noButton";
import YesButton from "../utilits/buttons/yesButton";
import "./modal.css";

const LeavePagemodal = ({
  link,
  leavePageShow,
  handleLeavePageClose,
  title = "Are you sure you want to leave this page?",
  description = "Any changes made will be discarded.",
  subsection = false,
  title_color = "primary_color",
  okayFn
}) => {
  return (
    <>
      <Modal
        centered
        show={leavePageShow}
        onHide={handleLeavePageClose}
        dialogClassName="leave_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center   mt-3">
            <span className={`fs_20 ${title_color} fw_600 text-center`}>{title}</span>
          </div>
          {subsection ? (
            <div className="d-flex justify-content-center mt-4">
              <span className="text-center fw_400 fs_18 primary_color">
                {description}
              </span>
            </div>
          ) : null}
          <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
            <NoButton cancelFn={handleLeavePageClose} />
            <YesButton okay="Yes" link={link} okayFn={okayFn} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LeavePagemodal;
