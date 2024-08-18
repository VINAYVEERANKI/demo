import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SearchInputfield from "../components/form/searchInputfield";
import { useDispatch } from "react-redux";
import LoadAndError from "../components/utilits/loadAndError";
import LoadingSpinnerTable from "../components/utilits/loadingSpinnerTable";
import { useSortableData } from "../components/helper";
import ComplaintsPasswordModal from "../components/complaints/modal/passwordModal";
import { assignToAdminListAction } from "../redux/actions/complaints/pendingComplaintsAction";
import errorToast from "../components/utilits/errorToast";
import ChatBoxFilter from "./sos/chat-box-filter";

const ChatBox = ({
  assignComplaints,
  handleAssignComplaintsClose,
  handlePendComplaintsViewClose,
  type,
  id,
  setReload,
  reload,
  complaintData,
  complaintType,
}) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [adminsList, setAdminsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [complDropdownList, setComplDropdownList] = useState({});

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

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  useEffect(() => {
    dispatch(
      assignToAdminListAction(
        {
          search: {
            id: search?.id ?? "",
            admin_id: search?.admin_id ?? "",
            first_name: search?.first_name ?? "",
            last_name: search?.last_name ?? "",
            location: search?.location ?? "",
            team: search?.team ?? "",
            job_title: search?.job_title ?? "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, reload]);

  const onSuccess = (data) => {
    setLoading(false);
    setAdminsList(
      data?.data?.data?.filter((item) => {
        return item?.id !== localStorage.getItem("id");
      })
    );

    setComplDropdownList({
      admin_id: [
        ...new Set(
          data?.data?.data
            ?.map((item) => item.admin_id)
            ?.filter((admin_id) => Boolean(admin_id))
        ),
      ].map((admin_id) => ({ admin_id: admin_id })),

      first_name: [
        ...new Set(
          data?.data?.data
            ?.map((item) => item.first_name)
            ?.filter((first_name) => Boolean(first_name))
        ),
      ].map((first_name) => ({
        first_name: first_name,
      })),

      last_name: [
        ...new Set(
          data?.data?.data
            ?.map((item) => item.last_name)
            ?.filter((last_name) => Boolean(last_name))
        ),
      ].map((last_name) => ({ last_name: last_name })),

      location: [
        ...new Set(
          data?.data?.data
            ?.map((item) => item.location)
            ?.filter((location) => Boolean(location))
        ),
      ].map((location) => ({ location: location })),

      team: [
        ...new Set(
          data?.data?.data
            ?.map((item) => item.team)
            ?.filter((team) => Boolean(team))
        ),
      ].map((team) => ({ team: team })),

      job_title: [
        ...new Set(
          data?.data?.data
            ?.map((item) => item.job_title)
            ?.filter((job_title) => Boolean(job_title))
        ),
      ].map((job_title) => ({ job_title: job_title })),
    });

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
  };

  console.log(adminsList);
  console.log(complDropdownList);

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const [adminId, setAdminId] = useState("");

  const [complaintPassShow, setComplaintPassShow] = useState(false);
  const handleComplaintPassClose = () => setComplaintPassShow(false);
  const handleComplaintPassShow = () => setComplaintPassShow(true);

  const ComplaintsAdminListHeading = [
    { title: "Admin ID", value: "admin_id" },
    { title: "Admin First Name", value: "first_name" },
    { title: "Admin Last Name", value: "last_name" },
    { title: "Admin Job Title", value: "job_title" },
    { title: "Admin Team", value: "team" },
    { title: "Admin Location", value: "location" },
    { title: "Active Complaints", value: "Active_Complaints" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(adminsList);
  console.log(adminsList);

  console.log(adminId);

  return (
    <>
      <ComplaintsPasswordModal
        complaintPassShow={complaintPassShow}
        handleComplaintPassClose={handleComplaintPassClose}
        handlePendComplaintsViewClose={handlePendComplaintsViewClose}
        handleAssignComplaintsClose={handleAssignComplaintsClose}
        type={type}
        // complaintType="driverPendingAssign"
        complaintType={complaintType}
        title={
          type === "driverInprogressComplaints" ||
          type === "riderInprogressComplaints"
            ? "Are you sure you want to Reassign the complaint?"
            : type === "driverComplaintForword"
            ? "Are you sure you want to Forward the complaint?"
            : "Are you sure you want to Assign the complaint?"
        }
        id={id}
        adminId={adminId}
        setReload={setReload}
        reload={reload}
        status={complaintData?.complaint_status}
      />
      <Modal
        centered
        show={true}
        onHide={handleAssignComplaintsClose}
        dialogClassName="assign_complaint_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="initiate_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <>
            <div className="d-flex justify-content-between align-items-center  mt-1 position-relative">
              <span className="fs_22 primary_color fw_600">
                {type === "driverInprogressComplaints" ||
                type === "riderInprogressComplaints"
                  ? "Reassign the complaint"
                  : type === "driverComplaintForword"
                  ? "Forward the complaint"
                  : "Assign the complaint"}
              </span>

              <span className="d-flex align-items-center gap-3">
                <span>
                  <button
                    className="border_none tertiary_bg border_radius_3px fs_13 fw_500 d-flex align-items-center py-1 px-2 primary_color"
                    type="button"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <i className="ri-filter-3-line primary_color pe-2" />
                    Add Filter
                  </button>
                  {numberOfFilters === 0 ? (
                  <></>
                ) : (
                  <div className={`p-1`}>
                    <span
                      className={`complaint_filter_number_container position-absolute fw_700 fs_16 text-center white_color`}
                    >
                      {numberOfFilters}
                    </span>
                  </div>
                )}
                </span>
                {/* <span
                  onClick={() => handleAssignComplaintsClose()}
                  className="cursor_pointer"
                >
                  <i className="ri-close-circle-fill primary_color fs_22" />
                </span> */}
              </span>
            </div>

            <div className="position-relative">
              {showFilter ? (
                <div className="complaint_filter_container position-absolute">
                  <ChatBoxFilter
                    filter={handleSearch}
                    search={search}
                    handleFilterClose={handleFilterClose}
                    complDropdownList={complDropdownList}
                    // type={type}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="mt-2 assign_admin_list assign_admin_table_container">
              {loading && <LoadingSpinnerTable />}
              <table className="table  ">
                <thead className="table_heading">
                  <tr className="orange_bg white_color">
                    {ComplaintsAdminListHeading?.map((item, index) => {
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
                          colorName="white_color"
                          table_border_radius={index === 0 ? `first_list` : ""}
                          filter_icon="white_color"
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
                    status={adminsList?.length === 0}
                  >
                    {items?.map((item, index) => (
                      <tr
                        key={item?.id}
                        className={"light_blue_bg text-nowrap"}
                      >
                        <td>
                          <span className="secondary_color fs_14 fw_500 ps-2">
                            {item?.admin_id ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.first_name ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.last_name ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.job_title ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.team ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.location ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.Active_Complaints ?? "--"}
                          </span>
                        </td>

                        <td className="">
                          <button
                            className="border_none border_radius fs_14 me-3 fw_500 px-3 
                            white_color blue_color_bg"
                            onClick={() => {
                              handleComplaintPassShow();
                              setAdminId(item?.id);
                            }}
                          >
                            {type === "driverInprogressComplaints" ||
                            type === "riderInprogressComplaints"
                              ? "Reassign"
                              : type === "driverComplaintForword"
                              ? "Forward"
                              : "Assign"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </LoadAndError>
                </tbody>
              </table>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatBox;
