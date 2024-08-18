import React from "react";
import Modal from "react-bootstrap/Modal";
import Okaybtn from "../../utilits/buttons/okaybtn";
import "../../modals/modal.css";

const PasswordSuccessModal = ({
  successMessageShow,
  handleSuccessMessageClose,
  title = `FAQ added successfully!`,
  description,
  subsection = false,
  title_color = "primary_color",
}) => {
  return (
    <>
      <Modal
        centered
        show={successMessageShow}
        onHide={handleSuccessMessageClose}
        dialogClassName="appproved_successfully_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center   mt-3">
            <span className={`fs_23 ${title_color} fw_600`}>{title}</span>
          </div>
          {subsection ? (
            <div className="d-flex justify-content-center mt-3">
              <span className="text-center fw_500 fs_16 spanish_gray_color">
                {description}
              </span>
            </div>
          ) : null}

          <div className="d-flex justify-content-center">
            <Okaybtn okayFn={handleSuccessMessageClose} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PasswordSuccessModal;
