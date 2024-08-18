import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useFormik } from "formik";
import * as Yup from "yup";
import PremiumPasswordModal from "../passwordModal";
import { wholeNumRegex } from "../../helper";
import SpinnerLoading from "../../utilits/spinnerLoading";

const Premium1235Table = ({
  type = "",
  premiumtype,
  sideNavbarList,
  premiumData,
  action,
  bookingType,
  reload,
  setReload,
  managePremiumType,
  setStatusValue,
  loading,
  setLoading,
}) => {
  console.log(bookingType, "bookingType");
  console.log(premiumData, "jhgjgkjgk");
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const [premiumPasswordModal, setpremiumPasswordModal] = useState(false);
  const handlePremiumPWClose = () => {
    setpremiumPasswordModal(false);
  };
  const handlepremiumPasswordModal = () => setpremiumPasswordModal(true);
  console.log(premiumData, "akjdhkasld");

  useEffect(() => {
    if (premiumtype === "Premium5") {
      setStatusValue(premiumData?.status === "Active" ? true : false);
    }
  }, [premiumData?.status]);

  function validationFn() {
    if (bookingType === "LocalTrip") {
      const Local = Yup.object().shape({
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
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
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtollsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localparkingstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtransportstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtipsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return Local;
    } else if (bookingType === "RentalTrip") {
      const RentalTrip = Yup.object().shape({
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
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
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        localtipsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return RentalTrip;
    } else if (bookingType === "OneWayOutstation") {
      const OnewayTrip = Yup.object().shape({
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
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
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage1: Yup.string()
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
        localtipsstage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
      });

      return OnewayTrip;
    } else if (bookingType === "RoundTripOutstation") {
      const RoundTrip = Yup.object().shape({
        tripfarestage1: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        tripfarecomridestage1: Yup.string()
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
        sgstcomridesecondsgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        cgstcomridesecondcgst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        igstcomridesecondigst: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayroundnightallowancestage11: Yup.string()
          .matches(wholeNumRegex, "Invalid value")
          .required("Enter value"),
        onewayrounddriverallowancestage11: Yup.string()
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
        localtipsstage1: Yup.string()
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
      tripfarestage1:
        premiumData?.trip_fare_after_coupon?.DriverCommission ?? "",
      tripfarecomridestage1:
        premiumData?.trip_fare_after_coupon?.ComrideCommission ?? "",
      sgstcomridesgst: premiumData?.sgst?.CTSGST ?? "",
      sgstsgst: premiumData?.sgst?.RTSGST ?? "",

      cgstcomridecgst: premiumData?.cgst?.CTCGST ?? "",
      cgstcgst: premiumData?.cgst?.RTCGST ?? "",
      igstcomrideigst: premiumData?.igst?.CTIGST ?? "",
      igstigst: premiumData?.igst?.RTIGST ?? "",
      bookingfeecomridestage1:
        premiumData?.booking_fee?.ComrideCommission ?? "",
      sgstcomridesecondsgst: premiumData?.b_sgst?.CTSGST ?? "",
      cgstcomridesecondcgst: premiumData?.b_cgst?.CTCGST ?? "",
      igstcomridesecondigst: premiumData?.b_igst?.CTIGST ?? "",
      localtollsstage1: premiumData?.toll_fee?.DriverCommission ?? "",
      localparkingstage1: premiumData?.parking_fee?.DriverCommission ?? "",
      localtransportstage1:
        premiumData?.transport_hub_fee?.DriverCommission ?? "",
      localtipsstage1: premiumData?.tips?.DriverCommission ?? "",
      onewayroundnightallowancestage1:
        premiumData?.night_allowance?.DriverCommission ?? "",
      onewayroundnightallowancestage11:
        premiumData?.night_allowance?.DriverCommission ?? "",
      onewayrounddriverallowancestage1:
        premiumData?.driver_allowance?.DriverCommission ?? "",
      onewayrounddriverallowancestage11:
        premiumData?.driver_allowance?.DriverCommission ?? "",
      onewayroundsgstsgst: premiumData?.n_sgst?.RTSGST ?? "",
      onewayroundsgstsgst1: premiumData?.n_sgst?.RTSGST ?? "",
      onewayroundcgstcgst: premiumData?.n_cgst?.RTCGST ?? "",
      onewayroundcgstcgst1: premiumData?.n_cgst?.RTCGST ?? "",
      onewayroundigstigst: premiumData?.n_igst?.RTIGST ?? "",
      onewayroundigstigst1: premiumData?.n_igst?.RTIGST ?? "",
    },
    validationSchema: validationss,

    onSubmit: (values) => {
      console.log(values);
      console.log(formik.values, "chgggggggggggggggggg");
      setIsEditing(false);
      handlepremiumPasswordModal();
    },
  });

  console.log(formik?.values?.onewayroundsgstsgst1, "askdhalkd");
  console.log(formik?.values?.onewayroundigstigst1, "askdhalkd");

  console.log(formik.errors, "errorssssssssssssss");

  const moduleTable = [
    {
      mainheading: "Base Fare",
      driverCommission: premiumData?.base_fare?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.base_fare?.RTSGST ?? "--",
        cgst: premiumData?.base_fare?.RTCGST ?? "--",
        igst: premiumData?.base_fare?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.base_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.distance_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.distance_fare?.RTSGST ?? "--",
              cgst: premiumData?.distance_fare?.RTCGST ?? "--",
              igst: premiumData?.distance_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.distance_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.extra_km_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.extra_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.extra_km_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.remaining_km_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.remaining_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.remaining_km_fare?.RTCGST ?? "--",
              igst: premiumData?.remaining_km_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.remaining_km_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.remaining_km_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.remaining_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.remaining_km_fare?.RTCGST ?? "--",
              igst: premiumData?.remaining_km_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.remaining_km_fare?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.time_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.time_fare?.RTSGST ?? "--",
              cgst: premiumData?.time_fare?.RTCGST ?? "--",
              igst: premiumData?.time_fare?.RTIGST ?? "--",
            },
            comridecomission: premiumData?.time_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.extra_time_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.extra_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.extra_time_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.remaining_time_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.remaining_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.remaining_time_fare?.RTCGST ?? "--",
              igst: premiumData?.remaining_time_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.remaining_time_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.extra_km_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.extra_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.extra_km_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.extra_km_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.extra_km_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_km_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_km_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.extra_km_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.extra_time_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.extra_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.extra_time_fare?.ComrideCommission ?? "--",
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
            driverCommission:
              premiumData?.extra_time_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.extra_time_fare?.RTSGST ?? "--",
              cgst: premiumData?.extra_time_fare?.RTCGST ?? "--",
              igst: premiumData?.extra_time_fare?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.extra_time_fare?.ComrideCommission ?? "--",
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
      driverCommission: premiumData?.waiting_fee?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.waiting_fee?.RTSGST ?? "--",
        cgst: premiumData?.waiting_fee?.RTCGST ?? "--",
        igst: premiumData?.waiting_fee?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.waiting_fee?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.waiting_fee?.CTSGST ?? "--",
        cgst: premiumData?.waiting_fee?.CTCGST ?? "--",
        igst: premiumData?.waiting_fee?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Cancellation Fee",
      driverCommission: premiumData?.cancellation_fee?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.cancellation_fee?.RTSGST ?? "--",
        cgst: premiumData?.cancellation_fee?.RTCGST ?? "--",
        igst: premiumData?.cancellation_fee?.RTIGST ?? "--",
      },
      comridecomission:
        premiumData?.cancellation_fee?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.trip_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.trip_fare?.RTSGST ?? "--",
              cgst: premiumData?.trip_fare?.RTCGST ?? "--",
              igst: premiumData?.trip_fare?.RTIGST ?? "--",
            },
            comridecomission: premiumData?.trip_fare?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.trip_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.trip_fare?.RTSGST ?? "--",
              cgst: premiumData?.trip_fare?.RTCGST ?? "--",
              igst: premiumData?.trip_fare?.RTIGST ?? "--",
            },
            comridecomission: premiumData?.trip_fare?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.trip_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.trip_fare?.RTSGST ?? "--",
              cgst: premiumData?.trip_fare?.RTCGST ?? "--",
              igst: premiumData?.trip_fare?.RTIGST ?? "--",
            },
            comridecomission: premiumData?.trip_fare?.ComrideCommission ?? "--",
            comridetaxes: {
              sgst: premiumData?.trip_fare?.CTSGST ?? "--",
              cgst: premiumData?.trip_fare?.CTCGST ?? "--",
              igst: premiumData?.trip_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    ...(type === "defaultPremiumRoundtrip"
      ? [
          {
            mainheading: "Trip Fare",
            driverCommission: premiumData?.trip_fare?.DriverCommission ?? "--",
            ridertaxs: {
              sgst: premiumData?.trip_fare?.RTSGST ?? "--",
              cgst: premiumData?.trip_fare?.RTCGST ?? "--",
              igst: premiumData?.trip_fare?.RTIGST ?? "--",
            },
            comridecomission: premiumData?.trip_fare?.ComrideCommission ?? "--",
            comridetaxes: {
              sgst: premiumData?.trip_fare?.CTSGST ?? "--",
              cgst: premiumData?.trip_fare?.CTCGST ?? "--",
              igst: premiumData?.trip_fare?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    {
      mainheading: "Coupon Savings",
      driverCommission: premiumData?.coupon_savings?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.coupon_savings?.RTSGST ?? "--",
        cgst: premiumData?.coupon_savings?.RTCGST ?? "--",
        igst: premiumData?.coupon_savings?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.coupon_savings?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.coupon_savings?.CTSGST ?? "--",
        cgst: premiumData?.coupon_savings?.CTCGST ?? "--",
        igst: premiumData?.coupon_savings?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Trip Fare (After Coupon Savings)",
      driverCommission: isEditing ? (
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
      ridertaxs: {
        sgst: premiumData?.trip_fare_after_coupon?.RTSGST ?? "--",
        cgst: premiumData?.trip_fare_after_coupon?.RTCGST ?? "--",
        igst: premiumData?.trip_fare_after_coupon?.RTIGST ?? "--",
      },
      comridecomission: isEditing ? (
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
      comridetaxes: {
        sgst: premiumData?.trip_fare_after_coupon?.CTSGST ?? "--",
        cgst: premiumData?.trip_fare_after_coupon?.CTCGST ?? "--",
        igst: premiumData?.trip_fare_after_coupon?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "SGST",
      driverCommission: premiumData?.sgst?.DriverCommission ?? "--",
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
      comridecomission: premiumData?.sgst?.ComrideCommission ?? "--",
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
      driverCommission: premiumData?.cgst?.DriverCommission ?? "--",
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
      comridecomission: premiumData?.cgst?.ComrideCommission ?? "--",
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
      driverCommission: premiumData?.igst?.DriverCommission ?? "--",
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
      comridecomission: premiumData?.igst?.ComrideCommission ?? "--",
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
      driverCommission: premiumData?.booking_fee?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.booking_fee?.RTSGST ?? "--",
        cgst: premiumData?.booking_fee?.RTCGST ?? "--",
        igst: premiumData?.booking_fee?.RTIGST ?? "--",
      },
      comridecomission: isEditing ? (
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
      comridetaxes: {
        sgst: premiumData?.booking_fee?.CTSGST ?? "--",
        cgst: premiumData?.booking_fee?.CTCGST ?? "--",
        igst: premiumData?.booking_fee?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "SGST",
      driverCommission: premiumData?.b_sgst?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.b_sgst?.RTSGST ?? "--",
        cgst: premiumData?.b_sgst?.RTCGST ?? "--",
        igst: premiumData?.b_sgst?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.b_sgst?.ComrideCommission ?? "--",
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
      driverCommission: premiumData?.b_cgst?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.b_cgst?.RTSGST ?? "--",
        cgst: premiumData?.b_cgst?.RTCGST ?? "--",
        igst: premiumData?.b_cgst?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.b_cgst?.ComrideCommission ?? "--",
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
      driverCommission: premiumData?.b_igst?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.b_igst?.RTSGST ?? "--",
        cgst: premiumData?.b_igst?.RTCGST ?? "--",
        igst: premiumData?.b_igst?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.b_igst?.ComrideCommission ?? "--",
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
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.toll_fee?.RTSGST ?? "--",
              cgst: premiumData?.toll_fee?.RTCGST ?? "--",
              igst: premiumData?.toll_fee?.RTIGST ?? "--",
            },
            comridecomission: premiumData?.toll_fee?.ComrideCommission ?? "--",
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
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.parking_fee?.RTSGST ?? "--",
              cgst: premiumData?.parking_fee?.RTCGST ?? "--",
              igst: premiumData?.parking_fee?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.parking_fee?.ComrideCommission ?? "--",
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
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.transport_hub_fee?.RTSGST ?? "--",
              cgst: premiumData?.transport_hub_fee?.RTCGST ?? "--",
              igst: premiumData?.transport_hub_fee?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.transport_hub_fee?.ComrideCommission ?? "--",
            comridetaxes: {
              sgst: premiumData?.transport_hub_fee?.CTSGST ?? "--",
              cgst: premiumData?.transport_hub_fee?.CTCGST ?? "--",
              igst: premiumData?.transport_hub_fee?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "Night Allowance",
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.night_allowance?.RTSGST ?? "--",
              cgst: premiumData?.night_allowance?.RTCGST ?? "--",
              igst: premiumData?.night_allowance?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.night_allowance?.ComrideCommission ?? "--",
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
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.night_allowance?.RTSGST ?? "--",
              cgst: premiumData?.night_allowance?.RTCGST ?? "--",
              igst: premiumData?.night_allowance?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.night_allowance?.ComrideCommission ?? "--",
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
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.driver_allowance?.RTSGST ?? "--",
              cgst: premiumData?.driver_allowance?.RTCGST ?? "--",
              igst: premiumData?.driver_allowance?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.driver_allowance?.ComrideCommission ?? "--",
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
            driverCommission: isEditing ? (
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
            ridertaxs: {
              sgst: premiumData?.driver_allowance?.RTSGST ?? "--",
              cgst: premiumData?.driver_allowance?.RTCGST ?? "--",
              igst: premiumData?.driver_allowance?.RTIGST ?? "--",
            },
            comridecomission:
              premiumData?.driver_allowance?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.n_sgst?.DriverCommission ?? "--",
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
            comridecomission: premiumData?.n_sgst?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.n_sgst?.DriverCommission ?? "--",
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
            comridecomission: premiumData?.n_sgst?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.n_cgst?.DriverCommission ?? "--",
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
            comridecomission: premiumData?.n_cgst?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.n_cgst?.DriverCommission ?? "--",
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
            comridecomission: premiumData?.n_cgst?.ComrideCommission ?? "--",
            comridetaxes: {
              sgst: premiumData?.n_cgst?.CTSGST ?? "--",
              cgst: premiumData?.n_cgst?.CTCGST ?? "--",
              igst: premiumData?.n_cgst?.CTIGST ?? "--",
            },
          },
        ]
      : []),
    ...(type === "defaultPremiumOneway"
      ? [
          {
            mainheading: "IGST",
            driverCommission: premiumData?.n_igst?.DriverCommission ?? "--",
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
            comridecomission: premiumData?.n_igst?.ComrideCommission ?? "--",
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
            driverCommission: premiumData?.n_igst?.DriverCommission ?? "--",
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
            comridecomission: premiumData?.n_igst?.ComrideCommission ?? "--",
            comridetaxes: {
              sgst: premiumData?.n_igst?.CTSGST ?? "--",
              cgst: premiumData?.n_igst?.CTCGST ?? "--",
              igst: premiumData?.n_igst?.CTIGST ?? "--",
            },
          },
        ]
      : []),

    {
      mainheading: "Tips",
      driverCommission: isEditing ? (
        <>
          <input
            className={
              formik.touched.localtipsstage1 && formik.errors.localtipsstage1
                ? "premium_table_ipbox_error"
                : "premium_table_ipbox"
            }
            id="localtipsstage1"
            name="localtipsstage1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.localtipsstage1}
          />
          {formik.touched.localtipsstage1 && formik.errors.localtipsstage1 ? (
            <div className="text-danger fs_10">
              {formik.errors.localtipsstage1}
            </div>
          ) : null}
        </>
      ) : (
        formik.values.localtipsstage1
      ),
      ridertaxs: {
        sgst: premiumData?.tips?.RTSGST ?? "--",
        cgst: premiumData?.tips?.RTCGST ?? "--",
        igst: premiumData?.tips?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.tips?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.tips?.CTSGST ?? "--",
        cgst: premiumData?.tips?.CTCGST ?? "--",
        igst: premiumData?.tips?.CTIGST ?? "--",
      },
    },

    {
      mainheading: "Total SGST",
      driverCommission: premiumData?.total_sgst?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_sgst?.RTSGST ?? "--",
        cgst: premiumData?.total_sgst?.RTCGST ?? "--",
        igst: premiumData?.total_sgst?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.total_sgst?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_sgst?.CTSGST ?? "--",
        cgst: premiumData?.total_sgst?.CTCGST ?? "--",
        igst: premiumData?.total_sgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total CGST",
      driverCommission: premiumData?.total_cgst?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_cgst?.RTSGST ?? "--",
        cgst: premiumData?.total_cgst?.RTCGST ?? "--",
        igst: premiumData?.total_cgst?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.total_cgst?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_cgst?.CTSGST ?? "--",
        cgst: premiumData?.total_cgst?.CTCGST ?? "--",
        igst: premiumData?.total_cgst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total IGST",
      driverCommission: premiumData?.total_igst?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_igst?.RTSGST ?? "--",
        cgst: premiumData?.total_igst?.RTCGST ?? "--",
        igst: premiumData?.total_igst?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.total_igst?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_igst?.CTSGST ?? "--",
        cgst: premiumData?.total_igst?.CTCGST ?? "--",
        igst: premiumData?.total_igst?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Taxes",
      driverCommission: premiumData?.total_tax?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_tax?.RTSGST ?? "--",
        cgst: premiumData?.total_tax?.RTCGST ?? "--",
        igst: premiumData?.total_tax?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.total_tax?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_tax?.CTSGST ?? "--",
        cgst: premiumData?.total_tax?.CTCGST ?? "--",
        igst: premiumData?.total_tax?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Trip Fare",
      driverCommission: premiumData?.total_trip_fare?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_trip_fare?.RTSGST ?? "--",
        cgst: premiumData?.total_trip_fare?.RTCGST ?? "--",
        igst: premiumData?.total_trip_fare?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.total_trip_fare?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_trip_fare?.CTSGST ?? "--",
        cgst: premiumData?.total_trip_fare?.CTCGST ?? "--",
        igst: premiumData?.total_trip_fare?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Trip Fare (Including Taxes)",
      driverCommission:
        premiumData?.total_trip_fare_with_tax?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_trip_fare_with_tax?.RTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_with_tax?.RTCGST ?? "--",
        igst: premiumData?.total_trip_fare_with_tax?.RTIGST ?? "--",
      },
      comridecomission:
        premiumData?.total_trip_fare_with_tax?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_trip_fare_with_tax?.CTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_with_tax?.CTCGST ?? "--",
        igst: premiumData?.total_trip_fare_with_tax?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Total Trip Fare (Rounded Off)",
      driverCommission:
        premiumData?.total_trip_fare_round_off?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.total_trip_fare_round_off?.RTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_round_off?.RTCGST ?? "--",
        igst: premiumData?.total_trip_fare_round_off?.RTIGST ?? "--",
      },
      comridecomission:
        premiumData?.total_trip_fare_round_off?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.total_trip_fare_round_off?.CTSGST ?? "--",
        cgst: premiumData?.total_trip_fare_round_off?.CTCGST ?? "--",
        igst: premiumData?.total_trip_fare_round_off?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Pending Amount From Previous Trips ",
      driverCommission:
        premiumData?.pending_amt_from_previous?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.pending_amt_from_previous?.RTSGST ?? "--",
        cgst: premiumData?.pending_amt_from_previous?.RTCGST ?? "--",
        igst: premiumData?.pending_amt_from_previous?.RTIGST ?? "--",
      },
      comridecomission:
        premiumData?.pending_amt_from_previous?.ComrideCommission ?? "--",
      comridetaxes: {
        sgst: premiumData?.pending_amt_from_previous?.CTSGST ?? "--",
        cgst: premiumData?.pending_amt_from_previous?.CTCGST ?? "--",
        igst: premiumData?.pending_amt_from_previous?.CTIGST ?? "--",
      },
    },
    {
      mainheading: "Final Fare",
      driverCommission: premiumData?.final_fare?.DriverCommission ?? "--",
      ridertaxs: {
        sgst: premiumData?.final_fare?.RTSGST ?? "--",
        cgst: premiumData?.final_fare?.RTCGST ?? "--",
        igst: premiumData?.final_fare?.RTIGST ?? "--",
      },
      comridecomission: premiumData?.final_fare?.ComrideCommission ?? "--",
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
        managePremiumType={managePremiumType}
      />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <SpinnerLoading />
        </div>
      ) : (
        <React.Fragment>
          <div className=" d-flex justify-content-end">
            {action === "view" ? null : (
              <>
                {!isEditing ? (
                  <button
                    className="border-0 primary_bg white_color px-3 fs_15 border_radius_5px"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    {/* <div className="d-sm-flex justify-content-end  gap-3 mt-3">
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
                  <td className="tableborderline" colspan="3">
                    Rider Taxes (as applicable)
                  </td>
                  <td className="tableborderline">Comride Commission%</td>
                  <td className="tableborderline" colspan="3">
                    Comride Taxes (As Applicable)
                  </td>
                </tr>
                <tr class="">
                  {/* <td className="tableborderlinebottom"></td> */}
                  <td className="tableborderline"></td>
                  <td className="tableborderline"></td>
                  <td className="tableborderline">SGST%</td>
                  <td className="tableborderline">CGST%</td>
                  <td className="tableborderline">IGST%</td>
                  <td className="tableborderline"></td>
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
                          {item?.driverCommission}
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
                          {item?.comridecomission}
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
                    //   className="border-0 primary_bg white_color px-3 fs_15 border_radius_5px"
                    //   onClick={handleEdit}
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
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default Premium1235Table;
