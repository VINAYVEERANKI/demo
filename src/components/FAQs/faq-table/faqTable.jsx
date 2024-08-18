import React, { useEffect, useState } from "react";
import { statusColor, useSortableData } from "../../helper";
import SearchInputfield from "../../form/searchInputfield";
import LoadAndError from "../../utilits/loadAndError";
import {
  riderFaqHelpCovidFindAllAction,
  riderFaqHelpProfileAccountFindAllAction,
} from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import errorToast from "../../utilits/errorToast";
import { useDispatch } from "react-redux";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { formatDateTime } from "../../helper";
import { riderFaqHelpPaymentFindAllAction } from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import { riderFaqHelpSafetyFindAllAction } from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import { riderFaqHelpMyTripsFindAllAction } from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import { riderFaqHelpTroubleshootFindAllAction } from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import { riderFaqHelpGuideToComrideFindAllAction } from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import { riderFaqHelpReferalFindAllAction } from "../../../redux/actions/faq/riderFaq/riderFaqHelpAction";
import {
  riderFaqDuringTripLocalFindAllAction,
  riderFaqDuringTripOneWayFindAllAction,
  riderFaqDuringTripRentalFindAllAction,
  riderFaqDuringTripRoundFindAllAction,
} from "../../../redux/actions/faq/riderFaq/riderFaqDuringTripAction";
import * as riderFaqAfterTripAction from "../../../redux/actions/faq/riderFaq/riderFaqAfterTripAction";
import {
  driverFaqHelpCancelPolicyFindAllAction,
  driverFaqHelpComrideServiceFindAllAction,
  driverFaqHelpCovidFindAllAction,
  driverFaqHelpGuideToComrideFindAllAction,
  driverFaqHelpMyAccountFindAllAction,
  driverFaqHelpPaymentFindAllAction,
  driverFaqHelpReferalFindAllAction,
  driverFaqHelpSafetyFindAllAction,
} from "../../../redux/actions/faq/driverFaq/driverFaqHelpAction";
import {
  driverFaqDuringTripLocalFindAllAction,
  driverFaqDuringTripOneWayFindAllAction,
  driverFaqDuringTripRentalFindAllAction,
  driverFaqDuringTripRoundFindAllAction,
} from "../../../redux/actions/faq/driverFaq/driverFaqDuringTripAction";
import { NavLink } from "react-router-dom";
import AddFaqModal from "../faqs-modal/AddFaq";
import { ViewFaqOrTopicAction } from "../../../redux/actions/faq/faqAction";
import FAQPasswordModal from "../faqs-modal/PasswordModal";
import usePermissions from "../../usePermissionChecker";

