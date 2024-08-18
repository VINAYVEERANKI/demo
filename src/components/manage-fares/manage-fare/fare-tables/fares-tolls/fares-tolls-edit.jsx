import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaresTollsZonesAction } from "../../../../../redux/actions/manageFaresAction";
import { useDispatch } from "react-redux";
import errorToast from "../../../../utilits/errorToast";
import { useNavigate } from "react-router";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import { ArchivedTollsFaresAction } from "../../../../../redux/actions/archiveFaresAction";
import {
  archdelIntraFareIndAction,
  deletedIntraFareIndividualAction,
} from "../../../../../redux/actions/deletedIntrafareAction";
import TollsUpdatePassword from "./tollsUpdatePassword";
import { numRegex } from "../../../../helper";
import LoadAndError from "../../../../utilits/loadAndError";

const FaresTollsEdit = ({ params, location, fare }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paramsData = params?.split("&");
  const is_editable = location?.state?.edit;
  const is_archived_fare = location?.state?.is_archived_fare;
  const is_deleted_intra_fare = location?.state?.is_deleted_intra_fare;

  const [loading, setLoading] = useState(false);
  const [tollData, setTollData] = useState([]);

  const [faresTollTable, setFaresTollTable] = useState(false);

  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => setchangeUpdatePasswordshow(true);
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);

  const [editedIndex, setEditedIndex] = useState(null);
  const [editedValues, setEditedValues] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (is_archived_fare === true) {
      dispatch(
        ArchivedTollsFaresAction(
          {
            main_zone_id: paramsData[0],
            toll_zone_id: paramsData[2],
          },
          onSuccess,
          onError
        )
      );
    } else if (fare === "deletedIntraFares") {
      if (location?.state?.fare === "Archived") {
        dispatch(
          archdelIntraFareIndAction(
            {
              main_zone_id: paramsData[0],
              archived_zone_id: paramsData[2],
            },
            onSuccess,
            onError
          )
        );
      } else {
        dispatch(
          deletedIntraFareIndividualAction(
            {
              main_zone_id: paramsData[0],
              delete_zone_id: paramsData[2],
            },
            onSuccess,
            onError
          )
        );
      }
    } else {
      dispatch(
        FaresTollsZonesAction(
          {
            main_zone_id: paramsData[0],
            toll_zone_id: paramsData[2],
          },
          onSuccess,
          onError
        )
      );
    }
  }, [faresTollTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setTollData(data?.data);
    console.log(data, "asdasdasdasd");
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
  };
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (values) => {
    const editedRideType = values.tollData[editedIndex]?.ride_type;
    const editedTollFare = values.tollData[editedIndex]?.toll_fare;
    setEditedValues({ ride_type: editedRideType, toll_fare: editedTollFare });
    handlChangesUpdateShow();
  };

  const formik = useFormik({
    initialValues: {
      tollData: tollData?.map((item) => ({
        ride_type: item?.ride_type || "",
        toll_fare: item?.toll_fare || "",
      })),
    },
    onSubmit: handleSave,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      // tollData: Yup.array().of(
      //   Yup.object().shape({
      //     toll_fare: Yup.string()
      //       .matches(numRegex, "Invalid value")
      //       .trim()
      //       .when(["ride_type", "index"], (rideType, index, schema) => {
      //         if (index === editedIndex) {
      //           return schema.required("Enter value");
      //         }
      //         return schema;
      //       }),
      //   })
      // ),
    }),
  });

  const handleCancel = () => {
    formik.resetForm();
    setEditedIndex(null);
    setIsEditing(false);
  };

  const [saveDisable, setSaveDisable] = useState(false);

  useEffect(() => {
    if (
      JSON.stringify(formik?.initialValues) !== JSON.stringify(formik?.values)
    ) {
      setSaveDisable(false);
    } else {
      setSaveDisable(true);
    }
  }, [formik?.values]);

  return (
    <>
      <TollsUpdatePassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        formik={formik}
        faresTollTable={faresTollTable}
        setFaresTollTable={setFaresTollTable}
        editedValues={editedValues}
        mainZoneId={paramsData?.[0]}
        subZoneId={paramsData?.[2]}
        setIsEditing={setIsEditing}
        setEditedIndex={setEditedIndex}
      />
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <div className="d-flex align-items-center">
            <button
              className="back_icon ps-0"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ri-arrow-left-s-line fs_23 fw_700 primary_color"></i>
            </button>
            <span className="primary_color fs_18 fw_600">{`${location?.state?.city_name} Toll`}</span>{" "}
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column" style={{ maxWidth: "26rem" }}>
              <div className="d-flex align-items-center mt-4">
                <span
                  className="fs_16 secondary_color me-3 fw_500"
                  style={{ width: "8rem" }}
                >
                  Toll Zone
                </span>

                <div>
                  <input
                    type="text"
                    className="body_bg border_none border_radius py-1 w-100 primary_color fw_600 px-3"
                    value={location?.state?.city_name ?? "--"}
                    disabled
                  />
                </div>
              </div>
              <div className="table_container">
                {loading && <LoadingSpinnerTable />}
                <table className="pale_blue_bg manage_fares_local_zones_table_container w-100 text-nowrap table mt-4 ">
                  <thead className="w-100 pale_blue_bg py-1 text-start fs_14 border-none text-nowrap primary_color fw_600">
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Ride Type
                    </th>
                    <th className="text-nowrap ps-4 py-2" scope="col">
                      Toll Fare
                    </th>

                    <th></th>
                  </thead>
                  <tbody className="light_blue_bg position-relative">
                    <LoadAndError
                      loader={loading}
                      // error={error}
                      status={tollData.length === 0}
                    >
                      {tollData
                        ?.sort((a, b) => a.ride_type.localeCompare(b.ride_type))
                        ?.map((item, index) => {
                          return (
                            <tr
                              key={index}
                              className=" secondary_color fw_500 "
                            >
                              <td className=" pb-2 pt-2 ps-3">
                                {formik.values.tollData[index]?.ride_type}
                              </td>

                              <td className="pb-2 pt-2 ps-4">
                                <input
                                  type="text"
                                  name={`tollData[${index}].toll_fare`}
                                  value={
                                    formik.values.tollData[index]?.toll_fare ||
                                    ""
                                  }
                                  placeholder="-"
                                  onChange={formik.handleChange}
                                  disabled={editedIndex !== index || !isEditing}
                                  onBlur={formik.handleBlur}
                                  className={
                                    formik.errors.tollData &&
                                    formik.errors.tollData[index] &&
                                    formik.touched.tollData &&
                                    formik.touched.tollData[index]
                                      ? "price_input_error text-center"
                                      : `text-center ${
                                          editedIndex !== index || !isEditing
                                            ? " ridetype_input_disabled"
                                            : "ridetype_input "
                                        }`
                                  }
                                />
                                {formik.errors.tollData &&
                                  formik.errors.tollData[index] &&
                                  formik.touched.tollData &&
                                  formik.touched.tollData[index] && (
                                    <div className="red_color fs_10 fw_500">
                                      {formik.errors.tollData[index].toll_fare}
                                    </div>
                                  )}
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                {is_editable ? (
                                  <>
                                    {editedIndex === index ? (
                                      <div>
                                        <div className="d-flex gap-3">
                                          <button
                                            type="submit"
                                            className={
                                              saveDisable
                                                ? `fs_14 save_Btn border_radius disabled_color_bg white_color px-3 border_none`
                                                : `fs_14 save_Btn border_radius dark_green_bg  white_color px-3 border_none`
                                            }
                                            disabled={saveDisable}
                                          >
                                            Save
                                          </button>
                                          <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditedIndex(index);
                                            setIsEditing(true);
                                          }}
                                          disabled={isEditing}
                                          className={
                                            isEditing
                                              ? "px-3 edit_btn light_grey_bg    fs_14 border_radius_3px  fw_700 border_none me-3"
                                              : "px-3 edit_btn primary_bg  white_color fs_14 border_radius_3px border_none me-3"
                                          }
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : null}
                              </td>
                            </tr>
                          );
                        })}
                    </LoadAndError>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default FaresTollsEdit;
