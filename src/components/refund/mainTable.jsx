import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchInputfield from "../form/searchInputfield";
import {
  formatAmount,
  navigationFn,
  removeUnderScore,
  riderNavigateFn,
  useSortableData,
} from "../helper";
import PendingRefundInitiate from "./pending-refund/pending-refund-initiate";
import PendingRefundView from "./pending-refund/pending-refund-view";
import Viewbtn from "../utilits/buttons/viewbtn";
import errorToast from "../utilits/errorToast";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import TablePaginations from "../utilits/pagination";
import {
  PendingRefundListAction,
  PendingRefundViewAction,
  pendRefDropdownListAction,
} from "../../redux/actions/pendingRefundAction";
import "../../modules/refund/refund.css";
import {
  SuccessFulRefundListAction,
  SuccessFulRefundViewAction,
  sucesRefDropdownListAction,
} from "../../redux/actions/successfulRefundAction";
import SuccessfulRefundViewModal from "./successful-refund/successful-refund-view-modal";
import {
  CancelledRefundListAction,
  CancelledRefundViewAction,
  cancelRefDropdownListAction,
} from "../../redux/actions/cancelledRefundAction";
import CancelledRefundViewModal from "./cancelled-refund/cancelled-refund-view-modal";
import { NavLink } from "react-router-dom";
import RefundFilter from "./refund-Filter/refund-Filter";
import usePermissions from "../usePermissionChecker";

