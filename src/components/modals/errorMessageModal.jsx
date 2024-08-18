import React from "react";
import Modal from "react-bootstrap/Modal";
import Okaybtn from "../utilits/buttons/okaybtn";
import "./modal.css";
import SomethingWrongImage from "../../assets/icons/something-wrong.svg";

const ErrorMessagemodal = ({
  errorMessageShow,
  handleErrorMessageClose,
  title = `Error`,
  title_color = "red_color",
  is_description = false,
  description = "",
  titleShow = true,
  imageShow = false,
  descriptionTextColor = "primary_color",
  contentDiv = <></>,
}) => {
  return (
    <>
      <Modal
        centered
        show={errorMessageShow}
        onHide={handleErrorMessageClose}
        dialogClassName="appproved_successfully_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          {imageShow && (
            <div>
              <img src={SomethingWrongImage} width={450} height={250} />
            </div>
          )}
          {titleShow && (
            <div className="d-flex justify-content-center   mt-3">
              <span className={`fs_20 ${title_color} fw_500 text-center px-3`}>
                {title}
              </span>
            </div>
          )}

          {is_description && (
            <div className="d-flex justify-content-center   mt-3 px-2">
              <div className="text-center">
                <span className={`fs_18 ${descriptionTextColor} fw_400  px-3`}>
                  {description}
                </span>
                <div className="mt-3">{contentDiv}</div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <Okaybtn okayFn={handleErrorMessageClose} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ErrorMessagemodal;
