import React, { useMemo } from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import moment from "moment";
import { formattedAddressFn } from "../../helper";
import greenCheckImage from "../../../assets/images/green-check-image.png";
import profileImg from "../../../assets/images/profileimage.png";
import defaultImg from "../../../assets/images/default-image.png";

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    fontFamiy: "Roboto-Bold",
    fontSize: 12,
    lineHeight: 1.4,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 20,
    height: "100vh",
  },
  top: {
    flex: 1,
  },
  labels: {
    color: "#687284",
    fontSize: "11px",
  },
  values: {
    fontSize: "11px",

    color: "#0F203C",
  },
  RowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5px",
  },
  h1: {
    fontSize: 32,
    marginBottom: 16,
  },
  body_container: {
    marginHorizontal: "40px",
  },
  verticleLine: {
    height: "6px",
    width: 2,
    // paddingTop: 2,
    marginTop: 3,
    // paddingBottom: 1,
    backgroundColor: "#909090",
    marginLeft: 2.8,
  },
  verticleLineHidden: {
    height: "4px",
    width: 2,
    backgroundColor: "#ffffff",
    marginLeft: 2.8,
  },
  nextVerticleLine: {
    height: "6px",
    width: 2,
    backgroundColor: "#909090",
    marginLeft: 2.8,
    marginTop: 3,
  },
  nextVerticleLineHidden: {
    height: "4px",
    width: 1,
    backgroundColor: "#ffffff",
    marginLeft: 2.8,
    // marginTop: "1px",
  },
});

