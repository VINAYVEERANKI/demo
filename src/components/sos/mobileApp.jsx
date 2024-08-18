import React, { useEffect, useRef, useState } from "react";
import DriverImage from "../../assets/images/profileimage.png";
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
import SOSPasswordModal from "./modal/passwordModal";
// import RiderAssignComplaintModal from "./modal/admin-assign-complaint-modal";
import ComplaintsDetails from "../complaints/details";
import ChatSection from "../chat-section/chatSection";
import moment from "moment";
import {
  localResponderConatctListAction,
  mySOSDriverListAction,
  mySOSRiderListAction,
} from "../../redux/actions/sos/mySOSAction";
import AssignSOSModal from "./modal/assignSOSModal";
import SOSCloseResPasswordModal from "./modal/closeResPassWord";
import {
  findAllComplaintsAction,
  findAllSosMessageAction,
} from "../../redux/actions/chatSection/chatSectionAction";
import usePermissions from "../usePermissionChecker";
import ContactDetailsModal from "./modal/ContactDetailsModal";
import useDynamicHeight from "../useScreenHeightDetector";
import errorToast from "../utilits/errorToast";
import useDisplayToggle from "../useDisplayToggle";
import { manageDriverVehicleTypeListAction } from "../../redux/actions/manageDriversAction";
import { NavLink } from "react-router-dom";

