import React, { useMemo } from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import { formattedAddressFn } from "../../helper";
import comrideLogo from "../../../assets/images/profileimage.png";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    paddingBottom: 16,
  },
  values: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0F203C",
  },
  label: {
    color: "#7F7F7F",
    fontSize: "12px",
    fontWeight: "800",
  },

  left: {
    flex: 1,
    color: "#0F203C",
    fontSize: "20px",
    fonttWeight: "700",
  },
  subTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0F203C",
    fontFamily: "Helvetica-Bold",
  },

  body_container: {
    marginHorizontal: "40px",
  },
});

const DriverInvoiceBody = ({ item }) => {
  const driverBillingBeforeOtp = [
    {
      label: "Driver Commission (Trip Fare)",
      values:
        item?.booking?.driver_billing?.driver_commission_trip_fare !== null
          ? parseFloat(
              item?.booking?.driver_billing?.driver_commission_trip_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission",
      values:
        item?.booking?.driver_billing?.total_driver_commission !== null
          ? parseFloat(
              item?.booking?.driver_billing?.total_driver_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      values:
        item?.booking?.driver_billing?.tds !== null
          ? parseFloat(item?.booking?.driver_billing?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      values:
        item?.booking?.driver_billing?.sgst !== null
          ? parseFloat(item?.booking?.driver_billing?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      values:
        item?.booking?.driver_billing?.cgst !== null
          ? parseFloat(item?.booking?.driver_billing?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      values:
        item?.booking?.driver_billing?.igst !== null
          ? parseFloat(item?.booking?.driver_billing?.igst).toFixed(2)
          : "--",
    },
  ];

  const localDriverBillingAfterOtp = [
    {
      label: "Driver Commission (Trip Fare)",
      values:
        item?.booking?.driver_billing?.driver_commission_trip_fare !== null
          ? parseFloat(
              item?.booking?.driver_billing?.driver_commission_trip_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Toll Fee",
      values:
        item?.booking?.driver_billing?.tolls_fee !== null
          ? parseFloat(item?.booking?.driver_billing?.tolls_fee).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      values:
        item?.booking?.driver_billing?.tips !== null
          ? parseFloat(item?.booking?.driver_billing?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Parking",
      values:
        item?.booking?.driver_billing?.parking_fee !== null
          ? parseFloat(item?.booking?.driver_billing?.parking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Transport Hub Fee",
      values:
        item?.booking?.driver_billing?.transport_hub_fee !== null
          ? parseFloat(
              item?.booking?.driver_billing?.transport_hub_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission",
      values:
        item?.booking?.driver_billing?.total_driver_commission !== null
          ? parseFloat(
              item?.booking?.driver_billing?.total_driver_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      values:
        item?.booking?.driver_billing?.tds !== null
          ? parseFloat(item?.booking?.driver_billing?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      values:
        item?.booking?.driver_billing?.sgst !== null
          ? parseFloat(item?.booking?.driver_billing?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      values:
        item?.booking?.driver_billing?.cgst !== null
          ? parseFloat(item?.booking?.driver_billing?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      values:
        item?.booking?.driver_billing?.igst !== null
          ? parseFloat(item?.booking?.driver_billing?.igst).toFixed(2)
          : "--",
    },
  ];

  const rentalDriverBillingAfterOtp = [
    {
      label: "Driver Commission (Trip Fare)",
      values:
        item?.booking?.driver_billing?.driver_commission_trip_fare !== null
          ? parseFloat(
              item?.booking?.driver_billing?.driver_commission_trip_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      values:
        item?.booking?.driver_billing?.tips !== null
          ? parseFloat(item?.booking?.driver_billing?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission",
      values:
        item?.booking?.driver_billing?.total_driver_commission !== null
          ? parseFloat(
              item?.booking?.driver_billing?.total_driver_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      values:
        item?.booking?.driver_billing?.tds !== null
          ? parseFloat(item?.booking?.driver_billing?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      values:
        item?.booking?.driver_billing?.sgst !== null
          ? parseFloat(item?.booking?.driver_billing?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      values:
        item?.booking?.driver_billing?.cgst !== null
          ? parseFloat(item?.booking?.driver_billing?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      values:
        item?.booking?.driver_billing?.igst !== null
          ? parseFloat(item?.booking?.driver_billing?.igst).toFixed(2)
          : "--",
    },
  ];

  const outstationDriverBillingAfterOtp = [
    {
      label: "Driver Commission (Trip Fare)",
      values:
        item?.booking?.driver_billing?.driver_commission_trip_fare !== null
          ? parseFloat(
              item?.booking?.driver_billing?.driver_commission_trip_fare
            ).toFixed(2)
          : "--",
    },

    {
      label: "Night Allowance",
      values:
        item?.booking?.driver_billing?.night_allowance !== null
          ? parseFloat(item?.booking?.driver_billing?.night_allowance).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Driver Allowance",
      values:
        item?.booking?.driver_billing?.driver_allowance !== null
          ? parseFloat(item?.booking?.driver_billing?.driver_allowance).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Tips",
      values:
        item?.booking?.driver_billing?.tips !== null
          ? parseFloat(item?.booking?.driver_billing?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission",
      values:
        item?.booking?.driver_billing?.total_driver_commission !== null
          ? parseFloat(
              item?.booking?.driver_billing?.total_driver_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      values:
        item?.booking?.driver_billing?.tds !== null
          ? parseFloat(item?.booking?.driver_billing?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      values:
        item?.booking?.driver_billing?.sgst !== null
          ? parseFloat(item?.booking?.driver_billing?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      values:
        item?.booking?.driver_billing?.cgst !== null
          ? parseFloat(item?.booking?.driver_billing?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      values:
        item?.booking?.driver_billing?.igst !== null
          ? parseFloat(item?.booking?.driver_billing?.igst).toFixed(2)
          : "--",
    },
  ];

  const DriverBillingDetails = useMemo(() => {
    if (item?.booking?.start_otp === null) {
      return driverBillingBeforeOtp;
    } else if (item?.booking?.start_otp !== null) {
      if (item?.booking?.booking_type === "LocalTrip") {
        return localDriverBillingAfterOtp;
      } else if (item?.booking?.booking_type === "OneWayOutstation") {
        return outstationDriverBillingAfterOtp;
      } else if (item?.booking?.booking_type === "RoundTripOutstation") {
        return outstationDriverBillingAfterOtp;
      } else if (item?.booking?.booking_type === "RentalTrip") {
        return rentalDriverBillingAfterOtp;
      }
    }
  }, [item?.booking?.start_otp, item?.booking?.booking_type]);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.body_container} key={item?.id}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "10px",
            }}
          >
            <Text
              style={{
                fontSize: "13px",
                fontFamily: "Helvetica-Bold",
                color: "#0F203C",
              }}
            >
              Booking ID :{item?.booking?.booking_id_2 ?? "--"}
            </Text>
          </View>
          <View style={{ backgroundColor: "#D1D1D1", height: 1 }} />

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
                  source={comrideLogo}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "5px",
                  }}
                />
              )}
            </View>
            <View style={{ marginLeft: "15px", marginTop: "3px" }}>
              <Text style={{ color: "#0F203C", fontSize: "13px" }}>
                {(item?.booking?.driver?.first_name ?? "--") +
                  " " +
                  (item?.booking?.driver?.last_name ?? "--")}
              </Text>
              <Text style={{ color: "#7F7F7F", fontSize: "10px" }}>
                {(item?.booking?.driver?.vehicle_details?.vehicle_make ??
                  "--") +
                  "  " +
                  (item?.booking?.driver?.vehicle_details?.vehicle_model ??
                    "--")}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#D1D1D1",
              height: 1,
              marginTop: "20px",
              marginBottom: "10px",
            }}
          />

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#687284",
                fontSize: "12px",
                fontWeight: "700px",
                width: "100px",
              }}
            >
              Customer Name
            </Text>
            <Text style={styles.subTitle}>
              {(item?.booking?.rider?.first_name ?? "--") +
                " " +
                (item?.booking?.rider?.last_name ?? "")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#687284",
                fontSize: "12px",
                fontWeight: "700px",
                width: "100px",
              }}
            >
              Pickup address
            </Text>
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "800",
                color: "#0F203C",
                fontFamily: "Helvetica-Bold",
                width: 340,
              }}
            >
              {item?.booking?.pickup_address?.address
                ? formattedAddressFn(item?.booking?.pickup_address?.address, 95)
                : "--"}
            </Text>
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
            <Text style={styles.subTitle}>Description</Text>

            <Text style={styles.subTitle}>
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
          <>
            {DriverBillingDetails?.map((entry) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "2px",
                  }}
                  key={entry?.label}
                >
                  <Text style={styles.label}>{entry?.label}</Text>

                  <Text style={styles.values}>{entry?.values}</Text>
                </View>
              );
            })}
          </>

          <View
            style={{
              backgroundColor: "#D1D1D1",
              height: 1,
              marginVertical: "5px",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.subTitle}>Total Driver Commission</Text>
              <Text
                style={{
                  color: "#0F203C",
                  fontSize: "11px",
                  fontWeight: "800px",
                }}
              >
                (Inclusive of taxes)
              </Text>
            </View>

            <Text style={styles.subTitle}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/1200px-Indian_Rupee_symbol.svg.png",
                }}
                style={{ height: "8px", width: "7px" }}
              />
              {item?.booking?.driver_billing?.total_driver_commission_with_taxes
                ? parseFloat(
                    item?.booking?.driver_billing
                      ?.total_driver_commission_with_taxes
                  ).toFixed(2)
                : "--"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default DriverInvoiceBody;
