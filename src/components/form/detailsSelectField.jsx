import React, { useState } from "react";
import Select, { components } from "react-select";
import DropDownIcon from "../../assets/icons/dropdown-icon";
import {
  reactSelectDriverDetails,
  reactSelectDriverDetailsDisabled,
  reactSelectDriverDetailsError,
} from "../mui-styles/react-styles";

const DetailsSelectField = ({
  placeholder,
  option,
  itemName,
  formikValue,
  formik,
  menuIsopen,
  formikError,
  formikTouched,
  isDisabled = false,
  hideOption,
  loading = false,
  label,
  first_col = "col-5",
  second_col = "col-7",
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };
  return (
    <>
      <div className="row my-1 gx-0 align-items-center">
        <div className={`${first_col}`}>
          <label
            className={`${
              formikError && formikTouched
                ? "fs_14 red_color fw_500"
                : "fs_14 disabled_color fw_500"
            }`}
          >
            {label}
          </label>
        </div>
        <div className={`${second_col}`}>
          <Select
            isDisabled={isDisabled}
            getOptionLabel={hideOption}
            instanceId={itemName}
            id={itemName}
            options={option}
            isLoading={loading}
            placeholder={placeholder}
            menuIsOpen={menuIsopen}
            styles={
              formikError && formikTouched
                ? reactSelectDriverDetailsError
                : isDisabled === false
                ? reactSelectDriverDetails
                : reactSelectDriverDetailsDisabled
            }
            name={itemName}
            value={option.filter((option) => {
              return option.value === formikValue;
            })}
            onChange={(selectedOption) => {
              let event = {
                target: {
                  name: itemName,
                  value: selectedOption.value,
                },
              };

              formik.handleChange(event);
            }}
            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          />
        </div>
      </div>
    </>
  );
};

export default DetailsSelectField;
