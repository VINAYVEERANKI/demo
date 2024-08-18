import React from "react";
import Modal from "react-bootstrap/Modal";
import Okaybtn from "../../utilits/buttons/okaybtn";
import "../../modals/modal.css";
import WarningImage from "../../../assets/images/warning-image.jpg";

const ErrorMessagemodal = ({
  errorMessageShow,
  handleErrorMessageClose,
  title = `Zone cannot be restored`,
  description,
  subDescription,
  zoneID,
  subsection = false,
  subSubsection = false,
  title_color = "primary_color",
  zoneID_color = "red_color",
}) => {
  return (
    <>
      <Modal
        centered
        show={errorMessageShow}
        onHide={handleErrorMessageClose}
        dialogClassName="zone_cannot_create_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
            <span className={`fs_22 ${title_color} fw_600`}>{title}</span>{" "}
            <img
              src={WarningImage}
              width="30px"
              height="30px"
              className=""
              alt="icon"
            />
          </div>
          {subsection ? (
            <div className="d-flex justify-content-center mt-3 mx-5">
              <span className="text-center fw_500 fs_16 spanish_gray_color">
                {description}
              </span>
            </div>
          ) : null}
          {subSubsection ? (
            <div className="d-flex justify-content-center mt-3 mx-5">
              <span className="text-center fw_500 fs_16 spanish_gray_color">
                {subDescription}{" "}
                <span className={`${zoneID_color}`}>{zoneID}</span>
              </span>
            </div>
          ) : null}

          <div className="d-flex justify-content-center">
            <Okaybtn okayFn={handleErrorMessageClose} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ErrorMessagemodal;
 