const SOSMobileApp = ({ type }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    driverSos: "my_driver_sos",
    riderSos: "my_rider_sos",
  };
  const permission = pagePermissions[type];
  const dispatch = useDispatch();
  const [sosListLoading, setSosListLoading] = useState(false);
  const [sosList, setsosList] = useState([]);
  const [sosListBody, setSosListBody] = useState([]);
  const [showChatBody, setShowChatBody] = useState(false);
  const [roomChange, setRoomChange] = useState(null);
  const [reload, setReload] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [storedMessages, setStoredMessages] = useState([]);

  const [ADMINID, setADMINID] = useState("");
  useEffect(() => {
    setADMINID(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    setSosListLoading(true);
    if (type === "driverSos") {
      dispatch(
        mySOSDriverListAction(
          {
            search: searchText ?? "",
          },
          onListFetchSuccess,
          onListFetchError
        )
      );
    } else if (type === "riderSos") {
      dispatch(
        mySOSRiderListAction(
          {
            search: searchText ?? "",
          },
          onListFetchSuccess,
          onListFetchError
        )
      );
    }
  }, [reload]);

  const onListFetchSuccess = (data) => {
    setSosListLoading(false);
    console.log(data);
    setsosList(data?.data?.data);
  };

  const onListFetchError = (data) => {
    setSosListLoading(false);
    console.log(data);
  };

  console.log(sosListBody, "fgsddsfdsf");

  const filterSosList = searchText
    ? sosList?.filter(
        (item) =>
          item?.sos_id2
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item?.driver?.first_name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          item?.rider?.first_name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
      )
    : sosList;

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(filterSosList);

  const [myComplaintsFilter, setMyComplaintsFilter] = useState(false);
  const [blockFocus, setBlockFocus] = useState(false);
  const [alllllll, setAlllllll] = useState([]);
  function onClickFn(items, index) {
    setSosListBody(items);
    setBlockFocus(index);
    const driver_id =
      type === "driverSos" ? items?.driver?.id : items?.rider?.id;
    socket.emit("connected", ADMINID);
    socket.emit("join-room", driver_id);
    const isMessageRead = {
      type: "sos",
      user_type: "admin",
      driverId: items?.driver?.id ?? null,
      riderId: items?.rider?.id ?? null,
      adminId: ADMINID,
      sosId: items?.id,
    };
    socket.emit("message_read", isMessageRead);
    setShowChatBody(true);
    console.log(socket, "connection connected");
    setRoomChange(!roomChange);
  }

  useEffect(() => {
    socket.on("testing", (data) => {
      console.log(data);
    });
    socket.on("room_data", (data) => {
      console.log(data);
      setRoomData(data);
    });
  }, [socket]);

  console.log(roomData, "sdadadsads");

  useEffect(() => {
    const receiveMessageCountHandler = (data) => {
      setAlllllll(data);
    };
    socket.on("receive_message_count", receiveMessageCountHandler);
    return () => {
      socket.off("receive_message_count", receiveMessageCountHandler);
    };
  }, []);
  const [messageCount, setmessageCount] = useState([]);

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    dispatch(findAllSosMessageAction(onSuccess, onError));
  }, [alllllll, roomChange]);

  const onSuccess = (data) => {
    console.log("ajsdgjadajkd");
    setAllMessages(data?.data);
    console.log(data);
  };
  const onError = (data) => {
    console.log(data);
  };

  const idCountMap = [];

  console.log(idCountMap, "jhgjadgks");

  allMessages?.forEach((obj) => {
    const { driverId, is_message_read, adminId } = obj;

    if (is_message_read === false && !adminId) {
      const matchingComplaint = sosList.find(
        (otherobj) => otherobj?.driver?.id === driverId
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
      const matchingComplaint = sosList.find(
        (otherobj) => otherobj?.rider?.id === riderId
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

  const [contactSosModal, setContactSosModal] = useState(false);
  const handleContactSosModalClose = () => {
    setContactSosModal(false);
  };
  const handleContactSosModalShow = () => setContactSosModal(true);

  const [assignSosModal, setAssignSosModal] = useState(false);
  const handleAssignSosModalClose = () => {
    setAssignSosModal(false);
    setRiderMoreOption(false);
  };
  const handleAssignSosModalShow = () => setAssignSosModal(true);

  const [sosPasswordModal, setSosPasswordModal] = useState(false);
  const handleSosPassClose = () => {
    setSosPasswordModal(false);
    setRiderMoreOption(false);
  };
  const handleSosPasswordModal = () => setSosPasswordModal(true);
  const [vehicleTypeLoading, setVehicleTypeLoading] = useState(false);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  useEffect(() => {
    setVehicleTypeLoading(true);
    dispatch(
      manageDriverVehicleTypeListAction(
        onVehicleTypeSuccess,
        onVehicleTypeError
      )
    );
  }, []);

  const onVehicleTypeSuccess = (data) => {
    setVehicleTypeLoading(false);
    setVehicleTypeList(data?.data);
  };
  const onVehicleTypeError = (data) => {
    setVehicleTypeLoading(false);
    console.log(data);
  };
  const vehicleMakeName = vehicleTypeList?.vehicleMake?.find(
    (item) => item?.id === sosListBody?.driver?.vehicle_details?.vehicle_make
  )?.vehicle_make;
  const vehicleModelName = vehicleTypeList?.vehicleModel?.find(
    (item) => item?.id === sosListBody?.driver?.vehicle_details?.vehicle_model
  )?.vehicle_model;

  console.log(sosListBody, "kjshlkffsfd");

  const complaintData = [
    {
      label: "SOS ID",
      value: sosListBody?.sos_id2 ?? "--",
      display: true,
    },
    {
      label: type === "driverSos" ? "Driver First Name" : "Rider First Name",
      value:
        type === "driverSos"
          ? sosListBody?.driver?.first_name
          : sosListBody?.rider?.first_name,

      display: sosListBody?.booking?.booking_id_2 ? true : false,
    },

    {
      label: "Vehicle make & model",
      value: `${vehicleTypeLoading ? "--" : ""} ${vehicleMakeName ?? "--"} & ${
        vehicleModelName ?? "--"
      }`,
      display: sosListBody?.booking?.booking_id_2 ? true : false,
    },
    {
      label: sosListBody?.driver?.driver_id2 ? "Driver ID" : "Rider ID",
      value:
        sosListBody?.driver?.driver_id2 ??
        sosListBody?.rider?.rider_id2 ??
        "--",
      display: true,
      navLink: true,
      link: sosListBody?.driver?.driver_id2
        ? driverNavigateFn(sosListBody?.driver, sosListBody?.driver?.id)
        : riderNavigateFn(sosListBody?.rider, sosListBody?.rider?.id),
    },
    {
      label: type === "driverSos" ? "Driver Last Name" : "Rider Last Name",
      value:
        type === "driverSos"
          ? sosListBody?.driver?.last_name
          : sosListBody?.rider?.last_name,
      display: sosListBody?.booking?.booking_id_2 ? true : false,
    },
    {
      label: "Vehicle registration ID",
      value:
        sosListBody?.driver?.vehicle_details?.vehicle_registration_number ??
        "data needed",
      display: sosListBody?.booking?.booking_id_2 ? true : false,
    },
    {
      label: "Booking ID",
      value: sosListBody?.booking?.booking_id_2 ?? "--",
      display: sosListBody?.booking?.booking_id_2 ? true : false,
      navLink: true,
      link: `${navigationFn(
        sosListBody?.booking?.booking_classification,
        sosListBody?.booking?.id
      )}`,
    },
    {
      label: sosListBody?.driver?.driver_id2 ? "Rider ID" : "Driver ID",
      value: sosListBody?.driver?.driver_id2
        ? sosListBody?.rider?.rider_id2
        : sosListBody?.rider?.rider_id2
        ? sosListBody?.driver?.driver_id2
        : "--",
      display: sosListBody?.booking?.booking_id_2 ? true : false,
      navLink: true,
      link: sosListBody?.driver?.driver_id2
        ? riderNavigateFn(sosListBody?.rider, sosListBody?.rider?.id)
        : driverNavigateFn(sosListBody?.driver, sosListBody?.driver?.id),
    },
  ];

  const today = new Date().toLocaleDateString("en-IN");

  const [detailsLoading, setdetailsLoading] = useState(false);
  const [responderDetails, setResponderDetails] = useState([]);

  function contactDetailsFn() {
    setdetailsLoading(true);
    dispatch(
      localResponderConatctListAction(
        {
          sos_id: sosListBody?.id,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }

  const onFetchSuccess = (data) => {
    setdetailsLoading(false);
    setResponderDetails(data?.data, "onsuccess");
    handleContactSosModalShow();
    console.log(data);
  };
  const onFetchError = (data) => {
    setdetailsLoading(false);
    console.log(data, "gchgchgchgchg");
    errorToast(data?.data?.data);
  };

  const containerHeight = useDynamicHeight();

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

  return (
    <>
      <SOSCloseResPasswordModal
        sosClosedResPassW={sosPasswordModal}
        handlesosClosedResPassW={handleSosPassClose}
        complaintType={action}
        title={
          action === "closeSos"
            ? "Are you sure you want to Close the SOS?"
            : action === "resolveSos"
            ? "Are you sure you want to Resolve the SOS?"
            : ""
        }
        id={sosListBody?.id}
        setReload={setReload}
        reload={reload}
        type={type}
      />
      <AssignSOSModal
        assignSosModal={assignSosModal}
        handleAssignSosClose={handleAssignSosModalClose}
        complaintType={action}
        id={sosListBody?.id}
        setReload={setReload}
        reload={reload}
        type={type}
        driverID={sosListBody?.driver?.id}
        riderID={sosListBody?.rider?.id}
      />
      <ContactDetailsModal
        contactSosModal={contactSosModal}
        handleContactSosClose={handleContactSosModalClose}
        responderDetails={responderDetails}
      />

      <div
        className="rider_complaints_container p-3 pb-4 mx-sm-3 my-4"
        style={{ Height: `${containerHeight}px` }}
      >
        <div className="mx-3 d-flex justify-content-between mt-3 align-items-center">
          <span className="fs_26 primary_color fw_600">
            {type === "riderSos" ? "My Rider SOS" : "My Driver SOS"}{" "}
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
            <div className="col-xl-3  col-sm-6  ">
              {/* chat sidebar starts */}
              <div className="ms-3 ">
                <div className="position-relative">
                  <input
                    className=" grey_color_bg border_none border_radius_5px outline_none ps-2 p-1 w-100"
                    placeholder="Search text"
                    type="text"
                    onChange={(e) => {
                      setSearchText(e.target.value.toLocaleLowerCase());
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
                    {type === "riderSos" ? "Rider SOS" : "Driver SOS"} (
                    {filterSosList?.length})
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
                <div className="message_sideBar mt-3">
                  {items?.map((items, index) => (
                    <div
                      className={
                        blockFocus === index
                          ? "complaints_block cursor_pointer"
                          : "rider_heading_border_bottom cursor_pointer"
                      }
                      onClick={() => {
                        onClickFn(items, index);
                      }}
                      key={items?.sos_id2}
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
                                    item.id === items?.driver?.id ||
                                    item.id === items?.rider?.id
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
                                    item.id === items?.driver?.id ||
                                    item.id === items?.rider?.id
                                )
                                .map((item) => item?.count)?.[0]
                            }
                          </span>
                        </div>
                        <div className="w-100 pt-1 d-flex flex-column pe-2">
                          <span className="d-flex justify-content-between">
                            <span className="fs_14 fw_500 primary_color">
                              {items?.driver?.first_name ??
                                items?.rider?.first_name ??
                                "--"}
                              {/* {
                            idCountMap
                              ?.filter((item) => item.id === items?.driver?.id)
                              .map((item) => item?.count)?.[0]
                          }{" "}
                          {
                            idCountMap
                              ?.filter((item) => item.id === items?.rider?.id)
                              .map((item) => item?.count)?.[0]
                          } */}
                            </span>
                            <span className="fs_11 orange_color fw_500 d-flex-justify-content-end">
                              {storedMessages?.slice(-1).map((item) => {
                                return item?.createdAt
                                  ? moment(item?.createdAt).format(
                                      "D/M/YYYY"
                                    ) === today
                                    ? moment(item?.createdAt).format("hh:mm A")
                                    : moment(item?.createdAt).format(
                                        "DD/MM/YYYY, hh:mm A"
                                      )
                                  : "--";
                              })}
                            </span>
                          </span>
                          <table className="w_80">
                            <tbody>
                              <tr className="fs_11 fw_500 secondary_color">
                                <td className="text-nowrap ">SOS ID</td>
                                <td className="text-nowrap">
                                  : {items?.sos_id2 ?? "--"}
                                </td>
                              </tr>
                              <tr className="fs_11 fw_500 secondary_color">
                                <td className="text-nowrap">SOS Age : </td>
                                <td className="text-nowrap">
                                  {items?.sos_created_at
                                    ? applicationAge(items?.sos_created_at)
                                    : items?.generated_at
                                    ? applicationAge(items?.generated_at)
                                    : "--"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}{" "}
                </div>
              </div>
              {/* chat sidebar ends */}
            </div>
            <div className="col-xl-9  col-12 mt-xl-0 mt-4 ">
              {showChatBody ? (
                <div className="border border_radius_7px h-100 p-2">
                  <div className="row mb-2">
                    <div className="col-11">
                      <div className="row">
                        <div className="col-lg-1 d-flex justify-content-xl-start ms-xl-0 ms-3 mt-sm-0 my-2 ">
                          <img
                            src={
                              sosListBody?.booking?.driver?.profile_pic
                                ?.photo ??
                              sosListBody?.booking?.rider?.profile_pic?.photo ??
                              null
                            }
                            width="75px"
                            height="75px"
                            className="border_radius_7px"
                          />
                        </div>
                        <div className="col-xl-10 ms-xl-5 ms-3 ">
                          <span className="fs_20 fw_500 primary_color">
                            {sosListBody?.driver?.first_name ??
                              sosListBody?.rider?.first_name ??
                              "--"}{" "}
                            {sosListBody?.driver?.last_name ??
                              sosListBody?.rider?.last_name ??
                              "--"}
                            <span className="secondary_color fs_14 fw_500">
                              (Source: {sosListBody?.source ?? "--"})
                            </span>
                          </span>
                          <div className="row">
                            {complaintData?.map((item) => {
                              return (
                                item?.display && (
                                  <div className={`col-sm-4`}>
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
                                              <a href="">
                                                {item?.value ?? "--"}
                                              </a>
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
                                )
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="d-flex justify-content-end align-items-center me-2 gap-2">
                        <div className="position-relative">
                          <div
                            className="light_blue_color details_text fs_14 fw_500 cursor_pointer "
                            onClick={() => setRiderDetails(!riderDetails)}
                            ref={onClickRef}
                          >
                            <span>Details</span>
                          </div>

                          {riderDetails ? (
                            <div ref={insideClickRef}>
                              <ComplaintsDetails item={sosListBody} />
                            </div>
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
                                      contactDetailsFn();
                                      // handleContactSosModalShow();
                                    }}
                                  >
                                    Contact details
                                  </button>
                                </li>
                                <hr className="list_underline m-1" />
                                <li className="py-1 ">
                                  <button
                                    className={
                                      "background_none border_none  primary_color fs_14 fw_600 cursor_pointer text-nowrap"
                                    }
                                    type="button"
                                    onClick={() => {
                                      handleAssignSosModalShow();
                                      setAction("forwardSos");
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
                                      handleSosPasswordModal();
                                      setAction("closeSos");
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
                                      handleSosPasswordModal();
                                      setAction("resolveSos");
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
                      complaintList={sosListBody}
                      driverID={
                        type === "driverSos" ? sosListBody?.driver_id : null
                      }
                      riderID={
                        type === "riderSos" ? sosListBody?.rider_id : null
                      }
                      roomData={roomData}
                      complaintID={sosListBody?.id}
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
export default SOSMobileApp;
