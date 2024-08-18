import React, { useState } from "react";
import Select, { components } from "react-select";
import DropDownIcon from "../../assets/icons/dropdown-icon";
import {
  reactSelectUsageLimit,
  reactSelectUsageLimitDisabled,
  reactSelectUsageLimitError,
} from "../mui-styles/react-styles";

const CouponSelectField = ({
  placeholder,
  option,
  itemName,
  formikValue,
  formik,
  menuIsopen,
  formikError,
  formikTouched,
  labelName,
  selectDisabled = false,
  label_fontSize = "fs_16",
  className = "",
  hideOption,
  label = true,
  loading = false,
  isMulti = false,
  onSelect,
  setFieldValue
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
      {label && (
        <label
          htmlFor={itemName}
          className={
            formikError && formikTouched
              ? `red_color ${label_fontSize}`
              : `${label_fontSize} ${className} primary_color`
          }
        >
          {labelName}
        </label>
      )}

      <Select
        isDisabled={selectDisabled}
        getOptionLabel={hideOption}
        instanceId={itemName}
        id={itemName}
        options={option}
        isLoading={loading}
        // type="text"
        // isMulti={isMulti}
        placeholder={placeholder}
        menuIsOpen={menuIsopen}
        styles={
          formikError && formikTouched
            ? reactSelectUsageLimitError
            : selectDisabled === false
            ? reactSelectUsageLimit
            : reactSelectUsageLimitDisabled
        }
        name={itemName}
        value={option.filter((option) => {
          return option.value === formikValue;
        })}
        // value={option.filter((option) => formikValue?.includes(option.value))}
        onChange={(selectedOption) => {
          let event = {
            target: {
              name: itemName,
              value: selectedOption.value,
            },
          };

          formik.handleChange(event);
          if (onSelect) {
            onSelect(selectedOption.label);
          }
          if (setFieldValue) {
            formik.setFieldValue(setFieldValue, "");
            console.log(setFieldValue,"kkdsfgasjf");
          }
        }}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      />
    </>
  );
};

export default CouponSelectField;

export const rideTypeOptions = [
  { value: "Bike", label: "Bike" },
  { value: "Auto", label: "Auto" },
  { value: "Mini", label: "Mini" },
  { value: "Sedan", label: "Sedan" },
  { value: "Premiun Sedan", label: "Premiun Sedan" },
];

export const customStyles = {
  indicatorSeparator: () => ({ display: "none" }),
  control: (base, state) => ({
    ...base,
    background: "#ffffff",
    border: "1px solid #68728480",
    width: "75%",
    minHeight: "20px",
    maxHeight: "25px",
    borderColor: state.isFocused ? "#68728480" : "#68728480",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#68728480" : "#68728480",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#68728480" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#68728480" : "#68728480",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#464646",
      fontFamily: "Roboto",
      fontSize: "13px",
      fontWeight: "500",
      opacity: "0.9",
      position: "absolute",
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#323D5A",
    },
    padding: "0px",
    display: "block",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0px",
    display: "block",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    padding: "0px",
    display: "block",
  }),

  singleValue: (provided) => ({
    ...provided,

    fontSize: "14px",
  }),

  menu: (provided) => ({
    ...provided,
    width: "85%",
    textOverflow: "ellipsis",
  }),
  input: (provided) => ({
    ...provided,
    gridTemplateColumns: "0fr",
    // visibility: "hidden",
  }),
};
