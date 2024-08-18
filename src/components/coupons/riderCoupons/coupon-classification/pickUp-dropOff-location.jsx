import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select, { components } from "react-select";
import DropDownIcon from "../../../../assets/icons/dropdown-icon";
import {
  couponLocalZoneListAction,
  couponSpecialZoneListAction,
} from "../../../../redux/actions/riderCoupon/createCouponAction";
import {
  reactSelectUsageLimit,
  reactSelectUsageLimitDisabled,
  reactSelectUsageLimitError,
} from "../../../mui-styles/react-styles";

const ReviewPickUpDropOffLocation = ({
  formik,
  status,
  is_editable,
  coupon_applicable_zone,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [dropOffDisabled, setDropOffDisabled] = useState(true);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [localZoneList, setLocalZoneList] = useState();
  const [specialZoneList, setSpecialZoneList] = useState();

  const list = coupon_applicable_zone;

  const [lists] = useState(...list);

  useEffect(() => {
    setLoading(true);
    dispatch(
      couponLocalZoneListAction(
        {
          main_zone_id: lists,
        },
        onLocalListSuccess,
        onLocalListError
      )
    );
    dispatch(
      couponSpecialZoneListAction(
        {
          main_zone_id: lists,
        },
        onSpecialListSuccess,
        onSpecialListError
      )
    );
  }, []);

  const onLocalListSuccess = (data) => {
    setLoading(false);
    console.log(data?.data);

    const zonelist = data?.data?.map((item) => {
      return { label: item?.city_name, value: item?.id };
    });
    setLocalZoneList(zonelist);
  };

  const onLocalListError = (data) => {
    setLoading(false);
  };

  const onSpecialListSuccess = (data) => {
    setLoading(false);
    console.log(data?.data);

    const zonelist = data?.data?.map((item) => {
      return { label: item?.city_name, value: item?.id };
    });
    setSpecialZoneList(zonelist);
  };

  const onSpecialListError = (data) => {
    setLoading(false);
  };

  const pickUpLocationType = [
    { value: "LocalDefinedCity", label: "Local Defined City" },
    { value: "SpecialZone", label: "Special Zone" },
  ];

  const dropOffLocationType = [
    { value: "LocalDefinedCity", label: "Local Defined City" },
    { value: "SpecialZone", label: "Special Zone" },
  ];

  function pickupLocationFn() {
    if (formik.values.pickUpLocationType === "LocalDefinedCity") {
      return localZoneList;
    }
    if (formik.values.pickUpLocationType === "SpecialZone") {
      return specialZoneList;
    }
  }

  const pickupLocationList = pickupLocationFn();

  function dropoffpLocationFn() {
    if (formik.values.dropOffLocationType === "LocalDefinedCity") {
      return localZoneList;
    }
    if (formik.values.dropOffLocationType === "SpecialZone") {
      return specialZoneList;
    }
  }

  const dropoffLocationList = dropoffpLocationFn();

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="mt-1 mb-2">
      <span className=" primary_color fs_16 fw_500">
        Coupon Classification*
      </span>
      <div className="row mt-2">
        <div className="col-3">
          <label
            className={
              formik.errors.pickUpLocationType &&
              formik.touched.pickUpLocationType
                ? "red_color fs_14"
                : "fs_14 primary_color"
            }
          >
            Pickup Location Type*
          </label>
          <Select
            isDisabled={
              is_editable === false ||
              status === "Active" ||
              status === "ReviewPendingUpdated"
                ? true
                : false
            }
            id="pickUpLocationType"
            instanceId="pickUpLocationType"
            options={pickUpLocationType}
            placeholder="Select Refund Type"
            styles={
              formik.errors.pickUpLocationType &&
              formik.touched.pickUpLocationType
                ? reactSelectUsageLimitError
                : is_editable === false ||
                  status === "Active" ||
                  status === "ReviewPendingUpdated"
                ? reactSelectUsageLimitDisabled
                : reactSelectUsageLimit
            }
            name="pickUpLocationType"
            value={pickUpLocationType?.filter((option) => {
              return option.value === formik.values.pickUpLocationType;
            })}
            onChange={(selectedOption) => {
              let event = {
                target: {
                  name: "pickUpLocationType",
                  value: selectedOption.value,
                },
              };
              setDisabled(false);
              formik.setFieldValue("pickupLocation", "");
              formik.handleChange(event);
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
          />
        </div>
        <div className="col-3">
          <label
            className={
              formik.errors.pickupLocation && formik.touched.pickupLocation
                ? "red_color fs_14"
                : "fs_14 primary_color"
            }
          >
            Pickup Location
          </label>
          <Select
            isDisabled={
              is_editable === false ||
              status === "Active" ||
              status === "ReviewPendingUpdated"
                ? true
                : disabled
            }
            id="pickupLocation"
            instanceId="pickupLocation"
            options={pickupLocationList}
            placeholder="Select Refund Type"
            styles={
              formik.errors.pickupLocation && formik.touched.pickupLocation
                ? reactSelectUsageLimitError
                : is_editable === false ||
                  disabled ||
                  status === "Active" ||
                  status === "ReviewPendingUpdated"
                ? reactSelectUsageLimitDisabled
                : reactSelectUsageLimit
            }
            name="pickupLocation"
            value={pickupLocationList?.filter((option) => {
              return option.value === formik.values.pickupLocation;
            })}
            onChange={(selectedOption) => {
              let event = {
                target: {
                  name: "pickupLocation",
                  value: selectedOption.value,
                },
              };
              formik.handleChange(event);
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
          />
        </div>
        <div className="col-3">
          <label
            className={
              formik.errors.dropOffLocationType &&
              formik.touched.dropOffLocationType
                ? "red_color fs_14"
                : "fs_14 primary_color"
            }
          >
            Drop-Off Location Type*
          </label>
          <Select
            isDisabled={
              is_editable === false ||
              status === "Active" ||
              status === "ReviewPendingUpdated"
                ? true
                : false
            }
            id="dropOffLocationType"
            instanceId="dropOffLocationType"
            options={dropOffLocationType}
            placeholder="Select Refund Type"
            styles={
              formik.errors.dropOffLocationType &&
              formik.touched.dropOffLocationType
                ? reactSelectUsageLimitError
                : is_editable === false ||
                  status === "Active" ||
                  status === "ReviewPendingUpdated"
                ? reactSelectUsageLimitDisabled
                : reactSelectUsageLimit
            }
            name="dropOffLocationType"
            value={dropOffLocationType?.filter((option) => {
              return option.value === formik.values.dropOffLocationType;
            })}
            onChange={(selectedOption) => {
              let event = {
                target: {
                  name: "dropOffLocationType",
                  value: selectedOption.value,
                },
              };
              setDropOffDisabled(false);
              formik.setFieldValue("dropOffLocation", "");
              formik.handleChange(event);
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
          />
        </div>
        <div className="col-3">
          <label
            className={
              formik.errors.dropOffLocation && formik.touched.dropOffLocation
                ? "red_color fs_14"
                : "fs_14 primary_color"
            }
          >
            Drop-Off Location*
          </label>
          <Select
            isDisabled={
              is_editable === false ||
              status === "Active" ||
              status === "ReviewPendingUpdated"
                ? true
                : dropOffDisabled
            }
            id="dropOffLocation"
            instanceId="dropOffLocation"
            options={dropoffLocationList}
            placeholder="Select Refund Type"
            styles={
              formik.errors.dropOffLocation && formik.touched.dropOffLocation
                ? reactSelectUsageLimitError
                : is_editable === false ||
                  dropOffDisabled ||
                  status === "Active" ||
                  status === "ReviewPendingUpdated"
                ? reactSelectUsageLimitDisabled
                : reactSelectUsageLimit
            }
            name="dropOffLocation"
            value={dropoffLocationList?.filter((option) => {
              return option.value === formik.values.dropOffLocation;
            })}
            onChange={(selectedOption) => {
              let event = {
                target: {
                  name: "dropOffLocation",
                  value: selectedOption.value,
                },
              };
              formik.handleChange(event);
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewPickUpDropOffLocation;
