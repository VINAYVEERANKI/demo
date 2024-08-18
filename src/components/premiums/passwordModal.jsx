import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import PasswordInputField from "../form/passwordInputField";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../utilits/spinnerLoading";
import SuccessMessagemodal from "../modals/successMessageModal";
import {
  defaultPremium1235EditAction,
  defaultPremiumFourEditAction,
  managePremium1235EditAction,
  managePremiumFourEditAction,
} from "../../redux/actions/premiumaction/defaultPremiumAction";
import errorToast from "../utilits/errorToast";

const PremiumPasswordModal = ({
  premiumPasswordModal,
  handlePremiumPWClose,
  title,
  formik,
  params,
  premiumtype,
  bookingType,
  id,
  reload,
  setReload,
  moduleType,
  managePremiumType,
}) => {
  console.log(formik?.values?.onewayroundsgstsgst, "ksjhkas");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    formikCreatePass.resetForm();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("kajhksjd");

      const defaultData = {
        premium_type: premiumtype,
        booking_type: bookingType,
        trip_fare_after_coupon: {
          DriverCommission: formik?.values?.tripfarestage1
            ? +formik?.values?.tripfarestage1
            : "",
          ComrideCommission: formik?.values?.tripfarecomridestage1
            ? +formik?.values?.tripfarecomridestage1
            : "",
        },
        sgst: {
          RTSGST: formik?.values?.sgstsgst ? +formik?.values?.sgstsgst : "",
          CTSGST: formik?.values?.sgstcomridesgst
            ? +formik?.values?.sgstcomridesgst
            : "",
        },
        cgst: {
          RTCGST: formik?.values?.cgstcgst ? +formik?.values?.cgstcgst : "",
          CTCGST: formik?.values?.cgstcomridecgst
            ? +formik?.values?.cgstcomridecgst
            : "",
        },
        igst: {
          RTIGST: formik?.values?.igstigst ? +formik?.values?.igstigst : "",
          CTIGST: formik?.values?.igstcomrideigst
            ? +formik?.values?.igstcomrideigst
            : "",
        },
        booking_fee: {
          ComrideCommission: formik?.values?.bookingfeecomridestage1
            ? +formik?.values?.bookingfeecomridestage1
            : "",
        },
        b_sgst: {
          CTSGST: formik?.values?.sgstcomridesecondsgst
            ? +formik?.values?.sgstcomridesecondsgst
            : "",
        },
        b_igst: {
          CTIGST: formik?.values?.igstcomridesecondigst
            ? +formik?.values?.igstcomridesecondigst
            : "",
        },
        b_cgst: {
          CTCGST: formik?.values?.cgstcomridesecondcgst
            ? +formik?.values?.cgstcomridesecondcgst
            : "",
        },
        password: values?.password,
      };
      if (managePremiumType === "defaultPremium") {
        if (
          premiumtype === "Premium1" ||
          premiumtype === "Premium2" ||
          premiumtype === "Premium3" ||
          premiumtype === "Premium5"
        ) {
          setLoading(true);
          dispatch(
            defaultPremium1235EditAction(
              { id: id },
              {
                ...defaultData,

                ...(bookingType === "LocalTrip"
                  ? {
                    toll_fee: {
                      DriverCommission: formik?.values?.localtollsstage1
                        ? +formik?.values?.localtollsstage1
                        : "",
                    },
                    parking_fee: {
                      DriverCommission: formik?.values?.localparkingstage1
                        ? +formik?.values?.localparkingstage1
                        : "",
                    },
                    transport_hub_fee: {
                      DriverCommission: formik?.values?.localtransportstage1
                        ? +formik?.values?.localtransportstage1
                        : "",
                    },
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),
                ...(bookingType === "RentalTrip"
                  ? {
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),

                ...(bookingType === "OneWayOutstation"
                  ? {
                    night_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayroundnightallowancestage1
                        ? +formik?.values?.onewayroundnightallowancestage1
                        : "",
                    },
                    driver_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayrounddriverallowancestage1
                        ? +formik?.values?.onewayrounddriverallowancestage1
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst
                        ? +formik?.values?.onewayroundsgstsgst
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst
                        ? +formik?.values?.onewayroundigstigst
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst
                        ? +formik?.values?.onewayroundcgstcgst
                        : "",
                    },
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),
                ...(bookingType === "RoundTripOutstation"
                  ? {
                    night_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayroundnightallowancestage11
                        ? +formik?.values?.onewayroundnightallowancestage11
                        : "",
                    },
                    driver_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayrounddriverallowancestage11
                        ? +formik?.values?.onewayrounddriverallowancestage11
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst1
                        ? +formik?.values?.onewayroundsgstsgst1
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst1
                        ? +formik?.values?.onewayroundigstigst1
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst1
                        ? +formik?.values?.onewayroundcgstcgst1
                        : "",
                    },
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (premiumtype === "Premium4") {
          setLoading(true);
          dispatch(
            defaultPremiumFourEditAction(
              { id: id },
              {
                password: values?.password,
                premium_type: premiumtype,
                booking_type: bookingType,
                pricing_module: moduleType,
                trip_fare_after_coupon: {
                  DriverCommissionStage1: formik?.values?.tripfarestage1
                    ? +formik?.values?.tripfarestage1
                    : "",
                  DriverCommissionStage2: formik?.values?.tripfarestage2
                    ? +formik?.values?.tripfarestage2
                    : "",
                  DriverCommissionStage3: formik?.values?.tripfarestage3
                    ? +formik?.values?.tripfarestage3
                    : "",
                  ComrideCommissionStage1: formik?.values?.tripfarecomridestage1
                    ? +formik?.values?.tripfarecomridestage1
                    : "",
                  ComrideCommissionStage2: formik?.values?.tripfarecomridestage2
                    ? +formik?.values?.tripfarecomridestage2
                    : "",
                  ComrideCommissionStage3: formik?.values?.tripfarecomridestage3
                    ? +formik?.values?.tripfarecomridestage3
                    : "",
                },
                sgst: {
                  RTSGST: formik?.values?.sgstsgst
                    ? +formik?.values?.sgstsgst
                    : "",
                  CTSGST: formik?.values?.sgstcomridesgst
                    ? +formik?.values?.sgstcomridesgst
                    : "",
                },
                cgst: {
                  RTCGST: formik?.values?.cgstcgst
                    ? +formik?.values?.cgstcgst
                    : "",
                  CTCGST: formik?.values?.cgstcomridecgst
                    ? +formik?.values?.cgstcomridecgst
                    : "",
                },
                igst: {
                  RTIGST: formik?.values?.igstigst
                    ? +formik?.values?.igstigst
                    : "",
                  CTIGST: formik?.values?.igstcomrideigst
                    ? +formik?.values?.igstcomrideigst
                    : "",
                },
                booking_fee: {
                  ComrideCommissionStage1: formik?.values
                    ?.bookingfeecomridestage1
                    ? +formik?.values?.bookingfeecomridestage1
                    : "",
                  ComrideCommissionStage2: formik?.values
                    ?.bookingfeecomridestage2
                    ? +formik?.values?.bookingfeecomridestage2
                    : "",
                  ComrideCommissionStage3: formik?.values
                    ?.bookingfeecomridestage3
                    ? +formik?.values?.bookingfeecomridestage3
                    : "",
                },
                b_sgst: {
                  CTSGST: formik?.values?.sgstcomridesecondsgst
                    ? +formik?.values?.sgstcomridesecondsgst
                    : "",
                },
                b_igst: {
                  CTIGST: formik?.values?.cgstcomridesecondcgst
                    ? +formik?.values?.cgstcomridesecondcgst
                    : "",
                },
                b_cgst: {
                  CTCGST: formik?.values?.igstcomridesecondigst
                    ? +formik?.values?.igstcomridesecondigst
                    : "",
                },
                ...(bookingType === "LocalTrip"
                  ? {
                    toll_fee: {
                      DriverCommissionStage1: formik?.values?.localtollsstage1
                        ? +formik?.values?.localtollsstage1
                        : "",
                      DriverCommissionStage2: formik?.values?.localtollsstage2
                        ? +formik?.values?.localtollsstage2
                        : "",
                      DriverCommissionStage3: formik?.values?.localtollsstage3
                        ? +formik?.values?.localtollsstage3
                        : "",
                    },
                    parking_fee: {
                      DriverCommissionStage1: formik?.values
                        ?.localparkingstage1
                        ? +formik?.values?.localparkingstage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.localparkingstage2
                        ? +formik?.values?.localparkingstage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.localparkingstage3
                        ? +formik?.values?.localparkingstage3
                        : "",
                    },
                    transport_hub_fee: {
                      DriverCommissionStage1: formik?.values
                        ?.localtransportstage1
                        ? +formik?.values?.localtransportstage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.localtransportstage2
                        ? +formik?.values?.localtransportstage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.localtransportstage3
                        ? +formik?.values?.localtransportstage3
                        : "",
                    },
                    tips: {
                      DriverCommissionStage1: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                      DriverCommissionStage2: formik?.values?.localtipsstage2
                        ? +formik?.values?.localtipsstage2
                        : "",
                      DriverCommissionStage3: formik?.values?.localtipsstage3
                        ? +formik?.values?.localtipsstage3
                        : "",
                    },
                  }
                  : null),

                ...(bookingType === "OneWayOutstation"
                  ? {
                    // trip_fare: {
                    //   DriverCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarestage1
                    //     ? +formik?.values?.onewayroundtripfarestage1
                    //     : "",
                    //   DriverCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarestage2
                    //     ? +formik?.values?.onewayroundtripfarestage2
                    //     : "",
                    //   DriverCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarestage3
                    //     ? +formik?.values?.onewayroundtripfarestage3
                    //     : "",
                    //   ComrideCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarecomridestage1
                    //     ? +formik?.values?.onewayroundtripfarecomridestage1
                    //     : "",
                    //   ComrideCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarecomridestage2
                    //     ? +formik?.values?.onewayroundtripfarecomridestage2
                    //     : "",
                    //   ComrideCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarecomridestage3
                    //     ? +formik?.values?.onewayroundtripfarecomridestage3
                    //     : "",
                    //   RTSGST: formik?.values?.onewayroundtripfaresgst
                    //     ? +formik?.values?.onewayroundtripfaresgst
                    //     : "",
                    //   CTSGST: formik?.values?.onewayroundtripfarecomridesgst
                    //     ? +formik?.values?.onewayroundtripfarecomridesgst
                    //     : "",
                    //   RTCGST: formik?.values?.onewayroundtripfarecgst
                    //     ? +formik?.values?.onewayroundtripfarecgst
                    //     : "",
                    //   CTCGST: formik?.values?.onewayroundtripfarecomridecgst
                    //     ? +formik?.values?.onewayroundtripfarecomridecgst
                    //     : "",
                    //   RTIGST: formik?.values?.onewayroundtripfareigst
                    //     ? +formik?.values?.onewayroundtripfareigst
                    //     : "",
                    //   CTIGST: formik?.values?.onewayroundtripfarecomrideigst
                    //     ? +formik?.values?.onewayroundtripfarecomrideigst
                    //     : "",
                    // },
                    night_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundnightallowancestage1
                        ? +formik?.values?.onewayroundnightallowancestage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundnightallowancestage2
                        ? +formik?.values?.onewayroundnightallowancestage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundnightallowancestage3
                        ? +formik?.values?.onewayroundnightallowancestage3
                        : "",
                    },
                    driver_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayrounddriverallowancestage1
                        ? +formik?.values?.onewayrounddriverallowancestage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayrounddriverallowancestage2
                        ? +formik?.values?.onewayrounddriverallowancestage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayrounddriverallowancestage3
                        ? +formik?.values?.onewayrounddriverallowancestage3
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst
                        ? +formik?.values?.onewayroundsgstsgst
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst
                        ? +formik?.values?.onewayroundigstigst
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst
                        ? +formik?.values?.onewayroundcgstcgst
                        : "",
                    },
                    tips: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundtipsstage1
                        ? +formik?.values?.onewayroundtipsstage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundtipsstage2
                        ? +formik?.values?.onewayroundtipsstage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundtipsstage3
                        ? +formik?.values?.onewayroundtipsstage3
                        : "",
                    },
                  }
                  : null),

                ...(bookingType === "RoundTripOutstation"
                  ? {
                    // trip_fare: {
                    //   DriverCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarestage11
                    //     ? +formik?.values?.onewayroundtripfarestage11
                    //     : "",
                    //   DriverCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarestage21
                    //     ? +formik?.values?.onewayroundtripfarestage21
                    //     : "",
                    //   DriverCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarestage31
                    //     ? +formik?.values?.onewayroundtripfarestage31
                    //     : "",
                    //   ComrideCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarecomridestage11
                    //     ? +formik?.values?.onewayroundtripfarecomridestage11
                    //     : "",
                    //   ComrideCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarecomridestage21
                    //     ? +formik?.values?.onewayroundtripfarecomridestage21
                    //     : "",
                    //   ComrideCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarecomridestage31
                    //     ? +formik?.values?.onewayroundtripfarecomridestage31
                    //     : "",
                    //   RTSGST: formik?.values?.onewayroundtripfaresgst1
                    //     ? +formik?.values?.onewayroundtripfaresgst1
                    //     : "",
                    //   CTSGST: formik?.values?.onewayroundtripfarecomridesgst1
                    //     ? +formik?.values?.onewayroundtripfarecomridesgst1
                    //     : "",
                    //   RTCGST: formik?.values?.onewayroundtripfarecgst1
                    //     ? +formik?.values?.onewayroundtripfarecgst1
                    //     : "",
                    //   CTCGST: formik?.values?.onewayroundtripfarecomridecgst1
                    //     ? +formik?.values?.onewayroundtripfarecomridecgst1
                    //     : "",
                    //   RTIGST: formik?.values?.onewayroundtripfareigst1
                    //     ? +formik?.values?.onewayroundtripfareigst1
                    //     : "",
                    //   CTIGST: formik?.values?.onewayroundtripfarecomrideigst1
                    //     ? +formik?.values?.onewayroundtripfarecomrideigst1
                    //     : "",
                    // },
                    night_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundnightallowancestage11
                        ? +formik?.values?.onewayroundnightallowancestage11
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundnightallowancestage21
                        ? +formik?.values?.onewayroundnightallowancestage21
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundnightallowancestage3
                        ? +formik?.values?.onewayroundnightallowancestage3
                        : "",
                    },
                    driver_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayrounddriverallowancestage1
                        ? +formik?.values?.onewayrounddriverallowancestage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayrounddriverallowancestage2
                        ? +formik?.values?.onewayrounddriverallowancestage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayrounddriverallowancestage31
                        ? +formik?.values?.onewayrounddriverallowancestage31
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst1
                        ? +formik?.values?.onewayroundsgstsgst1
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst1
                        ? +formik?.values?.onewayroundigstigst1
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst1
                        ? +formik?.values?.onewayroundcgstcgst1
                        : "",
                    },
                    tips: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundtipsstage11
                        ? +formik?.values?.onewayroundtipsstage11
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundtipsstage21
                        ? +formik?.values?.onewayroundtipsstage21
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundtipsstage31
                        ? +formik?.values?.onewayroundtipsstage31
                        : "",
                    },
                  }
                  : null),
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (managePremiumType === "managePremium") {
        if (
          premiumtype === "Premium1" ||
          premiumtype === "Premium2" ||
          premiumtype === "Premium3" ||
          premiumtype === "Premium5"
        ) {
          setLoading(true);
          dispatch(
            managePremium1235EditAction(
              { id: id },
              {
                ...defaultData,

                ...(bookingType === "LocalTrip"
                  ? {
                    toll_fee: {
                      DriverCommission: formik?.values?.localtollsstage1
                        ? +formik?.values?.localtollsstage1
                        : "",
                    },
                    parking_fee: {
                      DriverCommission: formik?.values?.localparkingstage1
                        ? +formik?.values?.localparkingstage1
                        : "",
                    },
                    transport_hub_fee: {
                      DriverCommission: formik?.values?.localtransportstage1
                        ? +formik?.values?.localtransportstage1
                        : "",
                    },
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),
                ...(bookingType === "RentalTrip"
                  ? {
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),

                ...(bookingType === "OneWayOutstation"
                  ? {
                    night_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayroundnightallowancestage1
                        ? +formik?.values?.onewayroundnightallowancestage1
                        : "",
                    },
                    driver_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayrounddriverallowancestage1
                        ? +formik?.values?.onewayrounddriverallowancestage1
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst
                        ? +formik?.values?.onewayroundsgstsgst
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst
                        ? +formik?.values?.onewayroundigstigst
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst
                        ? +formik?.values?.onewayroundcgstcgst
                        : "",
                    },
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),
                ...(bookingType === "RoundTripOutstation"
                  ? {
                    night_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayroundnightallowancestage11
                        ? +formik?.values?.onewayroundnightallowancestage11
                        : "",
                    },
                    driver_allowance: {
                      DriverCommission: formik?.values
                        ?.onewayrounddriverallowancestage11
                        ? +formik?.values?.onewayrounddriverallowancestage11
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst1
                        ? +formik?.values?.onewayroundsgstsgst1
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst1
                        ? +formik?.values?.onewayroundigstigst1
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst1
                        ? +formik?.values?.onewayroundcgstcgst1
                        : "",
                    },
                    tips: {
                      DriverCommission: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                    },
                  }
                  : null),
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (premiumtype === "Premium4") {
          setLoading(true);
          dispatch(
            managePremiumFourEditAction(
              { id: id },
              {
                password: values?.password,
                premium_type: premiumtype,
                booking_type: bookingType,
                pricing_module: moduleType,
                trip_fare_after_coupon: {
                  DriverCommissionStage1: formik?.values?.tripfarestage1
                    ? +formik?.values?.tripfarestage1
                    : "",
                  DriverCommissionStage2: formik?.values?.tripfarestage2
                    ? +formik?.values?.tripfarestage2
                    : "",
                  DriverCommissionStage3: formik?.values?.tripfarestage3
                    ? +formik?.values?.tripfarestage3
                    : "",
                  ComrideCommissionStage1: formik?.values?.tripfarecomridestage1
                    ? +formik?.values?.tripfarecomridestage1
                    : "",
                  ComrideCommissionStage2: formik?.values?.tripfarecomridestage2
                    ? +formik?.values?.tripfarecomridestage2
                    : "",
                  ComrideCommissionStage3: formik?.values?.tripfarecomridestage3
                    ? +formik?.values?.tripfarecomridestage3
                    : "",
                },
                sgst: {
                  RTSGST: formik?.values?.sgstsgst
                    ? +formik?.values?.sgstsgst
                    : "",
                  CTSGST: formik?.values?.sgstcomridesgst
                    ? +formik?.values?.sgstcomridesgst
                    : "",
                },
                cgst: {
                  RTCGST: formik?.values?.cgstcgst
                    ? +formik?.values?.cgstcgst
                    : "",
                  CTCGST: formik?.values?.cgstcomridecgst
                    ? +formik?.values?.cgstcomridecgst
                    : "",
                },
                igst: {
                  RTIGST: formik?.values?.igstigst
                    ? +formik?.values?.igstigst
                    : "",
                  CTIGST: formik?.values?.igstcomrideigst
                    ? +formik?.values?.igstcomrideigst
                    : "",
                },
                booking_fee: {
                  ComrideCommissionStage1: formik?.values
                    ?.bookingfeecomridestage1
                    ? +formik?.values?.bookingfeecomridestage1
                    : "",
                  ComrideCommissionStage2: formik?.values
                    ?.bookingfeecomridestage2
                    ? +formik?.values?.bookingfeecomridestage2
                    : "",
                  ComrideCommissionStage3: formik?.values
                    ?.bookingfeecomridestage3
                    ? +formik?.values?.bookingfeecomridestage3
                    : "",
                },
                b_sgst: {
                  CTSGST: formik?.values?.sgstcomridesecondsgst
                    ? +formik?.values?.sgstcomridesecondsgst
                    : "",
                },
                b_igst: {
                  CTIGST: formik?.values?.cgstcomridesecondcgst
                    ? +formik?.values?.cgstcomridesecondcgst
                    : "",
                },
                b_cgst: {
                  CTCGST: formik?.values?.igstcomridesecondigst
                    ? +formik?.values?.igstcomridesecondigst
                    : "",
                },
                ...(bookingType === "LocalTrip"
                  ? {
                    toll_fee: {
                      DriverCommissionStage1: formik?.values?.localtollsstage1
                        ? +formik?.values?.localtollsstage1
                        : "",
                      DriverCommissionStage2: formik?.values?.localtollsstage2
                        ? +formik?.values?.localtollsstage2
                        : "",
                      DriverCommissionStage3: formik?.values?.localtollsstage3
                        ? +formik?.values?.localtollsstage3
                        : "",
                    },
                    parking_fee: {
                      DriverCommissionStage1: formik?.values
                        ?.localparkingstage1
                        ? +formik?.values?.localparkingstage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.localparkingstage2
                        ? +formik?.values?.localparkingstage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.localparkingstage3
                        ? +formik?.values?.localparkingstage3
                        : "",
                    },
                    transport_hub_fee: {
                      DriverCommissionStage1: formik?.values
                        ?.localtransportstage1
                        ? +formik?.values?.localtransportstage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.localtransportstage2
                        ? +formik?.values?.localtransportstage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.localtransportstage3
                        ? +formik?.values?.localtransportstage3
                        : "",
                    },
                    tips: {
                      DriverCommissionStage1: formik?.values?.localtipsstage1
                        ? +formik?.values?.localtipsstage1
                        : "",
                      DriverCommissionStage2: formik?.values?.localtipsstage2
                        ? +formik?.values?.localtipsstage2
                        : "",
                      DriverCommissionStage3: formik?.values?.localtipsstage3
                        ? +formik?.values?.localtipsstage3
                        : "",
                    },
                  }
                  : null),

                ...(bookingType === "OneWayOutstation"
                  ? {
                    // trip_fare: {
                    //   DriverCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarestage1
                    //     ? +formik?.values?.onewayroundtripfarestage1
                    //     : "",
                    //   DriverCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarestage2
                    //     ? +formik?.values?.onewayroundtripfarestage2
                    //     : "",
                    //   DriverCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarestage3
                    //     ? +formik?.values?.onewayroundtripfarestage3
                    //     : "",
                    //   ComrideCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarecomridestage1
                    //     ? +formik?.values?.onewayroundtripfarecomridestage1
                    //     : "",
                    //   ComrideCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarecomridestage2
                    //     ? +formik?.values?.onewayroundtripfarecomridestage2
                    //     : "",
                    //   ComrideCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarecomridestage3
                    //     ? +formik?.values?.onewayroundtripfarecomridestage3
                    //     : "",
                    //   RTSGST: formik?.values?.onewayroundtripfaresgst
                    //     ? +formik?.values?.onewayroundtripfaresgst
                    //     : "",
                    //   CTSGST: formik?.values?.onewayroundtripfarecomridesgst
                    //     ? +formik?.values?.onewayroundtripfarecomridesgst
                    //     : "",
                    //   RTCGST: formik?.values?.onewayroundtripfarecgst
                    //     ? +formik?.values?.onewayroundtripfarecgst
                    //     : "",
                    //   CTCGST: formik?.values?.onewayroundtripfarecomridecgst
                    //     ? +formik?.values?.onewayroundtripfarecomridecgst
                    //     : "",
                    //   RTIGST: formik?.values?.onewayroundtripfareigst
                    //     ? +formik?.values?.onewayroundtripfareigst
                    //     : "",
                    //   CTIGST: formik?.values?.onewayroundtripfarecomrideigst
                    //     ? +formik?.values?.onewayroundtripfarecomrideigst
                    //     : "",
                    // },
                    night_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundnightallowancestage1
                        ? +formik?.values?.onewayroundnightallowancestage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundnightallowancestage2
                        ? +formik?.values?.onewayroundnightallowancestage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundnightallowancestage3
                        ? +formik?.values?.onewayroundnightallowancestage3
                        : "",
                    },
                    driver_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayrounddriverallowancestage1
                        ? +formik?.values?.onewayrounddriverallowancestage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayrounddriverallowancestage2
                        ? +formik?.values?.onewayrounddriverallowancestage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayrounddriverallowancestage3
                        ? +formik?.values?.onewayrounddriverallowancestage3
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst
                        ? +formik?.values?.onewayroundsgstsgst
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst
                        ? +formik?.values?.onewayroundigstigst
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst
                        ? +formik?.values?.onewayroundcgstcgst
                        : "",
                    },
                    tips: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundtipsstage1
                        ? +formik?.values?.onewayroundtipsstage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundtipsstage2
                        ? +formik?.values?.onewayroundtipsstage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundtipsstage3
                        ? +formik?.values?.onewayroundtipsstage3
                        : "",
                    },
                  }
                  : null),

                ...(bookingType === "RoundTripOutstation"
                  ? {
                    // trip_fare: {
                    //   DriverCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarestage11
                    //     ? +formik?.values?.onewayroundtripfarestage11
                    //     : "",
                    //   DriverCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarestage21
                    //     ? +formik?.values?.onewayroundtripfarestage21
                    //     : "",
                    //   DriverCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarestage31
                    //     ? +formik?.values?.onewayroundtripfarestage31
                    //     : "",
                    //   ComrideCommissionStage1: formik?.values
                    //     ?.onewayroundtripfarecomridestage11
                    //     ? +formik?.values?.onewayroundtripfarecomridestage11
                    //     : "",
                    //   ComrideCommissionStage2: formik?.values
                    //     ?.onewayroundtripfarecomridestage21
                    //     ? +formik?.values?.onewayroundtripfarecomridestage21
                    //     : "",
                    //   ComrideCommissionStage3: formik?.values
                    //     ?.onewayroundtripfarecomridestage31
                    //     ? +formik?.values?.onewayroundtripfarecomridestage31
                    //     : "",
                    //   RTSGST: formik?.values?.onewayroundtripfaresgst1
                    //     ? +formik?.values?.onewayroundtripfaresgst1
                    //     : "",
                    //   CTSGST: formik?.values?.onewayroundtripfarecomridesgst1
                    //     ? +formik?.values?.onewayroundtripfarecomridesgst1
                    //     : "",
                    //   RTCGST: formik?.values?.onewayroundtripfarecgst1
                    //     ? +formik?.values?.onewayroundtripfarecgst1
                    //     : "",
                    //   CTCGST: formik?.values?.onewayroundtripfarecomridecgst1
                    //     ? +formik?.values?.onewayroundtripfarecomridecgst1
                    //     : "",
                    //   RTIGST: formik?.values?.onewayroundtripfareigst1
                    //     ? +formik?.values?.onewayroundtripfareigst1
                    //     : "",
                    //   CTIGST: formik?.values?.onewayroundtripfarecomrideigst1
                    //     ? +formik?.values?.onewayroundtripfarecomrideigst1
                    //     : "",
                    // },
                    night_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundnightallowancestage11
                        ? +formik?.values?.onewayroundnightallowancestage11
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundnightallowancestage21
                        ? +formik?.values?.onewayroundnightallowancestage21
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundnightallowancestage3
                        ? +formik?.values?.onewayroundnightallowancestage3
                        : "",
                    },
                    driver_allowance: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayrounddriverallowancestage1
                        ? +formik?.values?.onewayrounddriverallowancestage1
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayrounddriverallowancestage2
                        ? +formik?.values?.onewayrounddriverallowancestage2
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayrounddriverallowancestage31
                        ? +formik?.values?.onewayrounddriverallowancestage31
                        : "",
                    },
                    n_sgst: {
                      RTSGST: formik?.values?.onewayroundsgstsgst1
                        ? +formik?.values?.onewayroundsgstsgst1
                        : "",
                    },
                    n_igst: {
                      RTIGST: formik?.values?.onewayroundigstigst1
                        ? +formik?.values?.onewayroundigstigst1
                        : "",
                    },
                    n_cgst: {
                      RTCGST: formik?.values?.onewayroundcgstcgst1
                        ? +formik?.values?.onewayroundcgstcgst1
                        : "",
                    },
                    tips: {
                      DriverCommissionStage1: formik?.values
                        ?.onewayroundtipsstage11
                        ? +formik?.values?.onewayroundtipsstage11
                        : "",
                      DriverCommissionStage2: formik?.values
                        ?.onewayroundtipsstage21
                        ? +formik?.values?.onewayroundtipsstage21
                        : "",
                      DriverCommissionStage3: formik?.values
                        ?.onewayroundtipsstage31
                        ? +formik?.values?.onewayroundtipsstage31
                        : "",
                    },
                  }
                  : null),
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      }
    },
  });

  const onEditSuccess = (data) => {
    setLoading(false);
    handlePremiumPWClose();
    handleSuccessMessageShow();
    setReload(!reload);
    console.log(data, "askjjdbakjsd");
  };

  const onEditError = (data) => {
    setLoading(false);
    console.log(data, "askjjdbakjsd");
    errorToast(data?.data?.data ?? data?.data?.message);
    setError(data?.data?.data ?? data?.data?.message);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title="Changes made Successfully"
      />
      <Modal
        centered
        show={premiumPasswordModal}
        onHide={handlePremiumPWClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-0">
                <span className="primary_color">{title}</span>
              </div>
              <div className="mt-3">
                <PasswordInputField
                  itemName={"password"}
                  inputValue={formikCreatePass.values.password}
                  onChangeFn={(e) => {
                    formikCreatePass.handleChange(e);
                  }}
                  onBlurFn={formikCreatePass.handleBlur}
                  formikError={formikCreatePass.errors.password}
                  formikTouched={formikCreatePass.touched.password}
                  error={error}
                />
                <div className="red_color fw_500 ms-5">{error ?? null}</div>
              </div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    setError(false);
                    handlePremiumPWClose();
                    formikCreatePass.resetForm();
                  }}
                />

                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-2 py-1 border_none"
                >
                  <span className=" fs_18 white_color px-3">
                    {loading ? <SpinnerLoading /> : `Confirm`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PremiumPasswordModal;
