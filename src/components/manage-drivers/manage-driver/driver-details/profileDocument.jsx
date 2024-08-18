import React, { useEffect, useState } from "react";
import driverImage from "../../../../assets/images/profileimage.png";
import DetailsInputField from "../../../form/detailsInputField";
import DetailsSelectField from "../../../form/detailsSelectField";
import SpinnerLoading from "../../../utilits/spinnerLoading";
import { BalanceStatus, StarRating } from "../../../helper";
import { useDispatch } from "react-redux";
import {
  manageDriverMainZoneListAction,
  manageDriverRideTypeListAction,
} from "../../../../redux/actions/manageDriversAction";

const DriverProfileDocumentEdit = ({
  driverDetails,
  formik,
  editable,
  setEditable,
  profileEditDisabled,
  profileData,
  setVehicleDetailsDisabled,
  loading,
  type,
}) => {
  console.log(type, "alkdalksd");
  const GenderList = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];
  const DriverTypeData = [
    { value: "Premium1", label: "Premium 1" },
    { value: "Premium2", label: "Premium 2" },
    { value: "Premium3", label: "Premium 3" },
    { value: "Premium4", label: "Premium 4" , isDisabled:true },
    { value: "Premium5", label: "Premium 5", isDisabled:true },

  ];

  const dispatch = useDispatch();

  const [mainZonelist, setMainZonelist] = useState([]);
  useEffect(() => {
    dispatch(manageDriverMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    setMainZonelist(data?.data);
  };

  const onFetchError = (data) => {
    console.log(data?.data);
  };

  const zoneOption = mainZonelist
    ? Object.values(mainZonelist)?.map((item) => {
        return { value: item?.id, label: item?.zone_name };
      })
    : null;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <img
            src={
              driverDetails?.profile_pic?.photo
                ? driverDetails?.profile_pic?.photo
                : driverImage
            }
            width={100}
            height={100}
            className="border_radius"
            alt="profile pic"
          />
          <div className="d-flex align-items-center">
            <StarRating rating={driverDetails?.ratings} />
            <span className="primary_color fs_16 fw_500 pb-1">
              {driverDetails?.ratings}
            </span>
          </div>
        </div>

        {profileData?.state?.edit &&
        type !== "deletedDrivers" &&
        type !== "permanentlyDeletedDrivers" ? (
          <form onSubmit={formik.handleSubmit}>
            {editable === false ? (
              <div className="me-3">
                <button
                  className={
                    profileEditDisabled
                      ? "light_grey_bg  fw_700 px-3 py-1 border_radius_5px me-2 border_none fs_14"
                      : "primary_bg white_color px-3 py-1 border_radius_5px me-2 border_none fs_14"
                  }
                  onClick={() => {
                    setEditable(!editable);
                    setVehicleDetailsDisabled(true);
                  }}
                  disabled={profileEditDisabled}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="d-flex gap-3 me-3">
                <button
                  type="button"
                  className="white_bg red_color reset_btn px-3 fs_14 border_radius_5px py-1"
                  onClick={() => formik.resetForm()}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="fs_14 border_none dark_green_bg border_radius_5px px-3  white_color py-1"
                >
                  <span>{loading ? <SpinnerLoading /> : "Save"} </span>
                </button>
              </div>
            )}
          </form>
        ) : null}
      </div>

      <div className="row mt-1">
        <div className="col-xl-3">
          <DetailsInputField
            label={"Driver ID"}
            staticValue={
              driverDetails?.driver_id2 ? driverDetails?.driver_id2 : "--"
            }
            staticContent={true}
            dynamicContent={false}
          />

          <DetailsInputField
            label={"First Name"}
            formik={formik}
            itemName={"firstName"}
            inputValue={formik.values.firstName}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.firstName}
            formikTouched={formik.touched.firstName}
            disabled={editable === false}
          />
          <DetailsInputField
            label={"Last Name"}
            formik={formik}
            itemName={"lastName"}
            inputValue={formik.values.lastName}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.lastName}
            formikTouched={formik.touched.lastName}
            disabled={editable === false}
          />
          <DetailsSelectField
            placeholder={""}
            option={GenderList}
            itemName="gender"
            formikValue={formik.values.gender}
            formik={formik}
            formikError={formik.errors.gender}
            formikTouched={formik.touched.gender}
            isDisabled={editable === false}
            label={"Gender"}
          />
          <DetailsInputField
            label={"DOB"}
            formik={formik}
            itemName={"DOB"}
            inputValue={formik.values.DOB}
            onChangeFn={formik.handleChange}
            formikError={formik.errors.DOB}
            formikTouched={formik.touched.DOB}
            onBlurFn={formik.handleBlur}
            disabled={editable === false}
            type="date"
          />
          <DetailsInputField
            label={"Referral Code"}
            staticValue={
              driverDetails?.referral_code ? driverDetails?.referral_code : "--"
            }
            staticContent={true}
            dynamicContent={false}
          />
        </div>
        <div className="col-xl-4">
          <DetailsSelectField
            placeholder={""}
            option={zoneOption}
            itemName="registeredZone"
            formikValue={formik.values.registeredZone}
            formik={formik}
            formikError={formik.errors.registeredZone}
            formikTouched={formik.touched.registeredZone}
            isDisabled={editable === false}
            label={"Registered Zone"}
          />
          {type !== "permanentlyDeletedDrivers" && (
            <>
              <DetailsInputField
                label={"Phone Number"}
                formik={formik}
                itemName={"phoneNumber"}
                inputValue={formik.values.phoneNumber}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.phoneNumber}
                formikTouched={formik.touched.phoneNumber}
                disabled={editable === false}
                input_width={"w_70"}
                // isVerified={driverDetails?.is_number_verified}
                isVerified={true}
              />
              <DetailsInputField
                label={"Email ID"}
                formik={formik}
                itemName={"emailId"}
                inputValue={formik.values.emailId}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.emailId}
                formikTouched={formik.touched.emailId}
                disabled={editable === false}
                input_width={"w_70"}
                // isVerified={driverDetails?.is_email_verified}
                isVerified={true}
              />
            </>
          )}

          <DetailsInputField
            label={"Current Balance"}
            staticValue={
              driverDetails?.current_balance
                ? driverDetails?.current_balance
                : "--"
            }
            label_color={BalanceStatus(driverDetails?.current_balance)}
            staticContent={true}
            dynamicContent={false}
          />
          <DetailsSelectField
            option={DriverTypeData}
            itemName="driverType"
            formikValue={formik.values.driverType}
            formik={formik}
            formikError={formik.errors.driverType}
            formikTouched={formik.touched.driverType}
            isDisabled={editable === false}
            label={"Premium"}
          />
          <DetailsInputField
            label={"Rides Cancelled"}
            staticValue={driverDetails?.rides_cancelled_count ?? "--"}
            staticContent={true}
            dynamicContent={false}
          />
        </div>

        <div className="col-xl-5">
          <DetailsInputField
            label={"Rides Denied"}
            staticValue={driverDetails?.rides_denied_count ?? "--"}
            staticContent={true}
            dynamicContent={false}
          />
          <DetailsInputField
            label={"Account Blocked Count"}
            staticValue={driverDetails?.blocked_count ?? "--"}
            staticContent={true}
            dynamicContent={false}
          />
          <DetailsInputField
            label={"Application Rejected Count"}
            staticValue={driverDetails?.application_rejected_count ?? "--"}
            staticContent={true}
            dynamicContent={false}
          />
          <DetailsInputField
            label={"Admin Comments"}
            formik={formik}
            itemName={"adminComments"}
            inputValue={formik.values.adminComments}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.adminComments}
            formikTouched={formik.touched.adminComments}
            disabled={editable === false}
            align_items=""
            type="textArea"
          />
        </div>
      </div>
    </div>
  );
};

export default DriverProfileDocumentEdit;
