import React, { useEffect, useRef, useState } from "react";
import "../../manageFaresTables.css";
import { Autocomplete, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import * as ManageFareAction from "../../../../../redux/actions/manageFaresAction";
import moment from "moment";
import { manageFareStyles } from "../../../../mui-styles/mui-styles";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import LoadAndError from "../../../../utilits/loadAndError";
import SearchIcon from "../../../../../assets/icons/search-icon.svg";
import { useNavigate } from "react-router-dom";
import {
  ArchivedLocalDropDownListAction,
  ArchivedLocalFaresListAction,
} from "../../../../../redux/actions/archiveFaresAction";
import { getNewPath } from "../../../../helper";

const FaresLocalZonesTable = ({ paramsId, location }) => {
  const currentPath = window?.location?.pathname;
  const newPath = getNewPath(currentPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  const is_archived_fare =
    location?.state?.fare === "archivedFare" ? true : false;
  const is_editable = location?.state?.edit;
  const [page, setPage] = useState(0);
  const [listloading, setListloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dropDownList, setDropDownList] = useState({});
  const [FaresLocalList, setFaresLocalList] = useState([]);

  useEffect(() => {
    setListloading(true);
    if (is_archived_fare === true) {
      dispatch(
        ArchivedLocalDropDownListAction(
          {
            main_zone_id: paramsId[0],
          },
          onListSuccess,
          OnListError
        )
      );
    } else {
      dispatch(
        ManageFareAction.FaresLocalDropDownListAction(
          {
            main_zone_id: paramsId[0],
          },
          onListSuccess,
          OnListError
        )
      );
    }
  }, []);

  const onListSuccess = (data) => {
    setListloading(true);
    setDropDownList(data?.data);
  };

  const OnListError = (data) => {
    setListloading(false);
    console.log(data?.data);
  };
  const pickUplocationOption = Object.values(dropDownList)?.map((item) => {
    return { value: item?.id, label: item?.city_name };
  });

  const initialValues = {
    PickUpLocation:
      pickUplocationOption?.find(
        (item) => item?.value === localStorage.getItem("pickUplocationvalues")
      )?.value ?? "",
  };

  const validationSchema = Yup.object().shape({
    PickUpLocation: Yup.string().required("!Required"),
  });
  const onSubmit = (values) => {
    console.log(values?.PickUpLocation , "asdsdadsadsd");
    console.log(values);
    localStorage.setItem("pickUplocationvalues", values.PickUpLocation);
    setLoading(true);
    if (is_archived_fare === true) {
      dispatch(
        ArchivedLocalFaresListAction(
          {
            main_zone_id: paramsId[0],
            pickUpLocationID: values?.PickUpLocation,
            search: {
              pick_up_location: "",
              drop_off_location: "",
            },
          },
          page,
          onFetchListSuccess,
          onFetchListError
        )
      );
    } else {
      dispatch(
        ManageFareAction?.FaresLocalCreateAction(
          {
            main_zone_id: paramsId[0],
            pickUpLocationID: values?.PickUpLocation,
          },
          onCreateSuccess,
          onCreateError
        )
      );
      dispatch(
        ManageFareAction?.FaresLocalZonesListAction(
          {
            main_zone_id: paramsId[0],
            pickUpLocationID: values?.PickUpLocation,
            search: {
              pick_up_location: "",
              drop_off_location: "",
            },
          },
          page,
          onFetchListSuccess,
          onFetchListError
        )
      );
    }
  };

  useEffect(() => {
    if (is_archived_fare === true) {
      dispatch(
        ArchivedLocalFaresListAction(
          {
            main_zone_id: paramsId[0],
            pickUpLocationID: localStorage.getItem("pickUplocationvalues"),
            search: {
              pick_up_location: "",
              drop_off_location: "",
            },
          },
          page,
          onFetchListSuccess,
          onFetchListError
        )
      );
    } else {
      dispatch(
        ManageFareAction?.FaresLocalZonesListAction(
          {
            main_zone_id: paramsId[0],
            pickUpLocationID: localStorage.getItem("pickUplocationvalues"),
            search: {
              pick_up_location: "",
              drop_off_location: "",
            },
          },
          page,
          onFetchListSuccess,
          onFetchListError
        )
      );
    }
  }, []);

  const onCreateSuccess = (data) => {
    console.log(data?.data);
    setLoading(false);
    setListloading(false);
  };
  const onCreateError = (data) => {
    console.log(data?.data);
    setLoading(false);
    setListloading(false);
  };
  const onFetchListSuccess = (data) => {
    setLoading(false);
    setError(false);
    setFaresLocalList(data?.data?.data);
    setListloading(false);
    console.log(data , "asdadad");
  };
  const onFetchListError = (data) => {
    setLoading(false);
    console.log(data?.data);
    setError(true);
    setListloading(false);
  };

  return (
    <>
      <div className="mt-4 d-flex gap-4 align-items-center">
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={validationSchema}
        >
          {({ formik, handleChange, values, setFieldValue }) => {
            return (
              <Form>
                <div className="d-sm-flex gap-4">
                  <div>
                    <Autocomplete
                      className="country-select"
                      name="PickUpLocation"
                      sx={manageFareStyles.select}
                      style={{ width: "14rem" }}
                      options={pickUplocationOption}
                      getOptionLabel={(option) => option.label}
                      placeholder="Enter location"
                      onChange={(e, value) => {
                        setFieldValue("PickUpLocation", value.value);
                      }}
                      value={
                        pickUplocationOption?.find(
                          (item) => item?.value === values?.PickUpLocation
                        ) || null
                      }
                      clearOnBlur={true}
                      disableClearable={true}
                      renderInput={(params) => (
                        <Field
                          component={TextField}
                          {...params}
                          name="PickUpLocation"
                          label="PickUpLocation"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder={`Enter pickup Location`}
                        />
                      )}
                    />

                    <ErrorMessage name={"PickUpLocation"}>
                      {(msg) => (
                        <>
                          <span
                            className={` ms-0 ms-lg-1 red_color lh-sm fs_12 fw_600 fw-semibold`}
                          >
                            {msg + "!"}
                          </span>
                        </>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="mt-2">
                    <button
                      className="primary_bg border_radius_5px "
                      type="submit"
                    >
                      <span className="d-flex align-items-center">
                        <img
                          src={SearchIcon}
                          width={20}
                          height={20}
                          alt="icon"
                        />

                        <span className=" fs_16 white_color px-2">Search</span>
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      {localStorage?.getItem("pickUplocationvalues") && (
        <div className=" mt-3 local_zones_table_container  table_container">
          {listloading && <LoadingSpinnerTable />}
          <table className="   manage_fares_local_zones_table_container w-100 text-nowrap">
            <thead className=" w-100  pale_blue_bg ">
              <tr className="  text-start  fs_14 border-none  text-nowrap primary_color fw_600">
                <th className="   text-nowrap ps-3  py-2 " scope="col">
                  Pickup Location
                </th>
                <th className="text-nowrap ps-4" scope="col ">
                  Drop-Off Location
                </th>
                <th className="text-nowrap ps-4" scope="col">
                  {is_archived_fare ? "Archived on" : "Created on"}
                </th>
                <th className="text-nowrap ps-4" scope="col">
                  {is_archived_fare ? "Archived by" : "Created by"}
                </th>
                <th className="text-nowrap ps-4" scope="col">
                  Last Updated At
                </th>

                <th className=" ps-4" scope="col">
                  Last Updated By
                </th>

                <th></th>
                {is_archived_fare || is_editable === false ? <></> : <th></th>}
              </tr>
            </thead>
            <tbody className="">
              <LoadAndError
                loader={listloading}
                error={error}
                status={FaresLocalList?.length === 0}
              >
                {FaresLocalList?.map((item) => {
                  return (
                    <tr key={item?.id} className=" secondary_color fw_500 ">
                      <td className=" pb-2 pt-2 ps-3">
                        {item?.pick_up_location ? item?.pick_up_location : "--"}
                      </td>
                      <td className=" pb-2 pt-2 ps-4">
                        {" "}
                        {item?.drop_off_location
                          ? item?.drop_off_location
                          : "--"}
                      </td>
                      <td className="pb-2 pt-2 ps-4">
                        {is_archived_fare
                          ? item?.archived_on
                            ? moment(item?.archived_on).format("DD-MM-YYYY ")
                            : "--"
                          : item?.created_at
                          ? moment(item?.created_at).format("DD-MM-YYYY ")
                          : "--"}
                      </td>
                      <td className="pb-2 pt-2 ps-4">
                        {" "}
                        {is_archived_fare
                          ? item?.archivedBy?.user_name
                            ? item?.archivedBy?.user_name
                            : "--"
                          : item?.createdBy?.user_name
                          ? item?.createdBy?.user_name
                          : "--"}
                      </td>
                      <td className="pb-2 pt-2 ps-4">
                        {" "}
                        {item?.updated_at
                          ? moment(item?.updated_at).format("DD-MM-YYYY ")
                          : "--"}
                      </td>
                      <td className="pb-2 pt-2 ps-4">
                        {" "}
                        {item?.updatedBy?.user_name
                          ? item?.updatedBy?.user_name
                          : "--"}
                      </td>

                      <td className="pb-2 pt-2 ps-4">
                        <button
                          className="fs_14 blue_color_bg  border_radius view_btn  px-3 white_color border_none"
                          onClick={() => {
                            navigate(
                              is_archived_fare
                                ? `/archived-local-fares/view/${paramsId[0]}&${paramsId[1]}&${item?.id}`
                                : `${newPath}view/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                              {
                                state: {
                                  edit: false,
                                  city_name: item?.city_name,
                                  is_archived_fare: is_archived_fare,
                                },
                              }
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                      {is_archived_fare === true || is_editable === false ? (
                        <></>
                      ) : (
                        <td className="py-2 ps-2">
                          <button
                            className="border_none primary_bg  px-3 white_color border_radius"
                            onClick={() => {
                              navigate(
                                `${newPath}edit/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                                { state: { edit: true } }
                              );
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default FaresLocalZonesTable;
