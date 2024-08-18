import React from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    fontFamiy: "Source Sans",
    fontSize: 12,
    lineHeight: 1.4,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    height: "100vh",
  },
  top: {
    flex: 1,
  },
  h1: {
    fontSize: 32,
    marginBottom: 16,
  },
});

const RiderInvoicePdf = ({ item }) => {
  return (
    <Document>
      <Page style={styles.body} wrap>
        <View style={styles.top}>
          <Header item={item} />
          <Body item={item} />
        </View>

        <View style={styles.bottom}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Footer />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RiderInvoicePdf;
