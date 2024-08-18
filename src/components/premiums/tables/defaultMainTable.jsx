import React, { useState, useEffect } from "react";
import InnerLayout from "../../layout/innerLayout";
import LoadAndError from "../../utilits/loadAndError";
import errorToast from "../../utilits/errorToast";
import SearchInputfield from "../../form/searchInputfield";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { useSortableData } from "../../helper";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import * as defaultPremium from "../../../redux/actions/premiumaction/defaultPremiumAction";
import moment from "moment";
import styles from "../../../modules/manage-admins/manage-admins.module.css";

const DefaultMainTable = () => {
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [premiumDefault, setPremiumDefault] = useState(false);
  const [premiumDefaultList, setPremiumDefaultList] = useState([]);
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } =
    useSortableData(premiumDefaultList);
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

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      defaultPremium.defaultPremiumListAction(
        {
          pageno: page,
        },
        onSuccess,
        onError
      )
    );
  }, [page, search, setPremiumDefaultList]);

  const onSuccess = (data) => {
    setLoading(false);
    setPremiumDefaultList(data?.data?.data);
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

  console.log(premiumDefaultList, "premiumDefaultList");

  const tableHeading = [
    { title: "Ride Type ID", value: "ridetype_id2" },
    { title: "Ride Type Name", value: "ride_type" },
    { title: "Ride Type Status", value: "" },
    { title: "Last Updated on", value: "last_updated_on" },
    { title: "Last Updated by", value: "lastUpdatedBy" },
  ];

  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        // onClick={() => {
        //   handleFetchDropDownList();
        // }}
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
        mainHeading="Default Premiums"
        navigateEnable={false}
        buttons={buttonList}
        heading_classname={"ms-4"}
      >
        {showFilter ? (
          <></>
        ) : (
          //   <RiderFinanceFilter
          //     search={search}
          //     handleFilterClose={handleFilterClose}
          //     riderFinanceDrpdwn={riderFinanceDrpdwn}
          //     filter={handleSearch}
          //     showFilter={showFilter}
          //   />
          <></>
        )}
        <div className="row mt-3 text-nowrap">
          <div className="table_container">
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
                  <th className="transparent_bg"></th>
                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={premiumDefaultList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr>
                      <th scope="row">
                        <input
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td
                        //   {/* <NavLink */}
                        className={"secondary_color fs_14 fw_500"}
                        //   to={riderNavigateFn(item, item?.id)}
                      >
                        {item?.ride_type?.ridetype_id2
                          ? item?.ride_type?.ridetype_id2
                          : "--"}
                        {/* </NavLink> */}
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.ride_type?.ride_type
                            ? item?.ride_type?.ride_type
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`secondary_color fs_14 fw_500 ${
                            item?.ride_type?.applicable_zone_permission?.[0]
                              ?.documentation_availablity === true
                              ? "red_color"
                              : item?.ride_type?.applicable_zone_permission?.[0]
                                  ?.booking_availablity === true &&
                                "green_color"
                          }`}
                        >
                          {/* {item?.last_name ? item?.last_name : "--"} */}
                          {/* Available for Booking */}
                          {item?.ride_type?.applicable_zone_permission?.[0]
                            ?.documentation_availablity === true
                            ? "Available for documentation"
                            : item?.ride_type?.applicable_zone_permission?.[0]
                                ?.booking_availablity === true &&
                              "Available for Booking"}
                        </span>
                      </td>
                      <td>
                        <span className={`secondary_color fs_14 fw_500`}>
                          {item?.last_updated_on
                            ? moment(item?.last_updated_on).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className={`secondary_color fs_14 fw_500`}>
                          {item?.lastUpdatedBy?.user_name
                            ? item?.lastUpdatedBy?.user_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <NavLink
                          className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                          to={`/driver-premium/default/view/${item?.id}/${item.ride_type_id}`}
                          state={{
                            edit: false,
                            id: item.id,
                            ridetype: item?.ride_type?.ride_type,
                          }}
                        >
                          View
                        </NavLink>
                      </td>
                      <td>
                        <NavLink
                          className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color primary_bg view_text"
                          to={`/driver-premium/default/edit/${item?.id}/${item.ride_type_id}`}
                          state={{
                            edit: true,
                            id: item.id,
                            ridetype: item?.ride_type?.ride_type,
                          }}
                        >
                          Edit
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

export default DefaultMainTable;
