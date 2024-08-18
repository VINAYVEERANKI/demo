import React, { useEffect, useRef, useState } from "react";
import DraftMessageModal from "../modals/draftMessageModal";

const DraftMessageInput = ({
  labelName = "",
  disabled = false,
  formik,
  itemName = "",
  formikError,
  formikTouched,
  label_font_size = "16px",
  error,
  formikValue,
  is_input,
  onBlurFn
}) => {
  const [selectModalShow, setSelectModalShow] = useState(false);
  const handleSelectModalClose = () => {
    setSelectModalShow(false);
  };
  const handleSelectModalShow = () => {
    setSelectModalShow(true);
  };

  const [addValue, setAddValue] = useState("");
  const textareaRef = useRef(null);

  function handleAddClick() {
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;

    const prevText = formikValue;
    const textBefore = prevText.substring(0, startPos);
    const textAfter = prevText.substring(endPos, prevText.length);
    const newValue = textBefore + addValue + textAfter;

    formik.setFieldValue(itemName, newValue);
    formik.setFieldTouched(itemName, true);

    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(
      startPos + addValue.length,
      startPos + addValue.length
    );
  }

  const options = [
    { value: "{Rider_first_name}", label: "{Rider_first_name}" },
    { value: "{referral_link}", label: "{referral_link}" },
    { value: "{Value_3}", label: "{Value_3}" },
  ];

  const possibleAddValues = options?.map((item) => {
    return item?.value;
  });

  function handleDelete(e) {
    const clickPos = textareaRef.current.selectionStart;
    const prevText = textareaRef.current.value;

    let closestAddValue = null;
    let closestAddValueIndex = -1;

    for (const value of possibleAddValues) {
      const index = prevText.lastIndexOf(value, clickPos - 1);
      if (
        index !== -1 &&
        (index > closestAddValueIndex || closestAddValueIndex === -1)
      ) {
        closestAddValue = value;
        closestAddValueIndex = index;
      }
    }

    if (closestAddValue) {
      const addValueEndIndex = closestAddValueIndex + closestAddValue.length;

      if (clickPos >= closestAddValueIndex && clickPos <= addValueEndIndex) {
        e.preventDefault();
        const newTextBefore = prevText.substring(0, closestAddValueIndex);
        const newTextAfter = prevText.substring(
          addValueEndIndex,
          prevText.length
        );
        formik.setFieldValue(itemName, newTextBefore + newTextAfter);
        textareaRef.current.setSelectionRange(
          closestAddValueIndex,
          closestAddValueIndex
        );
      }
    }
  }

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <>
      <DraftMessageModal
        selectModalShow={selectModalShow}
        handleSelectModalClose={handleSelectModalClose}
        setAddValue={setAddValue}
        options={options}
        handleAddClick={handleAddClick}
      />
      {/* <label className="fw_500">{labelName}</label> */}
      <label
        htmlFor={itemName}
        className={
          (formikError && formikTouched) || error
            ? `red_color ${label_font_size} fw_500`
            : ` ${label_font_size} ${disabled === true ? "disabled_color": "primary_color"}  fw_500`
        }
      >
        {labelName}
      </label>
      <div className="d-sm-flex gap-3 align-items-center">
        <textarea
          className={
            (formikError && formikTouched) || error
              ? ` w-100 border_radius_3px error_border outline_none position-relative fw_500  ${
                  is_input === true ? "resize_none height_2" : " height_4"
                }`
              : `${
                disabled === true
                    ? "disabled_border  disabled_bg_color"
                    : "primary_border"
                } w-100 border_radius_3px  outline_none position-relative fw_500 ${
                  is_input === true ? "resize_none height_2" : " height_4"
                }`
          }
          value={formikValue}
          onChange={(e) => {
            formik.setFieldValue(itemName, e.target.value);
          }}
          onBlur={onBlurFn}
          id={itemName}
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleDelete(e);
            }
          }}
          disabled={disabled}
        />
        {disabled ? (
          <></>
        ) : (
          <button
            className="primary_border white_color primary_bg border_radius_5px px-4 fs_18 fw_500 primary_color"
            type="button"
            onClick={handleSelectModalShow}
          >
            Insert
          </button>
        )}
      </div>
    </>
  );
};

export default DraftMessageInput;
