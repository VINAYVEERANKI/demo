import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../modules/auth/login";
import DefaultFare from "../modules/manage-fares/default-fare";
import ManageFares from "../modules/manage-fares/manage-fare";
import ManageAdmins from "../modules/manage-admins/manage-admins";
import BlockedAdmins from "../modules/manage-admins/blocked-admins";
import DeletedAdmins from "../modules/manage-admins/deleted-admins";
import BlockedRidersList from "../modules/manage-riders/blocked-riders";
import RiderHistory from "../modules/manage-riders/rider-history";
import ManageRiders from "../modules/manage-riders/manage-riders";
import BlockedRiderHistory from "../modules/manage-riders/blockedRider-history";
import DriverDetail from "../modules/manage-drivers/manage-driver/driver-detail";
import DriversRideHistory from "../modules/manage-drivers/manage-driver/driver-rideHistory";
import ManageDrivers from "../modules/manage-drivers/manage-driver";
import PendingApplications from "../modules/manage-drivers/pending-applications";
import PendingRideHistory from "../modules/manage-drivers/pending-applications/driver-rideHistory";
import PendingDriverDetails from "../modules/manage-drivers/pending-applications/driver-details";
import RejectApplication from "../modules/manage-drivers/reject-application";
import RejectRideHistory from "../modules/manage-drivers/reject-application/driver-rideHistory";
import RejectDriverDetails from "../modules/manage-drivers/reject-application/driver-details";
import BannedApplication from "../modules/manage-drivers/banned-application";
import BannedRideHistory from "../modules/manage-drivers/banned-application/driver-rideHistory";
import BannedDriverDetails from "../modules/manage-drivers/banned-application/driver-details";
import BlockedDrivers from "../modules/manage-drivers/blocked-drivers";
import BlockedDriversRideHistory from "../modules/manage-drivers/blocked-drivers/drivers-rideHistory";
import BlockedDriverDetails from "../modules/manage-drivers/blocked-drivers/driver-details";
import ExpiredDriversRideHistory from "../modules/manage-drivers/expired-documents/expiredDocuments-rideHistory";
import ExpiredDocuments from "../modules/manage-drivers/expired-documents";
import ExpiredDocumentDetails from "../modules/manage-drivers/expired-documents/expired-document-details";
import OngingBookings from "../modules/manage-bookings/ongoing-bookings";
import CompletedBookings from "../modules/manage-bookings/completed-bookings";
import CancelledBookings from "../modules/manage-bookings/cancelled-bookings";
import AccidentBookings from "../modules/manage-bookings/accident-bookings";
import AdjustedBookings from "../modules/manage-bookings/adjusted-bookings";
import RideType from "../modules/rideTypes-vehicleTypes/ride-type";
import VehicleType from "../modules/rideTypes-vehicleTypes/vehicle-type";
import CancelledRefund from "../modules/refund/cancelled-refund";
import SuccessFullRefund from "../modules/refund/successFull-refund";
import PendingRefund from "../modules/refund/pending-refund";
import TripInvoices from "../modules/invoices/trip-invoices";
import OngoingRequests from "../modules/manage-bookings-requests/ongoing-requests/ongoing-requests";
import OngoingRequestTripDetails from "../modules/manage-bookings-requests/ongoing-requests/trip-details";
import DeletedRiders from "../modules/deleted-users/deleted-riders/deleted-riders";
import DeletedRiderHistory from "../modules/deleted-users/deleted-riders/deleted-rider-history";
import PermanentlyDelRiderHistory from "../modules/deleted-users/permanently-deleted-riders/permanently-del-rider-history";
import ErrorPage from "../errorPage";
import DeletedDrivers from "../modules/deleted-users/deleted-drivers/deleted-drivers";
import DeletedDriversDetails from "../modules/deleted-users/deleted-drivers/deleted-drivers-details";
import UnsuccessFulRequestTripDetails from "../modules/manage-bookings-requests/unsuccessful-requests/trip-details";
import UnsuccessFulRequests from "../modules/manage-bookings-requests/unsuccessful-requests/unsuccessful-requests";
import PermanentlyDeletedRiders from "../modules/deleted-users/permanently-deleted-riders/permanently-deleted-riders";
import PermanentlyDeletedDrivers from "../modules/deleted-users/permanently-deleted-drivers/permanently-deleted-drivers";
import PermanentlyDeletedDriverRideHistory from "../modules/deleted-users/permanently-deleted-drivers/driver-rideHistory";
import PerDelDriversDetails from "../modules/deleted-users/permanently-deleted-drivers/per-del-drivers-details";
import PrivateRoute from "./privateRoute";
import ProtectedRoute from "./protectedRoute";
import RiderPendingComplaints from "../modules/complaints/rider-complaints/pending-complaints";
import RiderInprogressComplaints from "../modules/complaints/rider-complaints/inprogress-complaints";
import ResolvedClosedComplaints from "../modules/complaints/rider-complaints/resolved-closed-complaints";
import RiderCall from "../modules/complaints/rider-complaints/rider-call";
import RiderMobileApp from "../modules/complaints/rider-complaints/rider-mobile-app";
import DriverCall from "../modules/complaints/driver-complaints/driver-call";
import DriverPendingComplaints from "../modules/complaints/driver-complaints/pending-complaints";
import DriverInprogressComplaints from "../modules/complaints/driver-complaints/inprogress-complaints";
import DriverResolvedClosedComplaints from "../modules/complaints/driver-complaints/resolved-closed-complaints";
import DriverMobileApp from "../modules/complaints/driver-complaints/driver-mobile-app";
import MainZoneEdit from "../modules/manage-zone/edit-zone";
import BlockedZone from "../modules/manage-zone/blocked-zone";
import CreateBlockZone from "../modules/manage-zone/create-block-zone";
import ArchivedZone from "../modules/manage-zone/archived-zone";
import InprogressRiderSOS from "../modules/sos/rider-sos/inprogress";
import PendingCreateRiderSos from "../modules/sos/rider-sos/pending-create";
import LocalResponders from "../modules/sos/local-responders";
import MyRiderSOS from "../modules/sos/rider-sos/my-rider-sos";
import ResolvedClosedSos from "../modules/sos/resolved-closed-sos";
import RiderCoupons from "../modules/coupons/rider-coupons/rider-coupons";
import CreateNewCoupon from "../modules/coupons/rider-coupons/create-coupon";
import CreateBroadcast from "../modules/coupons/rider-coupons/create-coupon/broadcast";
import ReviewRequiredview from "../modules/coupons/rider-coupons/review-required";
import ReviewBroadCastViewEdit from "../modules/coupons/rider-coupons/review-required/broadcast";
import CancelledBookingDetails from "../modules/manage-bookings/cancelled-bookings/cancelled-booking-details";
import CompletedBookingsDetails from "../modules/manage-bookings/completed-bookings/completed-booking-details";
import AdjustedBookingDetails from "../modules/manage-bookings/adjusted-bookings/adjusted-booking-details";
import OngoingBookingsDetails from "../modules/manage-bookings/ongoing-bookings/ongoing-bookings-details";
import AccidentBookingDetails from "../modules/manage-bookings/accident-bookings/accident-booking-details";
import ActiveCouponViewEdit from "../modules/coupons/rider-coupons/active";
import ActiveBroadcastViewEdit from "../modules/coupons/rider-coupons/active/broadcast";
import RejectedCouponView from "../modules/coupons/rider-coupons/rejected";
import RejectedBroadCastView from "../modules/coupons/rider-coupons/rejected/broadcast";
import DeletedCouponView from "../modules/coupons/rider-coupons/deleted";
import DeletedBroadCastView from "../modules/coupons/rider-coupons/deleted/broadcast";
import ExpiredCouponView from "../modules/coupons/rider-coupons/expired";
import ExpiredBroadCastView from "../modules/coupons/rider-coupons/expired/broadcast";
import CouponUsageHistotyView from "../modules/coupons/rider-coupons/coupon-usage-history/coupon-usage-histoty-view";
import ManageZone from "../modules/manage-zone";
import AddZones from "../modules/manage-zone/add-zones";
import BlockedZoneEdit from "../modules/manage-zone/blocked-zone-edit";
import ArchiveFares from "../modules/manage-fares/archive-fares";
import ManageFaresUpdate from "../modules/manage-fares/manage-fare/manage-fares";
import LocalZoneFares from "../modules/manage-fares/manage-fare/local-zone-fares";
import TollsZoneFares from "../modules/manage-fares/manage-fare/tolls-zone-fares";
import RoundTripFares from "../modules/manage-fares/manage-fare/round-trip-fares";
import OneWayTripFares from "../modules/manage-fares/manage-fare/one-way-trip-fares";
import RentalFares from "../modules/manage-fares/manage-fare/rental-fares";
import SpecialFareUpdate from "../modules/manage-fares/manage-fare/special-fare-update";
import LocalFareUpdate from "../modules/manage-fares/manage-fare/local-fare-update";
import SpecialZoneFares from "../modules/manage-fares/manage-fare/special-zone-fares";
import TollFareUpdate from "../modules/manage-fares/manage-fare/toll-fare-update";
import RentalFaresUpdate from "../modules/manage-fares/manage-fare/rental-fares-update";
import OnewayTripfaresUpdate from "../modules/manage-fares/manage-fare/oneway-trip-fares-update";
import RoundTripFaresUpdate from "../modules/manage-fares/manage-fare/round-trip-fares-update";
import ArchiveFaresView from "../modules/manage-fares/archive-fares/archive-fares-view";
import ArchiveSpecialZoneFare from "../modules/manage-fares/archive-fares/special-zone-fare";
import ArchiveSpecialfareView from "../modules/manage-fares/archive-fares/special-zone-fare-view";
import ArchiveTollsFares from "../modules/manage-fares/archive-fares/tolls-fares";
import ArchiveTollFareView from "../modules/manage-fares/archive-fares/tolls-fare-view";
import ArchiveOnewayTripFares from "../modules/manage-fares/archive-fares/oneway-trip-fares";
import ArchiveOnewayTripFaresView from "../modules/manage-fares/archive-fares/oneway-trip-fares-view";
import ArchiveRoundTripFares from "../modules/manage-fares/archive-fares/round-trip-fares";
import ArchiveRoundTripFaresView from "../modules/manage-fares/archive-fares/round-trip-fares-view";
import ArchiveRentalFares from "../modules/manage-fares/archive-fares/rental-fares";
import ArchiveRentalFaresView from "../modules/manage-fares/archive-fares/rental-fares-view";
import ArchiveLocalZoneFares from "../modules/manage-fares/archive-fares/local-zone-fares";
import ArchiveLocalZoneFareview from "../modules/manage-fares/archive-fares/local-zone-fare-view";
import RiderReferral from "../modules/referrals/rider-referrals/rider-referral";
import DeletedIntraZoneFares from "../modules/manage-fares/deleted-intra-fares";
import DeletedLocalZoneFares from "../modules/manage-fares/deleted-intra-fares/local-zone-fares";
import DeletedSpecialZoneFares from "../modules/manage-fares/deleted-intra-fares/special-zone-fares";
import DeletedTollZoneFares from "../modules/manage-fares/deleted-intra-fares/toll-fares";
import DeletedOnewayTripFares from "../modules/manage-fares/deleted-intra-fares/oneway-trip-fares";
import DeletedLocalZoneFaresView from "../modules/manage-fares/deleted-intra-fares/local-zone-fares-view";
import DeletedSpecialZoneFareView from "../modules/manage-fares/deleted-intra-fares/special-zone-fare-view";
import DeletedIntraFareView from "../modules/manage-fares/deleted-intra-fares/deleted-intra-fare-view";
import DeletedTollFaresView from "../modules/manage-fares/deleted-intra-fares/toll-fares-view";
import DeletedOnewayTripFareView from "../modules/manage-fares/deleted-intra-fares/oneway-trip-fare-view";
import DeletedLocalFaresIndividualView from "../modules/manage-fares/deleted-intra-fares/local-fares-individual-view";
import ReferralCreateReferral from "../modules/referrals/rider-referrals/create-referral/create-referral";
import ReferralCreateBroadcast from "../modules/referrals/rider-referrals/create-referral/create-broadcast";
import DriverCoupons from "../modules/coupons/driver-coupons/driver-coupons";
import CreateDriverCoupons from "../modules/coupons/driver-coupons/create";
import CreateDriverCouponBroadcast from "../modules/coupons/driver-coupons/create/create-broadcast";
import ReviewRequiredReferralEdit from "../modules/referrals/rider-referrals/review-required/review-required-edit";
import ReferralReviewReqBroadcastEdit from "../modules/referrals/rider-referrals/review-required/review-required-broadcast-edit";
import DriverCouponUsageHistoryView from "../modules/coupons/driver-coupons/usage-history-view";
import ReferralActiveEdit from "../modules/referrals/rider-referrals/active/activeEdit";
import ReferralActiveBroadcastEdit from "../modules/referrals/rider-referrals/active/activeBroadcastEdit";
import DriverCouponReviewRequired from "../modules/coupons/driver-coupons/review-required";
import DriverCouponActive from "../modules/coupons/driver-coupons/active";
import ReferralRejectedView from "../modules/referrals/rider-referrals/rejected/rejected-view";
import ReviewReqDriverCouponBroadcast from "../modules/coupons/driver-coupons/review-required/broadcast";
import ActiveDriverCouponBroadcast from "../modules/coupons/driver-coupons/active/broadcast";
import RejectedDriverCoupon from "../modules/coupons/driver-coupons/rejected";
import DeletedDriverCoupon from "../modules/coupons/driver-coupons/deleted";
import ExpiredDriverCoupon from "../modules/coupons/driver-coupons/expired";
import ReferralRejectBroadcastView from "../modules/referrals/rider-referrals/rejected/rejected-broadcastView";
import RejectedDriverCouponBroadcast from "../modules/coupons/driver-coupons/rejected/broadcast";
import DeletedDriverCouponBroadcast from "../modules/coupons/driver-coupons/deleted/broadcast";
import ExpiredDriverCouponBroadcast from "../modules/coupons/driver-coupons/expired/broadcast";
import ReferralDeletedView from "../modules/referrals/rider-referrals/deleted/deleted-view";
import ReferralDeletedBroadcastView from "../modules/referrals/rider-referrals/deleted/deleted-broadcastView";
import ReferralExpiredBroadcastView from "../modules/referrals/rider-referrals/expired/expired-broadcastView";
import ReferralExpiredView from "../modules/referrals/rider-referrals/expired/expired-view";
import ReferralRecevierHistory from "../modules/referrals/rider-referrals/usage-history/recevier-history";
import ReferralSenderHistory from "../modules/referrals/rider-referrals/usage-history/sender-history";
import FormWithFourDropdownsAndTextarea from "../modules/test";
import ArchivedZoneIndividual from "../modules/manage-zone/archived-zone-view";
import DriverReferral from "../modules/referrals/driver-referrals/driver-referrals";
import CreateDriverReferrals from "../modules/referrals/driver-referrals/create";
import ReviewReqDriverRef from "../modules/referrals/driver-referrals/review-required";
import DriverReferralCreateBroadcast from "../modules/referrals/driver-referrals/create/create-broadcast";
import DriverReferralRecevierHistory from "../modules/referrals/driver-referrals/usage-history/recevier-history";
import DriverReferralSenderHistory from "../modules/referrals/driver-referrals/usage-history/sender-history";
import DriverRefActive from "../modules/referrals/driver-referrals/active";
import DeletedDriverRef from "../modules/referrals/driver-referrals/deleted";
import RejectedDriverRef from "../modules/referrals/driver-referrals/rejected";
import ActiveDriverRefBroadcast from "../modules/referrals/driver-referrals/active/broadcast";
import ReviewReqDriverRefBroadcast from "../modules/referrals/driver-referrals/review-required/broadcast";
import ExpiredDriverRefId from "../modules/referrals/driver-referrals/expired";
import ExpiredDriverRefIdBroadcast from "../modules/referrals/driver-referrals/expired/broadcast";
import RejectedDriverRefBroadcast from "../modules/referrals/driver-referrals/rejected/broadcast";
import DeletedDriverRefbroadcast from "../modules/referrals/driver-referrals/deleted/broadcast";
import BroadcastInputtest2 from "../modules/test2";
import InprogressDriverSOS from "../modules/sos/driver-sos/inprogress";
import PendingCreateDriverSos from "../modules/sos/driver-sos/pending-create";
import DriverIncentives from "../modules/incentives/driver-incentives/driver-incentives";
import CreateDriverIncentive from "../modules/incentives/driver-incentives/create";
import RiderBroadcast from "../modules/broadcast/rider-broadcast/rider-broadcast";
import CreateRiderbroadcast from "../modules/broadcast/rider-broadcast/create-broadcast";
import ChatBox from "../modules/chat-box";
import DriverBroadcast from "../modules/broadcast/driver-broadcast/driver-broadcast";
import ReviewReqRiderBroadcast from "../modules/broadcast/rider-broadcast/review-req-broadcast";
import ActiveRiderBroadcast from "../modules/broadcast/rider-broadcast/active-broadcast";
import RejectRiderBroadcast from "../modules/broadcast/rider-broadcast/reject-broadcast";
import RiderBroadcastExpired from "../modules/broadcast/rider-broadcast/expired-broadcast";
import ReviewReqDriverBroadcast from "../modules/broadcast/driver-broadcast/review-req-broadcast";
import ActiveDriverBroadcast from "../modules/broadcast/driver-broadcast/active-broadcast";
import RejectDriverBroadcast from "../modules/broadcast/driver-broadcast/reject-broadcast";
import DeletedRiderBroadcast from "../modules/broadcast/rider-broadcast/delete-broadcast";
import DeletedDriverBroadcast from "../modules/broadcast/driver-broadcast/delete-broadcast";
import CreateDriverbroadcast from "../modules/broadcast/driver-broadcast/create-broadcast";
import MyDriverSOS from "../modules/sos/driver-sos/my-rider-sos";
import DriverIncentiveHistoryFindone from "../modules/incentives/driver-incentive-history-findone";
import CreateDriverIncentiveBroadcast from "../modules/incentives/driver-incentives/create/create-broadcast";
import DriverIncentiveReviewReq from "../modules/incentives/driver-incentives/review-required";
import ReviewReqIncentiveBroadcast from "../modules/incentives/driver-incentives/review-required/broadcast";
import DriverIncentiveActive from "../modules/incentives/driver-incentives/active";
import DriverIncentiveActivebroadcast from "../modules/incentives/driver-incentives/active/broadcast";
import DeletedDriverRideHistory from "../modules/deleted-users/deleted-drivers/deleted-rideHistory";
import RiderFaqs from "../modules/faqs/rider-faqs";
import DriverIncentiveRejected from "../modules/incentives/driver-incentives/rejected";
import DriverIncentiveRejectedbroadcast from "../modules/incentives/driver-incentives/rejected/broadcast";
import DriverFaqs from "../modules/faqs/driver-faqs";
import ViewEditTopic from "../modules/faqs/view-edit-topic";
import RiderNse from "../modules/nse/riderNse";
import Test3 from "../modules/test3";
import DriverNse from "../modules/nse/driverNse";
import DriverIncentiveDeleted from "../modules/incentives/driver-incentives/deleted";
import DriverIncentiveDeletedbroadcast from "../modules/incentives/driver-incentives/deleted/broadcast";
import DriverIncentiveExpired from "../modules/incentives/driver-incentives/expired";
import DriverIncentiveExpiredbroadcast from "../modules/incentives/driver-incentives/expired/broadcast";
import MotificationSmsdriver from "../modules/nse/MotificationSmsdriver";
import NotificationSms from "../modules/nse/NotificationSms";
import DriverMetrices from "../modules/DriverMetrices/DriverMetrices";
import RiderFinanceMaintable from "../components/rider-finance/rider-finance-maintable";
import RiderCurrentBalanceDetails from "../components/rider-finance/rider-curbal-details";
import RiderFinance from "../modules/rider-finance/rider-finance";
import DriverFinanceCurrentBalance from "../modules/driver-finance/driver-finance-current-balance/driver-finance-current-balance";
import DriverFinanaceMainTable from "../components/driver-finance/driver-finance-main-tables/driverFinanaceMainTable";
import CreateCashTransaction from "../modules/driver-finance/create-cash-transaction/create-cash-transaction";
import SuccessfulCashout from "../modules/driver-finance/successful-cashout/successful-cashout";
import DriverCurbalDetails from "../components/driver-finance/driver-finance-details/driver-curbal-details";
import CashTransactionHistory from "../modules/driver-finance/cash-transaction-history/cash-transaction-history";
import CashoutBalanceHistory from "../modules/driver-finance/cashout-balance-history/cashout-balance-history";
import SuccessfulCashoutDetails from "../components/driver-finance/driver-finance-details/successful-cashout-details";
import CashTransactionViewModal from "../components/driver-finance/driver-finance-modals/cash -transaction-view-modal";
import CashoutBalanceViewTable from "../modules/driver-finance/cashout-balance-history/cashout-balance-view-table";
import CashTransactionPasswordModal from "../components/driver-finance/driver-finance-modals/cash-transaction-password-modal";
import DriverFinanceViewTable from "../modules/driver-finance/driver-finance-current-balance/driver-finance-view-table";
import SuccessfulCashoutViewTable from "../modules/driver-finance/successful-cashout/successful-cashout-view-table";
import DriverMetricsView from "../modules/DriverMetrices/DriverMetricsView";
import DriverPremiums from "../modules/premiums/default-premiums/driver-premiums";
import DefaultPremiumTable from "../modules/premiums/default-premiums/defaultPremiumMainTable";
import ManagePremiumTable from "../modules/premiums/ManagePremiums/ManagePremiumMainTable";
import ManagePremiumsViewTable from "../modules/premiums/ManagePremiums/ManagePremiumSubTable";
import ManagePremiums from "../modules/premiums/ManagePremiums/ManagePremiums";
import PremiumCurrentBalance from "../modules/premiums/premium-history/premiumCurrentBalance";
import ArchivedPremiumTable from "../modules/premiums/Archived-Premiums/ArchivedPremiumMainTable";
import ArchivedPremiumViewTable from "../modules/premiums/Archived-Premiums/ArchivedPremiumSubTable";
import ArchivedPremium from "../modules/premiums/Archived-Premiums/ArchivedPremium";
import PremiumPendingRefund from "../modules/premium-refunds/driver/pending-refund";
import PremiumCancelledRefund from "../modules/premium-refunds/driver/cancelled-refund";
import PremiumSuccessfulRefund from "../modules/premium-refunds/driver/successFull-refund";
import Dashboard from "../modules/dashboard/dashboard";
import DriversDashboard from "../modules/dashboard/drivers-dashboard";
import RiderMetrics from "../modules/dashboard/analysis-dashboard/rider-metrics";
import BookingMetrics from "../modules/dashboard/analysis-dashboard/booking-metrics";
import CancellationMetrics from "../modules/dashboard/analysis-dashboard/cancellation-metrics";
import EarningMetrics from "../modules/dashboard/analysis-dashboard/earning-metrics";
import ComplaintsDashboard from "../modules/dashboard/complaints-dashboard";
import DriverMetrics from "../modules/dashboard/analysis-dashboard/driver-metrics";
import DriverDetailsFindOneEdit from "../modules/manage-drivers/manage-driver/driverDetailsEdit";

