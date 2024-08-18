import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InnerLayout from "../../layout/innerLayout";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import SearchInputfield from "../../form/searchInputfield";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  driverNavigateFn,
  insertSpaces,
  removeUnderScore,
  useSortableData,
} from "../../helper";
import CreateCashTransactionModal from "../driver-finance-modals/Create-transaction-modal";
import TablePaginations from "../../utilits/pagination";
import {
  driFinCurBalListAction,
  drifinCurbalDropdownListAction
} from "../../../redux/actions/driverFinanceAction/currentBalance";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import {
  driFinCreateCashTransListAction,
  drifinCreateCashDropdownListAction
} from "../../../redux/actions/driverFinanceAction/createCashTransaction";
import {
  driFinSucesCashoutTransHisListAction,
  drifinSucescashDropdownListAction
} from "../../../redux/actions/driverFinanceAction/successfulCashout";
import DriverFinanceFilter from "../driver-finance-filter/driver-finance-filter";
import CashPaymentModal from "../driver-finance-modals/cashPaymentModal";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const DriverFinanaceMainTable = ({ type = "" }) => {
  const [cashPaymentShow, setCashPaymentShow] = useState(false);
  const handleCashPaymentClose = () => setCashPaymentShow(false);
  const handleCashPaymentShow = () => setCashPaymentShow(true);

  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [driverFinanceDataList, setDriverFinanceDataMainList] = useState([]);
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(
    driverFinanceDataList
  );
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [driverDropDownList, setDriverDropDownList] = useState({});
  const [reload, setReload] = useState(false);
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

  console.log(type, "type");

  const tableHeading = [
    { title: "Driver ID", value: "driver_id2", display: true },
    { title: "Zone", value: "registered_zone_name.zone_name", display: true },
    { title: "First Name", value: "first_name", display: true },
    { title: "Last Name", value: "last_name", display: true },
    { title: "Driver Type", value: "driver_type", display: type === "successfulCashout" ? false : true },
    { title: "Phone number", value: "phone_number", display: true },
    { title: "Current Balance(₹)", value: "current_balance", display: true },
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
  const [driverId, setDriverId] = useState(null);
  useEffect(() => {
    if (type === "CurrentBalance") {
      setLoading(true);
      dispatch(
        driFinCurBalListAction(
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
    } else if (type === "createCashTransaction") {
      setLoading(true);
      // createCashTrnsactionList()
      dispatch(
        driFinCreateCashTransListAction(
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
    } else if (type === "successfulCashout") {
      setLoading(true);
      dispatch(
        driFinSucesCashoutTransHisListAction(
          {
            search: {
              id: "",
              driver_id2: search?.driver_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              phone_number: search?.phone_number ?? "",
              registered_zone: search?.registered_zone ?? "",
              driver_type: search?.driver_type ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, reload]);

  const onSuccess = (data) => {
    setDriverFinanceDataMainList(data?.data?.data);
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

  console.log(driverFinanceDataList, "kjdsfhask");

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
    if (type === "CurrentBalance") {
      dispatch(
        drifinCurbalDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "createCashTransaction") {
      dispatch(
        drifinCreateCashDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "successfulCashout") {
      dispatch(
        drifinSucescashDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };
  const onDropDownListSuccess = (data) => {
    console.log(data?.data, "fasklada");
    setShowFilter(!showFilter);
    if (type === "CurrentBalance") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(data?.data?.map((item) => item.driver_id2)),
        ].map((id) => ({ driver_id2: id })),
        phone_number: [
          ...new Set(data?.data?.map((item) => item.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
        first_name: [
          ...new Set(data?.data?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),
        driver_type: [
          ...new Set(data?.data?.map((item) => item.driver_type)),
        ].map((driver_type) => ({ driver_type: driver_type })),
        registered_zone: [
          ...new Set(
            data?.data?.map((item) => item?.registered_zone_name?.zone_name)
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
      });
    } else if (type === "createCashTransaction") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(data?.data?.map((item) => item.driver_id2)),
        ].map((id) => ({ driver_id2: id })),
        phone_number: [
          ...new Set(data?.data?.map((item) => item.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),
        first_name: [
          ...new Set(data?.data?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),
        driver_type: [
          ...new Set(data?.data?.map((item) => item.driver_type)),
        ].map((driver_type) => ({ driver_type: driver_type })),
        registered_zone: [
          ...new Set(
            data?.data?.map((item) => item?.registered_zone_name?.zone_name)
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
      });
    } else if (type === "successfulCashout") {
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
      <CashPaymentModal
        cashPaymentShow={cashPaymentShow}
        handleCashPaymentClose={handleCashPaymentClose}
        driverData={driverId}
        title={"What is the purpose of this cash payment?"}
        cashPaymentType="current_balance"
        setReload={setReload}
        reload={reload}
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
            driverDropDownList={driverDropDownList}
            type={type}
            setShowFilter={setShowFilter}
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
                  {tableHeading.filter(
                    (item) => item?.display === true
                  )?.map((item, index) => {
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
                      {type === "successfulCashout" ? (
                        <>
                          <td>
                            <NavLink
                              className={"secondary_color fs_14 fw_500"}
                              to={driverNavigateFn(
                                item?.driver,
                                item?.driver?.id
                              )}
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
                              {item?.driver?.first_name
                                ? item?.driver?.first_name
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver?.last_name
                                ? item?.driver?.last_name
                                : "--"}
                            </span>
                          </td>

                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver?.phone_number
                                ? item?.driver?.phone_number
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
                        </>
                      ) : (
                        <>
                          <td>
                            <NavLink
                              className={"secondary_color fs_14 fw_500"}
                              to={driverNavigateFn(item, item?.id)}
                            >
                              {item?.driver_id2 ?? "--"}
                            </NavLink>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.registered_zone_name?.zone_name
                                ? item?.registered_zone_name?.zone_name
                                : "--"}
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
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver_type
                                ? removeUnderScore(item?.driver_type)
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.phone_number ? item?.phone_number : "--"}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`secondary_color fs_14 fw_500 ${item?.current_balance < 0 ? "error_color" : ""
                                }`}
                            >
                              {item?.current_balance
                                ? item?.current_balance
                                : "--"}
                            </span>
                          </td>
                        </>
                      )}

                      {type === "CurrentBalance" ? (
                        <>
                          <td>
                            <button
                              className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 white_color blue_color_bg"
                              onClick={() =>
                                Navigate(
                                  `/driver-finance-current-balance-details/${item?.id}`
                                )
                              }
                            >
                              View
                            </button>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}

                      {type === "createCashTransaction" ? (
                        <>
                          <td className="">
                            <button
                              className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                              onClick={() => {
                                handleCashPaymentShow();
                                setDriverId(item);
                              }}
                            >
                              Create Cash Transaction
                            </button>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "successfulCashout" ? (
                        <>
                          <td className={`${styles.last_list} transparent_bg`}>
                            <NavLink
                              className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                              to={`/driver-finance-successful-cashout-details/${item?.driver_id}`}
                            >
                              View
                            </NavLink>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {/* <th className={`${styles.last_list} transparent_bg`}></th> */}
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

export default DriverFinanaceMainTable;
