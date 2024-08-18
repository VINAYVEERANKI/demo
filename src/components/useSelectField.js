import { useRef } from "react";

export const useSelectField = (name, label) => {
  const inputLabelRef = useRef(null);

  const handleFocus = () => {
    if (inputLabelRef.current) {
      inputLabelRef.current.classList.add("Mui-focused");
      inputLabelRef.current.classList.add("Mui-shrink");
    }
  };

  return {
    inputLabelRef,
    handleFocus,
  };
}