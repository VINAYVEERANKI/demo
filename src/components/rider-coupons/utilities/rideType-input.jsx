import React from "react";
import "../../rider-coupons/coupon-component.css";

const RideTypeInput = ({
  formik,
  couponData,
  dropDowRideType,
  setDropDownRideType,
  // setDropDownOpen,
  type,
  name,
  selectedRideType,
  setSelectedRideType,
  filteredRideTypeOption,
  setselectedRideTypeLabel,
  handleReset,
}) => {
  console.log(name , "name");
  // const handleCheckboxChange = (event, item) => {
  //   const { value, checked } = event.target;

  //   if (checked) {
  //     setSelectedRideType((prevSelectedRideType) => [
  //       ...prevSelectedRideType,
  //       value,
  //     ]);
  //     setselectedRideTypeLabel((prevSelectedRideType) => [
  //       ...prevSelectedRideType,
  //       item?.label,
  //     ]);
  //   } else {
  //     setSelectedRideType((prevSelectedRideType) =>
  //       prevSelectedRideType.filter((option) => option !== value)
  //     );
  //     setselectedRideTypeLabel((prevSelectedRideType) =>
  //       prevSelectedRideType.filter((option) => option !== item?.label)
  //     );
  //   }
  // };


  const handleCheckboxChange = (event, item) => {
    const { value, checked } = event.target;
  
    // if (checked) {
    //   setSelectedRideType((prevSelectedRideType) => [
    //     ...prevSelectedRideType,
    //     value,
    //   ]);
    //   setselectedRideTypeLabel((prevSelectedRideType) => [
    //     ...prevSelectedRideType,
    //     item?.label,
    //   ]);
    // } else {
    //   setSelectedRideType((prevSelectedRideType) =>
    //     prevSelectedRideType.filter((option) => option !== value)
    //   );
    //   setselectedRideTypeLabel((prevSelectedRideType) =>
    //     prevSelectedRideType.filter((option) => option !== item?.label)
    //   );
    // }

    if (checked) {
      setSelectedRideType((prevSelectedRideType) => {
        if (Array.isArray(prevSelectedRideType)) {
          return [...prevSelectedRideType, value];
        }
        return [value];
      });
      setselectedRideTypeLabel((prevSelectedRideType) => {
        if (Array.isArray(prevSelectedRideType)) {
          return [...prevSelectedRideType, item?.label];
        }
        return [item?.label];
      });
    } else {
      setSelectedRideType((prevSelectedRideType) => {
        if (Array.isArray(prevSelectedRideType)) {
          return prevSelectedRideType.filter((option) => option !== value);
        }
        return [];
      });
      setselectedRideTypeLabel((prevSelectedRideType) => {
        if (Array.isArray(prevSelectedRideType)) {
          return prevSelectedRideType.filter((option) => option !== item?.label);
        }
        return [];
      });
    }
  
    // Update Formik values separately
    const selectedRideTypeIds = checked
      ? [...formik.values.rideTypeId, value]
      : formik.values.rideTypeId.filter((option) => option !== value);
    const selectedRideTypeLabels = checked
      ? [...formik.values.rideType, item?.label]
      : formik.values.rideType.filter((option) => option !== item?.label);
    formik.setFieldValue("rideTypeId", selectedRideTypeIds);
    formik.setFieldValue("rideType", selectedRideTypeLabels);
  };
  

  return (
    <>
      {dropDowRideType ? (
        <div className="dropDown_vehicleDetails_container  border_radius_5px mt-1 p-1 w-100">
          {filteredRideTypeOption?.map((option) => (
            <div key={option.value} className="d-flex gap-2 ps-2">
              <input
                type="checkbox"
                value={option.value}
                name={name}
                checked={selectedRideType?.includes(option.value)}
                onChange={(e) => handleCheckboxChange(e, option)}
                id={option.value}
                disabled={
                  couponData?.edit === false ||
                  couponData?.couponStatus === "Active" ||
                  couponData?.couponStatus === "ReviewPendingUpdated"
                    ? true
                    : false
                }
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
          <div className="d-flex justify-content-end gap-3 pe-3 py-2">
            {type === "createRiderReferral" ||
            type === "createDriverReferral" ||
            type === "createRiderCoupon" ? null : (
              <>
                <button
                  onClick={() => setDropDownRideType(!dropDowRideType)}
                  className="green_color_bg border_none border_radius_5px white_color py-0 px-3 "
                >
                  Apply
                </button>
                <button
                  onClick={handleReset}
                  type="button"
                  className=" disabled_color_bg border_none border_radius_5px white_color py-0 px-3 "
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RideTypeInput;
