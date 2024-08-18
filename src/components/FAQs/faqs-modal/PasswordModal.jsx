import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddFaq.css";
import "../../rideType-vehicleType/rideType-vehicleTypeComponents.css";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PasswordInputField from "../../form/passwordInputField";
import {
  DeleteFaqOrTopicAction,
  EditFaqOrTopicAction,
  createFaqOrTopicAction,
  createTopicUnderFaqAction,
  deleteTopicUnderFaqAction,
  editTopicUnderFaqAction,
} from "../../../redux/actions/faq/faqAction";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../../utilits/spinnerLoading";
import SuccessMessagemodal from "../../modals/successMessageModal";

const FAQPasswordModal = ({
  formik,
  faqPasswordModal,
  handleFaqPassWordClose,
  title,
  type,
  faqTab,
  faqSidebarTab,
  action = "",
  handleAddFaqClose,
  faqData,
  faqId,
  mainfaqId,
  setReload,
  reload,
  statusValue,
  toipcTitleValue,
  setTitleEditable,
  titleEditable,
}) => {

  console.log(faqTab, "jhgjgkj");
  console.log(faqSidebarTab, "jhgjgkj");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(
    faqTab === "After_trip"
      ? faqSidebarTab === "paymentLocal"
        ? "LocalTrip"
        : faqSidebarTab === "paymentRental"
          ? "RentalTrip"
          : faqSidebarTab === "paymentOneWayOutstation"
            ? "OneWayOutstation"
            : faqSidebarTab === "paymentRoundOutstation"
              ? "RoundTripOutstation"
              : ""
      : ""
  );

  const caaaa =
    faqTab === "After_trip"
      ? faqSidebarTab === "paymentLocal" ||
        faqSidebarTab === "paymentRental" ||
        faqSidebarTab === "paymentOneWayOutstation" ||
        faqSidebarTab === "paymentRoundOutstation"
        ? ""
        : faqSidebarTab
      : "";

  console.log(caaaa);

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      // formik.setFieldValue("password", formikCreatePass?.values?.password);
      if (action === "edit" || action === "FaqTopicEdit") {
        setLoading(true);
        dispatch(
          EditFaqOrTopicAction(
            {
              topicOrfaq_id: faqData?.id ?? mainfaqId,
              topic_title: formik?.values?.topic_title ?? toipcTitleValue ?? "",
              question_title: formik?.values?.question ?? "",
              question_answer: formik?.values?.answer ?? "",
              status: statusValue === true ? "Active" : "Inactive",
              faq_features: {
                CallUs:
                  formik?.values?.faqfeatures?.call_us === true ? true : false,
                SubmitAFeedback:
                  formik?.values?.faqfeatures?.submit_feedback === true
                    ? true
                    : false,
                ChatWithUs:
                  formik?.values?.faqfeatures?.chat_with_us === true
                    ? true
                    : false,
              },
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (action === "delete") {
        setLoading(true);
        console.log("sadadadsds");
        dispatch(
          DeleteFaqOrTopicAction(
            {
              topic_id: faqId?.id,
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (action === "Faq") {
        setLoading(true);
        dispatch(
          createFaqOrTopicAction(
            {
              user_type: type === "riderFaq" ? "Rider" : type === "driverFaq" ? "Driver" : "",
              faq_type: faqTab,
              faq_help_inner_type: faqTab === "Help" ? faqSidebarTab : "",
              faq_main_type: action,
              topic_title: formik?.values?.topicTitle,
              status: statusValue === true ? "Active" : "Inactive",
              faq_during_trip_queries_type:
                faqTab === "During_trip" ? faqSidebarTab : "",
              faq_after_trip_related_queries_type:
                faqTab === "After_trip"
                  ? faqSidebarTab === "paymentLocal" ||
                    faqSidebarTab === "paymentRental" ||
                    faqSidebarTab === "paymentOneWayOutstation" ||
                    faqSidebarTab === "paymentRoundOutstation"
                    ? ""
                    : faqSidebarTab
                  : "",
              faq_after_trip_payment_queries_type:
                faqTab === "After_trip"
                  ? faqSidebarTab === "paymentLocal"
                    ? "LocalTrip"
                    : faqSidebarTab === "paymentRental"
                      ? "RentalTrip"
                      : faqSidebarTab === "paymentOneWayOutstation"
                        ? "OneWayOutstation"
                        : faqSidebarTab === "paymentRoundOutstation"
                          ? "RoundTripOutstation"
                          : ""
                  : "",
              question_title: formik?.values?.question,
              question_answer: formik?.values?.answer,
              faq_features: {
                CallUs: formik?.values?.faqfeatures?.call_us,
                SubmitAFeedback: formik?.values?.faqfeatures?.submit_feedback,
                ChatWithUs: formik?.values?.faqfeatures?.chat_with_us,
              },
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (action === "createTopicFaq") {
        setLoading(true);
        dispatch(
          createTopicUnderFaqAction(
            {
              topic_id: faqId,
              question_title: formik?.values?.question ?? "",
              question_answer: formik?.values?.answer ?? "",
              status: statusValue === true ? "Active" : "Inactive",
              faq_features: {
                CallUs:
                  formik?.values?.faqfeatures?.call_us === true ? true : false,
                SubmitAFeedback:
                  formik?.values?.faqfeatures?.submit_feedback === true
                    ? true
                    : false,
                ChatWithUs:
                  formik?.values?.faqfeatures?.chat_with_us === true
                    ? true
                    : false,
              },
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (action === "editTopic") {
        setLoading(true);
        dispatch(
          editTopicUnderFaqAction(
            {
              topic_id: faqId,
              topic_under_faq_id: faqData?.id,
              question_title: formik?.values?.question ?? "",
              question_answer: formik?.values?.answer ?? "",
              status: statusValue === true ? "Active" : "Inactive",
              faq_features: {
                CallUs:
                  formik?.values?.faqfeatures?.call_us === true ? true : false,
                SubmitAFeedback:
                  formik?.values?.faqfeatures?.submit_feedback === true
                    ? true
                    : false,
                ChatWithUs:
                  formik?.values?.faqfeatures?.chat_with_us === true
                    ? true
                    : false,
              },
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (action === "deleteTopic") {
        setLoading(true);
        dispatch(
          deleteTopicUnderFaqAction(
            {
              topic_id: mainfaqId,
              topic_under_faq_id: faqId,
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      }

      console.log(values);
    },
  });

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    formikCreatePass.resetForm();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const onSuccess = (data) => {
    setLoading(false);
    if (action === "FaqTopicEdit") {
      setTitleEditable(!titleEditable);
    }

    setReload(!reload);
    handleSuccessMessageShow();
    handleFaqPassWordClose();
    handleAddFaqClose();

    formik.resetForm();
    setError(false);
    console.log(data, "asdasdad");
  };
  const onError = (data) => {
    setLoading(false);
    // setReload(!reload);
    console.log(data, "asdasdad");
    setError(data?.data?.data);
  };

  console.log(faqId?.faq_main_type, "adadsadsad");

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          action === "Faq"
            ? "FAQ added successfully!"
            : action === "edit" || action === "editTopic"
              ? "FAQ updated successfully!"
              : action === "delete" && faqId?.faq_main_type === "Faq"
                ? "FAQ has been deleted!"
                : action === "delete" && faqId?.faq_main_type === "Topic"
                  ? "Topic has been deleted!"
                  : action === "FaqTopicEdit"
                    ? "Topic updated SuccessFully"
                    : "FAQ has been deleted!"
        }
      />
      <Modal
        centered
        show={faqPasswordModal}
        onHide={handleFaqPassWordClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-0">
                <span className="primary_color">{title}</span>
              </div>
              <div className="mt-3">
                <PasswordInputField
                  itemName={"password"}
                  inputValue={formikCreatePass.values.password}
                  onChangeFn={(e) => {
                    formikCreatePass.handleChange(e);
                  }}
                  onBlurFn={formikCreatePass.handleBlur}
                  formikError={formikCreatePass.errors.password}
                  formikTouched={formikCreatePass.touched.password}
                  error={error}
                />
                <div className="red_color fw_500 ms-5">{error ?? null}</div>
              </div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    setError(false);
                    handleFaqPassWordClose();
                    formikCreatePass.resetForm();
                  }}
                />

                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-2 py-1 border_none"
                >
                  <span className=" fs_18 white_color px-3">
                    {loading ? <SpinnerLoading /> : `Confirm`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FAQPasswordModal;
