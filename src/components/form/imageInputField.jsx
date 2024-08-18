import React from "react";
import { Spinner } from "react-bootstrap";

const ImageInputField = ({
  itemName,
  title,
  loader = false,
  onChangeFn,
  onBlurFn,
  type = "file",
}) => {
  return (
    <label
      className="upload_btn px-3 white_color dark_blue_bg border_radius_5px"
      // for={itemName}
    >
      <input
        type={type}
        // id={itemName}
        className="upload_document_input"
        name={itemName}
        onChange={onChangeFn}
        onBlur={onBlurFn}
      />
      {loader ? (
        <Spinner
          as="span"
          size="sm"
          animation="border"
          className="mx-3"
          variant="secondary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        title
      )}
    </label>
  );
};

export default ImageInputField;