const RefundMainTable = ({ type }) => {
  const { canRead, canWrite } = usePermissions();
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
    setLoading(true);
    if (type === "pendingRefund") {
      dispatch(
        PendingRefundListAction(
          {
            search: {
              booking_id2: search?.booking_id2,
              rider_id2: search?.rider_id2,
              payment_status: search?.payment_status,
              PaymentMethod: search?.payment_method,
              cancelled_at: search?.cancelled_at,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
    else if (type === "successRefund") {
      dispatch(
        SuccessFulRefundListAction(
          {
            search: {
              booking_id2: search?.booking_id2,
              rider_id2: search?.rider_id2,
              payment_status: search?.payment_status,
              payment_method: search?.payment_method,
              refund_type: search?.refund_type,
              created_at: search?.created_at,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
    else if (type === "cancelledRefund") {
      dispatch(
        CancelledRefundListAction(
          {
            search: {
              booking_id2: search?.booking_id2,
              rider_id2: search?.rider_id2,
              payment_status: "",
              PaymentMethod: "",
              created_at: search?.created_at,
              created_by: search?.created_by,
              cancelled_at: search?.cancelled_at,
              cancelled_by: search?.cancelled_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, pendingTable]);
  const onSuccess = (data) => {
    setPendingRefundList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setLoading(false);
    setError(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
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

  const [successfulRefundView, setSuccessfulRefundView] = useState(false);
  const handleSuccessfulRefundViewClose = () => setSuccessfulRefundView(false);
  const handleSuccessfulRefundView = () => setSuccessfulRefundView(true);

  const [cancelledRefundViewShow, setCancelledRefundViewShow] = useState(false);
  const handleCancelledRefundViewClose = () =>
    setCancelledRefundViewShow(false);
  const handleCancelledRefundViewShow = () => setCancelledRefundViewShow(true);

  const tableHeadingList = [
    { title: "Booking ID", value: "booking_id2", display: true },
    { title: "Rider ID", value: "rider_id2", display: true },

    {
      title: "Previous Final Fare (₹)",
      value: "booking.rider_billing.final_fare",
      display: type === "pendingRefund" ? true : false,
    },
    {
      title: "Final Fare (₹)",
      value: "booking.rider_payment.total_trip_fare_adjusted_amount",
      display: type === "pendingRefund" ? true : false,
    },
    {
      title: "Amount To Be Refunded (₹)",
      value: "booking.rider_payment.amount_to_be_refunded",
      display: type === "pendingRefund" ? true : false,
    },
    {
      title: "Refund Amount (₹)",
      value: "current_balance_refunded_amount",
      display: type === "successRefund" ? true : false,
    },
    {
      title: "Transaction Type",
      value: "booking.rider_payment.payment_method",
      display: type === "cancelledRefund" ? false : true,
    },
    {
      title: "Rider Payment Status",
      value: "booking.rider_payment.payment_status",
      display: type === "cancelledRefund" ? false : true,
    },
    {
      title: "Refund Type",
      value: "refund_type",
      display: type === "pendingRefund" ? false : true,
    },
    { title: "Created At", value: "created_at", display: true },
    {
      title: "Resolved By",
      value: "refunded_by",
      display: type === "successRefund" ? true : false,
    },
    {
      title: "Created By",
      value: "created_by",
      display: type === "cancelledRefund" ? true : false,
    },
    {
      title: "Cancelled At",
      value: "booking.rider_payment.refund_cancelled_at",
      display: type === "cancelledRefund" ? true : false,
    },
    {
      title: "Cancelled By",
      value: "booking.rider_payment.refund_cancelled_by",
      display: type === "cancelledRefund" ? true : false,
    },
  ];

  const [pendingRefundView, setPendingRefundView] = useState([]);
  function onClickViewFn(item, action) {
    console.log(item);
    if (type === "pendingRefund") {
      dispatch(
        PendingRefundViewAction(
          {
            refund_id: item?.id,
          },
          (data) => onFetchSuccess(data, action),
          onFetchError
        )
      );
    } else if (type === "successRefund") {
      dispatch(
        SuccessFulRefundViewAction(
          {
            refund_id: item?.id,
          },
          (data) => onFetchSuccess(data, action),
          onFetchError
        )
      );
    } else if (type === "cancelledRefund") {
      dispatch(
        CancelledRefundViewAction(
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
    if (action === "viewPundingRefund") {
      handleRefundViewShow();
    } else if (action === "initiatePundingRefund") {
      handleRefundInitiateShow();
    } else if (action === "viewSuccessRefund") {
      handleSuccessfulRefundView();
    } else if (action === "viewCancelledRefund") {
      handleCancelledRefundViewShow();
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
    if (type === "successRefund") {
      dispatch(
        sucesRefDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
    else if (type === "pendingRefund") {
      dispatch(
        pendRefDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
    else if (type === "cancelledRefund") {
      dispatch(
        cancelRefDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };
  const onDropDownListSuccess = (data) => {
    console.log(data?.data, "fasklada");
    setShowFilter(!showFilter);
    if (type === "successRefund") {
      setDriverDropDownList({
        booking_id2: [
          ...new Set(
            data?.data?.dropDownBookingId
              ?.map((item) => item.booking_id2)
              ?.filter((booking_id2) => Boolean(booking_id2))
          ),
        ].map((booking_id2) => ({ booking_id2: booking_id2 })),
        rider_id2: [
          ...new Set(
            data?.data?.dropDownRiderId
              ?.map((item) => item.rider_id2)
              ?.filter((rider_id2) => Boolean(rider_id2))
          ),
        ].map((id) => ({ rider_id2: id })),
        // refund_type: [
        //   ...new Set(
        //     data?.data
        //       ?.map((item) => item.refund_type)
        //       ?.filter((refund_type) => Boolean(refund_type))
        //   ),
        // ].map((id) => ({ refund_type: id })),
        refund_type: [...new Set(data?.data?.dropDownRefundType?.map((item) => item.refund_type))].map(
          (refund_type) => ({ refund_type: refund_type })
        ),
        payment_method: [...new Set(data?.data?.dropDownPymentMethod?.map((item) => item.payment_method))].map(
          (payment_method) => ({ payment_method: payment_method })
        ),
        payment_status: [...new Set(data?.data?.map((item) => item?.booking?.rider_payment?.payment_status))].map(
          (payment_status) => ({ payment_status: payment_status })
        ),
        created_at: [...new Set(data?.data?.dropDownCreatedAt?.map((item) => item?.created_at))].map(
          (created_at) => ({ created_at: created_at })
        ),
      });
    }
    else if (type === "cancelledRefund") {
      setDriverDropDownList({
        booking_id2: [
          ...new Set(
            data?.data?.dropDownBookingId
              ?.map((item) => item.booking_id2)
              ?.filter((booking_id2) => Boolean(booking_id2))
          ),
        ].map((id) => ({ booking_id2: id })),
        rider_id2: [
          ...new Set(
            data?.data?.dropDownRiderId
              ?.map((item) => item.rider_id2)
              ?.filter((rider_id2) => Boolean(rider_id2))
          ),
        ].map((id) => ({ rider_id2: id })),
        created_at: [...new Set(data?.data?.dropDownCreatedAt?.map((item) => item?.created_at))].map(
          (created_at) => ({ created_at: created_at })
        ),
        created_by: [...new Set(data?.data?.dropDownCreatedBy?.map((item) => item?.created_by))].map(
          (created_by) => ({ created_by: created_by })
        ),
        cancelled_at: [...new Set(data?.data?.dropDownCancelledAt?.map((item) => item?.refund_cancelled_at))].map(
          (cancelled_at) => ({ cancelled_at: cancelled_at })
        ),
        cancelled_by: [...new Set(data?.data?.dropDownCancelledBy?.map((item) => item?.refund_cancelled_by))].map(
          (cancelled_by) => ({ cancelled_by: cancelled_by })
        ),
      })
    }
    else if (type === "pendingRefund") {
      setDriverDropDownList({
        booking_id2: [
          ...new Set(
            data?.data?.dropDownBookingId
              ?.map((item) => item.booking_id2)
              ?.filter((booking_id2) => Boolean(booking_id2))
          ),
        ].map((booking_id2) => ({ booking_id2: booking_id2 })),
        rider_id2: [
          ...new Set(
            data?.data?.dropDownRiderId
              ?.map((item) => item.rider_id2)
              ?.filter((rider_id2) => Boolean(rider_id2))
          ),
        ].map((id) => ({ rider_id2: id })),
        payment_method: [...new Set(data?.data?.dropDownPymentMethod?.map((item) => item.payment_method))].map(
          (payment_method) => ({ payment_method: payment_method })
        ),
        payment_status: [...new Set(data?.data?.map((item) => item?.booking?.rider_payment?.payment_status))].map(
          (payment_status) => ({ payment_status: payment_status })
        ),
        cancelled_at: [...new Set(data?.data?.dropDownCancelledAt?.map((item) => item?.refund_cancelled_at))].map(
          (cancelled_at) => ({ cancelled_at: cancelled_at })
        ),
      })
    }
  };
  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  console.log(pendingRefundList, 'sdlkdjalsd');

  return (
    <>
      <PendingRefundInitiate
        refundInitiateShow={refundInitiateShow}
        handleRefundInitiateClose={handleRefundInitiateClose}
        pendingRefundView={pendingRefundView}
        pendingTable={pendingTable}
        setPendingTable={setPendingTable}
      />
      <PendingRefundView
        refundViewShow={refundViewShow}
        handleRefundViewClose={handleRefundViewClose}
        pendingRefundView={pendingRefundView}
      />
      <SuccessfulRefundViewModal
        successfulRefundView={successfulRefundView}
        handleSuccessfulRefundViewClose={handleSuccessfulRefundViewClose}
        pendingRefundView={pendingRefundView}
      />
      <CancelledRefundViewModal
        cancelledRefundViewShow={cancelledRefundViewShow}
        handleCancelledRefundViewClose={handleCancelledRefundViewClose}
        pendingRefundView={pendingRefundView}
      />
      <div className="refund_container p-3 pb-4 mx-3 my-4">
        <div className="d-flex justify-content-between pt-1">
          <div>
            <span className="fs_26 primary_color fw_600">
              {type === "pendingRefund"
                ? "Pending Refund"
                : type === "successRefund"
                  ? "Successful Refund"
                  : type === "cancelledRefund"
                    ? "Cancelled Refund"
                    : ""}
            </span>
          </div>
          <div className="d-flex align-items-center">{buttonList}</div>

        </div>
        {showFilter ? (
          <RefundFilter
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
                      <NavLink
                        className=" secondary_color"
                        to={navigationFn(
                          item?.booking?.booking_classification,
                          item?.booking?.id
                        )}
                      >
                        <span className="secondary_color  fs_14 fw_500">
                          {item?.booking_id2 ? item?.booking_id2 : "--"}
                        </span>
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        className=" secondary_color"
                        to={riderNavigateFn(item?.rider, item?.rider?.id)}
                      >
                        <span className="secondary_color  fs_14 fw_500">
                          {item?.rider_id2 ? item?.rider_id2 : "--"}
                        </span>
                      </NavLink>
                    </td>
                    {type === "pendingRefund" && (
                      <td>
                        <span className="secondary_color fs_14 text-nowrap">
                          {formatAmount(
                            item?.booking?.rider_billing?.previous_final_fare
                          )}
                        </span>
                      </td>
                    )}
                    {type === "pendingRefund" && (
                      <td>
                        <span className="secondary_color fs_14 text-nowrap">
                          {formatAmount(
                            item?.booking?.rider_billing
                              ?.final_fare
                          )}
                        </span>
                      </td>
                    )}
                    {type === "pendingRefund" && (
                      <td>
                        <span className="secondary_color fs_14 text-nowrap">
                          {formatAmount(
                            item?.booking?.rider_payment?.amount_to_be_refunded
                          )}
                        </span>
                      </td>
                    )}
                    {type === "successRefund" &&
                      (item.refund_type === "current_balance_deposite" ? (
                        <td>
                          <span className={"secondary_color fs_14"}>
                            ₹{" "}
                            {formatAmount(
                              item?.current_balance_refunded_amount
                            )}
                          </span>
                        </td>
                      ) : (
                        <td>
                          <span className={"secondary_color fs_14"}>
                            ₹ {formatAmount(item?.razorpay_refunded_amount)}
                          </span>
                        </td>
                      ))}
                    {type !== "cancelledRefund" && (
                      <td>
                        <span className="secondary_color fs_14 text-nowrap">
                          {item?.booking?.rider_payment?.payment_method
                            ? item?.booking?.rider_payment?.payment_method
                            : "--"}
                        </span>
                      </td>
                    )}
                    {type !== "cancelledRefund" && (
                      <td>
                        <span className="secondary_color fs_14 text-nowrap">
                          {item?.booking?.rider_payment?.payment_status
                            ? item?.booking?.rider_payment?.payment_status
                            : "--"}
                        </span>
                      </td>
                    )}
                    {type !== "pendingRefund" && (
                      <td>
                        <span className="secondary_color fs_14">
                          {item?.refund_type
                            ? item.refund_type === "current_balance_deposite"
                              ? "current balance deposit"
                              : removeUnderScore(item.refund_type)
                            : "--"}
                          {/* {item?.refund_type
                            ? removeUnderScore(item?.refund_type)
                            : "--"} */}
                        </span>
                      </td>
                    )}
                    <td>
                      <span className="secondary_color fs_14 text-nowrap">
                        {item.created_at
                          ? moment(item.created_at).format("DD-MM-YYYY HH:mm")
                          : "--"}
                      </span>
                    </td>
                    {type === "successRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.refunded_by ? item?.refunded_by : "--"}
                        </span>
                      </td>
                    )}
                    {type === "cancelledRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.created_by ? item?.created_by : "--"}
                        </span>
                      </td>
                    )}
                    {type === "cancelledRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.booking?.rider_payment?.refund_cancelled_at
                            ? moment(
                              item?.booking?.rider_payment
                                ?.refund_cancelled_at
                            ).format("MM-DD-YYYY HH:mm")
                            : "--"}
                        </span>
                      </td>
                    )}
                    {type === "cancelledRefund" && (
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.booking?.rider_payment?.refund_cancelled_by
                            ? item?.booking?.rider_payment?.refund_cancelled_by
                            : "--"}
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
                      {canWrite("pending_refund") && item?.is_refunded === false &&
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

export default RefundMainTable;
