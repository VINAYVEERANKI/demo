import React from "react";
import { Modal } from "react-bootstrap";

const WarningMessageModal = ({
  leavePageShow,
  handleLeavePageClose,
  title = "Are you sure you want to leave this page?",
  description = "Any changes made will be discarded.",
  subsection = false,
  title_color = "primary_color",
  cancelFn,
  okayFn,
  
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
            <span className={`fs_20 ${title_color} fw_600 text-center`}>
              {title}
            </span>
          </div>
          {subsection ? (
            <div className="d-flex justify-content-center mt-4">
              <span className="text-center fw_400 fs_18 primary_color">
                {description}
              </span>
            </div>
          ) : null}
          <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
            <button
              className={`white_bg error_border  border_radius_5px px-4`}
              type="button"
              onClick={() => cancelFn()}
            >
              <span
                className={`d-flex justify-content-center align-items-center gap-2 `}
              >
                <i className="ri-close-circle-fill error_color fs_18"></i>

                <span className=" fs_18 error_color  fw_500 ">No</span>
              </span>
            </button>
            <button
              className="UpdatePricingSuccessOkay_btn  primary_bg border_radius_5px px-4 py-1 mt-2 mb-2 border_none"
              onClick={() => {
                okayFn();
              }}
              type="button"
            >
              <span className=" fs_18 white_color fw_500 px-4">Yes</span>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WarningMessageModal;
