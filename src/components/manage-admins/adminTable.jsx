import React, { useEffect, useState } from "react";
import SearchInputfield from "../form/searchInputfield";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import * as adminAction from "../../redux/actions/manageAdminsAction";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import LoadAndError from "../utilits/loadAndError";
import TablePaginations from "../utilits/pagination";
import AdminFilter from "./adminFilter";
import { useSortableData } from "../helper";
import InnerLayout from "../layout/innerLayout";
import moment from "moment";
import AdminModal from "./adminUserModals/adminModal";
import usePermissions from "../usePermissionChecker";
import { socket } from "../../redux/config";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const AdminTable = ({ type = "" }) => {
  const [adminType, setAdminType] = useState("");
  useEffect(() => {
    setAdminType(localStorage.getItem("admin_type"));
  }, []);

  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    manageAdminList: "admin_users",
    blockedAdminList: "blocked_admins",
    deleteAdminList: "deleted_admins",
  };
  const permission = pagePermissions[type];

  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  console.log(canWrite(permission), "skfhaks");
  const [errorMessage, setErrorMessage] = useState("");
  const [adminTable, setAdminTable] = useState(false);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [adminList, setAdminList] = useState([]);
  const [adminObject, setAdminObject] = useState({});
  console.log(adminObject, "jhvhgchgcgh");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

  const [perSoketData, setPerSoketData] = useState(null);

  useEffect(() => {
    socket.on("admin_findone_reload", (data) => {
      setPerSoketData(data);
    });
  }, [socket]);

  useEffect(() => {
    if (type === "manageAdminList") {
      setLoading(true);
      dispatch(
        adminAction.adminList(
          {
            search: {
              id: "",
              admin_id: search?.admin_id,
              first_name: search?.first_name,
              last_name: search?.last_name,
              user_name: search?.user_name,
              location: search?.location,
              team: search?.team,
              job_title: search?.job_title,
              email: search?.email,
              phone: search?.phone,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "blockedAdminList") {
      setLoading(true);
      dispatch(
        adminAction.blockAdminList(
          {
            search: {
              id: "",
              admin_id: search?.admin_id,
              first_name: search?.first_name,
              last_name: search?.last_name,
              user_name: search?.user_name,
              location: search?.location,
              team: search?.team,
              job_title: search?.job_title,
              phone: search?.phone,
              blocked_at: search?.blocked_at,
              blocked_by: search?.blocked_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else {
      setLoading(true);
      dispatch(
        adminAction.deletedAdminListAction(
          {
            search: {
              id: "",
              admin_id: search?.admin_id,
              first_name: search?.first_name,
              last_name: search?.last_name,
              user_name: search?.user_name,
              location: search?.location,
              team: search?.team,
              job_title: search?.job_title,
              deleted_at: search?.deleted_at,
              deleted_by: search?.deleted_by,
              phone: search?.phone,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, adminTable, type, perSoketData]);

  console.log(adminList, "djklfasl");

  const onSuccess = (data) => {
    setPerSoketData(null);
    setLoading(false);
    setAdminList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
    setErrorMessage(data?.data?.data);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const handlePageChange = (event) => {
    setPage(Number(event.target.value) - 1);
    setCurrentPage(page);
  };

  const [editAdminshow, setEditAdminShow] = useState(false);
  const handleEditAdminClose = () => setEditAdminShow(false);
  const handleEditAdminShow = () => setEditAdminShow(true);

  const [action, setAction] = useState("");

  const admintableHeading = [
    { title: "Admin ID", value: "admin_id" },
    { title: "First Name", value: "first_name" },
    { title: "Last Name", value: "last_name" },
    { title: "User Name", value: "user_name" },
    { title: "Email ID", value: "email" },
    { title: "Phone Number", value: "phone" },
    { title: "Location", value: "location" },
    { title: "Team", value: "team" },
    { title: "Job Title", value: "job_title" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(adminList);

  if (type === "blockedAdminList") {
    const emailIdIndex = admintableHeading.findIndex(
      (header) => header.title === "Email ID"
    );
    if (emailIdIndex >= 0) {
      admintableHeading.splice(emailIdIndex, 1);
    }
    admintableHeading?.push({
      title: "Blocked by",
      value: "blockedBy.user_name",
    });
  }

  if (type === "deleteAdminList") {
    const emailIdIndex = admintableHeading.findIndex(
      (header) => header.title === "Email ID"
    );
    if (emailIdIndex >= 0) {
      admintableHeading.splice(emailIdIndex, 1);
    }
    admintableHeading?.push(
      { title: "Deleted at", value: "deleted_at" },
      { title: "Deleted by", value: "" }
    );
  }

  const [adminDropDownList, setAdminDropDownList] = useState({});

  const handleFetchDropDownList = () => {
    if (type === "manageAdminList") {
      dispatch(
        adminAction?.dropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "blockedAdminList") {
      dispatch(
        adminAction?.blockedDropDownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "deleteAdminList") {
      dispatch(
        adminAction?.deletedDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    if (type === "manageAdminList") {
      setAdminDropDownList({
        admin_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.admin_id)
              ?.filter((admin_id) => Boolean(admin_id))
          ),
        ].map((id) => ({ admin_id: id })),
        user_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.user_name)
              ?.filter((user_name) => Boolean(user_name))
          ),
        ].map((user_name) => ({ user_name: user_name })),

        email: [
          ...new Set(
            data?.data
              ?.map((item) => item.email)
              ?.filter((email) => Boolean(email))
          ),
        ].map((email) => ({ email: email })),
        phone: [
          ...new Set(
            data?.data
              ?.map((item) => item.phone)
              ?.filter((phone) => Boolean(phone))
          ),
        ].map((phone) => ({ phone: phone })),

        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.last_name)
              ?.filter((last_name) => Boolean(last_name))
          ),
        ].map((last_name) => ({ last_name: last_name })),
        job_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.job_title)
              ?.filter((job_title) => Boolean(job_title))
          ),
        ].map((job_title) => ({ job_title: job_title })),
        team: [
          ...new Set(
            data?.data
              ?.map((item) => item.team)
              ?.filter((team) => Boolean(team))
          ),
        ].map((team) => ({
          team: team,
        })),
        location: [
          ...new Set(
            data?.data
              ?.map((item) => item.location)
              ?.filter((location) => Boolean(location))
          ),
        ].map((location) => ({ location: location })),
      });
    } else if (type === "blockedAdminList") {
      setAdminDropDownList({
        admin_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.admin_id)
              ?.filter((admin_id) => Boolean(admin_id))
          ),
        ].map((id) => ({ admin_id: id })),
        user_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.user_name)
              ?.filter((user_name) => Boolean(user_name))
          ),
        ].map((user_name) => ({ user_name: user_name })),
        phone: [
          ...new Set(
            data?.data
              ?.map((item) => item.phone)
              ?.filter((phone) => Boolean(phone))
          ),
        ].map((phone) => ({ phone: phone })),

        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.last_name)
              ?.filter((last_name) => Boolean(last_name))
          ),
        ].map((last_name) => ({ last_name: last_name })),
        job_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.job_title)
              ?.filter((job_title) => Boolean(job_title))
          ),
        ].map((job_title) => ({ job_title: job_title })),
        team: [
          ...new Set(
            data?.data
              ?.map((item) => item.team)
              ?.filter((team) => Boolean(team))
          ),
        ].map((team) => ({
          team: team,
        })),
        location: [
          ...new Set(
            data?.data
              ?.map((item) => item.location)
              ?.filter((location) => Boolean(location))
          ),
        ].map((location) => ({ location: location })),
        blocked_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.blocked_at)
              ?.filter((blocked_at) => Boolean(blocked_at))
          ),
        ].map((blocked_at) => ({ blocked_at: blocked_at })),
        //  ({
        //   blocked_at: moment(blocked_at).format("DD-MM-YYYY"),
        // })),
        blocked_by: [
          ...new Set(
            data?.data
              ?.map((item) => item.blockedBy?.user_name)
              ?.filter((blocked_by) => Boolean(blocked_by))
          ),
        ].map((blocked_by) => ({ blocked_by: blocked_by })),
      });
    } else if (type === "deleteAdminList") {
      setAdminDropDownList({
        admin_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.admin_id)
              ?.filter((admin_id) => Boolean(admin_id))
          ),
        ].map((id) => ({ admin_id: id })),
        user_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.user_name)
              ?.filter((user_name) => Boolean(user_name))
          ),
        ].map((user_name) => ({ user_name: user_name })),
        phone: [
          ...new Set(
            data?.data
              ?.map((item) => item.phone)
              ?.filter((phone) => Boolean(phone))
          ),
        ].map((phone) => ({ phone: phone })),

        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),
        last_name: [
          ...new Set(
            data?.data
              ?.map((item) => item.last_name)
              ?.filter((last_name) => Boolean(last_name))
          ),
        ].map((last_name) => ({ last_name: last_name })),
        job_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.job_title)
              ?.filter((job_title) => Boolean(job_title))
          ),
        ].map((job_title) => ({ job_title: job_title })),
        team: [
          ...new Set(
            data?.data
              ?.map((item) => item.team)
              ?.filter((team) => Boolean(team))
          ),
        ].map((team) => ({
          team: team,
        })),
        location: [
          ...new Set(
            data?.data
              ?.map((item) => item.location)
              ?.filter((location) => Boolean(location))
          ),
        ].map((location) => ({ location: location })),
        deleted_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.deleted_at)
              ?.filter((deleted_at) => Boolean(deleted_at))
          ),
        ].map((deleted_at) => ({ deleted_at: deleted_at })),
        // ({
        //   deleted_at: moment(deleted_at).format("DD-MM-YYYY"),
        // })),
        deleted_by: [
          ...new Set(
            data?.data
              ?.map((item) => item.deletedBy?.user_name)
              ?.filter((deleted_by) => Boolean(deleted_by))
          ),
        ].map((deleted_by) => ({ deleted_by: deleted_by })),
      });
    }
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  const buttonList = [
    type === "manageAdminList" && canWrite("admin_users") && (
      <button
        className="tertiary_bg border_radius_5px border_none px-sm-3 py-sm-1"
        onClick={() => {
          setAction("create");
          setAdminObject({});
          handleEditAdminShow();
        }}
      >
        <span className="d-flex align-items-center">
          <i className="ri-add-line fs_16  primary_color fw_600 pe-2"></i>
          <span className="fs_14 fw_600 primary_color ps-1">Add Admin</span>
        </span>
      </button>
    ),
    canRead(permission) && (
      <>
        <button
          className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
          type="button"
          onClick={() => {
            handleFetchDropDownList();
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
    ),
  ];

  console.log(adminType, "skfjbasjks");

  return (
    <InnerLayout
      mainHeading={
        type === "manageAdminList"
          ? "Admin Users"
          : type === "blockedAdminList"
            ? "Blocked Admins"
            : "Deleted Admins"
      }
      navigateEnable={false}
      backBtnClassName="ms-4"
      buttons={buttonList}
    >
      {showFilter ? (
        <AdminFilter
          filter={handleSearch}
          search={search}
          handleFilterClose={handleFilterClose}
          adminDropDownList={adminDropDownList}
          type={type}
        />
      ) : (
        <></>
      )}

      <div className="row mt-3">
        <div className="col-md-12 table_container">
          {loading && <LoadingSpinnerTable />}
          <table className="table manage_fare_list_navbar">
            <thead>
              <tr className="pale_blue_bg">
                <th scope="col" className={`${styles.first_list} transparent_bg`}>
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2"
                    id="mastercheck"
                  />
                </th>

                {admintableHeading?.map((item, index) => {
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
                status={adminList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => (
                  <tr
                    key={item?.role_id}
                    className={`${item?.role_id === checkList ? "light_blue_bg" : null
                      } text-nowrap`}
                  >
                    <td scope="row">
                      <input
                        id={item?.role_id}
                        type="checkbox"
                        checked={checkList === item?.role_id}
                        className="manage_fare_checkbox ms-2"
                        onChange={checkboxChecker}
                      />
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.admin_id ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 text-nowrap fs_14">
                        {item?.first_name ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.last_name ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.user_name ?? "--"}
                      </span>
                    </td>
                    {type === "manageAdminList" ? (
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.email ?? "--"}
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}

                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.phone ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.location ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 fs_14">
                        {item?.team ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fw_500 text-nowrap fs_14">
                        {item?.job_title ?? "--"}
                      </span>
                    </td>
                    {type === "deleteAdminList" ? (
                      <td>
                        <span className="secondary_color fw_500 text-nowrap fs_14">
                          {item?.deleted_at
                            ? moment(item?.deleted_at).format(
                              "DD-MM-YYYY,HH:mm"
                            )
                            : "--"}
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}

                    {type === "manageAdminList" ? (
                      <></>
                    ) : (
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {type === "deleteAdminList"
                            ? item?.deletedBy?.user_name ?? "--"
                            : item?.blockedBy?.user_name ?? "--"}
                        </span>
                      </td>
                    )}
                    <td className="">
                      <span className="d-flex">
                        <button
                          className="border_none border_radius fs_13 me-4 fw_500 px-3 white_color blue_color_bg"
                          onClick={() => {
                            setAdminObject(item);
                            handleEditAdminShow();
                            setAction("view");
                          }}
                        >
                          View
                        </button>
                        {type === "deleteAdminList" ||
                          canWrite(permission) === false ||
                          (item?.admin_type === "super_admin" &&
                            adminType !== "super_admin") ? (
                          <></>
                        ) : (
                          <button
                            className="border_none border_radius primary_bg white_color fs_13 px-3"
                            onClick={() => {
                              setAdminObject(item);
                              handleEditAdminShow();
                              setAction("edit");
                            }}
                          >
                            Edit
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
      {adminList.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          handleChange={handlePageChange}
          currentPage={page}
          pageData={pageData}
        />
      )}

      <AdminModal
        editAdminshow={editAdminshow}
        user={adminObject}
        handleEditAdminClose={handleEditAdminClose}
        handleEditAdminShow={handleEditAdminShow}
        adminTable={adminTable}
        setAdminTable={setAdminTable}
        action={action}
        setAction={setAction}
        type={type}
        permission={permission}
        adminType={adminType}
      />
    </InnerLayout>
  );
};

export default AdminTable;