export default function Index() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/*" element={<ErrorPage />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/complaints-dashboard"
              element={<ComplaintsDashboard />}
            />
            <Route path="/rider-metrics" element={<RiderMetrics />} />
            <Route path="/driver-metrics" element={<DriverMetrics />} />
            <Route path="/booking-metrics" element={<BookingMetrics />} />
            <Route
              path="/cancellation-metrics"
              element={<CancellationMetrics />}
            />
            <Route path="/earning-metrics" element={<EarningMetrics />} />
            <Route path="/drivers-dashboard" element={<DriversDashboard />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/default-fare" element={<DefaultFare />} />
            <Route path="/manage-fares" element={<ManageFares />} />+
            <Route
              path="/manage-fares/:action/:id"
              element={<ManageFaresUpdate />}
            />
            <Route
              path="/manage-fares/local-zone-fares/:id"
              element={<LocalZoneFares />}
            />
            <Route
              path="/manage-fares/local-zone-fares/:action/:id"
              element={<LocalFareUpdate />}
            />
            <Route
              path="/manage-fares/special-zone-fares/:id"
              element={<SpecialZoneFares />}
            />
            <Route
              path="/manage-fares/special-zone-fares/:action/:id"
              element={<SpecialFareUpdate />}
            />
            <Route
              path="/manage-fares/toll-zone-fares/:id"
              element={<TollsZoneFares />}
            />
            <Route
              path="/manage-fares/toll-zone-fares/:action/:id"
              element={<TollFareUpdate />}
            />
            <Route
              path="/manage-fares/round-trip-fares/:id"
              element={<RoundTripFares />}
            />
            <Route
              path="/manage-fares/round-trip-fares/:action/:id"
              element={<RoundTripFaresUpdate />}
            />
            <Route
              path="/manage-fares/oneway-trip-fares/:id"
              element={<OneWayTripFares />}
            />
            <Route
              path="/manage-fares/oneway-trip-fares/:action/:id"
              element={<OnewayTripfaresUpdate />}
            />
            <Route
              path="/manage-fares/rental-fares/:id"
              element={<RentalFares />}
            />
            <Route
              path="/manage-fares/rental-fares/:action/:id"
              element={<RentalFaresUpdate />}
            />
            <Route path="/archive-fares" element={<ArchiveFares />} />
            <Route
              path="/deleted-intra-fares"
              element={<DeletedIntraZoneFares />}
            />
            <Route
              path="/deleted-intra-fares/view/:id"
              element={<DeletedIntraFareView />}
            />
            <Route
              path="/deleted-intra-fares/local/:id"
              element={<DeletedLocalZoneFares />}
            />
            <Route
              path="/deleted-intra-fares/local/view/:id"
              element={<DeletedLocalZoneFaresView />}
            />
            <Route
              path="/deleted-intra-fares/local-fares/view/:id"
              element={<DeletedLocalFaresIndividualView />}
            />
            <Route
              path="/deleted-intra-fares/special/:id"
              element={<DeletedSpecialZoneFares />}
            />
            <Route
              path="/deleted-intra-fares/special/view/:id"
              element={<DeletedSpecialZoneFareView />}
            />
            <Route
              path="/deleted-intra-fares/tolls/:id"
              element={<DeletedTollZoneFares />}
            />
            <Route
              path="/deleted-intra-fares/tolls/view/:id"
              element={<DeletedTollFaresView />}
            />
            <Route
              path="/deleted-intra-fares/oneway/:id"
              element={<DeletedOnewayTripFares />}
            />
            <Route
              path="/deleted-intra-fares/oneway/view/:id"
              element={<DeletedOnewayTripFareView />}
            />
            <Route
              path="/archive-fares/view/:id"
              element={<ArchiveFaresView />}
            />
            <Route
              path="/archived-local-fares/:id"
              element={<ArchiveLocalZoneFares />}
            />
            <Route
              path="/archived-local-fares/view/:id"
              element={<ArchiveLocalZoneFareview />}
            />
            <Route
              path="/archived-special-fares/:id"
              element={<ArchiveSpecialZoneFare />}
            />
            <Route
              path="/archived-special-fares/view/:id"
              element={<ArchiveSpecialfareView />}
            />
            <Route
              path="/archived-rental-fares/:id"
              element={<ArchiveRentalFares />}
            />
            <Route
              path="/archived-rental-fares/view/:id"
              element={<ArchiveRentalFaresView />}
            />
            <Route
              path="/archived-toll-fares/:id"
              element={<ArchiveTollsFares />}
            />
            <Route
              path="/archived-toll-fares/view/:id"
              element={<ArchiveTollFareView />}
            />
            <Route
              path="/archived-oneway-trip-fares/:id"
              element={<ArchiveOnewayTripFares />}
            />
            <Route
              path="/archived-oneway-trip-fares/view/:id"
              element={<ArchiveOnewayTripFaresView />}
            />
            <Route
              path="/archived-round-trip-fares/:id"
              element={<ArchiveRoundTripFares />}
            />
            <Route
              path="/archived-round-trip-fares/view/:id"
              element={<ArchiveRoundTripFaresView />}
            />
            {/* ************Manage Zone************ */}
            <Route path="/manage-zone" element={<ManageZone />} />
            <Route path="/manage-zone/create" element={<AddZones />} />
            <Route path="/manage-zone/:action/:id" element={<MainZoneEdit />} />
            <Route path="/block-zone" element={<BlockedZone />} />
            <Route path="block-zone/create" element={<CreateBlockZone />} />
            <Route
              path="/block-zone/:action/:id"
              element={<BlockedZoneEdit />}
            />
            <Route path="/archived-zone" element={<ArchivedZone />} />
            <Route
              path="/archived-zone/:action/:id"
              element={<ArchivedZoneIndividual />}
            />
            {/***********Manage admins*******/}
            <Route path="/admin-users" element={<ManageAdmins />} />
            <Route path="/blocked-admins" element={<BlockedAdmins />} />
            <Route path="/deleted-admins" element={<DeletedAdmins />} />
            {/**************Manage riders Manage drivers */}
            <Route path="/manage-riders" element={<ManageRiders />} />
            <Route
              path="/manage-riders/rider-history/:id"
              element={<RiderHistory />}
            />
            <Route path="/blocked-riders" element={<BlockedRidersList />} />
            <Route
              path="/blocked-riders/rider-history/:id"
              element={<BlockedRiderHistory />}
            />
            <Route path="/manage-drivers" element={<ManageDrivers />} />
            <Route
              path="/manage-drivers/driver-details-edit/:id"
              element={<DriverDetailsFindOneEdit type={"manageDrivers"} />}
            />
            <Route
              path="/manage-drivers/driver-rideHistory/:id"
              element={<DriversRideHistory />}
            />
            <Route
              path="/manage-drivers/driver-rideHistory/driver-details/:id"
              element={<DriverDetail />}
            />
            <Route
              path="/pending-applications"
              element={<PendingApplications />}
            />
            <Route
              path="/pending-applications/driver-rideHistory/:id"
              element={<PendingRideHistory />}
            />
            <Route
              path="/pending-applications/driver-rideHistory/driver-details/:id"
              element={<PendingDriverDetails />}
            />
            <Route
              path="/rejected-applications"
              element={<RejectApplication />}
            />
            <Route
              path="/rejected-applications/driver-rideHistory/:id"
              element={<RejectRideHistory />}
            />
            <Route
              path="/rejected-applications/driver-rideHistory/driver-details/:id"
              element={<RejectDriverDetails />}
            />
            <Route path="/banned-application" element={<BannedApplication />} />
            <Route
              path="/banned-application/driver-rideHistory/:id"
              element={<BannedRideHistory />}
            />
            <Route
              path="/banned-application/driver-rideHistory/driver-details/:id"
              element={<BannedDriverDetails />}
            />
            <Route path="/blocked-drivers" element={<BlockedDrivers />} />
            <Route
              path="/blocked-drivers/driver-rideHistory/:id"
              element={<BlockedDriversRideHistory />}
            />
            <Route
              path="/blocked-drivers/driver-rideHistory/driver-details/:id"
              element={<BlockedDriverDetails />}
            />
            <Route path="/expired-documents" element={<ExpiredDocuments />} />
            <Route
              path="/expired-documents/driver-rideHistory/:id"
              element={<ExpiredDriversRideHistory />}
            />
            <Route
              path="/expired-documents/driver-rideHistory/driver-details/:id"
              element={<ExpiredDocumentDetails />}
            />
            {/****manage-bookings*****/}
            <Route
              path="/manage-bookings/ongoing-bookings"
              element={<OngingBookings />}
            />
            <Route
              path="/ongoing-bookings-details/:id"
              element={<OngoingBookingsDetails />}
            />
            <Route
              path="/manage-bookings/completed-bookings"
              element={<CompletedBookings />}
            />
            <Route
              path="/completed-bookings-details/:id"
              element={<CompletedBookingsDetails />}
            />
            <Route
              path="/manage-bookings/cancelled-bookings"
              element={<CancelledBookings />}
            />
            <Route
              path="/cancelled-bookings-details/:id"
              element={<CancelledBookingDetails />}
            />
            <Route
              path="/manage-bookings/accident-bookings"
              element={<AccidentBookings />}
            />
            <Route
              path="/accident-bookings-details/:id"
              element={<AccidentBookingDetails />}
            />
            <Route
              path="/manage-bookings/adjusted-bookings"
              element={<AdjustedBookings />}
            />
            <Route
              path="/adjusted-bookings-details/:id"
              element={<AdjustedBookingDetails />}
            />
            {/**********RIDE TYPE AND VEHICLE TYPE */}
            <Route path="/ride-type" element={<RideType />} />
            <Route path="/vehicle-type" element={<VehicleType />} />
            {/* *********Refund********** */}
            <Route path="/refund/pending-refund" element={<PendingRefund />} />
            <Route
              path="/refund/successful-refund"
              element={<SuccessFullRefund />}
            />
            <Route
              path="/refund/cancelled-refund"
              element={<CancelledRefund />}
            />
            {/***trip invoices */}
            <Route path="/trip-invoices" element={<TripInvoices />} />
            {/*********manage booking requests ************/}
            <Route
              path="/manage-booking-requests/ongoing-requests"
              element={<OngoingRequests />}
            />
            <Route
              path="/manage-booking-requests/ongoing-requests/trip-details/:id"
              element={<OngoingRequestTripDetails />}
            />
            <Route
              path="/manage-booking-requests/unsucessful-requests"
              element={<UnsuccessFulRequests />}
            />
            <Route
              path="/manage-booking-requests/unsucessful-requests/trip-details/:id"
              element={<UnsuccessFulRequestTripDetails />}
            />
            {/* ***deleted user **** */}
            <Route path="/deleted-riders" element={<DeletedRiders />} />
            <Route
              path="/deleted-riders/rider-history/:id"
              element={<DeletedRiderHistory />}
            />
            <Route
              path="/permanently-deleted-riders"
              element={<PermanentlyDeletedRiders />}
            />
            <Route
              path="/permanently-deleted-riders/rider-history/:id"
              element={<PermanentlyDelRiderHistory />}
            />
            <Route path="/deleted-drivers" element={<DeletedDrivers />} />
            <Route
              path="/deleted-drivers/driver-rideHistory/:id"
              element={<DeletedDriverRideHistory />}
            />
            <Route
              path="/deleted-drivers/driver-rideHistory/driver-details/:id"
              element={<DeletedDriversDetails />}
            />
            <Route
              path="/permanently-deleted-drivers"
              element={<PermanentlyDeletedDrivers />}
            />
            <Route
              path="/permanently-deleted-drivers/driver-rideHistory/:id"
              element={<PermanentlyDeletedDriverRideHistory />}
            />
            <Route
              path="/permanently-deleted-drivers/driver-rideHistory/driver-details/:id"
              element={<PerDelDriversDetails />}
            />
            {/* *******rider complaints********** */}
            <Route
              path="/rider-complaints/pending-complaints"
              element={<RiderPendingComplaints />}
            />
            <Route
              path="/rider-complaints/inprogress-complaints"
              element={<RiderInprogressComplaints />}
            />
            <Route
              path="/rider-complaints/resolved-closed-complaints"
              element={<ResolvedClosedComplaints />}
            />
            <Route path="/rider-call" element={<RiderCall />} />
            <Route path="/rider-mobile-app" element={<RiderMobileApp />} />
            {/* **********driver complaints*********** */}
            <Route
              path="/driver-complaints/pending-complaints"
              element={<DriverPendingComplaints />}
            />
            <Route
              path="/driver-complaints/inprogress-complaints"
              element={<DriverInprogressComplaints />}
            />
            <Route
              path="/driver-complaints/resolved-closed-complaints"
              element={<DriverResolvedClosedComplaints />}
            />
            <Route path="/driver-call" element={<DriverCall />} />
            <Route path="/driver-mobile-app" element={<DriverMobileApp />} />
            {/* ************SOS************ */}
            <Route
              path="/sos/pending-create-rider-sos"
              element={<PendingCreateRiderSos />}
            />
            <Route
              path="/sos/pending-create-driver-sos"
              element={<PendingCreateDriverSos />}
            />
            <Route
              path="/sos/inprogress-rider-sos"
              element={<InprogressRiderSOS />}
            />
            <Route
              path="/sos/inprogress-driver-sos"
              element={<InprogressDriverSOS />}
            />
            <Route path="/sos/local-responders" element={<LocalResponders />} />
            <Route path="/sos/my-rider-sos" element={<MyRiderSOS />} />
            <Route path="/sos/my-driver-sos" element={<MyDriverSOS />} />
            <Route
              path="/sos/resolved-closed-sos"
              element={<ResolvedClosedSos />}
            />
            {/******Driver Coupons *********/}
            <Route path="/driver-coupons" element={<DriverCoupons />} />
            <Route
              path="/driver-coupons/create"
              element={<CreateDriverCoupons />}
            />
            <Route
              path="/driver-coupon-broadcast/create/:id"
              element={<CreateDriverCouponBroadcast />}
            />
            <Route
              path="/driver-coupons/usage-history/view/:id"
              element={<DriverCouponUsageHistoryView />}
            />
            <Route
              path="/driver-coupons/review-required/:action/:id"
              element={<DriverCouponReviewRequired />}
            />
            <Route
              path="/driver-coupons/review-required/broadcast/:action/:id"
              element={<ReviewReqDriverCouponBroadcast />}
            />
            <Route
              path="/driver-coupons/active/:action/:id"
              element={<DriverCouponActive />}
            />
            <Route
              path="/driver-coupons/active/broadcast/:action/:id"
              element={<ActiveDriverCouponBroadcast />}
            />
            <Route
              path="/driver-coupons/rejected/view/:id"
              element={<RejectedDriverCoupon />}
            />
            <Route
              path="/driver-coupons/rejected/broadcast/view/:id"
              element={<RejectedDriverCouponBroadcast />}
            />
            <Route
              path="/driver-coupons/deleted/view/:id"
              element={<DeletedDriverCoupon />}
            />
            <Route
              path="/driver-coupons/deleted/broadcast/view/:id"
              element={<DeletedDriverCouponBroadcast />}
            />
            <Route
              path="/driver-coupons/expired/view/:id"
              element={<ExpiredDriverCoupon />}
            />
            <Route
              path="/driver-coupons/expired/broadcast/view/:id"
              element={<ExpiredDriverCouponBroadcast />}
            />
            {/* *********rider coupons******* */}
            <Route path="/rider-coupons" element={<RiderCoupons />} />
            <Route path="/create-new-coupon" element={<CreateNewCoupon />} />
            <Route path="/create-broadcast" element={<CreateBroadcast />} />
            <Route
              path="/coupon-review-required/:id"
              element={<ReviewRequiredview />}
            />
            <Route
              path="/coupon-review-reqired/broadcast/:id"
              element={<ReviewBroadCastViewEdit />}
            />
            <Route
              path="/coupon-active-view-edit/:id"
              element={<ActiveCouponViewEdit />}
            />
            <Route
              path="/coupon-active-broadcast/:id"
              element={<ActiveBroadcastViewEdit />}
            />
            <Route
              path="/coupon-rejected-view/:id"
              element={<RejectedCouponView />}
            />
            <Route
              path="/coupon-rejected-broadcast/:id"
              element={<RejectedBroadCastView />}
            />
            <Route
              path="/coupon-deleted-view/:id"
              element={<DeletedCouponView />}
            />
            <Route
              path="/coupon-deleted-broadcast/:id"
              element={<DeletedBroadCastView />}
            />
            <Route
              path="/coupon-expired-view/:id"
              element={<ExpiredCouponView />}
            />
            <Route
              path="/coupon-expired-broadcast/:id"
              element={<ExpiredBroadCastView />}
            />
            <Route
              path="/coupon-usage-history-view/:id"
              element={<CouponUsageHistotyView />}
            />
            {/* *********rider coupons******* */}
            {/* <Route path="/rider-referrals" element={<RiderReferrals />} />
            <Route
              path="/rider-referrals/account-specific"
              element={<CreateAccountSpecificCoupon />}
            />
            <Route
              path="/rider-referrals/create-broadcast"
              element={<CreateRiderReferralBroadcast />}
            />
            <Route
              path="/rider-referrals/view"
              element={<AccountSpecificCouponView />}
            />
            <Route
              path="/rider-referrals/view-broadcast"
              element={<ViewRiderReferralBroadcast />}
            /> */}
            {/******************* rider-referral  ********************/}
            <Route path="/rider-referral" element={<RiderReferral />} />
            <Route
              path="/create-new-referral"
              element={<ReferralCreateReferral />}
            />
            <Route
              path="/create-broadcast-referral"
              element={<ReferralCreateBroadcast />}
            />
            <Route
              path="/rider-referral/review-required/:action/:id"
              element={<ReviewRequiredReferralEdit />}
            />
            <Route
              path="/referral-review-required-broadcast-edit/:id"
              element={<ReferralReviewReqBroadcastEdit />}
            />
            <Route
              path="/rider-referral/active/:action/:id"
              element={<ReferralActiveEdit />}
            />
            <Route
              path="/referral-active-braodcast-edit/:id"
              element={<ReferralActiveBroadcastEdit />}
            />
            <Route
              path="/rider-referral/reject/view/:id"
              element={<ReferralRejectedView />}
            />
            <Route
              path="/referral-rejected/broadcast/view/:id"
              element={<ReferralRejectBroadcastView />}
            />
            <Route
              path="/rider-referral/deleted/view/:id"
              element={<ReferralDeletedView />}
            />
            <Route
              path="/referral-deleted/broadcast/view/:id"
              element={<ReferralDeletedBroadcastView />}
            />
            <Route
              path="/rider-referral/expired/view/:id"
              element={<ReferralExpiredView />}
            />
            <Route
              path="/referral-expire/broadcast/view/:id"
              element={<ReferralExpiredBroadcastView />}
            />
            <Route
              path="/rider-referral/reciever-history/view/:id"
              element={<ReferralRecevierHistory />}
            />
            <Route
              path="/rider-referral/sender-history/view/:id"
              element={<ReferralSenderHistory />}
            />
            {/******************* driver-referral  ********************/}
            <Route path="/driver-referral" element={<DriverReferral />} />
            <Route
              path="/driver-referral/create"
              element={<CreateDriverReferrals />}
            />
            <Route
              path="/driver-referral/broadcast/create"
              element={<DriverReferralCreateBroadcast />}
            />
            <Route
              path="/driver-referral/review-required/:action/:id"
              element={<ReviewReqDriverRef />}
            />
            <Route
              path="/driver-referral/review-required/broadcast/:action/:id"
              element={<ReviewReqDriverRefBroadcast />}
            />
            <Route
              path="/driver-referral/active/:action/:id"
              element={<DriverRefActive />}
            />
            <Route
              path="/driver-referral/active/broadcast/:action/:id"
              element={<ActiveDriverRefBroadcast />}
            />
            <Route
              path="/driver-referral/deleted/view/:id"
              element={<DeletedDriverRef />}
            />
            <Route
              path="/driver-referral/reject/view/:id"
              element={<RejectedDriverRef />}
            />
            <Route
              path="/driver-referral/expired/view/:id"
              element={<ExpiredDriverRefId />}
            />
            <Route
              path="/driver-referral/expired/broadcast/view/:id"
              element={<ExpiredDriverRefIdBroadcast />}
            />
            <Route
              path="/driver-referral/rejected/broadcast/view/:id"
              element={<RejectedDriverRefBroadcast />}
            />
            <Route
              path="/driver-referral/deleted/broadcast/view/:id"
              element={<DeletedDriverRefbroadcast />}
            />
            <Route
              path="/driver-referral/active/broadcast/:action/:id"
              element={<ActiveDriverRefBroadcast />}
            />
            <Route
              path="/driver-referral/reciever-history/view/:id"
              element={<DriverReferralRecevierHistory />}
            />
            <Route
              path="/driver-referral/sender-history/view/:id"
              element={<DriverReferralSenderHistory />}
            />
            {/* ********** Incentive **********  */}
            <Route path="/driver-incentives" element={<DriverIncentives />} />
            <Route
              path="/driver-incentives/create"
              element={<CreateDriverIncentive />}
            />
            <Route
              path="/driver-incentives/broadcast/create"
              element={<CreateDriverIncentiveBroadcast />}
            />
            <Route
              path="/driver-incentives/review-required/:action/:id"
              element={<DriverIncentiveReviewReq />}
            />
            <Route
              path="/driver-incentives/review-required/broadcast/:action/:id"
              element={<ReviewReqIncentiveBroadcast />}
            />
            <Route
              path="/driver-incentives/active/:action/:id"
              element={<DriverIncentiveActive />}
            />
            <Route
              path="/driver-incentives/active/broadcast/:action/:id"
              element={<DriverIncentiveActivebroadcast />}
            />
            <Route
              path="/driver-incentives/rejected/:action/:id"
              element={<DriverIncentiveRejected />}
            />
            <Route
              path="/driver-incentives/rejected/broadcast/:action/:id"
              element={<DriverIncentiveRejectedbroadcast />}
            />
            <Route
              path="/driver-incentives/deleted/:action/:id"
              element={<DriverIncentiveDeleted />}
            />
            <Route
              path="/driver-incentives/deleted/broadcast/:action/:id"
              element={<DriverIncentiveDeletedbroadcast />}
            />
            <Route
              path="/driver-incentives/expired/:action/:id"
              element={<DriverIncentiveExpired />}
            />
            <Route
              path="/driver-incentives/expired/broadcast/:action/:id"
              element={<DriverIncentiveExpiredbroadcast />}
            />
            <Route
              path="/driver-incentive/usage-history/view/:id"
              element={<DriverIncentiveHistoryFindone />}
            />
            {/******************BroadCast ***************/}
            <Route path="/rider-broadcast" element={<RiderBroadcast />} />
            <Route
              path="/rider-broadcast/create"
              element={<CreateRiderbroadcast />}
            />
            <Route
              path="/rider-broadcast/review-required/:action/:id"
              element={<ReviewReqRiderBroadcast />}
            />
            <Route
              path="/rider-broadcast/active/:action/:id"
              element={<ActiveRiderBroadcast />}
            />
            <Route
              path="/rider-broadcast/rejected/:action/:id"
              element={<RejectRiderBroadcast />}
            />
            <Route
              path="/rider-broadcast/deleted/:action/:id"
              element={<DeletedRiderBroadcast />}
            />
            <Route
              path="/rider-broadcast/expired/:action/:id"
              element={<RiderBroadcastExpired />}
            />
            {/******************driver BroadCast ***************/}
            <Route path="/driver-broadcast" element={<DriverBroadcast />} />
            <Route
              path="/driver-broadcast/create"
              element={<CreateDriverbroadcast />}
            />
            <Route
              path="/driver-broadcast/review-required/:action/:id"
              element={<ReviewReqDriverBroadcast />}
            />
            <Route
              path="/driver-broadcast/active/:action/:id"
              element={<ActiveDriverBroadcast />}
            />
            <Route
              path="/driver-broadcast/rejected/:action/:id"
              element={<RejectDriverBroadcast />}
            />
            <Route
              path="/driver-broadcast/deleted/:action/:id"
              element={<DeletedDriverBroadcast />}
            />
            <Route
              path="/test"
              element={<FormWithFourDropdownsAndTextarea />}
            />
            <Route path="/test2" element={<BroadcastInputtest2 />} />
            <Route path="/chat-box" element={<ChatBox />} />
            <Route path="/rider-faq" element={<RiderFaqs />} />
            <Route path="/driver-faq" element={<DriverFaqs />} />
            <Route
              path="/rider-notification-sms-email"
              element={<RiderNse />}
            />
            <Route
              path="/rider-notification-sms-email"
              element={<RiderNse />}
            />
            <Route
              path="/drive-notification-sms-email"
              element={<DriverNse />}
            />
            <Route
              path="/rider/notification/sms/email/:action/:id"
              element={<NotificationSms />}
            />
            <Route
              path="/driver/notification/sms/email/:action/:id"
              element={<MotificationSmsdriver />}
            />
            <Route
              path="/rider-notification-sms-email"
              element={<RiderNse />}
            />
            <Route
              path="/rider-faq/topic/:userType/:mainType/:type/:action/:id"
              element={<ViewEditTopic />}
            />
            <Route path="/Test3" element={<Test3 />} />
            {/******************driver Metrics ***************/}
            <Route path="/driver-metrics" element={<DriverMetrices />} />
            <Route
              path="/driver-metrics/:action/:id"
              element={<DriverMetricsView />}
            />
            {/* ----- Rider Finance ----- */}
            <Route path="/rider-finance" element={<RiderFinance />} />
            <Route
              path="/rider-finance-current-balance-details/:action/:id"
              element={<RiderCurrentBalanceDetails />}
            />
            {/* ----- Driver Finance ----- */}
            <Route
              path="/driver-finance-current-balance"
              element={<DriverFinanceCurrentBalance />}
            />
            <Route
              path="/driver-finance-create-cash-transaction"
              element={<CreateCashTransaction />}
            />
            <Route
              path="/driver-finance-successful-cashout"
              element={<SuccessfulCashout />}
            />
            <Route
              path="/driver-finance-current-balance-details/:id"
              element={<DriverFinanceViewTable />}
            />
            <Route
              path="/driver-finance-cash-transaction-history"
              element={<CashTransactionHistory />}
            />
            <Route
              path="/driver-finance-cashout-balance-history"
              element={<CashoutBalanceHistory />}
            />
            <Route
              path="/driver-finance-successful-cashout-details/:id"
              element={<SuccessfulCashoutViewTable />}
            />
            <Route
              path="/driver-finance-cash-transaction-details"
              element={<CashTransactionViewModal />}
            />
            <Route
              path="/driver-finance-cashout-balance-details/:id"
              element={<CashoutBalanceViewTable />}
            />
            {/* ----- driver Premiums ----- */}
            <Route
              path="/premium-history/currentbalance/:id"
              element={<PremiumCurrentBalance />}
            />
            <Route
              path="/driver-premium/default"
              element={<DefaultPremiumTable />}
            />
            <Route
              path="/driver-premium/default/:action/:id/:ride_type_id"
              element={<DriverPremiums />}
            />
            <Route
              path="/driver-premium/premium"
              element={<ManagePremiumTable />}
            />
            <Route
              path="/driver-premium/premium/:action/:id"
              element={<ManagePremiumsViewTable />}
            />
            <Route
              path="/driver-premium/premium/:action/:zoneId/:ride_type_id"
              element={<ManagePremiums />}
            />
            <Route
              path="/driver-premium/archived"
              element={<ArchivedPremiumTable />}
            />
            <Route
              path="/driver-premium/archived/:action/:id"
              element={<ArchivedPremiumViewTable />}
            />
            <Route
              path="/driver-premium/archived/:action/:zoneId/:ride_type_id"
              element={<ArchivedPremium />}
            />
            <Route
              path="/cash-transaction-password-modal"
              element={<CashTransactionPasswordModal />}
            />
            {/* *********Premium Refund********** */}
            <Route
              path="/premium-refund/pending-refund"
              element={<PremiumPendingRefund />}
            />
            <Route
              path="/premium-refund/successful-refund"
              element={<PremiumSuccessfulRefund />}
            />
            <Route
              path="/premium-refund/cancelled-refund"
              element={<PremiumCancelledRefund />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>

        <ToastContainer limit={10} />
      </Router>
    </>
  );
}
