import React from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import Select from "react-select";
import CancelModalbtn from "../utilits/buttons/cancelModalbtn";

const DraftMessageModal = ({
  selectModalShow,
  handleSelectModalClose,
  setAddValue,
  options = [],
  handleAddClick,
}) => {
  return (
    <>
      <Modal
        centered
        show={selectModalShow}
        onHide={handleSelectModalClose}
        dialogClassName="appproved_successfully_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center my-3">
            <span className={`fs_23 primary_color fw_600`}>Select Field</span>
          </div>

          <Select
            className="w-100"
            onChange={(e) => setAddValue(e.value)}
            options={options}
          />

          <div className="row mt-5">
            <div className="d-flex justify-content-end gap-3">
              <CancelModalbtn cancelModalFn={handleSelectModalClose} />
              <button
                className={`light_green_bg px-5 white_color border_none  border_radius_5px ms-3 fw_400 py-2 d-flex align-items-center gap-2`}
                onClick={() => {
                  handleAddClick();
                  handleSelectModalClose();
                  setAddValue("");
                }}
                type={"button"}
              >
                Add
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DraftMessageModal;
