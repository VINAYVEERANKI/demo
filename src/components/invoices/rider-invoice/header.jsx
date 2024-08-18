import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import moment from "moment";
import comrideLogo from "../../../assets/images/comride-logo.png";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    fontSize: 12,
    paddingBottom: 16,
  },

  subHeading: {
    color: "#687284",
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: "23px",
    color: "#0F203C",
  },

  left: {
    flex: 1,
  },
});

const Header = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <View>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.subHeading}>
              Booking ID :
              {item?.booking?.booking_id_2 ? item?.booking?.booking_id_2 : "--"}
            </Text>
            <Text style={styles.subHeading}>
              {item?.invocie_generated_at
                ? moment(item?.invocie_generated_at).format(
                    "DD-MM-YYYY h:mm:ss A"
                  )
                : "--"}
            </Text>
          </View>
          <View>
            <Image source={comrideLogo} style={{ height: "30px" }} />
          </View>
        </View>

        <View style={{ backgroundColor: "#D1D1D1", height: 1 }} />
      </View>
    </View>
  );
};

export default Header;
