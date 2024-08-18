import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { defaultPremiumFourViewAction } from "../../../redux/actions/premiumaction/defaultPremiumAction";
import errorToast from "../../utilits/errorToast";
import { useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PremiumPasswordModal from "../passwordModal";
import { wholeNumRegex } from "../../helper";

const Premium4Table = ({
  type,
  action,
  params,
  premiumData,
  premiumtype,
  bookingType,
  reload,
  setReload,
  moduleType,
  is_editable,
  managePremiumType,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [premiumPasswordModal, setpremiumPasswordModal] = useState(false);
  const handlePremiumPWClose = () => {
    setpremiumPasswordModal(false);
  };
  const handlepremiumPasswordModal = () => setpremiumPasswordModal(true);

  function validationFn() {
    if (bookingType === "LocalTrip") {
      const Local = Yup.object().shape({
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridecgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomrideigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtollsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtollsstage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtollsstage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localparkingstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localparkingstage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localparkingstage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtransportstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtransportstage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtransportstage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtipsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtipsstage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtipsstage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return Local;
    } else if (bookingType === "RentalTrip") {
      const RentalTrip = Yup.object().shape({
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridecgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomrideigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return RentalTrip;
    } else if (bookingType === "OneWayOutstation") {
      const OnewayTrip = Yup.object().shape({
        // onewayroundtripfarestage1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarestage2: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarestage3: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfaresgst: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecgst: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfareigst: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridestage1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridestage2: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridestage3: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridesgst: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridecgst: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomrideigst: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridecgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomrideigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundsgstsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundcgstcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundigstigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundtipsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundtipsstage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundtipsstage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return OnewayTrip;
    } else if (bookingType === "RoundTripOutstation") {
      const RoundTrip = Yup.object().shape({
        // onewayroundtripfarestage11: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarestage21: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarestage31: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfaresgst1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecgst1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfareigst1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridestage11: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridestage21: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridestage31: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridesgst1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomridecgst1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        // onewayroundtripfarecomrideigst1: Yup.string()
        //   .matches(wholeNumRegex, "Invalid value")
        //   .required("Enter value"),
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridecgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomrideigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage2: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        bookingfeecomridestage3: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage11: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage21: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage31: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage11: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage21: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage31: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundsgstsgst1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundcgstcgst1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundigstigst1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundtipsstage11: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundtipsstage21: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundtipsstage31: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return RoundTrip;
    }
  }

  const validationss = validationFn();
  console.log(validationss, "kjasdakjd");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      onewayroundtripfarestage1:
        premiumData?.trip_fare?.DriverCommissionStage1 ?? "",
      onewayroundtripfarestage2:
        premiumData?.trip_fare?.DriverCommissionStage2 ?? "",
      onewayroundtripfarestage3:
        premiumData?.trip_fare?.DriverCommissionStage3 ?? "",
      onewayroundtripfarecomridesgst: premiumData?.base_fare?.CTSGST ?? "",
      onewayroundtripfarecomridecgst: premiumData?.base_fare?.CTCGST ?? "",
      onewayroundtripfarecomrideigst: premiumData?.base_fare?.CTIGST ?? "",
      onewayroundtripfarecomridestage1:
        premiumData?.trip_fare?.ComrideCommissionStage1 ?? "",
      onewayroundtripfarecomridestage2:
        premiumData?.trip_fare?.ComrideCommissionStage2 ?? "",
      onewayroundtripfarecomridestage3:
        premiumData?.trip_fare?.ComrideCommissionStage3 ?? "",
      onewayroundtripfaresgst: premiumData?.trip_fare?.RTSGST ?? "",
      onewayroundtripfarecgst: premiumData?.trip_fare?.RTCGST ?? "",
      onewayroundtripfareigst: premiumData?.trip_fare?.RTIGST ?? "",
      onewayroundtripfarestage11:
        premiumData?.trip_fare?.DriverCommissionStage1 ?? "",
      onewayroundtripfarestage21:
        premiumData?.trip_fare?.DriverCommissionStage2 ?? "",
      onewayroundtripfarestage31:
        premiumData?.trip_fare?.DriverCommissionStage3 ?? "",
      onewayroundtripfarecomridesgst1: premiumData?.base_fare?.CTSGST ?? "",
      onewayroundtripfarecomridecgst1: premiumData?.base_fare?.CTCGST ?? "",
      onewayroundtripfarecomrideigst1: premiumData?.base_fare?.CTIGST ?? "",
      onewayroundtripfarecomridestage11:
        premiumData?.trip_fare?.ComrideCommissionStage1 ?? "",
      onewayroundtripfarecomridestage21:
        premiumData?.trip_fare?.ComrideCommissionStage2 ?? "",
      onewayroundtripfarecomridestage31:
        premiumData?.trip_fare?.ComrideCommissionStage3 ?? "",
      onewayroundtripfaresgst1: premiumData?.trip_fare?.RTSGST ?? "",
      onewayroundtripfarecgst1: premiumData?.trip_fare?.RTCGST ?? "",
      onewayroundtripfareigst1: premiumData?.trip_fare?.RTIGST ?? "",
      tripfarestage1:
        premiumData?.trip_fare_after_coupon?.DriverCommissionStage1 ?? "",
      tripfarestage2:
        premiumData?.trip_fare_after_coupon?.DriverCommissionStage2 ?? "",
      tripfarestage3:
        premiumData?.trip_fare_after_coupon?.DriverCommissionStage3 ?? "",
      tripfarecomridestage1:
        premiumData?.trip_fare_after_coupon?.ComrideCommissionStage1 ?? "",
      tripfarecomridestage2:
        premiumData?.trip_fare_after_coupon?.ComrideCommissionStage2 ?? "",
      tripfarecomridestage3:
        premiumData?.trip_fare_after_coupon?.ComrideCommissionStage3 ?? "",
      sgstcomridesgst: premiumData?.sgst?.CTSGST ?? "",
      sgstsgst: premiumData?.sgst?.RTSGST ?? "",
      cgstcomridecgst: premiumData?.cgst?.CTCGST ?? "",
      cgstcgst: premiumData?.cgst?.RTCGST ?? "",
      igstcomrideigst: premiumData?.igst?.CTIGST ?? "",
      igstigst: premiumData?.igst?.RTIGST ?? "",
      bookingfeecomridestage1:
        premiumData?.booking_fee?.ComrideCommissionStage1 ?? "",
      bookingfeecomridestage2:
        premiumData?.booking_fee?.ComrideCommissionStage2 ?? "",
      bookingfeecomridestage3:
        premiumData?.booking_fee?.ComrideCommissionStage3 ?? "",
      sgstcomridesecondsgst: premiumData?.b_sgst?.CTSGST ?? "",
      cgstcomridesecondcgst: premiumData?.b_cgst?.CTCGST ?? "",
      igstcomridesecondigst: premiumData?.b_igst?.CTIGST ?? "",
      localtollsstage1: premiumData?.toll_fee?.DriverCommissionStage1 ?? "",
      localtollsstage2: premiumData?.toll_fee?.DriverCommissionStage2 ?? "",
      localtollsstage3: premiumData?.toll_fee?.DriverCommissionStage3 ?? "",
      localparkingstage1:
        premiumData?.parking_fee?.DriverCommissionStage1 ?? "",
      localparkingstage2:
        premiumData?.parking_fee?.DriverCommissionStage2 ?? "",
      localparkingstage3:
        premiumData?.parking_fee?.DriverCommissionStage3 ?? "",
      localtransportstage1:
        premiumData?.transport_hub_fee?.DriverCommissionStage1 ?? "",
      localtransportstage2:
        premiumData?.transport_hub_fee?.DriverCommissionStage2 ?? "",
      localtransportstage3:
        premiumData?.transport_hub_fee?.DriverCommissionStage3 ?? "",
      localtipsstage1: premiumData?.tips?.DriverCommissionStage1 ?? "",
      localtipsstage2: premiumData?.tips?.DriverCommissionStage2 ?? "",
      localtipsstage3: premiumData?.tips?.DriverCommissionStage3 ?? "",
      onewayroundnightallowancestage1:
        premiumData?.night_allowance?.DriverCommissionStage1 ?? "",
      onewayroundnightallowancestage2:
        premiumData?.night_allowance?.DriverCommissionStage2 ?? "",
      onewayroundnightallowancestage3:
        premiumData?.night_allowance?.DriverCommissionStage3 ?? "",
      onewayroundnightallowancestage11:
        premiumData?.night_allowance?.DriverCommissionStage1 ?? "",
      onewayroundnightallowancestage21:
        premiumData?.night_allowance?.DriverCommissionStage2 ?? "",
      onewayroundnightallowancestage31:
        premiumData?.night_allowance?.DriverCommissionStage3 ?? "",
      onewayrounddriverallowancestage1:
        premiumData?.driver_allowance?.DriverCommissionStage1 ?? "",
      onewayrounddriverallowancestage2:
        premiumData?.driver_allowance?.DriverCommissionStage2 ?? "",
      onewayrounddriverallowancestage3:
        premiumData?.driver_allowance?.DriverCommissionStage3 ?? "",
      onewayrounddriverallowancestage11:
        premiumData?.driver_allowance?.DriverCommissionStage1 ?? "",
      onewayrounddriverallowancestage21:
        premiumData?.driver_allowance?.DriverCommissionStage2 ?? "",
      onewayrounddriverallowancestage31:
        premiumData?.driver_allowance?.DriverCommissionStage3 ?? "",
      onewayroundsgstsgst: premiumData?.n_sgst?.RTSGST ?? "",
      onewayroundsgstsgst1: premiumData?.n_sgst?.RTSGST ?? "",
      onewayroundcgstcgst: premiumData?.n_cgst?.RTCGST ?? "",
      onewayroundcgstcgst1: premiumData?.n_cgst?.RTCGST ?? "",
      onewayroundigstigst: premiumData?.n_igst?.RTIGST ?? "",
      onewayroundigstigst1: premiumData?.n_igst?.RTIGST ?? "",
      onewayroundtipsstage1: premiumData?.tips?.DriverCommissionStage1 ?? "",
      onewayroundtipsstage2: premiumData?.tips?.DriverCommissionStage2 ?? "",
      onewayroundtipsstage3: premiumData?.tips?.DriverCommissionStage3 ?? "",
      onewayroundtipsstage11: premiumData?.tips?.DriverCommissionStage1 ?? "",
      onewayroundtipsstage21: premiumData?.tips?.DriverCommissionStage2 ?? "",
      onewayroundtipsstage31: premiumData?.tips?.DriverCommissionStage3 ?? "",
    },
    validationSchema: validationss,
    onSubmit: (values) => {
      console.log(values);
      console.log(formik.values, "chgggggggggggggggggg");
      setIsEditing(false);
      handlepremiumPasswordModal();
    },
  });

  console.log(premiumData, "sfaasfasfa");

  const moduleTable = [
    {
      mainheading: "Base Fare",
      driverCommission: {
        stage1: premiumData?.base_fare?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.base_fare?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.base_fare?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.base_fare?.RTSGST ?? "--",
        cgst: premiumData?.base_fare?.RTCGST ?? "--",
        igst: premiumData?.base_fare?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.base_fare?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.base_fare?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.base_fare?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.base_fare?.CTSGST ?? "--",
        cgst: premiumData?.base_fare?.CTCGST ?? "--",
        igst: premiumData?.base_fare?.CTIGST ?? "--",
      },
    },
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Distance Fare",
            driverCommission: {
              stage1:
                premiumData?.distance_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.distance_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.distance_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.distance_fare?.RTSGST ?? "--",
              cgst: premiumData?.distance_fare?.RTCGST ?? "--",
              igst: premiumData?.distance_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.distance_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.distance_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.distance_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.distance_fare?.CTSGST ?? "--",
              cgst: premiumData?.distance_fare?.CTCGST ?? "--",
              igst: premiumData?.distance_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRental"
      ? [
          {
            mainheading: "Extra KM Fare",
            driverCommission: {
              stage1:
                premiumData?.extra_km_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_km_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_km_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.extra_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.extra_km_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_km_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_km_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.extra_km_fare?.CTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.CTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Remaining KM Fare",
            driverCommission: {
              stage1:
                premiumData?.remaining_km_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.remaining_km_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.remaining_km_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.remaining_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.remaining_km_fare?.RTCGST ?? "--",
              igst: premiumData?.remaining_km_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.remaining_km_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.remaining_km_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.remaining_km_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.remaining_km_fare?.CTSGST ?? "--",
              cgst: premiumData?.remaining_km_fare?.CTCGST ?? "--",
              igst: premiumData?.remaining_km_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Remaining KM Fare",
            driverCommission: {
              stage1:
                premiumData?.remaining_km_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.remaining_km_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.remaining_km_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.remaining_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.remaining_km_fare?.RTCGST ?? "--",
              igst: premiumData?.remaining_km_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.remaining_km_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.remaining_km_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.remaining_km_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.remaining_km_fare?.CTSGST ?? "--",
              cgst: premiumData?.remaining_km_fare?.CTCGST ?? "--",
              igst: premiumData?.remaining_km_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Time Fare",
            driverCommission: {
              stage1: premiumData?.time_fare?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.time_fare?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.time_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.time_fare?.RTSGST ?? "--",
              cgst: premiumData?.time_fare?.RTCGST ?? "--",
              igst: premiumData?.time_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.time_fare?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.time_fare?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.time_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.time_fare?.CTSGST ?? "--",
              cgst: premiumData?.time_fare?.CTCGST ?? "--",
              igst: premiumData?.time_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRental"
      ? [
          {
            mainheading: "Extra Time Fare(Mins)",
            driverCommission: {
              stage1:
                premiumData?.extra_time_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_time_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_time_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.extra_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.extra_time_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_time_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_time_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.extra_time_fare?.CTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.CTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Remaining Time Fare",
            driverCommission: {
              stage1:
                premiumData?.remaining_time_fare?.DriverCommissionStage1 ??
                "--",
              stage2:
                premiumData?.remaining_time_fare?.DriverCommissionStage2 ??
                "--",
              stage3:
                premiumData?.remaining_time_fare?.DriverCommissionStage3 ??
                "--",
            },
            ridertaxs: {
              sgst: premiumData?.remaining_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.remaining_time_fare?.RTCGST ?? "--",
              igst: premiumData?.remaining_time_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.remaining_time_fare?.ComrideCommissionStage1 ??
                "--",
              stage2:
                premiumData?.remaining_time_fare?.ComrideCommissionStage2 ??
                "--",
              stage3:
                premiumData?.remaining_time_fare?.ComrideCommissionStage3 ??
                "--",
            },
            comridetaxes: {
              sgst: premiumData?.remaining_time_fare?.CTSGST ?? "--",
              cgst: premiumData?.remaining_time_fare?.CTCGST ?? "--",
              igst: premiumData?.remaining_time_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Extra KM Fare",
            driverCommission: {
              stage1:
                premiumData?.extra_km_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_km_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_km_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.extra_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.extra_km_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_km_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_km_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.extra_km_fare?.CTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.CTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Extra KM fare",
            driverCommission: {
              stage1:
                premiumData?.extra_km_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_km_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_km_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.extra_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.extra_km_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_km_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_km_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.extra_km_fare?.CTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.CTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Extra Time fare(Hrs)",
            driverCommission: {
              stage1:
                premiumData?.extra_time_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_time_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_time_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.extra_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.extra_time_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_time_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_time_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.extra_time_fare?.CTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.CTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Extra Time fare",
            driverCommission: {
              stage1:
                premiumData?.extra_time_fare?.DriverCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_time_fare?.DriverCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_time_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.extra_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.extra_time_fare?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.extra_time_fare?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.extra_time_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.extra_time_fare?.CTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.CTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    {
      mainheading: "Waiting Fee",
      driverCommission: {
        stage1: premiumData?.waiting_fee?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.waiting_fee?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.waiting_fee?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.waiting_fee?.RTSGST ?? "--",
        cgst: premiumData?.waiting_fee?.RTCGST ?? "--",
        igst: premiumData?.waiting_fee?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.waiting_fee?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.waiting_fee?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.waiting_fee?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.waiting_fee?.CTSGST ?? "--",
        cgst: premiumData?.waiting_fee?.CTCGST ?? "--",
        igst: premiumData?.waiting_fee?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Cancellation Fee",
      driverCommission: {
        stage1: premiumData?.cancellation_fee?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.cancellation_fee?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.cancellation_fee?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.cancellation_fee?.RTSGST ?? "--",
        cgst: premiumData?.cancellation_fee?.RTCGST ?? "--",
        igst: premiumData?.cancellation_fee?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.cancellation_fee?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.cancellation_fee?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.cancellation_fee?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.cancellation_fee?.CTSGST ?? "--",
        cgst: premiumData?.cancellation_fee?.CTCGST ?? "--",
        igst: premiumData?.cancellation_fee?.CTIGST ?? "--",
      },
    },
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Trip Fare",
            driverCommission: {
              stage1: premiumData?.trip_fare?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.trip_fare?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.trip_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.trip_fare?.RTSGST ?? "--",
              cgst: premiumData?.trip_fare?.RTCGST ?? "--",
              igst: premiumData?.trip_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.trip_fare?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.trip_fare?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.trip_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.trip_fare?.CTSGST ?? "--",
              cgst: premiumData?.trip_fare?.CTCGST ?? "--",
              igst: premiumData?.trip_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRental"
      ? [
          {
            mainheading: "Trip Fare",
            driverCommission: {
              stage1: premiumData?.trip_fare?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.trip_fare?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.trip_fare?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.trip_fare?.RTSGST ?? "--",
              cgst: premiumData?.trip_fare?.RTCGST ?? "--",
              igst: premiumData?.trip_fare?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.trip_fare?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.trip_fare?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.trip_fare?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.trip_fare?.CTSGST ?? "--",
              cgst: premiumData?.trip_fare?.CTCGST ?? "--",
              igst: premiumData?.trip_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Trip Fare",
            driverCommission: {
              stage1:
                // isEditing ? (
                //   <>
                //     <input
                //       className="premium_table_ipbox"
                //       id="onewayroundtripfarestage1"
                //       name="onewayroundtripfarestage1"
                //       onChange={formik.handleChange}
                //       onBlur={formik.handleBlur}
                //       value={formik.values.onewayroundtripfarestage1}
                //     />
                //     {formik.touched.onewayroundtripfarestage1 &&
                //       formik.errors.onewayroundtripfarestage1 ? (
                //       <div className="text-danger fs_10">
                //         {formik.errors.onewayroundtripfarestage1}
                //       </div>
                //     ) : null}
                //   </>
                // ) : (
                  formik.values.onewayroundtripfarestage1 ?? "--",
                // ),

                // premiumData?.trip_fare?.DriverCommissionStage1 ?? "--",
              stage2:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarestage2"
              //       name="onewayroundtripfarestage2"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarestage2}
              //     />
              //     {formik.touched.onewayroundtripfarestage2 &&
              //     formik.errors.onewayroundtripfarestage2 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarestage2}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarestage2 ?? "--",
              // ),
              // premiumData?.trip_fare?.DriverCommissionStage2?? "--",
              stage3: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarestage3"
              //       name="onewayroundtripfarestage3"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarestage3}
              //     />
              //     {formik.touched.onewayroundtripfarestage3 &&
              //     formik.errors.onewayroundtripfarestage3 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarestage3}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarestage3 ?? "--",
              // ),
              // premiumData?.trip_fare?.DriverCommissionStage3 ??"--",
            },
            
            ridertaxs: {
              sgst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfaresgst"
              //       name="onewayroundtripfaresgst"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfaresgst}
              //     />
              //     {formik.touched.onewayroundtripfaresgst &&
              //     formik.errors.onewayroundtripfaresgst ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfaresgst}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfaresgst ?? "--",
              // ),
              // premiumData?.trip_fare?.RTSGST ??"--",
              cgst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecgst"
              //       name="onewayroundtripfarecgst"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecgst}
              //     />
              //     {formik.touched.onewayroundtripfarecgst &&
              //     formik.errors.onewayroundtripfarecgst ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecgst}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecgst ?? "--",
              // ),
              igst:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfareigst"
              //       name="onewayroundtripfareigst"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfareigst}
              //     />
              //     {formik.touched.onewayroundtripfareigst &&
              //     formik.errors.onewayroundtripfareigst ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfareigst}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfareigst ?? "--",
              // ),
            },
            comridecomission: {
              stage1:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridestage1"
              //       name="onewayroundtripfarecomridestage1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridestage1}
              //     />
              //     {formik.touched.onewayroundtripfarecomridestage1 &&
              //     formik.errors.onewayroundtripfarecomridestage1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridestage1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridestage1 ?? "--",
              // ),
              stage2:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridestage2"
              //       name="onewayroundtripfarecomridestage2"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridestage2}
              //     />
              //     {formik.touched.onewayroundtripfarecomridestage2 &&
              //     formik.errors.onewayroundtripfarecomridestage2 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridestage2}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridestage2 ?? "--",
              // ),
              stage3:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridestage3"
              //       name="onewayroundtripfarecomridestage3"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridestage3}
              //     />
              //     {formik.touched.onewayroundtripfarecomridestage3 &&
              //     formik.errors.onewayroundtripfarecomridestage3 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridestage3}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridestage3 ?? "--",
              // ),
            },
            comridetaxes: {
              sgst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridesgst"
              //       name="onewayroundtripfarecomridesgst"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridesgst}
              //     />
              //     {formik.touched.onewayroundtripfarecomridesgst &&
              //     formik.errors.onewayroundtripfarecomridesgst ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridesgst}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridesgst ?? "--",
              // ),
              cgst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridecgst"
              //       name="onewayroundtripfarecomridecgst"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridecgst}
              //     />
              //     {formik.touched.onewayroundtripfarecomridecgst &&
              //     formik.errors.onewayroundtripfarecomridecgst ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridecgst}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridecgst ?? "--",
              // ),
              igst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomrideigst"
              //       name="onewayroundtripfarecomrideigst"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomrideigst}
              //     />
              //     {formik.touched.onewayroundtripfarecomrideigst &&
              //     formik.errors.onewayroundtripfarecomrideigst ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomrideigst}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomrideigst ?? "--",
              // ),
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Trip Fare",
            driverCommission: {
              stage1:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarestage11"
              //       name="onewayroundtripfarestage11"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarestage11}
              //     />
              //     {formik.touched.onewayroundtripfarestage11 &&
              //     formik.errors.onewayroundtripfarestage11 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarestage11}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarestage11 ?? "--",
              // ),
              stage2:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarestage21"
              //       name="onewayroundtripfarestage21"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarestage21}
              //     />
              //     {formik.touched.onewayroundtripfarestage21 &&
              //     formik.errors.onewayroundtripfarestage21 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarestage21}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarestage21 ?? "--",
              // ),
              stage3:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarestage31"
              //       name="onewayroundtripfarestage31"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarestage31}
              //     />
              //     {formik.touched.onewayroundtripfarestage31 &&
              //     formik.errors.onewayroundtripfarestage31 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarestage31}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarestage31 ?? "--",
              // ),
            },
            ridertaxs: {
              sgst:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfaresgst1"
              //       name="onewayroundtripfaresgst1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfaresgst1}
              //     />
              //     {formik.touched.onewayroundtripfaresgst1 &&
              //     formik.errors.onewayroundtripfaresgst1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfaresgst1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfaresgst1 ?? "--",
              // ),
              cgst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecgst1"
              //       name="onewayroundtripfarecgst1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecgst1}
              //     />
              //     {formik.touched.onewayroundtripfarecgst1 &&
              //     formik.errors.onewayroundtripfarecgst1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecgst1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecgst1 ?? "--",
              // ),
              igst:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfareigst1"
              //       name="onewayroundtripfareigst1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfareigst1}
              //     />
              //     {formik.touched.onewayroundtripfareigst1 &&
              //     formik.errors.onewayroundtripfareigst1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfareigst1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfareigst1 ?? "--",
              // ),
            },
            comridecomission: {
              stage1:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridestage11"
              //       name="onewayroundtripfarecomridestage11"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridestage11}
              //     />
              //     {formik.touched.onewayroundtripfarecomridestage11 &&
              //     formik.errors.onewayroundtripfarecomridestage11 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridestage11}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridestage11 ?? "--",
              // ),
              stage2:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridestage21"
              //       name="onewayroundtripfarecomridestage21"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridestage21}
              //     />
              //     {formik.touched.onewayroundtripfarecomridestage21 &&
              //     formik.errors.onewayroundtripfarecomridestage21 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridestage21}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridestage21 ?? "--",
              // ),
              stage3:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridestage31"
              //       name="onewayroundtripfarecomridestage31"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridestage31}
              //     />
              //     {formik.touched.onewayroundtripfarecomridestage31 &&
              //     formik.errors.onewayroundtripfarecomridestage31 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridestage31}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridestage31 ?? "--",
              // ),
            },
            comridetaxes: {
              sgst: 
              // isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridesgst1"
              //       name="onewayroundtripfarecomridesgst1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridesgst1}
              //     />
              //     {formik.touched.onewayroundtripfarecomridesgst1 &&
              //     formik.errors.onewayroundtripfarecomridesgst1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridesgst1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridesgst1 ?? "--",
              // ),
              cgst:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomridecgst1"
              //       name="onewayroundtripfarecomridecgst1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomridecgst1}
              //     />
              //     {formik.touched.onewayroundtripfarecomridecgst1 &&
              //     formik.errors.onewayroundtripfarecomridecgst1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomridecgst1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomridecgst1 ?? "--",
              // ),
              igst:
              //  isEditing ? (
              //   <>
              //     <input
              //       className="premium_table_ipbox"
              //       id="onewayroundtripfarecomrideigst1"
              //       name="onewayroundtripfarecomrideigst1"
              //       onChange={formik.handleChange}
              //       onBlur={formik.handleBlur}
              //       value={formik.values.onewayroundtripfarecomrideigst1}
              //     />
              //     {formik.touched.onewayroundtripfarecomrideigst1 &&
              //     formik.errors.onewayroundtripfarecomrideigst1 ? (
              //       <div className="text-danger fs_10">
              //         {formik.errors.onewayroundtripfarecomrideigst1}
              //       </div>
              //     ) : null}
              //   </>
              // ) : (
                formik.values.onewayroundtripfarecomrideigst1 ?? "--",
              // ),
            },
          },
        ]
      : []),
    {
      mainheading: "Coupon Savings",
      driverCommission: {
        stage1: premiumData?.coupon_savings?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.coupon_savings?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.coupon_savings?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.coupon_savings?.RTSGST ?? "--",
        cgst: premiumData?.coupon_savings?.RTCGST ?? "--",
        igst: premiumData?.coupon_savings?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.coupon_savings?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.coupon_savings?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.coupon_savings?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.coupon_savings?.CTSGST ?? "--",
        cgst: premiumData?.coupon_savings?.CTCGST ?? "--",
        igst: premiumData?.coupon_savings?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Trip Fare (After Coupon Savings)",
      driverCommission: {
        stage1: isEditing ? (
          <>
            <input
              className={
                formik.touched.tripfarestage1 && formik.errors.tripfarestage1
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="tripfarestage1"
              name="tripfarestage1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tripfarestage1}
            />
            {formik.touched.tripfarestage1 && formik.errors.tripfarestage1 ? (
              <div className="text-danger fs_10">
                {formik.errors.tripfarestage1}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.tripfarestage1
        ),
        stage2: isEditing ? (
          <>
            <input
              className={
                formik.touched.tripfarestage2 && formik.errors.tripfarestage2
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="tripfarestage2"
              name="tripfarestage2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tripfarestage2}
            />
            {formik.touched.tripfarestage2 && formik.errors.tripfarestage2 ? (
              <div className="text-danger fs_10">
                {formik.errors.tripfarestage2}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.tripfarestage2
        ),
        stage3: isEditing ? (
          <>
            <input
               className={
                formik.touched.tripfarestage3 && formik.errors.tripfarestage3
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="tripfarestage3"
              name="tripfarestage3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tripfarestage3}
            />
            {formik.touched.tripfarestage3 && formik.errors.tripfarestage3 ? (
              <div className="text-danger fs_10">
                {formik.errors.tripfarestage3}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.tripfarestage3
        ),
      },
      ridertaxs: {
        sgst: premiumData?.trip_fare_after_coupon?.RTSGST ?? "--",
        cgst: premiumData?.trip_fare_after_coupon?.RTCGST ?? "--",
        igst: premiumData?.trip_fare_after_coupon?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: isEditing ? (
          <>
            <input
                className={
                  formik.touched.tripfarecomridestage1 &&
            formik.errors.tripfarecomridestage1
                    ? "premium_table_ipbox_error"
                    : "premium_table_ipbox"
                }
              id="tripfarecomridestage1"
              name="tripfarecomridestage1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tripfarecomridestage1}
            />
            {formik.touched.tripfarecomridestage1 &&
            formik.errors.tripfarecomridestage1 ? (
              <div className="text-danger fs_10">
                {formik.errors.tripfarecomridestage1}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.tripfarecomridestage1
        ),
        stage2: isEditing ? (
          <>
            <input
               className={
                formik.touched.tripfarecomridestage2 &&
                formik.errors.tripfarecomridestage2
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="tripfarecomridestage2"
              name="tripfarecomridestage2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tripfarecomridestage2}
            />
            {formik.touched.tripfarecomridestage2 &&
            formik.errors.tripfarecomridestage2 ? (
              <div className="text-danger fs_10">
                {formik.errors.tripfarecomridestage2}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.tripfarecomridestage2
        ),
        stage3: isEditing ? (
          <>
            <input
                 className={
                  formik.touched.tripfarecomridestage3 &&
                  formik.errors.tripfarecomridestage3
                    ? "premium_table_ipbox_error"
                    : "premium_table_ipbox"
                }
              id="tripfarecomridestage3"
              name="tripfarecomridestage3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tripfarecomridestage3}
            />
            {formik.touched.tripfarecomridestage3 &&
            formik.errors.tripfarecomridestage3 ? (
              <div className="text-danger fs_10">
                {formik.errors.tripfarecomridestage3}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.tripfarecomridestage3
        ),
      },
      comridetaxes: {
        sgst: premiumData?.trip_fare_after_coupon?.CTSGST ?? "--",
        cgst: premiumData?.trip_fare_after_coupon?.CTCGST ?? "--",
        igst: premiumData?.trip_fare_after_coupon?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "SGST",
      driverCommission: {
        stage1: premiumData?.sgst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.sgst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.sgst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: isEditing ? (
          <>
            <input
                className={
                  formik.touched.sgstsgst && formik.errors.sgstsgst
                    ? "premium_table_ipbox_error"
                    : "premium_table_ipbox"
                }
              id="sgstsgst"
              name="sgstsgst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sgstsgst}
            />
            {formik.touched.sgstsgst && formik.errors.sgstsgst ? (
              <div className="text-danger fs_10">{formik.errors.sgstsgst}</div>
            ) : null}
          </>
        ) : (
          formik.values.sgstsgst
        ),
        cgst: premiumData?.sgst?.RTCGST ?? "--",
        igst: premiumData?.sgst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.sgst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.sgst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.sgst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: isEditing ? (
          <>
            <input
         className={
          formik.touched.sgstcomridesgst && formik.errors.sgstcomridesgst
            ? "premium_table_ipbox_error"
            : "premium_table_ipbox"
        }
              id="sgstcomridesgst"
              name="sgstcomridesgst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sgstcomridesgst}
            />
            {formik.touched.sgstcomridesgst && formik.errors.sgstcomridesgst ? (
              <div className="text-danger fs_10">
                {formik.errors.sgstcomridesgst}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.sgstcomridesgst
        ),
        cgst: premiumData?.sgst?.CTCGST ?? "--",
        igst: premiumData?.sgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "CGST",
      driverCommission: {
        stage1: premiumData?.cgst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.cgst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.cgst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.cgst?.RTSGST ?? "--",
        cgst: isEditing ? (
          <>
            <input
            className={
              formik.touched.cgstcgst && formik.errors.cgstcgst
                ? "premium_table_ipbox_error"
                : "premium_table_ipbox"
            }
              id="cgstcgst"
              name="cgstcgst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cgstcgst}
            />
            {formik.touched.cgstcgst && formik.errors.cgstcgst ? (
              <div className="text-danger fs_10">{formik.errors.cgstcgst}</div>
            ) : null}
          </>
        ) : (
          formik.values.cgstcgst
        ),
        igst: premiumData?.cgst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.cgst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.cgst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.cgst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.cgst?.CTSGST ?? "--",
        cgst: isEditing ? (
          <>
            <input
              className={
                formik.touched.cgstcomridecgst && formik.errors.cgstcomridecgst
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="cgstcomridecgst"
              name="cgstcomridecgst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cgstcomridecgst}
            />
            {formik.touched.cgstcomridecgst && formik.errors.cgstcomridecgst ? (
              <div className="text-danger fs_10">
                {formik.errors.cgstcomridecgst}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.cgstcomridecgst
        ),
        igst: premiumData?.cgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "IGST",
      driverCommission: {
        stage1: premiumData?.igst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.igst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.igst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.igst?.RTSGST ?? "--",
        cgst: premiumData?.igst?.RTCGST ?? "--",
        igst: isEditing ? (
          <>
            <input
               className={
                formik.touched.igstigst && formik.errors.igstigst
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="igstigst"
              name="igstigst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.igstigst}
            />
            {formik.touched.igstigst && formik.errors.igstigst ? (
              <div className="text-danger fs_10">{formik.errors.igstigst}</div>
            ) : null}
          </>
        ) : (
          formik.values.igstigst
        ),
      },
      comridecomission: {
        stage1: premiumData?.igst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.igst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.igst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.igst?.CTSGST ?? "--",
        cgst: premiumData?.igst?.CTCGST ?? "--",
        igst: isEditing ? (
          <>
            <input
              className={
                formik.touched.igstcomrideigst && formik.errors.igstcomrideigst
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="igstcomrideigst"
              name="igstcomrideigst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.igstcomrideigst}
            />
            {formik.touched.igstcomrideigst && formik.errors.igstcomrideigst ? (
              <div className="text-danger fs_10">
                {formik.errors.igstcomrideigst}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.igstcomrideigst
        ),
      },
    },
    {
      mainheading: "Booking Fee",
      driverCommission: {
        stage1: premiumData?.booking_fee?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.booking_fee?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.booking_fee?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.booking_fee?.RTSGST ?? "--",
        cgst: premiumData?.booking_fee?.RTCGST ?? "--",
        igst: premiumData?.booking_fee?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: isEditing ? (
          <>
            <input
              className={
                formik.touched.bookingfeecomridestage1 &&
            formik.errors.bookingfeecomridestage1
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="bookingfeecomridestage1"
              name="bookingfeecomridestage1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bookingfeecomridestage1}
            />
            {formik.touched.bookingfeecomridestage1 &&
            formik.errors.bookingfeecomridestage1 ? (
              <div className="text-danger fs_10">
                {formik.errors.bookingfeecomridestage1}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.bookingfeecomridestage1
        ),
        stage2: isEditing ? (
          <>
            <input
               className={
                formik.touched.bookingfeecomridestage2 &&
            formik.errors.bookingfeecomridestage2
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="bookingfeecomridestage2"
              name="bookingfeecomridestage2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bookingfeecomridestage2}
            />
            {formik.touched.bookingfeecomridestage2 &&
            formik.errors.bookingfeecomridestage2 ? (
              <div className="text-danger fs_10">
                {formik.errors.bookingfeecomridestage2}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.bookingfeecomridestage2
        ),
        stage3: isEditing ? (
          <>
            <input
              className={
                formik.touched.bookingfeecomridestage3 &&
            formik.errors.bookingfeecomridestage3
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="bookingfeecomridestage3"
              name="bookingfeecomridestage3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bookingfeecomridestage3}
            />
            {formik.touched.bookingfeecomridestage3 &&
            formik.errors.bookingfeecomridestage3 ? (
              <div className="text-danger fs_10">
                {formik.errors.bookingfeecomridestage3}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.bookingfeecomridestage3
        ),
      },
      comridetaxes: {
        sgst: premiumData?.booking_fee?.CTSGST ?? "--",
        cgst: premiumData?.booking_fee?.CTCGST ?? "--",
        igst: premiumData?.booking_fee?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "SGST",
      driverCommission: {
        stage1: premiumData?.b_sgst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.b_sgst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.b_sgst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.b_sgst?.RTSGST ?? "--",
        cgst: premiumData?.b_sgst?.RTCGST ?? "--",
        igst: premiumData?.b_sgst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.b_sgst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.b_sgst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.b_sgst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: isEditing ? (
          <>
            <input
              className={
                formik.touched.sgstcomridesecondsgst &&
                formik.errors.sgstcomridesecondsgst
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="sgstcomridesecondsgst"
              name="sgstcomridesecondsgst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sgstcomridesecondsgst}
            />
            {formik.touched.sgstcomridesecondsgst &&
            formik.errors.sgstcomridesecondsgst ? (
              <div className="text-danger fs_10">
                {formik.errors.sgstcomridesecondsgst}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.sgstcomridesecondsgst
        ),
        cgst: premiumData?.b_sgst?.CTCGST ?? "--",
        igst: premiumData?.b_sgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "CGST",
      driverCommission: {
        stage1: premiumData?.b_cgst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.b_cgst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.b_cgst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.b_cgst?.RTSGST ?? "--",
        cgst: premiumData?.b_cgst?.RTCGST ?? "--",
        igst: premiumData?.b_cgst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.b_cgst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.b_cgst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.b_cgst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.b_cgst?.CTSGST ?? "--",
        cgst: isEditing ? (
          <>
            <input
              className={
                formik.touched.cgstcomridesecondcgst &&
                formik.errors.cgstcomridesecondcgst
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="cgstcomridesecondcgst"
              name="cgstcomridesecondcgst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cgstcomridesecondcgst}
            />
            {formik.touched.cgstcomridesecondcgst &&
            formik.errors.cgstcomridesecondcgst ? (
              <div className="text-danger fs_10">
                {formik.errors.cgstcomridesecondcgst}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.cgstcomridesecondcgst
        ),
        igst: premiumData?.b_cgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "IGST",
      driverCommission: {
        stage1: premiumData?.b_igst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.b_igst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.b_igst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.b_igst?.RTSGST ?? "--",
        cgst: premiumData?.b_igst?.RTCGST ?? "--",
        igst: premiumData?.b_igst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.b_igst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.b_igst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.b_igst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.b_igst?.CTSGST ?? "--",
        cgst: premiumData?.b_igst?.CTCGST ?? "--",
        igst: isEditing ? (
          <>
            <input
              className={
                formik.touched.igstcomridesecondigst &&
            formik.errors.igstcomridesecondigst 
                  ? "premium_table_ipbox_error"
                  : "premium_table_ipbox"
              }
              id="igstcomridesecondigst"
              name="igstcomridesecondigst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.igstcomridesecondigst}
            />
            {formik.touched.igstcomridesecondigst &&
            formik.errors.igstcomridesecondigst ? (
              <div className="text-danger fs_10">
                {formik.errors.igstcomridesecondigst}
              </div>
            ) : null}
          </>
        ) : (
          formik.values.igstcomridesecondigst
        ),
      },
    },
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Tolls",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.localtollsstage1 &&
                      formik.errors.localtollsstage1
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtollsstage1"
                    name="localtollsstage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtollsstage1}
                  />
                  {formik.touched.localtollsstage1 &&
                  formik.errors.localtollsstage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtollsstage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtollsstage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.localtollsstage2 &&
                      formik.errors.localtollsstage2
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtollsstage2"
                    name="localtollsstage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtollsstage2}
                  />
                  {formik.touched.localtollsstage2 &&
                  formik.errors.localtollsstage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtollsstage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtollsstage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.localtollsstage3 &&
                      formik.errors.localtollsstage3
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtollsstage3"
                    name="localtollsstage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtollsstage3}
                  />
                  {formik.touched.localtollsstage3 &&
                  formik.errors.localtollsstage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtollsstage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtollsstage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.toll_fee?.RTSGST ?? "--",
              cgst: premiumData?.toll_fee?.RTCGST ?? "--",
              igst: premiumData?.toll_fee?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.toll_fee?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.toll_fee?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.toll_fee?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.toll_fee?.CTSGST ?? "--",
              cgst: premiumData?.toll_fee?.CTCGST ?? "--",
              igst: premiumData?.toll_fee?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Parking",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.localparkingstage1 &&
                  formik.errors.localparkingstage1
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localparkingstage1"
                    name="localparkingstage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localparkingstage1}
                  />
                  {formik.touched.localparkingstage1 &&
                  formik.errors.localparkingstage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localparkingstage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localparkingstage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.localparkingstage2 &&
                      formik.errors.localparkingstage2
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localparkingstage2"
                    name="localparkingstage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localparkingstage2}
                  />
                  {formik.touched.localparkingstage2 &&
                  formik.errors.localparkingstage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localparkingstage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localparkingstage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                   className={
                    formik.touched.localparkingstage3 &&
                    formik.errors.localparkingstage3
                      ? "premium_table_ipbox_error"
                      : "premium_table_ipbox"
                  }
                    id="localparkingstage3"
                    name="localparkingstage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localparkingstage3}
                  />
                  {formik.touched.localparkingstage3 &&
                  formik.errors.localparkingstage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localparkingstage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localparkingstage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.parking_fee?.RTSGST ?? "--",
              cgst: premiumData?.parking_fee?.RTCGST ?? "--",
              igst: premiumData?.parking_fee?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.parking_fee?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.parking_fee?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.parking_fee?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.parking_fee?.CTSGST ?? "--",
              cgst: premiumData?.parking_fee?.CTCGST ?? "--",
              igst: premiumData?.parking_fee?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Transport Hub Fee",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                   className={
                    formik.touched.localtransportstage1 &&
                    formik.errors.localtransportstage1 
                      ? "premium_table_ipbox_error"
                      : "premium_table_ipbox"
                  }
                    id="localtransportstage1"
                    name="localtransportstage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtransportstage1}
                  />
                  {formik.touched.localtransportstage1 &&
                  formik.errors.localtransportstage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtransportstage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtransportstage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.localtransportstage2 &&
                      formik.errors.localtransportstage2
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtransportstage2"
                    name="localtransportstage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtransportstage2}
                  />
                  {formik.touched.localtransportstage2 &&
                  formik.errors.localtransportstage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtransportstage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtransportstage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.localtransportstage3 &&
                      formik.errors.localtransportstage3 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtransportstage3"
                    name="localtransportstage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtransportstage3}
                  />
                  {formik.touched.localtransportstage3 &&
                  formik.errors.localtransportstage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtransportstage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtransportstage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.transport_hub_fee?.RTSGST ?? "--",
              cgst: premiumData?.transport_hub_fee?.RTCGST ?? "--",
              igst: premiumData?.transport_hub_fee?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.transport_hub_fee?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.transport_hub_fee?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.transport_hub_fee?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.transport_hub_fee?.CTSGST ?? "--",
              cgst: premiumData?.transport_hub_fee?.CTCGST ?? "--",
              igst: premiumData?.transport_hub_fee?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumLocal"
      ? [
          {
            mainheading: "Tips",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                      className={
                        formik.touched.localtipsstage1 &&
                        formik.errors.localtipsstage1
                          ? "premium_table_ipbox_error"
                          : "premium_table_ipbox"
                      }
                    id="localtipsstage1"
                    name="localtipsstage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtipsstage1}
                  />
                  {formik.touched.localtipsstage1 &&
                  formik.errors.localtipsstage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtipsstage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtipsstage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.localtipsstage2 &&
                      formik.errors.localtipsstage2 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtipsstage2"
                    name="localtipsstage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtipsstage2}
                  />
                  {formik.touched.localtipsstage2 &&
                  formik.errors.localtipsstage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtipsstage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtipsstage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.localtipsstage3 &&
                      formik.errors.localtipsstage3 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="localtipsstage3"
                    name="localtipsstage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.localtipsstage3}
                  />
                  {formik.touched.localtipsstage3 &&
                  formik.errors.localtipsstage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.localtipsstage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.localtipsstage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.tips?.RTSGST ?? "--",
              cgst: premiumData?.tips?.RTCGST ?? "--",
              igst: premiumData?.tips?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.tips?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.tips?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.tips?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.tips?.CTSGST ?? "--",
              cgst: premiumData?.tips?.CTCGST ?? "--",
              igst: premiumData?.tips?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Night Allowance",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                      className={
                        formik.touched.onewayroundnightallowancestage1 &&
                        formik.errors.onewayroundnightallowancestage1
                          ? "premium_table_ipbox_error"
                          : "premium_table_ipbox"
                      }
                    id="onewayroundnightallowancestage1"
                    name="onewayroundnightallowancestage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundnightallowancestage1}
                  />
                  {formik.touched.onewayroundnightallowancestage1 &&
                  formik.errors.onewayroundnightallowancestage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundnightallowancestage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundnightallowancestage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundnightallowancestage2 &&
                      formik.errors.onewayroundnightallowancestage2 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundnightallowancestage2"
                    name="onewayroundnightallowancestage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundnightallowancestage2}
                  />
                  {formik.touched.onewayroundnightallowancestage2 &&
                  formik.errors.onewayroundnightallowancestage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundnightallowancestage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundnightallowancestage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                      className={
                        formik.touched.onewayroundnightallowancestage3 &&
                  formik.errors.onewayroundnightallowancestage3 
                          ? "premium_table_ipbox_error"
                          : "premium_table_ipbox"
                      }
                    id="onewayroundnightallowancestage3"
                    name="onewayroundnightallowancestage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundnightallowancestage3}
                  />
                  {formik.touched.onewayroundnightallowancestage3 &&
                  formik.errors.onewayroundnightallowancestage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundnightallowancestage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundnightallowancestage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.night_allowance?.RTSGST ?? "--",
              cgst: premiumData?.night_allowance?.RTCGST ?? "--",
              igst: premiumData?.night_allowance?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.night_allowance?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.night_allowance?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.night_allowance?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.night_allowance?.CTSGST ?? "--",
              cgst: premiumData?.night_allowance?.CTCGST ?? "--",
              igst: premiumData?.night_allowance?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Night Allowance",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundnightallowancestage11 &&
                  formik.errors.onewayroundnightallowancestage11
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundnightallowancestage11"
                    name="onewayroundnightallowancestage11"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundnightallowancestage11}
                  />
                  {formik.touched.onewayroundnightallowancestage11 &&
                  formik.errors.onewayroundnightallowancestage11 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundnightallowancestage11}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundnightallowancestage11
              ),
              stage2: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundnightallowancestage21 &&
                      formik.errors.onewayroundnightallowancestage21
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundnightallowancestage21"
                    name="onewayroundnightallowancestage21"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundnightallowancestage21}
                  />
                  {formik.touched.onewayroundnightallowancestage21 &&
                  formik.errors.onewayroundnightallowancestage21 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundnightallowancestage21}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundnightallowancestage21
              ),
              stage3: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundnightallowancestage31 &&
                      formik.errors.onewayroundnightallowancestage31
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundnightallowancestage31"
                    name="onewayroundnightallowancestage31"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundnightallowancestage31}
                  />
                  {formik.touched.onewayroundnightallowancestage31 &&
                  formik.errors.onewayroundnightallowancestage31 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundnightallowancestage31}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundnightallowancestage31
              ),
            },
            ridertaxs: {
              sgst: premiumData?.night_allowance?.RTSGST ?? "--",
              cgst: premiumData?.night_allowance?.RTCGST ?? "--",
              igst: premiumData?.night_allowance?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.night_allowance?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.night_allowance?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.night_allowance?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.night_allowance?.CTSGST ?? "--",
              cgst: premiumData?.night_allowance?.CTCGST ?? "--",
              igst: premiumData?.night_allowance?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Driver Allowance",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayrounddriverallowancestage1 &&
                  formik.errors.onewayrounddriverallowancestage1
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayrounddriverallowancestage1"
                    name="onewayrounddriverallowancestage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayrounddriverallowancestage1}
                  />
                  {formik.touched.onewayrounddriverallowancestage1 &&
                  formik.errors.onewayrounddriverallowancestage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayrounddriverallowancestage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayrounddriverallowancestage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayrounddriverallowancestage2 &&
                      formik.errors.onewayrounddriverallowancestage2 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayrounddriverallowancestage2"
                    name="onewayrounddriverallowancestage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayrounddriverallowancestage2}
                  />
                  {formik.touched.onewayrounddriverallowancestage2 &&
                  formik.errors.onewayrounddriverallowancestage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayrounddriverallowancestage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayrounddriverallowancestage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayrounddriverallowancestage3 &&
                  formik.errors.onewayrounddriverallowancestage3 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayrounddriverallowancestage3"
                    name="onewayrounddriverallowancestage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayrounddriverallowancestage3}
                  />
                  {formik.touched.onewayrounddriverallowancestage3 &&
                  formik.errors.onewayrounddriverallowancestage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayrounddriverallowancestage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayrounddriverallowancestage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.driver_allowance?.RTSGST ?? "--",
              cgst: premiumData?.driver_allowance?.RTCGST ?? "--",
              igst: premiumData?.driver_allowance?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.driver_allowance?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.driver_allowance?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.driver_allowance?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.driver_allowance?.CTSGST ?? "--",
              cgst: premiumData?.driver_allowance?.CTCGST ?? "--",
              igst: premiumData?.driver_allowance?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Driver Allowance",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.onewayrounddriverallowancestage11 &&
                      formik.errors.onewayrounddriverallowancestage11
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayrounddriverallowancestage11"
                    name="onewayrounddriverallowancestage11"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayrounddriverallowancestage11}
                  />
                  {formik.touched.onewayrounddriverallowancestage11 &&
                  formik.errors.onewayrounddriverallowancestage11 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayrounddriverallowancestage11}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayrounddriverallowancestage11
              ),
              stage2: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayrounddriverallowancestage21 &&
                      formik.errors.onewayrounddriverallowancestage21
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayrounddriverallowancestage21"
                    name="onewayrounddriverallowancestage21"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayrounddriverallowancestage21}
                  />
                  {formik.touched.onewayrounddriverallowancestage21 &&
                  formik.errors.onewayrounddriverallowancestage21 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayrounddriverallowancestage21}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayrounddriverallowancestage21
              ),
              stage3: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayrounddriverallowancestage31 &&
                      formik.errors.onewayrounddriverallowancestage31
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayrounddriverallowancestage31"
                    name="onewayrounddriverallowancestage31"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayrounddriverallowancestage31}
                  />
                  {formik.touched.onewayrounddriverallowancestage31 &&
                  formik.errors.onewayrounddriverallowancestage31 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayrounddriverallowancestage31}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayrounddriverallowancestage31
              ),
            },
            ridertaxs: {
              sgst: premiumData?.driver_allowance?.RTSGST ?? "--",
              cgst: premiumData?.driver_allowance?.RTCGST ?? "--",
              igst: premiumData?.driver_allowance?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1:
                premiumData?.driver_allowance?.ComrideCommissionStage1 ?? "--",
              stage2:
                premiumData?.driver_allowance?.ComrideCommissionStage2 ?? "--",
              stage3:
                premiumData?.driver_allowance?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.driver_allowance?.CTSGST ?? "--",
              cgst: premiumData?.driver_allowance?.CTCGST ?? "--",
              igst: premiumData?.driver_allowance?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "SGST",
            driverCommission: {
              stage1: premiumData?.n_sgst?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.n_sgst?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.n_sgst?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.onewayroundsgstsgst &&
                      formik.errors.onewayroundsgstsgst 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundsgstsgst"
                    name="onewayroundsgstsgst"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundsgstsgst}
                  />
                  {formik.touched.onewayroundsgstsgst &&
                  formik.errors.onewayroundsgstsgst ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundsgstsgst}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundsgstsgst
              ),
              cgst: premiumData?.n_sgst?.RTCGST ?? "--",
              igst: premiumData?.n_sgst?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.n_sgst?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.n_sgst?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.n_sgst?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.n_sgst?.CTSGST ?? "--",
              cgst: premiumData?.n_sgst?.CTCGST ?? "--",
              igst: premiumData?.n_sgst?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "SGST",
            driverCommission: {
              stage1: premiumData?.n_sgst?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.n_sgst?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.n_sgst?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundsgstsgst1 &&
                      formik.errors.onewayroundsgstsgst1 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundsgstsgst1"
                    name="onewayroundsgstsgst1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundsgstsgst1}
                  />
                  {formik.touched.onewayroundsgstsgst1 &&
                  formik.errors.onewayroundsgstsgst1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundsgstsgst1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundsgstsgst1
              ),
              cgst: premiumData?.n_sgst?.RTCGST ?? "--",
              igst: premiumData?.n_sgst?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.n_sgst?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.n_sgst?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.n_sgst?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.n_sgst?.CTSGST ?? "--",
              cgst: premiumData?.n_sgst?.CTCGST ?? "--",
              igst: premiumData?.n_sgst?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "CGST",
            driverCommission: {
              stage1: premiumData?.n_cgst?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.n_cgst?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.n_cgst?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.n_cgst?.RTSGST ?? "--",
              cgst: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.onewayroundcgstcgst &&
                      formik.errors.onewayroundcgstcgst
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundcgstcgst"
                    name="onewayroundcgstcgst"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundcgstcgst}
                  />
                  {formik.touched.onewayroundcgstcgst &&
                  formik.errors.onewayroundcgstcgst ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundcgstcgst}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundcgstcgst
              ),
              igst: premiumData?.n_cgst?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.n_cgst?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.n_cgst?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.n_cgst?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.n_cgst?.CTSGST ?? "--",
              cgst: premiumData?.n_cgst?.CTCGST ?? "--",
              igst: premiumData?.n_cgst?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "CGST",
            driverCommission: {
              stage1: premiumData?.n_cgst?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.n_cgst?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.n_cgst?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.n_cgst?.RTSGST ?? "--",
              cgst: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundcgstcgst1 &&
                      formik.errors.onewayroundcgstcgst1
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundcgstcgst1"
                    name="onewayroundcgstcgst1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundcgstcgst1}
                  />
                  {formik.touched.onewayroundcgstcgst1 &&
                  formik.errors.onewayroundcgstcgst1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundcgstcgst1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundcgstcgst1
              ),
              igst: premiumData?.n_cgst?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.n_cgst?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.n_cgst?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.n_cgst?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.n_cgst?.RTCGST ?? "--",
              cgst: premiumData?.n_cgst?.RTSGST ?? "--",
              igst: premiumData?.n_cgst?.RTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "IGST",
            driverCommission: {
              stage1: premiumData?.n_igst?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.n_igst?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.n_igst?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.n_igst?.RTSGST ?? "--",
              cgst: premiumData?.n_igst?.RTCGST ?? "--",
              igst: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundigstigst &&
                      formik.errors.onewayroundigstigst
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundigstigst"
                    name="onewayroundigstigst"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundigstigst}
                  />
                  {formik.touched.onewayroundigstigst &&
                  formik.errors.onewayroundigstigst ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundigstigst}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundigstigst
              ),
            },
            comridecomission: {
              stage1: premiumData?.n_igst?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.n_igst?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.n_igst?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.n_igst?.CTSGST ?? "--",
              cgst: premiumData?.n_igst?.CTCGST ?? "--",
              igst: premiumData?.n_igst?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "IGST",
            driverCommission: {
              stage1: premiumData?.n_igst?.DriverCommissionStage1 ?? "--",
              stage2: premiumData?.n_igst?.DriverCommissionStage2 ?? "--",
              stage3: premiumData?.n_igst?.DriverCommissionStage3 ?? "--",
            },
            ridertaxs: {
              sgst: premiumData?.n_igst?.RTSGST ?? "--",
              cgst: premiumData?.n_igst?.RTCGST ?? "--",
              igst: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundigstigst1 &&
                      formik.errors.onewayroundigstigst1
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundigstigst1"
                    name="onewayroundigstigst1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundigstigst1}
                  />
                  {formik.touched.onewayroundigstigst1 &&
                  formik.errors.onewayroundigstigst1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundigstigst1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundigstigst1
              ),
            },
            comridecomission: {
              stage1: premiumData?.n_igst?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.n_igst?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.n_igst?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.n_igst?.RTCGST ?? "--",
              cgst: premiumData?.n_igst?.RTSGST ?? "--",
              igst: premiumData?.n_igst?.RTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Tips",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                     className={
                      formik.touched.onewayroundtipsstage1 &&
                      formik.errors.onewayroundtipsstage1
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundtipsstage1"
                    name="onewayroundtipsstage1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundtipsstage1}
                  />
                  {formik.touched.onewayroundtipsstage1 &&
                  formik.errors.onewayroundtipsstage1 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundtipsstage1}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundtipsstage1
              ),
              stage2: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.onewayroundtipsstage2 &&
                      formik.errors.onewayroundtipsstage2 
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundtipsstage2"
                    name="onewayroundtipsstage2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundtipsstage2}
                  />
                  {formik.touched.onewayroundtipsstage2 &&
                  formik.errors.onewayroundtipsstage2 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundtipsstage2}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundtipsstage2
              ),
              stage3: isEditing ? (
                <>
                  <input
                      className={
                        formik.touched.onewayroundtipsstage3 &&
                        formik.errors.onewayroundtipsstage3
                          ? "premium_table_ipbox_error"
                          : "premium_table_ipbox"
                      }
                    id="onewayroundtipsstage3"
                    name="onewayroundtipsstage3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundtipsstage3}
                  />
                  {formik.touched.onewayroundtipsstage3 &&
                  formik.errors.onewayroundtipsstage3 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundtipsstage3}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundtipsstage3
              ),
            },
            ridertaxs: {
              sgst: premiumData?.tips?.RTSGST ?? "--",
              cgst: premiumData?.tips?.RTCGST ?? "--",
              igst: premiumData?.tips?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.tips?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.tips?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.tips?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.tips?.CTSGST ?? "--",
              cgst: premiumData?.tips?.CTCGST ?? "--",
              igst: premiumData?.tips?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Tips",
            driverCommission: {
              stage1: isEditing ? (
                <>
                  <input
                      className={
                        formik.touched.onewayroundtipsstage11 &&
                        formik.errors.onewayroundtipsstage11
                          ? "premium_table_ipbox_error"
                          : "premium_table_ipbox"
                      }
                    id="onewayroundtipsstage11"
                    name="onewayroundtipsstage11"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundtipsstage11}
                  />
                  {formik.touched.onewayroundtipsstage11 &&
                  formik.errors.onewayroundtipsstage11 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundtipsstage11}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundtipsstage11
              ),
              stage2: isEditing ? (
                <>
                  <input
                      className={
                        formik.touched.onewayroundtipsstage21 &&
                        formik.errors.onewayroundtipsstage21 
                          ? "premium_table_ipbox_error"
                          : "premium_table_ipbox"
                      }
                    id="onewayroundtipsstage21"
                    name="onewayroundtipsstage21"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundtipsstage21}
                  />
                  {formik.touched.onewayroundtipsstage21 &&
                  formik.errors.onewayroundtipsstage21 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundtipsstage21}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundtipsstage21
              ),
              stage3: isEditing ? (
                <>
                  <input
                    className={
                      formik.touched.onewayroundtipsstage31 &&
                      formik.errors.onewayroundtipsstage31
                        ? "premium_table_ipbox_error"
                        : "premium_table_ipbox"
                    }
                    id="onewayroundtipsstage31"
                    name="onewayroundtipsstage31"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.onewayroundtipsstage31}
                  />
                  {formik.touched.onewayroundtipsstage31 &&
                  formik.errors.onewayroundtipsstage31 ? (
                    <div className="text-danger fs_10">
                      {formik.errors.onewayroundtipsstage31}
                    </div>
                  ) : null}
                </>
              ) : (
                formik.values.onewayroundtipsstage31
              ),
            },
            ridertaxs: {
              sgst: premiumData?.tips?.RTSGST ?? "--",
              cgst: premiumData?.tips?.RTCGST ?? "--",
              igst: premiumData?.tips?.RTIGST ?? "--",
            },
            comridecomission: {
              stage1: premiumData?.tips?.ComrideCommissionStage1 ?? "--",
              stage2: premiumData?.tips?.ComrideCommissionStage2 ?? "--",
              stage3: premiumData?.tips?.ComrideCommissionStage3 ?? "--",
            },
            comridetaxes: {
              sgst: premiumData?.tips?.CTSGST ?? "--",
              cgst: premiumData?.tips?.CTCGST ?? "--",
              igst: premiumData?.tips?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    {
      mainheading: "Total SGST",
      driverCommission: {
        stage1: premiumData?.total_sgst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.total_sgst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.total_sgst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_sgst?.RTSGST ?? "--",
        cgst: premiumData?.total_sgst?.RTCGST ?? "--",
        igst: premiumData?.total_sgst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.total_sgst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.total_sgst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.total_sgst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_sgst?.CTSGST ?? "--",
        cgst: premiumData?.total_sgst?.CTCGST ?? "--",
        igst: premiumData?.total_sgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total CGST",
      driverCommission: {
        stage1: premiumData?.total_cgst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.total_cgst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.total_cgst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_cgst?.RTSGST ?? "--",
        cgst: premiumData?.total_cgst?.RTCGST ?? "--",
        igst: premiumData?.total_cgst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.total_cgst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.total_cgst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.total_cgst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_cgst?.CTSGST ?? "--",
        cgst: premiumData?.total_cgst?.CTCGST ?? "--",
        igst: premiumData?.total_cgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total IGST",
      driverCommission: {
        stage1: premiumData?.total_igst?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.total_igst?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.total_igst?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_igst?.RTSGST ?? "--",
        cgst: premiumData?.total_igst?.RTCGST ?? "--",
        igst: premiumData?.total_igst?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.total_igst?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.total_igst?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.total_igst?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_igst?.CTSGST ?? "--",
        cgst: premiumData?.total_igst?.CTCGST ?? "--",
        igst: premiumData?.total_igst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Taxes",
      driverCommission: {
        stage1: premiumData?.total_tax?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.total_tax?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.total_tax?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_tax?.RTSGST ?? "--",
        cgst: premiumData?.total_tax?.RTCGST ?? "--",
        igst: premiumData?.total_tax?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.total_tax?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.total_tax?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.total_tax?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_tax?.CTSGST ?? "--",
        cgst: premiumData?.total_tax?.CTCGST ?? "--",
        igst: premiumData?.total_tax?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Trip Fare",
      driverCommission: {
        stage1: premiumData?.total_trip_fare?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.total_trip_fare?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.total_trip_fare?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_trip_fare?.RTSGST ?? "--",
        cgst: premiumData?.total_trip_fare?.RTCGST ?? "--",
        igst: premiumData?.total_trip_fare?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.total_trip_fare?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.total_trip_fare?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.total_trip_fare?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_trip_fare?.CTSGST ?? "--",
        cgst: premiumData?.total_trip_fare?.CTCGST ?? "--",
        igst: premiumData?.total_trip_fare?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Trip Fare (Including Taxes)",
      driverCommission: {
        stage1:
          premiumData?.total_trip_fare_with_tax?.DriverCommissionStage1 ?? "--",
        stage2:
          premiumData?.total_trip_fare_with_tax?.DriverCommissionStage2 ?? "--",
        stage3:
          premiumData?.total_trip_fare_with_tax?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_trip_fare_with_tax?.RTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_with_tax?.RTCGST ?? "--",
        igst: premiumData?.total_trip_fare_with_tax?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1:
          premiumData?.total_trip_fare_with_tax?.ComrideCommissionStage1 ??
          "--",
        stage2:
          premiumData?.total_trip_fare_with_tax?.ComrideCommissionStage2 ??
          "--",
        stage3:
          premiumData?.total_trip_fare_with_tax?.ComrideCommissionStage3 ??
          "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_trip_fare_with_tax?.CTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_with_tax?.CTCGST ?? "--",
        igst: premiumData?.total_trip_fare_with_tax?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Trip Fare (Rounded Off)",
      driverCommission: {
        stage1:
          premiumData?.total_trip_fare_round_off?.DriverCommissionStage1 ??
          "--",
        stage2:
          premiumData?.total_trip_fare_round_off?.DriverCommissionStage2 ??
          "--",
        stage3:
          premiumData?.total_trip_fare_round_off?.DriverCommissionStage3 ??
          "--",
      },
      ridertaxs: {
        sgst: premiumData?.total_trip_fare_round_off?.RTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_round_off?.RTCGST ?? "--",
        igst: premiumData?.total_trip_fare_round_off?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1:
          premiumData?.total_trip_fare_round_off?.ComrideCommissionStage1 ??
          "--",
        stage2:
          premiumData?.total_trip_fare_round_off?.ComrideCommissionStage2 ??
          "--",
        stage3:
          premiumData?.total_trip_fare_round_off?.ComrideCommissionStage3 ??
          "--",
      },
      comridetaxes: {
        sgst: premiumData?.total_trip_fare_round_off?.CTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_round_off?.CTCGST ?? "--",
        igst: premiumData?.total_trip_fare_round_off?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Pending Amount From Previous Trips ",
      driverCommission: {
        stage1:
          premiumData?.pending_amt_from_previous?.DriverCommissionStage1 ??
          "--",
        stage2:
          premiumData?.pending_amt_from_previous?.DriverCommissionStage2 ??
          "--",
        stage3:
          premiumData?.pending_amt_from_previous?.DriverCommissionStage3 ??
          "--",
      },
      ridertaxs: {
        sgst: premiumData?.pending_amt_from_previous?.RTSGST ?? "--",
        cgst: premiumData?.pending_amt_from_previous?.RTCGST ?? "--",
        igst: premiumData?.pending_amt_from_previous?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1:
          premiumData?.pending_amt_from_previous?.ComrideCommissionStage1 ??
          "--",
        stage2:
          premiumData?.pending_amt_from_previous?.ComrideCommissionStage2 ??
          "--",
        stage3:
          premiumData?.pending_amt_from_previous?.ComrideCommissionStage3 ??
          "--",
      },
      comridetaxes: {
        sgst: premiumData?.pending_amt_from_previous?.CTSGST ?? "--",
        cgst: premiumData?.pending_amt_from_previous?.CTCGST ?? "--",
        igst: premiumData?.pending_amt_from_previous?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Final Fare",
      driverCommission: {
        stage1: premiumData?.final_fare?.DriverCommissionStage1 ?? "--",
        stage2: premiumData?.final_fare?.DriverCommissionStage2 ?? "--",
        stage3: premiumData?.final_fare?.DriverCommissionStage3 ?? "--",
      },
      ridertaxs: {
        sgst: premiumData?.final_fare?.RTSGST ?? "--",
        cgst: premiumData?.final_fare?.RTCGST ?? "--",
        igst: premiumData?.final_fare?.RTIGST ?? "--",
      },
      comridecomission: {
        stage1: premiumData?.final_fare?.ComrideCommissionStage1 ?? "--",
        stage2: premiumData?.final_fare?.ComrideCommissionStage2 ?? "--",
        stage3: premiumData?.final_fare?.ComrideCommissionStage3 ?? "--",
      },
      comridetaxes: {
        sgst: premiumData?.final_fare?.CTSGST ?? "--",
        cgst: premiumData?.final_fare?.CTCGST ?? "--",
        igst: premiumData?.final_fare?.CTIGST ?? "--",
      },
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  console.log(formik.values, "yxfgcggggggggggggg");

  console.log(premiumData, "kjfaks");
  console.log(is_editable, "kjfaks");

  return (
    <>
      <PremiumPasswordModal
        premiumPasswordModal={premiumPasswordModal}
        handlePremiumPWClose={handlePremiumPWClose}
        title="Are you sure you want to update"
        formik={formik}
        params={params}
        premiumtype={premiumtype}
        bookingType={bookingType}
        id={premiumData?.id}
        reload={reload}
        setReload={setReload}
        moduleType={moduleType}
        managePremiumType={managePremiumType}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className=" d-flex justify-content-end">
          {action === "view" ? null : (
            <>
              {!isEditing ? (
                <button
                  className={`${
                    is_editable === false ? "disabled_color_bg" : "primary_bg"
                  } border-0  white_color px-3 fs_15 border_radius_5px`}
                  onClick={handleEdit}
                  disabled={is_editable === false}
                >
                  Edit
                </button>
              ) : (
                <>
                  {/* <div className="d-sm-flex justify-content-end gap-3 mt-3">
                    <button
                      className="border_none green_color_bg white_color px-5  py-2 border_radius_5px fw_600 fs_14 mb-2 mb-sm-0"
                      type="submit"
                      onClick={formik.handleSubmit}
                    >
                      Update
                    </button>
                    <button
                      className="white_bg border_radius_5px px-2 undo_change_btn fw_600 mb-2 mb-sm-0"
                      type="reset"
                      onClick={() => {
                        formik.resetForm();
                      }}
                    >
                      <span className="d-flex align-items-center red_color px-4 fs_14">
                        <i className="ri-close-circle-fill red_color pe-1"></i>
                        Reset
                      </span>
                    </button>
                    <Cancelbtn
                      cancelFn={() => {
                        handleCancel();
                      }}
                    />
                  </div> */}
                </>
              )}
            </>
          )}
        </div>
        <div className="premiumtable_container mt-2">
          <table className="table_container text-nowrap">
            <thead className="">
              <tr className="">
                <td className="tableborderline"></td>
                <td className="tableborderline">Driver Commission %</td>
                <td className="tableborderline">Driver Commission %</td>
                <td className="tableborderline">Driver Commission %</td>
                <td className="tableborderline" colspan="3">
                  Rider Taxes (as applicable)
                </td>
                <td className="tableborderline">Comride Commission%</td>
                <td className="tableborderline">Comride Commission%</td>
                <td className="tableborderline">Comride Commission%</td>
                <td className="tableborderline" colspan="3">
                  Comride Taxes (As Applicable)
                </td>
              </tr>
              <tr class="">
                {/* <td className="tableborderlinebottom"></td> */}
                                <td className="tableborderline"></td>
                <td className="tableborderline">Stage-1</td>
                <td className="tableborderline">Stage-2</td>
                <td className="tableborderline">Stage-3</td>
                <td className="tableborderline">SGST%</td>
                <td className="tableborderline">CGST%</td>
                <td className="tableborderline">IGST%</td>
                <td className="tableborderline">Stage-1</td>
                <td className="tableborderline">Stage-2</td>
                <td className="tableborderline">Stage-3</td>
                <td className="tableborderline">SGST%</td>
                <td className="tableborderline">CGST%</td>
                <td className="tableborderline">IGST%</td>
              </tr>
            </thead>
            <tbody className="">
              {moduleTable?.map((item) => {
                return (
                  <>
                    <tr class="">
                      <td className="premiumtbody_td table_padding">
                        {item?.mainheading}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.driverCommission?.stage1}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.driverCommission?.stage2}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.driverCommission?.stage3}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.ridertaxs?.sgst}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.ridertaxs?.cgst}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.ridertaxs?.igst}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.comridecomission?.stage1}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.comridecomission?.stage2}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.comridecomission?.stage3}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.comridetaxes?.sgst}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.comridetaxes?.cgst}
                      </td>
                      <td
                        className={`premiumtbody_td tdata_backgdcolor text-center ${
                          !isEditing ? "table_padding" : ""
                        }`}
                      >
                        {item?.comridetaxes?.igst}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className=" d-flex justify-content-end">
            {action === "view" ? null : (
              <>
                {!isEditing ? (
                  <></>
                ) : (
                  // <button
                  //   className={`${
                  //     is_editable === false ? "disabled_color_bg" : "primary_bg"
                  //   } border-0  white_color px-3 fs_15 border_radius_5px`}
                  //   onClick={handleEdit}
                  //   disabled={is_editable === false}
                  // >
                  //   Edit
                  // </button>
                  <>
                    <div className="d-sm-flex justify-content-end  gap-3 mt-3">
                      <button
                        className="border_none green_color_bg white_color px-5  py-2 border_radius_5px fw_600 fs_14 mb-2 mb-sm-0"
                        type="submit"
                        onClick={formik.handleSubmit}
                      >
                        Update
                      </button>
                      <button
                        className="white_bg border_radius_5px px-2 undo_change_btn fw_600 mb-2 mb-sm-0"
                        type="reset"
                        onClick={() => {
                          formik.resetForm();
                        }}
                      >
                        <span className="d-flex align-items-center red_color px-4 fs_14">
                          <i className="ri-close-circle-fill red_color pe-1"></i>
                          Reset
                        </span>
                      </button>
                      <Cancelbtn
                        cancelFn={() => {
                          handleCancel();
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {/* {firstErrorField && (
          <div className="red_color fs_13 fw_400 ps-3">
            {formik.errors[firstErrorField]}
          </div>
        )} */}
        </div>
      </form>
    </>
  );
};

export default Premium4Table;
