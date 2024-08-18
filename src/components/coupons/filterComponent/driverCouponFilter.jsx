import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete, TextField } from "@mui/material";
// import "../adminModals.css";
import { useStyles } from "../../mui-styles/mui-styles";
import moment from "moment";

const DriverCouponFilter = ({
  filter,
  handleFilterClose,
  search,
  driverCouponDropDownList,
  type = "",
}) => {
  const selectOptions = (key) =>
    Object.values(driverCouponDropDownList[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));

  const initialValues = {
    coupon_id: search?.coupon_id ?? "",
    zone_name: search?.zone_name ?? "",
    coupon_classification: search?.coupon_classification ?? "",
    coupon_classification_details: search?.coupon_classification_details ?? "",
    coupon_code: search?.coupon_code ?? "",
    coupon_title: search?.coupon_title ?? "",
    created_at: search?.created_at ?? "",
    created_by: search?.created_by ?? "",
    coupon_status: search?.coupon_status ?? "",
    campaign_status: search?.campaign_status ?? "",
    start_date: search?.start_date ?? "",
    expiry_date: search?.expiry_date ?? "",
    rejected_at: search?.rejected_at ?? "",
    rejected_by: search?.rejected_by ?? "",
    deleted_at: search?.deleted_at ?? "",
    deleted_by: search?.deleted_by ?? "",
    expired_at: search?.expired_at ?? "",
    coupon_type: search?.coupon_type ?? "",
    type: "",
  };

  const validationSchema = Yup.object({
    coupon_id: Yup.string(""),
    coupon_classification: Yup.string(""),
    coupon_classification_details: Yup.string(""),
    coupon_code: Yup.string(""),
    coupon_title: Yup.string(""),
    coupon_status: Yup.string(""),
    created_at: Yup.string(""),
    created_by: Yup.string(""),
    campaign_status: Yup.string(""),
    start_date: Yup.string(""),
    expiry_date: Yup.string(""),
    rejected_at: Yup.string(""),
    rejected_by: Yup.string(""),
    type: Yup.string(""),
    atleastOneIsRequired: Yup.string().when(
      [
        "coupon_id",
        "coupon_classification",
        "coupon_classification_details",
        "coupon_code",
        "coupon_title",
        "created_at",
        "created_by",
        "coupon_status",
        "campaign_status",
        "start_date",
        "rejected_at",
        "rejected_by",
        "expiry_date",
        "type",
      ],
      {
        is: (
          coupon_id,
          coupon_classification,
          coupon_classification_details,
          coupon_code,
          coupon_title,
          created_at,
          created_by,
          coupon_status,
          campaign_status,
          start_date,
          rejected_at,
          rejected_by,
          expiry_date,
          type
        ) =>
          !coupon_id &&
          !coupon_classification &&
          !coupon_classification_details &&
          !coupon_code &&
          !coupon_title &&
          !(type === "ReviewRequired" && !created_at) &&
          !(type === "ReviewRequired" && !created_by) &&
          !coupon_status &&
          !campaign_status &&
          //   !(type === "blockedAdminList" && !campaign_status) &&
          !(type === "Active" && !start_date) &&
          !(type === "Active" && !expiry_date) &&
          !(type === "Rejected" && !rejected_at) &&
          !(type === "Rejected" && !rejected_by),
        then: Yup.string().required(
          "Please fill at least one of the fields to proceed"
        ),
        otherwise: Yup.string(),
      }
    ),
  });

  const [validationErrorMes, setValidationErrorMes] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      const hasValues = Object.values(values).some((val) => Boolean(val));
      if (!hasValues) {
        console.log("Please fill out at least one field.");
        setValidationErrorMes("Please fill out at least one field.");
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

  console.log(formik.values);

  const classes = useStyles();

  const RenderSelectField = (name, label) => (
    <Autocomplete
      value={
        selectOptions(name).find(
          (option) => option.value === formik.values[name]
        ) || null
      }
      onChange={(event, newValue) => {
        formik.setFieldValue(name, newValue?.value || "");
        setValidationErrorMes("");
      }}
      clearIcon={null}
      style={{ width: "15rem" }}
      className={classes.autocomplete}
      options={selectOptions(name)}
      //   getOptionLabel={(option) => option.label}
      getOptionLabel={(option) => {
        const timestamp = moment(option.label);
        if (timestamp.isValid()) {
          return timestamp.format("D-M-YYYY,HH:mm");
        } else {
          return option.label;
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
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
          {RenderSelectField("coupon_id", "Coupon ID")}
        </div>
        <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
          -(or)-
        </span>

        <div className="mt-3 d-lg-flex gap-3">
          {RenderSelectField("coupon_classification", "Coupon Classification")}
          <div className="my-3 my-lg-0">
            {RenderSelectField("coupon_type", "Coupon Type")}
          </div>
          {type === "ReviewRequired" ||
            type === "Active" ||
            type === "CouponUsageHistory" ? (
            <div className="my-3 my-lg-0">
              {RenderSelectField("coupon_status", "Coupon Status")}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-3 d-lg-flex gap-3">
          {type === "ReviewRequired" ? (
            <>
              {RenderSelectField("campaign_status", "Campaign Status")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("created_by", "Created_by")}
              </div>
              <div className="my-3 my-lg-0">
                {RenderSelectField("created_at", "Created_at")}
              </div>
            </>
          ) : type === "Active" ? (
            <>
              {RenderSelectField("campaign_status", "Campaign Status")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("start_date", "Start Date")}
              </div>
              <div className="my-3 my-lg-0">
                {RenderSelectField("expiry_date", "Expirt Date")}
              </div>
            </>
          ) : type === "Rejected" ? (
            <>
              {RenderSelectField("rejected_at", "Rejected at")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("rejected_by", "Rejected by")}
              </div>
            </>
          ) : type === "Deleted" ? (
            <>
              {RenderSelectField("deleted_at", "Deleted at")}
              <div className="my-3 my-lg-0">
                {RenderSelectField("deleted_by", "Delete by")}
              </div>
            </>
          ) : type === "Expired" ? (
            <>{RenderSelectField("expired_at", "Expired At")}</>
          ) : (
            <></>
          )}
        </div>

        <div className="red_color fs_14 fw_700">
          {formik.errors.atleastOneIsRequired || validationErrorMes}
        </div>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="reset"
            className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-3"
            onClick={() => {
              clearFilter();
              setValidationErrorMes("");
            }}
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
export default DriverCouponFilter;
