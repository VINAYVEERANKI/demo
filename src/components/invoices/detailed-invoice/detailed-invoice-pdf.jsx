import React from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import DriverInvoiceBody from "./driver-invoice-body";
import Header from "../rider-invoice/header";
import Body from "../rider-invoice/body";
import Footer from "../rider-invoice/footer";
import ComrideInvoiceBody from "./comride-invoice-body";
import InvoiceFooter from "./invoice-footer";
import InvoiceHeader from "./invoice-header";
import moment from "moment";

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    fontFamiy: "Source Sans",
    fontSize: 12,
    lineHeight: 1.4,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 32,
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

const DetailedInvoicePdf = ({ item }) => {
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
      <Page style={styles.body} wrap>
        <View style={styles.top}>
          <InvoiceHeader
            header={"driverInvoice"}
            invoiceId={item?.driver_invoice_code}
            invoiceDate={
              item?.invocie_generated_at
                ? moment(item?.invocie_generated_at).format(
                    "DD-MM-YYYY h:mm:ss A"
                  )
                : "--"
            }
          />
          <DriverInvoiceBody item={item} />
        </View>

        <View style={styles.bottom}>
          <InvoiceFooter />
        </View>
      </Page>
      <Page style={styles.body} wrap>
        <View style={styles.top}>
          <InvoiceHeader
            header={"comrideInvoice"}
            invoiceId={item?.comride_invoice_code}
            invoiceDate={
              item?.invocie_generated_at
                ? moment(item?.invocie_generated_at).format(
                    "DD-MM-YYYY h:mm:ss A"
                  )
                : "--"
            }
          />
          <ComrideInvoiceBody item={item} />
        </View>

        <View style={styles.bottom}>
          <InvoiceFooter />
        </View>
      </Page>
    </Document>
  );
};

export default DetailedInvoicePdf;
