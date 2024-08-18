import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import "../rider-complaints-components.css"
import DriverImage from "../../../assets/images/profile-photo.jpg";
import {
  applicationAge,
  driverNavigateFn,
  formatDateTime,
  navigationFn,
  riderNavigateFn,
} from "../../helper";
import { storedMessageAction } from "../../../redux/actions/chatSection/chatSectionAction";
import { useDispatch } from "react-redux";
import moment from "moment";
import html2pdf from "html2pdf.js";
import useDisplayToggle from "../../useDisplayToggle";
import ComplaintsDetails from "../details";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";

const DriverResolvedMobileAppViewModal = ({
  driverResolveCMPTMobileAppView,
  handleDriverResolveCMPTMobileAppViewClose,
  complaintList,
}) => {
  console.log(complaintList);
  const dispatch = useDispatch();
  const [riderDetails, setRiderDetails] = useState(false);
  const [riderMoreOption, setRiderMoreOption] = useState(false);
  const [storedMessages, setStoredMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [ADMINID, setADMINID] = useState("");
  useEffect(() => {
    setADMINID(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      storedMessageAction(
        {
          adminId: ADMINID,
          driverId: complaintList?.booking?.driver?.id ?? null,
          riderId: complaintList?.booking?.rider?.id ?? null,
          roomId:
            complaintList?.booking?.driver?.id ??
            complaintList?.booking?.rider?.id ??
            "",
          complaintId: complaintList?.id,
        },
        0,
        15,
        onSuccess,
        onError
      )
    );
  }, [complaintList]);

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data);
    setStoredMessages(data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data);
  };

  console.log(loading, "lkkfnalk");

  const exportToPdf = () => {
    const toRender = document.getElementById("toRender");
    const options = {
      margin: [0, 0],
      filename: "message.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(toRender).save();
  };

  // get today's date and yesterday's date
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  let lastDateDisplayed = "";

  const complaintDetails = [
    {
      label: "Complaint",
      value: complaintList?.complaint_id2 ?? "--",
      subValue: `(Complaint age: ${
        complaintList?.complented_at
          ? applicationAge(complaintList?.complented_at)
          : "--"
      })`,
    },
    { label: "Type", value: complaintList?.complaint_type ?? "--" },
    {
      label: complaintList?.booking?.driver ? "Driver ID" : "Rider ID",
      value: complaintList?.booking?.driver
        ? complaintList?.booking?.driver?.driver_id2
        : complaintList?.booking?.rider
        ? complaintList?.booking?.rider?.rider_id2
        : "--",
      navLink: true,
      link: complaintList?.booking?.driver
        ? `${driverNavigateFn(
            complaintList?.booking?.driver,
            complaintList?.booking?.driver?.id
          )}`
        : `${riderNavigateFn(
            complaintList?.booking?.rider,
            complaintList?.booking?.rider?.id
          )}`,
    },
    { label: "Title", value: complaintList?.complaint_title ?? "--" },
    {
      label: "Booking ID",
      value: complaintList?.booking?.booking_id_2 ?? "--",
      navLink: true,
      link: complaintList?.booking?.id
        ? navigationFn(
            complaintList?.booking?.booking_classification,
            complaintList?.booking?.id
          )
        : "",
    },
  ];

  console.log(complaintList, "asdasdasdasd");

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setRiderDetails,
  });
  return (
    <>
      <Modal
        centered
        show={driverResolveCMPTMobileAppView}
        onHide={handleDriverResolveCMPTMobileAppViewClose}
        dialogClassName="rider_complaints_mobile_app_view_container"
        contentClassName="border_radius_10px"
        backdropClassName="rider_complaints_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <>
            <div className="w-100 d-lg-flex flex-column  chat_messages_view_block">
              <div id="toRender">
                <div className="message_box_view_container">
                  <div className="row mb-2 ">
                    <div className="col-10">
                      <div className="row mt-2">
                        <div className="col-lg-1 d-flex justify-content-lg-start justify-content-center">
                          <img
                            src={DriverImage}
                            width="75px"
                            height="75px"
                            className="border_radius_7px"
                          />
                        </div>
                        <div className="col-lg-10 ms-4">
                          <span className="fs_16 fw_500 primary_color">
                            {complaintList?.booking?.driver?.first_name}
                          </span>
                          <div className="row">
                            {complaintDetails?.map((item, index) => {
                              return (
                                <div
                                  className={`${
                                    index % 2 === 0 ? "col-sm-7" : "col-sm-5"
                                  }`}
                                >
                                  <table>
                                    <tbody>
                                      <tr className="fs_11 fw_500">
                                        <td className="secondary_color">
                                          {item?.label}
                                        </td>
                                        {/* <td className="ps-2 primary_color">
                                          {item?.label === "Driver ID" ||
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
                              {/* <div className="rider_details_container border_radius_7px  white_bg border_radius p-3">
                              <span className="primary_color fs_16 fw_500">
                                Details
                              </span>
                              <table className="text-nowrap">
                                <tbody>
                                  <tr>
                                    <td className="cement_color fs_14 fw_500">
                                      Received at
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      :{" "}
                                      {formatDateTime(
                                        complaintList?.complented_at
                                      ) ?? "--"}
                                    </td>
                                  </tr>
                                  <tr className="text-nowrap">
                                    <td className="cement_color fs_14 fw_500">
                                      Initiated at
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      :{" "}
                                      {formatDateTime(
                                        complaintList?.initiated_at
                                      ) ?? "--"}
                                    </td>
                                  </tr>
                                  <tr className="text-nowrap">
                                    <td className="cement_color fs_14 fw_500">
                                      Initiated by
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      :{" "}
                                      {complaintList?.InitiatedBy
                                        ?.initiated_by ?? "--"}
                                    </td>
                                  </tr>
                                  <tr className="text-nowrap">
                                    <td className="cement_color fs_14 fw_500">
                                      Current owner
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      :{" "}
                                      {complaintList?.CurrentOwnerName
                                        ?.user_name ?? "--"}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div> */}
                              <ComplaintsDetails item={complaintList} />
                            </div>
                          ) : null}
                        </div>

                        <i
                          className="ri-more-2-fill align-items-end cursor_pointer"
                          onClick={() => setRiderMoreOption(!riderMoreOption)}
                        />
                        {riderMoreOption ? (
                          <div className="rider_message_download_button white_bg border_radius_7px">
                            <button
                              className={
                                "background_none border_none  primary_color fs_16 fw_600 cursor_pointer text-nowrap p-2"
                              }
                              type="button"
                              onClick={() => {
                                exportToPdf();
                                setRiderMoreOption(false);
                              }}
                            >
                              Download
                            </button>
                          </div>
                        ) : null}

                        <span
                          onClick={() =>
                            handleDriverResolveCMPTMobileAppViewClose()
                          }
                          className="cursor_pointer"
                        >
                          <i className="ri-close-circle-fill primary_color fs_22" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {loading ? (
                  <LoadingSpinnerTable />
                ) : (
                  <>
                    {storedMessages?.data?.map((item, index) => {
                      const messageDate = moment(item?.createdAt);

                      if (messageDate.isSame(lastDateDisplayed, "day")) {
                        // don't display the date
                      } else {
                        // display the date and update lastDateDisplayed
                        lastDateDisplayed = messageDate;
                        const isFirstMessage =
                          index === 0 ||
                          moment(storedMessages[index - 1]?.createdAt).isBefore(
                            messageDate.startOf("day")
                          );
                        if (messageDate.isSame(today, "day")) {
                          return (
                            <>
                              {isFirstMessage && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center my-2 primary_color fs_14 fw_500"
                                  >
                                    Today
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}

                              {item?.reAssignedAt && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center primary_color fs_14 fw_500 my-2"
                                  >
                                    <span className="primary_color fs_16 fw_500">
                                      Re-assgined at{" "}
                                    </span>

                                    {item?.reAssignedAt
                                      ? moment(item?.reAssignedAt).format(
                                          "DD/MM/YYYY, hh:mm A"
                                        )
                                      : null}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              {item?.forwardedAt && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center primary_color fs_14 fw_500 my-2"
                                  >
                                    <span className="primary_color fs_16 fw_500">
                                      Forward at
                                    </span>
                                    {item?.forwardedAt
                                      ? moment(item?.forwardedAt).format(
                                          "DD/MM/YYYY, hh:mm A"
                                        )
                                      : null}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              <div
                                key={`message-${index}`}
                                className={`d-flex px-4 ${
                                  item?.adminId
                                    ? `justify-content-end`
                                    : `justify-content-start`
                                }`}
                              >
                                <div className="message_list_body my-1">
                                  {item?.file?.img && (
                                    <div
                                      className={`d-flex  ${
                                        item?.adminId
                                          ? `justify-content-end`
                                          : `justify-content-start`
                                      }`}
                                    >
                                      <a
                                        href={item?.file?.img}
                                        download={item?.file?.imgName}
                                        className="text_decoration_none"
                                      >
                                        {item?.file?.imgType ===
                                        "application/pdf" ? (
                                          <div
                                            className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                          >
                                            <span className="fs_20 primary_color">
                                              {(item?.file?.imgName).substring(
                                                0,
                                                8
                                              ) + "......."}
                                            </span>
                                            <span className="my-2">
                                              <i
                                                className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                              />
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={item?.file?.img}
                                              height={130}
                                              width={130}
                                              className={`border_radius_7px my-1`}
                                            />
                                          </>
                                        )}
                                      </a>
                                    </div>
                                  )}
                                  {item?.message_data && (
                                    <div
                                      className={`${
                                        item?.adminId
                                          ? `mesaage_block_user white_color p-3`
                                          : `message_block_sender primary_color p-3`
                                      }`}
                                    >
                                      {item.message_data}
                                    </div>
                                  )}
                                  {item?.reAssignedAt === null &&
                                    item?.forwardedAt === null && (
                                      <div
                                        className={`d-flex ${
                                          item.adminId
                                            ? `justify-content-start`
                                            : `justify-content-end`
                                        }`}
                                      >
                                        <span className="disabled_color fs_12 fw_500">
                                          {moment(item?.createdAt).format(
                                            "hh:mm A"
                                          )}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </>
                          );
                        } else if (messageDate.isSame(yesterday, "day")) {
                          return (
                            <>
                              {isFirstMessage && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center my-2 primary_color fs_14 fw_500"
                                  >
                                    Yesterday
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              {item?.reAssignedAt && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center primary_color fs_14 fw_500 my-2"
                                  >
                                    <span className="primary_color fs_16 fw_500">
                                      Re-assgined at{" "}
                                    </span>

                                    {item?.reAssignedAt
                                      ? moment(item?.reAssignedAt).format(
                                          "DD/MM/YYYY, hh:mm A"
                                        )
                                      : null}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              {item?.forwardedAt && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center primary_color fs_14 fw_500 my-2"
                                  >
                                    <span className="primary_color fs_16 fw_500">
                                      Forward at
                                    </span>
                                    {item?.forwardedAt
                                      ? moment(item?.forwardedAt).format(
                                          "DD/MM/YYYY, hh:mm A"
                                        )
                                      : null}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              <div
                                key={`message-${index}`}
                                className={`d-flex px-4 ${
                                  item?.adminId
                                    ? `justify-content-end`
                                    : `justify-content-start`
                                }`}
                              >
                                <div className="message_list_body my-1">
                                  {/* {item?.adminId !== ADMIN_DETAILS.id && (
                        <div>
                          <span className="primary_color fs_14 fw_500">
                            {item?.author}
                          </span>
                        </div>
                      )} */}

                                  {item?.file?.img && (
                                    <div
                                      className={`d-flex  ${
                                        item?.adminId
                                          ? `justify-content-end`
                                          : `justify-content-start`
                                      }`}
                                    >
                                      <a
                                        href={item?.file?.img}
                                        download={item?.file?.imgName}
                                        className="text_decoration_none"
                                      >
                                        {item?.file?.imgType ===
                                        "application/pdf" ? (
                                          <div
                                            className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                          >
                                            <span className="fs_20 primary_color">
                                              {(item?.file?.imgName).substring(
                                                0,
                                                8
                                              ) + "......."}
                                            </span>
                                            <span className="my-2">
                                              <i
                                                className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                              />
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={item?.file?.img}
                                              height={130}
                                              width={130}
                                              className={`border_radius_7px my-1`}
                                            />
                                          </>
                                        )}
                                      </a>
                                    </div>
                                  )}
                                  {item?.message_data && (
                                    <div
                                      className={`${
                                        item?.adminId
                                          ? `mesaage_block_user white_color p-3`
                                          : `message_block_sender primary_color p-3`
                                      }`}
                                    >
                                      {item.message_data}
                                    </div>
                                  )}

                                  {item?.reAssignedAt === null &&
                                    item?.forwardedAt === null && (
                                      <div
                                        className={`d-flex ${
                                          item.adminId
                                            ? `justify-content-start`
                                            : `justify-content-end`
                                        }`}
                                      >
                                        <span className="disabled_color fs_12 fw_500">
                                          {moment(item?.createdAt).format(
                                            "hh:mm A"
                                          )}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </>
                          );
                        } else {
                          return (
                            <>
                              {isFirstMessage && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center my-2 primary_color fs_14 fw_500"
                                  >
                                    {messageDate.format("DD/MM/YYYY")}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}

                              {item?.reAssignedAt && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center primary_color fs_14 fw_500 my-2"
                                  >
                                    <span className="primary_color fs_16 fw_500">
                                      Re-assgined at{" "}
                                    </span>

                                    {item?.reAssignedAt
                                      ? moment(item?.reAssignedAt).format(
                                          "DD/MM/YYYY, hh:mm A"
                                        )
                                      : null}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              {item?.forwardedAt && (
                                <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                                  <div className="message_text_line"></div>
                                  <div
                                    key={`date-${index}`}
                                    className="text-center primary_color fs_14 fw_500 my-2"
                                  >
                                    <span className="primary_color fs_16 fw_500">
                                      Forward at
                                    </span>
                                    {item?.forwardedAt
                                      ? moment(item?.forwardedAt).format(
                                          "DD/MM/YYYY, hh:mm A"
                                        )
                                      : null}
                                  </div>
                                  <div className="message_text_line"></div>
                                </div>
                              )}
                              <div
                                key={`message-${index}`}
                                className={`d-flex px-4 ${
                                  item?.adminId
                                    ? `justify-content-end`
                                    : `justify-content-start`
                                }`}
                              >
                                <div className="message_list_body my-1">
                                  {/* {item?.adminId !== ADMIN_DETAILS.id && (
                        <div>
                          <span className="primary_color fs_14 fw_500">
                            {item?.author}
                          </span>
                        </div>
                      )} */}

                                  {item?.file?.img && (
                                    <div
                                      className={`d-flex  ${
                                        item?.adminId
                                          ? `justify-content-end`
                                          : `justify-content-start`
                                      }`}
                                    >
                                      <a
                                        href={item?.file?.img}
                                        download={item?.file?.imgName}
                                        className="text_decoration_none"
                                      >
                                        {item?.file?.imgType ===
                                        "application/pdf" ? (
                                          <div
                                            className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                          >
                                            <span className="fs_20 primary_color">
                                              {(item?.file?.imgName).substring(
                                                0,
                                                8
                                              ) + "......."}
                                            </span>
                                            <span className="my-2">
                                              <i
                                                className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                              />
                                            </span>
                                          </div>
                                        ) : (
                                          <>
                                            <img
                                              src={item?.file?.img}
                                              height={130}
                                              width={130}
                                              className={`border_radius_7px my-1`}
                                            />
                                          </>
                                        )}
                                      </a>
                                    </div>
                                  )}
                                  {item?.message_data && (
                                    <div
                                      className={`${
                                        item?.adminId
                                          ? `mesaage_block_user white_color p-3`
                                          : `message_block_sender primary_color p-3`
                                      }`}
                                    >
                                      {item.message_data}
                                    </div>
                                  )}

                                  {item?.reAssignedAt === null &&
                                    item?.forwardedAt === null && (
                                      <div
                                        className={`d-flex ${
                                          item.adminId
                                            ? `justify-content-start`
                                            : `justify-content-end`
                                        }`}
                                      >
                                        <span className="disabled_color fs_12 fw_500">
                                          {moment(item?.createdAt).format(
                                            "hh:mm A"
                                          )}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </>
                          );
                        }
                      }

                      return (
                        <>
                          {item?.reAssignedAt && (
                            <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                              <div className="message_text_line"></div>
                              <div
                                key={`date-${index}`}
                                className="text-center primary_color fs_14 fw_500 my-2"
                              >
                                <span className="primary_color fs_16 fw_500">
                                  Re-assgined at{" "}
                                </span>

                                {item?.reAssignedAt
                                  ? moment(item?.reAssignedAt).format(
                                      "DD/MM/YYYY, hh:mm A"
                                    )
                                  : null}
                              </div>
                              <div className="message_text_line"></div>
                            </div>
                          )}
                          {item?.forwardedAt && (
                            <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                              <div className="message_text_line"></div>
                              <div
                                key={`date-${index}`}
                                className="text-center primary_color fs_14 fw_500 my-2"
                              >
                                <span className="primary_color fs_16 fw_500">
                                  Forward at
                                </span>
                                {item?.forwardedAt
                                  ? moment(item?.forwardedAt).format(
                                      "DD/MM/YYYY, hh:mm A"
                                    )
                                  : null}
                              </div>
                              <div className="message_text_line"></div>
                            </div>
                          )}
                          <div
                            key={index}
                            className={`d-flex px-4 ${
                              item?.adminId
                                ? `justify-content-end`
                                : `justify-content-start`
                            }`}
                          >
                            <div className="message_list_body my-1">
                              {item?.adminId !== ADMINID && (
                                <div>
                                  <span className="primary_color fs_14 fw_500">
                                    {item?.author}
                                  </span>
                                </div>
                              )}

                              {item?.file?.img && (
                                <div
                                  className={`d-flex  ${
                                    item?.adminId
                                      ? `justify-content-end`
                                      : `justify-content-start`
                                  }`}
                                >
                                  <a
                                    href={item?.file?.img}
                                    download={item?.file?.imgName}
                                    className="text_decoration_none"
                                  >
                                    {item?.file?.imgType ===
                                    "application/pdf" ? (
                                      <div
                                        className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                      >
                                        <span className="fs_20 primary_color">
                                          {(item?.file?.imgName).substring(
                                            0,
                                            8
                                          ) + "......."}
                                        </span>
                                        <span className="my-2">
                                          <i
                                            className={`ri-download-line fs_20 primary_color ms-2 border_radius_50per p-2 primary_border fw_700`}
                                          />
                                        </span>
                                      </div>
                                    ) : (
                                      <>
                                        <img
                                          src={item?.file?.img}
                                          height={130}
                                          width={130}
                                          className={`border_radius_7px my-1`}
                                        />
                                      </>
                                    )}
                                  </a>
                                </div>
                              )}
                              {item?.message_data && (
                                <div
                                  className={`${
                                    item?.adminId
                                      ? `mesaage_block_user white_color p-3`
                                      : `message_block_sender primary_color p-3`
                                  }`}
                                >
                                  {item.message_data}
                                </div>
                              )}
                              {item?.reAssignedAt === null &&
                                item?.forwardedAt === null && (
                                  <div
                                    className={`d-flex ${
                                      item.adminId
                                        ? `justify-content-start`
                                        : `justify-content-end`
                                    }`}
                                  >
                                    <span className="disabled_color fs_12 fw_500">
                                      {moment(item?.createdAt).format(
                                        "hh:mm A"
                                      )}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="d-flex flex-column text-center">
              {complaintList?.assigned_at && !complaintList?.re_assigned_at && (
                <>
                  <span className="fs_13 primary_color fw_500">
                    Assigned at{" "}
                    {moment(complaintList?.assigned_at).format("DD-MM-YYYY")}{" "}
                    <span className="secondary_color fs_12">
                      {moment(complaintList?.assigned_at).format("hh-mm A")}
                    </span>
                  </span>
                </>
              )}
              {complaintList?.forworded_at && (
                <>
                  <span className="fs_13 primary_color fw_500">
                    Fowarded at{" "}
                    {moment(complaintList?.forworded_at).format("DD-MM-YYYY")}{" "}
                    <span className="secondary_color fs_12">
                      {moment(complaintList?.forworded_at).format("hh-mm A")}
                    </span>
                  </span>
                </>
              )}
              {complaintList?.re_assigned_at && (
                <>
                  <span className="fs_13 primary_color fw_500">
                    Reassigned at{" "}
                    {moment(complaintList?.re_assigned_at).format("DD-MM-YYYY")}{" "}
                    <span className="secondary_color fs_12">
                      {moment(complaintList?.re_assigned_at).format("hh-mm A")}
                    </span>
                  </span>
                </>
              )}

              {/* <div
              className={
                complaintList?.complaint_status === "Resolved"
                  ? "fs_16 fw_500 green_color fw_500"
                  : "fs_16 fw_500 ash_color fw_500"
              }
            >
              ---------{complaintList?.complaint_status}---------
            </div> */}

              <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
                <div
                  className={
                    complaintList?.complaint_status === "Resolved"
                      ? "message_text_line_resolved"
                      : "message_text_line_closed"
                  }
                ></div>
                <div
                  className={
                    complaintList?.complaint_status === "Resolved"
                      ? "fs_16 fw_500 green_color fw_500"
                      : "fs_16 fw_500 ash_color fw_500"
                  }
                >
                  {complaintList?.complaint_status}
                </div>
                <div
                  className={
                    complaintList?.complaint_status === "Resolved"
                      ? "message_text_line_resolved"
                      : "message_text_line_closed"
                  }
                ></div>
              </div>

              <span className="secondary_color fs_12">
                {complaintList?.closed_at
                  ? moment(complaintList?.closed_at).format("hh:mm A")
                  : complaintList?.resolved_at
                  ? moment(complaintList?.resolved_at).format("hh:mm A")
                  : ""}
              </span>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DriverResolvedMobileAppViewModal;
