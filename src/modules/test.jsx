// import { useFormik } from 'formik';
// import React, { useState } from 'react';
// import * as Yup from "yup";
// const Test = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [inputTouched, setInputTouched] = useState(false);

//   const [inputCount, setInputCount] = useState(0);

//   const formik = useFormik({
//     initialValues: {
//       inputFields: [''],
//     },
//     validationSchema: Yup.object().shape({
//       inputFields: Yup.array()
//         .of(Yup.string().required('Input is required'))
//         .required('At least one input is required'),
//     }),
//     onSubmit: (values) => {
//       console.log(values, 'formikvalues');
//     },
//   });

//   const handleAddField = () => {
//     const lastInputValue = formik.values.inputFields[formik.values.inputFields.length - 1];
//     if (lastInputValue.trim() !== '') {
//       formik.setFieldValue('inputFields', [...formik.values.inputFields, '']);
//     }
//   };

//   const handleDeleteField = (index) => {
//     const updatedFields = [...formik.values.inputFields];
//     updatedFields.splice(index, 1);
//     formik.setFieldValue('inputFields', updatedFields);
//   };

//   return (
//   <>
//  <form onSubmit={formik.handleSubmit}>
//        <div className=''>
//        {formik.values.inputFields.map((field, index) => (
//           <div className='mt-3 d-flex' key={index}>
//             <input
//               type='text'
//               name={`inputFields[${index}]`} // Use array syntax to link the input fields to formik
//               value={field}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className={
//                 formik.touched.inputFields && formik.touched.inputFields[index] && formik.errors.inputFields?.[index]
//                   ? 'error_color'
//                   : ''
//               }
//             />
//             {formik.touched.inputFields?.[index] && formik.errors.inputFields?.[index] && (
//               <div className='error-message'>{formik.errors.inputFields[index]}</div>
//             )}
//             {index > 0 && (
//               <button type='button' onClick={() => handleDeleteField(index)}>
//                 Delete
//               </button>
//             )}
//           </div>
//         ))}
//         </div>
//         <button type='button' onClick={handleAddField}>
//           Add
//         </button>

//         {/* <button type='submit'>Submit</button> */}
//       </form>
//   </>
//   );
// };

// export default Test;

import React, { useEffect, useState } from "react";

const Test = () => {
  const [currencyData, setCurrencyData] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    // Fetch currency data from an API
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((response) => response.json())
      .then((data) => setCurrencyData(data))
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  console.log(currencyData, "sjkfbaskda");


  const newArray = Object.keys(currencyData)?.map((currencyCode) => ({
    label : currencyCode,
    value : currencyData[currencyCode]
  }))


  console.log(newArray, "sjkfbaskda");
  

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const array = [
    {
      label: "INE (asdasdad)",
      value: "eee",
    },
    {
      label: "INR (asdasdad)",
      value: "wwi",
    },
    {
      label: "AMR (asdasdad)",
      value: "aaa",
    },
    {
      label: "PAK (asdasdad)",
      value: "ppp",
    },
  ];

  const functionName = (value) => {
    const filterName = array.find((item) => item.label.startsWith(value));
    return filterName ? filterName?.value : "";
  };

  console.log(functionName("INR"), "kjsdhasdas");

  return (
    <div>
      <span>INDIA</span>
      <span>{functionName("PAK")}</span>

      <div className="mt-5">
        <select onChange={handleCurrencyChange}>
          {Object.keys(currencyData).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              ({currencyCode}) {currencyData[currencyCode]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Test;
