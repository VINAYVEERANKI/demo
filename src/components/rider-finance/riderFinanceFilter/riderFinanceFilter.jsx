// import React, { useEffect, useRef, useState } from "react";
// import { useStyles } from "../../mui-styles/mui-styles";
// import { useFormik } from "formik";
// import { Autocomplete, TextField } from "@mui/material";
// import moment from "moment";

// const RiderFinanceFilter = ({
//   filter,
//   search,
//   handleFilterClose,
//   riderFinanceDrpdwn = {},
// }) => {
//   const selectOptions = (key) =>
//     Object.values(riderFinanceDrpdwn[key] || {}).map((item) => ({
//       value: item[key],
//       label: item[key],
//     }));
//   const [error, setError] = useState(false);
//   const initialValues = {
//     rider_id2: search?.rider_id2 ?? "",
//     first_name: search?.first_name ?? "",
//     last_name: search?.last_name ?? "",
//     phone_number: search?.phone_number ?? "",
//   };

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues,
//     onSubmit: (values) => {
//       const hasValues = Object.values(values).some((val) => Boolean(val));
//       if (!hasValues) {
//         setError(true);
//         return;
//       }
//       filter(values);
//       handleFilterClose();
//     },
//   });

//   const clearFilter = () => {
//     formik.resetForm();
//     filter("");
//   };

//   const classes = useStyles();

//   useEffect(() => {
//     if (!error) {
//       filter(formik.values);
//     }
//   }, [formik.values, error, filter]);

//   const RenderSelectField = (name, label, shouldFilterOptions) => (
//     <Autocomplete
//       value={
//         selectOptions(name).find(
//           (option) => option.value === formik.values[name]
//         ) || null
//       }
//       onChange={(event, newValue) => {
//         formik.setFieldValue(name, newValue?.value || "");
//         setError(false);
//       }}
//       clearIcon={null}
//       style={{ width: "15rem" }}
//       className={classes.autocomplete}
//       getOptionLabel={(option) => {
//         const timestamp = moment(option.label);
//         if (timestamp.isValid()) {
//           return timestamp.format("D-M-YYYY,HH:mm");
//         } else {
//           return option.label;
//         }
//       }}
//       options={selectOptions(name)}
//       isOptionEqualToValue={(option, value) => option.value === value.value}
//       filterOptions={
//         shouldFilterOptions === true
//           ? (options, { inputValue }) =>
//               inputValue
//                 ? options.filter((option) =>
//                     option.label
//                       .toLowerCase()
//                       .includes(inputValue.toLowerCase())
//                   )
//                 : [{ label: "" }]
//           : undefined
//       }
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           variant="outlined"
//           error={formik.touched[name] && Boolean(formik.errors[name])}
//           helperText={formik.touched[name] && formik.errors[name]}
//           className="dark_grey_color fw_500 fs_14"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           placeholder={`Enter ${label}`}
//         />
//       )}
//     />
//   );

//   return (
//     // <>
//     //   <div className="table_filter_container border_radius_7px p-3">
//     //     <div className="d-flex add_filter_heading justify-content-between">
//     //       <span className="text-start fs_20 fw_500 primary_color d-flex align-items-center ">
//     //         <i className="ri-filter-3-line primary_color pe-2" /> Add Filter{" "}
//     //       </span>
//     //       <button
//     //         className="border_none background_none"
//     //         onClick={() => handleFilterClose()}
//     //         type="button"
//     //       >
//     //         <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
//     //       </button>
//     //     </div>
//     //     <form onSubmit={formik.handleSubmit}>
//     //       <div className="mt-3 col-lg-6">
//     //         <input
//     //           type="search"
//     //           name="rider_id2"
//     //           placeholder="Search by Rider ID"
//     //           value={formik.values.rider_id2}
//     //           onChange={formik.handleChange}
//     //         />
//     //       </div>
//     //       <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
//     //         -(or)-
//     //       </span>
//     //       <div className="mt-3 col-lg-6">
//     //         <input
//     //           type="search"
//     //           name="phone_number"
//     //           placeholder="Search by Phone Number"
//     //           value={formik.values.phone_number}
//     //           onChange={formik.handleChange}
//     //         />
//     //       </div>
//     //       <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
//     //         -(or)-
//     //       </span>

