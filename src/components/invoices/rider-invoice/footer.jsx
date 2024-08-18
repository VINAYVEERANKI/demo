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
 
  
});

const Footer = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: "11px",
            fontWeight: "800px",
            color: "#687284",
          }}
        >
          Refer to our{" "}
          <Text style={{textDecoration:"underline"}}>
            Terms and conditions, privacy policy
          </Text>{" "}
          {"\n"} & <Text style={{textDecoration:"underline"}}>cancellation policy</Text>
        </Text>
      
      </View>
    </View>
  );
};

export default Footer;
