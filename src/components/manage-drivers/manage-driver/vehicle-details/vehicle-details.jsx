import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alphaNumeric, numRegex } from "../../../helper";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import {
  driverVehicleEditAction,
  manageDriverRideTypeListAction,
} from "../../../../redux/actions/manageDriversAction";
import { useDispatch } from "react-redux";
import VehicleDetailsEdit from "./vehicleDetails";

const VehicleDetails = ({
  vehicleData,
  driverDetails,
  setProfileEditDisabled,
  vehicleDetailsDisabled,
  driverData,
  setDriverData,
  type,
  setIs_approve,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dropDownValue, setDropDownValue] = useState([]);

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [dropDowRideType, setDropDownRideType] = useState(false);

  useEffect(() => {
    driverDetails?.vehicle_details?.booking_type != null &&
      setDropDownValue(driverDetails?.vehicle_details?.booking_type);
  }, [driverDetails?.vehicle_details?.booking_type]);

  const [selectedRideType, setSelectedRideType] = useState(
    driverDetails?.vehicle_details?.ride_type_applicable
  );

  const [rideTypeOptions, setRideTypeOptions] = useState([]);
  const [filteredRideTypeOption, setFilteredRideTypeOption] = useState([]);
  const [rideTypeList, setRideTypeList] = useState([]);
  useEffect(() => {
    dispatch(
      manageDriverRideTypeListAction(onRideTypeSuccess, onRideTypeError)
    );
  }, []);

  const onRideTypeSuccess = (data) => {
    setRideTypeList(data?.data);
  };

  const onRideTypeError = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (rideTypeList) {
      const rideTypeOptions = Object.values(rideTypeList)?.map((item) => {
        return { value: item.id, label: item.ride_type };
      });
      setRideTypeOptions(rideTypeOptions);
    }
  }, [rideTypeList]);

  useEffect(() => {
    const filteredRideType = rideTypeList.filter((item) => {
      return item.applicable_zone_permission.some((permission) => {
        return (
          permission.zone_id === driverDetails?.registered_zone &&
          permission.documentation_availablity === true
        );
      });
    });

    const filterRideType = Object.values(filteredRideType)?.map((item) => {
      return { value: item.id, label: item.ride_type };
    });
    setFilteredRideTypeOption(filterRideType);
  }, [driverDetails?.registered_zone, rideTypeList]);

  console.log(filteredRideTypeOption, "sdfsfsgdf");

  const [vehicleEditable, setVehicleEditable] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setDriverData(!driverData);
  };
  const handleSuccessMessageShow = () => {
    setSuccessMessageShow(true);
  };

  const vehicleFormikField = useFormik({
    enableReinitialize: true,
    initialValues: {
      vehicleMake: driverDetails?.vehicle_details?.vehicle_make
        ? driverDetails?.vehicle_details?.vehicle_make
        : "",
      vehicleModel: driverDetails?.vehicle_details?.vehicle_model
        ? driverDetails?.vehicle_details?.vehicle_model
        : "",
      vehicleRegistrationYear: driverDetails?.vehicle_details
        ?.vehicle_registration_year
        ? driverDetails?.vehicle_details?.vehicle_registration_year
        : "",
      vehicleColor: driverDetails?.vehicle_details?.vehicle_colour
        ? driverDetails?.vehicle_details?.vehicle_colour
        : "",
      vehicleFuel: driverDetails?.vehicle_details?.vehicle_fuel
        ? driverDetails?.vehicle_details?.vehicle_fuel
        : "",
      vehicleRegistrationNo: driverDetails?.vehicle_details
        ?.vehicle_registration_number
        ? driverDetails?.vehicle_details?.vehicle_registration_number
        : "",
      acNonAc: driverDetails?.vehicle_details?.ac
        ? driverDetails?.vehicle_details?.ac
        : "",
      kmDuringRegistraton: driverDetails?.vehicle_details
        ?.km_during_registration
        ? driverDetails?.vehicle_details?.km_during_registration
        : "",
      fitnessTestPassed: driverDetails?.vehicle_details?.fitness_test_passed
        ? driverDetails?.vehicle_details?.fitness_test_passed
        : "",
      rideType: driverDetails?.vehicle_details?.ride_type_defualt
        ? driverDetails?.vehicle_details?.ride_type_defualt
        : "",
      action: "saveChanged",
      rideTypeApplicable:
        driverDetails?.vehicle_details?.ride_type_applicable ?? [],
      // bookingType: driverDetails?.vehicle_details?.booking_type
      //   ? driverDetails?.vehicle_details?.booking_type
      //   : [],
    },

    validationSchema: Yup.object({
      vehicleMake: Yup.string().required("Required"),
      vehicleModel: Yup.string().required("Required"),
      vehicleRegistrationYear: Yup.string().required("Required"),
      vehicleColor: Yup.string().required("Required"),
      vehicleFuel: Yup.string().required("Required"),
      vehicleRegistrationNo: Yup.string()
        .matches(alphaNumeric, "Invalid Value")
        .required("Required"),
      acNonAc: Yup.string().required("Required"),
      kmDuringRegistraton: Yup.string()
        .matches(numRegex, "Invalid Value")
        .required("Required"),
      fitnessTestPassed: Yup.string().required("Required"),
      rideType: Yup.string().required("Required"),
      // bookingType: Yup.array()
      //   .min(1, "This field requires at least 2 values")
      //   .nullable()
      //   .required("Required"),
      rideTypeApplicable: Yup.array()
        .min(1, "This field requires at least 2 values")
        .nullable()
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        driverVehicleEditAction(
          driverDetails?.id,
          {
            vehicle_make: values.vehicleMake,
            vehicle_model: values.vehicleModel,
            vehicle_registration_year: values.vehicleRegistrationYear,
            vehicle_colour: values.vehicleColor,
            vehicle_fuel: values.vehicleFuel,
            vehicle_registration_number: values.vehicleRegistrationNo,
            ac: values.acNonAc,
            km_during_registration: values.kmDuringRegistraton,
            ride_type_defualt: values.rideType,
            fitness_test_passed: values.fitnessTestPassed,
            // booking_type: values.bookingType,
            ride_type_applicable: values.rideTypeApplicable,
          },
          onSuccess,
          onError
        )
      );
    },
  });

  useEffect(() => {
    const hasEmptyValues = Object.values(vehicleFormikField?.values).some(
      (value) => value === "" || value === null || value === undefined
    );

    if (hasEmptyValues) {
      setIs_approve(true);
    } else {
      setIs_approve(false);
    }
  }, [vehicleFormikField?.values]);

  function ChangeMadeSuccessFull() {
    if (
      JSON.stringify(vehicleFormikField.initialValues) !==
        JSON.stringify(vehicleFormikField.values) ||
      driverDetails?.vehicle_details?.ride_type_applicable !== selectedRideType
    ) {
      handleSuccessMessageShow();
    }
  }

  console.log(driverDetails, "sdasdafdgddad");

  const onSuccess = (data) => {
    setLoading(false);

    if (
      JSON.stringify(vehicleFormikField.initialValues) !==
      JSON.stringify(vehicleFormikField.values)
    ) {
      successToast(data?.data);
    }
    ChangeMadeSuccessFull();
    setVehicleEditable(!vehicleEditable);
    setProfileEditDisabled(false);
  };
  const onError = (data) => {
    console.log(data, "asjakjd");
    setLoading(false);
    setDriverData(false);
    errorToast(data?.data ?? data?.data?.data);
  };

  console.log(
    driverDetails?.vehicle_details?.ride_type_applicable,
    "asdasdadsad"
  );
  console.log(selectedRideType, "asdasdadsad");

  return (
    <div className="mt-1 mb-4">
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made Successfully!`}
      />

      <div className="">
        <VehicleDetailsEdit
          vehicleData={vehicleData}
          formik={vehicleFormikField}
          loading={loading}
          driverDetails={driverDetails}
          vehicleDetailsDisabled={vehicleDetailsDisabled}
          setProfileEditDisabled={setProfileEditDisabled}
          setVehicleEditable={setVehicleEditable}
          vehicleEditable={vehicleEditable}
          dropDownValue={dropDownValue}
          setDropDownValue={setDropDownValue}
          dropDownOpen={dropDownOpen}
          setDropDownOpen={setDropDownOpen}
          dropDowRideType={dropDowRideType}
          setDropDownRideType={setDropDownRideType}
          type={type}
          rideTypeOptions={rideTypeOptions}
          selectedRideType={selectedRideType}
          setSelectedRideType={setSelectedRideType}
          filteredRideTypeOption={filteredRideTypeOption}
        />
      </div>
    </div>
  );
};

export default VehicleDetails;
