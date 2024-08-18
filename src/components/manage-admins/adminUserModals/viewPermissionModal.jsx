import React from "react";
import Modal from "react-bootstrap/Modal";
import "../adminModals.css";
import Resetbtn from "../../utilits/buttons/resetbtn";
import { removeUnderScore } from "../../helper";

const ViewPermissionsModal = ({
  permissionShow,
  handlePermissionClose,
  formik,
  action,
}) => {


  const handleCancelFn = () => {
    if (action === "view") {
      handlePermissionClose();
    } else {
      formik.setFieldValue("user_permission", formik?.values?.user_permission);
      handlePermissionClose();
    }
  };

  const handleWriteCheck = (event, sectionName, subSectionName) => {
    formik.handleChange(event);
    const isWrite = event.currentTarget.name?.includes("write");

    if (isWrite) {
      if (event.currentTarget.checked) {
        formik.setFieldValue(
          `user_permission.${sectionName}.${subSectionName}.read`,
          true
        );
      } else {
        formik.setFieldValue(
          `user_permission.${sectionName}.${subSectionName}.read`,
          false
        );
      }
    }
  };

  return (
    <>
      <Modal
        centered
        show={permissionShow}
        onHide={handlePermissionClose}
        size="large"
        dialogClassName="add_new_admin_container"
        contentClassName="border_radius_15px"
        backdropClassName="edit_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <div className="admin_panel py-3">
          <span className=" d-flex justify-content-center fs_14 fw_600 view_title">
            Admin Panel Feature Permissions
          </span>
        </div>
        <Modal.Body>
          <>
            <div className=" d-flex justify-content-center mt-2">
              <div className="col-lg-10 col-12">
                <div className="row justify-content-center table_header pale_blue_bg g-0">
                  <div className="col-4">
                    <div className="px-3 py-2 fs_12 fw_500">Menu Section</div>
                  </div>
                  <div className="col-4">
                    <div className="px-3 py-2 fs_12 fw_500">Sub-section</div>
                  </div>
                  <div className="col-2">
                    <div className="px-3 py-2 fs_12 ms-3 fw_500">View</div>
                  </div>
                  <div className="col-2">
                    <div className="px-3 py-2 fs_12 ms-3 fw_500">Edit</div>
                  </div>
                </div>

                <div className="view_permissions_lists">
                  {Object.entries(formik?.values?.user_permission).map(
                    ([sectionName, permissions]) => {
                      return (
                        <div
                          className="row g-0 justify-content-center"
                          key={sectionName}
                        >
                          <div className="col-4 table_btms">
                            <div className="py-2 px-2 fs_14 fw_500">
                              {sectionName
                                ? removeUnderScore(sectionName)
                                : "--"}
                            </div>
                          </div>
                          <div className="col-8 table_data">
                            <div className="row g-0">
                              {Object.entries(permissions).map(
                                ([subSectionName, subPermissions]) => {
                                  return (
                                    <React.Fragment key={subSectionName}>
                                      <div className="col-6 table_btms">
                                        <div className="px-2 py-1 fs_14 fw_500">
                                          {subSectionName
                                            ? removeUnderScore(subSectionName)
                                            : "--"}
                                        </div>
                                      </div>
                                      <div className="col-3 table_btms">
                                        <div className="px-2 ms-3 py-1 fs_14">
                                          <input
                                            type="checkbox"
                                            className="manage_fare_checkbox_row ms-2"
                                            id={`${sectionName}_${subSectionName}_read`}
                                            name={`user_permission.${sectionName}.${subSectionName}.read`}
                                            checked={subPermissions?.read}
                                            onChange={formik.handleChange}
                                            disabled={
                                              action === "view" ||
                                              subPermissions?.write
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-3 table_btms">
                                        <div className="px-2 ms-3 py-1 fs_14 last_lists">
                                          <input
                                            type="checkbox"
                                            className="manage_fare_checkbox_row ms-2"
                                            id={`${sectionName}_${subSectionName}_write`}
                                            name={`user_permission.${sectionName}.${subSectionName}.write`}
                                            checked={subPermissions?.write}
                                            onChange={(event) =>
                                              handleWriteCheck(
                                                event,
                                                sectionName,
                                                subSectionName
                                              )
                                            }
                                            disabled={action === "view"}
                                          />
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </>
        </Modal.Body>

        <div className="admin_downpanel">
          <div
            className={`d-flex ${
              action === "view"
                ? "justify-content-end me-3"
                : "justify-content-center"
            }  mt-3 gap-sm-3 gap-1 mb-3`}
          >
            <button
              className={`border_none  d-flex align-items-center fs_16 px-sm-4 fw_500 border_radius_3px gap-2  py-1`}
              type="button"
              onClick={() => {
                formik.setFieldValue(
                  "user_permission",
                  formik?.initialValues?.user_permission
                );
                handlePermissionClose();
              }}
            >
              <i className="ri-close-circle-fill primary_color fs_18"></i>
              Cancel
            </button>
            {action === "view" ? (
              <></>
            ) : (
              <>
                {" "}
                <Resetbtn
                  onResetFn={() => {
                    formik.setFieldValue(
                      "user_permission",
                      formik?.initialValues?.user_permission
                    );
                  }}
                />
                <button
                  className={`light_green_bg px-sm-5  white_color border_none  border_radius_5px ms-3 fw_400 py-2 d-flex align-items-center gap-2`}
                  type={"button"}
                  onClick={() => {
                    handleCancelFn();
                  }}
                >
                  <i className="ri-save-fill"></i> SAVE
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewPermissionsModal;
