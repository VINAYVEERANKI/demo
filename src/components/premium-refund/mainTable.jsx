import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchInputfield from "../form/searchInputfield";
import {
  formatAmount,
  formatDateTime,
  useSortableData,
} from "../helper";
import Viewbtn from "../utilits/buttons/viewbtn";
import errorToast from "../utilits/errorToast";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import TablePaginations from "../utilits/pagination";
import "../../modules/refund/refund.css";
import PremiumPendingRefundInitiate from "./initiateModal";
import PremiumRefundViewModal from "./viewModal";
import {
  premiumCancelledRefundListAction,
  premiumCancelledRefundViewAction,
  premiumPendingRefundListAction,
  premiumPendingRefundViewAction,
  premiumSuccessFulRefundListAction,
  premiumSuccessFulRefundViewAction,
} from "../../redux/actions/premiumRefundAction";

const PremiumRefundMainTable = ({ type }) => {
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [pendingRefundList, setPendingRefundList] = useState([]);
  const [refundObject, setRefundObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [pendingTable, setPendingTable] = useState(false);
  const [driverDropDownList, setDriverDropDownList] = useState({});

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
    if (type === "pendingRefund") {
      setLoading(true);
      dispatch(
        premiumPendingRefundListAction(
          {
            page_no: page,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "successRefund") {
      setLoading(true);
      dispatch(
        premiumSuccessFulRefundListAction(
          {
            page_no: page,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "cancelledRefund") {
      setLoading(true);
      dispatch(
        premiumCancelledRefundListAction(
          {
            page_no: page,
          },
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, pendingTable]);
  const onSuccess = (data) => {
    console.log(data, "ksjdadasda");
    setLoading(false);
    setPendingRefundList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });

    setError(false);
  };
  const onError = (data) => {
    console.log(data, "ksjdadasda");
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
    setPendingTable(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  console.log(pendingRefundList, "aflaslf");

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(pendingRefundList);

  const [refundViewShow, setRefundViewShow] = useState(false);
  const handleRefundViewShow = () => setRefundViewShow(true);
  const handleRefundViewClose = () => setRefundViewShow(false);

  const [refundInitiateShow, setRefundInitiateShow] = useState(false);
  const handleRefundInitiateShow = () => setRefundInitiateShow(true);
  const handleRefundInitiateClose = () => setRefundInitiateShow(false);

  //   Driver ID               Driver ID                 Driver ID
  //   Premium                 Premium                   Premium
  //   Plan                    Plan                      Plan
  //   Premium Amount          Refund Amount             Refund Amount
  // Amount To Be Refund       Transaction Mode(Premium) Transaction Mode(Premium)
  // Transaction Mode(Premium) Refund Type               Created At
  // Transaction Mode          Tranaction ID             Cancelled By
  // Created At                Created At
  //                           Resolved By

  const tableHeadingList = [
    { title: "Driver ID", value: "booking_id2", display: true },
    { title: "Premium", value: "booking_id2", display: true },
    { title: "Plan", value: "booking_id2", display: true },
    {
      title: "Premium Amount",
      value: "booking_id2",
      display: type === "pendingRefund",
    },
    {
      title: "Amount To Be Refund",
      value: "booking_id2",
      display: type === "pendingRefund",
    },

    {
      title: "Refund Amount",
      value: "booking_id2",
      display: type !== "pendingRefund",
    },
    { title: "Transaction Mode(Premium)", value: "booking_id2", display: true },

    {
      title: "Refund Type",
      value: "booking_id2",
      display: type === "successRefund",
    },
    {
      title: "Tranaction ID",
      value: "booking_id2",
      display: type === "successRefund",
    },
    {
      title: "Transaction Mode",
      value: "booking_id2",
      display: type === "pendingRefund",
    },
    { title: "Created At", value: "booking_id2", display: true },
    {
      title: "Resolved By",
      value: "booking_id2",
      display: type === "successRefund",
    },
    {
      title: "Cancelled By",
      value: "booking_id2",
      display: type === "cancelledRefund",
    },
  ];

  const [pendingRefundView, setPendingRefundView] = useState([]);
  function onClickViewFn(item, action) {
    console.log(item, "jadaksdada");
    if (type === "pendingRefund") {
      dispatch(
        premiumPendingRefundViewAction(
          {
            refund_id: item?.id,
          },
          (data) => onFetchSuccess(data, action),
          onFetchError
        )
      );
    } else if (type === "successRefund") {
      dispatch(
        premiumSuccessFulRefundViewAction(
          {
            refund_id: item?.id,
          },
          (data) => onFetchSuccess(data, action),
          onFetchError
        )
      );
    } else if (type === "cancelledRefund") {
      dispatch(
        premiumCancelledRefundViewAction(
          {
            refund_id: item?.id,
          },
          (data) => onFetchSuccess(data, action),
          onFetchError
        )
      );
    }
  }

  const onFetchSuccess = (data, action) => {
    if (action === "initiatePundingRefund") {
      handleRefundInitiateShow();
    } else {
      handleRefundViewShow();
    }
    setPendingRefundView(data?.data);
    console.log("Success");
    console.log(data);
  };
  const onFetchError = (data) => {
    console.log(data);
    errorToast(data?.data);
    setError(data?.data);
  };

  console.log(pendingRefundList, "asdkajs");

  return (
    <>
      <PremiumPendingRefundInitiate
        refundInitiateShow={refundInitiateShow}
        handleRefundInitiateClose={handleRefundInitiateClose}
        pendingRefundView={pendingRefundView}
        pendingTable={pendingTable}
        setPendingTable={setPendingTable}
      />
      <PremiumRefundViewModal
        refundViewShow={refundViewShow}
        handleRefundViewClose={handleRefundViewClose}
        refundDataView={pendingRefundView}
        type={type}
      />

      <div className="refund_container p-3 pb-4 mx-3 my-4">
        <div className="d-flex justify-content-between pt-1">
          <div>
            <span className="fs_26 primary_color fw_600">
              {type === "pendingRefund"
                ? "Premium Refunds"
                : type === "successRefund"
                ? "Successful Premium Refunds"
                : type === "cancelledRefund"
                ? "Cancelled Premium Refunds"
                : ""}
            </span>
          </div>
        </div>

        <div className="mt-4 table_container">
          {loading && <LoadingSpinnerTable />}
          <table className="table  ">
            <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="ongoing_heading_first_list">
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th>
                {tableHeadingList
                  ?.filter((item) => item?.display === true)
                  ?.map((item, index) => {
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

                <th className="ongoing_heading_last_list"></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg text-nowrap">
              <LoadAndError
                loader={loading}
                error={error}
                status={pendingRefundList?.length === 0}
              >
                {items?.map((item) => (
                  <tr
                    key={item?.id}
                    className={item?.id === checkList ? "light_blue_bg" : null}
                  >
                    <></>
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        checked={checkList === item?.id}
                        className="manage_fare_checkbox ms-2"
                        onChange={checkboxChecker}
                      />
                    </th>

                    <td>
                      <span className={"secondary_color fs_14"}>
                        {item?.driver?.driver_id2 ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className={"secondary_color fs_14"}>
                        {item?.premium_type ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className={"secondary_color fs_14"}>
                        {item?.plan_type ?? "--"}
                      </span>
                    </td>
                    {type === "pendingRefund" && (
                      <>
                        <td>
                          <span className={"secondary_color fs_14"}>
                            {formatAmount(item?.premium_amount) ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className={"secondary_color fs_14"}>
                            {formatAmount(item?.amount_to_be_refunded) ?? "--"}
                          </span>
                        </td>
                      </>
                    )}

                    {type === "successRefund" &&
                      (item?.refund_type === "RazorpayRefund" ? (
                        <td>
                          <span className={"secondary_color fs_14"}>
                            {item?.razorpay_refund_amount ?? "--"}
                          </span>
                        </td>
                      ) : (
                        <td>
                          <span className={"secondary_color fs_14"}>
                            {item?.refunded_amount ?? "--"}
                          </span>
                        </td>
                      ))}

                    {type === "cancelledRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {formatAmount(item?.amount_to_be_refunded) ?? "--"}
                        </span>
                      </td>
                    )}
                    <td>
                      <span className={"secondary_color fs_14"}>
                        {item?.transaction_mode_premium ?? "--"}
                      </span>
                    </td>

                    {type === "pendingRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.transaction_mode ?? "--"}
                        </span>
                      </td>
                    )}

                    {type === "successRefund" && (
                      <>
                        <td>
                          <span className={"secondary_color fs_14"}>
                            {item?.refund_type ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className={"secondary_color fs_14"}>
                            {item?.transaction_id ?? "--"}
                          </span>
                        </td>
                      </>
                    )}
                    <td>
                      <span className={"secondary_color fs_14"}>
                        {formatDateTime(item?.created_at) ?? "--"}
                      </span>
                    </td>

                    {type === "successRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {"resovled by" ?? "--"}
                        </span>
                      </td>
                    )}
                    {type === "cancelledRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {"cancelled by" ?? "--"}
                        </span>
                      </td>
                    )}

                    <td className="">
                      <Viewbtn
                        viewfn={() => {
                          onClickViewFn(
                            item,
                            type === "pendingRefund"
                              ? "viewPundingRefund"
                              : type === "successRefund"
                              ? "viewSuccessRefund"
                              : type === "cancelledRefund"
                              ? "viewCancelledRefund"
                              : ""
                          );
                        }}
                      />
                      {item?.status === "Active" &&
                        type === "pendingRefund" && (
                          <button
                            className="border_none border_radius_5px fs_13 me-4 fw_500 px-3 white_color primary_bg"
                            onClick={() => {
                              onClickViewFn(
                                item,
                                type === "pendingRefund"
                                  ? "initiatePundingRefund"
                                  : ""
                              );
                            }}
                          >
                            Initiate
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
        {pendingRefundList?.length === 0 ? (
          <></>
        ) : (
          <TablePaginations
            paginate={handlePagination}
            currentPage={page}
            pageData={pageData}
          />
        )}
      </div>
    </>
  );
};

export default PremiumRefundMainTable;
