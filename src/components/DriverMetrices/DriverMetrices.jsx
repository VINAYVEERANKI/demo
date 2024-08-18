import React, { useEffect, useState } from "react";
import SearchInputfield from "../form/searchInputfield";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import LoadAndError from "../utilits/loadAndError";
import TablePaginations from "../utilits/pagination";
import {
  driverNavigateFn,
  removeUnderScore,
  useSortableData,
} from "../helper";
import InnerLayout from "../layout/innerLayout";
import moment from "moment";
import usePermissions from "../usePermissionChecker";
import { Navigate, useNavigate } from "react-router";
import * as driverMetricsAction from "../../redux/actions/driverMetrics/driverMetricsActions";
import { NavLink } from "react-router-dom";
import DriverFinanceFilter from "../driver-finance/driver-finance-filter/driver-finance-filter";
import DriverMetricsFilter from "./driver-metrics-filter/driver-metrics-filter";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const DriverMetrices = () => {
  const navigate = useNavigate();
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    drivermetricsList: "Driver Metrics",
  };
  const permission = pagePermissions[""];

  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [driverMetricsData, setDriverMetricsData] = useState(false);
  const [driverMetricsList, setDriverMetricsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [driverDropDownList, setDriverDropDownList] = useState({});

  useEffect(() => {
    setLoading(true);
    dispatch(
      driverMetricsAction.driverMetricsListAction(
        {
          search: {
            id: "",
            driver_id2: search ?.driver_id2 ?? "",
            first_name: search ?.first_name ?? "",
            last_name: search ?.last_name ?? "",
            driver_type: search ?.driver_type ?? "",
            registered_zone: search?.registered_zone ?? "",
            from_date: search?.createdAt ?? "",
            to_date: search?.createdAt ?? "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, setDriverMetricsList]);

  const onSuccess = (data) => {
    console.log(data, "data");
    setLoading(false);
    setDriverMetricsList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
    setErrorMessage(data?.data?.data);
  };

  console.log(driverMetricsList, "driverMetricsList");

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

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const handlePageChange = (event) => {
    setPage(Number(event.target.value) - 1);
    setCurrentPage(page);
  };

  const metricstableHeading = [
    { title: "Driver ID", value: "driver_id2" },
    { title: "Driver Type", value: "driver_type" },
    { title: "From Date", value: "createdAt" },
    { title: "To Date", value: "createdAt" },
    { title: "Zone", value: "registered_zone_name.zone_name" },
    { title: "First Name", value: "first_name" },
    { title: "Last Name", value: "last_name" },
    { title: "Denied Bookings", value: "Denied_Bookings" },
    { title: "Cancelled Bookings", value: "Cancelled_Bookings" },
    { title: "Completed Bookings", value: "Completed_Bookings" },
    { title: "Earnings (₹)", value: "" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(driverMetricsList);

  const buttonList = [
    <>
       <button
         className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
         type="button"
         onClick={() => {
           handleFetchDropDownList();  /// API call function name
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
     </>
 ];
 const handleFetchDropDownList = () => {
  dispatch(
    driverMetricsAction.drimetDropdownListAction(
      onDropDownListSuccess,
      onDropDownListError
    )
  );
 };
 const onDropDownListSuccess = (data) => {
  console.log(data?.data, "fasklada");
  setShowFilter(!showFilter);
  setDriverDropDownList({
    driver_id2: [...new Set(data?.data?.map((item) => item.driver_id2))].map(
      (id) => ({ driver_id2: id })
    ),
    // phone_number: [
    //   ...new Set(data?.data?.map((item) => item.phone_number)),
    // ].map((phone_number) => ({ phone_number: phone_number })),
    first_name: [
      ...new Set(data?.data?.map((item) => item.first_name)),
    ].map((first_name) => ({ first_name: first_name })),
    last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
      (last_name) => ({ last_name: last_name })
    ),
    driver_type: [...new Set(data?.data?.map((item) => item.driver_type))].map(
      (driver_type) => ({ driver_type: driver_type })
    ),
    registered_zone: [...new Set(data?.data?.map((item) => item?.registered_zone_name?.zone_name))].map(
      (registered_zone) => ({ registered_zone: registered_zone })
    ),
    createdAt: [...new Set(data?.data?.map((item) => item?.createdAt))].map(
      (createdAt) => ({ createdAt: createdAt })
    ),
  });
};
const onDropDownListError = (data) => {
  console.log(data?.data);
};
  //     <button
  //       className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
  //       type="button"
  //       onClick={() => {
  //         //   handleFetchDropDownList();
  //       }}
  //     >
  //       <i className="ri-filter-3-line primary_color pe-2" />
  //       <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
  //     </button>

  //     {numberOfFilters === 0 ? (
  //       <></>
  //     ) : (
  //       <div className={`position-relative p-1`}>
  //         <span
  //           className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
  //         >
  //           {numberOfFilters}
  //         </span>
  //       </div>
  //     )}
  //   </>,
  // ];

  console.log(driverMetricsList, "kjdals");
  return (
    <InnerLayout
      mainHeading={"Driver Metrics"}
      navigateEnable={false}
      backBtnClassName="ms-4"
      buttons={buttonList}
    >
{showFilter ? (
          <DriverMetricsFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            driverDropDownList={driverDropDownList}
            setShowFilter={setShowFilter}
          />
        ) : (
          <></>
        )}
      <div className="row mt-3">
        <div className="col-md-12 table_container">
          {loading && <LoadingSpinnerTable />}
          <table className="table manage_fare_list_navbar">
            <thead>
              <tr className="pale_blue_bg">
                <th scope="col" className={`${styles.first_list} transparent_bg`}>
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2"
                    id="mastercheck"
                  />
                </th>

                {metricstableHeading?.map((item, index) => {
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
                    />
                  );
                })}

                <th className={`${styles.last_list} transparent_bg`}></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg text-nowrap">
              <LoadAndError
                loader={loading}
                error={error}
                status={driverMetricsList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => (
                  <tr>
                    <td scope="row">
                      <input
                        type="checkbox"
                        className="manage_fare_checkbox ms-2"
                        onChange={checkboxChecker}
                      />
                    </td>
                    <td>
                      <NavLink
                        className={"secondary_color fw_500 fs_14"}
                        to={driverNavigateFn(item, item?.id)}
                      >
                        {item.driver_id2 ?? "--"}
                      </NavLink>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 text-nowrap fs_14">
                        {item?.driver_type
                          ? removeUnderScore(item?.driver_type)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {moment(item?.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {moment(item?.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.registered_zone_name?.zone_name ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item.first_name ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item.last_name ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item.Denied_Bookings ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 text-nowrap fs_14">
                        {item.Cancelled_Bookings ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 text-nowrap fs_14">
                        {item.Completed_Bookings ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        Earnings
                      </span>
                    </td>
                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={`/driver-metrics/view/${item?.id}`}
                      >
                        View
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
      {driverMetricsList.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          handleChange={handlePageChange}
          currentPage={page}
          pageData={pageData}
        />
      )}
    </InnerLayout>
  );
};

export default DriverMetrices;
