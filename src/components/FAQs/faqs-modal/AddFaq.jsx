import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./AddFaq.css";
import Modal from "react-bootstrap/Modal";
import ModalHeading from "../../utilits/buttons/modal-header";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import Savebtn from "../../utilits/buttons/savebtn";
import InputField from "../../form/inputField";
import FAQPasswordModal from "./PasswordModal";
import Switch from "react-switch";
import MoreDetails from "./MoreDetails";
import useDisplayToggle from "../../useDisplayToggle";


const AddFaqModal = ({
  addFaqShow,
  handleAddFaqClose,
  type,
  faqTab,
  faqSidebarTab,
  action,
  faqData,
  faqId,
  setReload,
  reload,
}) => {
  console.log(action, "adsasd");
  const [detailsShow, setDetailsShow] = useState(false);

  const [statusValue, setStatusValue] = useState(false);     

  useEffect(() => {
    setStatusValue(faqData?.status === "Active" ? true : false);
  }, [faqData]);

  const handleStatusChange = () => {
    setStatusValue(!statusValue);
  };

  console.log(statusValue,"statusValue");

  const [statusChangeShow, setstatusChangeShowShow] = useState(false);
  const handleStatusChangeClose = () => setstatusChangeShowShow(false);
  const handleStatusChangeShow = () => setstatusChangeShowShow(true);

  const [faqPasswordModal, setFaqPasswordModal] = useState(false);
  const handleFaqPassWordClose = () => setFaqPasswordModal(false);
  const handleFaqPasswordModal = () => setFaqPasswordModal(true);

  const checkboxOptions = [
    { value: "call_us", label: "Call Us" },
    { value: "submit_feedback", label: "Submit Feedback" },
    { value: "chat_with_us", label: "Chat With Us" },
  ];

  const validationSchema = yup.object({
    question: yup.string().trim().required("This field cannot be left empty*"),
    answer: yup.string().trim().required("This field cannot be left empty*"),
    faqfeatures: yup.object().shape({
      call_us: yup.boolean(),
      submit_feedback: yup.boolean(),
      chat_with_us: yup.boolean(),
      altleastOne: yup
        .boolean()
        .when(["call_us", "submit_feedback", "chat_with_us"], {
          is: (call_us, submit_feedback, chat_with_us) =>
            !call_us && !submit_feedback && !chat_with_us,
          then: yup.boolean().required("Atleast one is required"),
          otherwise: yup.boolean(),
        }),
    }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: faqData?.question_title ?? "",
      answer: faqData?.question_answer ?? "",
      faqfeatures: {
        call_us: faqData?.faq_features?.CallUs === true ? true : false,
        submit_feedback:
          faqData?.faq_features?.ChatWithUs === true ? true : false,
        chat_with_us:
          faqData?.faq_features?.SubmitAFeedback === true ? true : false,
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleFaqPasswordModal();
    },
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const status = faqData?.status === "Active" ? true : false;
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values) ||
      status !== statusValue
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik.values, statusValue, faqData]);

  console.log(disabled, "xzcxczx");

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsShow,
  });
  return (
    <>
      <FAQPasswordModal
        faqPasswordModal={faqPasswordModal}
        handleFaqPassWordClose={handleFaqPassWordClose}
        formik={formik}
        title={
          action === "editTopic" || action === "edit"
            ? "Are you sure you want to update changes?"
            : "Add New FAQ-Troubleshooting Issues"
        }
        type={type}
        faqTab={faqTab}
        faqSidebarTab={faqSidebarTab}
        action={action}
        handleAddFaqClose={handleAddFaqClose}
        faqData={action === "Faq" ? {} : faqData}
        faqId={faqId}
        setReload={setReload}
        reload={reload}
        statusValue={statusValue}
      />
      <Modal
        centered
        show={addFaqShow}
        onHide={handleAddFaqClose}
        size="large"
        dialogClassName="add_faq_modal"
        contentClassName={`border_radius_15px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body onHide>
          <ModalHeading
            title={
              action === "createTopicFaq" || action === "Faq"
                ? "Add New FAQ - Troubleshooting Issues"
                : action === "view" || action === "edit"
                ? faqData?.faq_code + " - " + faqData?.question_title
                : action === "viewTopic" || action === "editTopic"
                ? faqData?.faq_issue_code + " - " + faqData?.question_title
                : ""
            }
            closeFn={() => {
              handleAddFaqClose();
            }}
            statusShow={false}
          />
          <div className="d-flex justify-content-center py-3">
            <div className="col-11">
              <div className=" d-flex justify-content-end">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {/* <div className="d-flex align-items-center">
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
                      offColor="#F60003"
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
                      disabled={action === "view" || action === "viewTopic"}
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
                  </div> */}
                </div>
              </div>

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="mt-3">
                  <div className=" d-flex">
                    <div className="col-4">
                      <label>FAQ ID</label>
                    </div>
                    <div className="col-8">
                      <div>
                        <span className="primary_color fs_16 fw_500">
                          {faqData?.faq_code ?? faqData?.faq_issue_code ?? "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {action === "Faq" || action === "createTopicFaq" ? null : (
                    <div className="text-end" ref={insideClickRef}>
                      {detailsShow ? (
                        <div className="more_details_card details_containers">
                          <MoreDetails faqData={faqData} />
                        </div>
                      ) : null}
                      <span
                        className="blue_color fs_15 fw_400 text_underline cursor_pointer"
                        onClick={() => {
                          setDetailsShow(!detailsShow);
                        }}
                        ref={onClickRef}
                      >
                        Details
                      </span>
                    </div>
                  )}

                  <InputField
                    labelName={"Question Title*"}
                    itemName={"question"}
                    type={"text"}
                    id={"question"}
                    placeholder={"Enter question"}
                    name={"question"}
                    disabled={action === "view" || action === "viewTopic"}
                    inputValue={formik.values?.question}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.question}
                    formikTouched={formik.touched.question}
                  />
                  <InputField
                    labelName={"Answer*"}
                    itemName={"answer"}
                    type={"text"}
                    id={"answer"}
                    placeholder={"Enter answer"}
                    name={"answer"}
                    input={false}
                    TextArea={true}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.answer}
                    formikTouched={formik.touched.answer}
                    inputValue={formik.values?.answer}
                    disabled={action === "view" || action === "viewTopic"}
                  />
                </div>
                <div className="d-flex mt-4">
                  <div className="col-4">
                    <div className="fs_15"> FAQ Features*</div>
                  </div>
                  <div className="col-8">
                    <div>
                      {checkboxOptions?.map((option, index) => (
                        <div
                          className={`${index === 0 && ""} text-nowrap`}
                          key={option.value}
                        >
                          <input
                            type="checkbox"
                            id={option.value}
                            name={option.value}
                            onChange={() => {
                              formik.setFieldValue("faqfeatures", {
                                ...formik.values.faqfeatures,
                                [option.value]:
                                  !formik.values.faqfeatures[option.value],
                              });
                            }}
                            checked={formik.values.faqfeatures[option.value]}
                            disabled={
                              action === "view" || action === "viewTopic"
                            }
                          />
                          <label
                            className="ps-2 fs_16 fw_500 primary_color text-nowrap"
                            htmlFor={option.value}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                      <div>
                        {formik.errors.faqfeatures &&
                          formik.touched.faqfeatures && (
                            <span className="dark_red_color mt-2 fs_14">
                              {formik.errors.faqfeatures?.altleastOne}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                {action === "view" || action === "viewTopic" ? null : (
                  <div className=" d-flex justify-content-center mt-4">
                    {action === "edit" || action === "editTopic" ? (
                      <>
                        <Cancelbtn
                          is_icon={false}
                          button_title="Undo Changes"
                          cancelFn={() => {
                            formik.resetForm();
                            setStatusValue(
                              faqData?.status === "Active" ? true : false
                            );
                          }}
                        />
                        <Savebtn
                          disabled={disabled}
                          btnClassName={
                            disabled
                              ? "light_grey_bg px-5"
                              : "light_green_bg px-5"
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Cancelbtn
                          is_border_color="error_border_dark "
                          is_color="red_color"
                          is_icon_color="red_color"
                          cancelFn={() => {
                            handleAddFaqClose();
                            formik.resetForm();
                          }}
                        />
                        <Savebtn
                          disabled={disabled}
                          btnClassName={
                            disabled
                              ? "light_grey_bg px-5"
                              : "light_green_bg px-5"
                          }
                        />
                      </>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddFaqModal;
