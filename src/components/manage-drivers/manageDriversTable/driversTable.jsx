import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchInputfield from "../../form/searchInputfield";
import { useDispatch } from "react-redux";
import * as driverAction from "../../../redux/actions/manageDriversAction";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import TablePaginations from "../../utilits/pagination";
import {
  formatAmount,
  formatDateTime,
  insertSpaces,
  removeUnderScore,
  useSortableData,
} from "../../helper";
import InnerLayout from "../../layout/innerLayout";
import { blockedApplicationListAction } from "../../../redux/actions/manageDrivers/blockedApplicantAction";
import { bannedApplicationListAction } from "../../../redux/actions/manageDrivers/bannedApplicantAction";
import { expiredDocumentListAction } from "../../../redux/actions/expiredDocumentAction";
import { rejectedApplicationListAction } from "../../../redux/actions/rejectedApplicantAction";
import moment from "moment";
import {
  deleteDriverListAction,
  permdeleteDriverListAction,
} from "../../../redux/actions/manageDrivers/deletedDriverAction";
import { BalanceStatus } from "../../helper";
import usePermissions from "../../usePermissionChecker";
import RiderFilter from "../../manage-riders/riderFilters";
import Test3 from "../../../modules/test3";
import DriverFilter from "../manageDriversFilter/driverFilters";
import styles from "../../../modules/manage-admins/manage-admins.module.css";

