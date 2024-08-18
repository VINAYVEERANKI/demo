import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchInputfield from "../../form/searchInputfield";
import { useDispatch } from "react-redux";
import * as pendApplicantAction from "../../../redux/actions/pendApplicantAction";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import TablePaginations from "../../utilits/pagination";
import moment from "moment";
import {
  applicationAge,
  removeUnderScore,
  useSortableData,
} from "../../helper";
import ViewNotificationModal from "../manageDriverModals/view-notification-modal";
import usePermissions from "../../usePermissionChecker";
import { pendDropdownListAction } from "../../../redux/actions/manageDriversAction";
import DriverFilter from "../manageDriversFilter/driverFilters";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const PendingApplicationTable = ({ type = "" }) => {
  const { canRead, canWrite } = usePermissions();
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }
  const [applicantData, setApplicantData] = useState({});
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [driverDropDownList, setDriverDropDownList] = useState({});

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const handleSearch = (value) => {
    setNumberOfFilters(0);
    setSearch(value);
    for (let key in value) {
      if (value[key]) {
        setNumberOfFilters((prev) => prev + 1);
      }
    }

    setPage(0);
  };
  useEffect(() => {
    setLoading(true);
    dispatch(
      pendApplicantAction.pendingApplicationListAction(
        {
          search: {
            driver_id2: search.driver_id2,
            first_name: search.first_name,
            application_id: search.application_id,
            last_name: search.last_name,
            phone_number: search.phone_number,
            registered_zone: search?.registered_zone,
            created_at: "",
            updated_by: search.updatedBy,
            doc_status: search.doc_status,
            doc_details: search.doc_details,
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search]);
  const onSuccess = (data) => {
    setPendingList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const current_user = localStorage.getItem("id");
  const [messageShow, setMessageShow] = useState(false);
  const handleMessageClose = () => setMessageShow(false);
  const handleMessageShow = () => setMessageShow(true);
  const { items, requestSort, sortConfig } = useSortableData(pendingList);

  const tableHeading = [
    { title: "Driver ID", value: "driver_id2" },
    { title: "First Name", value: "first_name" },
    { title: "Application ID", value: "application_id" },
    { title: "Last Name", value: "last_name" },
    { title: "Phone number", value: "phone_number" },
    { title: "Zone", value: "registered_zone" },
    { title: "Created at", value: "created_at" },
    { title: "Current Admin", value: "updatedBy.user_name" },
    { title: "Details", value: "doc_details" },
    { title: "Status", value: "doc_status" },
  ];

  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList();  /// API call function name
        }}
      >
        <i className="ri-filter-3-line primary_color pe-2" />
        <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
      </button>

      {numberOfFilters === 0 ? (
        <></>
      ) : (
        <div className={`position-relative p-1`}>
          <span
            className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
          >
            {numberOfFilters}
          </span>
        </div>
      )}
    </>
  ];
  const handleFetchDropDownList = () => {
    if (type === "pendApplFilter") {
      dispatch(
        pendDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };
  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    if (type === "pendApplFilter") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId
              ?.map((item) => item.driver_id2)
              ?.filter((driver_id2) => Boolean(driver_id2))
          ),
        ].map((id) => ({ driver_id2: id })),

        phone_number: [
          ...new Set(data?.data?.dropDownDriverPhonenumber?.map((item) => item.phone_number)),
        ].map((phone_number) => ({ phone_number: phone_number })),

        first_name: [
          ...new Set(data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [...new Set(data?.data?.dropDownDriverLastName?.map((item) => item.last_name))].map(
          (last_name) => ({ last_name: last_name })
        ),
        doc_status: [...new Set(data?.data?.dropDownDriverDocStatus?.map((item) => item.doc_status))].map(
          (doc_status) => ({ doc_status: doc_status })
        ),
        doc_details: [...new Set(data?.data?.dropDownDriverDocDetails?.map((item) => item.doc_details))].map(
          (doc_details) => ({ doc_details: doc_details })
        ),
        registered_zone: [...new Set(data?.data?.dropDownZone?.map((item) => item.registered_zone_name?.zone_name))].map(
          (registered_zone) => ({ registered_zone: registered_zone })
        ),
        updated_by: [...new Set(data?.data?.dropDownDriverUpdatedby?.map((item) => item?.updatedBy?.user_name))].map(
          (updated_by) => ({ updated_by: updated_by })
        ),
      });
    }
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  return (
    <>
      <ViewNotificationModal
        messageShow={messageShow}
        handleMessageClose={handleMessageClose}
        item={applicantData}
      />
      <div className="manage_driver_container  p-3 pb-4 mx-3 my-4">
        <div className="mx-3 d-sm-flex justify-content-between mt-3">
          <span className="primary_color fs_26 fw_600 ">
            Pending Applications
          </span>
          {/* <div className="d-flex align-items-center">
            <button
              className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
              type="button"
              onClick={() => setShowFilter(!showFilter)}
            >
              <i className="ri-filter-3-line primary_color pe-2" />
              <span className={`fs_14 fw_600 primary_color ps-1`}>
                Add Filter
              </span>
            </button>
            {numberOfFilters === 0 ? (
              <></>
            ) : (
              <div className={`position-relative p-1`}>
                <span
                  className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
                >
                  {numberOfFilters}
                </span>
              </div>
            )}
          </div> */}
          <div className="d-flex align-items-center">{buttonList}</div>
        </div>
        {showFilter ? (
          <DriverFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            driverDropDownList={driverDropDownList}
            type={type}
            setShowFilter={setShowFilter}
          />
        ) : (
          <></>
        )}
        <div className="row mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table  ">
              <thead>
                <tr className="pale_blue_bg text-nowrap">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>
                  {tableHeading.map((item, index) => {
                    const isActiveSortIndex = activeSortIndex === index;
                    return (
                      <SearchInputfield
                        title={item?.title}
                        requestSort={requestSort}
                        sortName={item?.value}
                        key={item?.title}
                        index={index}
                        isActiveSortIndex={isActiveSortIndex}
                        setActiveSortIndex={setActiveSortIndex}
                        sortConfig={sortConfig}
                      />
                    );
                  })}

                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg ">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={pendingList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr
                      key={item?.id}
                      className={
                        item?.id === checkList ? "light_blue_bg" : null
                      }
                    >
                      <th scope="row">
                        <input
                          id={item?.id}
                          type="checkbox"
                          checked={checkList === item?.id}
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.driver_id2 ? item?.driver_id2 : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.first_name ? item?.first_name : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.application_id ? item?.application_id : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.last_name ? item?.last_name : "--"}
                        </span>
                      </td>

                      <td className="secondary_color fw_500 fs_14">
                        {item?.phone_number ? item?.phone_number : "--"}
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.registered_zone_name?.zone_name ?? "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.created_at
                            ? applicationAge(
                              moment(item?.created_at).format(
                                "YYYY-MM-DDTHH:mm:ss.SSSZ"
                              )
                            )
                            : "--"}{" "}
                          days
                        </span>
                      </td>
                      <td className="secondary_color fw_500 fs_14">
                        {item?.updatedBy?.user_name
                          ? item?.updatedBy.user_name
                          : "--"}
                      </td>
                      <td className="text-nowrap">
                        <span
                          className={
                            item?.doc_status === "Re_approval"
                              ? "purple_color fw_600 fs_14"
                              : "orange_color fw_500 fs_14"
                          }
                        >
                          {item?.doc_status
                            ? removeUnderScore(item?.doc_status)
                            : "--"}
                        </span>
                      </td>
                      <td
                        className={
                          item?.doc_details === "Complete"
                            ? "green_color fw_500 fs_14"
                            : "red_color fw_500 fs_14"
                        }
                      >
                        {item?.doc_details ? item?.doc_details : "--"}
                      </td>

                      <td className="">
                        <span className="d-flex">
                          {current_user === item?.updated_by ||
                            item?.updated_by === "" ||
                            item?.updated_by === null ||
                            (canRead("pending_application") === true &&
                              canWrite("pending_application") === false) ? (
                            <NavLink
                              className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                              to={`driver-rideHistory/${item?.id}`}
                              state={{
                                id: item?.id,
                              }}
                            >
                              View
                            </NavLink>
                          ) : (
                            <button
                              className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                              onClick={() => {
                                handleMessageShow();
                                setApplicantData(item);
                              }}
                            >
                              View
                            </button>
                          )}

                          {canWrite("pending_application") &&
                            (current_user === item?.updatedBy?.id ||
                              item?.updatedBy === null) && (
                              <NavLink
                                className="border_none border_radius text-decoration-none primary_bg white_color fs_13 py-1 px-3 view_text"
                                to={`driver-rideHistory/${item?.id}`}
                                state={{
                                  id: item?.id,
                                  edit: true,
                                }}
                              >
                                Edit
                              </NavLink>
                            )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
          <TablePaginations
            paginate={handlePagination}
            currentPage={page}
            pageData={pageData}
          />
        </div>
      </div>
    </>
  );
};

export default PendingApplicationTable;
