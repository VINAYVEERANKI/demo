import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import "../../complaints/rider-complaints-components.css";
import DriverImage from "../../../assets/images/profile-photo.jpg";
import { storedMessageSosAction } from "../../../redux/actions/chatSection/chatSectionAction";
import { useDispatch } from "react-redux";
import moment from "moment";
import html2pdf from "html2pdf.js";
import useDisplayToggle from "../../useDisplayToggle";
import { driverNavigateFn, formatDateTime, navigationFn, riderNavigateFn } from "../../helper";
import ComplaintsDetails from "../../complaints/details";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";

const SOSResolvedClosedView = ({
  resolvedSOSView,
  handleResolvedSOSViewClose,
  sosData,
}) => {
  console.log(sosData, "sldfhklf");

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
      storedMessageSosAction(
        {
          driverId: sosData?.driver?.id ?? null,
          riderId: sosData?.rider?.id ?? null,
          roomId: sosData?.driver?.id ?? sosData?.rider?.id ?? "",
          sosId: sosData?.id,
        },
        onSuccess,
        onError
      )
    );
  }, [sosData]);

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data);
    setStoredMessages(data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data);
  };

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

  const sosDataMap = [
    {
      label: "SOS ID",
      value: sosData?.sos_id2 ?? "--",
      display: true,
    },
    {
      label: sosData?.driver?.first_name
        ? "Driver First Name"
        : "Rider First Name",
      value: sosData?.driver?.first_name ?? sosData?.rider?.first_name ?? "--",
      display: sosData?.booking?.booking_id_2 ? true : false,
    },
    {
      label: "Vehicle make & model",
      value: sosData?.driver?.vehicle_details?.vehicle_make
        ? sosData?.driver?.vehicle_details?.vehicle_make +
          " " +
          sosData?.driver?.vehicle_details?.vehicle_model
        : "data needed",
      display: sosData?.booking?.booking_id_2 ? true : false,
    },
    {
      label: sosData?.driver?.driver_id2 ? "Driver ID" : "Rider ID",
      value: sosData?.driver?.driver_id2 ?? sosData?.rider?.rider_id2 ?? "--",
      display: true,
      navLink: true,
      link: sosData?.driver?.driver_id2
      ? driverNavigateFn(sosData?.driver, sosData?.driver?.id)
      : riderNavigateFn(sosData?.rider, sosData?.rider?.id),
    },
    {
      label: sosData?.driver?.last_name
        ? "Driver Last Name"
        : "Rider Last Name",
      value: sosData?.driver?.last_name ?? sosData?.rider?.last_name ?? "--",
      display: sosData?.booking?.booking_id_2 ? true : false,
    },
    {
      label: "Vehicle registration ID",
      value:
        sosData?.driver?.vehicle_details?.vehicle_registration_number ??
        "data needed",
      display: sosData?.booking?.booking_id_2 ? true : false,
    },
    {
      label: "Booking ID",
      value: sosData?.booking?.booking_id_2 ?? "--",
      display: sosData?.booking?.booking_id_2 ? true : false,
      navLink: true,
      link: `${navigationFn(
        sosData?.booking?.booking_classification,
        sosData?.booking?.id
      )}`,
    },
    // {
    //   label: "Driver ID",
    //   value: sosData?.booking?.rider_id_2 ?? "--",
    //   display: sosData?.booking?.booking_id_2 ? true : false,
    // },
    {
      label: sosData?.driver?.driver_id2 ? "Rider ID" : "Driver ID",
      value: sosData?.driver?.driver_id2
        ? sosData?.rider?.rider_id2
        : sosData?.rider?.rider_id2
        ? sosData?.driver?.driver_id2
        : "--",
      display: sosData?.booking?.booking_id_2 ? true : false,
      navLink: true,
      link: sosData?.driver?.driver_id2
        ? riderNavigateFn(sosData?.rider, sosData?.rider?.id)
        : driverNavigateFn(sosData?.driver, sosData?.driver?.id),
    },
  ];
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setRiderDetails,
  });

  console.log(sosData, "gskjgshlk");

  return (
    <>
      <Modal
        centered
        show={resolvedSOSView}
        onHide={handleResolvedSOSViewClose}
        dialogClassName="rider_complaints_mobile_app_view_container"
        contentClassName="border_radius_10px"
        backdropClassName="rider_complaints_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="w-100 d-flex flex-column  chat_messages_view_block">
            <div id="toRender">
              <div className="message_box_view_container">
                <div className="row mb-2 ">
                  <div className="col-10">
                    <div className="row">
                      <div className="col-1 ms-md-0 ms-4">
                        <img
                          src={DriverImage}
                          width="75px"
                          height="75px"
                          className="border_radius_7px"
                        />
                      </div>
                      <div className="col-md-10 ms-md-5 ms-4">
                        <span className="fs_18 fw_500 primary_color">
                          {sosData?.driver?.first_name
                            ? sosData?.driver?.first_name +
                              " " +
                              sosData?.driver?.last_name
                            : sosData?.rider?.first_name
                            ? sosData?.rider?.first_name +
                              " " +
                              sosData?.rider?.last_name
                            : "--"}
                        </span>
                        <div className="row">
                          {sosDataMap?.map((item, index) => {
                            return (
                              item?.display && (
                                <div
                                  className={`${
                                    index % 3 === 0
                                      ? "col-sm-3"
                                      : index % 3 === 1
                                      ? "col-sm-4"
                                      : "col-sm-5"
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
                              )
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="d-flex justify-content-end align-items-center me-2 gap-3">
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
                            {/* {details.map((item) => ( */}
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
                                      {sosData?.createdAt
                                        ? formatDateTime(sosData?.createdAt)
                                        : sosData?.generated_at
                                        ? formatDateTime(sosData?.generated_at)
                                        : "--"}
                                    </td>
                                  </tr>
                                  <tr className="text-nowrap">
                                    <td className="cement_color fs_14 fw_500">
                                      Initiated at
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      : {sosData?.initiatedAt}
                                    </td>
                                  </tr>
                                  <tr className="text-nowrap">
                                    <td className="cement_color fs_14 fw_500">
                                      Initiated by
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      : {sosData?.initiatedBy}
                                    </td>
                                  </tr>
                                  <tr className="text-nowrap">
                                    <td className="cement_color fs_14 fw_500">
                                      Current owner
                                    </td>
                                    <td className="ps-1 primary_color fs_14 fw_500">
                                      : {sosData?.currentOwner}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div> */}
                            {/* ))} */}

                            <ComplaintsDetails item={sosData} />
                          </div>
                        ) : null}
                      </div>

                      <i
                        className="ri-download-2-line align-items-end cursor_pointer"
                        onClick={() => {
                          exportToPdf();
                          // setRiderMoreOption(false);
                        }}
                        // onClick={() => setRiderMoreOption(!riderMoreOption)}
                        // ref={onClickRef}
                      />
                      {/* {riderMoreOption ? (
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
                      ) : null} */}
                      <span
                        onClick={() => handleResolvedSOSViewClose()}
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
                  {storedMessages?.map((item, index) => {
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
                                  {item?.file?.imgType === "application/pdf" ? (
                                    <div
                                      className={`primary_border border_radius_7px px-2 py-1 d-flex align-items-center my-1`}
                                    >
                                      <span className="fs_20 primary_color">
                                        {(item?.file?.imgName).substring(0, 8) +
                                          "......."}
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
                                    {moment(item?.createdAt).format("hh:mm A")}
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
            {sosData?.assigned_at && !sosData?.re_assigned_at && (
              <>
                <span className="fs_13 primary_color fw_500">
                  Assigned at{" "}
                  {moment(sosData?.assigned_at).format("DD-MM-YYYY")}{" "}
                  <span className="secondary_color fs_12">
                    {moment(sosData?.assigned_at).format("hh-mm A")}
                  </span>
                </span>
              </>
            )}
            {sosData?.forworded_at && (
              <>
                <span className="fs_13 primary_color fw_500">
                  Fowarded at{" "}
                  {moment(sosData?.forworded_at).format("DD-MM-YYYY")}{" "}
                  <span className="secondary_color fs_12">
                    {moment(sosData?.forworded_at).format("hh-mm A")}
                  </span>
                </span>
              </>
            )}
            {sosData?.re_assigned_at && (
              <>
                <span className="fs_13 primary_color fw_500">
                  Reassigned at{" "}
                  {moment(sosData?.re_assigned_at).format("DD-MM-YYYY")}{" "}
                  <span className="secondary_color fs_12">
                    {moment(sosData?.re_assigned_at).format("hh-mm A")}
                  </span>
                </span>
              </>
            )}

            {/* <div
              className={
                sosData?.sos_status === "Resolved"
                  ? "fs_16 fw_500 green_color fw_500"
                  : "fs_16 fw_500 ash_color fw_500"
              }
            >
              ---------{sosData?.sos_status}---------
            </div> */}

            <div className="w-100 mt-2 d-flex justify-content-center align-items-center">
              <div
                className={
                  sosData?.sos_status === "Resolved"
                    ? "message_text_line_resolved"
                    : "message_text_line_closed"
                }
              ></div>
              <div
                className={
                  sosData?.sos_status === "Resolved"
                    ? "fs_16 fw_500 green_color fw_500"
                    : "fs_16 fw_500 ash_color fw_500"
                }
              >
                {sosData?.sos_status}
              </div>
              <div
                className={
                  sosData?.sos_status === "Resolved"
                    ? "message_text_line_resolved"
                    : "message_text_line_closed"
                }
              ></div>
            </div>

            <span className="secondary_color fs_12">
              {sosData?.closed_at
                ? moment(sosData?.closed_at).format("hh:mm A")
                : sosData?.resolved_at
                ? moment(sosData?.resolved_at).format("hh:mm A")
                : ""}
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const details = [
  {
    receivedAt: "12-02-2022, 11:00 am",
    initiatedAt: "12-02-2022, 11:00 am",
    initiatedBy: "Admin 1",
    currentOwner: "Admin 1",
  },
];

export default SOSResolvedClosedView;