const DriversTable = ({ type = "" }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    manageDrivers: "manage_drivers",
    blockedDrivers: "blocked_driver",
    rejectApplication: "rejected_application",
    bannedApplication: "banned_application",
    expiredDocuments: "expired_documents",
  };
  const permission = pagePermissions[type];
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [driverData, setDriverData] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [driverList, setDriverList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [activeSortIndex, setActiveSortIndex] = useState(null);

  // const items = [{
  //   id: 123,
  //   driver_id2: "driver1",
  //   first_name: "Dhanush",
  //   last_name: "KC",
  //   phone_number: 9879879878,
  //   driver_type: "ragnarak",
  //   driving_license_id: "lic01",
  //   registered_zone_name: {
  //     zone_name: "hyderabad"
  //   },
  //   current_balance: "440",
  //   blocked_at: null,
  //   blockedBy: null,
  //   banned_at: null,
  //   bannedBy: null,
  //   expiring_documents: null,
  //   expired_documents: null,
  //   created_at: null,
  //   rejected_at: null,
  //   rejectedBy: null,
  //   permanently_deleted_on: null,
  //   permanentlyDeletedBy: null,
  //   deleted_at: null,
  //   deletedBy: null,
  // }]

  const { items, requestSort, sortConfig } = useSortableData(driverList);
  const [driverDropDownList, setDriverDropDownList] = useState({});
  // const requestSort = "";
  // const sortConfig = "";

  useEffect(() => {
    if (type === "manageDrivers") {
      setLoading(true);
      dispatch(
        driverAction.driverListAction(
          {
            search: {
              driver_id2: search?.driver_id2,
              first_name: search?.first_name,
              last_name: search?.last_name,
              phone_number: search?.phone_number,
              driver_type: search?.driver_type,
              registered_zone: search?.registered_zone,
              driving_license_id: search?.driving_license_id,
              email: search?.email,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "blockedDrivers") {
      setLoading(true);
      dispatch(
        blockedApplicationListAction(
          {
            search: {
              driver_id2: search?.driver_id2,
              first_name: search?.first_name,
              last_name: search?.last_name,
              registered_zone: search?.registered_zone,
              driving_license_id: search?.driving_license_id,
              phone_number: search?.phone_number,
              blocked_by: search?.blocked_by,
              blocked_at: search?.blocked_at,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "bannedApplication") {
      setLoading(true);
      dispatch(
        bannedApplicationListAction(
          {
            search: {
              driver_id2: search?.driver_id2,
              first_name: search?.first_name,
              last_name: search?.last_name,
              registered_zone: search?.registered_zone,
              driving_license_id: search?.driving_license_id,
              bannedBy: search?.bannedBy,
              banned_at: search?.banned_at,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "expiredDocuments") {
      setLoading(true);
      dispatch(
        expiredDocumentListAction(
          {
            search: {
              driver_id2: search?.driver_id2,
              first_name: search?.first_name,
              last_name: search?.last_name,
              registered_zone: search?.registered_zone,
              phone_number: search?.phone_number,
              driving_license_id: search?.driving_license_id,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "rejectApplication") {
      setLoading(true);
      dispatch(
        rejectedApplicationListAction(
          {
            search: {
              driver_id2: search?.driver_id2 ?? "",
              first_name: search?.first_name ?? "",
              last_name: search?.last_name ?? "",
              phone_number: search?.phone_number ?? "",
              created_at: "",
              registered_zone: search?.registered_zone ?? "",
              driving_license_id: search?.driving_license_id ?? "",
              rejected_at: search?.rejected_at ?? "",
              rejected_by: search?.rejected_by ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "permanentlyDeletedDrivers") {
      setLoading(true);
      dispatch(
        permdeleteDriverListAction(
          {
            search: {
              driver_id2: search?.driver_id2,
              first_name: search?.first_name,
              last_name: search?.last_name,
              account_type: search?.driver_type,
              registered_zone: search?.registered_zone,
              permanently_deleted_on: search?.permanently_deleted_on,
              permanently_deleted_by: search?.permanently_deleted_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "deletedDrivers") {
      setLoading(true);
      dispatch(
        deleteDriverListAction(
          {
            search: {
              driver_id2: search?.driver_id2 ?? "",
              first_name: search?.first_name,
              last_name: search?.last_name,
              phone_number: search?.phone_number,
              driver_type: search?.driver_type,
              registered_zone: search?.registered_zone,
              email: search?.email,
              deleted_at: search?.deleted_at,
              deleted_by: search?.deleted_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, driverData]);

  const onSuccess = (data) => {
    setDriverList(data?.data?.data);
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

  const tableHeading = [
    { title: "Driver ID", value: "driver_id2", display: true },
    { title: "First Name", value: "first_name", display: true },
    { title: "Last Name", value: "last_name", display: true },
    {
      title: "Phone number",
      value: "phone_number",
      display: type === "permanentlyDeletedDrivers" ? false : true,
    },
    {
      title: "Driver type",
      value: "driver_type",
      display:
        type === "manageDrivers" ||
        type === "deletedDrivers" ||
        type === "permanentlyDeletedDrivers"
          ? true
          : false,
    },
    {
      title: "Driving License ID",
      value: "driving_license_id",
      display: type === "permanentlyDeletedDrivers" ? false : true,
    },
    { title: "Zone", value: "registered_zone", display: true },
    {
      title: "Current Balance(₹)",
      value: "current_balance",
      display: type === "manageDrivers" ? true : false,
    },
    {
      title: "Blocked At",
      value: "blocked_at",
      display: type === "blockedDrivers" ? true : false,
    },
    {
      title: "Blocked By",
      value: "blocked_by",
      display: type === "blockedDrivers" ? true : false,
    },
    {
      title: "Created At",
      value: "created_at",
      display: type === "rejectApplication" ? true : false,
    },
    {
      title: "Rejected At",
      value: "rejected_at",
      display: type === "rejectApplication" ? true : false,
    },
    {
      title: "Rejected By",
      value: "rejectedBy.user_name",
      display: type === "rejectApplication" ? true : false,
    },
    {
      title: "Banned At",
      value: "banned_at",
      display: type === "bannedApplication" ? true : false,
    },
    {
      title: "Banned By",
      value: "bannedBy.user_name",
      display: type === "bannedApplication" ? true : false,
    },
    {
      title: "Expiring Documents",
      value: "expiring_documents",
      display: type === "expiredDocuments" ? true : false,
    },
    {
      title: "Expired Documents",
      value: "expired_documents",
      display: type === "expiredDocuments" ? true : false,
    },
    {
      title: "Deleted On",
      value: "deleted_at",
      display: type === "deletedDrivers" ? true : false,
    },
    {
      title: "Deleted By",
      value: "deletedBy.user_name",
      display: type === "deletedDrivers" ? true : false,
    },
    {
      title: "Permanently Deleted on",
      value: "permanently_deleted_on",
      display: type === "permanentlyDeletedDrivers" ? true : false,
    },
    {
      title: "Permanently Deleted By",
      value: "permanentlyDeletedBy?.user_name",
      display: type === "permanentlyDeletedDrivers" ? true : false,
    },
  ];

  const buttonList = [
    // <div className="d-flex align-items-center">
    //   <button
    //     className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
    //     type="button"
    //     onClick={() => setShowFilter(!showFilter)}
    //   >
    //     <i className="ri-filter-3-line primary_color pe-2" />
    //     <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
    //   </button>
    //   {numberOfFilters === 0 ? (
    //     <></>
    //   ) : (
    //     <div className={`position-relative p-1`}>
    //       <span
    //         className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
    //       >
    //         {numberOfFilters}
    //       </span>
    //     </div>
    //   )}
    // </div>
    //   <>
    //   {" "}
    //   <button
    //     className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
    //     type="button"
    //     onClick={() => {
    //       handleFetchDropDownList();
    //     }}
    //   >
    //     <i className="ri-filter-3-line primary_color pe-2" />
    //     <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
    //   </button>
    //   {numberOfFilters === 0 ? (
    //     <></>
    //   ) : (
    //     <div className={`position-relative p-1`}>
    //       <span
    //         className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
    //       >
    //         {numberOfFilters}
    //       </span>
    //     </div>
    //   )}
    // </>
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList(); /// API call function name
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
    </>,
  ];

  const handleFetchDropDownList = () => {
    if (type === "manageDrivers") {
      dispatch(
        driverAction.driverDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "blockedDrivers") {
      dispatch(
        driverAction.blockedDriverDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "deletedDrivers") {
      dispatch(
        driverAction.delDriverDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "bannedApplication") {
      dispatch(
        driverAction.bannedDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "expiredDocuments") {
      dispatch(
        driverAction.expiredDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "rejectApplication") {
      dispatch(
        driverAction.rejectedDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "permanentlyDeletedDrivers") {
      dispatch(
        driverAction.perdelDriverDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    if (type === "manageDrivers") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId?.map((item) => item.driver_id2)
          ),
        ].map((id) => ({ driver_id2: id })),
        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        phone_number: [
          ...new Set(
            data?.data?.dropDownDriverPhonenumber?.map(
              (item) => item.phone_number
            )
          ),
        ].map((phone_number) => ({ phone_number: phone_number })),

        email: [
          ...new Set(
            data?.data?.dropDownDriverEmail?.map((item) => item.email)
          ),
        ].map((email) => ({ email: email })),
        driver_type: [
          ...new Set(
            data?.data?.dropDownDriverType?.map((item) => item.driver_type)
          ),
        ].map((driver_type) => ({ driver_type: driver_type })),
        driving_license_id: [
          ...new Set(
            data?.data?.dropDownDL?.map((item) => item.driving_license_id)
          ),
        ].map((driving_license_id) => ({
          driving_license_id: driving_license_id,
        })),
        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map(
              (item) => item.registered_zone_name?.zone_name
            )
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
        // driver_id2: [
        //   ...new Set(
        //     data?.data
        //       ?.map((item) => item.driver_id2)
        //       ?.filter((driver_id2) => Boolean(driver_id2))
        //   ),
        // ].map((id) => ({ driver_id2: id })),
        // first_name: [
        //   ...new Set(data?.data?.map((item) => item.first_name)),
        // ].map((first_name) => ({ first_name: first_name })),
        // last_name: [...new Set(data?.data?.map((item) => item.last_name))].map(
        //   (last_name) => ({ last_name: last_name })
        // ),
        // email: [...new Set(data?.data?.map((item) => item.email))].map(
        //   (email) => ({ email: email })
        // ),
        // phone_number: [
        //   ...new Set(data?.data?.map((item) => item.phone_number)),
        // ].map((phone_number) => ({ phone_number: phone_number })),
      });
    } else if (type === "blockedDrivers") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId?.map((item) => item.driver_id2)
          ),
        ].map((id) => ({ driver_id2: id })),
        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map(
              (item) => item.registered_zone_name?.zone_name
            )
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
        driving_license_id: [
          ...new Set(
            data?.data?.dropDownDL?.map((item) => item.driving_license_id)
          ),
        ].map((driving_license_id) => ({
          driving_license_id: driving_license_id,
        })),
        blocked_by: [
          ...new Set(
            data?.data?.dropDownDriverBlockedby
              ?.map((item) => item.blockedBy?.user_name)
              ?.filter((blocked_by) => Boolean(blocked_by))
          ),
        ].map((blocked_by) => ({ blocked_by: blocked_by })),
        blocked_at: [
          ...new Set(
            data?.data?.dropDownDriverBlockedAt
              ?.map((item) => item?.blocked_at)
              ?.filter((blocked_at) => Boolean(blocked_at))
          ),
        ].map((blocked_at) => ({
          blocked_at: moment(blocked_at).format("DD-MM-YYYY"),
        })),
      });
    } else if (type === "deletedDrivers") {
      setDriverDropDownList({
        // driver_id2: [...new Set(data?.data?.map((item) => item.driver_id2))].map(
        //   (id) => ({ driver_id2: id })
        // ),
        // driver_id2: [...new Set(data?.data?.dropDownDriverId?.map((item) => item.driver_id2))].map(
        //   (id) => ({ driver_id2: id })
        // ),
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId
              ?.map((item) => item.driver_id2)
              ?.filter((driver_id2) => Boolean(driver_id2))
          ),
        ].map((id) => ({ driver_id2: id })),
        // phone_number: [
        //   ...new Set(data?.data?.dropDownDriverPhonenumber
        //     ?.map((item) => item.phone_number)
        //     ?.filter((phone_number) => Boolean(phone_number))
        //     ),
        // ].map((phone_number) => ({ phone_number: phone_number })),
        phone_number: [
          ...new Set(
            data?.data?.dropDownDriverPhonenumber?.map(
              (item) => item.phone_number
            )
          ),
        ].map((phone_number) => ({ phone_number: phone_number })),

        // phone_number: [
        //   ...new Set(data?.data?.map((item) => item.phone_number)),
        // ].map((phone_number) => ({ phone_number: phone_number })),

        // email:
        // [...new Set(data?.data?.dropDownDL?.map((item) => item.email)),
        // ].map((email) => ({ email: email })
        // ),

        email: [
          ...new Set(data?.data?.dropDownDL?.map((item) => item.email)),
        ].map((email) => ({ email: email })),
        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        // deleted_by: [
        //   ...new Set(
        //     data?.data?.dropDownDriverDeletedby
        //       ?.map((item) => item.deleted_by?.user_name)
        //       ?.filter((deleted_by) => Boolean(deleted_by))
        //   ),
        // ].map((deleted_by) => ({ deleted_by: deleted_by })),
        deleted_by: [
          ...new Set(
            data?.data?.dropDownDriverDeletedby
              ?.map((item) => item.deletedBy?.user_name)
              ?.filter((deleted_by) => Boolean(deleted_by))
          ),
        ].map((deleted_by) => ({ deleted_by: deleted_by })),
        deleted_at: [
          ...new Set(
            data?.data?.dropDownDriverDeleteDate
              ?.map((item) => item.deleted_at)
              ?.filter((deleted_at) => Boolean(deleted_at))
          ),
        ].map((deleted_at) => ({
          deleted_at: moment(deleted_at).format("DD-MM-YYYY"),
        })),
        driver_type: [
          ...new Set(
            data?.data?.dropDownDriverType?.map((item) => item.driver_type)
          ),
        ].map((driver_type) => ({ driver_type: driver_type })),
        driving_license_id: [
          ...new Set(
            data?.data?.dropDownDL?.map((item) => item.driving_license_id)
          ),
        ].map((driving_license_id) => ({
          driving_license_id: driving_license_id,
        })),
        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map((item) => item.registered_zone)
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
      });
    } else if (type === "permanentlyDeletedDrivers") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId
              ?.map((item) => item.driver_id2)
              ?.filter((driver_id2) => Boolean(driver_id2))
          ),
        ].map((id) => ({ driver_id2: id })),

        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        permanently_deleted_by: [
          ...new Set(
            data?.data?.dropDownDriverPermanentlyDeletedby
              ?.map((item) => item?.permanentlyDeletedBy?.user_name)
              ?.filter((permanently_deleted_by) =>
                Boolean(permanently_deleted_by)
              )
          ),
        ].map((permanently_deleted_by) => ({
          permanently_deleted_by: permanently_deleted_by,
        })),
        permanently_deleted_on: [
          ...new Set(
            data?.data?.dropDownDriverDeletedAt
              ?.map((item) => item?.permanently_deleted_on)
              ?.filter((permanently_deleted_on) =>
                Boolean(permanently_deleted_on)
              )
          ),
        ].map((permanently_deleted_on) => ({
          permanently_deleted_on: permanently_deleted_on,
        })),
        driver_type: [
          ...new Set(
            data?.data?.dropDownDriverAccounttype?.map(
              (item) => item.driver_type
            )
          ),
        ].map((driver_type) => ({ driver_type: driver_type })),

        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map((item) => item.registered_zone)
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
      });
    } else if (type === "bannedApplication") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId?.map((item) => item.driver_id2)
          ),
        ].map((driver_id2) => ({ driver_id2: driver_id2 })),
        driving_license_id: [
          ...new Set(
            data?.data?.dropDownDL?.map((item) => item.driving_license_id)
          ),
        ].map((driving_license_id) => ({
          driving_license_id: driving_license_id,
        })),
        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map(
              (item) => item.registered_zone_name?.zone_name
            )
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
        bannedBy: [
          ...new Set(
            data?.data?.dropDownDriverBannedby
              ?.map((item) => item?.bannedBy?.user_name)
              ?.filter((bannedBy) => Boolean(bannedBy))
          ),
        ].map((bannedBy) => ({ bannedBy: bannedBy })),

        banned_at: [
          ...new Set(
            data?.data?.dropDownDriverBannedAt?.map((item) => item.banned_at)
          ),
        ].map((banned_at) => ({ banned_at: banned_at })),
      });
    } else if (type === "expiredDocuments") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId?.map((item) => item.driver_id2)
          ),
        ].map((driver_id2) => ({ driver_id2: driver_id2 })),
        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map(
              (item) => item.registered_zone_name?.zone_name
            )
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
      });
    } else if (type === "rejectApplication") {
      setDriverDropDownList({
        driver_id2: [
          ...new Set(
            data?.data?.dropDownDriverId?.map((item) => item.driver_id2)
          ),
        ].map((id) => ({ driver_id2: id })),

        phone_number: [
          ...new Set(
            data?.data?.dropDownDriverPhonenumber?.map(
              (item) => item.phone_number
            )
          ),
        ].map((phone_number) => ({ phone_number: phone_number })),

        //   email: [...new Set(data?.data?.map((item) => item.email))].map(
        //     (email) => ({ email: email })
        //   ),
        first_name: [
          ...new Set(
            data?.data?.dropDownDriverFirstName?.map((item) => item.first_name)
          ),
        ].map((first_name) => ({ first_name: first_name })),

        last_name: [
          ...new Set(
            data?.data?.dropDownDriverLastName?.map((item) => item.last_name)
          ),
        ].map((last_name) => ({ last_name: last_name })),
        registered_zone: [
          ...new Set(
            data?.data?.dropDownZone?.map((item) => item.registered_zone)
          ),
        ].map((registered_zone) => ({ registered_zone: registered_zone })),
        // rejected_by: [
        //   ...new Set(
        //     data?.data?.dropDownDriverRejectedby
        //       ?.map((item) => item.rejected_by?.user_name)
        //       ?.filter((rejected_by) => Boolean(rejected_by))
        //   ),
        // ].map((rejected_by) => ({ rejected_by: rejected_by })),
        // rejected_by: [
        //   ...new Set(data?.data?.dropDownDriverRejectedby?.rejectedBy?.user_name?.map((item) => item.rejected_by)),
        // ].map((rejected_by) => ({ rejected_by: rejected_by })),
        rejected_by: [
          ...new Set(
            data?.data?.dropDownDriverRejectedby
              ?.map((item) => item.rejectedBy?.user_name)
              ?.filter((rejected_by) => Boolean(rejected_by))
          ),
        ].map((rejected_by) => ({ rejected_by: rejected_by })),
        rejected_at: [
          ...new Set(
            data?.data?.dropDownDriverRejectedAt
              ?.map((item) => item.rejected_at)
              ?.filter((rejected_at) => Boolean(rejected_at))
          ),
        ].map((rejected_at) => ({
          rejected_at: moment(rejected_at).format("DD-MM-YYYY"),
        })),
      });
    }
  };

  const onDropDownListError = (data) => {};

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  // const handleSearch = (value) => {
  //   setNumberOfFilters(0);
  //   setSearch(value);
  //   for (let key in value) {
  //     if (value[key]) {
  //       setNumberOfFilters((prev) => prev + 1);
  //     }
  //   }
  //   setPage(0);
  // };
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

  return (
    <InnerLayout
      mainHeading={type ? insertSpaces(type) : "--"}
      navigateEnable={false}
      backBtnClassName="ms-4"
      buttons={buttonList}
      // statusList={statusList}
    >
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
          <table className="table">
            <thead>
              <tr className={`pale_blue_bg`}>
                <th
                  scope="col"
                  className={`${styles.first_list} transparent_bg`}
                >
                  <input
                    type="checkbox"
                    className={`${styles.manage_fare_checkbox_row} ms-2`}
                    id="mastercheck"
                  />
                </th>

                {tableHeading
                  ?.filter((item) => item?.display === true)
                  .map((item, index) => {
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
            <tbody className="light_blue_bg">
              <LoadAndError
                loader={loading}
                error={error}
                status={driverList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => (
                  <tr
                    key={item?.id}
                    className={item?.id === checkList ? "light_blue_bg" : null}
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
                      <span className="secondary_color fs_14 fw_500">
                        {item?.driver_id2 ? item?.driver_id2 : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.first_name ? item?.first_name : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.last_name ? item?.last_name : "--"}
                      </span>
                    </td>
                    {type === "permanentlyDeletedDrivers" ? (
                      <></>
                    ) : (
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.phone_number ? item?.phone_number : "--"}
                        </span>
                      </td>
                    )}

                    {type === "manageDrivers" ||
                    type === "deletedDrivers" ||
                    type === "permanentlyDeletedDrivers" ? (
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.driver_type
                            ? removeUnderScore(item?.driver_type)
                            : "--"}
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}
                    {type === "permanentlyDeletedDrivers" ? (
                      <></>
                    ) : (
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driving_license_id
                            ? item?.driving_license_id
                            : "--"}
                        </span>
                      </td>
                    )}

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.registered_zone_name?.zone_name ?? "--"}
                      </span>
                    </td>
                    {type === "manageDrivers" ? (
                      <td>
                        <span
                          className={`${BalanceStatus(
                            item?.current_balance
                          )}  fs_14 fw_500`}
                        >
                          {formatAmount(item?.current_balance)}
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}

                    {type === "blockedDrivers" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.blocked_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.blockedBy?.user_name ?? "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "bannedApplication" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.banned_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.bannedBy?.user_name ?? "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "expiredDocuments" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.expiring_documents ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.expired_documents ?? "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "rejectApplication" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.created_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.rejected_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.rejectedBy?.user_name ?? "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "permanentlyDeletedDrivers" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.permanently_deleted_on)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.permanentlyDeletedBy?.user_name ?? "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "deletedDrivers" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deleted_at
                              ? moment(item?.deleted_at).format(
                                  "DD-MM-YYYY,HH:mm"
                                )
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deletedBy?.user_name ?? "--"}
                          </span>
                        </td>
                      </>
                    ) : (
                      <></>
                    )}

                    <td className="">
                      <span className="d-flex">
                        <NavLink
                          className={`border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text`}
                          to={`driver-rideHistory/${item?.id}`}
                          state={{
                            id: item?.id,
                          }}
                        >
                          View
                        </NavLink>
                        {type === "bannedApplication" ||
                        canWrite(permission) === false ? (
                          <></>
                        ) : (
                          <NavLink
                            className="border_none border_radius text-decoration-none primary_bg white_color fs_13 px-3 py-1 view_text"
                            to={`driver-rideHistory/${item?.id}`}
                            state={{
                              id: item?.id,
                              edit: true,
                            }}
                          >
                            Edit
                          </NavLink>
                        )}
                        {type === "deletedDrivers" && (
                          <NavLink
                            className="border_none border_radius text-decoration-none primary_bg white_color fs_13 px-3 py-1 view_text"
                            to={`driver-rideHistory/${item?.id}`}
                            state={{
                              id: item?.id,
                              menuEdit : true
                              // edit: true,
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
      </div>
      {driverList?.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      )}
    </InnerLayout>
  );
};

export default DriversTable;
