import React, { useEffect, useState } from "react";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import SearchInputfield from "../form/searchInputfield";
import LoadAndError from "../utilits/loadAndError";
import { formatDateTime, useSortableData, removeUnderScore, statusColor } from "../helper";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  nse_R_BookingLocal_Accident,
  nse_R_BookingLocal_Cancelled,
  nse_R_BookingLocal_No_Rides,
  nse_R_BookingLocal_Ongoing,
  nse_R_BookingLocal_Review,
  nse_R_BookingOneway_Accident,
  nse_R_BookingOneway_Cancelled,
  nse_R_BookingOneway_No_Rides,
  nse_R_BookingOneway_Odometer,
  nse_R_BookingOneway_Ongoing,
  nse_R_BookingOneway_Review,
  nse_R_BookingOneway_RideScheduled,
  nse_R_BookingRental_Accident,
  nse_R_BookingRental_Cancelled,
  nse_R_BookingRental_No_Rides,
  nse_R_BookingRental_Ongoing,
  nse_R_BookingRental_Review,
  nse_R_BookingRound_Accident,
  nse_R_BookingRound_Cancelled,
  nse_R_BookingRound_No_Rides,
  nse_R_BookingRound_Odometer,
  nse_R_BookingRound_Ongoing,
  nse_R_BookingRound_Review,
  nse_R_BookingRound_RideScheduled,
  nse_R_EmerSOS_DuringTripList,
  nse_R_EmerSOS_MessagingList,
  nse_R_EmerSOS_NoTripList,
  nse_R_GeneralAccountListAction,
  nse_R_INAPPMESS_ComplaintList,
  nse_R_INAPPMESS_PendingList,
  nse_R_INAPPMESS_RESCLOSEDList,
  nse_R_NewAccountListAction,
  nse_R_PaymentPendingList,
  nse_R_PaymentRiderCBList,
  nse_R_PaymentSuccessList,
  nse_R_PaymentWalletList,
  nse_R_PolicyUpdateListAction,
  nse_R_SecurityListAction,
  nse_D_NewAccountListAction,
  nse_D_newDriverApplicationListAction,
  nse_D_existingDriverApplicationListAction,
  nse_D_GeneralAccountListAction,
  nse_D_accountActivityListAction,
  nse_D_PolicyUpdateListAction,
  nse_D_driverPerformanceListAction,
  nse_D_SecurityListAction,
  nse_D_BookingLocal_Ongoing,
  nse_D_BookingLocal_StopAdded,
  nse_D_BookingLocal_DropOffUpdated,
  nse_D_BookingLocal_Payment,
  nse_D_BookingLocal_Cancelled,
  nse_D_BookingLocal_Accident,
  nse_D_BookingLocal_Review,
  nse_D_BookingRental_Ongoing,
  nse_D_BookingRental_DailyLimit_Reached,
  nse_D_BookingRental_DropOffUpdated,
  nse_D_BookingRental_Payment,
  nse_D_BookingRental_Cancelled,
  nse_D_BookingRental_Accident,
  nse_D_BookingRental_Review,
  nse_D_BookingOneway_Ongoing,
  nse_D_BookingOneway_Odometer,
  nse_D_BookingOneway_DropOffUpdated,
  nse_D_BookingOneway_Payment,
  nse_D_BookingOneway_Cancelled,
  nse_D_BookingOneway_Accident,
  nse_D_BookingOneway_Review,
  nse_D_BookingOneway_MaxLimitReached,
  nse_D_BookingRound_Ongoing,
  nse_D_BookingRound_Odometer,
  nse_D_BookingRound_DropOffUpdated,
  nse_D_BookingRound_Payment,
  nse_D_BookingRound_Cancelled,
  nse_D_BookingRound_Accident,
  nse_D_BookingRound_Review,
  nse_D_BookingRound_MaxLimitReached,
  nse_D_BookingRound_ReturnTrip,
  nse_D_PaymentFineList,
  nse_D_PaymentReceivedList,
  nse_D_PaymentDueList,
  nse_D_PaymentDriverCBList,
  nse_D_Cashout_List,
  nse_D_EmerSOS_DuringTripList,
  nse_D_EmerSOS_NoTripList,
  nse_D_EmerSOS_MessagingList,
  nse_D_INAPPMESS_DuringTripList,
  nse_D_INAPPMESS_ComplaintList,
  nse_D_INAPPMESS_RESCLOSEDList,
  nse_D_Incentive_SlotStartTimeList,
  nse_D_Incentive_InprogressList,
  nse_D_Incentive_SlotRemainingTimeList,
  nse_D_Incentive_CompletedSuccessList,
} from "../../redux/actions/nse/riderNseAction";
import usePermissions from "../usePermissionChecker";

