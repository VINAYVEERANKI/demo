import React, { useEffect, useRef, useState } from "react";
import DriverImage from "../../assets/images/profileimage.png";
import {
  myComplaintsListAction,
  myComplaintsRiderListAction,
} from "../../redux/actions/complaints/myComplaintsAction";
import { useDispatch } from "react-redux";
import EmptyChatImage from "../../assets/images/empty-chat.png";
import {
  applicationAge,
  driverNavigateFn,
  navigationFn,
  riderNavigateFn,
  useSortableData,
} from "../helper";
import {socket } from "../../redux/config";
import SearchInputfield from "../form/searchInputfield";
import ComplaintsPasswordModal from "./modal/passwordModal";
import RiderAssignComplaintModal from "./modal/admin-assign-complaint-modal";
import ComplaintsDetails from "./details";
import ChatSection from "../chat-section/chatSection";
import moment from "moment";
import { findAllComplaintsAction } from "../../redux/actions/chatSection/chatSectionAction";
import usePermissions from "../usePermissionChecker";
import "../chat-section/chat-section.css";
import useDisplayToggle from "../useDisplayToggle";
import { NavLink } from "react-router-dom";

const ComplaintsMobileApp = ({ type, navLoaction }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    driverComplaints: "my_driver_complaint",
    riderComplaints: "my_rider_complaint",
  };
  const permission = pagePermissions[type];

  const dispatch = useDispatch();
  const [complaintListLoading, setComplaintListLoading] = useState(false);
  const [complaintList, setcomplaintList] = useState([]);
  const [complaintListBody, setComplaintListBody] = useState([]);
  const [showChatBody, setShowChatBody] = useState(false);
  const [roomChange, setRoomChange] = useState(null);
  const [reload, setReload] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [searchText, setSearchText] = useState(
    navLoaction?.state?.complaint_id ?? ""
  );
  const [storedMessages, setStoredMessages] = useState([]);
  const today = new Date().toLocaleDateString("en-IN");

  const [adminId, setAdminId] = useState("");
  useEffect(() => {
    setAdminId(localStorage.getItem("id"));
  }, []);

  console.log(adminId, "adasdadsa");

  useEffect(() => {
    setComplaintListLoading(true);
    if (type === "driverComplaints") {
      dispatch(
        myComplaintsListAction(
          {
            search: "",
          },
          onListFetchSuccess,
          onListFetchError
        )
      );
    } else if (type === "riderComplaints") {
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

  const onListFetchSuccess = (data) => {
    setComplaintListLoading(false);
    console.log(data);
    setcomplaintList(data?.data?.data);
  };

  const onListFetchError = (data) => {
    setComplaintListLoading(false);
    console.log(data);
  };

  const filterComplaintsList = searchText
    ? complaintList?.filter(
        (item) =>
          item?.complaint_id2
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item?.booking?.driver?.first_name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item?.booking?.rider?.first_name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
      )
    : complaintList;

  console.log(complaintList, "sdfkjgajksa");

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } =
    useSortableData(filterComplaintsList);

  const [myComplaintsFilter, setMyComplaintsFilter] = useState(false);
  const [blockFocus, setBlockFocus] = useState(false);
  const [alllllll, setAlllllll] = useState([]);
  function onClickFn(items, index) {
    setComplaintListBody(items);
    setBlockFocus(index);
    const admin_id = adminId;
    const driver_id =
      type === "driverComplaints"
        ? items?.booking?.driver?.id
        : items?.booking?.rider?.id;
    socket.emit("connected", admin_id);
    socket.emit("join-room", driver_id);
    const isMessageRead = {
      type: "complaint",
      user_type: "admin",
      driverId: items?.booking?.driver?.id ?? null,
      riderId: items?.booking?.rider?.id ?? null,
      adminId: adminId,
      complaintId: items?.id,
    };
    socket.emit("message_read", isMessageRead);
    setShowChatBody(true);
    // console.log(socket, "connection connected");
    setRoomChange(!roomChange);
  }
  useEffect(() => {
    socket.on("testing", (data) => {
      // console.log(data);
    });
    socket.on("room_data", (data) => {
      console.log(data);
      setRoomData(data);
    });
  }, [socket]);

  console.log(roomData, "sdadadsads");

  const [allComplaintsData, setAllComplaintsData] = useState([]);

  useEffect(() => {
    const receiveMessageCountHandler = (data) => {
      setAlllllll(data);
    };
    socket.on("receive_message_count", receiveMessageCountHandler);
    return () => {
      socket.off("receive_message_count", receiveMessageCountHandler);
    };
  }, []);

  useEffect(() => {
    const receiveMessageCountHandler = (data) => {
      setAllComplaintsData(data?.data);
    };
    socket.on("receive_all_complaint_message", receiveMessageCountHandler);
    return () => {
      socket.off("receive_all_complaint_message", receiveMessageCountHandler);
    };
  }, []);

  console.log(allComplaintsData, "slkfhalkjsa");

  const [messageCount, setmessageCount] = useState([]);

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    dispatch(findAllComplaintsAction(onSuccess, onError));
  }, [alllllll, roomChange]);

  const onSuccess = (data) => {
    setAllMessages(data?.data);
    console.log(data);
  };
  const onError = (data) => {
    console.log(data);
  };

  console.log(alllllll, "aldjfaskldsa");

  const UseLastMessage = (id) => {
    const filterDriverMessage = allMessages?.filter(
      (item) => item?.complaintId === id
    );
    const sortedFilterDriverMessage = filterDriverMessage
      .slice()
      .sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    let lastMessageDate = null;
    for (let i = sortedFilterDriverMessage?.length - 1; i >= 0; i--) {
      if (sortedFilterDriverMessage[i]?.complaintId === id) {
        lastMessageDate = sortedFilterDriverMessage[i]?.createdAt;
        break;
      }
    }

    return lastMessageDate;
  };

  const idCountMap = [];

  allMessages?.forEach((obj) => {
    const { driverId, is_message_read, adminId } = obj;

    if (is_message_read === false && !adminId) {
      const matchingComplaint = complaintList.find(
        (otherobj) => otherobj?.booking?.driver?.id === driverId
      );

      if (matchingComplaint) {
        const existingEntryIndex = idCountMap.findIndex(
          (entry) => entry.id === driverId
        );

        if (existingEntryIndex !== -1) {
          idCountMap[existingEntryIndex].count++;
        } else {
          idCountMap.push({ id: driverId, count: 1 });
        }
      }
    }
  });

  allMessages?.forEach((obj) => {
    const { riderId, is_message_read, adminId } = obj;

    if (is_message_read === false && !adminId) {
      const matchingComplaint = complaintList.find(
        (otherobj) => otherobj?.booking?.rider?.id === riderId
      );

      if (matchingComplaint) {
        const existingEntryIndex = idCountMap.findIndex(
          (entry) => entry.id === riderId
        );

        if (existingEntryIndex !== -1) {
          idCountMap[existingEntryIndex].count++;
        } else {
          idCountMap.push({ id: riderId, count: 1 });
        }
      }
    }
  });

  const filterTitle = [
    { title: "Complaint Age", value: "complented_at" },
    { title: "Last Active Time", value: "last_active_at" },
  ];

  const [riderDetails, setRiderDetails] = useState(false);
  const [action, setAction] = useState("");
  const [riderMoreOption, setRiderMoreOption] = useState(false);
  const [assignComplaints, setAssignComplaints] = useState(false);
  const handleAssignComplaintsClose = () => {
    setAssignComplaints(false);
    setRiderMoreOption(false);
  };
  const handleAssignComplaintsShow = () => setAssignComplaints(true);

  const [complaintPassShow, setComplaintPassShow] = useState(false);
  const handleComplaintPassClose = () => {
    setComplaintPassShow(false);
    setRiderMoreOption(false);
  };
  const handleComplaintPassShow = () => setComplaintPassShow(true);

  const complaintData = [
    {
      label: "Complaint",
      value: complaintListBody?.complaint_id2 ?? "--",
      subValue: `(Complaint age: ${
        complaintListBody?.complented_at
          ? applicationAge(complaintListBody?.complented_at)
          : "--"
      })`,
    },
    { label: "Type", value: complaintListBody?.complaint_type ?? "--" },
    {
      label: complaintListBody?.booking?.driver_id2 ? "Driver ID" : "Rider ID",
      value:
        complaintListBody?.booking?.driver_id2 ??
        complaintListBody?.booking?.rider?.rider_id2 ??
        "--",
      navLink: true,
      link: complaintListBody?.booking?.driver
        ? driverNavigateFn(
            complaintListBody?.booking?.driver,
            complaintListBody?.booking?.driver?.id
          )
        : riderNavigateFn(
            complaintListBody?.booking?.rider,
            complaintListBody?.booking?.rider?.id
          ),
    },
    { label: "Title", value: complaintListBody?.complaint_title ?? "--" },
    {
      label: "Booking ID",
      value: complaintListBody?.booking?.booking_id_2 ?? "--",
      navLink: true,
      link: `${navigationFn(
        complaintListBody?.booking?.booking_classification,
        complaintListBody?.booking?.id
      )}`,
    },
  ];
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  const filterClickRef = useRef();
  const insideFilterClickRef = useRef();

  const moreClickRef = useRef();
  const insideMoreClick = useRef();

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setRiderDetails,
  });
  useDisplayToggle({
    onClickRef: filterClickRef,
    insideClickRef: insideFilterClickRef,
    setDisplay: setMyComplaintsFilter,
  });
  useDisplayToggle({
    onClickRef: moreClickRef,
    insideClickRef: insideMoreClick,
    setDisplay: setRiderMoreOption,
  });

  console.log(filterComplaintsList, "KSSDBFJKASF");
  return (
    <>
      <ComplaintsPasswordModal
        complaintPassShow={complaintPassShow}
        handleComplaintPassClose={handleComplaintPassClose}
        complaintType={action}
        title={
          action === "closeComplaint"
            ? "Are you sure you want to Close the complaint?"
            : action === "resolveComplaint"
            ? "Are you sure you want to Resolve the complaint?"
            : ""
        }
        id={complaintListBody?.id}
        setReload={setReload}
        reload={reload}
        type={type}
      />
      <RiderAssignComplaintModal
        assignComplaints={assignComplaints}
        handleAssignComplaintsClose={handleAssignComplaintsClose}
        complaintType={action}
        id={complaintListBody?.id}
        setReload={setReload}
        reload={reload}
        type={type}
        driverID={complaintListBody?.booking?.driver?.id}
        riderID={complaintListBody?.booking?.rider?.id}
      />
      <div className="rider_complaints_container  p-3 pb-4 mx-3 my-4">
        <div className="mx-3 d-sm-flex justify-content-between mt-3 align-items-center">
          <span className="">
            <span className="fs_26 primary_color fw_600">My Complaints</span>
            <span className="secondary_color fs_16 fw_500">
              (Source: Mobile App)
            </span>
          </span>
        </div>
        {canWrite(permission) === false ? (
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="primary_color fs_26 fw_500">
              You are not authorized
            </span>
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-xxl-3 col-xl-4 col-md-5 col-sm-6">
              {/* chat sidebar starts */}
              <div className="ms-3 ">
                <div className="position-relative">
                  <input
                    className=" grey_color_bg border_none border_radius_5px outline_none ps-2 p-1 w-100"
                    placeholder="Search text"
                    value={searchText}
                    type="text"
                    onChange={(e) => {
                      setSearchText(e.target.value.toLocaleUpperCase());
                      setReload(!reload);
                    }}
                  />

                  <i
                    className="ri-search-line serach__input_icon ps-2"
                    onClick={() => setReload(!reload)}
                  />
                </div>

                <div className="d-flex justify-content-between mt-3 mb-2">
                  <span className="primary_color fs_16 fw_500">
                    My Complaints ({complaintList?.length})
                  </span>
                  <div className="position-relative">
                    <span>
                      <i
                        className="ri-filter-2-fill primary_color cursor_pointer"
                        onClick={() =>
                          setMyComplaintsFilter(!myComplaintsFilter)
                        }
                        ref={filterClickRef}
                      />
                    </span>
                    {myComplaintsFilter ? (
                      <div
                        className="rider_complaint_filter_container white_bg border_radius_7px"
                        ref={insideFilterClickRef}
                      >
                        <span className="d-flex justify-content-between">
                          <span className="orange_color fs_16 fw_500 p-2 ps-3">
                            Filter
                          </span>
                          <span className="p-2 pe-2">
                            <i
                              className="ri-close-fill secondary_color fw_700 cursor_pointer"
                              onClick={() => setMyComplaintsFilter(false)}
                            />
                          </span>
                        </span>
                        <hr className="list_underline m-0" />
                        <ul className="menu_list p-2 mb-0 primary_color fs_14 fw_600 text-start">
                          {filterTitle?.map((item, index) => {
                            const isActiveSortIndex = activeSortIndex === index;
                            return (
                              <>
                                <li className="py-1 px-3">
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
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>

                {items?.map((items, index) => {
                  return (
                    <div
                      className={
                        blockFocus === index
                          ? "complaints_block cursor_pointer my-2"
                          : "rider_heading_border_bottom cursor_pointer my-2"
                      }
                      onClick={() => {
                        onClickFn(items, index);
                      }}
                      key={items?.complaint_id2}
                    >
                      <div className="d-flex">
                        <div className="p-2 position-relative">
                          <img
                            src={
                              items?.booking?.driver?.profile_pic?.photo ??
                              items?.booking?.rider?.profile_pic?.photo ??
                              DriverImage
                            }
                            width="50px"
                            height="50px"
                            className="border_radius_7px"
                          />
                          <span
                            className={
                              idCountMap
                                ?.filter(
                                  (item) =>
                                    item.id === items?.booking?.driver?.id ||
                                    item.id === items?.booking?.rider?.id
                                )
                                .map((item) => item?.count)?.[0] ===
                              (null || undefined)
                                ? ""
                                : "position-absolute count_of_unseen_mess fw_500 fs_14 text-center white_color"
                            }
                          >
                            {
                              idCountMap
                                ?.filter(
                                  (item) =>
                                    item.id === items?.booking?.driver?.id ||
                                    item.id === items?.booking?.rider?.id
                                )
                                .map((item) => item?.count)?.[0]
                            }
                          </span>
                        </div>
                        <div className="w-100 pt-1 d-flex flex-column pe-2">
                          <span className="d-flex justify-content-between">
                            <span className="fs_14 fw_500 primary_color">
                              {items?.booking?.driver?.first_name ??
                                items?.booking?.rider?.first_name ??
                                "--"}
                            </span>
                            <span className="fs_11 orange_color fw_500 d-flex-justify-content-end">
                              {/* {items?.id} */}
                              {/* {lastMessageDate} */}

                              {alllllll?.data?.complaintId === items?.id
                                ? moment(alllllll?.data?.createdAt).format(
                                    "hh:mm A"
                                  )
                                : moment(UseLastMessage(items?.id)).format(
                                    "hh:mm A"
                                  )}
                              {/* {moment(UseLastMessage(items?.id)).format(
                                "hh:mm A"
                              )} */}
                            </span>
                          </span>
                          <table className="w_80">
                            <tbody>
                              <tr className="fs_11 fw_500 secondary_color">
                                <td className="text-nowrap ">Complaint</td>
                                <td className="text-nowrap">
                                  : {items?.complaint_id2 ?? "--"}
                                </td>
                              </tr>
                              <tr className="fs_11 fw_500 secondary_color">
                                <td className="text-nowrap">Complaint Age</td>
                                <td className="text-nowrap">
                                  :{" "}
                                  {items?.complented_at
                                    ? applicationAge(items?.complented_at)
                                    : "--"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* chat sidebar ends */}
            </div>
            <div className="col-xxl-9 col-xl-8  col-md-7 col-sm-6">
              {showChatBody ? (
                <div className="border border_radius_7px h-100 p-2">
                  <div className="row mb-2">
                    <div className="col-10">
                      <div className="row">
                        <div className="col-xxl-1 d-flex justify-content-xxl-start justify-content-center">
                          <img
                            src={
                              complaintListBody?.booking?.driver?.profile_pic
                                ?.photo ??
                              complaintListBody?.booking?.rider?.profile_pic
                                ?.photo ??
                              null
                            }
                            width="75px"
                            height="75px"
                            className="border_radius_7px"
                          />
                        </div>
                        <div className="col-10 ms-4">
                          <span className="fs_16 fw_500 primary_color">
                            {complaintListBody?.booking?.driver?.first_name ??
                              complaintListBody?.booking?.rider?.first_name ??
                              "--"}
                          </span>
                          <div className="row">
                            {complaintData?.map((item) => {
                              return (
                                <div className="col-xl-6">
                                  <table>
                                    <tbody>
                                      <tr className="fs_11 fw_500">
                                        <td className="secondary_color">
                                          {item?.label}
                                        </td>
                                        {/* <td className="ps-2 primary_color">
                                          {item?.label === "Driver ID" ||
                                          item?.label === "Rider ID" ||
                                          item?.label === "Booking ID" ? (
                                            <a href="">{item?.value ?? "--"}</a>
                                          ) : (
                                            item?.value ?? "--"
                                          )}

                                          {item?.subValue && (
                                            <span className="secondary_color">
                                              {item?.subValue}
                                            </span>
                                          )}
                                        </td> */}

                                        <td className="ps-2 primary_color">
                                          {item?.navLink ? (
                                            <NavLink
                                              to={item?.link}
                                              className="primary_color"
                                            >
                                              {item?.value}
                                            </NavLink>
                                          ) : (
                                            item?.value
                                          )}
                                          {item?.subValue && (
                                            <span className="secondary_color">
                                              {item?.subValue}
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="d-flex justify-content-end align-items-center me-sm-2 gap-2">
                        <div className="position-relative">
                          <div
                            className="light_blue_color details_text fs_14 fw_500 cursor_pointer "
                            onClick={() => setRiderDetails(!riderDetails)}
                            ref={onClickRef}
                          >
                            <span>Details</span>
                          </div>

                          {riderDetails ? (
                            <>
                              <div ref={insideClickRef}>
                                <ComplaintsDetails item={complaintListBody} />
                              </div>
                            </>
                          ) : null}
                        </div>
                        <div className="position-relative">
                          <i
                            className="ri-more-2-fill align-items-end cursor_pointer"
                            onClick={() => setRiderMoreOption(!riderMoreOption)}
                            ref={moreClickRef}
                          />

                          {riderMoreOption ? (
                            <div
                              className="rider_more_option_container white_bg border_radius_7px"
                              ref={insideMoreClick}
                            >
                              <ul className="menu_list p-2 mb-0 primary_color fs_14 fw_600 text-center">
                                <li className="py-1 ">
                                  <button
                                    className={
                                      "background_none border_none  primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    }
                                    type="button"
                                    onClick={() => {
                                      handleAssignComplaintsShow();
                                      setAction("forwardComplaint");
                                    }}
                                  >
                                    Forward The Complaint
                                  </button>
                                </li>
                                <hr className="list_underline m-1" />

                                <li className="py-1 cursor_pointer">
                                  <button
                                    className="background_none border_none primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    type="button"
                                    onClick={() => {
                                      handleComplaintPassShow();
                                      setAction("closeComplaint");
                                    }}
                                  >
                                    Close Complaint
                                  </button>
                                </li>
                                <hr className="list_underline m-1" />

                                <li className="py-1 cursor_pointer">
                                  <button
                                    className="background_none border_none primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    onClick={() => {
                                      handleComplaintPassShow();
                                      setAction("resolveComplaint");
                                    }}
                                  >
                                    Resolve Complaint
                                  </button>
                                </li>
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat_body_border">
                    <ChatSection
                      complaintList={complaintListBody}
                      driverID={
                        type === "driverComplaints"
                          ? complaintListBody?.booking?.driver?.id
                          : null
                      }
                      riderID={
                        type === "riderComplaints"
                          ? complaintListBody?.booking?.rider?.id
                          : null
                      }
                      roomData={roomData}
                      complaintID={complaintListBody?.id}
                      roomChange={roomChange}
                      setStoredMessages={setStoredMessages}
                      storedMessages={storedMessages}
                      type={type}
                      setmessageCount={setmessageCount}
                      messageCount={messageCount}
                    />
                  </div>
                </div>
              ) : (
                // chat body ends
                <div className="chat_box_body">
                  <img src={EmptyChatImage} className="chat_box_empty_image" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ComplaintsMobileApp;
