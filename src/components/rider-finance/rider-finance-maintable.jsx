import React, { useState, useEffect } from "react";
import InnerLayout from "../layout/innerLayout";
import LoadAndError from "../utilits/loadAndError";
import errorToast from "../utilits/errorToast";
import SearchInputfield from "../form/searchInputfield";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { riderNavigateFn, useSortableData } from "../helper";
import { NavLink } from "react-router-dom";
import DriverFinanceFilter from "../driver-finance/driver-finance-filter/driver-finance-filter";
import * as riderFinanceAction from "../../redux/actions/riderFinance/riderFinanceAction";
import RiderFinanceFilter from "./riderFinanceFilter/riderFinanceFilter";
import styles from "../../modules/manage-admins/manage-admins.module.css";

const RiderFinanceMaintable = ({ type = "" }) => {
  // riderFinance

  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [riderFinanceData, setRiderFinanceData] = useState(false);
  const [riderFinanceList, setRiderFinanceList] = useState([]);
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(riderFinanceList);
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

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
    setLoading(true);
    dispatch(
      riderFinanceAction.riderFinanceListAction(
        {
          search: {
            id: "",
            rider_id2: search?.rider_id2 ?? "",
            first_name: search?.first_name ?? "",
            last_name: search?.last_name ?? "",
            phone_number: search?.phone_number ?? "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, setRiderFinanceList]);

  const onSuccess = (data) => {
    setLoading(false);
    setRiderFinanceList(data?.data?.data);
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

  console.log(riderFinanceList, "riderFinanceList");

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const tableHeading = [
    { title: "Rider ID", value: "rider_id2" },
    { title: "First Name", value: "first_name" },
    { title: "Last Name", value: "last_name" },
    { title: "Phone number", value: "phone_number" },
    { title: "Current Balance(₹)", value: "current_balance" },
  ];

  const [riderFinanceDrpdwn, setRiderFinanceDrpdwn] = useState({});

  const handleFetchDropDownList = () => {
    dispatch(
      riderFinanceAction?.riderFinanceDropdownListAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    );
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    setRiderFinanceDrpdwn({
      rider_id2: [
        ...new Set(
          data?.data
            ?.map((item) => item.rider_id2)
            ?.filter((rider_id2) => Boolean(rider_id2))
        ),
      ].map((rider_id2) => ({ rider_id2: rider_id2 })),
      first_name: [
        ...new Set(
          data?.data
            ?.map((item) => item.first_name)
            ?.filter((first_name) => Boolean(first_name))
        ),
      ].map((first_name) => ({ first_name: first_name })),
      last_name: [
        ...new Set(
          data?.data
            ?.map((item) => item.last_name)
            ?.filter((last_name) => Boolean(last_name))
        ),
      ].map((last_name) => ({ last_name: last_name })),
      phone_number: [
        ...new Set(
          data?.data
            ?.map((item) => item.phone_number)
            ?.filter((phone_number) => Boolean(phone_number))
        ),
      ].map((phone_number) => ({ phone_number: phone_number })),
    });
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  console.log(riderFinanceDrpdwn, "riderFinanceDrpdwn");

  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList();
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

  return (
    <>
      <InnerLayout
        mainHeading="Current Balance"
        navigateEnable={false}
        buttons={buttonList}
        heading_classname={"ms-4"}
      >
        {showFilter ? (
          <RiderFinanceFilter
            search={search}
            handleFilterClose={handleFilterClose}
            riderFinanceDrpdwn={riderFinanceDrpdwn}
            filter={handleSearch}
            showFilter={showFilter}
          />
        ) : (
          <></>
        )}
        <div className="row mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table">
              <thead>
                <tr className="pale_blue_bg">
                  <th
                    scope="col"
                    className={`${styles.first_list} transparent_bg`}
                  >
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>

                  {tableHeading.map((item, index) => {
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
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={riderFinanceList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items
                    // ?.filter((item) => {
                    //   if (Object.keys(search).length === 0) {
                    //     return item;
                    //   } else {
                    //     const searchValueRiderId = search.rider_id2?.toLowerCase();
                    //     const searchValueFirstName = search.first_name?.toLowerCase();
                    //     const searchValueLastName = search.last_name?.toLowerCase();
                    //     const searchValuePhoneNumber = search.phone_number?.toLowerCase();

                    //     if (
                    //       typeof item?.rider_id2 === "string" &&
                    //       item?.rider_id2.toLowerCase().includes(searchValueRiderId)
                    //     ) {
                    //       return item;
                    //     } else if (
                    //       typeof item?.first_name === "string" &&
                    //       item?.first_name.toLowerCase().includes(searchValueFirstName)
                    //     ) {
                    //       return item;
                    //     } else if (
                    //       typeof item?.last_name === "string" &&
                    //       item?.last_name.toLowerCase().includes(search.last_name?.toLowerCase())
                    //     ) {
                    //       return item;
                    //     } else if (
                    //       typeof item?.phone_number?.toString() === "string" &&
                    //       item?.phone_number.toString().toLowerCase().includes(search.phone_number?.toString()?.toLowerCase())
                    //     ) {
                    //       return item;
                    //     } else if (
                    //       typeof item?.current_balance === "number" &&
                    //       item?.current_balance.toString().includes(search?.value)
                    //     ) {
                    //       return item;
                    //     }
                    //   }
                    // })
                    ?.map((item) => (
                      <tr>
                        <th scope="row">
                          <input
                            type="checkbox"
                            className="manage_fare_checkbox ms-2"
                            onChange={checkboxChecker}
                          />
                        </th>
                        <td>
                          <NavLink
                            className={"secondary_color fs_14 fw_500"}
                            to={riderNavigateFn(item, item?.id)}
                          >
                            {item?.rider_id2 ? item?.rider_id2 : "--"}
                          </NavLink>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.first_name ? item?.first_name : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.last_name ? item?.last_name : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.phone_number ? item?.phone_number : "--"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`secondary_color fs_14 fw_500 ${
                              item?.current_balance < 0 ? "error_color" : ""
                            }`}
                          >
                            {item?.current_balance
                              ? item?.current_balance
                              : "--"}
                          </span>
                        </td>
                        <td className="">
                          <NavLink
                            className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                            to={`/rider-finance-current-balance-details/view/${item?.id}`}
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
      </InnerLayout>
    </>
  );
};

export default RiderFinanceMaintable;
