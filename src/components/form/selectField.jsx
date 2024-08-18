import { Autocomplete, TextField } from "@mui/material";
import { Field } from "formik";
import React, { useState } from "react";
import Select, { components } from "react-select";
import "./inputFields.css";

const SelectField = ({
  label,

  disabled = false,
  default1,
  selectedOption,
  setSelectedOption,
  name,
  options,
  type,
  value,
  formik,
  containerClassName = "mb-2",
  placeholder = "enter",
  id,
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
        </svg>
      </components.DropdownIndicator>
    );
  };

  const [changed, whenChanged] = useState(false);
  return (
    <div className={`${containerClassName}`}>
      <label
        htmlFor="email"
        className=" ps-2 dark_grey_color fn_Montserrat fw_500 fs_14"
      >
        {label}
      </label>

      <Select
        isDisabled={disabled}
        defaultValue={default1}
        value={
          changed === false
            ? default1
            : selectedOption.value
            ? options.find((c) => c.value === selectedOption)
            : ""
        }
        name={name}
        id={id}
        components={{ DropdownIndicator }}
        styles={customStyles}
        type={type}
        className={`select-input-field w-100 selectField__border focus_outline__none`}
        placeholder={placeholder}
        options={options}
        onChange={(selectedOption) => {
          {
            formik.setFieldValue(name, selectedOption.value);
            whenChanged(true);
            setSelectedOption({
              label: selectedOption.value,
              value: selectedOption.value,
            });
          }
        }}
      />
      {/* <Autocomplete
        className="country-select"
        name={name}
        options={options}
        getOptionLabel={(option) => option.label}
        defaultValue={default1}
        // {...params}
        onChange={(selectedOption) => {
          {
            formik.setFieldValue(name, selectedOption.value);
            whenChanged(true);
            setSelectedOption({
              label: selectedOption.value,
              value: selectedOption.value,
            });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
          
            variant="outlined"
            fullWidth
          />
        )}
      /> */}
    </div>
  );
};

export default SelectField;

export const idOptions = [
  { value: "AD002", label: "AD002" },
  { value: "AD006", label: "AD006" },
  { value: "AD008", label: "AD008" },
];

export const vehiclesOptions = [
  { value: "Hyundai", label: "Hyundai" },
  { value: "KIA", label: "KIA" },
  { value: "Swift", label: "Swift" },
];

export const vehiclesTypeOptions = [
  { value: "i10", label: "i10" },
  { value: "seltos", label: "seltos" },
];

export const registrationYearOptions = [
  { value: "2012", label: "2012" },
  { value: "2013", label: "2013" },
  { value: "2014", label: "2014" },
  { value: "2015", label: "2015" },
];

export const vehicleColorOptions = [
  { value: "White", label: "White" },
  { value: "Blackgrey", label: "Blackgreyss" },
  { value: "blue", label: "blue" },
];

export const fuelOptions = [
  { value: "Diesel", label: "Diesel" },
  { value: "Petrol", label: "Petrol" },
];

export const customStyles = {
  indicatorSeparator: () => ({ display: "none" }),
  input: (provided) => ({
    ...provided,
    gridTemplateColumns: "0px max-content",
    padding: "0px",
  }),
  control: (base, state) => ({
    ...base,
    background: "#ffffff",
    border: "1px solid #d7d7d7",
    maxWidth: "260px",

    gridTemplateColumns: "0px max-content",
    minHeight: "25px",
    maxHeight: "35px",
    borderColor: state.isFocused ? "#68728480" : "#68728480",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#68728480" : "#68728480",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0000002E" : null,
    borderBottom: "1px solid #F5F5F5",
    maxWidth: "275px",
    // height:"20px",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#0000002E" : "#0000002E",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#464646",
      fontFamily: "Roboto",
      fontSize: "13px",
      fontWeight: "500",
      // opacity: "0.9",
      position: "absolute",
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#323D5A",
    },
    paddingTop: "4px",
    display: "block",
  }),

  // indicatorsContainer: (provided) => ({
  //   ...provided,
  //   padding: "0px",
  //   display: "block",
  // }),

  singleValue: (base, state) => ({
    ...base,
    fontSize: "14px",
    // fontWeight: "500",
    color: state.selectProps.menuIsOpen ? "#9e9e9e" : base.color,
  }),

  menu: (provided) => ({
    ...provided,
    // width: "85%",
    textOverflow: "ellipsis",
    backgroundColor: "#ffffff",
    // width: "max-content",
    maxWidth: "275px",
  }),
};
