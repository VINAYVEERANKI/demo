// import React from "react";
// import { useState } from "react";
// import "./floatingLabelInput.css";

// const FloatingLabelInput = ({label,name}) => {
//   const [value, setValue] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   const handleInputChange = (event) => {
//     setValue(event.target.value);
//   };

//   const handleInputFocus = () => {
//     setIsActive(true);
//   };

//   const handleInputBlur = () => {
//     if (value === "") {
//       setIsActive(false);
//     }
//   };

//   return (
//     <div className={`input-container ${isActive ? "active" : ""}`}>
//       <input
//         type="text"
//         id={name}
//         name={name}
//         value={value}
//         onChange={handleInputChange}
//         onFocus={handleInputFocus}
//         onBlur={handleInputBlur}
//       />
//       <label htmlFor={name}>{label}</label>
//     </div>
//   );
// };

// export default FloatingLabelInput;
