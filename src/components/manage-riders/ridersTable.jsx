import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BalanceStatus,
  CharacterHidder,
  formatAmount,
  formatDateTime,
  insertSpaces,
  useSortableData,
} from "../helper";
import SearchInputfield from "../form/searchInputfield";
import { useDispatch } from "react-redux";
import * as riderAction from "../../redux/actions/manageRidersAction";
import errorToast from "../utilits/errorToast";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import TablePaginations from "../utilits/pagination";
import InnerLayout from "../layout/innerLayout";
import moment from "moment";
import RiderFilter from "./riderFilters";
import usePermissions from "../usePermissionChecker";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const RidersTable = ({ type = "" }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    manageRiders: "manage_riders",
    blockedRiders: "blocked_riders",
    deletedRiders: "deleted_riders",
    permanentlyDeletedRiders: "permanentely_deleted_riders",
  };
  const permission = pagePermissions[type];
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [riderList, setRiderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [riderDropDownList, setRiderDropDownList] = useState({});

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(riderList);

  const handleFilterClose = () => {
    setShowFilter(false);
  };
  const handleFilterOpen = () => {
    setShowFilter(true);
  };

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
    if (type === "manageRiders") {
      setLoading(true);
      dispatch(
        riderAction.riderListAction(
          {
            search: {
              rider_id2: search?.rider_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              email: search?.email ?? "",
              phone_number: search?.phone_number ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "blockedRiders") {
      setLoading(true);
      dispatch(
        riderAction.blockedRiderListAction(
          {
            search: {
              id: "",
              rider_id: search?.rider_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              email: search?.email ?? "",
              phone_number: search?.phone_number ?? "",
              blocked_by: search?.blocked_by ?? "",
              blocked_at: search?.blocked_at ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "deletedRiders") {
      setLoading(true);
      dispatch(
        riderAction.deletedRiderListAction(
          {
            search: {
              rider_id2: search?.rider_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              phone_number: search?.phone_number ?? "",
              email: search?.email ?? "",
              deleted_at:search?.deleted_at ?? "",
              deleted_by: search?.deleted_by ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "permanentlyDeletedRiders") {
      setLoading(true);
      dispatch(
        riderAction.permanentlyDelRiderListAction(
          {
            search: {
              rider_id2: search?.rider_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              permanently_deleted_on: search?.permanently_deleted_on,
              permanentlyDeletedBy: search?.permanentlyDeletedBy,
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
    setLoading(false);
    setRiderList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
  };

  const handleFetchDropDownList = () => {
    if (type === "manageRiders") {
      dispatch(
        riderAction?.riderdropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "blockedRiders") {
      dispatch(
        riderAction?.blockedRiderdropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "deletedRiders") {
      dispatch(
        riderAction?.delRiderdropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
    else if (type==="permanentlyDeletedRiders"){
      dispatch(
        riderAction?.perdelRiderdropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    if (type === "manageRiders") {
      setRiderDropDownList({
        rider_id2: [
          ...new Set(
            data?.data
              ?.map((item) => item.rider_id2)
              ?.filter((rider_id2) => Boolean(rider_id2))
          ),
        ].map((id) => ({ rider_id2: id })),
        first_name: [
          ...new Set(data?.data?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),
        email: [...new Set(data?.data?.map((item) => item.email))].map(
          (email) => ({ email: email })
        ),
        phone_number: [
          ...new Set(data?.data?.map((item) => item.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
      });
    } else if (type === "blockedRiders") {
      setRiderDropDownList({
        rider_id2: [...new Set(data?.data?.map((item) => item.rider_id2))].map(
          (id) => ({ rider_id2: id })
        ),

        first_name: [
          ...new Set(data?.data?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),

        email: [...new Set(data?.data?.map((item) => item.email))].map(
          (email) => ({ email: email })
        ),
        phone_number: [
          ...new Set(data?.data?.map((item) => item.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
        blocked_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.blocked_at)
              ?.filter((blocked_at) => Boolean(blocked_at))
          ),
        ].map((blocked_at) => ({ blocked_at: blocked_at })),
        blocked_by: [
          ...new Set(
            data?.data
              ?.map((item) => item.blockedBy?.user_name)
              ?.filter((blocked_by) => Boolean(blocked_by))
          ),
        ].map((blocked_by) => ({ blocked_by: blocked_by })),
      });
    } else if (type === "deletedRiders") {
      setRiderDropDownList({
        rider_id2: [...new Set(data?.data?.map((item) => item.rider_id2))].map(
          (id) => ({ rider_id2: id })
        ),
        phone_number: [
          ...new Set(data?.data?.map((item) => item.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
        email: [...new Set(data?.data?.map((item) => item.email))].map(
          (email) => ({ email: email })
        ),
        first_name: [
          ...new Set(data?.data?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),
        deleted_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.deleted_at)
              ?.filter((deleted_at) => Boolean(deleted_at))
          ),
        ].map((deleted_at) => ({ deleted_at: moment(deleted_at).format('DD-MM-YYYY') })),
        deleted_by: [
          ...new Set(
            data?.data
              ?.map((item) => item.deletedBy?.user_name)
              ?.filter((deleted_by) => Boolean(deleted_by))
          ),
        ].map((deleted_by) => ({ deleted_by: deleted_by })),
      });
    } 
    else if (type === "permanentlyDeletedRiders") {
      setRiderDropDownList({
        rider_id2: [...new Set(data?.data?.map((item) => item.rider_id2))].map(
          (id) => ({ rider_id2: id })
        ),
        first_name: [
          ...new Set(data?.data?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),
        permanently_deleted_on: [
          ...new Set(
            data?.data
              ?.map((item) => item.permanently_deleted_on)
              ?.filter((permanently_deleted_on) => Boolean(permanently_deleted_on))
          ),
        ].map((permanently_deleted_on) => ({ permanently_deleted_on: moment(permanently_deleted_on).format('YYYY-MM-DD') })),
       permanentlyDeletedBy: [
          ...new Set(
            data?.data
              ?.map((item) => item.permanentlyDeletedBy?.user_name)
              ?.filter((permanently_deleted_on) => Boolean(permanently_deleted_on))
          ),
        ].map((permanentlyDeletedBy) => ({permanentlyDeletedBy:permanentlyDeletedBy })),
      });
    }
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "--") if (page > 0) setPage((prev) => prev - 1);
  }

  const tableHeading = [
    { title: "Rider ID", value: "rider_id2" },
    { title: "First Name", value: "first_name" },
    { title: "Last Name", value: "last_name" },
    { title: "Email ID", value: "email" },
    { title: "Country Code", value: "country_code" },
    { title: "Phone number", value: "phone_number" },
    { title: "Rating", value: "ratings" },
    { title: "Status", value: "rider_status" },
    { title: "Current Balance(₹)", value: "current_balance" },
  ];

  if (type === "blockedRiders") {
    const countryCodeIndex = tableHeading.findIndex(
      (header) => header.title === "Country Code"
    );
    if (countryCodeIndex >= 0) {
      tableHeading.splice(countryCodeIndex, 1);
    }
    tableHeading.push(
      { title: "Blocked At", value: "blocked_at" },
      { title: "Blocked By", value: "blockedBy.user_name" }
    );
  }

  if (type === "deletedRiders") {
    tableHeading.splice(6, 3);
    tableHeading?.push(
      { title: "Deleted on", value: "deleted_at" },
      { title: "Deleted by", value: "deletedBy.user_name" }
    );
  }

  if (type === "permanentlyDeletedRiders") {
    tableHeading?.splice(3, 6);
    tableHeading?.push(
      { title: "Permanently deleted on", value: "permanently_deleted_on" },
      {
        title: "Permanently deleted by",
        value: "permanently_deleted_by.user_name",
      }
    );
  }

  const buttonList = [
    canRead(permission) && (
      <>
        {" "}
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
      </>
    ),
  ];

  return (
    <>
      <InnerLayout
        mainHeading={type ? insertSpaces(type) : "--"}
        navigateEnable={false}
        backBtnClassName="ms-4"
        buttons={buttonList}
      >
        {showFilter ? (
          <RiderFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            riderDropDownList={riderDropDownList}
            type={type}
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

                  {tableHeading?.map((item, index) => {
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
                  status={riderList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr key={item.id} className={"light_blue_bg text-nowrap"}>
                      <th scope="row">
                        <input
                          id={item?.id}
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                        />
                      </th>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.rider_id2 ? item?.rider_id2 : "--"}
                        </span>
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
                      {type === "permanentlyDeletedRiders" ? (
                        <></>
                      ) : (
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.email
                              ? CharacterHidder(item.email, "email")
                              : "--"}
                          </span>
                        </td>
                      )}

                      {type === "blockedRiders" ||
                      type === "permanentlyDeletedRiders" ? (
                        <></>
                      ) : (
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.country_code ? item?.country_code : "--"}
                          </span>
                        </td>
                      )}
                      {type === "permanentlyDeletedRiders" ? (
                        <></>
                      ) : (
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.phone_number
                              ? CharacterHidder(item?.phone_number)
                              : "--"}
                          </span>
                        </td>
                      )}

                      {type === "deletedRiders" ||
                      type === "permanentlyDeletedRiders" ? (
                        <></>
                      ) : (
                        <>
                          <td>
                            <span className="orange_color fs_14 fw_500 d-flex  align-items-center gap-1 ">
                              <i className="ri-star-s-fill "></i>
                              {item?.ratings
                                ? parseFloat(item?.ratings).toFixed(1)
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`${
                                item?.rider_status === true
                                  ? "green_color "
                                  : "red_color "
                              }fw_600 fs_14
                            `}
                            >
                              {item?.rider_status === true
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </td>
                          <td className="ps-5">
                            <span
                              className={`${BalanceStatus(
                                item?.current_balance
                              )}  fs_14 fw_500`}
                            >
                              {formatAmount(item?.current_balance)}
                            </span>
                          </td>
                        </>
                      )}

                      {type === "blockedRiders" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.blocked_at)}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.blockedBy?.user_name ?? "--"}
                            </span>
                          </td>
                        </>
                      ) : type === "deletedRiders" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.deleted_at)}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.deletedBy?.user_name ?? "--"}
                            </span>
                          </td>
                        </>
                      ) : type === "permanentlyDeletedRiders" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.permanently_deleted_on
                                ? moment(item?.permanently_deleted_on).format(
                                    "DD-MM-YYYY, HH:mm"
                                  )
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.permanentlyDeletedBy?.user_name ?? "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}

                      <td className="">
                        <NavLink
                          className="border_none border_radius fs_13  fw_500 px-3 white_color blue_color_bg text-decoration-none py-1 view_text"
                          to={`rider-history/${item?.id}`}
                          state={{
                            id: item?.id,
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
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      </InnerLayout>
    </>
  );
};

export default RidersTable;
