import React from "react";

const CustomDatePicker = ({ name, value, onChange }) => {
  return (
    <div className="input-group">
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
      />
   
    </div>
  );
};

export default CustomDatePicker;
