import React from "react";
import { statusColor } from "../../helper";
import CloseIcon from "../../../assets/icons/close-icon";
import styles from "../../manage-riders/ridersComponent.module.css";

const ModalHeading = ({
  title = "",
  closeFn,
  status,
  statusShow = true,
  horizontal = true,
  title_text = "fs_21 primary_color fw_600",
}) => {
  return (
    <>
      <div
        className={`d-flex justify-content-between align-items-center ${
          horizontal ? "border-bottom" : ""
        }  pb-2  mt-1`}
      >
        <span className={`${title_text}`}>{title}</span>
        <button
          className="border_none background_none"
          onClick={() => closeFn()}
          type="button"
        >
          <CloseIcon
            fill="white"
            className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
            width={20}
            height={20}
          />
        </button>
      </div>
      {statusShow ? (
        <div className="mt-2">
          <span className="fw_500 ">
            Status:
            <span className={`ps-2 fw_600 ${statusColor(status)}`}>
              {status}
            </span>
          </span>
        </div>
      ) : null}
    </>
  );
};

export default ModalHeading;
