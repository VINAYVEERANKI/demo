import React, { useState, useEffect } from "react";
import InnerLayout from "../../layout/innerLayout";
import LoadAndError from "../../utilits/loadAndError";
import errorToast from "../../utilits/errorToast";
import SearchInputfield from "../../form/searchInputfield";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { riderNavigateFn, useSortableData, statusColor } from "../../helper";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import * as managePremium from "../../../redux/actions/premiumaction/defaultPremiumAction";
import moment from "moment";
import TablePaginations from "../../utilits/pagination";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const ManageTable = () => {
  const navigate = useNavigate();
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [managePremiumList, setManagePremiumList] = useState([]);
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(managePremiumList);
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  useEffect(() => {
    setLoading(true);
    dispatch(
      managePremium.managePremiumListAction(
        {
          pageno: page,
        },
        onSuccess,
        onError
      )
    );
  }, [page, search, setManagePremiumList]);

  const onSuccess = (data) => {
    setLoading(false);
    setManagePremiumList(data?.data?.data);
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

  console.log(managePremiumList, "managePremiumList");

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

  const tableHeading = [
    { title: "Zone ID", value: "main_zone_code" },
    { title: "Zone Name", value: "zone_name" },
    { title: "Premium Status", value: "zone_status" },
    { title: "Updated on", value: "updated_on" },
    { title: "Updated by", value: "updatedBy" },
    { title: "Updated by", value: "" },
    { title: "Updated by", value: "" },
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

  console.log(managePremiumList, "khjakdas");

  return (
    <>
      <InnerLayout
        mainHeading="Manage Premiums"
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
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
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
                  status={managePremiumList?.length === 0}
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
                        {item?.zoneName?.main_zone_code
                          ? item?.zoneName?.main_zone_code
                          : "--"}
                        {/* </NavLink> */}
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.zoneName?.zone_name
                            ? item?.zoneName?.zone_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${statusColor(
                            item?.zoneName?.zone_status ?? "--"
                          )} fs_14 fw_500`}
                        >
                          {item?.zoneName?.zone_status
                            ? item?.zoneName?.zone_status
                            : "--"}
                        </span>
                      </td>

                      <td>
                        <span className={`secondary_color fs_14 fw_500`}>
                          {item?.zoneName?.updated_on
                            ? moment(item?.zoneName?.updated_on).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.zoneName?.updatedBy?.user_name
                            ? item?.zoneName?.updatedBy?.user_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className={`secondary_color fs_14 fw_500`}>
                          {item?.zoneName?.updated_on
                            ? moment(item?.zoneName?.updated_on).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : "--"}
                          {/* 16/March/2022 */}
                        </span>
                      </td>
                      <td>
                        <span className={`secondary_color fs_14 fw_500`}>
                          {item?.zoneName?.updatedBy?.user_name
                            ? item?.zoneName?.updatedBy?.user_name
                            : "--"}
                          {/* First Name */}
                        </span>
                      </td>
                      <td className="">
                        <NavLink
                          className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                          to={`/driver-premium/premium/view/${item?.zoneName?.id}`}
                          state={{
                            edit: false,
                            zonename: item?.zoneName?.zone_name,
                          }}
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
        {managePremiumList?.length === 0 ? (
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
    </>
  );
};

export default ManageTable;
