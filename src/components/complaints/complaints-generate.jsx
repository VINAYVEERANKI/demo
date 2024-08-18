import React, { useEffect, useState } from "react";
// import "../rider-complaints-components.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { bookingIDListAction } from "../../redux/actions/complaints/inprogressComplaintsAction";
import { useDispatch } from "react-redux";
import CouponSelectField from "../form/CouponSelectField";
import {
  callComplaintDescriptionAction,
  generateComplaintDriverAction,
  generateComplaintRiderAction,
} from "../../redux/actions/complaints/callAction";
import successToast from "../utilits/successToast";
import moment from "moment";
import { insertSpaces, removeUnderScore } from "../helper";
import errorToast from "../utilits/errorToast";
import {
  myComplaintsListAction,
  myComplaintsRiderListAction,
} from "../../redux/actions/complaints/myComplaintsAction";
import InnerLayout from "../layout/innerLayout";
import ComplaintsPasswordModal from "./modal/passwordModal";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";
import usePermissions from "../usePermissionChecker";

const CallComplaintsGenerate = ({ type = "" }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    riderCallComplaint: "rider_call",
    driverCallComplaint: "driver_call",
  };
  const permission = pagePermissions[type];

  const dispatch = useDispatch();

  const [complaintPassShow, setComplaintPassShow] = useState(false);
  const handleComplaintPassClose = () => setComplaintPassShow(false);
  const handleComplaintPassShow = () => setComplaintPassShow(true);

  const [generatedComplData, setGeneratedComplData] = useState([]);

  const [bookingList, setBookingList] = useState([]);
  const [fetchloading, setFetchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [complaintListLoading, setComplaintListLoading] = useState(false);
  const [myComplaintdata, setMyComplaintData] = useState({
    riderComplaintData: {},
    driverComplaintData: {},
    activeComplaintCount: 0,
    driverComplaintCount: 0,
    riderComplaintCount: 0,
  });
  const [complaintCount, setComplaintCount] = useState({
    driverCount: 0,
    riderCount: 0,
  });
  const [page, setPage] = useState(0);
  const [action, setAction] = useState("");
  const [reload, setReload] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFetchLoading(true);
    dispatch(bookingIDListAction(onFetchSuccess, onFetchError));
  }, []);
  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    console.log(data);
    setBookingList(
      data?.data?.map((item) => {
        return { label: item?.booking_id_2, value: item?.id };
      })
    );
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  // const filterBookingId = bookingId
  //   ? bookingList?.find((item) => {
  //       if (item?.value.toLowerCase() === bookingId.toLowerCase()) {
  //         return item?.id;
  //       }
  //     })
  //   : "";

  const filterBookingId = bookingId
    ? bookingList?.find(
        (item) =>
          item?.label?.toLocaleLowerCase() == bookingId?.toLocaleLowerCase()
      )?.value
    : "";

  console.log(filterBookingId, "safassfaf");
  console.log(bookingList, "aldja");
  useEffect(() => {
    setComplaintListLoading(true);
    if (type === "driverCallComplaint") {
      dispatch(
        myComplaintsListAction(
          {
            search: "",
          },
          onListFetchSuccess,
          onListFetchError
        )
      );
    } else if (type === "riderCallComplaint") {
      dispatch(
        myComplaintsRiderListAction(
          {
            search: "",
          },
          onListFetchSuccess,
          onListFetchError
        )
      );
    }
  }, [reload]);

  useEffect(() => {
    setComplaintListLoading(true);
    if (type === "riderCallComplaint") {
      dispatch(
        myComplaintsListAction(
          {
            search: "",
          },
          onListCountSuccess,
          onListCountError
        )
      );
    } else if (type === "driverCallComplaint") {
      dispatch(
        myComplaintsRiderListAction(
          {
            search: "",
          },
          onListCountSuccess,
          onListCountError
        )
      );
    }
  }, [reload]);

  const onListFetchSuccess = (data) => {
    console.log(data, "sdasdasd");
    setComplaintListLoading(false);
    const filterComplaintData = (raisedBy, source, status) =>
      data?.data?.data?.find(
        (item) =>
          item?.call_complaint_raised_by === raisedBy &&
          item?.source === source &&
          item?.complaint_status === status
      ) ?? null;

    const countActiveComplaints = (raisedBy, source, status) =>
      data?.data?.data?.filter(
        (item) =>
          item?.call_complaint_raised_by === raisedBy &&
          item?.source === source &&
          item?.complaint_status === status
      )?.length;

    setMyComplaintData({
      riderComplaintData: filterComplaintData("Rider", "Call", "Initiated"),
      driverComplaintData: filterComplaintData("Driver", "Call", "Initiated"),
      activeComplaintCount:
        countActiveComplaints("Driver", "Call", "Initiated") +
        countActiveComplaints("Rider", "Call", "Initiated"),
      driverComplaintCount: countActiveComplaints(
        "Driver",
        "Call",
        "Initiated"
      ),
      riderComplaintCount: countActiveComplaints("Rider", "Call", "Initiated"),
    });
  };
  const onListFetchError = (data) => {
    setComplaintListLoading(false);
    errorToast(data?.data);
  };
  useEffect(() => {
    setDescription(
      myComplaintdata?.riderComplaintData?.complaint_description ??
        myComplaintdata?.driverComplaintData?.complaint_description ??
        ""
    );
  }, [myComplaintdata]);

  const onListCountSuccess = (data) => {
    setComplaintListLoading(false);
    const countActiveComplaints = (raisedBy, source, status) =>
      data?.data?.data?.filter(
        (item) =>
          item?.call_complaint_raised_by === raisedBy &&
          item?.source === source &&
          item?.complaint_status === status
      )?.length;
    setComplaintCount({
      driverCount: countActiveComplaints("Driver", "Call", "Initiated"),
      riderCount: countActiveComplaints("Rider", "Call", "Initiated"),
    });
  };

  const onListCountError = (data) => {
    setComplaintListLoading(false);
  };

  console.log(myComplaintdata, "sdjfhskjd");
  console.log(type, "sdjfhskjd");

  const complaintTypeOptions = [
    { label: "Billing", value: "Billing" },
    { label: "Refund", value: "Refund" },
    { label: "Others", value: "Others" },
  ];

  const complaintTitleOptions = [
    {
      label: "Toll Fee Charged Incorectly",
      value: "Toll Fee Charged Incorectly",
    },
    { label: "Refund not received", value: "Refund not received" },
    { label: "Parking fee issue", value: "Parking fee issue" },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bookingId:
        myComplaintdata?.riderComplaintData?.booking_id ??
        myComplaintdata?.driverComplaintData?.booking_id ??
        "",
      callId:
        myComplaintdata?.riderComplaintData?.call_id ??
        myComplaintdata?.driverComplaintData?.call_id ??
        "",
      complaintType:
        myComplaintdata?.riderComplaintData?.complaint_type ??
        myComplaintdata?.driverComplaintData?.complaint_type ??
        "",
      complaintTitle:
        myComplaintdata?.riderComplaintData?.complaint_title ??
        myComplaintdata?.driverComplaintData?.complaint_title ??
        "",
    },
    validationSchema: Yup.object({
      bookingId: Yup.string().trim().required("Booking ID is required"),
      callId: Yup.string().trim().required(),
      complaintType: Yup.string().trim().required(),
      complaintTitle: Yup.string().trim().required(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      if (type === "riderCallComplaint") {
        dispatch(
          generateComplaintRiderAction(
            {
              booking_id: filterBookingId,
              call_id: values?.callId,
              complaint_type: values?.complaintType,
              complaint_title: values?.complaintTitle,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "driverCallComplaint") {
        dispatch(
          generateComplaintDriverAction(
            {
              booking_id: filterBookingId,
              call_id: values?.callId,
              complaint_type: values?.complaintType,
              complaint_title: values?.complaintTitle,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    setGeneratedComplData(data?.data);
    console.log(data, "sdfsfd");
    setReload(!reload);
    setErrorMessage(false);
  };

  const onError = (data) => {
    setLoading(false);
    if (data?.data?.data === "booking_id is null") {
      errorToast("Enter a Valid Booking ID");
    } else {
      errorToast(data?.data?.data);
    }
    setReload(false);

    console.log(data?.data?.data, "sdfsfd");
    setErrorMessage(data?.data?.data);
  };

  function saveDescription() {
    setLoading(true);
    dispatch(
      callComplaintDescriptionAction(
        {
          complaint_id:
            myComplaintdata?.riderComplaintData?.id ??
            myComplaintdata?.driverComplaintData?.id,
          complaint_description: description ?? "",
        },
        onSaveSuccess,
        onSaveError
      )
    );
  }

  const onSaveSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    console.log(data);
  };
  const onSaveError = (data) => {
    setLoading(false);
    console.log(data?.message);
    errorToast(data);
  };

  console.log(formik.values, "fsadasdasd");

  const Data = [
    {
      label: "Complaint Status",
      Value:
        myComplaintdata?.riderComplaintData?.complaint_status ??
        myComplaintdata?.driverComplaintData?.complaint_status ??
        "--",
    },
    {
      label: "Complaint ID",
      Value:
        myComplaintdata?.riderComplaintData?.complaint_id2 ??
        myComplaintdata?.driverComplaintData?.complaint_id2 ??
        "--",
    },
    {
      label: "Booking ID",
      Value:
        myComplaintdata?.riderComplaintData?.booking?.booking_id_2 ??
        myComplaintdata?.driverComplaintData?.booking?.booking_id_2 ??
        "",
    },
    {
      label: "Booking Classification",
      Value: (() => {
        const bookingClassification =
          myComplaintdata?.riderComplaintData?.booking
            ?.booking_classification ||
          myComplaintdata?.driverComplaintData?.booking?.booking_classification;

        const bookingClassificationWithoutUnderscore =
          bookingClassification && removeUnderScore(bookingClassification);

        return bookingClassificationWithoutUnderscore || "--";
      })(),
    },
    {
      label:
        type === "riderCallComplaint"
          ? "Rider First Name"
          : "Driver First Name",
      Value:
        type === "riderCallComplaint"
          ? myComplaintdata?.riderComplaintData?.booking?.rider?.first_name ??
            "--"
          : myComplaintdata?.driverComplaintData?.booking?.driver?.first_name ??
            "--",
    },
    {
      label: type === "riderCallComplaint" ? "Rider ID" : "Driver ID",
      Value:
        type === "riderCallComplaint"
          ? myComplaintdata?.riderComplaintData?.booking?.rider?.rider_id2 ??
            "--"
          : myComplaintdata?.driverComplaintData?.booking?.driver?.driver_id2 ??
            "--",
    },
    {
      label: "Call ID",
      Value:
        myComplaintdata?.riderComplaintData?.call_id ??
        myComplaintdata?.driverComplaintData?.call_id ??
        "--",
    },
    {
      label: "Complaint Type",
      Value:
        myComplaintdata?.riderComplaintData?.complaint_type ??
        myComplaintdata?.driverComplaintData?.complaint_type ??
        "--",
    },
    {
      label: "Complaint Title",
      Value:
        myComplaintdata?.riderComplaintData?.complaint_title ??
        myComplaintdata?.driverComplaintData?.complaint_title ??
        "--",
    },
    {
      label: "Generated At",
      Value:
        myComplaintdata?.riderComplaintData?.generated_at ||
        myComplaintdata?.driverComplaintData?.generated_at
          ? moment(
              myComplaintdata?.riderComplaintData?.generated_at ||
                myComplaintdata?.driverComplaintData?.generated_at
            ).format("DD-MM-YYYY,HH:mm:ss")
          : "--",
    },
    {
      label: "Generated By",
      Value:
        myComplaintdata?.riderComplaintData?.GeneratedBy?.user_name ??
        myComplaintdata?.driverComplaintData?.GeneratedBy?.user_name ??
        "--",
    },
  ];

  return (
    <>
      <ComplaintsPasswordModal
        complaintPassShow={complaintPassShow}
        handleComplaintPassClose={handleComplaintPassClose}
        title={
          action === "closeComplaint"
            ? "Are you sure you want to close the complaint?"
            : "Are you sure you want to resolve the complaint?"
        }
        type={type}
        complaintType={action}
        id={
          type === "riderCallComplaint"
            ? myComplaintdata?.riderComplaintData?.id
            : myComplaintdata?.driverComplaintData?.id
        }
        setReload={setReload}
        reload={reload}
      />
      <InnerLayout
        mainHeading={`My ${type ? insertSpaces(type) : "Complaint"}s `}
        navigateEnable={false}
        backBtnClassName="ms-4"
        is_headingHint={true}
        headingHint="(Source: Call)"
      >
        <>
          {canWrite(permission) === false ? (
            <div className="position-absolute top-50 start-50 translate-middle">
              <span className="primary_color fs_26 fw_500">
                You are not authorized to Generate Complaint
              </span>
            </div>
          ) : (
            <>
              {" "}
              {complaintListLoading ? (
                <LoadingSpinnerTable />
              ) : (type === "riderCallComplaint" &&
                  complaintCount?.driverCount > 0) ||
                (type === "driverCallComplaint" &&
                  complaintCount?.riderCount > 0) ? (
                <div className="fs_sm_13 fs_16 position-absolute top-50 start-50 translate-middle">
                  <NavLink
                    className="red_color fs_20"
                    to={
                      type === "riderCallComplaint"
                        ? `/driver-call`
                        : `/rider-call`
                    }
                  >
                    {" "}
                    {type === "riderCallComplaint"
                      ? `You have an active call in driver section`
                      : `You have an active call in rider section`}
                  </NavLink>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <div>
                    <div className="generate_container border_radius_10px p-4">
                      <form onSubmit={formik.handleSubmit}>
                        {/* <div className="d-sm-flex align-items-center">
                          <div className="col-4">
                            <span className="secondary_color fs_16 fw_500 text-nowrap">
                              Booking ID
                            </span>
                          </div>
                          <div className="col-sm-8">
                            <CouponSelectField
                              label={false}
                              loading={fetchloading}
                              placeholder={"Enter Booking ID"}
                              option={bookingList}
                              itemName="bookingId"
                              formikValue={formik.values.bookingId}
                              formik={formik}
                              formikError={formik.errors.bookingId}
                              formikTouched={formik.touched.bookingId}
                              selectDisabled={
                                myComplaintdata?.activeComplaintCount > 0
                              }
                            />
                          </div>
                        </div> */}
                        <div className="d-sm-flex align-items-center mt-2">
                          <div className="col-4">
                            <span className="secondary_color fs_16 fw_500 text-nowrap">
                              Enter Booking ID
                            </span>
                          </div>
                          <div className="col-sm-8">
                            <input
                              className={
                                formik.errors.bookingId &&
                                formik.touched.bookingId
                                  ? ` password_error primary_color booking_id_input fw_500 w-100 border_radius_3px py-1 outline_none ps-2 fs_16`
                                  : ` w-100
                                   ${
                                     myComplaintdata?.activeComplaintCount > 0
                                       ? "disabled_color"
                                       : "primary_color"
                                   } 
                                     fw_500 booking_id_input border_radius_3px py-1 primary_border outline_none ps-2 fs_16`
                              }
                              name="bookingId"
                              id="bookingId"
                              placeholder="Enter Booking ID"
                              value={bookingId}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setBookingId(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              disabled={
                                myComplaintdata?.activeComplaintCount > 0
                              }
                            />
                          </div>
                        </div>
                        <div className="d-sm-flex align-items-center mt-2">
                          <div className="col-4">
                            <span className="secondary_color fs_16 fw_500 text-nowrap">
                              Call ID
                            </span>
                          </div>
                          <div className="col-sm-8">
                            <input
                              className={
                                formik.errors.callId && formik.touched.callId
                                  ? ` password_error primary_color booking_id_input fw_500 w-100 border_radius_3px py-1 outline_none ps-2 fs_16`
                                  : ` w-100
                                   ${
                                     myComplaintdata?.activeComplaintCount > 0
                                       ? "disabled_color"
                                       : "primary_color"
                                   } 
                                     fw_500 booking_id_input border_radius_3px py-1 primary_border outline_none ps-2 fs_16`
                              }
                              name="callId"
                              id="callId"
                              placeholder="Enter Call ID"
                              value={formik.values.callId}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              disabled={
                                myComplaintdata?.activeComplaintCount > 0
                              }
                            />
                          </div>
                        </div>
                        <div className="d-sm-flex align-items-center mt-2">
                          <div className="col-4 ">
                            <span className="secondary_color fs_16 fw_500 text-nowrap">
                              Complaint Type
                            </span>
                          </div>
                          <div className="col-sm-8">
                            <CouponSelectField
                              className="dropdown_border"
                              label={false}
                              placeholder={"Enter Complaint type"}
                              option={complaintTypeOptions}
                              itemName="complaintType"
                              formikValue={formik.values.complaintType}
                              formik={formik}
                              formikError={formik.errors.complaintType}
                              formikTouched={formik.touched.complaintType}
                              selectDisabled={
                                myComplaintdata?.activeComplaintCount > 0
                              }
                            />
                          </div>
                        </div>
                        <div className="d-sm-flex  mt-2">
                          <div className="col-4 pt-1">
                            <span className="secondary_color fs_16 fw_500 text-nowrap ">
                              Complaint Title{" "}
                            </span>
                          </div>
                          <div className="col-sm-8">
                            <CouponSelectField
                              label={false}
                              placeholder={"Enter Complaint title"}
                              option={complaintTitleOptions}
                              itemName="complaintTitle"
                              formikValue={formik.values.complaintTitle}
                              formik={formik}
                              formikError={formik.errors.complaintTitle}
                              formikTouched={formik.touched.complaintTitle}
                              selectDisabled={
                                myComplaintdata?.activeComplaintCount > 0
                              }
                            />

                            <div className="required_message_height">
                              {formik.errors.bookingId &&
                                formik.touched.bookingId && (
                                  <span className="red_color  fw_500 fs_12">
                                    {formik.errors.bookingId}
                                  </span>
                                )}
                            </div>
                            {errorMessage && (
                              <div className="required_message_height w-75">
                                <span className="red_color  fw_500 fs_12">
                                  {errorMessage === "booking_id is null"
                                    ? "Enter a Valid Booking ID"
                                    : errorMessage}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {myComplaintdata?.activeComplaintCount > 0 ? null : (
                          <span className="d-flex justify-content-end ">
                            <button
                              type="submit"
                              className="primary_bg border_radius_3px white_color border_none fs_16 fw_400 px-2 "
                            >
                              Generate
                            </button>
                          </span>
                        )}
                      </form>
                    </div>
                    <div className="generate_container border_radius_10px p-4 mt-3">
                      <table>
                        <tbody>
                          {Data?.map((item) => (
                            <tr className="" key={item?.label}>
                              <td className="secondary_color fs_16 fw_500 text-nowrap">
                                {item?.label}
                              </td>
                              <td className="primary_color fs_16 fw_500 text-nowrap ps-5">
                                {item?.Value}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td
                              className={` secondary_color fs_16 fw_500 text-nowrap`}
                              style={{ verticalAlign: "text-top" }}
                            >
                              Complaint Description
                            </td>
                            <td className="text-nowrap ps-5 w-100">
                              {myComplaintdata?.activeComplaintCount > 0 ? (
                                <textarea
                                  className="w-100 default_border border_radius_3px  primary_color fs_14 fw_500 resize_none outline_none description_area"
                                  placeholder="Description....."
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              ) : (
                                "-"
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {myComplaintdata?.activeComplaintCount > 0 ? (
                        <>
                          <div className="d-flex justify-content-end">
                            <button
                              className="blue_color_bg border_radius_3px white_color fs_16 border_none px-3 py-0"
                              type="button"
                              onClick={() => saveDescription()}
                            >
                              Save
                            </button>
                          </div>
                          <div className="d-flex justify-content-between mt-4">
                            <button
                              className="primary_border border_radius_3px primary_color fs_16 fw_500 px-md-5 px-3 py-1"
                              type="button"
                              onClick={() => {
                                handleComplaintPassShow();
                                setAction("closeComplaint");
                              }}
                            >
                              Close Complaint
                            </button>
                            <button
                              className="green_color_bg border_none white_color fs_16 fw_400 border_radius_3px px-md-5 px-3 py-1"
                              type="button"
                              onClick={() => {
                                handleComplaintPassShow();
                                setAction("resolveComplaint");
                              }}
                            >
                              Resolve Complaint
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}{" "}
            </>
          )}
        </>
      </InnerLayout>
    </>
  );
};

export default CallComplaintsGenerate;
