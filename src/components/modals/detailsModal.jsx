import React from "react";
import Modal from "react-bootstrap/Modal";
import Okaybtn from "../utilits/buttons/okaybtn";
import moment from "moment";

const DetailsModal = ({
  detailsModalShow,
  handleDetailsModalClose,
  user,
  passwordObject,
}) => {
  const details = [];
  if (
    passwordObject?.type === "block_details" ||
    passwordObject?.type === "rider_block_details"
  ) {
    details?.push(
      {
        label: "Blocked at",
        value: user?.blocked_at
          ? moment(user?.blocked_at).format("DD-MM-YYYY, HH:mm")
          : "--",
      },
      {
        label: "Blocked by",
        value: user?.blockedBy?.user_name ?? "--",
      },
      {
        label: "Reason",
        value: user?.reason ?? "--",
      }
    );
  } else if (passwordObject?.type === "delete_details") {
    details?.push(
      {
        label: "Deleted at",
        value: user?.deleted_at
          ? moment(user?.deleted_at).format("DD-MM-YYYY   , HH:mm")
          : "--",
      },
      {
        label: "Deleted by",
        value: user?.deletedBy?.user_name ?? "--",
      },
      {
        label: "Reason",
        value: user?.reason ?? "--",
      }
    );
  } else if (passwordObject?.type === "driver_details") {
    details?.push(...user);
  }
  return (
    <>
      <Modal
        centered
        show={detailsModalShow}
        onHide={handleDetailsModalClose}
        dialogClassName="blockDetails_modal"
        contentClassName="password_created_card"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <span
              className={`heading_border_bottom fs_20 primary_color fw_700`}
            >
              {passwordObject?.modalTitle}
            </span>
          </div>

          <div className="p-3">
            {details?.map((item) => {
              return (
                <tr>
                  <td className="fs_15 fw_700 primary_color  text-nowrap text-start ps-2">
                    {item?.label}
                  </td>
                  <td className="ps-3 pe-2 secondary_color fs_15 fw_600 text-nowrap">
                    :
                  </td>
                  <td
                    className={`secondary_color fs_15 fw_500 text-start  ${
                      item?.label === "Reason" ? "" : "text-nowrap"
                    }`}
                  >
                    {item?.value}
                  </td>
                </tr>
              );
            })}
          </div>
          <Okaybtn okayFn={handleDetailsModalClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DetailsModal;
