import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import { formattedAddressFn } from "../../helper";
import comrideLogo from "../../../assets/images/comride-logo.png";

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
  labels: {
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
  },
  body_container: {
    marginHorizontal: "40px",
  },
});

const ComrideInvoiceBody = ({ item }) => {
  const comrideBillingDetails = [
    {
      label: "Comride Commission (Trip Fare)",
      values:
        item?.booking?.comride_billing?.comride_commission_trip_fare !== null
          ? parseFloat(
              item?.booking?.comride_billing?.comride_commission_trip_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Booking Fee",
      values:
        item?.booking?.comride_billing?.booking_fee !== null
          ? parseFloat(item?.booking?.comride_billing?.booking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Total Comride Commission",
      values:
        item?.booking?.comride_billing?.total_comride_commission !== null
          ? parseFloat(
              item?.booking?.comride_billing?.total_comride_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      values:
        item?.booking?.comride_billing?.sgst !== null
          ? parseFloat(item?.booking?.comride_billing?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      values:
        item?.booking?.comride_billing?.cgst !== null
          ? parseFloat(item?.booking?.comride_billing?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      values:
        item?.booking?.comride_billing?.igst !== null
          ? parseFloat(item?.booking?.comride_billing?.igst).toFixed(2)
          : "--",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <>
          <View style={styles.body_container}>
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

                  color: "#0F203C",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Booking ID : {item?.booking?.booking_id_2 ?? "--"}
              </Text>
            </View>
            <View style={{ backgroundColor: "#D1D1D1", height: 1 }} />

            <View style={{ flexDirection: "row", marginTop: "10px" }}>
              <View>
                <Image source={comrideLogo} style={{ height: "30px" }} />
              </View>
              <View style={{ marginLeft: "15px", marginTop: "3px" }}>
                <Text
                  style={{
                    color: "#0F203C",
                    fontSize: "13px",
                    fontFamily: "Helvetica-Bold",
                  }}
                >
                  Comride Technologies Pvt. Ltd.
                </Text>
                <Text
                  style={{
                    color: "#0F203C",
                    fontSize: "11px",
                    width: "250px",
                  }}
                >
                  R.S. NO.449, Plot No.69, 3rd Floor, Ayub Complex, Gurunanak
                  Nagar Colony, Opp. silverspoon{"\n"} Restaurant, Vijayawada,
                  {"\n"} ANDHRA RADESH-520008
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
                  width: "110px",
                }}
              >
                State GSTIN
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#0F203C",
                }}
              >
                37AAJCA1389G1ZI
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#687284",
                  fontSize: "12px",
                  fontWeight: "700px",
                  width: "110px",
                }}
              >
                Supply Address
              </Text>
              <Text
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#0F203C",
                  width: "255px",
                }}
              >
                R.S. NO.449, Plot No.69, 3rd Floor, Ayub Complex,{"\n"}
                Gurunanak Nagar Colony, Opp. silverspoon {"\n"} Restaurant,
                Vijayawada,{"\n"} ANDHRA RADESH-520008
              </Text>
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
                  width: "110px",
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
                  width: "110px",
                }}
              >
                Pickup address
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#0F203C",
                  width: 340,
                }}
              >
                {item?.booking?.pickup_address?.address
                  ? formattedAddressFn(
                      item?.booking?.pickup_address?.address,
                      95
                    )
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
              <Text
                style={{
                  fontSize: "12px",

                  color: "#0F203C",
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Description
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
              {comrideBillingDetails?.map((entry) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "5px",
                    }}
                    key={entry?.label}
                  >
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
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#0F203C",
                    fontFamily: "Helvetica-Bold",
                  }}
                >
                  Total Comride Commission
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
                {item?.booking?.comride_billing
                  ?.total_comride_commission_with_taxes
                  ? parseFloat(
                      item?.booking?.comride_billing
                        ?.total_comride_commission_with_taxes
                    ).toFixed(2)
                  : "--"}
              </Text>
            </View>
          </View>
        </>
      </View>
    </View>
  );
};
export default ComrideInvoiceBody;
