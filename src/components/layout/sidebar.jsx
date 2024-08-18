import React, { useEffect, useState } from "react";
import "./layout.css";
import ComrideLogo from "../../assets/images/comride-logo.png";
import CloseIcon from "../../assets/icons/close-icon";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowDownIcon from "../../assets/icons/arrowDownIcon";
import ArrowUpIcon from "../../assets/icons/arrowUpIcon";
import { useDispatch } from "react-redux";
import { adminFindOne } from "../../redux/actions/manageAdminsAction";
import { socket } from "../../redux/config";

const Sidebar = ({ sideBarOpen, handleSidebarClose }) => {
  const dispatch = useDispatch();
  const [sidebarMenu, setSidebarMenu] = useState(null);

  const handleMenuClick = (menuIndex) => {
    if (menuIndex === sidebarMenu) {
      setSidebarMenu(null);
    } else {
      setSidebarMenu(menuIndex);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [permissions, setPermissions] = useState([]);

  const [perSoketData, setPerSoketData] = useState(null);

  useEffect(() => {
    socket.on("admin_findone_reload", (data) => {
      setPerSoketData(data);
    });
  }, [socket]);

  console.log(perSoketData, "sfkjafa");

  useEffect(() => {
    const id = localStorage.getItem("id");
    dispatch(
      adminFindOne(
        {
          id: id,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }, [perSoketData]);

  const onFetchSuccess = (data) => {
    console.log(data, "sfdsgsdfsd");
    setPerSoketData(null);
    localStorage.setItem(
      "permissions",
      JSON.stringify(data?.data?.permissions)
    );
    const permissionsData = data?.data?.permissions;
    const editedPermissionsData = JSON.parse(
      localStorage.getItem("editedPermissions")
    );
    const editedAdminIdData = JSON.parse(localStorage.getItem("editedAdminId"));
    const userAdminIdData = localStorage.getItem("id");
    if (userAdminIdData === editedAdminIdData) {
      setPermissions(editedPermissionsData);
    } else if (permissionsData) {
      setPermissions(permissionsData);
    } else {
    }
  };
  const onFetchError = (data) => {
    console.log(data);
  };

  console.log(permissions, "askdakd");

  const sideBarMenuList = [
    // {
    //   heading: "Dashboard",
    //   path: "/",
    //   display: true
    // },
    {
      heading: "Drivers Dashboard",
      path: "/drivers-dashboard",
      display: true
    },
    {
      heading: "Complaints Dashboard",
      path: "/complaints-dashboard",
      display: true
    },
    {
      heading: "Analysis Dashboard",
      list: [
        {
          title: "Rider Metrics",
          path: "/rider-metrics",
          display: true
        },
        {
          title: "Driver Metrics",
          path: "/driver-metrics",
          display: true
        },
        {
          title: "Booking Metrics",
          path: "/booking-metrics",
          display: true
        },
        {
          title: "Cancellation Metrics",
          path: "/cancellation-metrics",
          display: true
        },
        {
          title: "Earning Metrics",
          path: "/earning-metrics",
          display: true
        },
      ]
    },
    {
      heading: "Admins",
      list: [
        {
          title: "Admin Users",
          path: "/admin-users",
          display:
            permissions?.admin_users?.read || permissions?.admin_users?.write,
        },
        {
          title: "Blocked Admins",
          path: "/blocked-admins",
          display:
            permissions?.blocked_admins?.read ||
            permissions?.blocked_admins?.write,
        },
        {
          title: "Deleted Admins",
          path: "/deleted-admins",
          display:
            permissions?.deleted_admins?.read ||
            permissions?.deleted_admins?.write,
        },
      ],
    },
    {
      heading: "Riders",
      list: [
        {
          title: "Manage Riders",
          path: "/manage-riders",
          display:
            permissions?.manage_riders?.read ||
            permissions?.manage_riders?.write,
        },
        {
          title: "Blocked Riders",
          path: "/blocked-riders",
          display:
            permissions?.blocked_riders?.read ||
            permissions?.blocked_riders?.write,
        },
      ],
    },
    {
      heading: "Drivers",
      list: [
        {
          title: "Manage Drivers",
          path: "/manage-drivers",
          display:
            permissions?.manage_drivers?.read ||
            permissions?.manage_drivers?.write,
        },
        {
          title: "Pending Applications",
          path: "/pending-applications",
          display:
            permissions?.pending_application?.read ||
            permissions?.pending_application?.write,
        },
        {
          title: "Blocked Drivers",
          path: "/blocked-drivers",
          display:
            permissions?.blocked_driver?.read ||
            permissions?.blocked_driver?.write,
        },
        {
          title: "Banned Applications",
          path: "/banned-application",
          display:
            permissions?.banned_application?.read ||
            permissions?.banned_application?.write,
        },
        {
          title: "Rejected Applications",
          path: "/rejected-applications",
          display:
            permissions?.rejected_application?.read ||
            permissions?.rejected_application?.write,
        },

        {
          title: "Expired Documents",
          path: "/expired-documents",
          display:
            permissions?.expired_documents?.read ||
            permissions?.expired_documents?.write,
        },
      ],
    },
    {
      heading: "Deleted Users",
      list: [
        {
          title: "Deleted Riders",
          path: "/deleted-riders",
          display:
            permissions?.deleted_riders?.read ||
            permissions?.deleted_riders?.write,
        },
        {
          title: "Permanently Deleted Riders",
          path: "/permanently-deleted-riders",
          display:
            permissions?.permanentely_deleted_riders?.read ||
            permissions?.permanentely_deleted_riders?.write,
        },
        {
          title: "Deleted Drivers",
          path: "/deleted-drivers",
          display:
            permissions?.deleted_drivers?.read ||
            permissions?.deleted_drivers?.write,
        },

        {
          title: "Permanently Deleted Drivers",
          path: "/permanently-deleted-drivers",
          display:
            permissions?.permanentely_deleted_drivers?.read ||
            permissions?.permanentely_deleted_drivers?.write,
        },
      ],
    },
    {
      heading: "Booking Request",
      list: [
        {
          title: "Ongoing Requests",
          path: "/manage-booking-requests/ongoing-requests",
          display:
            permissions?.ongoing_booking_requests?.read ||
            permissions?.ongoing_booking_requests?.write,
        },
        {
          title: "Unsuccessful Requests",
          path: "/manage-booking-requests/unsucessful-requests",
          display:
            permissions?.unsuccessful_booking_requests?.read ||
            permissions?.unsuccessful_booking_requests?.write,
        },
      ],
    },
    {
      heading: "Bookings",
      list: [
        {
          title: "Ongoing Bookings",
          path: "/manage-bookings/ongoing-bookings",
          display:
            permissions?.ongoing_booking?.read ||
            permissions?.ongoing_booking?.write,
        },
        {
          title: "Completed Bookings",
          path: "/manage-bookings/completed-bookings",
          display:
            permissions?.completed_booking?.read ||
            permissions?.completed_booking?.write,
        },
        {
          title: "Cancelled Bookings",
          path: "/manage-bookings/cancelled-bookings",
          display:
            permissions?.cancelled_booking?.read ||
            permissions?.cancelled_booking?.write,
        },
        {
          title: "Accident Bookings",
          path: "/manage-bookings/accident-bookings",
          display:
            permissions?.accident_booking?.read ||
            permissions?.accident_booking?.write,
        },
        {
          title: "Adjusted Bookings",
          path: "/manage-bookings/adjusted-bookings",
          display:
            permissions?.adjusted_booking?.read ||
            permissions?.adjusted_booking?.write,
        },
      ],
    },
    {
      heading: "Booking Invoices",
      list: [
        {
          title: "Booking Invoices",
          path: "/trip-invoices",
          display:
            permissions?.booking_invoice?.read ||
            permissions?.booking_invoice?.write,
        },
      ],
    },
    {
      heading: "Rider Refunds",
      list: [
        {
          title: "Pending Refund",
          path: "/refund/pending-refund",
          display:
            permissions?.pending_refund?.read ||
            permissions?.pending_refund?.write,
        },
        {
          title: "Successful Refund",
          path: "/refund/successful-refund",
          display:
            permissions?.successful_refund?.read ||
            permissions?.successful_refund?.write,
        },
        {
          title: "Cancelled Refund",
          path: "/refund/cancelled-refund",
          display:
            permissions?.cancelled_refund?.read ||
            permissions?.cancelled_refund?.write,
        },
      ],
    },

    {
      heading: "Driver Premium Refunds",
      list: [
        {
          title: "Pending Refund",
          path: "/premium-refund/pending-refund",
          display:
            permissions?.pending_refund?.read ||
            permissions?.pending_refund?.write,
        },
        {
          title: "Successful Refund",
          path: "/premium-refund/successful-refund",
          display:
            permissions?.successful_refund?.read ||
            permissions?.successful_refund?.write,
        },
        {
          title: "Cancelled Refund",
          path: "/premium-refund/cancelled-refund",
          display:
            permissions?.cancelled_refund?.read ||
            permissions?.cancelled_refund?.write,
        },
      ],
    },

    {
      heading: "Driver Metrics",
      list: [
        {
          title: "Driver Metrics",
          path: "/driver-metrics",
          display:
            permissions?.driver_metrics?.read ||
            permissions?.driver_metrics?.write,
        },
      ],
    },
    {
      heading: "Driver Finances",
      list: [
        {
          title: "Current Balance",
          path: "/driver-finance-current-balance",
          display:
            permissions?.driver_finance?.read ||
            permissions?.driver_finance?.write,
        },
        {
          title: "Create Cash Transaction",
          path: "/driver-finance-create-cash-transaction",
          display:
            permissions?.driver_finance?.read ||
            permissions?.driver_finance?.write,
        },
        {
          title: "Cash Transactions History",
          path: "/driver-finance-cash-transaction-history",
          display:
            permissions?.driver_finance?.read ||
            permissions?.driver_finance?.write,
        },
        {
          title: "Cashout Balance History",
          path: "/driver-finance-cashout-balance-history",
          display:
            permissions?.driver_finance?.read ||
            permissions?.driver_finance?.write,
        },
        {
          title: "Successful Cashout",
          path: "/driver-finance-successful-cashout",
          display:
            permissions?.driver_finance?.read ||
            permissions?.driver_finance?.write,
        },
      ],
    },

    {
      heading: "Ride Type & Vehicle Type",
      list: [
        {
          title: "Ride Types",
          path: "/ride-type",
          display:
            permissions?.ride_types?.read || permissions?.ride_types?.write,
        },
        {
          title: "Vehicle Types",
          path: "/vehicle-type",
          display:
            permissions?.vehicle_types?.read ||
            permissions?.vehicle_types?.write,
        },
      ],
    },
    {
      heading: "Zones",
      list: [
        {
          title: "Manage Zones",
          path: "/manage-zone",
          display:
            permissions?.manage_zones?.read || permissions?.manage_zones?.write,
        },
        {
          title: "Blocked Zones",
          path: "/block-zone",
          display:
            permissions?.blocked_zones?.read ||
            permissions?.blocked_zones?.write,
        },
        {
          title: "Archived Zones",
          path: "/archived-zone",
          display:
            permissions?.archived_zones?.read ||
            permissions?.archived_zones?.write,
        },
      ],
    },
    {
      heading: "Fares",
      list: [
        {
          title: "Manage Fares",
          path: "/manage-fares",
          display:
            permissions?.manage_fares?.read || permissions?.manage_fares?.write,
        },
        {
          title: "Default Fares",
          path: "/default-fare",
          display:
            permissions?.defualt_fares?.read ||
            permissions?.defualt_fares?.write,
        },
        {
          title: "Deleted Intra Fares",
          path: "/deleted-intra-fares",
          display:
            permissions?.deleted_intrazone_fares?.read ||
            permissions?.deleted_intrazone_fares?.write,
        },
        {
          title: "Archived Fares",
          path: "/archive-fares",
          display:
            permissions?.archived_fares?.read ||
            permissions?.archived_fares?.write,
        },
      ],
    },
    {
      heading: "Driver Premiums",
      list: [

        {
          title: "Manage Driver Premiums",
          path: "/driver-premium/premium",
          display: true,
        },
        {
          title: "Default Driver Premiums",
          path: "/driver-premium/default",
          display: true,
        },
        // {
        //   title: "Premium History",
        //   path: "/premiumhistory",
        //   display: true,
        // },
        {
          title: "Archived Premiums",
          path: "/driver-premium/archived",
          display: true,
        },
      ],
      mainTitle: true,
    },
    {
      heading: "Rider Complaints",
      list: [
        {
          title: "Rider - Mobile App",
          path: "/rider-mobile-app",
          display:
            permissions?.my_rider_complaint?.read ||
            permissions?.my_rider_complaint?.write,
        },
        {
          title: "Rider - Call",
          path: "/rider-call",
          display:
            permissions?.rider_call?.read || permissions?.rider_call?.write,
        },
        {
          title: "Pending Complaints",
          path: "/rider-complaints/pending-complaints",
          display:
            permissions?.rider_pending_complaints?.read ||
            permissions?.rider_pending_complaints?.write,
        },
        {
          title: "Inprogress Complaints",
          path: "/rider-complaints/inprogress-complaints",
          display:
            permissions?.rider_inprogress_complaint?.read ||
            permissions?.rider_inprogress_complaint?.write,
        },

        {
          title: "Resolved/Closed Complaints",
          path: "/rider-complaints/resolved-closed-complaints",
          display:
            permissions?.rider_resloved_closed_complaint?.read ||
            permissions?.rider_resloved_closed_complaint?.write,
        },
      ],
    },
    {
      heading: "Driver Complaints",
      list: [
        {
          title: "Driver - Mobile App",
          path: "/driver-mobile-app",
          display:
            permissions?.my_driver_complaint?.read ||
            permissions?.my_driver_complaint?.write,
        },
        {
          title: "Driver - Call",
          path: "/driver-call",
          display:
            permissions?.driver_call?.read || permissions?.driver_call?.write,
        },
        {
          title: "Pending Complaints",
          path: "/driver-complaints/pending-complaints",
          display:
            permissions?.driver_pending_complaints?.read ||
            permissions?.driver_pending_complaints?.write,
        },
        {
          title: "Inprogress Complaints",
          path: "/driver-complaints/inprogress-complaints",
          display:
            permissions?.driver_inprogress_complaint?.read ||
            permissions?.driver_inprogress_complaint?.write,
        },
        {
          title: "Resolved/Closed Complaints",
          path: "/driver-complaints/resolved-closed-complaints",
          display:
            permissions?.driver_resloved_closed_complaint?.read ||
            permissions?.driver_resloved_closed_complaint?.write,
        },
      ],
    },
    {
      heading: "SOS",
      list: [
        {
          title: "My Rider SOS",
          path: "/sos/my-rider-sos",
          display:
            permissions?.my_rider_sos?.read || permissions?.my_rider_sos?.write,
        },
        {
          title: "Pending/ Create Rider SOS",
          path: "/sos/pending-create-rider-sos",
          display:
            permissions?.pending_create_rider_sos?.read ||
            permissions?.pending_create_rider_sos?.write,
        },
        {
          title: "Inprogress Rider SOS",
          path: "/sos/inprogress-rider-sos",
          display:
            permissions?.inprogress_rider_sos?.read ||
            permissions?.inprogress_rider_sos?.write,
        },
        {
          title: "My Driver SOS",
          path: "/sos/my-driver-sos",
          display:
            permissions?.my_driver_sos?.read ||
            permissions?.my_driver_sos?.write,
        },
        {
          title: "Pending/ Create Driver SOS",
          path: "/sos/pending-create-driver-sos",
          display:
            permissions?.pending_create_driver_sos?.read ||
            permissions?.pending_create_driver_sos?.write,
        },
        {
          title: "Inprogress Driver SOS",
          path: "/sos/inprogress-driver-sos",
          display:
            permissions?.inprogress_driver_sos?.read ||
            permissions?.inprogress_driver_sos?.write,
        },
        {
          title: "Resolved/Closed SOS",
          path: "/sos/resolved-closed-sos",
          display:
            permissions?.resloved_closed_sos?.read ||
            permissions?.resloved_closed_sos?.write,
        },
        {
          title: "Local Responders",
          path: "/sos/local-responders",
          display:
            permissions?.local_responder?.read ||
            permissions?.local_responder?.write,
        },
      ],
    },

    {
      heading: "Rider Finances",
      list: [
        {
          // title: "Rider Current Balance",
          title: "Rider Transactions",
          path: "/rider-finance",
          display:
            permissions?.rider_finance?.read ||
            permissions?.rider_finance?.write,
        },
      ],
    },

    {
      heading: "Coupons",
      list: [
        {
          title: "Rider Coupons",
          path: "/rider-coupons",
          display:
            permissions?.rider_coupons?.read ||
            permissions?.rider_coupons?.write,
        },
        {
          title: "Driver Coupons",
          path: "/driver-coupons",
          display:
            permissions?.driver_coupons?.read ||
            permissions?.driver_coupons?.write,
        },
      ],
    },
    {
      heading: "Referrals",
      list: [
        {
          title: "Rider Referral",
          path: "/rider-referral",
          display:
            permissions?.rider_referrals?.read ||
            permissions?.rider_referrals?.write,
        },
        {
          title: "Driver Referral",
          path: "/driver-referral",
          display:
            permissions?.driver_referrals?.read ||
            permissions?.driver_referrals?.write,
        },
      ],
    },
    {
      heading: "Incentives",
      list: [
        {
          title: "Driver Incentives",
          path: "/driver-incentives",
          display:
            permissions?.driver_incentive?.read ||
            permissions?.driver_incentive?.write,
        },
      ],
    },
    {
      heading: "FAQ",
      list: [
        {
          title: "Rider FAQ",
          path: "/rider-faq",
          display:
            permissions?.rider_faq?.read || permissions?.rider_faq?.write,
        },
        {
          title: "Driver FAQ",
          path: "/driver-faq",
          display:
            permissions?.driver_faq?.read || permissions?.driver_faq?.write,
        },
      ],
    },

    {
      heading: "Broadcast",
      list: [
        {
          title: "Rider Broadcast",
          path: "/rider-broadcast",
          display:
            permissions?.rider_broadcast?.read ||
            permissions?.rider_broadcast?.write,
        },
        {
          title: "Driver Broadcast",
          path: "/driver-broadcast",
          display:
            permissions?.driver_broadcast?.read ||
            permissions?.driver_broadcast?.write,
        },
      ],
    },

    {
      heading: "Notification & SMS",
      list: [
        {
          title: "Rider",
          path: "/rider-notification-sms-email",
          display:
            permissions?.nse_rider?.read || permissions?.nse_rider?.write,
        },
        {
          title: "Driver",
          path: "/drive-notification-sms-email",
          display:
            permissions?.nse_driver?.read || permissions?.nse_driver?.write,
        },
      ],
    },
  ];

  const updatedSideBarMenuList = sideBarMenuList?.map((item) => {
    // Check if the 'display' property exists on the main object
    const display = item.display !== undefined ? item.display : item?.list?.some((listItem) => listItem?.display);
    return { ...item, mainTitle: display };
  });
  const removeLocalStorageValueFn = () => {
    if (!location.pathname.includes("driver-premium/archived")) {
      localStorage.removeItem("ArcpremiumSideBarTab");
    }
    if (!location.pathname.includes("driver-premium/default")) {
      localStorage.removeItem("defaultPremiumSidebarTab");
    }
    if (!location.pathname.includes("driver-premium/premium")) {
      localStorage.removeItem("premiumSideBarTab");
    }
  };

  function handleSingleMenuClick(path, menuIndex) {
    setSidebarMenu(menuIndex),
      navigate(path)
  }

  return (
    <div className="position-fixed sidebar_container bg-white">
      <>
        <div
          className={`${sideBarOpen ? "d-block" : "mainlayout_sidebar_display"
            } sidebar`}
        >
          <div className="d-flex justify-content-lg-center justify-content-between align-items-center white_bg pt-2 px-2">
            <img
              src={ComrideLogo}
              width={150}
              height={50}
              alt="comride logo"
              className="mx-lg-auto"
            />{" "}
            <div
              className={`mainlayout_logo_container d-flex align-items-center justify-content-between`}
            >
              <span
                onClick={handleSidebarClose}
                className={`menu_icon_container pt-2`}
              >
                <CloseIcon fill="rgba(72,71,71,1)" width={16} height={16} />
              </span>
            </div>
          </div>

          <div className="mainlayout_sidebar_inner__container  ">
            <nav className="mt-4 mx-3">
              {updatedSideBarMenuList
                ?.filter?.((item) => item?.mainTitle === true)
                ?.map((item, index) => {
                  const activeIndex = item?.list?.findIndex((data) =>
                    location.pathname.startsWith(data?.path)
                  ) ?? -1;  // Default value of -1 if no match found or list is undefined

                  return (
                    <div
                      className={`mb-3 ${sidebarMenu === index
                        ? `primary_bg border_radius_5px ps-2 ${item?.display === undefined ? `pb-1` : `pb-1 pt-2`}`
                        : ""
                        }`}
                      key={item?.heading}
                    >
                      <div
                        className={`d-flex cursor_pointer justify-content-between align-items-center mb-2`}
                        onClick={() => {
                          item?.display !== undefined ?
                            handleSingleMenuClick(item?.path, index) :
                            handleMenuClick(index);
                          localStorage.setItem("sidebarMenu", index);
                        }}
                      >
                        <span
                          className={` ${sidebarMenu === index
                            ? "white_color fs_16"
                            : activeIndex !== -1
                              ? "primary_color fw_700 fs_18"
                              : "secondary_color fs_16"
                            }  fw_600`}
                        >
                          {item?.heading}
                        </span>{" "}
                        {item?.display === undefined &&
                          <button className="p-0 border_none background_none">
                            {sidebarMenu === index ? (
                              <ArrowUpIcon
                                width={28}
                                height={28}
                                fill={"#F6C90E"}
                              />
                            ) : (
                              <ArrowDownIcon
                                width={28}
                                height={28}
                                fill={"#687284"}
                              />
                            )}
                          </button>
                        }
                      </div>
                      {item?.display === undefined &&
                        <>
                          {sidebarMenu === index && (
                            <ul className="list-unstyled ms-3">
                              {item?.list
                                ?.filter((item) => item?.display === true)
                                .map((data) => {
                                  return (
                                    <li
                                      onClick={() => {
                                        data?.path !== "" &&
                                          navigate(`${data?.path}`);
                                        removeLocalStorageValueFn();
                                      }}
                                      key={data?.title}
                                      className={`cursor_pointer mb-2 pb-1 fw_600 fs_13  ${location.pathname.startsWith(data?.path)
                                        ? "tertiary_color"
                                        : "secondary_color"
                                        }`}
                                    >
                                      {data?.title}
                                    </li>
                                  );
                                })}
                            </ul>
                          )}
                        </>
                      }
                    </div>
                  );
                })}
            </nav>
          </div>
        </div>
      </>
    </div>
  );
};

export default Sidebar;
