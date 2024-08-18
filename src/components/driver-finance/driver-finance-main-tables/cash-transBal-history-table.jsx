import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  driverNavigateFn,
  insertSpaces,
  removeUnderScore,
  useSortableData,
} from "../../helper";
import InnerLayout from "../../layout/innerLayout";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import SearchInputfield from "../../form/searchInputfield";
import { NavLink, useParams } from "react-router-dom";
import CashTransactionViewModal from "../driver-finance-modals/cash -transaction-view-modal";
import TablePaginations from "../../../components/utilits/pagination";
import {
  driFinCashoutTransHisListAction,
  drifinCashouttransDropdownListAction
} from "../../../redux/actions/driverFinanceAction/cashoutTransactionHistory";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import {
  driFinCashTransHisFindOneAction,
  driFinCashTransHisListAction,
  drifinCashtransDropdownListAction
} from "../../../redux/actions/driverFinanceAction/cashTransactionHistory";
import moment from "moment";
import DriverFinanceFilter from "../driver-finance-filter/driver-finance-filter";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const CashTransBalHistoryTable = ({ type = "" }) => {
  const params = useParams();
  // console.log(params,"rrrrr");
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showNewModal, setShowNewModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [driverFinanceData, setDriverFinanceData] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [driverFinanceDataList, setDriverFinanceDataList] = useState([]);
  const { items, requestSort, sortConfig } = useSortableData(
    driverFinanceDataList
  );
  const [driverDropDownList, setDriverDropDownList] = useState({});
  // const buttonList = [
  //   <>
  //     {" "}
  //     <button
  //       className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
  //       type="button"
  //       onClick={() => {
  //         setShowFilter(true);
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

  const tableHeading = [
    { title: "Driver ID", value: "driver.driver_id2", display: true, },
    { title: "Zone", value: "registered_zone_name.zone_name", display: true },
    { title: "First Name", value: "driver.first_name", display: true },
    { title: "Last Name", value: "driver.last_name", display: true },
    { title: "Phone number", value: "phone_number", display: true },
    {
      title: "Amount(₹)",
      value: "transaction_amount",
      display: type === "CashTansactionsHistory" ? true : false,
    },
    {
      title: "Transaction ID",
      value: "transaction_id",
      display: type === "CashTansactionsHistory" ? true : false,
    },
    {
      title: "Transaction Date & Time",
      value: "created_at",
      display: type === "CashTansactionsHistory" ? true : false,
    },
    {
      title: "Created by",
      value: "CreatedBy.user_name",
      display: type === "CashTansactionsHistory" ? true : false,
    },
    {
      title: "Driver Type",
      value: "driver_type",
      display: type === "cashoutBalanceHistory" ? true : false,
    },
    {
      title: "Current Balance(₹)",
      value: "current_balance",
      display: type === "cashoutBalanceHistory" ? true : false,
    },
    {
      title: "Cashout Amount(₹)",
      value: "cashout_amount",
      display: type === "cashoutBalanceHistory" ? true : false,
    },
  ];
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
  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  useEffect(() => {
    if (type === "cashoutBalanceHistory") {
      setLoading(true);
      dispatch(
        driFinCashoutTransHisListAction(
          {
            search: {
              id: "",
              driver_id2: search?.driver_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              phone_number: search?.phone_number ?? "",
              driver_type: search?.driver_type ?? "",
              registered_zone: search?.registered_zone ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "CashTansactionsHistory") {
      setLoading(true);
      dispatch(
        driFinCashTransHisListAction(
          {
            search: {
              id: "",
              driver_id2: search?.driver_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              phone_number: search?.phone_number ?? "",
              driver_type: search?.driver_type ?? "",
              registered_zone: search?.registered_zone ?? "",
              CreatedBy: search?.CreatedBy ?? "",
              transaction_id: search?.transaction_id ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, setDriverFinanceDataList]);

  const onSuccess = (data) => {
    setDriverFinanceDataList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };

  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  console.log(driverFinanceDataList, "sldfkdf");

  const [transHistory, setTransHistory] = useState([]);
  // function onClickViewFn(item, action) {
  //     dispatch(
  //       driverFinanceCashTransactionHistoryFindOneAction(
  //         {
  //           "id":,
  //         },
  //         (data) => onFetchSuccess(data, action),
  //         onFetchError
  //       )
  //     );
  // }

  function onClickFn(id) {
    // setLoading(true)
    dispatch(
      driFinCashTransHisFindOneAction(
        {
          id: id,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }

  const onFetchSuccess = (data) => {
    setShowNewModal(true);
    setTransHistory(data?.data);
    console.log(data, "Successjhfhg");
  };
  const onFetchError = (data) => {
    console.log(data);
    errorToast(data?.data);
    setError(data?.data?.data);
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
    if (type === "CashTansactionsHistory") {
      dispatch(
        drifinCashtransDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "cashoutBalanceHistory") {
      dispatch(
        drifinCashouttransDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    console.log(data?.data, "fasklada");
    setShowFilter(!showFilter);
    if (type === "CashTansactionsHistory") {
      setDriverDropDownList({
        // driver_id2: [
        //   ...new Set(
        //     data?.data
        //       ?.map((item) => item?.driver?.driver_id2)
        //       ?.filter((driver_id2) => Boolean(driver_id2))
        //   ),
        // ].map((driver_id2) => ({ driver_id2: driver_id2 })),
        driver_id2: [
          ...new Set(data?.data?.map((item) => item?.driver?.driver_id2)),
        ].map((id) => ({ driver_id2: id })),
        phone_number: [
          ...new Set(data?.data?.map((item) => item?.driver?.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
        first_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.last_name)),
        ].map((last_name) => ({ last_name: last_name })),
        driver_type: [
          ...new Set(data?.data?.map((item) => item?.driver?.driver_type)),
        ].map((driver_type) => ({ driver_type: driver_type })),
        registered_zone: [
          ...new Set(
            data?.data?.map(
              (item) => item?.driver?.registered_zone_name?.zone_name
            )
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
        CreatedBy: [
          ...new Set(data?.data?.map((item) => item?.CreatedBy?.user_name)),
        ].map((CreatedBy) => ({ CreatedBy: CreatedBy })),
        transaction_id: [
          ...new Set(data?.data?.map((item) => item?.transaction_id)),
        ].map((transaction_id) => ({ transaction_id: transaction_id })),
      });
    }
    if (type === "cashoutBalanceHistory") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(data?.data?.map((item) => item?.driver?.driver_id2)),
        ].map((id) => ({ driver_id2: id })),
        phone_number: [
          ...new Set(data?.data?.map((item) => item?.driver?.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
        first_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.last_name)),
        ].map((last_name) => ({ last_name: last_name })),
        driver_type: [
          ...new Set(data?.data?.map((item) => item?.driver?.driver_type)),
        ].map((driver_type) => ({ driver_type: driver_type })),
        registered_zone: [
          ...new Set(
            data?.data?.map(
              (item) => item?.driver?.registered_zone_name?.zone_name
            )
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
      });
    }
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  return (
    <>
      <CashTransactionViewModal
        show={showNewModal}
        handleClose={() => setShowNewModal(false)}
        transHistory={transHistory}
      />
      <InnerLayout
        mainHeading={type ? insertSpaces(type) : "--"}
        navigateEnable={false}
        buttons={buttonList}
        heading_classname={"ms-4"}
      >
        {showFilter ? (
          <DriverFinanceFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            // setShowFilter={setShowFilter}
            driverDropDownList={driverDropDownList}
            setShowFilter={setShowFilter}
            type={type}
          />
        ) : (
          <></>
        )}
        <div className="row mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table text-nowrap">
              <thead>
                <tr className="pale_blue_bg">
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
                  status={driverFinanceDataList?.length === 0}
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
                      <td>
                        <NavLink
                          className={"secondary_color fs_14 fw_500"}
                          to={driverNavigateFn(item?.driver, item?.driver?.id)}
                        >
                          {item?.driver?.driver_id2 ?? "--"}
                        </NavLink>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver?.registered_zone_name?.zone_name
                            ? item?.driver?.registered_zone_name?.zone_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver.first_name
                            ? item?.driver.first_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver.last_name
                            ? item?.driver.last_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver.phone_number
                            ? item?.driver.phone_number
                            : "--"}
                        </span>
                      </td>
                      {type === "CashTansactionsHistory" ? (
                        <>
                          {/* <td>
                            <span className="secondary_color fs_14 fw_500">
                            {item?.transaction_amount
                            ? item?.transaction_amount
                            : "--"}
                            </span>
                          </td> */}
                          <td>
                            <span
                              className={`secondary_color fs_14 fw_500 ${item?.current_balance < 0 ? "error_color" : ""
                                }`}
                            >
                              {item?.transaction_amount
                                ? item?.transaction_amount
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.transaction_id
                                ? item?.transaction_id
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.created_at
                                ? moment(item?.created_at).format(
                                  "DD-MM-YYYY,HH:MM"
                                )
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.CreatedBy.user_name
                                ? item?.CreatedBy.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "cashoutBalanceHistory" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {/* {item?.driver?.driver_type ? item?.driver?.driver_type : "--"} */}
                              {item?.driver?.driver_type
                                ? removeUnderScore(item?.driver?.driver_type)
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver?.current_balance
                                ? item?.driver?.current_balance
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.cashout_amount
                                ? item?.cashout_amount
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "cashoutBalanceHistory" ? (
                        <>
                          <td className="">
                            <NavLink
                              className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                              to={`/driver-finance-cashout-balance-details/${item?.driver_id}`}
                            >
                              View
                            </NavLink>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}

                      {type === "CashTansactionsHistory" ? (
                        <>
                          <td>
                            <span
                              className="fw_500 border_none border_radius fs_13 text-decoration-none blue_color_bg white_color px-3 py-1 cursor_pointer"
                              // onClick={() => setShowNewModal(true)}
                              onClick={() => onClickFn(item?.id)}
                            >
                              View
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {/* {type==="CashTansactionsHistory"?(<>
                    <div
                    onClick={()=>setShowNewModal(true)}
                    >
                    
                      <NavLink
                          className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                          to={`/driver-finance-cash-transaction-details`}
                          
                        >
                          View
                        </NavLink>
                        </div>
                    </>):(<></>)} */}
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

export default CashTransBalHistoryTable;
