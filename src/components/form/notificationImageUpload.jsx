import React from "react";
import { openInNewTab } from "../helper";

const NotificationImageUpload = ({
  uploaded,
  notificationImage,
  is_editable,
  handleNotificationImageChange,
  setFieldValue,
  formikValue,
  itemName = "",
  className = "",
}) => {
  return (
    <div className={`d-sm-flex align-items-center gap-3 mt-1 ${className}`}>
      <span className={"fs_16 primary_color"}>
        Notification Image{" "}
        <span className="primary_color fs_14">(optional)</span>
      </span>
      {uploaded || formikValue?.length >= 1 ? (
        <>
          <span className="green_color fs_14">Image Uploaded</span>
          <button
            className="primary_bg white_color border_radius_5px px-3 border_none"
            onClick={() =>
              openInNewTab(uploaded ? notificationImage : formikValue)
            }
            type="button"
          >
            View
          </button>
        </>
      ) : (
        <></>
      )}
      {is_editable === false ? (
        <></>
      ) : (
        <div className="d-flex">
          <label
            className="upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
            htmlFor="files"
          >
            <input
              type="file"
              accept="image/*"
              id="files"
              className="upload_document_input cursor_pointer"
              name={itemName}
              onChange={(e) => {
                setFieldValue(itemName, e.target.files[0]);
                handleNotificationImageChange(e);
              }}
            />

            {uploaded || formikValue?.length >= 1 ? (
              <span> Re-upload</span>
            ) : (
              <span> Upload</span>
            )}
          </label>
        </div>
      )}
    </div>
  );
};

export default NotificationImageUpload;
