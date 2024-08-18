import Select, { components } from "react-select";
import DropDownIcon from "../../../../assets/icons/dropdown-icon";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  couponLocalZoneListAction,
  couponMainZoneListAction,
  couponOutstationZoneListAction,
  couponSpecialZoneListAction,
} from "../../../../redux/actions/riderCoupon/createCouponAction";
import {
  reactSelectUsageLimit,
  reactSelectUsageLimitDisabled,
  reactSelectUsageLimitError,
} from "../../../mui-styles/react-styles";
import "../coupon-component.css";
import SpinnerLoading from "../../../utilits/spinnerLoading";

const ReviewBookingDestination = ({
  formik,
  is_editable,
  coupon_applicable_zone,
  zonenameloading,
  zoneName,
  editCondition,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [localZoneList, setLocalZoneList] = useState();
  const [specialZoneList, setSpecialZoneList] = useState();
  const [outstationZoneList, setOutstationZoneList] = useState();

  const list = coupon_applicable_zone;

  const [lists, setLists] = useState(...list);

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
    dispatch(
      couponOutstationZoneListAction(
        {
          main_zone_id: lists,
        },
        onOutstationListSuccess,
        onOutstationListError
      )
    );
  }, [formik, coupon_applicable_zone]);

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

  const onOutstationListSuccess = (data) => {
    setLoading(false);
    console.log(data?.data);

    const zonelist = data?.data?.map((item) => {
      return { label: item?.city_name, value: item?.id };
    });
    setOutstationZoneList(zonelist);
  };

  const onOutstationListError = (data) => {
    setLoading(false);
  };

  // zonelist name
  // const [mainZonelist, setMainZonelist] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  // }, [coupon_applicable_zone]);

  // const onFetchSuccess = (data) => {
  //   setLoading(false);
  //   const statusOption = data?.data?.map((item) => {
  //     return { label: item?.zone_name, value: item?.id };
  //   });
  //   setMainZonelist(statusOption);
  // };

  // const onFetchError = () => {
  //   setLoading(false);
  // };

  // const pickUpZoneName = mainZonelist?.filter((item) => {
  //   return coupon_applicable_zone?.find((content) => content === item.value);
  // });

  // const pickUpZoneListName = pickUpZoneName?.map((item) => {
  //   return item.label;
  // });
  // console.log(pickUpZoneListName, "jhkjjbkj");
  // zonelist name

  const bookingDestinationType = [
    { value: "LocalDefinedCity", label: "Local Defined City" },
    { value: "OutstationDefinedCity", label: "Outstation Defined City" },
    { value: "SpecialZone", label: "Special Zone" },
  ];

  const handleZoneCheckbox = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("bookingDestination", [
        ...formik.values.bookingDestination,
        e.target.name,
      ]);
    } else {
      formik.setFieldValue(
        "bookingDestination",
        formik.values.bookingDestination.filter(
          (item) => item !== e.target.name
        )
      );
    }
  };

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
      <div className="row">
        <div className="col-4">
          <label className={"fs_14 primary_color"}>
            Booking Pickup Location*
          </label>
          <br />
          <input
            name="coupounCode"
            className={
              "w-100 border_radius_3px disabled_border disabled_bg_color secondary_color outline_none coupon_placeholder_text ps-2 p-1"
            }
            placeholder="Enter Booking Pickup Location"
            value={zonenameloading ? "" : zoneName}
            disabled
          />
        </div>
        <div className="col-4">
          <label
            className={
              formik.errors.bookingDestinationType &&
              formik.touched.bookingDestinationType
                ? "red_color fs_14"
                : "fs_14 primary_color"
            }
          >
            Booking Destination Type*
          </label>
          <Select
            isDisabled={editCondition}
            id="bookingDestinationType"
            instanceId="bookingDestinationType"
            options={bookingDestinationType}
            placeholder="Select Refund Type"
            styles={
              formik.errors.bookingDestinationType &&
              formik.touched.bookingDestinationType
                ? reactSelectUsageLimitError
                : editCondition
                ? reactSelectUsageLimitDisabled
                : reactSelectUsageLimit
            }
            name="bookingDestinationType"
            value={bookingDestinationType.filter((option) => {
              return option.value === formik.values.bookingDestinationType;
            })}
            onChange={(selectedOption) => {
              let event = {
                target: {
                  name: "bookingDestinationType",
                  value: selectedOption.value,
                },
              };
              formik.setFieldValue("bookingDestination", "");
              formik.handleChange(event);
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator,
            }}
          />
        </div>
        <div className="col-4">
          <label
            className={
              formik.errors.bookingDestination &&
              formik.touched.bookingDestination
                ? "red_color fs_14"
                : "fs_14 primary_color"
            }
          >
            Booking Destination*
          </label>
          <div
            className={
              formik.errors.bookingDestination &&
              formik.touched.bookingDestination
                ? "w-100 BookingDestination_type_block error_border border_radius_3px p-1 ps-2"
                : `${
                    is_editable === false
                      ? "disabled_border disabled_bg_color"
                      : "primary_border"
                  } w-100 BookingDestination_type_block  border_radius_3px p-1 ps-2`
            }
          >
            {formik.values.bookingDestinationType === "SpecialZone" && (
              <>
                {specialZoneList?.map((item, index) => (
                  <>
                    <div className="">
                      <input
                        type="checkbox"
                        id={item.value}
                        name={item.value}
                        onChange={handleZoneCheckbox}
                        checked={formik.values.bookingDestination?.includes(
                          item.value
                        )}
                        disabled={editCondition}
                      />
                      <label
                        className="ps-2 fs_12 dim_grey_color fw_500"
                        htmlFor={item.value}
                      >
                        {item.label}
                      </label>
                    </div>
                  </>
                ))}
              </>
            )}
            {formik.values.bookingDestinationType === "LocalDefinedCity" && (
              <>
                {localZoneList?.map((item, index) => (
                  <>
                    <div className="">
                      <input
                        type="checkbox"
                        id={item.value}
                        name={item.value}
                        onChange={handleZoneCheckbox}
                        checked={formik.values.bookingDestination?.includes(
                          item.value
                        )}
                        disabled={editCondition}
                      />
                      <label
                        className="ps-2 fs_12 dim_grey_color fw_500"
                        htmlFor={item.value}
                      >
                        {item.label}
                      </label>
                    </div>
                  </>
                ))}
              </>
            )}
            {formik.values.bookingDestinationType ===
              "OutstationDefinedCity" && (
              <>
                {outstationZoneList?.map((item, index) => (
                  <>
                    <div className="">
                      <input
                        type="checkbox"
                        id={item.value}
                        name={item.value}
                        onChange={handleZoneCheckbox}
                        checked={formik.values.bookingDestination?.includes(
                          item.value
                        )}
                        disabled={editCondition}
                      />
                      <label
                        className="ps-2 fs_12 dim_grey_color fw_500"
                        htmlFor={item.value}
                      >
                        {item.label}
                      </label>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookingDestination;
