import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { insertSpaces } from "../../helper";

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
    fontWeight: "bold",
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: "23px",
    color: "#0F203C",
  },
  body_container: {
    marginHorizontal: "100px",
  },
});

const InvoiceHeader = ({ header, invoiceId ,invoiceDate}) => {
  const invoiceData = [
    { label: "Invoice ID", values: invoiceId ? invoiceId : "--" },
    { label: "Invoice Date", values: invoiceDate },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: "10px",
            alignContent: "center",
          }}
        >
          <View>
            <Text style={styles.title}>
              {header ? insertSpaces(header) : "--"}
            </Text>
          </View>
          <View>
            {invoiceData?.map((entry) => {
              return (
                <View style={{ flexDirection: "row" }} key={entry?.label}>
                  <Text
                    style={{
                      color: "#687284",
                      fontSize: "10px",
                      fontWeight: "700px",
                      width: "60px",
                    }}
                  >
                    {entry?.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "800px",
                      color: "#0F203C",
                      fontFamily: "Helvetica-Bold",
                    }}
                  >
                    {entry?.values}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ backgroundColor: "#A8A8A8", height: 1 }} />
      </View>
    </View>
  );
};

export default InvoiceHeader;
