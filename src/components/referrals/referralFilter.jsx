import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, TextField } from "@mui/material";
// import "../adminModals.css";
import { useStyles } from "../mui-styles/mui-styles";
import moment from "moment";

const ReferralFilter = ({
  filter,
  handleFilterClose,
  search,
  referralDropDownList,
  type = "",
}) => {
  const selectOptions = (key) =>
    Object.values(referralDropDownList[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));

    const [error, setError] = useState(false);

  const initialValues = {
    referral_id: search?.referral_id ?? "",
    referral_classification: search?.referral_classification ?? "",
    coupon_code: search?.coupon_code ?? "",
    coupon_title: search?.coupon_title ?? "",
    created_at: search?.created_at ?? "",
    created_by: search?.created_by ?? "",
    referral_status: search?.referral_status ?? "",
    campaign_status: search?.campaign_status ?? "",
    approved_by :search?.approved_by ?? "",
    approved_at :search?.approved_at ?? "",
    start_date: search?.start_date ?? "",
    expiry_date: search?.expiry_date ?? "",
    rejected_at: search?.rejected_at ?? "",
    rejected_by: search?.rejected_by ?? "",
    deleted_at: search?.deleted_at ?? "",
    deleted_by: search?.deleted_by ?? "",
    expired_at: search?.expired_at ?? "",
    type: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      const hasValues = Object.values(values).some((val) => Boolean(val));
      if (!hasValues) {
        console.log("Please fill out at least one field.");
        setError(true);
        return;
      }
      filter(values);
      handleFilterClose();
    },
  });

  const clearFilter = () => {
    formik.resetForm();
    filter("");
  };
  const classes = useStyles();

  // const RenderSelectField = (name, label) => (
  //   <Autocomplete
  //     value={
  //       selectOptions(name).find(
  //         (option) => option.value === formik.values[name]
  //       ) || null
  //     }
  //     onChange={(event, newValue) => {
  //       formik.setFieldValue(name, newValue?.value || "");
  //       setValidationErrorMes("");
  //     }}
  //     clearIcon={null}
  //     style={{ width: "15rem" }}
  //     className={classes.autocomplete}
  //     options={selectOptions(name)}
  //     //   getOptionLabel={(option) => option.label}
  //     getOptionLabel={(option) => {
  //       const timestamp = moment(option.label);
  //       if (timestamp.isValid()) {
  //         return timestamp.format("D-M-YYYY,HH:mm");
  //       } else {
  //         return option.label;
  //       }
  //     }}
  //     isOptionEqualToValue={(option, value) => option.value === value.value}
  //     renderInput={(params) => (
  //       <TextField
  //         {...params}
  //         label={label}
  //         variant="outlined"
  //         error={formik.touched[name] && Boolean(formik.errors[name])}
  //         helperText={formik.touched[name] && formik.errors[name]}
  //         className="dark_grey_color fw_500 fs_14"
  //         InputLabelProps={{
  //           shrink: true,
  //         }}
  //         placeholder={`Enter ${label}`}
  //       />
  //     )}
  //   />
  // );

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
        </span>{" "}
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
          {RenderSelectField("referral_id", "Referral ID", true)}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 col-lg-6">
          {RenderSelectField("coupon_code", "Coupon Code", true)}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>
        <div className="mt-3 d-lg-flex gap-3">
          {/* {RenderSelectField("zone_name", "Zone Name")} */}
          {RenderSelectField(
            "referral_classification",
            "Referral Classification"
          )}
          <div className="my-3 my-lg-0">
            {RenderSelectField("coupon_title", "Coupon Title", true)}
          </div>
          <div className="my-3 my-lg-0">
              {RenderSelectField("referral_status", "Referral Status")}
            </div>
          {/* {type === "ReviewRequired" ||
          type === "Active" ||
          type === "SenderHistory" ||
          type === "ReceiverHistory" ? (
            <div className="my-3 my-lg-0">
              {RenderSelectField("referral_status", "Referral Status")}
            </div>
          ) : (
            <></>
          )} */}
        </div>
        <div className="mt-3 d-lg-flex gap-3">
          {type === "ReviewRequired" ? (
            <>
              {RenderSelectField("campaign_status", "Campaign Status")}
              {/* <div className="my-3 my-lg-0">
                {RenderSelectField("created_by", "Created_by")}
              </div>
              <div className="my-3 my-lg-0">
                {RenderSelectField("created_at", "Created_at")}
              </div> */}
            </>
          ) : type === "Active" ? (
            <>
              {RenderSelectField("campaign_status", "Campaign Status")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("approved_at", "Approved At", true)}
              </div>
              <div className="my-3 my-lg-0">
                {RenderSelectField("approved_by", "Approved By")}
              </div>
            </>
          ) : type === "Rejected" ? (
            <>
              {RenderSelectField("rejected_at", "Rejected at", true)}
              <div className="my-3 my-lg-0">
                {RenderSelectField("rejected_by", "Rejected by")}
              </div>
            </>
          ) : type === "Deleted" ? (
            <>
              {RenderSelectField("deleted_at", "Deleted at", true)}
              <div className="my-3 my-lg-0">
                {RenderSelectField("deleted_by", "Deleted by")}
              </div>
            </>
          ) : type === "Expired" ? (
            <>{RenderSelectField("expired_at", "Expired At", true)}</>
          ) : type === "SenderHistory" || type === "ReceiverHistory" ? (
            <>
              {" "}
              {RenderSelectField("coupon_type", "Coupon Type")}{" "}
              <div className="my-3 my-lg-0">
                {RenderSelectField("created_by", "Created By")}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="red_color fs_14 fw_700">
          {error ? "Please fill out at least one field." : ""}
        </div>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="reset"
            className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-3"
            onClick={clearFilter}
          >
            Clear Filter
          </button>
          <button
            type="submit"
            className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-3"
          >
            Apply Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralFilter;
