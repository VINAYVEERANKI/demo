export const reactSelectBasicInformation = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#a0acc3" : "#e6e6e6",
    border: "2px solid #e6e6e6",

    minHeight: "32px",
    maxHeight: "32px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#a0acc3" : "#e6e6e6",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#d9d9d9",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "10px",
  }),
};
export const reactSelectBasicInformationError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#dc3546a9" : "#dc3546a9",
    border: "2px solid #dc3546a9",

    minHeight: "32px",
    maxHeight: "32px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#dc3546a9" : "#dc3546a9",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#d9d9d9",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "10px",
  }),
};

export const reactSelectAddLocalResponser = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    border: "1px solid #0F203C",
    color: "red",
    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    color: state.isDisabled ? "#0F203C" : "#0F203C",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: "-5px",
    // paddingBottom: "10px",
  }),
};
export const reactSelectAddLocalResponserError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#dc3546a9" : "#dc3546a9",
    border: "2px solid #dc3546a9",

    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#dc3546a9" : "#dc3546a9",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#d9d9d9",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: "-5px",
    // paddingBottom: "10px",
  }),
};

export const reactSelectCountryCode = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "5rem",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    border: "1px solid #0F203C",
    color: "red",
    minHeight: "28px",
    maxHeight: "28px",
    marginTop: "8px",

    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    color: state.isDisabled ? "#0F203C" : "#0F203C",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: "-5px",
    // paddingBottom: "10px",
  }),
};
export const reactSelectCountryCodeError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "5rem",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#dc3546a9" : "#dc3546a9",
    border: "2px solid #dc3546a9",

    minHeight: "28px",
    maxHeight: "28px",
    marginTop: "8px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#dc3546a9" : "#dc3546a9",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#d9d9d9",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: "-5px",
    // paddingBottom: "10px",
  }),
};

export const reactSelectConatactDetailsSOS = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "10rem",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    border: "1px solid #0F203C",
    color: "red",
    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "10px",
  }),
};

export const reactSelectCoupon = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0f203c" : "#0f203c",
    // border: "2px solid #e6e6e6",

    // minHeight: "32px",
    // maxHeight: "32px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0f203c" : "#0f203c",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#d9d9d9",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-15px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
};
export const reactSelectCouponError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#e61212" : "#e61212",
    // border: "2px solid #e61212",

    // minHeight: "32px",
    // maxHeight: "32px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#e61212" : "#e61212",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#d9d9d9",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-15px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
};

export const reactSelectCouponDisabled = {
  control: (base, state) => ({
    ...base,
    background: "#f1f1f1",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#9e9e9e" : "#9e9e9e",
    // border: "2px solid #9e9e9e",
    // minHeight: "34px",
    // maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#9e9e9e" : "#9e9e9e",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "14px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#68728480",
      position: "absolute",
      marginTop: "-15px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "10px",
  }),
};

export const reactSelectUsageLimit = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    // border: "2px solid #0F203C",

    minHeight: "34px",
    maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),

  multiValueLabel: (styles, { data }) => ({
    ...styles,
    display: "inline-block",
    backgroundColor: "#68728480",
    fontSize: "12px",
    color: "##7082A6",
    // fontWeight: "bold",
    borderRadius: "4px",
    padding: "2px 2px",
  }),
};
export const reactSelectDisabled = {
  control: (base, state) => ({
    ...base,
    background: "#F1F1F1",
    // match with the menu
    borderRadius: "3px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    // border: "2px solid #0F203C",

    minHeight: "34px",
    maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),
};
export const reactSelectUsageLimitError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#e61212" : "#e61212",
    // border: "2px solid #e61212",
    minHeight: "34px",
    maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#e61212" : "#e61212",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),
};
export const reactSelectUsageLimitDisabled = {
  control: (base, state) => ({
    ...base,
    background: "#f1f1f1",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#9e9e9e" : "#9e9e9e",
    // border: "2px solid #9e9e9e",
    minHeight: "34px",
    maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#9e9e9e" : "#9e9e9e",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#68728480",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),
};

export const reactMultiSelectUsageLimitError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#e61212" : "#e61212",
    // border: "2px solid #e61212",
    minHeight: "34px",
    // maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#e61212" : "#e61212",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),
};

export const reactMultiSelectUsageLimit = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    // border: "2px solid #0F203C",

    minHeight: "34px",
    // maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),

  multiValueLabel: (styles, { data }) => ({
    ...styles,
    display: "inline-block",
    backgroundColor: "#68728480",
    fontSize: "12px",
    color: "##7082A6",
    // fontWeight: "bold",
    borderRadius: "4px",
    padding: "2px 2px",
  }),
};
export const reactMultiSelectDriver = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#68728480" : "#68728480",
    // border: "2px solid #0F203C",

    minHeight: "30px",
    // maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#68728480" : "#68728480",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    // paddingBottom: "6px",
  }),

  multiValueLabel: (styles, { data }) => ({
    ...styles,
    display: "inline-block",
    backgroundColor: "#68728480",
    fontSize: "12px",
    color: "##7082A6",
    // fontWeight: "bold",
    borderRadius: "4px",
    // padding: "2px 2px",
  }),
};

