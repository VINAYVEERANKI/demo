import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { createFaqOrTopicAction } from "../../../redux/actions/faq/faqAction";
import { useDispatch } from "react-redux";
import SuccessMessagemodal from "../../modals/successMessageModal";
import SpinnerLoading from "../../utilits/spinnerLoading";

const AddTopicModal = ({
  addFaqtopic,
  handleAddFaqTopicClose,
  type,
  faqTab,
  faqSidebarTab,
  action,
  faqData,
  setReload,
  reload,
}) => {
  console.log();

  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      topicTitle: "",
    },
    validationSchema: yup.object({
      topicTitle: yup
        .string()
        .trim()
        .required("This field cannot be left empty*")
        .matches(/^[A-Za-z]+$/, "Invalid character(s)*"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);
      dispatch(
        createFaqOrTopicAction(
          {
            user_type: type === "riderFaq" ? "Rider" : "Driver",
            faq_type: faqTab,
            faq_help_inner_type: faqTab === "Help" ? faqSidebarTab : "",
            faq_main_type: action,
            topic_title: formik?.values?.topicTitle,
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
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    setReload(!reload);
    formik?.resetForm();
    handleSuccessMessageShow();
    handleAddFaqTopicClose();
    console.log(data);
  };
  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    console.log(data, "asdaddsd");
  };
  console.log(action, "ajdgsjda");

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={"Topic added successfully!"}
      />
      <Modal
        show={addFaqtopic}
        centered
        onHide={handleAddFaqTopicClose}
        dialogClassName={"add_faqtopic_topic_modal"}
        contentClassName="border_radius_15px"
      >
        <Modal.Body>
          <form className="px-2" onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-between align-items-center">
              <span className="primary_color fs_22 fw_500">
                Add New Topic-My Accounts
              </span>
              <i
                class="ri-close-circle-fill fs_30 primary_color fw_500"
                onClick={handleAddFaqTopicClose}
              />
            </div>
            <hr />
            <div className=" d-flex py-3">
              <div className="col-4">
                <label className="ms-2 primary_color fs_18 fw_400">
                  Topic ID
                </label>
              </div>
              <div className="col-8">
                <div>--</div>
              </div>
            </div>
            <div className="d-flex  pt-2 py-5">
              <div className="col-4">
                <label className="ms-2 primary_color fs_18 fw_400">
                  Topic Title*
                </label>
              </div>
              <div className="col-8">
                <input
                  className={`${formik.errors.topicTitle && formik.touched.topicTitle
                      ? "error_border"
                      : "input_border"
                    } w-100 border_radius_5px p-1 outline_none ps-2 fs_20 fw_500`}
                  name="topicTitle"
                  value={formik?.values?.topicTitle}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                />
                {formik?.errors?.topicTitle && formik?.touched?.topicTitle && (
                  <div className="red_color fw_500">
                    {formik?.errors?.topicTitle}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center gap-5 pb-3">
              <Cancelbtn
                cancelFn={() => {
                  handleAddFaqTopicClose();
                  formik.resetForm();
                }}
              />
              <button
                type="submit"
                className=" primary_bg border_radius_5px px-4 py-1 border_none"
              >
                <span className=" fs_18 white_color px-3">
                  {loading ? <SpinnerLoading /> : "Add"}
                </span>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTopicModal;
