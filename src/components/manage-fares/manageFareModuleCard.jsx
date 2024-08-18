import React, { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { roundTripstyles } from "../mui-styles/mui-styles";
import LocalTripUpdatePassword from "./localTripUpdatePassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex } from "../helper";

const ManageFareModuleCard = ({
  is_editable,
  localPriceModule1,
  mainType,
  tableType,
  reload,
  setReload,
  mainZoneId,
  subZoneId,
  editingStatus,
  setEditingStatus,
  disableTable,
}) => {
  const [edit, setEdit] = useState(false);
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => setchangeUpdatePasswordshow(true);
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      mainType === "LocalManageFare"
        ? {
            priceModule: localPriceModule1?.active_pricing_module ?? "",
          }
        : mainType === "OneWayManageFare" || mainType === "RoundTripManageFare"
        ? {
            priceModule: localPriceModule1?.active_pricing_module ?? "",
            min_package_distance: localPriceModule1?.min_package_distance ?? "",
            min_package_time: localPriceModule1?.min_package_time ?? "",
          }
        : "",
    validationSchema:
      mainType === "LocalManageFare"
        ? Yup.object({
            priceModule: Yup.string(),
          })
        : mainType === "OneWayManageFare" || mainType === "RoundTripManageFare"
        ? Yup.object({
            priceModule: Yup.string(),
            min_package_distance: Yup.string()
              .matches(numRegex, "Invalid value")
              .trim()
              .required("Enter value"),
            min_package_time: Yup.string()
              .matches(numRegex, "Invalid value")
              .trim()
              .required("Enter value"),
          })
        : "",
    onSubmit: (values, { resetForm }) => {
      // setEditing("PricingModuleUpdate");
      // if (
      //   JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
      // ) {
      handlChangesUpdateShow();
      // }
    },
  });

  const [saveDisable, setSaveDisable] = useState(false);

  useEffect(() => {
    const initialValues = { ...formik.initialValues };
    const values = { ...formik.values };

    initialValues.min_package_distance =
      initialValues?.min_package_distance?.toString();

    values.min_package_distance = values?.min_package_distance?.toString();

    if (JSON.stringify(initialValues) !== JSON.stringify(values)) {
      setSaveDisable(false);
    } else {
      setSaveDisable(true);
    }
  }, [formik.values]);

  console.log(localPriceModule1, "asdasdfdghgfh");

  return (
    <>
      <LocalTripUpdatePassword
        changesUpdateshow={changeUpdatePasswordshow}
        handleChangeUpdateClose={handleChangeUpdatePasswordClose}
        formik={formik}
        mainType={mainType}
        tableType={tableType}
        reload={reload}
        setReload={setReload}
        mainZoneId={mainZoneId}
        subZoneId={subZoneId}
        item={localPriceModule1}
        setEditingStatus={setEditingStatus}
      />
      <div className="card local_pricing_module_card mt-3">
        <div className="card-body  mt-3">
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column ">
              {mainType === "LocalManageFare" ||
              mainType === "OneWayManageFare" ? (
                <div className="row">
                  <div className="col-6">
                    <span className="fs_16 primary_color fw_500 text-nowrap">
                      Pricing Module
                    </span>
                  </div>

                  <div className="col-md-6">
                    <TextField
                      size="small"
                      sx={roundTripstyles.select}
                      variant="outlined"
                      aria-label="Default select example"
                      className="oneWay_manage_zone_input ms-md-4 mt-md-0 mt-1 background_none"
                      name="priceModule"
                      value={formik.values.priceModule}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      label=" "
                      InputLabelProps={{ shrink: false }}
                      select
                      disabled={edit === false}
                    >
                      <MenuItem value="PriceModule1">Module 1</MenuItem>
                      <MenuItem value="PriceModule2">Module 2</MenuItem>
                    </TextField>
                  </div>
                </div>
              ) : null}

              {(mainType === "OneWayManageFare" ||
                mainType === "RoundTripManageFare") && (
                <>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <span className="fs_16 primary_color fw_500 text-nowrap">
                        Min Package Distance (Kms)
                      </span>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className={
                          formik.errors.min_package_distance &&
                          formik.touched.min_package_distance
                            ? `oneWay_manage_zone_input_error ms-md-4 mt-md-0 mt-1 py-1 background_none outline_none text-end pe-2 fs_16 primary_color fw_500`
                            : `oneWay_manage_zone_input ms-md-4 mt-md-0 mt-1  py-1 background_none outline_none text-end pe-2 fs_16 primary_color fw_500`
                        }
                        placeholder="-"
                        name="min_package_distance"
                        value={formik.values.min_package_distance}
                        onChange={formik.handleChange}
                        disabled={edit === false}
                      />

                      <div
                        className={`login_form_error_container text-md-end mb-1`}
                      >
                        {formik.errors.min_package_distance &&
                          formik.touched.min_package_distance && (
                            <span
                              className="text-danger fw_500  error_color_bg border_radius_3px px-1  ms-md-4 mt-md-0 mt-1 "
                              style={{ fontSize: "12px" }}
                            >
                              {formik.errors.min_package_distance}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <span className="fs_16 primary_color fw_500 text-nowrap">
                        Min Package Time (Hrs)
                      </span>
                    </div>

                    <div className="col-md-6 ">
                      <input
                        type="text"
                        className={
                          formik.errors.min_package_time &&
                          formik.touched.min_package_time
                            ? `oneWay_manage_zone_input_error ms-md-4 mt-md-0 mt-1 py-1 background_none outline_none text-end pe-2 fs_16 primary_color fw_500`
                            : `oneWay_manage_zone_input ms-md-4 mt-md-0 mt-1 py-1 background_none outline_none text-end pe-2 fs_16 primary_color fw_500`
                        }
                        placeholder="-"
                        name="min_package_time"
                        value={formik.values.min_package_time}
                        onChange={formik.handleChange}
                        disabled={edit === false}
                      />

                      <div
                        className={`login_form_error_container text-md-end mb-1`}
                      >
                        {formik.errors.min_package_time &&
                          formik.touched.min_package_time && (
                            <span
                              className="text-danger fw_500  error_color_bg border_radius_3px px-1  ms-md-4 mt-md-0 mt-1"
                              style={{ fontSize: "12px" }}
                            >
                              {formik.errors.min_package_time}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {is_editable &&
              (mainType === "LocalManageFare"
                ? localPriceModule1?.manage_fares?.[0]?.documentation_availablity &&
                  localPriceModule1?.manage_fares?.[0]?.eligible_booking_type
                : localPriceModule1?.documentation_availablity &&
                  localPriceModule1?.eligible_booking_type) ? (
                <div className="d-flex justify-content-end  mt-3">
                  {edit ? (
                    <div>
                      <button
                        onClick={() => {
                          setEditingStatus((prevState) => ({
                            ...prevState,
                            [tableType]: {
                              ...prevState[tableType],
                              [localPriceModule1?.ride_type]: false,
                            },
                          }));
                          formik.resetForm();
                          setEdit(false);
                        }}
                        type="button"
                        className="ms-3 fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2"
                      >
                        Cancel
                      </button>

                      <button
                        className={
                          saveDisable
                            ? `ms-3 fs_14 save_Btn border_radius disabled_color_bg white_color px-3 border_none`
                            : `ms-3 fs_14 save_Btn border_radius dark_green_bg  white_color px-3 border_none`
                        }
                        type="submit"
                        disabled={saveDisable}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingStatus((prevState) => ({
                          ...prevState,
                          [tableType]: {
                            ...prevState[tableType],
                            [localPriceModule1?.ride_type]: true,
                          },
                        }));
                        setEdit(true);
                      }}
                      disabled={
                        disableTable ||
                        (editingStatus[tableType] &&
                          Object.values(editingStatus[tableType]).some(
                            (value) => value === true
                          ))
                      }
                      className={
                        disableTable ||
                        (editingStatus[tableType] &&
                          Object.values(editingStatus[tableType]).some(
                            (value) => value === true
                          ))
                          ? "px-3 edit_btn light_grey_bg fs_14 border_radius_3px  fw_700 border_none"
                          : "px-3 edit_btn primary_bg  white_color fs_14 border_radius_3px border_none"
                      }
                    >
                      Edit
                    </button>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageFareModuleCard;