export const reactMultiSelectUsageLimitDisabled = {
  control: (base, state) => ({
    ...base,
    background: "#f1f1f1",
    // match with the menu
    borderRadius: "5px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#9e9e9e" : "#9e9e9e",
    // border: "2px solid #9e9e9e",
    minHeight: "34px",
    // maxHeight: "34px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#9e9e9e" : "#9e9e9e",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#68728480",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // top: "7%",
    position: "absolute",
    fontSize: "16px",
    paddingBottom: "6px",
  }),
};

// driver deatils
export const reactSelectDriverDetails = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "3px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#68728480" : "#68728480",
    // border: "2px solid #0F203C",
    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#68728480" : "#68728480",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#68728480" : null,
    borderBottom: "1px solid #68728480",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    position: "absolute",
    fontSize: "14px",
    paddingBottom: "10px",
    color: "#0F203C",
    // marginLeft:"-2px"
    fontWeight: "500",
  }),
};
export const reactSelectVehicleDetails = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "3px",
    width: "100%",
    minWidth: "120px",
    maxWidth: "fit-cotent",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#68728480" : "#68728480",
    // border: "2px solid #0F203C",
    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#68728480" : "#68728480",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#68728480" : null,
    borderBottom: "1px solid #68728480",
    fontFamily: "Roboto",

    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
      // paddingBottom: "5px",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    position: "absolute",
    fontSize: "14px",
    paddingBottom: "7px",
    color: "#0F203C",
    // marginLeft:"-2px"
  }),
};

export const reactSelectDriverDetailsError = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "3px",
    width: "100%",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "#e61212" : "#e61212",
    // border: "2px solid #e61212",
    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#e61212" : "#e61212",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: "1px solid #F5F5F5",
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#55555",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    position: "absolute",
    fontSize: "14px",
    paddingBottom: "10px",
    color: "#0F203C",
    fontWeight: "500",
    fontWeight: "500",
    // marginLeft:"-2px"
  }),
};

export const reactSelectDriverDetailsDisabled = {
  control: (base, state) => ({
    ...base,
    background: "#FFFF",
    // match with the menu
    borderRadius: "3px",
    width: "100%",
    // Overwrittes the different states of border
    // borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    // border: "2px solid #0F203C",
    border: "none",
    minHeight: "30px",
    maxHeight: "30px",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#0F203C" : "#0F203C",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#7082A6" : null,
    borderBottom: null,
    fontFamily: "Roboto",
    // "&:hover": {
    //   backgroundColor: state.isFocused ? "#A0ACC3" : "##7082A6",
    // },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#68728480",
      fontFamily: "Roboto",
      fontSize: "12px",
      textAlign: "center",
      position: "absolute",
    };
  },

  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "#FFFF",
      position: "absolute",
      marginTop: "-20px",
      marginLeft: "-25px",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    position: "absolute",
    fontSize: "14px",
    paddingBottom: "10px",
    color: "#0F203C",
    fontWeight: "500",
    fontWeight: "500",
    // marginLeft: "-2px",
  }),
};
