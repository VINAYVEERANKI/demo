import React, { useEffect, useState } from "react";
import "../../components/manage-fares/default-fares/tables/tables.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex } from "../helper";
import LocalTripUpdatePassword from "./localTripUpdatePassword";

const PackageInputForm = ({
  faresData = [],
  disableTable,
  mainType = "",
  reload,
  setReload,
  editingStatus,
  setEditingStatus,
  tableType,
  is_pricing_heading = true,
  module_heading = "",
}) => {
  const [changesUpdateshow, setchangesUpdateShow] = useState(false);
  const handlChangesUpdateShow = () => setchangesUpdateShow(true);
  const handleChangeUpdateClose = () => {
    setchangesUpdateShow(false);
  };
  const [editable, setEditable] = useState(false);
  const [firstObject, setFirstObject] = useState(faresData[0]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      min_package_distance: firstObject?.min_package_distance ?? "",
      min_package_time: firstObject?.min_package_time ?? "",
    },
    validationSchema: Yup.object({
      min_package_distance: Yup.string()
        .matches(numRegex, "Invalid value")
        .required("Enter value"),
      min_package_time: Yup.string()
        .matches(numRegex, "Invalid value")
        .required("Enter value"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (JSON.stringify(formik.initialValues) !== JSON.stringify(values)) {
        handlChangesUpdateShow();
      }
    },
  });

  console.log(formik?.errors, "khj");

  return (
    <>
      <LocalTripUpdatePassword
        changesUpdateshow={changesUpdateshow}
        handleChangeUpdateClose={handleChangeUpdateClose}
        formik={formik}
        item={firstObject}
        mainType={mainType}
        reload={reload}
        setReload={setReload}
        setEditingStatus={setEditingStatus}
        tableType={tableType}
      />{" "}
      <div className="mx-2 col-sm-7 col-md-7 col-lg-7 col-xl-4 mt-4">
        {is_pricing_heading ? (
          <div className="primary_color fs_20 fw_500">{module_heading}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          {faresData?.map((item, index) => (
            <React.Fragment key={index}>
              {index === 0 && (
                <>
                  <div className="d-flex mt-2">
                    <div className="col-8">
                      <span className="primary_color fs_16 fw_500">
                        Min Package Distance (Kms){" "}
                      </span>
                    </div>
                    <div className="col-4 text-end">
                      <input
                        className={
                          formik?.errors?.min_package_distance &&
                          formik?.touched?.min_package_distance
                            ? "price_input_error text-center w-50"
                            : `text-center primary_color fs_16 fw_500 w-50 ${
                                editable
                                  ? "ridetype_input"
                                  : "ridetype_input_disabled"
                              }`
                        }
                        placeholder="-"
                        value={formik?.values?.min_package_distance}
                        name="min_package_distance"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        disabled={!editable}
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="col-8">
                      <span className="primary_color fs_16 fw_500">
                        {" "}
                        Min Package Time (Hrs)
                      </span>
                    </div>
                    <div className="col-4 text-end">
                      <input
                        className={
                          formik?.errors?.min_package_time &&
                          formik?.touched?.min_package_time
                            ? "price_input_error text-center w-50"
                            : `text-center primary_color w-50 fs_16 fw_500 ${
                                editable
                                  ? "ridetype_input"
                                  : "ridetype_input_disabled"
                              }`
                        }
                        placeholder="-"
                        value={formik?.values?.min_package_time}
                        name="min_package_time"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        disabled={!editable}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <div className="ps-5">
                      {editingStatus[tableType] &&
                      editingStatus[tableType][
                        item?.package_time ?? item.ride_type
                      ] ? (
                        <div className="d-flex gap-4">
                          <button
                            type="submit"
                            className="fs_14 save_Btn border_radius dark_green_bg  white_color px-3 border_none"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStatus((prevState) => ({
                                ...prevState,
                                [tableType]: {
                                  ...prevState[tableType],
                                  [item?.package_time ?? item.ride_type]: false,
                                },
                              }));
                              formik.resetForm();
                              setEditable(false);
                            }}
                            className="fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={
                            disableTable ||
                            (editingStatus[tableType] &&
                              Object.values(editingStatus[tableType]).some(
                                (value) => value === true
                              ))
                              ? "px-3 edit_btn light_grey_bg fs_14 border_radius_3px  fw_700 border_none"
                              : "px-3 edit_btn primary_bg  white_color fs_14 border_radius_3px border_none"
                          }
                          onClick={() => {
                            setEditingStatus((prevState) => ({
                              ...prevState,
                              [tableType]: {
                                ...prevState[tableType],
                                [item?.package_time ?? item.ride_type]: true,
                              },
                            }));
                            setEditable(true);
                          }}
                          disabled={
                            disableTable ||
                            (editingStatus[tableType] &&
                              Object.values(editingStatus[tableType]).some(
                                (value) => value === true
                              ))
                          }
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </form>
      </div>
    </>
  );
};

export default PackageInputForm;