const Body = ({ item }) => {
  const bookingStatus = () => {
    if (item?.booking?.is_completed === true) {
      return "Completed";
    } else if (item?.booking?.is_cancelled === true) {
      return "Cancelled";
    } else if (item?.booking?.is_accident === true) {
      return "Accident";
    } else {
      return "--";
    }
  };

  const bookingType = useMemo(() => {
    if (item?.booking?.booking_type === "LocalTrip") {
      return `Local trip (${item?.booking?.ride_type})`;
    } else if (item?.booking?.booking_type === "OneWayOutstation") {
      return `Outstation Oneway Trip (${item?.booking?.ride_type})`;
    } else if (item?.booking?.booking_type === "RoundTripOutstation") {
      return `Outstation Round Trip (${item?.booking?.ride_type})`;
    } else if (item?.booking?.booking_type === "RentalTrip") {
      return `Rental Trip (${item?.booking?.ride_type})`;
    } else {
      return "--";
    }
  }, [item?.booking?.booking_type]);

  const status = bookingStatus();

  const localtripData = [
    {
      label: "Trip Details",
      values: item?.booking?.trip_duration ?? "--",
    },
  ];

  const tripDataBeforeOtp = [
    {
      label: "Package Details",
      values: item?.booking?.package_details ?? "--",
    },
  ];

  const TripDataAfterOtp = [
    {
      label: "Package Details",
      values: item?.booking?.package_details ?? "--",
    },
    {
      label: "Trip Details",
      values: item?.booking?.trip_duration ?? "--",
    },
  ];
  const tripDetails = useMemo(() => {
    if (item?.booking?.booking_type === "LocalTrip") {
      return localtripData;
    } else {
      if (item?.booking?.start_otp === null) {
        return tripDataBeforeOtp;
      } else if (item?.booking?.start_otp !== null) {
        return TripDataAfterOtp;
      }
    }
  }, [item?.booking?.booking_type, item?.booking?.start_otp]);

  const paymentDetails = [
    {
      label: "Payment Method",
      values: item?.booking?.payment_method ?? "--",
      color: "#0F203C",
    },
    {
      label: "Payment Status",
      values:
        item?.booking?.driver_billing?.driver_trip_payout_status ===
        "payment received from driver(full)"
          ? "Recieved"
          : "Pending" ?? "--",
      color:
        item?.booking?.driver_billing?.driver_trip_payout_status ===
        "payment received from driver(full)"
          ? "#00AB2E"
          : "#D20000",
    },
    {
      label: "Transaction date",
      values: item?.booking?.rider_billing?.transaction_date
        ? moment(item?.booking?.rider_billing?.transaction_date).format(
            "DD-MM-YYYY h:mm:ss A"
          )
        : "--",
      color: "#0F203C",
    },
    {
      label: "Amount (INR)",
      values:
        item?.booking?.rider_billing?.final_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.final_fare).toFixed(2)
          : "--",
      color: "#0F203C",
    },
  ];

  const billingDetailsBeforeOtp = [
    {
      label: "Cancellation Fee",
      values:
        item?.booking?.rider_billing?.cancellation_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.cancellation_fee).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Taxes",
      values:
        item?.booking?.rider_billing?.total_taxes !== null
          ? parseFloat(item?.booking?.rider_billing?.total_taxes).toFixed(2)
          : "--",
    },
  ];

  const localBillingDetailsAfterOtp = [
    {
      label: "Base Fare",
      values:
        item?.booking?.rider_billing?.base_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.base_fare).toFixed(2)
          : "--",
    },
    {
      label: "Remaining Trip Fare",
      values:
        item?.booking?.rider_billing?.remaining_trip_fare !== null
          ? parseFloat(
              item?.booking?.rider_billing?.remaining_trip_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      values:
        item?.booking?.rider_billing?.waiting_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.waiting_fee).toFixed(2)
          : "--",
    },
    {
      label: "Toll Fee",
      values:
        item?.booking?.rider_billing?.tolls_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.tolls_fee).toFixed(2)
          : "--",
    },
    {
      label: "Parking Fee",
      values:
        item?.booking?.rider_billing?.parking_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.parking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Transport Hub Fee",
      values:
        item?.booking?.rider_billing?.transport_hub_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.transport_hub_fee).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Booking Fee",
      values:
        item?.booking?.rider_billing?.booking_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.booking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Savings",
      values:
        item?.booking?.rider_billing?.coupon_savings !== null
          ? parseFloat(item?.booking?.rider_billing?.coupon_savings).toFixed(2)
          : "--",
    },
    {
      label: "Wallet Balance Applied",
      values:
        item?.booking?.rider_billing?.wallet_amount_applied !== null
          ? parseFloat(
              item?.booking?.rider_billing?.wallet_amount_applied
            ).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      values:
        item?.booking?.rider_billing?.tips !== null
          ? parseFloat(item?.booking?.rider_billing?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Taxes",
      values:
        item?.booking?.rider_billing?.total_taxes !== null
          ? parseFloat(item?.booking?.rider_billing?.total_taxes).toFixed(2)
          : "--",
    },
  ];
  const rentalBillingDetailsAfterOtp = [
    {
      label: "Base Fare",
      values:
        item?.booking?.rider_billing?.base_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.base_fare).toFixed(2)
          : "--",
    },
    {
      label: "Extra Km Fare",
      values:
        item?.booking?.rider_billing?.extra_km_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.extra_km_fare).toFixed(2)
          : "--",
    },
    {
      label: "Extra Time Fare (Mins)",
      values:
        item?.booking?.rider_billing?.extra_time_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.extra_time_fare).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      values:
        item?.booking?.rider_billing?.waiting_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.waiting_fee).toFixed(2)
          : "--",
    },

    {
      label: "Booking Fee",
      values:
        item?.booking?.rider_billing?.booking_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.booking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Savings",
      values:
        item?.booking?.rider_billing?.coupon_savings !== null
          ? parseFloat(item?.booking?.rider_billing?.coupon_savings).toFixed(2)
          : "--",
    },
    {
      label: "Wallet Balance Applied",
      values:
        item?.booking?.rider_billing?.wallet_amount_applied !== null
          ? parseFloat(
              item?.booking?.rider_billing?.wallet_amount_applied
            ).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      values:
        item?.booking?.rider_billing?.tips !== null
          ? parseFloat(item?.booking?.rider_billing?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Taxes",
      values:
        item?.booking?.rider_billing?.total_taxes !== null
          ? parseFloat(item?.booking?.rider_billing?.total_taxes).toFixed(2)
          : "--",
    },
  ];
  const outstationBillingDetialsAfterOtp = [
    {
      label: "Package Fare",
      values:
        item?.booking?.rider_billing?.package_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.package_fare).toFixed(2)
          : "--",
    },
    {
      label: "Extra Km Fare",
      values:
        item?.booking?.rider_billing?.extra_km_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.extra_km_fare).toFixed(2)
          : "--",
    },
    {
      label: "Extra Time Fare (Hrs)",
      values:
        item?.booking?.rider_billing?.extra_time_fare !== null
          ? parseFloat(item?.booking?.rider_billing?.extra_time_fare).toFixed(2)
          : "--",
    },
    {
      label: "Driver Allowance",
      values:
        item?.booking?.rider_billing?.driver_allowance !== null
          ? parseFloat(item?.booking?.rider_billing?.driver_allowance).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Night Allowance",
      values:
        item?.booking?.rider_billing?.night_allowance !== null
          ? parseFloat(item?.booking?.rider_billing?.night_allowance).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      values:
        item?.booking?.rider_billing?.waiting_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.waiting_fee).toFixed(2)
          : "--",
    },

    {
      label: "Booking Fee",
      values:
        item?.booking?.rider_billing?.booking_fee !== null
          ? parseFloat(item?.booking?.rider_billing?.booking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Savings",
      values:
        item?.booking?.rider_billing?.coupon_savings !== null
          ? parseFloat(item?.booking?.rider_billing?.coupon_savings).toFixed(2)
          : "--",
    },
    {
      label: "Wallet Balance Applied",
      values:
        item?.booking?.rider_billing?.wallet_amount_applied !== null
          ? parseFloat(
              item?.booking?.rider_billing?.wallet_amount_applied
            ).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      values:
        item?.booking?.rider_billing?.tips !== null
          ? parseFloat(item?.booking?.rider_billing?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Taxes",
      values:
        item?.booking?.rider_billing?.total_taxes !== null
          ? parseFloat(item?.booking?.rider_billing?.total_taxes).toFixed(2)
          : "--",
    },
  ];
  const billingDetails = useMemo(() => {
    if (item?.booking?.start_otp === null) {
      return billingDetailsBeforeOtp;
    } else if (item?.booking?.start_otp !== null) {
      if (item?.booking?.booking_type === "LocalTrip") {
        return localBillingDetailsAfterOtp;
      } else if (item?.booking?.booking_type === "OneWayOutstation") {
        return outstationBillingDetialsAfterOtp;
      } else if (item?.booking?.booking_type === "RoundTripOutstation") {
        return outstationBillingDetialsAfterOtp;
      } else if (item?.booking?.booking_type === "RentalTrip") {
        return rentalBillingDetailsAfterOtp;
      }
    }
  }, [item?.booking?.start_otp, item?.booking?.booking_type]);

  return (
    <>
      <View style={styles.body_container}>
        <View style={styles.left}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: "12px",
                  color: "#0F203C",
                  width: "90px",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Ride Details
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#687284",
                    width: "200px",
                  }}
                >
                  {bookingType}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    textAlign: "right",
                    alignContent: "flex-end",
                    width: "110px",
                  }}
                >
                  {status === "Completed" ? (
                    <Image
                      source={greenCheckImage}
                      style={{
                        height: "10px",
                        borderRadius: "5px",
                        marginTop: "2px",
                        marginRight: "2px",
                      }}
                    />
                  ) : null}

                  <Text
                    style={{
                      color: status === "Completed" ? "#00AB2E" : "#D20000",
                      fontSize: "12px",
                      fontFamily: "Helvetica-Bold",
                    }}
                  >
                    {status}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              {tripDetails?.map((entry) => {
                return (
                  <View style={{ flexDirection: "row" }} key={entry?.label}>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: "#0F203C",
                        width: "110px",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      {entry?.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        width: "140px",
                        color: "#687284",
                        textAlign: "left",
                      }}
                    >
                      {entry?.values}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <View style={{ flexDirection: "row", marginTop: "10px" }}>
                  <View>
                    {item?.booking?.driver?.profile_pic?.photo ? (
                      <Image
                        source={{
                          uri: item?.booking?.driver?.profile_pic?.photo,
                        }}
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      <Image
                        source={profileImg}
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </View>
                  <View style={{ marginLeft: "15px", marginTop: "30px" }}>
                    <Text style={{ color: "#0F203C", fontSize: "12px" }}>
                      {(item?.booking?.driver?.first_name ?? "--") +
                        " " +
                        (item?.booking?.driver?.last_name ?? "--")}
                    </Text>
                    <Text style={{ color: "#7F7F7F", fontSize: "10px" }}>
                      {(item?.booking?.driver?.vehicle_details?.vehicle_make ??
                        "--") +
                        "  " +
                        (item?.booking?.driver?.vehicle_details
                          ?.vehicle_model ?? "--")}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: "10px" }}>
                {item?.booking?.driver?.vehicle_type?.image ? (
                  <Image
                    source={{
                      uri: item?.booking?.driver?.vehicle_type?.image,
                    }}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <Image
                    source={defaultImg}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </View>
            </View>

            {/* /********** address ***********/}

            <View
              style={{
                backgroundColor: "#D1D1D1",
                height: 1,
                marginVertical: "10px",
              }}
            />

            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              {item?.booking?.start_otp !== null ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#687284",
                      marginRight: 7,
                      width: 127,
                    }}
                  >
                    {item?.booking?.trip_start_at
                      ? moment(item?.booking?.trip_start_at).format(
                          "DD-MM-YYYY h:mm:ss A"
                        )
                      : "--"}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1MfhJ4PS-VqN28DmmXNlxFs-iB_QpZlxSKKB35w&s",
                  }}
                  style={{
                    height: 8,
                    width: 8,
                    marginTop: 2,
                    resizeMode: "contain",
                  }}
                />
                <View style={styles.verticleLine}></View>
                <View style={styles.verticleLineHidden}></View>
                <View style={styles.nextVerticleLine}></View>
                <View style={styles.nextVerticleLineHidden}></View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#0F203C",
                    marginLeft: 7,
                    width: 310,
                    flexShrink: 1,
                    alignItems: "flex-start",
                    textOverflow: "ellipsis",
                    maxSize: "12",
                    verticalAlign: "top",
                    fontFamily: "Helvetica-Bold",
                  }}
                >
                  {item?.booking?.pickup_address?.address
                    ? formattedAddressFn(
                        item?.booking?.pickup_address?.address,
                        90
                      )
                    : "--"}
                </Text>
              </View>
            </View>

            <View>
              {item?.booking?.booking_type === "LocalTrip" &&
              item?.booking?.additional_stop !== null ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item?.booking?.start_otp !== null ? (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#687284",
                        marginRight: 7,
                        marginBottom: 18,
                        width: 127,
                      }}
                    ></Text>
                  ) : (
                    <></>
                  )}

                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2016_14/1038581/red-dot-puzzle-before-today-160406.jpg",
                      }}
                      style={{
                        height: 8,
                        width: 8,
                        marginTop: 2,
                        resizeMode: "contain",
                      }}
                    />
                    <View style={styles.verticleLine}></View>
                    <View style={styles.verticleLineHidden}></View>
                    <View style={styles.nextVerticleLine}></View>
                    <View style={styles.nextVerticleLineHidden}></View>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#0F203C",
                        marginLeft: 7,
                        width: 310,
                        flexShrink: 1,
                        alignItems: "flex-start",
                        textOverflow: "ellipsis",
                        maxSize: "12",
                        verticalAlign: "top",
                        marginBottom: 18,
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      {item?.booking?.additional_stop?.address
                        ? formattedAddressFn(
                            item?.booking?.additional_stop?.address,
                            90
                          )
                        : "--"}
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>

            {/* drop off address  */}

            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              {item?.booking?.start_otp !== null ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#687284",
                      marginRight: 7,
                      width: 127,
                    }}
                  >
                    {item?.booking?.trip_start_at
                      ? moment(item?.booking?.trip_start_at).format(
                          "DD-MM-YYYY h:mm:ss A"
                        )
                      : "--"}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Image
                  source={{
                    uri: "https://miro.medium.com/max/512/1*nZ9VwHTLxAfNCuCjYAkajg.png",
                  }}
                  style={{
                    height: 9,
                    width: 9,
                    marginTop: 2,
                    resizeMode: "contain",
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#0F203C",
                    marginLeft: 7,
                    width: 310,
                    flexShrink: 1,
                    alignItems: "flex-start",
                    textOverflow: "ellipsis",
                    maxSize: "12",
                    verticalAlign: "top",
                    fontFamily: "Helvetica-Bold",
                  }}
                >
                  {item?.booking?.dropoff_address?.address
                    ? formattedAddressFn(
                        item?.booking?.dropoff_address?.address,
                        90
                      )
                    : "--"}
                </Text>
              </View>
            </View>
            {/* drop off address ends  */}

            {/* /************address end */}

            <View
              style={{
                backgroundColor: "#D1D1D1",
                height: 1,
                marginVertical: "10px",
              }}
            />
            <View>
              {paymentDetails?.map((entry) => {
                return (
                  <View
                    style={{ flexDirection: "row", marginBottom: "3px" }}
                    key={entry?.label}
                  >
                    <Text
                      style={{
                        fontSize: "12px",

                        color: "#0F203C",
                        width: "110px",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      {entry?.label}
                    </Text>
                    {entry?.label === "Payment Status" ? (
                      <Text
                        style={{
                          fontSize: "12px",
                          fontFamily: "Helvetica-Bold",
                          color: entry?.color,
                        }}
                      >
                        {entry?.values}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: "12px",
                          color: "#0F203C",
                        }}
                      >
                        {entry?.values}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>

            <View
              style={{
                backgroundColor: "#D1D1D1",
                height: 1,
                marginVertical: "12px",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#0F203C",
                  fontSize: "12px",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Billing Details
              </Text>
              <Text
                style={{
                  fontSize: "12px",

                  color: "#0F203C",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Amount (
                <Text>
                  <Image
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/1200px-Indian_Rupee_symbol.svg.png",
                    }}
                    style={{ height: "8px", width: "6px" }}
                  />
                </Text>
                )
              </Text>
            </View>

            <View>
              {billingDetails?.map((entry) => {
                return (
                  <View style={styles.RowContainer} key={entry?.label}>
                    <Text style={styles.labels}>{entry?.label}</Text>
                    <Text style={styles.values}>{entry?.values}</Text>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                backgroundColor: "#D1D1D1",
                height: 1,
                marginVertical: "10px",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#0F203C",
                    fontSize: "12px",

                    fontFamily: "Helvetica-Bold",
                  }}
                >
                  Final Fare
                </Text>
                <Text
                  style={{
                    color: "#0F203C",
                    fontSize: "11px",
                  }}
                >
                  (Inclusive of taxes)
                </Text>
              </View>

              <Text
                style={{
                  fontSize: "12px",

                  color: "#0F203C",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/1200px-Indian_Rupee_symbol.svg.png",
                  }}
                  style={{ height: "8px", width: "7px" }}
                />
                {item?.booking?.rider_billing?.final_fare !== null
                  ? parseFloat(
                      item?.booking?.rider_billing?.final_fare
                    ).toFixed(2)
                  : "--"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Body;
