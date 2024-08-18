import React, { useEffect, useState } from "react";
import InnerLayout from "../layout/innerLayout";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import { useNavigate } from "react-router";
import BroadcastSidebar from "../broadcast/sidebar";
import LeavePagemodal from "../modals/leaveModal";
import NotificationForm from "./NotificationForm";
import Switch from "react-switch";
import UpdatedChangesModal from "../FAQs/faqs-modal/updateChangesModal";
import { useDispatch } from "react-redux";
import {
  nse_R_FindOneAction,
  nse_D_FindOneAction,
} from "../../redux/actions/nse/riderNseAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import NsePasswordModal from "./passwordModal";
import { insertSpaceUnderScore } from "../helper";

const RiderViewEditNotification = ({ params, type = "" }) => {
  console.log(type, "riderdrivertypes");
  const id = params?.id;

  const action = params?.action;
  console.log(action, "action");

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [statusChange, setStatusChange] = useState(true);
  const [statusValue, setStatusValue] = useState(null);

  const navigate = useNavigate();
  const [initialBackBtn, setInitialBackBtn] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [nseData, setNseData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const sideBarData = [
    {
      label: "Notification ID",
      value: nseData?.nse_code ?? "--",
    },
    { label: "Type", value: nseData?.nse_type ?? "--" },
    {
      label: `Classification`,
      value: nseData?.nse_account_type
        ? insertSpaceUnderScore(nseData?.nse_account_type)
        : nseData?.nse_booking_inner_type
        ? insertSpaceUnderScore(nseData?.nse_booking_inner_type)
        : nseData?.nse_payment_type
        ? insertSpaceUnderScore(nseData?.nse_payment_type)
        : nseData?.nse_emergency_sos_type
        ? insertSpaceUnderScore(nseData?.nse_emergency_sos_type)
        : nseData?.nse_In_app_messaging_type
        ? insertSpaceUnderScore(nseData?.nse_In_app_messaging_type)
        : nseData?.nse_incentive_type
        ? insertSpaceUnderScore(nseData?.nse_incentive_type)
        : "--",
    },
    {
      label: "Sub Classification",
      value: nseData?.nse_account_inner_type
        ? insertSpaceUnderScore(nseData?.nse_account_inner_type)
        : nseData?.nse_booking_sub_ongoing_booking_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_booking_local_type
          )
        : nseData?.nse_booking_sub_ongoing_stop_added_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_stop_added_local_type
          )
        : nseData?.nse_booking_sub_ongoing_dropoff_updated_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_dropoff_updated_local_type
          )
        : nseData?.nse_booking_sub_ongoing_payment_method_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_payment_method_local_type
          )
        : nseData?.nse_booking_sub_cancelled_booking_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_cancelled_booking_local_type
          )
        : nseData?.nse_booking_sub_accident_booking_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_accident_booking_local_type
          )
        : nseData?.nse_booking_sub_review_pending_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_review_pending_local_type
          )
        : nseData?.nse_booking_sub_ongoing_booking_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_booking_rental_type
          )
        : nseData?.nse_booking_sub_ongoing_dropoff_updated_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_dropoff_updated_rental_type
          )
        : nseData?.nse_booking_sub_ongoing_payment_method_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_payment_method_rental_type
          )
        : nseData?.nse_booking_sub_cancelled_booking_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_cancelled_booking_rental_type
          )
        : nseData?.nse_booking_sub_accident_booking_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_accident_booking_rental_type
          )
        : nseData?.nse_booking_sub_review_pending_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_review_pending_rental_type
          )
        : nseData?.nse_booking_sub_ongoing_rental_daily_work_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_rental_daily_work_type
          )
        : nseData?.nse_booking_sub_ongoing_booking_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_booking_oneway_type
          )
        : nseData?.nse_booking_sub_ongoing_dropoff_updated_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_dropoff_updated_oneway_type
          )
        : nseData?.nse_booking_sub_ongoing_payment_method_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_payment_method_oneway_type
          )
        : nseData?.nse_booking_sub_cancelled_booking_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_cancelled_booking_oneway_type
          )
        : nseData?.nse_booking_sub_odometer_oneway_type
        ? insertSpaceUnderScore(nseData?.nse_booking_sub_odometer_oneway_type)
        : nseData?.nse_booking_sub_accident_booking_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_accident_booking_oneway_type
          )
        : nseData?.nse_booking_sub_review_pending_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_review_pending_oneway_type
          )
        : nseData?.nse_booking_sub_max_days_reached_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_max_days_reached_oneway_type
          )
        : nseData?.nse_booking_sub_ongoing_booking_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_booking_round_type
          )
        : nseData?.nse_booking_sub_return_trip_round_type
        ? insertSpaceUnderScore(nseData?.nse_booking_sub_return_trip_round_type)
        : nseData?.nse_booking_sub_ongoing_dropoff_updated_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_dropoff_updated_round_type
          )
        : nseData?.nse_booking_sub_ongoing_payment_method_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ongoing_payment_method_round_type
          )
        : nseData?.nse_booking_sub_cancelled_booking_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_cancelled_booking_round_type
          )
        : nseData?.nse_booking_sub_odometer_round_type
        ? insertSpaceUnderScore(nseData?.nse_booking_sub_odometer_round_type)
        : nseData?.nse_booking_sub_accident_booking_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_accident_booking_round_type
          )
        : nseData?.nse_booking_sub_review_pending_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_review_pending_round_type
          )
        : nseData?.nse_booking_sub_max_days_reached_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_max_days_reached_round_type
          )
        : nseData?.nse_payment_sub_fine_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_fine_type)
        : nseData?.nse_payment_sub_recived_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_recived_type)
        : nseData?.nse_payment_sub_due_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_due_type)
        : nseData?.nse_payment_sub_cb_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_cb_type)
        : nseData?.nse_payment_sub_cashout_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_cashout_type)
        : nseData?.nse_emergency_sos_sub_during_trip_type
        ? insertSpaceUnderScore(nseData?.nse_emergency_sos_sub_during_trip_type)
        : nseData?.nse_emergency_sos_sub_messaging_type
        ? insertSpaceUnderScore(nseData?.nse_emergency_sos_sub_messaging_type)
        : nseData?.nse_In_app_messaging_sub_driver_to_rider_type
        ? insertSpaceUnderScore(
            nseData?.nse_In_app_messaging_sub_driver_to_rider_type
          )
        : nseData?.nse_In_app_messaging_sub_complaint_ongoing_type
        ? insertSpaceUnderScore(
            nseData?.nse_In_app_messaging_sub_complaint_ongoing_type
          )
        : nseData?.nse_In_app_messaging_sub_resloved_closed_type
        ? insertSpaceUnderScore(
            nseData?.nse_In_app_messaging_sub_resloved_closed_type
          )
        : nseData?.nse_incentive_sub_start_time_type
        ? insertSpaceUnderScore(nseData?.nse_incentive_sub_start_time_type)
        : nseData?.nse_incentive_sub_inprogress_type
        ? insertSpaceUnderScore(nseData?.nse_incentive_sub_inprogress_type)
        : nseData?.nse_incentive_sub_remaining_time_type
        ? insertSpaceUnderScore(nseData?.nse_incentive_sub_remaining_time_type)
        : nseData?.nse_incentive_sub_completed_type
        ? insertSpaceUnderScore(nseData?.nse_incentive_sub_completed_type)
        : nseData?.nse_booking_sub_no_rides_available_local_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_no_rides_available_local_type
          )
        : nseData?.nse_booking_sub_no_rides_available_rental_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_no_rides_available_rental_type
          )
        : nseData?.nse_booking_sub_accident_booking_renatl_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_accident_booking_renatl_type
          )
        : nseData?.nse_booking_sub_ride_sheduled_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ride_sheduled_oneway_type
          )
        : nseData?.nse_booking_sub_ride_sheduled_oneway_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ride_sheduled_oneway_type
          )
        : nseData?.nse_booking_sub_ride_sheduled_round_type
        ? insertSpaceUnderScore(
            nseData?.nse_booking_sub_ride_sheduled_round_type
          )
        : nseData?.nse_payment_sub_pending_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_pending_type)
        : nseData?.nse_payment_sub_success_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_success_type)
        : nseData?.nse_payment_sub_current_balance_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_current_balance_type)
        : nseData?.nse_payment_sub_wallet_type
        ? insertSpaceUnderScore(nseData?.nse_payment_sub_wallet_type)
        : "--",
    },
  ];

  console.log(nseData, "asadasdadsadad");

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const handlePasswordModalClose = () => setPasswordModalShow(false);
  const handlePasswordModalShow = () => setPasswordModalShow(true);

  useEffect(() => {
    if (type === "Rider") {
      setFetchLoading(true);
      dispatch(
        nse_R_FindOneAction(
          {
            nse_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "Driver") {
      setFetchLoading(true);
      dispatch(
        nse_D_FindOneAction(
          {
            nse_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [type]);

  console.log(type);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setNseData(data?.data);
    console.log(data?.data, "adasdasd");
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  useEffect(() => {
    setStatusValue(nseData?.status === "Active" ? true : false);
  }, [nseData]);
  const handleStatusChange = () => {
    setStatusValue(!statusValue);
  };
  console.log(nseData, "dataaaaaaaaaaaaaaa");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      is_send_notification: nseData?.is_app_notification ?? false,
      notification_title: nseData?.notification_title ?? "",
      notification_body: nseData?.notification_body ?? "",
      notification_image: nseData?.notification_image ?? null,
      is_send_sms_message: nseData?.is_sms ?? false,
      message_header: nseData?.sms_title ?? "",
      message_body: nseData?.sms_body ?? "",
      altleastOne: "",
      status: statusValue === true ? "Active" : "Inactive",
    },

    validationSchema: Yup.object().shape({
      is_send_notification: Yup.bool(),
      status: Yup.string(),
      notification_title: Yup.string().when("is_send_notification", {
        is: true,
        then: Yup.string().required("notificationTitle is required."),
      }),
      notification_body: Yup.string().when("is_send_notification", {
        is: true,
        then: Yup.string().required("notificationBody is required."),
      }),
      is_send_sms_message: Yup.bool(),
      message_header: Yup.string().when("is_send_sms_message", {
        is: true,
        then: Yup.string().required("Please Complete All The Above Fields."),
      }),
      message_body: Yup.string().when("is_send_sms_message", {
        is: true,
        then: Yup.string().required("Please Complete All The Above Fields"),
      }),
      altleastOne: Yup.boolean().when(
        ["is_send_notification", "is_send_sms_message"],
        {
          is: (is_send_notification, is_send_sms_message) =>
            !is_send_notification && !is_send_sms_message,
          then: Yup.boolean().required("Atleast one is required"),
          otherwise: Yup.boolean(),
        }
      ),
    }),

    onSubmit: (values) => {
      console.log(values);
      handlePasswordModalShow();
    },
  });

  console.log(formik?.errors);

  useEffect(() => {
    const status = nseData?.status === "Active" ? true : false;
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values) ||
      status !== statusValue
    ) {
      setDisabled(false);
      setInitialBackBtn(true);
    } else {
      setDisabled(true);
      setInitialBackBtn(false);
    }
  }, [formik.values, statusValue, nseData]);

  const Onnavigatebtn = () => {
    if (initialBackBtn === true) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  console.log(initialBackBtn, "adadada");

  return (
    <>
      <NsePasswordModal
        passwordModalShow={passwordModalShow}
        handlePasswordModalClose={handlePasswordModalClose}
        id={id}
        formik={formik}
        type={type}
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      {fetchLoading ? (
        <LoadingSpinnerTable />
      ) : (
        <InnerLayout
          navigateEnable={false}
          naviagteLeave={true}
          mainHeading={nseData?.nse_code ?? "--"}
          navigateFn={Onnavigatebtn}
          backBtnClassName=""
        >
          <form onSubmit={formik.handleSubmit}>
            <div className=" d-flex justify-content-end pe-4">
              {statusChange ? (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <div className="d-flex align-items-center">
                    <span
                      className={
                        statusValue
                          ? "disabled_color fs_14 fw_500 me-2"
                          : "red_color fs_14 fw_600 me-2"
                      }
                    >
                      Inactive
                    </span>
                    <Switch
                      onChange={handleStatusChange}
                      checked={statusValue}
                      offColor="#F600003"
                      offHandleColor="#ed0b0b"
                      onColor="#70ad47"
                      onHandleColor="#00ab2e"
                      handleDiameter={25}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="none"
                      activeBoxShadow="none"
                      height={13}
                      width={45}
                      className="react-switch"
                      id="material-switch"
                      disabled={action === "view"}
                    />
                    <span
                      className={
                        statusValue
                          ? "green_color fs_14 fw_500 ms-1"
                          : "disabled_color fs_14 fw_600 ms-1"
                      }
                    >
                      Active
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="row mt-3 ps-2 g-0">
              <div className="col-lg-4 col-12">
                <BroadcastSidebar sideBarData={sideBarData} />
              </div>
              <div className="col-lg-7 col-12">
                <NotificationForm
                  handlePasswordModalShow={handlePasswordModalShow}
                  fetchLoading={fetchLoading}
                  formik={formik}
                  disabled={disabled}
                  action={action}
                  nseData={nseData}
                />
              </div>
            </div>{" "}
          </form>
        </InnerLayout>
      )}
    </>
  );
};

export default RiderViewEditNotification;
