import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInputField from "../form/passwordInputField";
import Cancelbtn from "../utilits/buttons/cancelbtn";
import SuccessMessagemodal from "../modals/successMessageModal";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import successToast from "../utilits/successToast";
import {
  EditLocalDefaultfareAction,
  EditOneWayTripfareAction,
  EditOnewayPackageDetailsAction,
  EditRentalFareAction,
  EditRoundTripPackageDetailsAction,
  EditRoundTripfareAction,
  EditSpecialZonefareAction,
  EditTollsfareAction,
} from "../../redux/actions/defaultFareAction";
import SpinnerLoading from "../utilits/spinnerLoading";
import {
  FaresLocalUpdatepricingDetailsAction,
  FaresLocalUpdatepricingModuleAction,
  FaresOneWaytripEditAction,
  FaresOneWaytripPackageEditAction,
  FaresRentalEditAction,
  FaresRoundTripEditAction,
  FaresRoundTripPackageEditAction,
  FaresSpecialZonesEditAction,
} from "../../redux/actions/manageFaresAction";

function LocalTripUpdatePassword({
  changesUpdateshow,
  formik,
  handleChangeUpdateClose,
  setReload,
  reload,
  mainType,
  item,
  setEditingStatus,
  tableType,
  subZoneId,
  mainZoneId,
}) {
  console.log(mainType, "jadgajsd");
  console.log(tableType, "jadgajsd");
  console.log(item, "jadgajsd");
  console.log(mainZoneId, "jadgajsd");
  console.log(subZoneId, "jadgajsd");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const formikUpdatePass = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      if (mainType === "localDefaultFare") {
        if (tableType === "priceModule1") {
          setLoading(true);
          dispatch(
            EditLocalDefaultfareAction(
              {
                fare_zone: "Local",
                pricing_module: item?.pricing_module,
                ride_type: item?.ride_type,
                password: values?.ConfirmPassword,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_min_fare: +formik?.values?.per_min_fare,
                waiting_fee: +formik?.values?.waiting_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "priceModule2") {
          setLoading(true);
          dispatch(
            EditLocalDefaultfareAction(
              {
                fare_zone: "Local",
                pricing_module: item?.pricing_module,
                ride_type: item?.ride_type,
                password: values?.ConfirmPassword,
                base_fare: +formik?.values?.base_fare,
                base_km: +formik?.values?.base_km,
                per_km_fare: +formik?.values?.per_km_fare,
                per_min_fare: +formik?.values?.per_min_fare,
                waiting_fee: +formik?.values?.waiting_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (mainType === "specialZoneDefaultFare") {
        setLoading(true);
        dispatch(
          EditSpecialZonefareAction(
            {
              fare_zone: "SpecialZone",
              km_range: tableType,
              password: values?.ConfirmPassword,
              ride_type: item?.ride_type,
              base_fare: +formik?.values?.base_fare,
              per_km_fare: +formik?.values?.per_km_fare,
              per_min_fare: +formik?.values?.per_min_fare,
              waiting_fee: +formik?.values?.waiting_fee,
              cancellation_fee: +formik?.values?.cancellation_fee,
            },
            onEditSuccess,
            onEditError
          )
        );
      } else if (mainType === "RentalDefaultFare") {
        setLoading(true);
        dispatch(
          EditRentalFareAction(
            {
              fare_zone: "Rental",
              password: values?.ConfirmPassword,
              ride_type: item?.ride_type,
              package_time: item?.package_time,
              package_km: +formik?.values?.package_km,
              base_fare: +formik?.values?.base_fare,
              per_extra_km_fare: +formik?.values?.per_extra_km_fare,
              per_extra_time_fare: +formik?.values?.per_extra_time_fare,
              waiting_fee: +formik?.values?.waiting_fee,
              cancellation_fee: +formik?.values?.cancellation_fee,
            },

            onEditSuccess,
            onEditError
          )
        );
      } else if (mainType === "oneWayDefaultFare") {
        if (tableType === "priceModule1") {
          setLoading(true);
          dispatch(
            EditOneWayTripfareAction(
              {
                fare_zone: "OneWayOutstation",
                pricing_module: item?.pricing_module,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_min_fare: +formik?.values?.per_min_fare,
                per_extra_km_fare: +formik?.values?.per_extra_km_fare,
                per_extra_time_fare: +formik?.values?.per_extra_time_fare,
                night_allowance: +formik?.values?.night_allowance,
                driver_allowance: +formik?.values?.driver_allowance,
                waiting_fee: +formik?.values?.waiting_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "priceModule2") {
          setLoading(true);
          dispatch(
            EditOneWayTripfareAction(
              {
                fare_zone: "OneWayOutstation",
                pricing_module: item?.pricing_module,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_min_fare: +formik?.values?.per_min_fare,
                per_extra_km_fare: +formik?.values?.per_extra_km_fare,
                per_extra_time_fare: +formik?.values?.per_extra_time_fare,
                night_allowance: +formik?.values?.night_allowance,
                driver_allowance: +formik?.values?.driver_allowance,
                waiting_fee: +formik?.values?.waiting_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
                remaining_time_fare: +formik?.values?.remaining_time_fare,
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (
          tableType === "packageDeatils1" ||
          tableType === "packageDeatils2"
        ) {
          setLoading(true);
          dispatch(
            EditOnewayPackageDetailsAction(
              {
                fare_zone: "OneWayOutstation",
                pricing_module: item?.pricing_module,
                password: values?.ConfirmPassword,
                min_package_distance: +formik?.values?.min_package_distance,
                min_package_time: +formik?.values?.min_package_time,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (mainType === "RoundTripDefaultFare") {
        if (tableType === "RoundTripTable") {
          setLoading(true);
          dispatch(
            EditRoundTripfareAction(
              {
                fare_zone: "RoundTripOutstation",
                ride_type: item?.ride_type,
                password: values?.ConfirmPassword,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_extra_km_fare: +formik?.values?.per_extra_km_fare,
                per_extra_time_fare: +formik?.values?.per_extra_time_fare,
                night_allowance: +formik?.values?.night_allowance,
                driver_allowance: +formik?.values?.driver_allowance,
                waiting_fee: +formik?.values?.waiting_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
              },

              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "RoundTripPackageTable") {
          setLoading(true);
          dispatch(
            EditRoundTripPackageDetailsAction(
              {
                fare_zone: "RoundTripOutstation",
                min_package_distance: +formik?.values?.min_package_distance,
                password: values?.ConfirmPassword,
                min_package_time: +formik?.values?.min_package_time,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (mainType === "TollDefaultFare") {
        setLoading(true);
        dispatch(
          EditTollsfareAction(
            {
              fare_zone: "Tolls",
              password: values?.ConfirmPassword,
              ride_type: item?.ride_type,
              toll_fare: +formik?.values?.toll_fare,
            },
            onEditSuccess,
            onEditError
          )
        );
      } else if (mainType === "LocalManageFare") {
        if (tableType === "PriceModule1") {
          setLoading(true);
          dispatch(
            FaresLocalUpdatepricingDetailsAction(
              {
                local_zone_id: subZoneId,
                pricing_module: tableType,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_min_fare: +formik?.values?.per_min_fare,
                waiting_fee: +formik?.values?.waiting_fee,
                parking_fee: +formik?.values?.parking_fee,
                booking_fee: +formik?.values?.booking_fee,
                transport_hub_fee: +formik?.values?.transport_hub_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "PriceModule2") {
          setLoading(true);
          dispatch(
            FaresLocalUpdatepricingDetailsAction(
              {
                local_zone_id: subZoneId,
                pricing_module: tableType,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                base_km: +formik?.values?.base_km,
                per_km_fare: +formik?.values?.per_km_fare,
                per_min_fare: +formik?.values?.per_min_fare,
                waiting_fee: +formik?.values?.waiting_fee,
                parking_fee: +formik?.values?.parking_fee,
                booking_fee: +formik?.values?.booking_fee,
                transport_hub_fee: +formik?.values?.transport_hub_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "ModuleChangeTable") {
          setLoading(true);
          dispatch(
            FaresLocalUpdatepricingModuleAction(
              {
                main_zone_id: mainZoneId,
                local_zone_id: subZoneId,
                pricing_module: formik?.values?.priceModule,
                password: values?.ConfirmPassword,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (mainType === "specialZoneManageFare") {
        setLoading(true);
        dispatch(
          FaresSpecialZonesEditAction(
            {
              main_zone_id: mainZoneId,
              special_zone_id: subZoneId,
              password: values?.ConfirmPassword,
              km_range: item?.km_range,
              ride_type: item?.ride_type,
              base_fare: +formik?.values?.base_fare,
              booking_fee: +formik?.values?.booking_fee,
              parking_fee: +formik?.values?.parking_fee,
              per_km_fare: +formik?.values?.per_km_fare,
              waiting_fee: +formik?.values?.waiting_fee,
              per_min_fare: +formik?.values?.per_min_fare,
              cancellation_fee: +formik?.values?.cancellation_fee,
              transport_hub_fee: +formik?.values?.transport_hub_fee,
            },
            onEditSuccess,
            onEditError
          )
        );
      } else if (mainType === "RentalManageFare") {
        setLoading(true);
        dispatch(
          FaresRentalEditAction(
            {
              main_zone_id: mainZoneId,
              ride_type: item?.ride_type,
              package_time: +formik?.values?.package_time,
              base_fare: +formik?.values?.base_fare,
              package_km: +formik?.values?.package_km,
              per_extra_km_fare: +formik?.values?.per_extra_km_fare,
              per_extra_time_fare: +formik?.values?.per_extra_time_fare,
              waiting_fee: +formik?.values?.waiting_fee,
              booking_fee: +formik?.values?.booking_fee,
              cancellation_fee: +formik?.values?.cancellation_fee,
              password: values?.ConfirmPassword,
            },

            onEditSuccess,
            onEditError
          )
        );
      } else if (mainType === "OneWayManageFare") {
        if (tableType === "ModuleChangeTable") {
          setLoading(true);
          dispatch(
            FaresOneWaytripPackageEditAction(
              {
                main_zone_id: mainZoneId,
                city_zone_id: subZoneId,
                pricing_module: formik?.values?.priceModule,
                min_package_distance: +formik?.values?.min_package_distance,
                min_package_time: +formik?.values?.min_package_time,
                password: values?.ConfirmPassword,
              },

              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "PriceModule1") {
          setLoading(true);
          dispatch(
            FaresOneWaytripEditAction(
              {
                main_zone_id: mainZoneId,
                city_zone_id: subZoneId,
                pricing_module: tableType,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_extra_km_fare: +formik?.values?.per_extra_km_fare,
                per_extra_time_fare: +formik?.values?.per_extra_time_fare,
                night_allowance: +formik?.values?.night_allowance,
                driver_allowance: +formik?.values?.driver_allowance,
                waiting_fee: +formik?.values?.waiting_fee,
                booking_fee: +formik?.values?.booking_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
                // per_min_fare: +formik?.values?.per_min_fare,
              },
              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "PriceModule2") {
          setLoading(true);
          dispatch(
            FaresOneWaytripEditAction(
              {
                main_zone_id: mainZoneId,
                city_zone_id: subZoneId,
                pricing_module: tableType,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_extra_km_fare: +formik?.values?.per_extra_km_fare,
                per_extra_time_fare: +formik?.values?.per_extra_time_fare,
                night_allowance: +formik?.values?.night_allowance,
                driver_allowance: +formik?.values?.driver_allowance,
                waiting_fee: +formik?.values?.waiting_fee,
                booking_fee: +formik?.values?.booking_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
                remaining_time_fare: +formik?.values?.remaining_time_fare,
              },

              onEditSuccess,
              onEditError
            )
          );
        }
      } else if (mainType === "RoundTripManageFare") {
        if (tableType === "ModuleChangeTable") {
          setLoading(true);
          dispatch(
            FaresRoundTripPackageEditAction(
              {
                main_zone_id: mainZoneId,
                city_zone_id: subZoneId,
                min_package_distance: +formik?.values?.min_package_distance,
                min_package_time: +formik?.values?.min_package_time,
                password: values?.ConfirmPassword,
              },

              onEditSuccess,
              onEditError
            )
          );
        } else if (tableType === "RoundTripManageTable") {
          setLoading(true);
          dispatch(
            FaresRoundTripEditAction(
              {
                main_zone_id: mainZoneId,
                city_zone_id: subZoneId,
                password: values?.ConfirmPassword,
                ride_type: item?.ride_type,
                base_fare: +formik?.values?.base_fare,
                per_km_fare: +formik?.values?.per_km_fare,
                per_extra_km_fare: +formik?.values?.per_extra_km_fare,
                per_extra_time_fare: +formik?.values?.per_extra_time_fare,
                night_allowance: +formik?.values?.night_allowance,
                driver_allowance: +formik?.values?.driver_allowance,
                waiting_fee: +formik?.values?.waiting_fee,
                booking_fee: +formik?.values?.booking_fee,
                cancellation_fee: +formik?.values?.cancellation_fee,
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
    console.log(data, "kashdajk");
    handleSuccessMessageShow();
    handleChangeUpdateClose();
    successToast(data?.data);
    setEditingStatus((prevState) => ({
      ...prevState,
      [tableType]: {
        ...prevState[tableType],
        [item?.package_time ?? item.ride_type]: false,
      },
    }));
  };
  const onEditError = (data) => {
    setLoading(false);
    setReload(false);
    errorToast(data?.data?.data);
    console.log(data, "kashdajk");
    setError(data?.data?.data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made successfully!`}
      />
      <Modal
        centered
        backdrop={"static"}
        keyboard={false}
        show={changesUpdateshow}
        onHide={handleChangeUpdateClose}
        dialogClassName="change_update_password_container"
        contentClassName="change_update_password_card"
        backdropClassName="create_password_modal_backdrop"
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="fs_23 primary_color fw_600">
                  Are you sure you want to make changes?{" "}
                </span>
              </div>
              <PasswordInputField
                itemName={"ConfirmPassword"}
                inputValue={formikUpdatePass.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formikUpdatePass.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formikUpdatePass.handleBlur}
                formikError={formikUpdatePass.errors.ConfirmPassword}
                formikTouched={formikUpdatePass.touched.ConfirmPassword}
                error={error}
              />
              <span className="red_color fw_500 ps-5">{error}</span>
              <div className="d-flex justify-content-between mt-2 mb-3 px-lg-5 px-md-5  px-sm-0">
                <Cancelbtn
                  cancelFn={() => {
                    handleChangeUpdateClose();
                    setLoading(false);
                    setError(false);
                    formikUpdatePass.resetForm();
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px py-1 px-4 border_none"
                  type="sumbit"
                >
                  {loading ? (
                    <SpinnerLoading />
                  ) : (
                    <span className=" fs_18 white_color">Proceed</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>{" "}
    </>
  );
}

export default LocalTripUpdatePassword;
