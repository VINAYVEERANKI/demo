import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FaresRentalAction,
  createRentalPackageAction,
  deleteRentalPackageAction,
} from "../../../../../redux/actions/manageFaresAction";
import { Rentalstyles } from "../../../../mui-styles/mui-styles";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import { useNavigate } from "react-router";
import { archivedRentalAction } from "../../../../../redux/actions/archiveFaresAction";
import { incentiveRideTypeListAction } from "../../../../../redux/actions/incentives/dropDownListAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex } from "../../../../helper";
import RentalPriceRow from "./inputField";
import LoadAndError from "../../../../utilits/loadAndError";
import RentalUpdatePassword from "./rentalPassword";
import { RentalFareValueAction } from "../../../../../redux/actions/defaultFareAction";

const ManageFaresRentalEdit = ({ params, location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newRentalRef = useRef(null);
  const paramsData = params?.split("&");
  const is_editable = location?.state?.edit;
  const is_archived_fare = location?.state?.is_archived_fare;
  const [loading, setLoading] = useState(false);
  const [rentalPrice, setRentalPrice] = useState([]);
  const [rentalTable, setRentalTable] = useState(false);
  const [editingStatus, setEditingStatus] = useState({});
  useEffect(() => {
    setLoading(true);
    if (is_archived_fare === true) {
      dispatch(
        archivedRentalAction(
          {
            main_zone_id: paramsData[0],
            ride_type: location?.state?.ride_type,
          },
          onSuccess,
          onError
        )
      );
    } else {
      dispatch(
        FaresRentalAction(
          {
            main_zone_id: paramsData[0],
            ride_type: location?.state?.ride_type,
          },
          onSuccess,
          onError
        )
      );
    }
  }, [rentalTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setRentalPrice(data?.data);
    newRentalRef.current = data?.data;
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data?.data);
  };

  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => setchangeUpdatePasswordshow(true);
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);

  const [rideTypelist, setRideTypelist] = useState([]);
  useEffect(() => {
    dispatch(
      incentiveRideTypeListAction(onRideTypeListSuccess, onRideTypeListError)
    );
  }, []);

  const onRideTypeListSuccess = (data) => {
    setRideTypelist(data?.data);
  };

  const onRideTypeListError = (data) => {
    console.log(data?.data);
  };

  const ride_type_id = rideTypelist?.find(
    (item) => item?.ride_type === location?.state?.ride_type
  )?.id;
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedValues, setEditedValues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saveDisable, setSaveDisable] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const createPackageFn = () => {
    setCreateLoading(true);
    dispatch(
      createRentalPackageAction(
        {
          main_zone_id: paramsData[0],
          ride_type: location?.state?.ride_type,
          ride_type_id: ride_type_id,
        },
        onCreateSuccess,
        onCreateError
      )
    );
  };

  const [createNewId, setCreateNewId] = useState("");

  const onCreateSuccess = (data) => {
    setCreateLoading(false);
    localStorage.setItem("newRenatlPackage", "true");
    setCreateNewId([data?.data?.id]);
    console.log(data?.data, "sdfdbfbfgbf");
    setRentalTable(!rentalTable);
    console.log(data);
  };
  const onCreateError = (data) => {
    setCreateLoading(false);
    console.log(data);
  };
  const [edittttt, setEdittttt] = useState(null);
  useEffect(() => {
    setEdittttt(localStorage.getItem("newRenatlPackage"));
  }, [rentalTable]);

  const [rentalPriceList, setrentalPriceList] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(
      RentalFareValueAction(
        {
          ride_type: location?.state?.ride_type,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }, [location?.state?.ride_type]);
  const onFetchSuccess = (data) => {
    setLoading(false);
    setrentalPriceList(data?.data);
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data?.data);
  };
  const matchedIds = rentalPrice.reduce((ids, item2) => {
    const matchFound = rentalPriceList.some((item1) => {
      return (
        item1.package_time == item2.package_time &&
        item1.ride_type == item2.ride_type &&
        JSON.stringify(item1.fares_details) ==
          JSON.stringify(item2.fares_details)
      );
    });

    if (matchFound) {
      ids.push(item2.id);
    }
    return ids;
  }, []);
  const handleSave = (values) => {
    setEditedValues(values?.rentalPrice[editedIndex]);
    handlChangesUpdateShow();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rentalPrice: rentalPrice.map((item, index) => ({
        package_time: item?.package_time || "",
        base_fare: item?.fares_details?.base_fare || "",
        booking_fee: item?.fares_details?.booking_fee || "",
        cancellation_fee: item?.fares_details?.cancellation_fee || "",
        package_km: item?.fares_details?.package_km || "",
        per_extra_km_fare: item?.fares_details?.per_extra_km_fare || "",
        per_extra_time_fare: item?.fares_details?.per_extra_time_fare || "",
        waiting_fee: item?.fares_details?.waiting_fee || "",
        index: index, // Include the index in the formik initial values
      })),
    },
    // validationSchema: Yup.object().shape({
    //   rentalPrice: Yup.array().of(
    //     Yup.object().shape({
    //       package_time: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       base_fare: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       booking_fee: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       cancellation_fee: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       package_km: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       per_extra_km_fare: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       per_extra_time_fare: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //       waiting_fee: Yup.string().when("index", {
    //         is: editedIndex,
    //         then: Yup.string()
    //           .trim()
    //           .required("Enter value")
    //           .matches(numRegex, "Invalid value"),
    //         otherwise: Yup.string(),
    //       }),
    //     })
    //   ),
    // }),
    onSubmit: handleSave,
  });
  const handleCancel = () => {
    formik.resetForm();
    setEditedIndex(null);
    setIsEditing(false);
  };
  const [rentalId, setRentalId] = useState("");
  const anyEligibleBookingTypeTrue = rentalPrice?.some(
    (item) => item.eligible_booking_type
  );
  const anyDocumentAvailablityTrue = rentalPrice?.some(
    (item) => item.documentation_availablity
  );

  function deleteFn(id) {
    setLoading(true);
    dispatch(
      deleteRentalPackageAction(
        {
          id: id,
          main_zone_id: paramsData[0],
        },
        onDeleteSuccess,
        onDeleteError
      )
    );
  }

  const onDeleteSuccess = (data) => {
    setRentalTable(!rentalTable);
    localStorage.removeItem("newRenatlPackage");
    setLoading(false);
    console.log(data);
  };
  const onDeleteError = (data) => {
    setLoading(false);
    console.log(data);
  };

  console.log(anyDocumentAvailablityTrue, "skadhlak");
  console.log(anyEligibleBookingTypeTrue, "skadhlak");
  console.log(rentalPrice, "skadhlak");

  return (
    <>
      <RentalUpdatePassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        formik={formik}
        ride_type={location?.state?.ride_type}
        rentalTable={rentalTable}
        setRentalTable={setRentalTable}
        editedValues={editedValues}
        mainZoneId={paramsData?.[0]}
        rentalId={rentalId}
        setIsEditing={setIsEditing}
        setEditedIndex={setEditedIndex}
      />
      <div className="d-flex align-items-center ">
        <button
          className="back_icon ps-0 "
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="ri-arrow-left-s-line fs_30 fw_700 primary_color"></i>
        </button>
        <span className="primary_color fs_20 fw_600 ">Rental</span>{" "}
      </div>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <div className="mt-3">
            <TextField
              size="small"
              style={{ width: "20%" }}
              sx={Rentalstyles.select}
              variant="outlined"
              label="Ride Type"
              InputLabelProps={{
                style: { color: "#687284", fontWeight: "500" },
              }}
              value={
                location?.state?.ride_type ? location?.state?.ride_type : ""
              }
              disabled
            />
          </div>
          <div>
            {anyDocumentAvailablityTrue ? (
              <div className="d-flex justify-content-end">
                <button
                  className={`border_radius_5px ${
                    edittttt === "true" ||
                    is_editable === false ||
                    isEditing ||
                    is_archived_fare === true
                      ? "disabled_color_bg border_none white_color fs_18 fw_400 p-1 px-2"
                      : "tertiary_bg border_none primary_color fs_18 fw_500 p-1 px-2"
                  }    `}
                  onClick={() => createPackageFn()}
                  type="button"
                  disabled={
                    edittttt === "true" ||
                    isEditing ||
                    is_editable === false ||
                    is_archived_fare === true ||
                    createLoading
                  }
                >
                  + Add Package
                </button>
              </div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <div className=" mt-3 local_zones_table_container table_container">
                {loading && <LoadingSpinnerTable />}
                <table className="pale_blue_bg manage_fares_local_zones_table_container w-100 text-nowrap table">
                  <thead className="w-100 pale_blue_bg py-1 text-start fs_14 border-none text-nowrap primary_color fw_600">
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Package Time(Hrs)
                    </th>
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Package Km
                    </th>
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Base Fare(₹)
                    </th>
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Per Extra Km Fare(₹)
                    </th>
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Per Extra Time Fare(Min)(₹)
                    </th>
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Waiting Fee(₹)
                    </th>

                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Booking Fee(₹)
                    </th>
                    <th className="text-nowrap ps-3 py-2" scope="col">
                      Cancellation Fee(₹)
                    </th>

                    <th></th>
                  </thead>
                  <tbody className="light_blue_bg">
                    <LoadAndError
                      loader={loading}
                      // error={error}
                      status={rentalPrice.length === 0}
                    >
                      {rentalPrice
                        ?.sort((a, b) => a.ride_type.localeCompare(b.ride_type))
                        ?.map((item, index) => {
                          const isEditableRow = createNewId.includes(item.id);

                          return (
                            <tr key={index} className=" secondary_color fw_500">
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="package_time"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="package_km"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="base_fare"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="per_extra_km_fare"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="per_extra_time_fare"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="waiting_fee"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>

                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="booking_fee"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>
                              <td className="pb-2 pt-2 ps-4">
                                <RentalPriceRow
                                  index={index}
                                  fieldPrefix="rentalPrice"
                                  fieldName="cancellation_fee"
                                  formik={formik}
                                  editedIndex={editedIndex}
                                  isEditing={isEditing}
                                  isEditableRow={isEditableRow}
                                  edittttt={edittttt}
                                />
                              </td>

                              <td className="pb-2 pt-2 ps-4">
                                {is_editable && anyDocumentAvailablityTrue ? (
                                  <>
                                    {isEditableRow && edittttt === "true" ? (
                                      <div className="d-flex gap-3">
                                        <button
                                          type="submit"
                                          onClick={() => {
                                            setEditedIndex(index);
                                            setRentalId(item?.id);
                                          }}
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
                                          onClick={() => {
                                            deleteFn(item?.id);
                                          }}
                                          className={`fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2`}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    ) : edittttt === null ||
                                      edittttt === undefined ? (
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
                                                setIsEditing(true); // Enable editing
                                                setRentalId(item?.id);
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
                                            {rentalPrice.length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  deleteFn(item?.id);
                                                }}
                                                className={`fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2`}
                                              >
                                                Delete
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </>
                                    ) : null}
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
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ManageFaresRentalEdit;
