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

const CreateBroadCastModal = ({
  createBroadCastShow,
  handleCreateBroadCastClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mainZonelist, setMainZonelist] = useState([]);
  const [zoneName, setZoneName] = useState("");
  useEffect(() => {
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    const objData = data?.data?.map((item) => ({
      label: item?.zone_name,
      value: [item?.id],
    }));
    const allIds = objData?.map((item) => item?.value);
    setMainZonelist(
      objData?.length > 0 ? [{ label: "All", value: allIds }, ...objData] : []
    );
  };

  const onFetchError = (data) => {
    console.log(data?.data);
    setMainZonelist([]);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userType: "Rider",
      broadcast_applicable_zone: [],
      zoneList: mainZonelist ? mainZonelist : [],
      status: "create",
    },
    validationSchema: Yup.object().shape({
      broadcast_applicable_zone: Yup.array()
        .min(1, "Please fill all the required fields*")
        .required("Please fill all the required fields*"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleCreateBroadCastClose();
      navigate("create", {
        state: { ...values, zone_name: zoneName },
      });
    },
  });

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
              <div className="d-flex flex-column justify-content-center mx-sm-5 px-sm-5 gap-2 mt-3">
                <ModalInputField
                  title={"User Type*"}
                  type={"text"}
                  placeholder={"Enter User Type*"}
                  itemName={"userType"}
                  inputValue={formik.values.userType}
                  disabled={true}
                  labelClassName="raven_color"
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
                  onSelect={(label) => setZoneName(label)}
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

export default CreateBroadCastModal;