//     //       <div className="mt-3 d-lg-flex gap-3">
//     //         <input
//     //           type="search"
//     //           name="first_name"
//     //           placeholder="Search by Rider First Name"
//     //           value={formik.values.first_name}
//     //           onChange={formik.handleChange}
//     //         />
//     //         <input
//     //           type="search"
//     //           name="last_name"
//     //           placeholder="Search by Rider Last Name"
//     //           value={formik.values.last_name}
//     //           onChange={formik.handleChange}
//     //         />
//     //       </div>
//     //       {/* <div className="mt-3 col-lg-6">
//     //         {RenderSelectField("rider_id2", "Rider ID", true)}
//     //         <input
//     //           type="search"
//     //           name="src"
//     //           placeholder="Search Products here"
//     //           value={search}
//     //           onChange={(e) => {
//     //             filter(e.target.value);
//     //           }}
//     //         />
//     //       </div>
//     //       <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
//     //         -(or)-
//     //       </span>
//     //       <div className="mt-3 col-lg-6">
//     //         {RenderSelectField("phone_number", "Phone Number", true)}
//     //       </div>
//     //       <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
//     //         -(or)-
//     //       </span>

//     //       <div className="mt-3 d-lg-flex gap-3">
//     //         {RenderSelectField("first_name", "Rider Firstname", true)}
//     //         <div className="my-3 my-lg-0">
//     //           {RenderSelectField("last_name", "Rider Lastname", true)}
//     //         </div>
//     //       </div> */}
//     //       <div className="red_color fs_14 fw_700">
//     //         {error ? "Please fill out at least one field." : ""}
//     //       </div>
//     //       <div className="d-flex justify-content-lg-end gap-3 mt-4 ms-sm-0 ms-2">
//     //         <button
//     //           type="reset"
//     //           className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-sm-3"
//     //           onClick={clearFilter}
//     //         >
//     //           Clear Filter
//     //         </button>
//     //         <button
//     //           type="submit"
//     //           className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-sm-3 px-2"
//     //         >
//     //           Apply Filter
//     //         </button>
//     //       </div>
//     //     </form>
//     //   </div>
//     // </>
//     <>
//       <div className="table_filter_container border_radius_7px p-3">
//         <div className="d-flex add_filter_heading justify-content-between">
//           <span className="text-start fs_20 fw_500 primary_color d-flex align-items-center ">
//             <i className="ri-filter-3-line primary_color pe-2" /> Add Filter{" "}
//           </span>
//           <button
//             className="border_none background_none"
//             onClick={() => handleFilterClose()}
//             type="button"
//           >
//             <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
//           </button>
//         </div>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mt-3 col-lg-6">
//             <input
//               type="search"
//               name="rider_id2"
//               placeholder="Search by Rider ID"
//               value={formik.values.rider_id2}
//               onChange={formik.handleChange}
//               onBlur={formik.handleSubmit}
//             />
//           </div>
//           <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
//             -(or)-
//           </span>
//           <div className="mt-3 col-lg-6">
//             <input
//               type="search"
//               name="phone_number"
//               placeholder="Search by Phone Number"
//               value={formik.values.phone_number}
//               onChange={formik.handleChange}
//               onBlur={formik.handleSubmit}
//             />
//           </div>
//           <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
//             -(or)-
//           </span>

//           <div className="mt-3 d-lg-flex gap-3">
//             <input
//               type="search"
//               name="first_name"
//               placeholder="Search by Rider First Name"
//               value={formik.values.first_name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleSubmit}
//             />
//             <input
//               type="search"
//               name="last_name"
//               placeholder="Search by Rider Last Name"
//               value={formik.values.last_name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleSubmit}
//             />
//           </div>

//           <div className="red_color fs_14 fw_700">
//             {error ? "Please fill out at least one field." : ""}
//           </div>
//           <div className="d-flex justify-content-lg-end gap-3 mt-4 ms-sm-0 ms-2">
//             <button
//               type="reset"
//               className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-sm-3"
//               onClick={clearFilter}
//             >
//               Clear Filter
//             </button>
//             <button
//               type="submit"
//               className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-sm-3 px-2"
//             >
//               Apply Filter
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default RiderFinanceFilter;

import React, { useEffect, useState } from "react";
import { useStyles } from "../../mui-styles/mui-styles";
import { useFormik } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";
import "../../DriverMetrices/DriverViewMetrics.css";

