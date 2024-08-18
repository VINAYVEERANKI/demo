import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex, wholeNumRegex } from "../helper";
import { useState } from "react";
import LocalTripUpdatePassword from "./localTripUpdatePassword";

const FaresInputForm = ({
  item = {},
  disableItems = [],
  keyOrder = [],
  disableTable = false,
  mainType = "",
  reload,
  setReload,
  editingStatus = {},
  setEditingStatus,
  tableType = "",
  subZoneId,
  mainZoneId,
  manageZareEdit,
  is_editable,
}) => {
  const [changesUpdateshow, setchangesUpdateShow] = useState(false);
  const handlChangesUpdateShow = () => setchangesUpdateShow(true);
  const handleChangeUpdateClose = () => {
    setchangesUpdateShow(false);
  };

  // const validationSchema = Yup.object().shape(
  //   Object.fromEntries(
  //     Object.entries(item?.fares_details ?? {})
  //       .filter(([key]) => !disableItems.includes(key))
  //       .map(([key, value]) => [
  //         key,
  //         Yup.string()
  //           .matches(numRegex, "Invalid value")
  //           .trim()
  //           .required("Enter value"),
  //       ])
  //   )
  // );

  const validationSchema = Yup.object().shape(
    Object.fromEntries(
      Object.entries(item?.fares_details ?? {}).filter(([key]) =>
        !disableItems.includes(key)
      ).map(([key, value]) => {
        let validationRule = Yup.string()
          .trim()
          .required("Enter value");
  
        if (['parking_fee', 'booking_fee', 'transport_hub_fee'].includes(key)) {
          switch (key) {
            case 'parking_fee':
              validationRule = validationRule.matches(wholeNumRegex, "Invalid value");
              break;
            case 'booking_fee':
              validationRule = validationRule.matches(wholeNumRegex, "Invalid value");
              break;
            case 'transport_hub_fee':
              validationRule = validationRule.matches(wholeNumRegex, "Invalid value");
              break;
            default:
              break;
          }
        } else {
          validationRule = validationRule.matches(numRegex, "Invalid value");
        }
  
        return [key, validationRule];
      })
    )
  );
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: Object.entries(item?.fares_details || {}).reduce(
      (fares, [key, value]) => {
        if (value !== null && value !== undefined) {
          fares[key] = value;
        } else {
          fares[key] = "";
        }
        return fares;
      },
      {}
    ),
    validationSchema,
    onSubmit: (values) => {
      if (JSON.stringify(formik.initialValues) !== JSON.stringify(values)) {
        handlChangesUpdateShow();
      }
    },
  });


  return (
    <>
      <LocalTripUpdatePassword
        changesUpdateshow={changesUpdateshow}
        handleChangeUpdateClose={handleChangeUpdateClose}
        formik={formik}
        item={item}
        mainType={mainType}
        reload={reload}
        setReload={setReload}
        setEditingStatus={setEditingStatus}
        tableType={tableType}
        subZoneId={subZoneId}
        mainZoneId={mainZoneId}
      />{" "}
      <div className="mt-4 fares_input_field_height">
        <form onSubmit={formik.handleSubmit} className="d-flex">
          <div className="d-flex secondary_color fs_16 ">
            <div className="input_width_fares ps-4">
              {mainType === "RentalDefaultFare" ||
              mainType === "RentalManageFare"
                ? item?.package_time
                : item?.ride_type}
            </div>
          </div>

          <div className="d-flex">
            {item?.fares_details &&
              Object.entries(item?.fares_details)
                .sort(
                  ([aKey], [bKey]) =>
                    keyOrder?.indexOf(aKey) - keyOrder?.indexOf(bKey)
                )
                .map(([key, value]) => (
                  <div className="input_width_fares text-center" key={key}>
                    <input
                      name={key}
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={
                        formik.values[key] !== undefined
                          ? formik.values[key]
                          : ""
                      }
                      placeholder="-"
                      className={
                        formik.touched[key] && formik.errors[key]
                          ? "price_input_error text-center "
                          : `text-center ${
                              disableItems.includes(key) ||
                              !(
                                editingStatus[tableType] &&
                                editingStatus[tableType][
                                  item?.package_time ?? item.ride_type
                                ] &&
                                editingStatus[tableType][
                                  item?.package_time ?? item.ride_type
                                ] !== key
                              )
                                ? "ridetype_input_disabled"
                                : "ridetype_input"
                            }`
                      }
                      disabled={
                        disableItems.includes(key) ||
                        !(
                          editingStatus[tableType] &&
                          editingStatus[tableType][
                            item?.package_time ?? item.ride_type
                          ] &&
                          editingStatus[tableType][
                            item?.package_time ?? item.ride_type
                          ] !== key
                        )
                      }
                    />
                    <div>
                      {formik.touched[key] && formik.errors[key] ? (
                        <label className="red_color fs_10 fw_500">
                          {formik.errors[key]}
                        </label>
                      ) : null}
                    </div>
                  </div>
                ))}

            <div className="ps-3">
              {editingStatus[tableType] &&
              editingStatus[tableType][item?.package_time ?? item.ride_type] ? (
                <div className="d-flex">
                  <button
                    type="submit"
                    className="me-3 fs_14 save_Btn border_radius dark_green_bg  white_color px-3 border_none"
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
                    }}
                    className="fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2 me-3"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  {(mainType === "LocalManageFare" ||
                    mainType === "specialZoneManageFare" ||
                    mainType === "RentalManageFare" ||
                    mainType === "OneWayManageFare" ||
                    mainType === "RoundTripManageFare") &&
                  item?.documentation_availablity &&
                  item?.eligible_booking_type ? (
                    <>
                      {(tableType === manageZareEdit ||
                        mainType === "specialZoneManageFare" ||
                        mainType === "RentalManageFare" ||
                        mainType === "RoundTripManageFare") &&
                      is_editable ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStatus((prevState) => ({
                                ...prevState,
                                [tableType]: {
                                  ...prevState[tableType],
                                  [item?.package_time ?? item.ride_type]: true,
                                },
                              }));
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
                                ? "px-3 edit_btn light_grey_bg    fs_14 border_radius_3px  fw_700 border_none me-3"
                                : "px-3 edit_btn primary_bg  white_color fs_14 border_radius_3px border_none me-3"
                            }
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : mainType === "localDefaultFare" ||
                    mainType === "specialZoneDefaultFare" ||
                    mainType === "TollDefaultFare" ||
                    mainType === "RentalDefaultFare" ||
                    mainType === "oneWayDefaultFare" ||
                    mainType === "RoundTripDefaultFare" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingStatus((prevState) => ({
                          ...prevState,
                          [tableType]: {
                            ...prevState[tableType],
                            [item?.package_time ?? item.ride_type]: true,
                          },
                        }));
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
                          ? "px-3 edit_btn light_grey_bg    fs_14 border_radius_3px  fw_700 border_none me-3"
                          : "px-3 edit_btn primary_bg  white_color fs_14 border_radius_3px border_none me-3"
                      }
                    >
                      Edit
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default FaresInputForm;
