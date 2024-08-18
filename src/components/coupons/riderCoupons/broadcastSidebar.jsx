import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  couponLocalZoneListAction,
  couponMainZoneListAction,
  couponOutstationZoneListAction,
  couponSpecialZoneListAction,
} from "../../../redux/actions/riderCoupon/createCouponAction";
import { insertSpaces } from "../../helper";
import SpinnerLoading from "../../utilits/spinnerLoading";

const CouponBroadcastSidebar = ({ broadcastData }) => {
  console.log(broadcastData);
  console.log(broadcastData?.amountoff);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mainZonelist, setMainZonelist] = useState([]);
  const [moreZone, setMoreZone] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    setLoading(false);
    setMainZonelist(
      data?.data?.map((item) => {
        return { label: item?.zone_name, value: item?.id };
      })
    );
  };

  const onFetchError = () => {
    setLoading(false);
  };

  const zoneName = mainZonelist
    ?.filter((item) => {
      return Array.isArray(broadcastData?.coupon_applicable_zone)
        ? broadcastData?.coupon_applicable_zone?.find(
          (content) => content === item.value
        )
        : "";
    })
    ?.map((item) => {
      return item.label;
    });

  const [localZoneList, setLocalZoneList] = useState();
  const [specialZoneList, setSpecialZoneList] = useState();
  const [outstationZoneList, setOutstationZoneList] = useState();

  useEffect(() => {
    setLoading(true);
    dispatch(
      couponLocalZoneListAction(
        {
          main_zone_id: broadcastData?.coupon_applicable_zone,
        },
        onLocalListSuccess,
        onLocalListError
      )
    );
    dispatch(
      couponSpecialZoneListAction(
        {
          main_zone_id: broadcastData?.coupon_applicable_zone,
        },
        onSpecialListSuccess,
        onSpecialListError
      )
    );
    dispatch(
      couponOutstationZoneListAction(
        {
          main_zone_id: broadcastData?.coupon_applicable_zone,
        },
        onOutstationListSuccess,
        onOutstationListError
      )
    );
  }, []);

  const onLocalListSuccess = (data) => {
    setLoading(false);
    console.log(data?.data);
    setLocalZoneList(
      data?.data?.map((item) => {
        return { label: item?.city_name, value: item?.id };
      })
    );
  };
  const onLocalListError = (data) => {
    setLoading(false);
  };

  const zoneLocalName = localZoneList?.filter((item) => {
    return broadcastData?.booking_destination?.find(
      (content) => content === item.value
    );
  });

  const onSpecialListSuccess = (data) => {
    setLoading(false);
    console.log(data?.data);
    setSpecialZoneList(
      data?.data?.map((item) => {
        return { label: item?.city_name, value: item?.id };
      })
    );
  };
  const onSpecialListError = (data) => {
    setLoading(false);
  };

  const zoneSpecialName = specialZoneList?.filter((item) => {
    return broadcastData?.booking_destination?.find(
      (content) => content === item.value
    );
  });

  const onOutstationListSuccess = (data) => {
    setLoading(false);
    console.log(data?.data);
    setOutstationZoneList(
      data?.data?.map((item) => {
        return { label: item?.city_name, value: item?.id };
      })
    );
  };

  const onOutstationListError = (data) => {
    setLoading(false);
  };

  const zoneOutStationName = outstationZoneList?.filter((item) => {
    return broadcastData?.booking_destination?.find(
      (content) => content === item.value
    );
  });

  const localZoneListName = zoneLocalName?.map((item) => {
    return item.label;
  });

  const OutstationZoneListName = zoneOutStationName?.map((item) => {
    return item.label;
  });

  const specialZoneListName = zoneSpecialName?.map((item) => {
    return item.label;
  });

  // const rideTypeListName = broadcastData?.ride_type
  //   ? Object?.keys(broadcastData?.ride_type).filter(
  //       (key) => broadcastData?.ride_type[key]
  //     )
  //   : "";

  const pickUpZoneLocalName = localZoneList?.find((item) => {
    if (item?.value === broadcastData?.pickup_location) {
      return item.label;
    }
  });
  const pickUpSpecialZoneName = specialZoneList?.find((item) => {
    if (item?.value === broadcastData?.pickup_location) {
      return item.label;
    }
  });

  const dropUpZoneLocalName = localZoneList?.find((item) => {
    if (item?.value === broadcastData?.dropoff_location) {
      return item.label;
    }
  });
  const dropUpSpecialZoneName = specialZoneList?.find((item) => {
    if (item?.value === broadcastData?.dropoff_location) {
      return item.label;
    }
  });

  console.log(broadcastData);

  const sideBarData = [
    { id: "1", label: "Coupon ID", value: broadcastData?.coupon_id ?? "--" },
    { id: "2", label: "User Type", value: broadcastData?.user_type ?? "--" },
    {
      id: "3",
      label: "Coupon Classification",
      value: broadcastData?.coupon_classification
        ? insertSpaces(broadcastData?.coupon_classification)
        : "--",
    },
    {
      id: "4",
      label: "Coupon Classification Details",
      value: broadcastData?.coupon_classification_details ?? "N/A",
    },
    {
      id: "5",
      label: "Coupon Applicable Zone",
      value: loading ? (
        <SpinnerLoading />
      ) : zoneName?.length > 1 ? (
        <span className="d-flex align-items-center gap-1">
          All{" "}
          <span>
            <i
              className="ri-information-fill cursor_pointer"
              onClick={() => setMoreZone(!moreZone)}
            />
          </span>
        </span>
      ) : (
        zoneName
      ),
    },
    {
      id: "6",
      label: "Coupon Type",
      value: broadcastData?.coupon_type
        ? insertSpaces(broadcastData?.coupon_type)
        : "--",
    },
    { id: "7", heading: "Discount Details*" },
    {
      id: "8",
      label: "Coupon Code",
      value: broadcastData?.coupon_code ?? "--",
    },
    {
      id: "9",
      label: "Coupon Title",
      value: broadcastData?.coupon_title ?? "--",
    },
    {
      id: "10",
      label: (
        <span>
          Coupon Description <br />
          (for admins reference)
        </span>
      ),
      value: broadcastData?.coupon_description ?? "--",
    },
    {
      id: "11",
      label: "Total Usage Limit",
      value: broadcastData?.total_usage_limit ?? "--",
    },
    {
      id: "12",
      label: "Usage Limit Per Account",
      value: broadcastData?.usage_limit_per_account ?? "--",
    },
    {
      id: "13",
      label: (
        <span
          className={`${broadcastData?.coupon_classification === "NewAccountLifeSpan"
            ? "d-block"
            : "d-none"
            }`}
        >
          Coupon Life Span(Days)*
        </span>
      ),
      value: (
        <span
          className={`${broadcastData?.coupon_classification === "NewAccountLifeSpan"
            ? "d-block"
            : "d-none"
            }`}
        >
          {broadcastData?.coupon_life_span ?? "--"}
        </span>
      ),
    },
    {
      id: "14",
      label: (
        <span
          className={`${broadcastData.coupon_type !== "XAmountOff" && "d-none"
            }`}
        >
          Amount Off (₹)
        </span>
      ),
      value: (
        <span
          className={`${broadcastData.coupon_type !== "XAmountOff" && "d-none"
            }`}
        >
          {broadcastData?.amountOff ?? "--"}
        </span>
      ),
    },
    {
      id: "15",
      label: (
        <span
          className={`${broadcastData.coupon_type !== "X%DiscountUpToY" && "d-none"
            }`}
        >
          % Discount
        </span>
      ),
      value: (
        <span
          className={`${broadcastData.coupon_type !== "X%DiscountUpToY" && "d-none"
            }`}
        >
          {broadcastData?.discount ?? "--"}
        </span>
      ),
    },
    {
      id: "16",
      label: (
        <span
          className={`${broadcastData.coupon_type !== "X%DiscountUpToY" && "d-none"
            }`}
        >
          Max Discount In Rs
        </span>
      ),
      value: (
        <span
          className={`${broadcastData.coupon_type !== "X%DiscountUpToY" && "d-none"
            }`}
        >
          {broadcastData?.max_amount_in_rs ?? "--"}
        </span>
      ),
    },
    {
      id: "17",
      label: (
        <span
          className={`${broadcastData.coupon_type !== "X%CashbackUpToY" && "d-none"
            }`}
        >
          % Cashback
        </span>
      ),
      value: (
        <span
          className={`${broadcastData.coupon_type !== "X%CashbackUpToY" && "d-none"
            }`}
        >
          {broadcastData?.cashback ?? "--"}
        </span>
      ),
    },
    {
      id: "18",
      label: (
        <span
          className={`${broadcastData.coupon_type !== "X%CashbackUpToY" && "d-none"
            }`}
        >
          Max Cashback In Rs
        </span>
      ),
      value: (
        <span
          className={`${broadcastData.coupon_type !== "X%CashbackUpToY" && "d-none"
            }`}
        >
          {broadcastData?.max_cashback_in_rs ?? "--"}
        </span>
      ),
    },
    {
      id: "19",
      label: "Booking Type",
      value: broadcastData?.booking_type ?? "--",
    },
    {
      id: "20",
      label: "Ride Type",
      value: broadcastData?.ride_type ? broadcastData?.ride_type?.join(", ") : "--",
    },
    {
      id: "21",
      heading: "Campaign Details*",
      label: "Activation At",
      value: broadcastData?.start_date
        ?
        // ((moment(broadcastData?.start_date).format("DD-MM-YYYY") +
        //   "," +
        //   broadcastData?.start_time) ?? "--")
        ((broadcastData?.start_date && broadcastData?.start_time) ? moment(broadcastData?.start_date).format("DD-MM-YYYY") +
          "," +
          broadcastData?.start_time : "--")
        : "--",
    },
    {
      id: "22",
      label: "Expiry At",
      value: broadcastData?.expiry_date
        ?
        // ((moment(broadcastData?.expiry_date).format("DD-MM-YYYY") +
        //     "," +
        //     broadcastData?.expiry_time) ?? "--")
        ((broadcastData?.expiry_date && broadcastData?.expiry_time) ? moment(broadcastData?.expiry_date).format("DD-MM-YYYY") +
          "," +
          broadcastData?.expiry_time : "--")
        : "--",
    },
  ];

  const PlayMentData = [
    {
      id: "23",
      label: "Payment Method",
      value: broadcastData?.payment_method ?? "--",
    },
  ];

  function bookingDestinationFn() {
    if (broadcastData?.booking_destination_type === "SpecialZone") {
      return broadcastData?.booking_destination
        ? specialZoneListName?.join(", ")
        : "--";
    } else if (broadcastData?.booking_destination_type === "LocalDefinedCity") {
      return broadcastData?.booking_destination
        ? localZoneListName?.join(", ")
        : "--";
    } else if (
      broadcastData?.booking_destination_type === "OutstationDefinedCity"
    ) {
      return broadcastData?.booking_destination
        ? OutstationZoneListName?.join(", ")
        : "--";
    }
  }

  const bookingDestination = bookingDestinationFn();

  const BookingDestinationData = [
    {
      id: "24",
      label: "Booking Destination Type",
      value: broadcastData?.booking_destination_type ?? "--",
    },
    {
      id: "25",
      label: "Booking Destination",
      value: bookingDestination,
    },
  ];

  function PickupToLocationFn() {
    if (broadcastData?.pickup_location_type === "LocalDefinedCity") {
      return broadcastData?.pickup_location ? pickUpZoneLocalName?.label : "--";
    } else if (broadcastData?.pickup_location_type === "SpecialZone") {
      return broadcastData?.pickup_location
        ? pickUpSpecialZoneName?.label
        : "--";
    }
  }
  const PickupLocation = PickupToLocationFn();

  function DropoffLocationFn() {
    if (broadcastData?.dropoff_location_type === "LocalDefinedCity") {
      return broadcastData?.pickup_location ? dropUpZoneLocalName?.label : "--";
    } else if (broadcastData?.dropoff_location_type === "SpecialZone") {
      return broadcastData?.pickup_location
        ? dropUpSpecialZoneName?.label
        : "--";
    }
  }
  const DropoffLocation = DropoffLocationFn();

  const PickupToDropoffData = [
    {
      id: "26",
      label: "Pickup Location Type",
      value: broadcastData?.pickup_location_type ?? "--",
    },
    {
      id: "27",
      label: "Pickup Location",
      value: PickupLocation,
    },
    {
      id: "28",
      label: "Drop-Off Location Type",
      value: broadcastData?.pickup_location_type ?? "--",
    },
    {
      id: "29",
      label: "Drop-Off Location",
      value: DropoffLocation,
    },
  ];

  const RentalPackageMilData = [
    {
      id: "30",
      label: "Rental Package Milestone*",
      value: broadcastData?.rental_package_milestone ?? "--",
    },
  ];

  const RentalPackageRangeData = [
    {
      id: "31",
      label: "Rental Package Range - Start",
      value: broadcastData?.rental_package_range_start ?? "--",
    },
    {
      id: "32",
      label: "Rental Package Range - End",
      value: broadcastData?.rental_package_range_end ?? "--",
    },
  ];

  const BookingDisMilData = [
    {
      id: "33",
      label: "Booking Distance Milestone (Km)*",
      value: broadcastData?.booking_distance_milestone ?? "--",
    },
  ];

  const BookingDisRangeData = [
    {
      id: "34",
      label: "Booking Distance Range (Km) Start",
      value: broadcastData?.booking_distance_range_start ?? "--",
    },
    {
      id: "35",
      label: "Booking Distance Range (Km) End",
      value: broadcastData?.booking_distance_range_end ?? "--",
    },
  ];

  const OutStationMilData = [
    {
      id: "36",
      label: "Outstation Package Milestone (Km)*",
      value: broadcastData?.outstationPackageMilestone ?? "--",
    },
  ];
  const OutStationRangeData = [
    {
      id: "37",
      label: "Outstation Package Range - Start",
      value: broadcastData?.outstation_package_range_start ?? "--",
    },
    {
      id: "38",
      label: "Outstation Package Range - End",
      value: broadcastData?.outstation_package_range_end ?? "--",
    },
  ];

  const CouponUsageDetailsData = [
    {
      heading: "Coupon Usage Details*",
      label: "Accounts Availed",
      value: broadcastData?.accounts_availed ?? "--",
    },
    {
      label: "Total Coupons Used",
      value: broadcastData?.total_coupon_used ?? "--",
    },
  ];

  if (broadcastData?.coupon_classification === "PaymentMethod") {
    sideBarData.splice(7, 0, ...PlayMentData);
  } else if (broadcastData?.coupon_classification === "BookingDestination") {
    sideBarData.splice(7, 0, ...BookingDestinationData);
  } else if (broadcastData?.coupon_classification === "PickupToDropoff") {
    sideBarData.splice(7, 0, ...PickupToDropoffData);
  } else if (
    broadcastData?.coupon_classification === "RentalPackage" &&
    broadcastData?.coupon_classification_details === "Milestone"
  ) {
    sideBarData.splice(7, 0, ...RentalPackageMilData);
  } else if (
    broadcastData?.coupon_classification === "RentalPackage" &&
    broadcastData?.coupon_classification_details === "Range"
  ) {
    sideBarData.splice(7, 0, ...RentalPackageRangeData);
  } else if (
    broadcastData?.coupon_classification === "BookingDistance" &&
    broadcastData?.coupon_classification_details === "Milestone"
  ) {
    sideBarData.splice(7, 0, ...BookingDisMilData);
  } else if (
    broadcastData?.coupon_classification === "BookingDistance" &&
    broadcastData?.coupon_classification_details === "Range"
  ) {
    sideBarData.splice(7, 0, ...BookingDisRangeData);
  } else if (
    broadcastData?.coupon_classification === "OutstationPackageDistance"
  ) {
    sideBarData.splice(7, 0, ...OutStationMilData);
  } else if (
    broadcastData?.coupon_classification === "OutstationPackageDistance" &&
    broadcastData?.coupon_classification_details === "Range"
  ) {
    sideBarData.splice(7, 0, ...OutStationRangeData);
  }
  if (
    broadcastData?.coupon_status === "Active" ||
    broadcastData?.coupon_status === "Deleted" ||
    broadcastData?.coupon_status === "Expired"
  ) {
    sideBarData.push(...CouponUsageDetailsData);
  }
  return (
    <>
      <table className="fs_14 fw_500">
        <tbody>
          {sideBarData?.map((item, index) => {
            return (
              <React.Fragment key={item?.id}>
                {item?.heading && (
                  <tr className="">
                    <td
                      className="fs_16 primary_color fw_500 text_underline pt-3 pb-2"
                      colSpan="2"
                    >
                      {item?.heading}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="secondary_color pe-2 w-50" valign="top">
                    {item?.label}
                  </td>
                  <td
                    className={`primary_color position-relative d-flex align-items-center`}
                    valign="top"
                  >
                    {item?.value}
                    {item?.label === "Coupon Applicable Zone"
                      ? moreZone === true && (
                        <div className="position-absolute moreZone_container p-2">
                          <span>{zoneName.join(", ")}</span>
                        </div>
                      )
                      : ""}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CouponBroadcastSidebar;