const FaqTable = ({ mainType, type, faqType, reload, setReload }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    Rider: "rider_faq",
    Driver: "driver_faq",
  };

  const permission = pagePermissions[faqType];

  console.log(faqType, "aksdjadsjd");
  console.log(canWrite(permission), "jhchjcjhcjh");

  const dispatch = useDispatch();
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [error, setError] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [loading, setLoading] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [page, setPage] = useState(0);

  const { items, requestSort, sortConfig } = useSortableData(faqList);

  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const tableHeading = [
    { title: "ID", value: "faq_code" },
    { title: "Type", value: "faq_main_type" },
    { title: "Title", value: "question_title" },
    { title: "Status", value: "status" },
    { title: "Created At", value: "created_at" },
  ];

  const [addFaqShow, setAddFaqShow] = useState(false);
  const handleAddFaqClose = () => setAddFaqShow(false);
  const handleAddFaqShow = () => setAddFaqShow(true);
  const [faqId, setFaqId] = useState("");

  console.log(faqList, "adasdadd");

  useEffect(() => {
    const searchData = {
      search: {
        faq_code: "",
        faq_main_type: "",
        title: "",
        status: "",
        created_at: "",
      },
    };
    if (faqType === "Rider") {
      if (mainType === "Help") {
        if (type === "Covid_19") {
          setLoading(true);
          dispatch(
            riderFaqHelpCovidFindAllAction(searchData, page, onSuccess, onError)
          );
        } else if (type === "Profile_account") {
          setLoading(true);
          dispatch(
            riderFaqHelpProfileAccountFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Payment_fare_charges") {
          setLoading(true);
          dispatch(
            riderFaqHelpPaymentFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Safety") {
          setLoading(true);
          dispatch(
            riderFaqHelpSafetyFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "My_trips") {
          setLoading(true);
          dispatch(
            riderFaqHelpMyTripsFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Troubleshoot") {
          setLoading(true);
          dispatch(
            riderFaqHelpTroubleshootFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Guide_to_comride") {
          setLoading(true);
          dispatch(
            riderFaqHelpGuideToComrideFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Referral") {
          setLoading(true);
          dispatch(
            riderFaqHelpReferalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        }
      } else if (mainType === "During_trip") {
        if (type === "LocalTrip") {
          setLoading(true);
          dispatch(
            riderFaqDuringTripLocalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "RentalTrip") {
          setLoading(true);
          dispatch(
            riderFaqDuringTripRentalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "OneWayOutstation") {
          setLoading(true);
          dispatch(
            riderFaqDuringTripOneWayFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "RoundTripOutstation") {
          setLoading(true);
          dispatch(
            riderFaqDuringTripRoundFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        }
      } else if (mainType === "After_trip") {
        if (type === "LocalTrip") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripLocalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "RentalTrip") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripRentalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "OneWayOutstation") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripOnewayFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "RoundTripOutstation") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripRoundFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "paymentLocal") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripPaymentLocalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "paymentRental") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripPayRentFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "paymentOneWayOutstation") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripPayOnewayFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "paymentRoundOutstation") {
          setLoading(true);
          dispatch(
            riderFaqAfterTripAction.riderFaqAfterTripPayRoundFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        }
      }
    } else if (faqType === "Driver") {
      if (mainType === "Help") {
        if (type === "My_account") {
          setLoading(true);
          dispatch(
            driverFaqHelpMyAccountFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Guide_to_comride") {
          setLoading(true);
          dispatch(
            driverFaqHelpGuideToComrideFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Payment_fare_charges") {
          setLoading(true);
          dispatch(
            driverFaqHelpPaymentFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Safety") {
          setLoading(true);
          dispatch(
            driverFaqHelpSafetyFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Comride_service") {
          setLoading(true);
          dispatch(
            driverFaqHelpComrideServiceFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Referral") {
          setLoading(true);
          dispatch(
            driverFaqHelpReferalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Covid_19") {
          setLoading(true);
          dispatch(
            driverFaqHelpCovidFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "Cancellation_policy") {
          setLoading(true);
          dispatch(
            driverFaqHelpCancelPolicyFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        }
      } else if (mainType === "During_trip") {
        if (type === "LocalTrip") {
          setLoading(true);
          dispatch(
            driverFaqDuringTripLocalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "RentalTrip") {
          setLoading(true);
          dispatch(
            driverFaqDuringTripRentalFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "OneWayOutstation") {
          setLoading(true);
          dispatch(
            driverFaqDuringTripOneWayFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        } else if (type === "RoundTripOutstation") {
          setLoading(true);
          dispatch(
            driverFaqDuringTripRoundFindAllAction(
              searchData,
              page,
              onSuccess,
              onError
            )
          );
        }
      }
    }
  }, [page, search, type, reload, mainType, faqType]);

  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    setFaqList(data.data.data);
    setPageData({
      noOfItems: data.data.count,
      noOfPages: data.data.pages,
    });
  };
  const onError = (data) => {
    errorToast(data.data.data);
    setError(true);
    setLoading(false);
    setErrorMessage(data?.data?.data);
  };
  console.log(faqList);

  const [faqData, setFaqData] = useState([]);
  const [action, setAction] = useState("");

  function viewFn(id, action) {
    dispatch(
      ViewFaqOrTopicAction(
        {
          topicOrfaq_id: id,
        },
        (data) => onFetchSuccess(data, action),
        onFetchError
      )
    );
  }

  const onFetchSuccess = (data, action) => {
    setAction(action);
    setFaqData(data?.data);
    handleAddFaqShow();
    console.log(data?.data, "adsda");
  };
  const onFetchError = (data) => {
    console.log(data);
  };

  const [faqPasswordModal, setFaqPasswordModal] = useState(false);
  const handleFaqPassWordClose = () => setFaqPasswordModal(false);
  const handleFaqPasswordModal = () => setFaqPasswordModal(true);

  console.log(faqId, "asasas");

  return (
    <>
      <AddFaqModal
        addFaqShow={addFaqShow}
        handleAddFaqClose={handleAddFaqClose}
        type={type}
        faqData={faqData}
        action={action}
        setReload={setReload}
        reload={reload}
      />
      <FAQPasswordModal
        faqPasswordModal={faqPasswordModal}
        handleFaqPassWordClose={handleFaqPassWordClose}
        title={
          faqId?.faq_main_type === "Faq"
            ? "Are you sure you want to delete this FAQ?"
            : "Are you sure you want to delete this Topic?"
        }
        faqId={faqId}
        action={action}
        setReload={setReload}
        reload={reload}
      />
      <div className="row mt-3">
        {loading && <LoadingSpinnerTable />}
        <div className="col-md-12 table_container">
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
                loader={loading}
                error={error}
                status={faqList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => (
                  <tr>
                    {" "}
                    <td className="secondary_color fw_500 fs_14">
                      {item?.faq_code ?? "--"}
                    </td>
                    <td className="secondary_color fw_500 fs_14">
                      {item?.faq_main_type ?? "--"}
                    </td>
                    <td className="secondary_color fw_500 fs_14">
                      {item?.title ?? item?.question_title ?? "--"}
                    </td>
                    <td
                      className={`${statusColor(item?.status)}  fw_500 fs_14`}
                    >
                      {item?.status ?? "--"}
                    </td>
                    <td className={`primary_color  fw_500 fs_14`}>
                      {formatDateTime(item?.created_at)}
                    </td>
                    <td className="">
                      <span className="d-flex">
                        {item?.faq_main_type === "Faq" ? (
                          <>
                            <button
                              className="border_none border_radius fs_14 me-4  fw_500 px-3 py-1 white_color blue_color_bg "
                              onClick={() => {
                                viewFn(item?.id, "view");
                              }}
                            >
                              View
                            </button>{" "}
                            {
                              canWrite(permission) && (
                                <button
                                  className="border_none border_radius fs_14  fw_500 px-3 py-1 white_color primary_bg "
                                  onClick={() => {
                                    viewFn(item?.id, "edit");
                                  }}
                                >
                                  Edit
                                </button>
                              )}
                          </>
                        ) : (
                          <>
                            <NavLink
                              className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                              to={`/rider-faq/topic/${item?.user_type}/${item?.faq_type}/${item?.faq_help_inner_type}/view/${item?.id}`}
                              state={{
                                faqType: item?.faq_type,
                                title: item?.title,
                                edit: false,
                              }}
                            >
                              View
                            </NavLink>
                            {
                              canWrite(permission) && (
                                <NavLink
                                  className="border_none border_radius fs_14 text-decoration-none fw_500 px-3 py-1 white_color primary_bg view_text"
                                  to={`/rider-faq/topic/${item?.user_type}/${item?.faq_type}/${item?.faq_help_inner_type}/edit/${item?.id}`}
                                  state={{
                                    faqType: item?.faq_type,
                                    title: item?.title,
                                    edit: true,
                                  }}
                                >
                                  Edit
                                </NavLink>
                              )}
                          </>
                        )}
                        {
                          canWrite(permission) && (
                            <button
                              className="border_radius  delete_button red_border red_color fs_13 px-2  ms-4"
                              onClick={() => {
                                setFaqId(item);
                                setAction("delete");
                                handleFaqPasswordModal();
                              }}
                            >
                              Delete
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
    </>
  );
};

export default FaqTable;
