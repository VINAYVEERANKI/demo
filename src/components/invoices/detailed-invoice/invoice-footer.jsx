import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    paddingBottom: 16,
  },
  h1: {
    fontSize: 24,
    fonttWeight: 600,
  },
  h2: {
    fontSize: 20,
  },
  left: {
    flex: 1,
    color: "#0F203C",
    fontSize: "20px",
    fonttWeight: "700",
  },

  body_container: {
    marginHorizontal: "100px",
  },
});

const InvoiceFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={{ backgroundColor: "#A8A8A8", height: 1 }} />
        <View
          style={{
            flexDirection: "row",
            marginTop: "5px",
            marginLeft: "15px",
          }}
        >
          <Text
            style={{
              color: "#7F7F7F",
              fontSize: "11px",
              fontWeight: "800px",
              width: "120px",
            }}
          >
            Service Tax Category
          </Text>
          <Text
            style={{
              fontSize: "11px",
              fontWeight: "800px",
              color: "#0F203C",
            }}
          >
            {"Business Auxiliary Service"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: "15px" }}>
          <Text
            style={{
              color: "#7F7F7F",
              fontSize: "11px",
              fontWeight: "800px",
              width: "120px",
            }}
          >
            SAC code
          </Text>
          <Text
            style={{
              fontSize: "11px",
              fontWeight: "800px",
              color: "#0F203C",
            }}
          >
            {"996423"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: "15px" }}>
          <Text
            style={{
              color: "#7F7F7F",
              fontSize: "11px",
              fontWeight: "800px",
              width: "120px",
            }}
          >
            Operator state/UT
          </Text>
          <Text
            style={{
              fontSize: "11px",
              fontWeight: "800px",
              color: "#0F203C",
            }}
          >
            {"Andhra Pradesh"}
          </Text>
        </View>
        <View style={{ marginLeft: "15px", marginTop: "10px" }}>
          <Text
            style={{
              color: "#7F7F7F",
              fontSize: "11px",
              fontWeight: "800px",
              width: "120px",
            }}
          >
            Note :
          </Text>
          <Text
            style={{
              fontSize: "11px",
              fontWeight: "800px",
              color: "#0F203C",
            }}
          >
            {"Andhra Pradesh"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InvoiceFooter;
