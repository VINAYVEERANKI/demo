import React, { useEffect, useState } from "react";
import InnerLayout from "../layout/innerLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./DriverViewMetrics.css";
import Select, { components } from "react-select";
import { reactSelectDriverDetails } from "../mui-styles/react-styles";
import DropDownIcon from "../../assets/icons/dropdown-icon";
import { useLocation, useParams } from "react-router";
import * as driverMetricsAction from "../../redux/actions/driverMetrics/driverMetricsActions";
import errorToast from "../utilits/errorToast";
import { useDispatch } from "react-redux";
import { driverNavigateFn, removeUnderScore } from "../helper";
import moment from "moment";
import { NavLink } from "react-router-dom";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const DriverViewMetrics = () => {
  const params = useParams();
  console.log(params.id, "paramsid");
  const [selectedZone, setSelectedZone] = useState([]);
  const [driverViewData, setDriverViewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [search, setSearch] = useState({ value: "" });

  useEffect(() => {
    setLoading(true);
    dispatch(
      driverMetricsAction.driverMetricsViewAction(
        {
          driver_id: params.id,
          search: {
            from_date: "2022-10-24T10:55:29.859Z",
            to_date: "2024-12-16T06:50:45.588Z",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, setDriverViewData]);

  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    console.log(data);
    console.log(data?.data);
    setDriverViewData(data?.data);
  };
  const onError = (data) => {
    errorToast(data?.data);
    setError(true);
    setLoading(false);
  };

  console.log(driverViewData, "driverViewData");

  const DriverDetails = [
    {
      label: "Driver ID",
      values: driverViewData?.driver_id2 ?? "--",
      navLink: true,
      link: driverNavigateFn(driverViewData, driverViewData?.id),
    },
    {
      label: "First Name",
      values: driverViewData?.first_name ?? "--",
    },
    {
      label: "Last Name",
      values: driverViewData?.last_name ?? "--",
    },
    {
      label: "Driver Type",
      values: driverViewData?.driver_type
        ? removeUnderScore(driverViewData?.driver_type)
        : "--",
    },
    {
      label: "Zone",
      values: driverViewData?.registered_zone_name?.zone_name ?? "--",
    },
  ];

  const cancellationList = [
    {
      value: "Rider Cancelled (Before Driver Arrived)",
      label: "Rider Cancelled (Before Driver Arrived)",
    },
    {
      value: "Driver Cancelled (Before Driver Arrived)",
      label: "Driver Cancelled (Before Driver Arrived)",
    },
    {
      value: "Rider Cancelled (After Driver Arrived)",
      label: "Rider Cancelled (After Driver Arrived)",
    },
    {
      value: "Driver Cancelled (After Driver Arrived)",
      label: "Driver Cancelled (After Driver Arrived)",
    },
    {
      value: "Rider Cancelled (After Start OTP)",
      label: "Rider Cancelled (After Start OTP)",
    },
  ];

  const BookingEarnings = [
    {
      mainheading: "Distance Travelled",
      earnings: [
        {
          cancelled: "Cancelled (Km)",
          local: [
            {
              key: "local",
              value:
                driverViewData?.DistanceTravelledCancelled?.LocalTripDistance ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.DistanceTravelledCancelled
                  ?.RentalTripDistance ?? "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.DistanceTravelledCancelled?.OneWayDistance ??
                "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.DistanceTravelledCancelled?.RoundTripDistance ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.DistanceTravelledCancelled?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Completed (Km)",
          local: [
            {
              key: "local",
              value:
                driverViewData?.DistanceTravelledCompleted?.LocalTripDistance ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.DistanceTravelledCompleted
                  ?.RentalTripDistance ?? "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.DistanceTravelledCompleted?.OneWayDistance ??
                "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.DistanceTravelledCompleted?.RoundTripDistance ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.DistanceTravelledCompleted?.TotalCount ?? "--",
            },
          ],
        },
      ],
    },
    {
      mainheading: "Number Of Bookings",
      earnings: [
        {
          cancelled: "Denied - Cash",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfDeniedCashBooking?.LocalTripCount ?? "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfDeniedCashBooking?.RentalTripCount ?? "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value: driverViewData?.NoOfDeniedCashBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfDeniedCashBooking?.RoundTripCount ?? "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value: driverViewData?.NoOfDeniedCashBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Denied - Online",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfDeniedOnlineBooking?.LocalTripCount ?? "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfDeniedOnlineBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfDeniedOnlineBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfDeniedOnlineBooking?.RoundTripCount ?? "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfDeniedOnlineBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Denied - Wallet",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfDeniedWalletBooking?.LocalTripCount ?? "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfDeniedWalletBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfDeniedWalletBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfDeniedWalletBooking?.RoundTripCount ?? "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfDeniedWalletBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Cancelled - Cash",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfCancelledCashBooking?.LocalTripCount ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfCancelledCashBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfCancelledCashBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfCancelledCashBooking?.RoundTripCount ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfCancelledCashBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Cancelled - Online",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfCancelledOnlineBooking?.LocalTripCount ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfCancelledOnlineBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfCancelledOnlineBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfCancelledOnlineBooking?.RoundTripCount ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfCancelledOnlineBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Cancelled - Wallet",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfCancelledWalletBooking?.LocalTripCount ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfCancelledWalletBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfCancelledWalletBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfCancelledWalletBooking?.RoundTripCount ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfCancelledWalletBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Completed- Cash",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfCompletedCashBooking?.LocalTripCount ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfCompletedCashBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfCompletedCashBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfCompletedCashBooking?.RoundTripCount ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfCompletedCashBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Completed - Online",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfCompletedOnlineBooking?.LocalTripCount ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfCompletedOnlineBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfCompletedOnlineBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfCompletedOnlineBooking?.RoundTripCount ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfCompletedOnlineBooking?.TotalCount ?? "--",
            },
          ],
        },
        {
          cancelled: "Completed - Wallet",
          local: [
            {
              key: "local",
              value:
                driverViewData?.NoOfCompletedWalletBooking?.LocalTripCount ??
                "--",
            },
          ],
          rental: [
            {
              key: "Rental",
              value:
                driverViewData?.NoOfCompletedWalletBooking?.RentalTripCount ??
                "--",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value:
                driverViewData?.NoOfCompletedWalletBooking?.OneWayCount ?? "--",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value:
                driverViewData?.NoOfCompletedWalletBooking?.RoundTripCount ??
                "--",
            },
          ],
          Total: [
            {
              key: "Total",
              value:
                driverViewData?.NoOfCompletedWalletBooking?.TotalCount ?? "--",
            },
          ],
        },
      ],
    },
    {
      mainheading: "Earnings",
      earnings: [
        {
          cancelled: "Earnings (₹)",
          local: [
            {
              key: "local",
              value: "16",
            },
          ],
          rental: [
            {
              key: "Rental",
              value: "40",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value: "40",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value: "40",
            },
          ],
          Total: [
            {
              key: "Total",
              value: "--",
            },
          ],
        },
        {
          cancelled: "Incentive Earnings (₹)",
          local: [
            {
              key: "local",
              value: "16",
            },
          ],
          rental: [
            {
              key: "Rental",
              value: "40",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value: "40",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value: "40",
            },
          ],
          Total: [
            {
              key: "Total",
              value: "--",
            },
          ],
        },
        {
          cancelled: "Cash Collected (₹)",
          local: [
            {
              key: "local",
              value: "16",
            },
          ],
          rental: [
            {
              key: "Rental",
              value: "40",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value: "40",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value: "40",
            },
          ],
          Total: [
            {
              key: "Total",
              value: "--",
            },
          ],
        },
        {
          cancelled: "Total Earnings (₹)",
          local: [
            {
              key: "local",
              value: "16",
            },
          ],
          rental: [
            {
              key: "Rental",
              value: "40",
            },
          ],
          onewayoutstation: [
            {
              key: "onewayoutstation",
              value: "40",
            },
          ],
          roundtrip: [
            {
              key: "roundtrip",
              value: "40",
            },
          ],
          Total: [
            {
              key: "Total",
              value: "--",
            },
          ],
        },
      ],
    },
  ];

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  // const dataArray = Object.values(driverViewData);

  let totalMinutes = 0;

  driverViewData?.bookings?.forEach((item) => {
    if (item.online_duration) {
      const timeParts = item.online_duration.split(" ");
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      if (!isNaN(hours) && !isNaN(minutes)) {
        totalMinutes += hours * 60 + minutes;
      }
    }
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let totalMins = 0;

  driverViewData?.bookings?.forEach((item) => {
    if (item.trip_duration) {
      const timeParts = item.trip_duration.split(" ");
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      if (!isNaN(hours) && !isNaN(minutes)) {
        totalMins += hours * 60 + minutes;
      }
    }
  });

  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  const cancellation_sum = driverViewData?.Driver_Cancellations?.reduce(
    (total, item) => total + item.cancellation_fee,
    0
  );

  // const data = [
  //   [1, 2, 3],
  //   ['4', 5, '6'],
  //   [7, '8', [9, 10, [11, 12]]],
  //   [13, [14, 15, [16, 17, [18, 19]]]],
  // ];

  // const sumColumns = (arr) => {
  //   const columnSums = [];

  //   arr.forEach((nestedArray) => {
  //     nestedArray.forEach((value, index) => {
  //       if (!columnSums[index]) {
  //         columnSums[index] = 0;
  //       }

  //       if (Array.isArray(value)) {
  //         columnSums[index] += sumColumns([value]); // Recursively sum nested arrays
  //       } else if (typeof value === 'number' || !isNaN(parseInt(value, 10))) {
  //         columnSums[index] += Number(value);
  //       }
  //     });
  //   });

  //   return columnSums;
  // };

  // const columnSums = sumColumns(data);

  return (
    <InnerLayout
      mainHeading={"Driver Metrics"}
      navigateEnable={true}
      backBtnClassName="ms-0"
    >
      {/* <div>
        {columnSums.map((sum, index) => (
          <div key={index}>
            Sum of Column {index + 1}: {sum}
          </div>
        ))}
      </div> */}

      {/* {BookingEarnings?.map((item) => {
        return (
          <span>
            {item?.earnings?.map((item) => {
              return (
                <>
                  {item?.local?.map((item) => {
                    return <>{item?.value}</>;
                  })}
                </>
              );
            })}
          </span>
        );
      })} */}

      <div className="row mt-3 ps-3">
        {Array.from(
          { length: Math.ceil(DriverDetails?.length / 3) },
          (_, i) => (
            <div className={`col-lg-2 col-12 fs_15`} key={i}>
              {DriverDetails?.slice(i * 3, i * 3 + 3)?.map((item) => (
                <div className="d-flex mb-2" key={item.label}>
                  <div
                    className="secondary_color fw_500"
                    style={{ width: "180px" }}
                  >
                    {item?.label}
                  </div>
                  <div
                    className="flex-grow-1 text-start primary_color ms-4 fw_500"
                    style={{ width: "150px" }}
                  >
                    {item?.navLink ? (
                      <NavLink className={"primary_color"} to={item?.link}>
                        {item?.values}
                      </NavLink>
                    ) : (
                      item?.values
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div className="d-flex gap-3 mt-4">
        <div className="ps-2 pt-2 textOnInput">
          <label
            for="inputText"
            className="mt-2 fs_11 fw_500 secondary_color datelabel"
          >
            From Date*
          </label>
          <input
            type="date"
            className={`border_radius_5px p-1 outline fs_12 ps-3 start_date primary_color`}
            name="start_date"
            max="9999-12-31"
            value={moment(driverViewData?.createdAt).format("YYYY-MM-DD")}
          />
        </div>
        <div className="ps-2 pt-2 textOnInput">
          <label
            for="inputText"
            className="mt-2 fs_11 fw_500 secondary_color datelabel"
          >
            To Date*
          </label>
          <input
            type="date"
            className={`border_radius_5px p-1 outline fs_12 ps-3 start_date primary_color`}
            name="expiry_date"
            max="9999-12-31"
            value={moment(driverViewData?.createdAt).format("YYYY-MM-DD")}
          />
        </div>
      </div>
      <hr className="bluline"></hr>
      <div className="d-lg-flex g-0">
        <div className="col-lg-7 col-12">
          <div className="trip_container border_radius_10px text-nowrap overflow_x_auto">
            <div className="text-center py-3">
              <table className="table_width">
                <thead className="">
                  <tr className="fs_12 fw_500">
                    <th className="border_rights">Trip Time</th>
                    <th className="border_rights">Online Duration</th>
                    <th className="border_rights">Denied Bookings</th>
                    <th className="border_rights">Cancelled Bookings</th>
                    <th className="border_rights">Incentive Earnings (₹)</th>
                    <th>Total Earnings (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="fs_12 fw_400 secondary_color">
                    <td className="border_rights">
                      {isNaN(hrs) ? "0" : hrs}hr {isNaN(mins) ? "0" : mins}mins
                    </td>
                    <td className="border_rights">
                      {isNaN(hours) ? "0" : hours}hr{" "}
                      {isNaN(minutes) ? "0" : minutes}mins
                    </td>
                    <td className="border_rights">
                      {driverViewData?.Denied_Bookings ?? "--"}
                    </td>
                    <td className="border_rights">
                      {driverViewData?.Cancelled_Bookings ?? "--"}
                    </td>
                    <td className="border_rights">--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="trip_container border_radius_10px mt-3 px-3 py-3">
            <div className="fs_18 fw_500 drivercancel mt-2">
              Bookings & Earnings
            </div>
            <hr className="driverline"></hr>
            <div className="px-3 mt-4 pb-4 driver_Metrics_Bookings_Earnings_Section overflow_x_auto overflowlist_list">
              <div className="row g-0">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-8 d-flex fs_12 fw_500 header_table py-2 first_list">
                  <div className="col-2 text-center">
                    <span>Local</span>
                  </div>
                  <div className="col-2 text-center">
                    {" "}
                    <span>Rental</span>
                  </div>
                  <div className="col-3">
                    <span>Outstation One-Way</span>
                  </div>
                  <div className="col-3">
                    <span>Outstation Round Trip</span>
                  </div>
                  <div className="col-2 text-center">
                    <span>Total</span>
                  </div>
                </div>
              </div>
              <div className="view_permissions_lists table_border">
                {BookingEarnings.map((item) => {
                  return (
                    <>
                      <div className="row g-0">
                        <div
                          className={`col-width fs_12 table_btmsborder border_table ps-3 ${
                            item.mainheading === "Distance Travelled"
                              ? "mainheading"
                              : item.mainheading === "Number Of Bookings"
                              ? "mainheading2"
                              : item.mainheading === "Earnings"
                              ? "mainheading3"
                              : ""
                          }`}
                        >
                          <div>{item.mainheading}</div>
                        </div>
                        <div
                          className={`col-width1 fs_12 border_table text-nowrap col-width`}
                        >
                          {item.earnings.map((item) => {
                            return (
                              <div
                                className={`${
                                  item.cancelled === "Cancelled (Km)" ||
                                  item.cancelled === "Completed (Km)"
                                    ? "mainheading"
                                    : item.cancelled === "Denied - Cash" ||
                                      item.cancelled === "Denied - Online" ||
                                      item.cancelled === "Denied - Wallet"
                                    ? "bookings1"
                                    : item.cancelled === "Cancelled - Cash" ||
                                      item.cancelled === "Cancelled - Online" ||
                                      item.cancelled === "Cancelled - Wallet"
                                    ? "bookings2"
                                    : item.cancelled === "Completed- Cash" ||
                                      item.cancelled === "Completed - Online" ||
                                      item.cancelled === "Completed - Wallet"
                                    ? "bookings3"
                                    : item.cancelled === "Earnings (₹)" ||
                                      item.cancelled ===
                                        "Incentive Earnings (₹)" ||
                                      item.cancelled === "Cash Collected (₹)" ||
                                      item.cancelled === "Total Earnings (₹)"
                                    ? "earnings"
                                    : ""
                                }`}
                              >
                                <div className="table_btmsborder ps-2 py-1">
                                  {item.cancelled}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="col-width2 text-center table_backcolor">
                          <div className="row g-0 fs_12">
                            {item.earnings.map((item) => {
                              return (
                                <>
                                  <div className="col-2 table_btmsborder py-1">
                                    {item.local.map((item) => {
                                      return <span>{item.value}</span>;
                                    })}
                                  </div>
                                  <div className="col-2 table_btmsborder">
                                    {item.rental.map((item) => {
                                      return <span>{item.value}</span>;
                                    })}
                                  </div>
                                  <div className="col-3 table_btmsborder">
                                    {item.onewayoutstation.map((item) => {
                                      return <span>{item.value}</span>;
                                    })}
                                  </div>
                                  <div className="col-3 table_btmsborder">
                                    {item.roundtrip.map((item) => {
                                      return <span>{item.value}</span>;
                                    })}
                                  </div>
                                  <div className="col-2 table_btmsborder">
                                    {item.Total.map((item) => {
                                      return (
                                        <span className="ps-2">
                                          {item.value}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* <div className="row g-0 fs_14 overflow_x_auto">
              <table className="table manage_fare_list_navbar text-nowrap overflow_x_auto">
                <thead className="table_heading">
                  <tr className="">
                    <th></th>
                    <th></th>
                    <th className="first_list header_tablesss">Local</th>
                    <th className="header_tablesss">Rental</th>
                    <th className="header_tablesss">Outstation One-Way</th>
                    <th className="header_tablesss">Outstation Round Trip</th>
                    <th className="last_list header_tablesss">Total</th>
                  </tr>
                </thead>
                <tbody className="table_border">
                  {BookingEarnings?.map((item) => {
                    return (
                      <>
                        <tr>
                          <td
                            className={` fs_13 table_btmsborder border_table ${
                              item.mainheading === "Distance Travelled"
                                ? "mainheading"
                                : item.mainheading === "Number Of Bookings"
                                ? "mainheading2"
                                : item.mainheading === "Earnings"
                                ? "mainheading3"
                                : ""
                            }`}
                          >
                            {item?.mainheading}
                          </td>
                          <td className="border_table bg-black">
                            {item?.earnings?.map((item) => {
                              return (
                                <>
                                  <tr
                                    className={`${
                                      item.cancelled === "Cancelled (Km)" ||
                                      item.cancelled === "Completed (Km)"
                                        ? "mainheading"
                                        : item.cancelled === "Denied - Cash" ||
                                          item.cancelled ===
                                            "Denied - Online" ||
                                          item.cancelled === "Denied - Wallet"
                                        ? "bookings1"
                                        : item.cancelled ===
                                            "Cancelled - Cash" ||
                                          item.cancelled ===
                                            "Cancelled - Online" ||
                                          item.cancelled ===
                                            "Cancelled - Wallet"
                                        ? "bookings2"
                                        : item.cancelled ===
                                            "Completed- Cash" ||
                                          item.cancelled ===
                                            "Completed - Online" ||
                                          item.cancelled ===
                                            "Completed - Wallet"
                                        ? "bookings3"
                                        : item.cancelled === "Earnings (₹)" ||
                                          item.cancelled ===
                                            "Incentive Earnings (₹)" ||
                                          item.cancelled ===
                                            "Cash Collected (₹)" ||
                                          item.cancelled ===
                                            "Total Earnings (₹)"
                                        ? "earnings"
                                        : ""
                                    }`}
                                  >
                                    <td>{item.cancelled}</td>
                                  </tr>
                                </>
                              );
                            })}
                          </td>

                          <td>
                            {item?.earnings?.map((item) => {
                              return (
                                <>
                                  <tr>
                                    {item?.local?.map((item) => {
                                      return <td>{item?.value}</td>;
                                    })}
                                  </tr>
                                </>
                              );
                            })}
                          </td>

                          <td>
                            {item?.earnings?.map((item) => {
                              return (
                                <>
                                  <tr>
                                    {item?.rental?.map((item) => {
                                      return <td>{item?.value}</td>;
                                    })}
                                  </tr>
                                </>
                              );
                            })}
                          </td>
                          <td>
                            {item?.earnings?.map((item) => {
                              return (
                                <>
                                  <tr>
                                    {item?.onewayoutstation?.map((item) => {
                                      return <td>{item?.value}</td>;
                                    })}
                                  </tr>
                                </>
                              );
                            })}
                          </td>
                          <td>
                            {item?.earnings?.map((item) => {
                              return (
                                <>
                                  <tr>
                                    {item?.roundtrip?.map((item) => {
                                      return <td>{item?.value}</td>;
                                    })}
                                  </tr>
                                </>
                              );
                            })}
                          </td>
                          <td>
                            {item?.earnings?.map((item) => {
                              return (
                                <>
                                  <tr>
                                    {item?.Total?.map((item) => {
                                      return <td>{item?.value}</td>;
                                    })}
                                  </tr>
                                </>
                              );
                            })}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
        <div className="col-lg-5 col-12 ps-lg-3 mt-lg-0 mt-3">
          <div className="cancellation_container border_radius_10px px-sm-3 px-1 py-3">
            <div className="fs_18 fw_500 drivercancel mt-2">
              Driver Cancellations
            </div>
            <hr className="driverline"></hr>
            <div className=" d-sm-flex gap-3 mt-2">
              <span className="fw_500 fs_14 pt-1">Booking Status</span>
              <span>
                <Select
                  className="driver_select"
                  options={cancellationList}
                  styles={reactSelectDriverDetails}
                  onChange={(selectedOption) => {
                    let event = {
                      target: {
                        name: selectedOption?.label,
                        value: selectedOption?.value,
                      },
                    };
                    setSelectedZone(event);
                  }}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                />
              </span>
            </div>
            <table className="table manage_fare_list_navbar mt-3 text-nowrap overflow_x_auto">
              <thead className="table_heading">
                <tr className="pale_blue_bg">
                  <th className={`${styles.first_list} transparent_bg`}>Cancellation Reasons</th>
                  <th className={`${styles.last_list} transparent_bg`}>Quantity</th>
                </tr>
              </thead>
              <tbody className=" light_blue_bg">
                {driverViewData?.Driver_Cancellations?.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>{item?.cancellation_reason}</td>
                        <td className="ps-4">{item?.cancellation_fee}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between px-3 py-2 downpanel border_radius_10px fw_600">
              <div>Total</div>
              <div className=" w-25">{cancellation_sum}</div>
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
};

export default DriverViewMetrics;
