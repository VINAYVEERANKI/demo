import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ModalInputField from "../../form/modalInputField";
import Okaybtn from "../../utilits/buttons/okaybtn";
import { useNavigate } from "react-router";
import CouponSelectField from "../../form/CouponSelectField";
import * as Yup from "yup";
import { couponMainZoneListAction } from "../../../redux/actions/riderCoupon/createCouponAction";
import { useDispatch } from "react-redux";
import MultiSelectField from "../../form/multiSelectField";
import { PremiumType, createBooleanObj, rideType } from "../../helper";
import { rideTypeBroadcastDropDownAction } from "../../../redux/actions/broadcast/pendandCreateBroadcastAction";

const CreateDriverBroadCastModal = ({
  createBroadCastShow,
  handleCreateBroadCastClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mainZonelist, setMainZonelist] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [broadcastRideType, setBroadcastRideType] = useState([]);
  useEffect(() => {
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    const objData = data?.data?.map((item) => ({
      label: item?.zone_name,
      value: [item?.id],
    }));
    const allIds = objData?.map((item) => item?.value);
    console.log(objData?.length);
    setMainZonelist(
      objData?.length > 0 ? [{ label: "All", value: allIds }, ...objData] : []
    );
  };

  const onFetchError = (data) => {
    console.log(data?.data);
    setMainZonelist([]);
  };

  const [rideTypeDropdown, setRideTypeDropdown] = useState([]);
  const [filteredRideTypeOption, setFilteredRideTypeOption] = useState([]);
  useEffect(() => {
    dispatch(rideTypeBroadcastDropDownAction(onSuccess, onError));
  }, []);

  const onSuccess = (data) => {
    setRideTypeDropdown(data?.data);
  };
  const onError = (data) => {
    console.log(data?.data);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userType: "Driver",
      broadcast_applicable_zone: [],
      zoneList: mainZonelist ? mainZonelist : [],
      status: "create",
      driver_type: [],
      driver_default_ride_type: [],
    },
    validationSchema: Yup.object().shape({
      broadcast_applicable_zone: Yup.array()
        .min(1, "Please fill all the required fields*")
        .required("Please fill all the required fields*"),
      driver_type: Yup.array()
        .min(1, "Please select at least one option")
        .required("Please fill all the required fields*"),

      driver_default_ride_type: Yup.array()
        .min(1, "Please select at least one option")
        .required("Please fill all the required fields*"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleCreateBroadCastClose();
      navigate("create", {
        state: { ...values, ride_type: broadcastRideType, zone_name :zoneName },
      });
    },
  });

  console.log(createBooleanObj(PremiumType, formik.values.driver_type));
  console.log(formik.values, "asdadadasd");

  useEffect(() => {
    const filteredRideType = rideTypeDropdown.filter((item) => {
      return item.applicable_zone_permission.some((permission) => {
        if (Array.isArray(formik?.values?.broadcast_applicable_zone)) {
          return formik?.values?.broadcast_applicable_zone.some((zone) => {
            return (
              permission.zone_id?.includes(zone) &&
              permission.documentation_availablity === true
            );
          });
        }
      });
    });

    const filterRideType = Object.values(filteredRideType)?.map((item) => {
      return { value: item.id, label: item.ride_type };
    });
    setFilteredRideTypeOption(filterRideType);
  }, [formik?.values?.broadcast_applicable_zone, rideTypeDropdown]);


  return (
    <>
      <Modal
        centered
        show={createBroadCastShow}
        onHide={handleCreateBroadCastClose}
        dialogClassName="create_coupon_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-between border-bottom">
                <div></div>
                <div className="text-center ps-3">
                  <span className={`fs_21 primary_color fw_600 `}>
                    Create New Broadcast
                  </span>
                </div>
                <div>
                  <button
                    className="border_none background_none"
                    onClick={() => handleCreateBroadCastClose()}
                    type="button"
                  >
                    <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container"></i>
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column justify-content-center mx-sm-5 px-sm-5 px-2 gap-2 mt-3">
                <ModalInputField
                  title={"User Type*"}
                  type={"text"}
                  placeholder={"Enter User Type*"}
                  itemName={"userType"}
                  inputValue={formik.values.userType}
                  disabled={true}
                  labelClassName="raven_color"
                />

                <MultiSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Broadcast Driver Type*"
                  placeholder="Select driver type"
                  options={PremiumType}
                  itemName="driver_type"
                  formikValue={formik.values.driver_type}
                  formik={formik}
                  formikError={formik.errors.driver_type}
                  formikTouched={formik.touched.driver_type}
                />
                <CouponSelectField
                  label={true}
                  label_fontSize={"fs_16 fw_500"}
                  labelName={"Broadcast Applicable Zone*"}
                  placeholder="Select the applicable zones"
                  option={mainZonelist}
                  itemName="broadcast_applicable_zone"
                  formikValue={formik.values.broadcast_applicable_zone}
                  formik={formik}
                  formikError={formik.errors.broadcast_applicable_zone}
                  formikTouched={formik.touched.broadcast_applicable_zone}
                  setFieldValue={"driver_default_ride_type"}
                  onSelect={(label) => setZoneName(label)}
                />
                <MultiSelectField
                  label_fontSize="fs_16 fw_500"
                  labelName="Driver Default Ride Type*"
                  placeholder="Select Premium Type"
                  options={filteredRideTypeOption}
                  itemName="driver_default_ride_type"
                  formikValue={formik.values.driver_default_ride_type}
                  formik={formik}
                  formikError={formik.errors.driver_default_ride_type}
                  formikTouched={formik.touched.driver_default_ride_type}
                  onSelect={(label) => setBroadcastRideType(label)}
                />

                <div className="text-center">
                  <span className="red_color password_error_text">
                    {formik.errors.broadcast_applicable_zone &&
                      formik.touched.broadcast_applicable_zone && (
                        <span className="fs_14 pe-2">
                          {formik.errors.broadcast_applicable_zone}
                        </span>
                      )}
                  </span>
                </div>

                <Okaybtn okay={"Proceed"} iconShow={false} btnType="submit" />
              </div>
            </form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateDriverBroadCastModal;