const NseTable = ({ mainType, type, nseType, riderdrivertype }) => {
  console.log(mainType, "mainType");
  console.log(type, "type");
  console.log(nseType, "nseType");

  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    RiderNse: "nse_rider",
    DriverNse: "nse_driver",
  };

  const permission = pagePermissions[nseType];

  const disptach = useDispatch();

  const navigate = useNavigate();
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nseList, setNseList] = useState([]);
  const { items, requestSort, sortConfig } = useSortableData(nseList);

  const [search, setSearch] = useState({ value: "" });

  const tableHeading = [
    { title: "ID", value: "nse_code" },
    {
      title: "Title",
      value: "",
    },
    { title: "Status", value: "status" },
    { title: "Updated at", value: "updated_at" },
  ];

  useEffect(() => {
    const searchData = {
      search: {
        id: "",
        nse_code: "",
        nse_account_inner_type: "",
        status: "",
        updated_at: "",
        updated_by: "",
      },
    };
    if (nseType === "RiderNse") {
      if (mainType === "Account") {
        if (type === "New_account") {
          setLoading(true);
          disptach(nse_R_NewAccountListAction(searchData, onSuccess, onError));
        } else if (type === "General_account") {
          setLoading(true);
          disptach(
            nse_R_GeneralAccountListAction(searchData, onSuccess, onError)
          );
        } else if (type === "Policy_updates") {
          setLoading(true);
          disptach(
            nse_R_PolicyUpdateListAction(searchData, onSuccess, onError)
          );
        } else if (type === "Security") {
          setLoading(true);
          disptach(nse_R_SecurityListAction(searchData, onSuccess, onError));
        }
      } else if (mainType === "Bookings") {
        if (type === "No_rides_availableL") {
          setLoading(true);
          disptach(nse_R_BookingLocal_No_Rides(searchData, onSuccess, onError));
        } else if (type === "Ongoing_bookingL") {
          setLoading(true);
          disptach(nse_R_BookingLocal_Ongoing(searchData, onSuccess, onError));
        } else if (type === "Cancelled_bookingL") {
          setLoading(true);
          disptach(
            nse_R_BookingLocal_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "Accident_bookingL") {
          setLoading(true);
          disptach(nse_R_BookingLocal_Accident(searchData, onSuccess, onError));
        } else if (type === "Driver_review_pending_from_riderL") {
          setLoading(true);
          disptach(nse_R_BookingLocal_Review(searchData, onSuccess, onError));
        } else if (type === "No_rides_availableR") {
          setLoading(true);
          disptach(
            nse_R_BookingRental_No_Rides(searchData, onSuccess, onError)
          );
        } else if (type === "Ongoing_bookingR") {
          setLoading(true);
          disptach(nse_R_BookingRental_Ongoing(searchData, onSuccess, onError));
        } else if (type === "Cancelled_bookingR") {
          setLoading(true);
          disptach(
            nse_R_BookingRental_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "Accident_bookingR") {
          setLoading(true);
          disptach(
            nse_R_BookingRental_Accident(searchData, onSuccess, onError)
          );
        } else if (type === "Driver_review_pending_from_riderR") {
          setLoading(true);
          disptach(nse_R_BookingRental_Review(searchData, onSuccess, onError));
        } else if (type === "No_rides_availableO") {
          setLoading(true);
          disptach(
            nse_R_BookingOneway_No_Rides(searchData, onSuccess, onError)
          );
        } else if (type === "Ongoing_bookingO") {
          setLoading(true);
          disptach(nse_R_BookingOneway_Ongoing(searchData, onSuccess, onError));
        } else if (type === "Cancelled_bookingO") {
          setLoading(true);
          disptach(
            nse_R_BookingOneway_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "Accident_bookingO") {
          setLoading(true);
          disptach(
            nse_R_BookingOneway_Accident(searchData, onSuccess, onError)
          );
        } else if (type === "Driver_review_pending_from_riderO") {
          setLoading(true);
          disptach(nse_R_BookingOneway_Review(searchData, onSuccess, onError));
        } else if (type === "Ride_scheduledO") {
          setLoading(true);
          disptach(
            nse_R_BookingOneway_RideScheduled(searchData, onSuccess, onError)
          );
        } else if (type === "Odometer_readingO") {
          setLoading(true);
          disptach(
            nse_R_BookingOneway_Odometer(searchData, onSuccess, onError)
          );
        } else if (type === "No_rides_availableW") {
          setLoading(true);
          disptach(nse_R_BookingRound_No_Rides(searchData, onSuccess, onError));
        } else if (type === "Ongoing_bookingW") {
          setLoading(true);
          disptach(nse_R_BookingRound_Ongoing(searchData, onSuccess, onError));
        } else if (type === "Cancelled_bookingW") {
          setLoading(true);
          disptach(
            nse_R_BookingRound_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "Accident_bookingW") {
          setLoading(true);
          disptach(nse_R_BookingRound_Accident(searchData, onSuccess, onError));
        } else if (type === "Driver_review_pending_from_riderW") {
          setLoading(true);
          disptach(nse_R_BookingRound_Review(searchData, onSuccess, onError));
        } else if (type === "Ride_scheduledW") {
          setLoading(true);
          disptach(
            nse_R_BookingRound_RideScheduled(searchData, onSuccess, onError)
          );
        } else if (type === "Odometer_readingW") {
          setLoading(true);
          disptach(nse_R_BookingRound_Odometer(searchData, onSuccess, onError));
        }
      } else if (mainType === "Payment") {
        if (type === "Pending_payment") {
          setLoading(true);
          disptach(nse_R_PaymentPendingList(searchData, onSuccess, onError));
        } else if (type === "Success_payment") {
          setLoading(true);
          disptach(nse_R_PaymentSuccessList(searchData, onSuccess, onError));
        } else if (type === "Rider_current_balance") {
          setLoading(true);
          disptach(nse_R_PaymentRiderCBList(searchData, onSuccess, onError));
        } else if (type === "Wallet") {
          setLoading(true);
          disptach(nse_R_PaymentWalletList(searchData, onSuccess, onError));
        }
      } else if (mainType === "Emergency_SOS") {
        if (type === "During_trip") {
          setLoading(true);
          disptach(
            nse_R_EmerSOS_DuringTripList(searchData, onSuccess, onError)
          );
        } else if (type === "No_trip") {
          setLoading(true);
          disptach(nse_R_EmerSOS_NoTripList(searchData, onSuccess, onError));
        } else if (type === "Messaging") {
          setLoading(true);
          disptach(nse_R_EmerSOS_MessagingList(searchData, onSuccess, onError));
        }
      } else if (mainType === "In_App_Messaging") {
        if (type === "During_trip_Driver_to_rider") {
          setLoading(true);
          disptach(nse_R_INAPPMESS_PendingList(searchData, onSuccess, onError));
        } else if (type === "Complaint_ongoing") {
          setLoading(true);
          disptach(
            nse_R_INAPPMESS_ComplaintList(searchData, onSuccess, onError)
          );
        } else if (type === "Complaint_closed_resloved") {
          setLoading(true);
          disptach(
            nse_R_INAPPMESS_RESCLOSEDList(searchData, onSuccess, onError)
          );
        }
      }
    }
    if (nseType === "DriverNse") {
      if (mainType === "Account") {
        if (type === "newAccount") {
          setLoading(true);
          disptach(nse_D_NewAccountListAction(searchData, onSuccess, onError));
        } else if (type === "newDriverApplication") {
          setLoading(true);
          disptach(
            nse_D_newDriverApplicationListAction(searchData, onSuccess, onError)
          );
        } else if (type === "existingDriverApplication") {
          setLoading(true);
          disptach(
            nse_D_existingDriverApplicationListAction(
              searchData,
              onSuccess,
              onError
            )
          );
        } else if (type === "generalAccount") {
          setLoading(true);
          disptach(
            nse_D_GeneralAccountListAction(searchData, onSuccess, onError)
          );
        } else if (type === "accountActivity") {
          setLoading(true);
          disptach(
            nse_D_accountActivityListAction(searchData, onSuccess, onError)
          );
        } else if (type === "policyUpdates") {
          setLoading(true);
          disptach(
            nse_D_PolicyUpdateListAction(searchData, onSuccess, onError)
          );
        } else if (type === "driverPerformance") {
          setLoading(true);
          disptach(
            nse_D_driverPerformanceListAction(searchData, onSuccess, onError)
          );
        } else if (type === "Security") {
          setLoading(true);
          disptach(nse_D_SecurityListAction(searchData, onSuccess, onError));
        }
      } else if (mainType === "Bookings") {
        if (type === "localOngoingBooking") {
          setLoading(true);
          disptach(nse_D_BookingLocal_Ongoing(searchData, onSuccess, onError));
        } else if (type === "localstopadded") {
          setLoading(true);
          disptach(
            nse_D_BookingLocal_StopAdded(searchData, onSuccess, onError)
          );
        } else if (type === "localdropoffupdated") {
          setLoading(true);
          disptach(
            nse_D_BookingLocal_DropOffUpdated(searchData, onSuccess, onError)
          );
        } else if (type === "localpayment") {
          setLoading(true);
          disptach(nse_D_BookingLocal_Payment(searchData, onSuccess, onError));
        } else if (type === "localCancelledBooking") {
          setLoading(true);
          disptach(
            nse_D_BookingLocal_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "localAccidentBooking") {
          setLoading(true);
          disptach(nse_D_BookingLocal_Accident(searchData, onSuccess, onError));
        } else if (type === "localReview") {
          setLoading(true);
          disptach(nse_D_BookingLocal_Review(searchData, onSuccess, onError));
        } else if (type === "rentalOngoingBooking") {
          setLoading(true);
          disptach(nse_D_BookingRental_Ongoing(searchData, onSuccess, onError));
        } else if (type === "rentaldailylimitreached") {
          setLoading(true);
          disptach(
            nse_D_BookingRental_DailyLimit_Reached(
              searchData,
              onSuccess,
              onError
            )
          );
        } else if (type === "rentaldropoffupdated") {
          setLoading(true);
          disptach(
            nse_D_BookingRental_DropOffUpdated(searchData, onSuccess, onError)
          );
        } else if (type === "rentalpayment") {
          setLoading(true);
          disptach(nse_D_BookingRental_Payment(searchData, onSuccess, onError));
        } else if (type === "rentalCancelledBooking") {
          setLoading(true);
          disptach(
            nse_D_BookingRental_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "rentalAccidentBooking") {
          setLoading(true);
          disptach(
            nse_D_BookingRental_Accident(searchData, onSuccess, onError)
          );
        } else if (type === "rentalReview") {
          setLoading(true);
          disptach(nse_D_BookingRental_Review(searchData, onSuccess, onError));
        } else if (type === "onewayOngoingBooking") {
          setLoading(true);
          disptach(nse_D_BookingOneway_Ongoing(searchData, onSuccess, onError));
        } else if (type === "onewayOdometer") {
          setLoading(true);
          disptach(
            nse_D_BookingOneway_Odometer(searchData, onSuccess, onError)
          );
        } else if (type === "onewaydropoffupdated") {
          setLoading(true);
          disptach(
            nse_D_BookingOneway_DropOffUpdated(searchData, onSuccess, onError)
          );
        } else if (type === "onewaypayment") {
          setLoading(true);
          disptach(nse_D_BookingOneway_Payment(searchData, onSuccess, onError));
        } else if (type === "onewaycancelledbooking") {
          setLoading(true);
          disptach(
            nse_D_BookingOneway_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "onewayaccidentbooking") {
          setLoading(true);
          disptach(
            nse_D_BookingOneway_Accident(searchData, onSuccess, onError)
          );
        } else if (type === "onewayreview") {
          setLoading(true);
          disptach(nse_D_BookingOneway_Review(searchData, onSuccess, onError));
        } else if (type === "onewaymaxlimitreached") {
          setLoading(true);
          disptach(
            nse_D_BookingOneway_MaxLimitReached(searchData, onSuccess, onError)
          );
        } else if (type === "RoundOngoing") {
          setLoading(true);
          disptach(nse_D_BookingRound_Ongoing(searchData, onSuccess, onError));
        } else if (type === "Roundodometer") {
          setLoading(true);
          disptach(nse_D_BookingRound_Odometer(searchData, onSuccess, onError));
        } else if (type === "Rounddropoff") {
          setLoading(true);
          disptach(
            nse_D_BookingRound_DropOffUpdated(searchData, onSuccess, onError)
          );
        } else if (type === "roundpayment") {
          setLoading(true);
          disptach(nse_D_BookingRound_Payment(searchData, onSuccess, onError));
        } else if (type === "roundcancelled") {
          setLoading(true);
          disptach(
            nse_D_BookingRound_Cancelled(searchData, onSuccess, onError)
          );
        } else if (type === "roundaccident") {
          setLoading(true);
          disptach(nse_D_BookingRound_Accident(searchData, onSuccess, onError));
        } else if (type === "roundreview") {
          setLoading(true);
          disptach(nse_D_BookingRound_Review(searchData, onSuccess, onError));
        } else if (type === "roundmaxlimit") {
          setLoading(true);
          disptach(
            nse_D_BookingRound_MaxLimitReached(searchData, onSuccess, onError)
          );
        } else if (type === "roundreturntrip") {
          setLoading(true);
          disptach(
            nse_D_BookingRound_ReturnTrip(searchData, onSuccess, onError)
          );
        }
      } else if (mainType === "Payment") {
        if (type === "Paymentfine") {
          setLoading(true);
          disptach(nse_D_PaymentFineList(searchData, onSuccess, onError));
        } else if (type === "Paymentreceived") {
          setLoading(true);
          disptach(nse_D_PaymentReceivedList(searchData, onSuccess, onError));
        } else if (type === "Paymentdue") {
          setLoading(true);
          disptach(nse_D_PaymentDueList(searchData, onSuccess, onError));
        } else if (type === "driverCurrentBalance") {
          setLoading(true);
          disptach(nse_D_PaymentDriverCBList(searchData, onSuccess, onError));
        } else if (type === "cashout") {
          setLoading(true);
          disptach(nse_D_Cashout_List(searchData, onSuccess, onError));
        }
      } else if (mainType === "emergencySOS") {
        if (type === "sos-DuringTrip") {
          setLoading(true);
          disptach(
            nse_D_EmerSOS_DuringTripList(searchData, onSuccess, onError)
          );
        } else if (type === "sosNoTrip") {
          setLoading(true);
          disptach(nse_D_EmerSOS_NoTripList(searchData, onSuccess, onError));
        } else if (type === "sosMessaging") {
          setLoading(true);
          disptach(nse_D_EmerSOS_MessagingList(searchData, onSuccess, onError));
        }
      } else if (mainType === "appMessaging") {
        if (type === "driverToRider") {
          setLoading(true);
          disptach(
            nse_D_INAPPMESS_DuringTripList(searchData, onSuccess, onError)
          );
        } else if (type === "complaintOngoing") {
          setLoading(true);
          disptach(
            nse_D_INAPPMESS_ComplaintList(searchData, onSuccess, onError)
          );
        } else if (type === "complaintClosedResolved") {
          setLoading(true);
          disptach(
            nse_D_INAPPMESS_RESCLOSEDList(searchData, onSuccess, onError)
          );
        }
      } else if (mainType === "Incentives") {
        if (type === "slottime") {
          setLoading(true);
          disptach(
            nse_D_Incentive_SlotStartTimeList(searchData, onSuccess, onError)
          );
        } else if (type === "inprogress") {
          setLoading(true);
          disptach(
            nse_D_Incentive_InprogressList(searchData, onSuccess, onError)
          );
        } else if (type === "slotremainingtime") {
          setLoading(true);
          disptach(
            nse_D_Incentive_SlotRemainingTimeList(
              searchData,
              onSuccess,
              onError
            )
          );
        } else if (type === "completedsuccess") {
          setLoading(true);
          disptach(
            nse_D_Incentive_CompletedSuccessList(searchData, onSuccess, onError)
          );
        }
      }
    }
  }, [type, mainType, nseType, search]);

  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    setNseList(data?.data);
    console.log(data?.data, "adsdadas");
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    setErrorMessage(data?.data?.data);
    console.log(data);
  };

  console.log(errorMessage);

  return (
    <>
      <div className="row mt-3 g-0">
        <div className="col-12 table_container">
          {loading && <LoadingSpinnerTable />}
          <table className="table text-nowrap">
            <thead>
              <tr className="pale_blue_bg">
                {tableHeading.map((item, index) => {
                  const isActiveSortIndex = activeSortIndex === index;
                  return (
                    <SearchInputfield
                      title={item?.title}
                      requestSort={requestSort}
                      sortName={item?.value}
                      key={item?.title}
                      index={index}
                      table_border_radius={index === 0 && "first_list"}
                      isActiveSortIndex={isActiveSortIndex}
                      setActiveSortIndex={setActiveSortIndex}
                      sortConfig={sortConfig}
                    />
                  );
                })}

{/* <th className={`${style.last_list} transparent_bg`}></th>      */}
              </tr>
            </thead>

            <tbody className="light_blue_bg">
              <LoadAndError
                loader={loading}
                error={error}
                status={nseList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => {
                  return (
                    <tr>
                      <td className="secondary_color fw_500 fs_14">
                        {item?.nse_code ?? "--"}
                      </td>
                      <td className="secondary_color fw_500 fs_14">
                        {item?.nse_account_inner_type
                          ? removeUnderScore(item?.nse_account_inner_type)
                          : item?.nse_booking_sub_no_rides_available_local_type
                            ? removeUnderScore(
                              item?.nse_booking_sub_no_rides_available_local_type
                            )
                            : item?.nse_booking_sub_ongoing_booking_local_type
                              ? removeUnderScore(
                                item?.nse_booking_sub_ongoing_booking_local_type
                              )
                              : item?.nse_booking_sub_cancelled_booking_local_type
                                ? removeUnderScore(
                                  item?.nse_booking_sub_cancelled_booking_local_type
                                )
                                : item?.nse_booking_sub_accident_booking_local_type
                                  ? removeUnderScore(
                                    item?.nse_booking_sub_accident_booking_local_type
                                  )
                                  : item?.nse_booking_sub_review_pending_local_type
                                    ? removeUnderScore(
                                      item?.nse_booking_sub_review_pending_local_type
                                    )
                                    : item?.nse_booking_sub_no_rides_available_rental_type
                                      ? removeUnderScore(
                                        item?.nse_booking_sub_no_rides_available_rental_type
                                      )
                                      : item?.nse_booking_sub_ongoing_booking_rental_type
                                        ? removeUnderScore(
                                          item?.nse_booking_sub_ongoing_booking_rental_type
                                        )
                                        : item?.nse_booking_sub_cancelled_booking_rental_type
                                          ? removeUnderScore(
                                            item?.nse_booking_sub_cancelled_booking_rental_type
                                          )
                                          : item?.nse_booking_sub_accident_booking_renatl_type
                                            ? removeUnderScore(
                                              item?.nse_booking_sub_accident_booking_renatl_type
                                            )
                                            : item?.nse_booking_sub_review_pending_rental_type
                                              ? removeUnderScore(
                                                item?.nse_booking_sub_review_pending_rental_type
                                              )
                                              : item?.nse_booking_sub_ride_sheduled_oneway_type
                                                ? removeUnderScore(
                                                  item?.nse_booking_sub_ride_sheduled_oneway_type
                                                )
                                                : item?.nse_booking_sub_no_rides_available_oneway_type
                                                  ? removeUnderScore(
                                                    item?.nse_booking_sub_no_rides_available_oneway_type
                                                  )
                                                  : item?.nse_booking_sub_ongoing_booking_oneway_type
                                                    ? removeUnderScore(
                                                      item?.nse_booking_sub_ongoing_booking_oneway_type
                                                    )
                                                    : item?.nse_booking_sub_cancelled_booking_oneway_type
                                                      ? removeUnderScore(
                                                        item?.nse_booking_sub_cancelled_booking_oneway_type
                                                      )
                                                      : item?.nse_booking_sub_accident_booking_oneway_type
                                                        ? removeUnderScore(
                                                          item?.nse_booking_sub_accident_booking_oneway_type
                                                        )
                                                        : item?.nse_booking_sub_review_pending_oneway_type
                                                          ? removeUnderScore(
                                                            item?.nse_booking_sub_review_pending_oneway_type
                                                          )
                                                          : item?.nse_booking_sub_odometer_oneway_type
                                                            ? removeUnderScore(
                                                              item?.nse_booking_sub_odometer_oneway_type
                                                            )
                                                            : item?.nse_booking_sub_ride_sheduled_round_type
                                                              ? removeUnderScore(
                                                                item?.nse_booking_sub_ride_sheduled_round_type
                                                              )
                                                              : item?.nse_booking_sub_no_rides_available_round_type
                                                                ? removeUnderScore(
                                                                  item?.nse_booking_sub_no_rides_available_round_type
                                                                )
                                                                : item?.nse_booking_sub_ongoing_booking_round_type
                                                                  ? removeUnderScore(
                                                                    item?.nse_booking_sub_ongoing_booking_round_type
                                                                  )
                                                                  : item?.nse_booking_sub_cancelled_booking_round_type
                                                                    ? removeUnderScore(
                                                                      item?.nse_booking_sub_cancelled_booking_round_type
                                                                    )
                                                                    : item?.nse_booking_sub_accident_booking_round_type
                                                                      ? removeUnderScore(
                                                                        item?.nse_booking_sub_accident_booking_round_type
                                                                      )
                                                                      : item?.nse_booking_sub_review_pending_round_type
                                                                        ? removeUnderScore(
                                                                          item?.nse_booking_sub_review_pending_round_type
                                                                        )
                                                                        : item?.nse_booking_sub_odometer_round_type
                                                                          ? removeUnderScore(
                                                                            item?.nse_booking_sub_odometer_round_type
                                                                          )
                                                                          : item?.nse_payment_sub_pending_type
                                                                            ? removeUnderScore(item?.nse_payment_sub_pending_type)
                                                                            : item?.nse_payment_sub_success_type
                                                                              ? removeUnderScore(item?.nse_payment_sub_success_type)
                                                                              : item?.nse_payment_sub_current_balance_type
                                                                                ? removeUnderScore(
                                                                                  item?.nse_payment_sub_current_balance_type
                                                                                )
                                                                                : item?.nse_payment_sub_wallet_type
                                                                                  ? removeUnderScore(item?.nse_payment_sub_wallet_type)
                                                                                  : item?.nse_emergency_sos_sub_during_trip_type
                                                                                    ? removeUnderScore(
                                                                                      item?.nse_emergency_sos_sub_during_trip_type
                                                                                    )
                                                                                    : item?.nse_emergency_sos_sub_no_trip_type
                                                                                      ? removeUnderScore(
                                                                                        item?.nse_emergency_sos_sub_no_trip_type
                                                                                      )
                                                                                      : item?.nse_emergency_sos_sub_messaging_type
                                                                                        ? removeUnderScore(
                                                                                          item?.nse_emergency_sos_sub_messaging_type
                                                                                        )
                                                                                        : item?.nse_In_app_messaging_sub_driver_to_rider_type
                                                                                          ? removeUnderScore(
                                                                                            item?.nse_In_app_messaging_sub_driver_to_rider_type
                                                                                          )
                                                                                          : item?.nse_In_app_messaging_sub_complaint_ongoing_type
                                                                                            ? removeUnderScore(
                                                                                              item?.nse_In_app_messaging_sub_complaint_ongoing_type
                                                                                            )
                                                                                            : item?.nse_In_app_messaging_sub_resloved_closed_type
                                                                                              ? removeUnderScore(
                                                                                                item?.nse_In_app_messaging_sub_resloved_closed_type
                                                                                              )
                                                                                              : item?.nse_booking_sub_ongoing_dropoff_updated_rental_type
                                                                                                ? removeUnderScore(
                                                                                                  item?.nse_booking_sub_ongoing_dropoff_updated_rental_type
                                                                                                )
                                                                                                : item?.nse_booking_sub_ongoing_payment_method_rental_type
                                                                                                  ? removeUnderScore(
                                                                                                    item?.nse_booking_sub_ongoing_payment_method_rental_type
                                                                                                  )
                                                                                                  : item?.nse_booking_sub_accident_booking_rental_type
                                                                                                    ? removeUnderScore(
                                                                                                      item?.nse_booking_sub_accident_booking_rental_type
                                                                                                    )
                                                                                                    : item?.nse_booking_sub_ongoing_rental_daily_work_type
                                                                                                      ? removeUnderScore(
                                                                                                        item?.nse_booking_sub_ongoing_rental_daily_work_type
                                                                                                      )
                                                                                                      : item?.nse_booking_sub_ongoing_dropoff_updated_oneway_type
                                                                                                        ? removeUnderScore(
                                                                                                          item?.nse_booking_sub_ongoing_dropoff_updated_oneway_type
                                                                                                        )
                                                                                                        : item?.nse_booking_sub_ongoing_payment_method_oneway_type
                                                                                                          ? removeUnderScore(
                                                                                                            item?.nse_booking_sub_ongoing_payment_method_oneway_type
                                                                                                          )
                                                                                                          : item?.nse_booking_sub_max_days_reached_oneway_type
                                                                                                            ? removeUnderScore(
                                                                                                              item?.nse_booking_sub_max_days_reached_oneway_type
                                                                                                            )
                                                                                                            : item?.nse_booking_sub_return_trip_round_type
                                                                                                              ? removeUnderScore(
                                                                                                                item?.nse_booking_sub_return_trip_round_type
                                                                                                              )
                                                                                                              : item?.nse_booking_sub_ongoing_dropoff_updated_round_type
                                                                                                                ? removeUnderScore(
                                                                                                                  item?.nse_booking_sub_ongoing_dropoff_updated_round_type
                                                                                                                )
                                                                                                                : item?.nse_booking_sub_ongoing_payment_method_round_type
                                                                                                                  ? removeUnderScore(
                                                                                                                    item?.nse_booking_sub_ongoing_payment_method_round_type
                                                                                                                  )
                                                                                                                  : item?.nse_booking_sub_max_days_reached_round_type
                                                                                                                    ? removeUnderScore(
                                                                                                                      item?.nse_booking_sub_max_days_reached_round_type
                                                                                                                    )
                                                                                                                    : item?.nse_payment_sub_fine_type
                                                                                                                      ? removeUnderScore(item?.nse_payment_sub_fine_type)
                                                                                                                      : item?.nse_payment_sub_recived_type
                                                                                                                        ? removeUnderScore(item?.nse_payment_sub_recived_type)
                                                                                                                        : item?.nse_payment_sub_due_type
                                                                                                                          ? removeUnderScore(item?.nse_payment_sub_due_type)
                                                                                                                          : item?.nse_payment_sub_cb_type
                                                                                                                            ? removeUnderScore(item?.nse_payment_sub_cb_type)
                                                                                                                            : item?.nse_payment_sub_cashout_type
                                                                                                                              ? removeUnderScore(item?.nse_payment_sub_cashout_type)
                                                                                                                              : item?.nse_incentive_sub_start_time_type
                                                                                                                                ? removeUnderScore(
                                                                                                                                  item?.nse_incentive_sub_start_time_type
                                                                                                                                )
                                                                                                                                : item?.nse_incentive_sub_inprogress_type
                                                                                                                                  ? removeUnderScore(
                                                                                                                                    item?.nse_incentive_sub_inprogress_type
                                                                                                                                  )
                                                                                                                                  : item?.nse_incentive_sub_remaining_time_type
                                                                                                                                    ? removeUnderScore(
                                                                                                                                      item?.nse_incentive_sub_remaining_time_type
                                                                                                                                    )
                                                                                                                                    : item?.nse_incentive_sub_completed_type
                                                                                                                                      ? removeUnderScore(
                                                                                                                                        item?.nse_incentive_sub_completed_type
                                                                                                                                      )
                                                                                                                                      :
                                                                                                                                      item?.nse_booking_sub_ongoing_stop_added_local_type
                                                                                                                                        ? removeUnderScore(
                                                                                                                                          item?.nse_booking_sub_ongoing_stop_added_local_type
                                                                                                                                        )
                                                                                                                                        : item?.nse_booking_sub_ongoing_dropoff_updated_local_type
                                                                                                                                          ? removeUnderScore(
                                                                                                                                            item?.nse_booking_sub_ongoing_dropoff_updated_local_type
                                                                                                                                          )
                                                                                                                                          :
                                                                                                                                          item?.nse_booking_sub_ongoing_payment_method_local_type
                                                                                                                                            ? removeUnderScore(
                                                                                                                                              item?.nse_booking_sub_ongoing_payment_method_local_type
                                                                                                                                            )
                                                                                                                                            : "--"}
                      </td>
                      <td className={`${statusColor(item?.status)} fw_500 fs_14`}>
                        {item?.status ?? "--"}
                      </td>
                      <td className="secondary_color fw_500 fs_14">
                        {formatDateTime(item?.updated_at)}
                      </td>
                      {riderdrivertype === "Rider" ? (
                        <>
                          <td>
                            <button
                              className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 white_color blue_color_bg"
                              onClick={() =>
                                navigate(
                                  `/rider/notification/sms/email/view/${item?.id}`
                                )
                              }
                            >
                              View
                            </button>{" "}
                            {
                              canWrite(permission) && (

                                <button
                                  className="border_none border_radius text-decoration-none primary_bg white_color fs_14 px-3 view_text"
                                  onClick={() =>
                                    navigate(
                                      `/rider/notification/sms/email/edit/${item?.id}`
                                    )
                                  }
                                >
                                  Edit
                                </button>
                              )}





                          </td>
                        </>
                      ) : riderdrivertype === "Driver" ? (
                        <>
                          <td>
                            <button
                              className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 white_color blue_color_bg"
                              onClick={() =>
                                navigate(
                                  `/driver/notification/sms/email/view/${item?.id}`
                                )
                              }
                            >
                              View
                            </button>{" "}
                            {
                              canWrite(permission) &&
                              (
                                <button
                                  className="border_none border_radius text-decoration-none primary_bg white_color fs_14 px-3 view_text"
                                  onClick={() =>
                                    navigate(
                                      `/driver/notification/sms/email/edit/${item?.id}`
                                    )
                                  }
                                >
                                  Edit
                                </button>
                              )}

                          </td>
                        </>
                      ) : null}
                    </tr>
                  );
                })}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NseTable;
