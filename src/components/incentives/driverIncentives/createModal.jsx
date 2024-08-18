import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalHeading from "../../utilits/buttons/modal-header";
import Okaybtn from "../../utilits/buttons/okaybtn";
import { useNavigate } from "react-router";
import CouponSelectField from "../../form/CouponSelectField";
import { PremiumType, rideType } from "../../helper";
import ModalInputField from "../../form/modalInputField";
import { useDispatch } from "react-redux";
import {
  incentiveMainZoneListAction,
  incentiveRideTypeListAction,
} from "../../../redux/actions/incentives/dropDownListAction";

const DriverIncentiveCreateModal = ({
  createIncentiveShow,
  handleCreateIncentiveClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mainZonelist, setMainZonelist] = useState([]);
  const [rideTypelist, setRideTypelist] = useState([]);
  const [filteredRideTypeOption, setFilteredRideTypeOption] = useState([]);
  useEffect(() => {
    dispatch(incentiveMainZoneListAction(onFetchSuccess, onFetchError));
    dispatch(
      incentiveRideTypeListAction(onRideTypeListSuccess, onRideTypeListError)
    );
  }, []);

  const onFetchSuccess = (data) => {
    console.log(data?.data, "manageZones");
    setMainZonelist(data?.data);
  };

  const onFetchError = (data) => {
    console.log(data?.data);
  };
  const zoneOption = Object.values(mainZonelist)?.map((item) => {
    return { value: item?.id, label: item?.zone_name };
  });
  const onRideTypeListSuccess = (data) => {
    setRideTypelist(data?.data);
  };

  const onRideTypeListError = (data) => {
    console.log(data?.data);
  };

  console.log(filteredRideTypeOption, "aksjdskad");

  const [selectedRideType, setSelectedRideType] = useState("");
  const [incentiveApplicableZoneName, setIncentiveApplicableZoneName] =
    useState("");

  const formikCreate = useFormik({
    enableReinitialize: true,
    initialValues: {
      userType: "driver",
      incentive_classification: "",
      campaign_period: "",
      incentive_applicable_zone: "",
      driver_default_ride_type: "",
      incentive_coupon_type: "",
      driver_type: "",
    },
    validationSchema: Yup.object().shape({
      userType: Yup.string().required("required"),
      incentive_classification: Yup.string().required("required"),
      // campaign_period: Yup.string().when("incentive_classification", {
      //   is: (val) => val !== val?.includes(""),
      //   then: Yup.string().required("Field is required"),
      // }),
      // incentive_applicable_zone: Yup.string().when("incentive_classification", {
      //   is: (val) => val !== val?.includes(""),
      //   then: Yup.string().required("Field is required"),
      // }),
      // driver_default_ride_type: Yup.string().when("incentive_classification", {
      //   is: (val) => val !== val?.includes(""),
      //   then: Yup.string().required("Field is required"),
      // }),
      // incentive_coupon_type: Yup.string().when("incentive_classification", {
      //   is: (val) => val !== val?.includes(""),
      //   then: Yup.string().required("Field is required"),
      // }),
      // driver_type: Yup.string().when("incentive_classification", {
      //   is: (val) => val !== val?.includes(""),
      //   then: Yup.string().required("Field is required"),
      // }),
    }),
    onSubmit: (values) => {
      handleCreateIncentiveClose();
      navigate("create", {
        state: {
          ...values,
          ride_type: selectedRideType,
          incentive_applicable_zone_name: incentiveApplicableZoneName,
        },
      });
    },
  });

  const rideTypeOption = Object.values(rideTypelist)?.map((item) => {
    return { value: item?.id, label: item?.ride_type };
  });

  useEffect(() => {
    const filteredRideType = rideTypelist.filter((item) => {
      return item.applicable_zone_permission.some((permission) => {
        return (
          permission.zone_id ===
            formikCreate?.values?.incentive_applicable_zone &&
          permission.documentation_availablity === true
        );
      });
    });

    const filterRideType = Object.values(filteredRideType)?.map((item) => {
      return { value: item.id, label: item.ride_type };
    });
    setFilteredRideTypeOption(filterRideType);
  }, [formikCreate?.values?.incentive_applicable_zone, rideTypelist]);

  console.log(filteredRideTypeOption, "skdjfhksjf");

  const campaignPeriodType = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
  ];

  const incentive_classifications = [
    { value: "CompletedBookings", label: "Completed Bookings" },
    { value: "OnlineDuration", label: "Online Duration" },
    {
      value: "ConsecutiveBookingWithoutDOrC",
      label: "Consecutive Bookings Without Denial Or Cancellation",
    },
    { value: "OnlinePaymentBooking", label: "Online Payment Bookings" },
    {
      value: "ConsecutiveFiveStarRatings",
      label: "Consecutive 5-Star Ratings",
    },
    { value: "DistanceTravelled", label: "Distance Travelled" },
  ];

  const incentive_coupon_type = [
    { value: "CurrentBalanceDeposite", label: "Current Balance Deposit" },
  ];

  console.log(formikCreate?.values, "aksjdskad");

  return (
    <>
      <Modal
        centered
        show={createIncentiveShow}
        onHide={handleCreateIncentiveClose}
        dialogClassName="create_coupon_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="p-sm-2">
            <ModalHeading
              title={"Create New Coupon"}
              closeFn={() => {
                handleCreateIncentiveClose();
                formikCreate.resetForm();
              }}
              statusShow={false}
            />

            <form onSubmit={formikCreate.handleSubmit}>
              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <ModalInputField
                  title={"User Type*"}
                  type={"text"}
                  placeholder={"Enter User Type*"}
                  itemName={"userType"}
                  inputValue={formikCreate.values.userType}
                  disabled={true}
                  labelClassName="raven_color"
                />
              </div>

              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <CouponSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Incentive Classification*"
                  placeholder="Select "
                  option={incentive_classifications}
                  itemName="incentive_classification"
                  formikValue={formikCreate.values.incentive_classification}
                  formik={formikCreate}
                  formikError={formikCreate.errors.incentive_classification}
                  formikTouched={formikCreate.touched.incentive_classification}
                />
              </div>
              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <CouponSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Campaign Period*"
                  placeholder="Select Campaign Period*"
                  option={campaignPeriodType}
                  itemName="campaign_period"
                  formikValue={formikCreate.values.campaign_period}
                  formik={formikCreate}
                  formikError={formikCreate.errors.campaign_period}
                  formikTouched={formikCreate.touched.campaign_period}
                  selectDisabled={
                    formikCreate.values.incentive_classification === ""
                  }
                />
              </div>
              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <CouponSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Incentive Applicable Zone*"
                  placeholder="Select Incentive Applicable Zone"
                  option={zoneOption}
                  itemName="incentive_applicable_zone"
                  formikValue={formikCreate.values.incentive_applicable_zone}
                  formik={formikCreate}
                  formikError={formikCreate.errors.incentive_applicable_zone}
                  formikTouched={formikCreate.touched.incentive_applicable_zone}
                  selectDisabled={
                    formikCreate.values.incentive_classification === ""
                  }
                  onSelect={(label) => setIncentiveApplicableZoneName(label)}
                  setFieldValue={"driver_default_ride_type"}
                />
              </div>
              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <CouponSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Driver Default Ride Type*"
                  placeholder="Select Driver Default Ride Type"
                  option={filteredRideTypeOption}
                  itemName="driver_default_ride_type"
                  formikValue={formikCreate.values.driver_default_ride_type}
                  formik={formikCreate}
                  formikError={formikCreate.errors.driver_default_ride_type}
                  formikTouched={formikCreate.touched.driver_default_ride_type}
                  selectDisabled={
                    formikCreate.values.incentive_classification === ""
                  }
                  onSelect={(label) => setSelectedRideType(label)}
                />
              </div>
              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <CouponSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Premium"
                  placeholder="Select Premium"
                  option={PremiumType}
                  itemName="driver_type"
                  formikValue={formikCreate.values.driver_type}
                  formik={formikCreate}
                  formikError={formikCreate.errors.driver_type}
                  formikTouched={formikCreate.touched.driver_type}
                  selectDisabled={
                    formikCreate.values.incentive_classification === ""
                  }
                />
              </div>
              <div className="mt-3 mx-sm-5 px-sm-3 px-2">
                <CouponSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Incentive Coupon Type*"
                  placeholder="Select Incentive Coupon Type*"
                  option={incentive_coupon_type}
                  itemName="incentive_coupon_type"
                  formikValue={formikCreate.values.incentive_coupon_type}
                  formik={formikCreate}
                  formikError={formikCreate.errors.incentive_coupon_type}
                  formikTouched={formikCreate.touched.incentive_coupon_type}
                  selectDisabled={
                    formikCreate.values.incentive_classification === ""
                  }
                />
              </div>

              <Okaybtn okay={"Proceed"} iconShow={false} btnType="submit" />
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DriverIncentiveCreateModal;