const RiderFinanceFilter = ({
  filter,
  search,
  handleFilterClose,
  riderFinanceDrpdwn = {},
  setSearch,
}) => {
  const selectOptions = (key) =>
    Object.values(riderFinanceDrpdwn[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));

  const [error, setError] = useState(false);
  const [searchFieldsEmpty, setSearchFieldsEmpty] = useState(true);

  const formik = useFormik({
    initialValues: {
      rider_id2: search?.rider_id2 ?? "",
      first_name: search?.first_name ?? "",
      last_name: search?.last_name ?? "",
      phone_number: search?.phone_number ?? "",
    },
    onSubmit: (values) => {
      const hasValues = Object.values(values).some((val) => Boolean(val));
      if (!hasValues) {
        setError(true);
        return;
      }
      filter(values);
      handleFilterClose();
    },
  });

  // const clearFilter = () => {
  //   formik.resetForm();
  //   setError(false);
  //   setSearchFieldsEmpty(true);
  //   filter("");
  // };

  const clearFilter = () => {
    formik.resetForm();
    setError(false);
    setSearchFieldsEmpty(true);
    filter("");

    formik.setFieldValue("rider_id2", "");
    formik.setFieldValue("phone_number", "");
    formik.setFieldValue("first_name", "");
    formik.setFieldValue("last_name", "");
  };

  const classes = useStyles();

  useEffect(() => {
    if (!error) {
      filter(formik.values);
    }
  }, [formik.values, error, filter]);

  const handleSearchFieldFocus = () => {
    setError(false);
  };

  const RenderSelectField = (name, label, shouldFilterOptions) => (
    <Autocomplete
      value={
        selectOptions(name).find(
          (option) => option.value === formik.values[name]
        ) || null
      }
      onChange={(event, newValue) => {
        formik.setFieldValue(name, newValue?.value || "");
        setError(false);
      }}
      clearIcon={null}
      style={{ width: "15rem" }}
      className={classes.autocomplete}
      getOptionLabel={(option) => {
        const timestamp = moment(option.label);
        if (timestamp.isValid()) {
          return timestamp.format("D-M-YYYY,HH:mm");
        } else {
          return option.label;
        }
      }}
      options={selectOptions(name)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      filterOptions={
        shouldFilterOptions === true
          ? (options, { inputValue }) =>
              inputValue
                ? options.filter((option) =>
                    option.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                : [{ label: "" }]
          : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          className="dark_grey_color fw_500 fs_14"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={`Enter ${label}`}
        />
      )}
    />
  );

  return (
    <div className="table_filter_container border_radius_7px p-3">
      <div className="d-flex add_filter_heading justify-content-between">
        <span className="text-start fs_20 fw_500 primary_color d-flex align-items-center ">
          <i className="ri-filter-3-line primary_color pe-2" /> Add Filter{" "}
        </span>
        <button
          className="border_none background_none"
          onClick={() => handleFilterClose()}
          type="button"
        >
          <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-3 col-lg-6">
          {RenderSelectField("rider_id2", "Rider ID")}
          {/* <input
            type="search"
            name="rider_id2"
            placeholder="Search by Rider ID"
            value={formik.values.rider_id2}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit} // Apply filter on blur
            onFocus={handleSearchFieldFocus}
          /> */}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="pt-2 filterfieldfilter mt-3 col-lg-6">
          <label for="inputText" className="mt-2 pt-1 filterfield">
            Phone number
          </label>
          <input
            type="search"
            name="phone_number"
            placeholder="Enter Phone Number"
            style={{ width: "15rem" }}
            className={`ps-3 fs_16 filterfieldsize outline_none`}
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit}
            onFocus={handleSearchFieldFocus}
          />
        </div>

        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>

        <div className="mt-3 d-lg-flex gap-3">
          <div className="pt-2 filterfieldfilter">
            <label for="inputText" className="mt-2 pt-1 filterfield">
              First name
            </label>
            <input
              type="search"
              name="first_name"
              placeholder="Enter Rider First Name"
              style={{ width: "15rem" }}
              className={`ps-3 fs_16 filterfieldsize outline_none`}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleSubmit}
              onFocus={handleSearchFieldFocus}
            />
          </div>
          <div className="pt-2 filterfieldfilter">
            <label for="inputText" className="mt-2 pt-1 filterfield">
              Last name
            </label>
            <input
              type="search"
              name="last_name"
              placeholder="Enter Rider Last Name"
              style={{ width: "15rem" }}
              className={`ps-3 fs_16 filterfieldsize outline_none`}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleSubmit}
              onFocus={handleSearchFieldFocus}
            />
          </div>
        </div>

        <div className="red_color fs_14 fw_700">
          {error && searchFieldsEmpty
            ? "Please fill out at least one field."
            : ""}
        </div>
        <div className="d-flex justify-content-lg-end gap-3 mt-4 ms-sm-0 ms-2">
          <button
            type="reset"
            className="primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-sm-3"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
          <button
            type="submit"
            className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-sm-3 px-2"
          >
            Apply Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiderFinanceFilter;
