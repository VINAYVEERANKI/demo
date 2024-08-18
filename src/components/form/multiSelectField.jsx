import React from "react";
import Select, { components } from "react-select";
import DropDownIcon from "../../assets/icons/dropdown-icon";
import {
  reactMultiSelectDriver,
  reactMultiSelectUsageLimit,
  reactMultiSelectUsageLimitDisabled,
  reactMultiSelectUsageLimitError,
} from "../mui-styles/react-styles";

const MultiSelectField = ({
  placeholder,
  options = {},
  itemName,
  formikValue,
  formik,
  formikError,
  formikTouched,
  labelName,
  isDisabled = false,
  label_fontSize = "fs_14",
  hideOption,
  label = true,
  loading = false,
  onSelect,
  driver = false,
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
              : `${label_fontSize} primary_color`
          }
        >
          {labelName}
        </label>
      )}
      <Select
        isMulti
        getOptionLabel={hideOption}
        instanceId={itemName}
        id={itemName}
        isLoading={loading}
        options={options}
        value={options.filter((option) => formikValue?.includes(option.value))}
        onChange={(selectedOption) => {
          formik.setFieldValue(
            itemName,
            selectedOption?.map((item) => item.value)
          );
          if (onSelect) {
            const selectedLabels = selectedOption?.map((item) => item.label);
            onSelect(selectedLabels);
          }
        }}
        onBlur={formik.handleBlur}
        isDisabled={isDisabled}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        styles={
          formikError && formikTouched
            ? reactMultiSelectUsageLimitError
            : isDisabled === false
              ? driver ? reactMultiSelectDriver : reactMultiSelectUsageLimit
              : reactMultiSelectUsageLimitDisabled
        }
        placeholder={placeholder}
      />
    </>
  );
};
export default MultiSelectField;
