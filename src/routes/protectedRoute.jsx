import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  restricted,
  auth,
  ...rest
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  console.log(permissions, "kajdhlakdasd");

  const pathName =
    permissions?.admin_users?.read === true ||
    permissions?.admin_users?.write === true
      ? "/admin-users"
      : permissions?.blocked_admins?.read === true ||
        permissions?.blocked_admins?.write === true
      ? "/blocked-admins"
      : permissions?.deleted_admins?.read === true ||
        permissions?.deleted_admins?.write === true
      ? "/deleted-admins"
      : permissions?.manage_riders?.read === true ||
        permissions?.manage_riders?.write === true
      ? "/manage-riders"
      : permissions?.blocked_riders?.read === true ||
        permissions?.blocked_riders?.write === true
      ? "/blocked-riders"
      : permissions?.manage_drivers?.read === true ||
        permissions?.manage_drivers?.write === true
      ? "/manage-drivers"
      : permissions?.pending_application?.read === true ||
        permissions?.pending_application?.write === true
      ? "/pending-applications"
      : permissions?.blocked_driver?.read === true ||
        permissions?.blocked_driver?.write === true
      ? "/blocked-drivers"
      : permissions?.banned_application?.read === true ||
        permissions?.banned_application?.write === true
      ? "/banned-application"
      : permissions?.rejected_application?.read === true ||
        permissions?.rejected_application?.write === true
      ? "/rejected-applications"
      : permissions?.expired_documents?.read === true ||
        permissions?.expired_documents?.write === true
      ? "/expired-documents"
      : permissions?.deleted_riders?.read === true ||
        permissions?.deleted_riders?.write === true
      ? "/deleted-riders"
      : permissions?.permanentely_deleted_riders?.read === true ||
        permissions?.permanentely_deleted_riders?.write === true
      ? "/permanently-deleted-riders"
      : permissions?.deleted_drivers?.read === true ||
        permissions?.deleted_drivers?.write === true
      ? "/deleted-drivers"
      : permissions?.permanentely_deleted_drivers?.read === true ||
        permissions?.permanentely_deleted_drivers?.write === true
      ? "/permanently-deleted-drivers"
      : permissions?.ongoing_booking_requests?.read === true ||
        permissions?.ongoing_booking_requests?.write === true
      ? "/manage-booking-requests/ongoing-requests"
      : permissions?.unsuccessful_booking_requests?.read === true ||
        permissions?.unsuccessful_booking_requests?.write === true
      ? "/manage-booking-requests/unsucessful-requests"
      : permissions?.ongoing_booking?.read === true ||
        permissions?.ongoing_booking?.write === true
      ? "/manage-bookings/ongoing-bookings"
      : permissions?.completed_booking?.read === true ||
        permissions?.completed_booking?.write === true
      ? "/manage-bookings/completed-bookings"
      : permissions?.cancelled_booking?.read === true ||
        permissions?.cancelled_booking?.write === true
      ? "/manage-bookings/cancelled-bookings"
      : permissions?.accident_booking?.read === true ||
        permissions?.accident_booking?.write === true
      ? "/manage-bookings/accident-bookings"
      : permissions?.adjusted_booking?.read === true ||
        permissions?.adjusted_booking?.write === true
      ? "/manage-bookings/adjusted-bookings"
      : permissions?.booking_invoice?.read === true ||
        permissions?.booking_invoice?.write === true
      ? "/trip-invoices"
      : permissions?.pending_refund?.read === true ||
        permissions?.pending_refund?.write === true
      ? "/refund/pending-refund"
      : permissions?.successful_refund?.read === true ||
        permissions?.successful_refund?.write === true
      ? "/refund/successful-refund"
      : permissions?.cancelled_refund?.read === true ||
        permissions?.cancelled_refund?.write === true
      ? "/refund/cancelled-refund"
      : // premium need to add

      permissions?.driver_metrics?.read === true ||
        permissions?.driver_metrics?.write === true
      ? "/drivermetrics"
      : permissions?.driver_finance?.read === true ||
        permissions?.driver_finance?.write === true
      ? "/driver-finance-current-balance"
      : permissions?.driver_finance?.read === true ||
        permissions?.driver_finance?.write === true
      ? "/driver-finance-create-cash-transaction"
      : permissions?.driver_finance?.read === true ||
        permissions?.driver_finance?.write === true
      ? "/driver-finance-cash-transaction-history"
      : permissions?.driver_finance?.read === true ||
        permissions?.driver_finance?.write === true
      ? "/driver-finance-cashout-balance-history"
      : permissions?.driver_finance?.read === true ||
        permissions?.driver_finance?.write === true
      ? "/driver-finance-successful-cashout"
      : permissions?.ride_types?.read === true ||
        permissions?.ride_types?.write === true
      ? "/ride-type"
      : permissions?.vehicle_types?.read === true ||
        permissions?.vehicle_types?.write === true
      ? "/vehicle-type"
      : permissions?.manage_zones?.read === true ||
        permissions?.manage_zones?.write === true
      ? "/manage-zone"
      : permissions?.blocked_zones?.read === true ||
        permissions?.blocked_zones?.write === true
      ? "/block-zone"
      : permissions?.archived_zones?.read === true ||
        permissions?.archived_zones?.write === true
      ? "/archived-zone"
      : permissions?.manage_fares?.read === true ||
        permissions?.manage_fares?.write === true
      ? "/manage-fares"
      : permissions?.defualt_fares?.read === true ||
        permissions?.defualt_fares?.write === true
      ? "/default-fare"
      : permissions?.deleted_intrazone_fares?.read === true ||
        permissions?.deleted_intrazone_fares?.write === true
      ? "/deleted-intra-fares"
      : permissions?.archived_fares?.read === true ||
        permissions?.archived_fares?.write === true
      ? "/archive-fares"
      : // driver premium need to add

      permissions?.my_rider_complaint?.read === true ||
        permissions?.my_rider_complaint?.write === true
      ? "/rider-mobile-app"
      : permissions?.rider_call?.read === true ||
        permissions?.rider_call?.write === true
      ? "/rider-call"
      : permissions?.rider_pending_complaints?.read === true ||
        permissions?.rider_pending_complaints?.write === true
      ? "/rider-complaints/pending-complaints"
      : permissions?.rider_inprogress_complaint?.read === true ||
        permissions?.rider_inprogress_complaint?.write === true
      ? "/rider-complaints/inprogress-complaints"
      : permissions?.rider_resloved_closed_complaint?.read === true ||
        permissions?.rider_resloved_closed_complaint?.write === true
      ? "/rider-complaints/resolved-closed-complaints"
      : permissions?.my_driver_complaint?.read === true ||
        permissions?.my_driver_complaint?.write === true
      ? "/driver-mobile-app"
      : permissions?.driver_call?.read === true ||
        permissions?.driver_call?.write === true
      ? "/driver-call"
      : permissions?.driver_pending_complaints?.read === true ||
        permissions?.driver_pending_complaints?.write === true
      ? "/driver-complaints/pending-complaints"
      : permissions?.driver_inprogress_complaint?.read === true ||
        permissions?.driver_inprogress_complaint?.write === true
      ? "/driver-complaints/inprogress-complaints"
      : permissions?.driver_resloved_closed_complaint?.read === true ||
        permissions?.driver_resloved_closed_complaint?.write === true
      ? "/driver-complaints/resolved-closed-complaints"
      : permissions?.my_rider_sos?.read === true ||
        permissions?.my_rider_sos?.write === true
      ? "/sos/my-rider-sos"
      : permissions?.pending_create_rider_sos?.read === true ||
        permissions?.pending_create_rider_sos?.write === true
      ? "/sos/pending-create-rider-sos"
      : permissions?.inprogress_rider_sos?.read === true ||
        permissions?.inprogress_rider_sos?.write === true
      ? "/sos/inprogress-rider-sos"
      : permissions?.my_driver_sos?.read === true ||
        permissions?.my_driver_sos?.write === true
      ? "/sos/my-driver-sos"
      : permissions?.pending_create_driver_sos?.read === true ||
        permissions?.pending_create_driver_sos?.write === true
      ? "/sos/pending-create-driver-sos"
      : permissions?.inprogress_driver_sos?.read === true ||
        permissions?.inprogress_driver_sos?.write === true
      ? "/sos/inprogress-driver-sos"
      : permissions?.resloved_closed_sos?.read === true ||
        permissions?.resloved_closed_sos?.write === true
      ? "/sos/resolved-closed-sos"
      : permissions?.local_responder?.read === true ||
        permissions?.local_responder?.write === true
      ? "/sos/local-responders"
      : permissions?.rider_finance?.read === true ||
        permissions?.rider_finance?.write === true
      ? "/rider-finance"
      : permissions?.rider_coupons?.read === true ||
        permissions?.rider_coupons?.write === true
      ? "/rider-coupons"
      : permissions?.driver_coupons?.read === true ||
        permissions?.driver_coupons?.write === true
      ? "/driver-coupons"
      : permissions?.rider_referrals?.read === true ||
        permissions?.rider_referrals?.write === true
      ? "/rider-referral"
      : permissions?.driver_referrals?.read === true ||
        permissions?.driver_referrals?.write === true
      ? "/driver-referral"
      : permissions?.driver_incentive?.read === true ||
        permissions?.driver_incentive?.write === true
      ? "/driver-incentives"
      : permissions?.rider_faq?.read === true ||
        permissions?.rider_faq?.write === true
      ? "/rider-faq"
      : permissions?.driver_faq?.read === true ||
        permissions?.driver_faq?.write === true
      ? "/driver-faq"
      : permissions?.rider_broadcast?.read === true ||
        permissions?.rider_broadcast?.write === true
      ? "/rider-broadcast"
      : permissions?.driver_broadcast?.read === true ||
        permissions?.driver_broadcast?.write === true
      ? "/driver-broadcast"
      : permissions?.nse_rider?.read === true ||
        permissions?.nse_rider?.write === true
      ? "/rider-notification-sms-email"
      : permissions?.nse_driver?.read === true ||
        permissions?.nse_driver?.write === true
      ? "/drive-notification-sms-email"
      : "/";

  console.log(localStorage.getItem("accessToken"), "kjdhkasda");

  return (
    <>
      {!localStorage.getItem("accessToken") ? (
        <Outlet />
      ) : (
        <Navigate to={pathName} />
      )}
    </>
  );
};

export default ProtectedRoute;
