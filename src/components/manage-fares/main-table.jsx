import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletedIntraFaresListAction } from "../../redux/actions/deletedIntrafareAction";
import {
  ManageFaresListAction,
  managefaresDrpdwnAction,
} from "../../redux/actions/manageFaresAction";
import {
  formatDateTime,
  insertSpaces,
  removeUnderScore,
  useSortableData,
} from "../helper";
import errorToast from "../utilits/errorToast";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import SearchInputfield from "../form/searchInputfield";
import InnerLayout from "../layout/innerLayout";
import { ArchivedFaresListAction } from "../../redux/actions/archiveFaresAction";
import usePermissions from "../usePermissionChecker";
import ManageFaresFilter from "./manage-fares-filter/manage-fares-filter";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const FaresMainTable = ({ type = "" }) => {
  const { canWrite } = usePermissions();
  const pagePermissions = {
    manageFares: "manage_fares",
    deletedIntraFares: "deleted_intrazone_fares",
    archiveFares: "archived_fares",
  };
  const permission = pagePermissions[type];
  const [errorMessage, setErrorMessage] = useState("");
  const [checkManageList, setCheckManageList] = useState();
  const dispatch = useDispatch();
  function checkChecker(e) {
    if (checkManageList === e.target.id) {
      setCheckManageList("");
    } else {
      setCheckManageList(e.target.id);
    }
  }
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [faresList, setFaresList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [driverDropDownList, setDriverDropDownList] = useState({});

  const handleSearch = (value) => {
    setNumberOfFilters(0);
    setSearch(value);
    for (let key in value) {
      if (value[key]) {
        setNumberOfFilters((prev) => prev + 1);
      }
    }
    setPage(0);
  };

  useEffect(() => {
    localStorage.removeItem("pickUplocationvalues");
    localStorage.removeItem("zone_status");
    if (type === "manageFares") {
      setLoading(true);
      dispatch(
        ManageFaresListAction(
          {
            search: {
              id: "",
              main_zone_code: search?.main_zone_code,
              zone_name: search?.zone_name,
              zone_status: search?.zone_status,
              created_by: search?.created_by,
              created_on: search?.created_on,
              updated_by: search?.updated_by,
              updated_on: search?.updated_on,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "deletedIntraFares") {
      setLoading(true);
      localStorage.removeItem("fare_type");
      dispatch(
        deletedIntraFaresListAction(
          {
            search: {
              main_zone_code: "",
              zone_name: "",
              zone_status: "",
              created_on: "",
              created_by: "",
              updated_on: "",
              updated_by: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "archiveFares") {
      setLoading(true);
      dispatch(
        ArchivedFaresListAction(
          {
            search: {
              id: "",
              main_zone_code: "",
              zone_name: "",
              zone_status: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search]);

  const onSuccess = (data) => {
    setFaresList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
  };
  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const { items, requestSort, sortConfig } = useSortableData(faresList);
  const tableHeading = [
    { title: "Zone ID", value: "main_zone_code", display: true },
    { title: "Zone Name", value: "zone_name", display: true },
    { title: "Status", value: "zone_status", display: true },
    {
      title: "Updated on",
      value: "updated_on",
      display:
        type === "manageFares" || type === "deletedIntraFares" ? true : false,
    },
    {
      title: "Updated by",
      value: "updatedBy.user_name",
      display:
        type === "manageFares" || type === "deletedIntraFares" ? true : false,
    },
    {
      title: "Created on",
      value: "created_on",
      display:
        type === "manageFares" || type === "deletedIntraFares" ? true : false,
    },
    {
      title: "Created by",
      value: "createdBy.user_name",
      display:
        type === "manageFares" || type === "deletedIntraFares" ? true : false,
    },
    {
      title: "Archived On",
      value: "archived_on",
      display: type === "archiveFares" ? true : false,
    },
    {
      title: "Archived By",
      value: "archivedBy.user_name",
      display: type === "archiveFares" ? true : false,
    },
  ];

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList(); /// API call function name
        }}
      >
        <i className="ri-filter-3-line primary_color pe-2" />
        <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
      </button>

      {numberOfFilters === 0 ? (
        <></>
      ) : (
        <div className={`position-relative p-1`}>
          <span
            className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
          >
            {numberOfFilters}
          </span>
        </div>
      )}
    </>,
  ];

  const handleFetchDropDownList = () => {
    if (type === "manageFares") {
      dispatch(
        managefaresDrpdwnAction(onDropDownListSuccess, onDropDownListError)
      );
    }
  };
  const onDropDownListSuccess = (data) => {
    console.log(data?.data, "fasklada");
    setShowFilter(!showFilter);
    if (type === "manageFares") {
      setDriverDropDownList({
        zone_name: [...new Set(data?.data?.map((item) => item?.zone_name))].map(
          (zone_name) => ({ zone_name: zone_name })
        ),
        zone_status: [
          ...new Set(data?.data?.map((item) => item?.zone_status)),
        ].map((zone_status) => ({ zone_status: zone_status })),
        created_by: [
          ...new Set(data?.data?.map((item) => item?.createdBy?.user_name)),
        ].map((created_by) => ({ created_by: created_by })),
        updated_by: [
          ...new Set(data?.data?.map((item) => item?.updatedBy)),
        ].map((updated_by) => ({ updated_by: updated_by })),
      });
    }
  };
  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  return (
    <>
      <InnerLayout
        mainHeading={type ? insertSpaces(type) : "--"}
        navigateEnable={false}
        backBtnClassName={"ms-4"}
        buttons={buttonList}
      >
        {showFilter ? (
          <ManageFaresFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            driverDropDownList={driverDropDownList}
            type={type}
            setShowFilter={setShowFilter}
          />
        ) : (
          <></>
        )}{" "}
        <div className="row">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table manage_fare_list_navbar text-nowrap">
              <thead>
                <tr className="primary_bg">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>

                  {tableHeading
                    ?.filter((item) => item?.display === true)
                    .map((item, index) => {
                      const isActiveSortIndex = activeSortIndex === index;
                      return (
                        <SearchInputfield
                          title={item?.title}
                          requestSort={requestSort}
                          sortName={item?.value}
                          key={item?.title}
                          index={index}
                          isActiveSortIndex={isActiveSortIndex}
                          setActiveSortIndex={setActiveSortIndex}
                          sortConfig={sortConfig}
                          colorName={"white_color"}
                          filter_icon={"white_color"}
                        />
                      );
                    })}
                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={faresList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr
                      key={item?.id}
                      className={
                        item?.id === checkManageList ? "light_blue_bg" : ""
                      }
                    >
                      <th scope="row">
                        <input
                          id={item?.id}
                          type="checkbox"
                          checked={checkManageList === item?.id}
                          className="manage_fare_checkbox ms-2"
                          onChange={checkChecker}
                        />
                      </th>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14 fw_500">
                          {item?.main_zone_code ? item?.main_zone_code : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14 fw_500">
                          {item?.zone_name ? item?.zone_name : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span
                          className={`${
                            item?.zone_status === "Active"
                              ? "green_color"
                              : "red_color"
                          } fs_14 fw_500`}
                        >
                          {item?.zone_status
                            ? removeUnderScore(item?.zone_status)
                            : "--"}
                        </span>
                      </td>
                      {type === "manageFares" ||
                      type === "deletedIntraFares" ? (
                        <>
                          <td>
                            {" "}
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.updated_on)}
                            </span>
                          </td>
                          <td>
                            {" "}
                            <span className="secondary_color fs_14 fw_500">
                              {item?.updatedBy?.user_name
                                ? item?.updatedBy?.user_name
                                : "--"}
                            </span>
                          </td>
                          <td>
                            {" "}
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.created_on)}
                            </span>
                          </td>
                          <td>
                            {" "}
                            <span className="secondary_color fs_14 fw_500">
                              {item?.createdBy?.user_name
                                ? item?.createdBy?.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "archiveFares" ? (
                        <>
                          <td>
                            {" "}
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.archived_on)}
                            </span>
                          </td>
                          <td>
                            {" "}
                            <span className="secondary_color fs_14 fw_500">
                              {item?.archivedBy?.user_name
                                ? item?.archivedBy?.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      <td>
                        <span className="d-flex">
                          <Link
                            className="border_none border_radius fs_13  py-1 me-3 fw_500 px-3 
                      white_color blue_color_bg text-decoration-none view_text"
                            to={`view/${item?.id}&${item?.zone_name}`}
                            state={{
                              zone_name: item?.zone_name,
                              fare_type: item?.zone_status,
                              edit: false,
                            }}
                            onClick={() => {
                              localStorage.setItem(
                                "fare_type",
                                item?.zone_status
                              );
                            }}
                          >
                            View
                          </Link>
                          {type === "manageFares" && canWrite(permission) ? (
                            <Link
                              className="border_none primary_bg text-decoration-none white_color px-4 border_radius  py-1 fs_14 fw_500  view_text"
                              to={`edit/${item?.id}&${item?.zone_name}`}
                              state={{
                                zone_name: item?.zone_name,
                                fare_type: item?.zone_status,
                                edit: true,
                              }}
                              onClick={() => {
                                localStorage.setItem(
                                  "zone_status",
                                  item?.zone_status
                                );
                              }}
                            >
                              Edit
                            </Link>
                          ) : (
                            <></>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
      </InnerLayout>
    </>
  );
};

export default FaresMainTable;
