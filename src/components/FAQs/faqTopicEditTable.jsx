import React, { useEffect, useState } from "react";
import { formatDateTime, insertSpaceUnderScore, statusColor, useSortableData } from "../helper";
import InnerLayout from "../layout/innerLayout";
import Switch from "react-switch";
import { NavLink } from "react-bootstrap";
import SearchInputfield from "../form/searchInputfield";
import LoadAndError from "../utilits/loadAndError";
import UpdatedChangesModal from "./faqs-modal/updateChangesModal";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  EditFaqOrTopicAction,
  activeFaqOrTopicAction,
  inActiveFaqOrTopicAction,
  topicUnderFaqRiderListAction,
  topicUnderFaqdriverListAction,
  viewTopicUnderFaqAction,
} from "../../redux/actions/faq/faqAction";
import SpinnerLoading from "../utilits/spinnerLoading";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import AddFaqModal from "./faqs-modal/AddFaq";
import FAQPasswordModal from "./faqs-modal/PasswordModal";

const FaqTopicEditTable = ({ params, location }) => {
  const userType = params?.userType;
  // const mainType = params?.mainType;
  // const subType = params?.type;
  const id = params?.id;
  const is_editable = location?.state?.edit;
  console.log(userType,"usertypefaq");

  const dispatch = useDispatch();
  const [titleEditable, setTitleEditable] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const { items, requestSort, sortConfig } = useSortableData(faqList);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [action, setAction] = useState("");
  const [checked, setChecked] = useState(false);
  const [statusChange, setStatusChange] = useState(true);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [toipcTitleValue, setToipcTitleValue] = useState("");
  const [topicDisabled, setTopicDisabled] = useState(false);
  useEffect(() => {
    setToipcTitleValue(faqData?.title);
  }, [faqData?.title]);

  useEffect(() => {
    if (faqData?.title !== toipcTitleValue) {
      setTopicDisabled(true);
    } else {
      setTopicDisabled(false);
    }
  }, [toipcTitleValue]);

  const [statusValue, setStatusValue] = useState(null);
  useEffect(() => {
    setStatusValue(faqData?.status === "Active" ? true : false);
  }, [faqData]);
  const [statusChangeShow, setstatusChangeShowShow] = useState(false);
  const handleStatusChangeClose = () => setstatusChangeShowShow(false);
  const handleStatusChangeShow = () => setstatusChangeShowShow(true);

  const [faqPasswordModal, setFaqPasswordModal] = useState(false);
  const handleFaqPassWordClose = () => setFaqPasswordModal(false);
  const handleFaqPasswordModal = () => setFaqPasswordModal(true);

  const [addFaqShow, setAddFaqShow] = useState(false);
  const handleAddFaqClose = () => setAddFaqShow(false);
  const handleAddFaqShow = () => setAddFaqShow(true);

  const [reload, setReload] = useState(false);

  const [faqId, setFaqId] = useState("");
  const handleEdit = () => {
    setTitleEditable(true);
    setError("");
  };

  const handleSave = () => {
    if (toipcTitleValue.trim() === "") {
      setError("Field cannot be empty");
      setTitleEditable(true);
    } else {
      handleFaqPasswordModal();
    }
  };
  const handleChange = (e) => {
    setToipcTitleValue(e.target.value);
    setError("");
  };

  const tableHeading = [
    { title: "ID", value: "faq_issue_code" },
    { title: "Type", value: "faq_main_type" },
    { title: "Title", value: "question_title" },
    { title: "Status", value: "status" },
    { title: "Created At", value: "created_at" },
  ];

  console.log(faqList, "gsdvewghwdvewgh");

  useEffect(() => {
    if (userType === "Rider") {
      setFetchLoading(true);
      dispatch(
        topicUnderFaqRiderListAction(
          {
            topic_id: id,
            search: {
              faq_code: "",
              title: "",
              status: "",
              created_at: "",
              created_by: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (userType === "Driver") {
      setFetchLoading(true);
      dispatch(
        topicUnderFaqdriverListAction(
          {
            topic_id: id,
            search: {
              faq_code: "",
              title: "",
              status: "",
              created_at: "",
              created_by: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, reload]);

  const onSuccess = (data) => {
    setFetchLoading(false);
    setFaqList(data?.data?.data?.faq_issues);
    setFaqData(data?.data?.data);
    console.log(data?.data?.data, "sdasddsd");
    setPageData({
      noOfItems: data.data.count,
      noOfPages: data.data.pages,
    });
  };
  const onError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  const [topicUbderFaqData, setTopicUbderFaqData] = useState([]);

  function viewFn(id, action) {
    dispatch(
      viewTopicUnderFaqAction(
        {
          topic_id: faqData?.id,
          topic_under_faq_id: id,
        },
        (data) => onFetchSuccess(data, action),
        onFetchError
      )
    );
  }

  const onFetchSuccess = (data, action) => {
    setAction(action);
    setTopicUbderFaqData(data?.data);
    handleAddFaqShow();
    console.log(data?.data, "adsda");
  };
  const onFetchError = (data) => {
    console.log(data);
  };

  const handleStatusChange = () => {
    setStatusValue(!statusValue);
  };

  return (
    <>
      <FAQPasswordModal
        faqPasswordModal={faqPasswordModal}
        handleFaqPassWordClose={handleFaqPassWordClose}
        title={
          action === "FaqTopicEdit"
            ? "Are you sure you want to update changes?"
            : "Are you sure you want to delete this FAQ?"
        }
        faqId={faqId}
        mainfaqId={faqData?.id}
        action={action}
        setReload={setReload}
        reload={reload}
        toipcTitleValue={toipcTitleValue}
        setTitleEditable={setTitleEditable}
        titleEditable={titleEditable}
      />
      <AddFaqModal
        addFaqShow={addFaqShow}
        handleAddFaqClose={handleAddFaqClose}
        faqData={action === "createTopicFaq" ? {} : topicUbderFaqData}
        action={action}
        faqId={faqData?.id}
        setReload={setReload}
        reload={reload}
      />
      <UpdatedChangesModal
        statusChangeShow={statusChangeShow}
        handleStatusChangeClose={handleStatusChangeClose}
        handleStatusChange={handleStatusChange}
        setStatusValue={setStatusValue}
        statusValue={statusValue}
        faqData={faqData}
      />
      <InnerLayout
        mainHeading={`${faqData?.faq_type ? insertSpaceUnderScore(faqData?.faq_type) : "--"} - ${faqData?.title ?? "--"}`}
        navigateEnable={true}
        backBtnClassName=""
      >
        {fetchLoading ? (
          <>
            <LoadingSpinnerTable />
          </>
        ) : (
          <div className="">
            <div className=" d-flex justify-content-end">
              {statusChange ? (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <div className="d-flex align-items-center me-2">
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
                      onChange={handleStatusChangeShow}
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
                      width={43}
                      className="react-switch"
                      id="material-switch"
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
            <div>
              <span className="disabled_color fs_16">Topic ID</span>
              <span className="ms-4 ps-3 primary_color fs_16 fw_500">
                {faqData?.faq_code}
              </span>
            </div>
            <div className={`d-flex justify-content-between me-3 pt-2`}>
              <div className="d-flex align-items-center">
                <span className="disabled_color fs_16">Topic Title</span>
                <div className="ms-4 primary_color ">
                  {titleEditable ? (
                    <>
                      <input
                        className="border_radius_5px outline_none fs_16 fw_500 default_border p-1"
                        type="text"
                        value={toipcTitleValue}
                        onChange={(e) => handleChange(e)}
                      />
                    </>
                  ) : (
                    <span className="">{toipcTitleValue}</span>
                  )}
                  {titleEditable ? (
                    <span className="ps-4">
                      <button
                        className=" border_radius white_bg red_color error_border fw_500 fs_16 px-2 me-2"
                        onClick={() => {
                          setToipcTitleValue(faqData?.title);
                          setTitleEditable(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className={`border_none border_radius ${
                          topicDisabled ? "green_color_bg" : "light_grey_bg"
                        }  white_color fw_500 fs_16 px-3`}
                        onClick={() => {
                          setAction("FaqTopicEdit");
                          handleSave();
                        }}
                        disabled={topicDisabled === false}
                      >
                        Save
                      </button>
                    </span>
                  ) : (
                    <span className="ps-4">
                      {is_editable === true && (
                        <button
                          className="border_none border_radius primary_bg white_color fw_500 fs_16 px-3 "
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      )}
                    </span>
                  )}
                </div>
                <div>
                  {error && (
                    <span className=" d-flex justify-content-center fs_12 fw_600 red_color">
                      {error}
                    </span>
                  )}
                </div>
              </div>
              {is_editable === true && (
                <button
                  className="tertiary_bg border_none fw_500 border_radius px-3 py-1"
                  onClick={() => {
                    setAction("createTopicFaq");
                    handleAddFaqShow();
                  }}
                >
                  <span className="fs_20">+</span> Add New FAQ
                </button>
              )}
            </div>
            <div className="row mt-4">
              <div className="col-12 table_container">
                <table className="table text-nowrap">
                  <thead>
                    <tr className="pale_blue_bg">
                      {tableHeading.map((item, index) => {
                        const isActiveSortIndex = activeSortIndex === index;
                        return (
                          <SearchInputfield
                            title={item?.title}
                            requestSort={requestSort}
                            sortName={item?.value}
                            key={item?.title}
                            index={index}
                            table_border_radius={index === 0 && "first_list"}
                            isActiveSortIndex={isActiveSortIndex}
                            setActiveSortIndex={setActiveSortIndex}
                            sortConfig={sortConfig}
                          />
                        );
                      })}

                      <th className={`${styles.last_list} transparent_bg`}></th>
                    </tr>
                  </thead>
                  <tbody className="light_blue_bg">
                    <LoadAndError
                      loader={fetchLoading}
                      status={faqList?.length === 0}
                    >
                      {items?.map((item) => (
                        <tr>
                          {" "}
                          <td className="secondary_color fw_500 fs_14">
                            {item?.faq_issue_code ?? "--"}
                          </td>
                          <td className="secondary_color fw_500 fs_14">
                            {faqData?.faq_main_type ?? "--"}
                          </td>
                          <td className="secondary_color fw_500 fs_14">
                            {item?.question_title ?? "--"}
                          </td>
                          <td
                            className={`${statusColor(
                              item?.status
                            )}  fw_500 fs_14`}
                          >
                            {item?.status ?? "--"}
                          </td>
                          <td className={`primary_color  fw_500 fs_14`}>
                            {formatDateTime(item?.created_at)}
                          </td>
                          <td className="">
                            <span className="d-flex">
                              <>
                                <button
                                  className="border_none border_radius fs_16 me-4 text-decoration-none fw_500 px-3 white_color blue_color_bg"
                                  onClick={() => {
                                    // setAction("view");
                                    viewFn(item?.id, "viewTopic");
                                  }}
                                >
                                  view
                                </button>
                                {is_editable === true && (
                                  <button
                                    className="border_none border_radius text-decoration-none primary_bg white_color fs_16 px-3 view_text"
                                    onClick={() => {
                                      // setAction("edit");
                                      viewFn(item?.id, "editTopic");
                                    }}
                                  >
                                    edit
                                  </button>
                                )}
                              </>
                              {is_editable === true && (
                                <button
                                  className="border_radius  delete_button red_border red_color fs_13 px-2  ms-4"
                                  onClick={() => {
                                    setFaqId(item?.id);
                                    setAction("deleteTopic");
                                    handleFaqPasswordModal();
                                  }}
                                >
                                  Delete{" "}
                                </button>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </LoadAndError>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default FaqTopicEditTable;
