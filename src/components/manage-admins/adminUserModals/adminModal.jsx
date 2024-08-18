import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../adminModals.css";
import { useFormik } from "formik";
import { MenuItem, TextField } from "@mui/material";
import * as yup from "yup";
import ResetPasswordModal from "./resetPassword";
import AdminDetails from "../adminDetails";
import { EditAdminStyles } from "../../mui-styles/mui-styles";
import MuiField, { officeLocations, teams } from "../../form/muiField";
import Resetbtn from "../../utilits/buttons/resetbtn";
import * as adminAction from "../../../redux/actions/manageAdminsAction";
import { numRegex } from "../../helper";
import { useDispatch } from "react-redux";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import SuccessMessagemodal from "../../modals/successMessageModal";
import AdminPasswordModal from "./passwordModal";
import DetailsModal from "../../modals/detailsModal";
import Savebtn from "../../utilits/buttons/savebtn";
import ViewPermissionsModal from "./viewPermissionModal";
import usePermissions from "../../usePermissionChecker";
import useDisplayToggle from "../../useDisplayToggle";

const AdminModal = ({
  editAdminshow,
  handleEditAdminClose,
  user,
  setAdminTable,
  adminTable,
  action,
  setAction,
  type,
  permission,
  adminType,
}) => {
  console.log(action, "asjkfask");
  const { canRead, canWrite } = usePermissions();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (menuIndex) => {
    if (menuIndex === openMenu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuIndex);
    }
  };

  const [passwordObject, setPasswordObject] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setAdminTable(!adminTable);
    setErrorMessage(false);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const handlePasswordClose = () => setPasswordShow(false);
  const handlePasswordShow = () => setPasswordShow(true);

  const [permissionShow, setPermissionShow] = useState(false);
  const handlePermissionClose = () => setPermissionShow(false);
  const handlePermissionShow = () => setPermissionShow(true);

  const validationSchema = yup.object({
    firstName: yup
      .string("")
      .trim()
      .required("Please fill  the fields to proceed"),
    lastName: yup
      .string("")
      .trim()
      .required("Please fill  the fields to proceed"),
    userName: yup
      .string("")
      .trim()
      .required("Please fill  the fields to proceed"),
    emailAdress: yup
      .string("")
      .trim()
      .email()
      .required("Please fill  the fields to proceed"),
    phoneNumber: yup
      .string("")
      .trim()
      .matches(numRegex, "Invalid value")
      .required("Please fill  the fields to proceed"),
    jobTitle: yup
      .string("")
      .trim()
      .required("Please fill  the fields to proceed"),
    officeLocation: yup
      .string("")
      .trim()
      .required("Please fill  the fields to proceed"),
    team: yup.string("").trim().required("Please fill  the fields to proceed"),
    jobTitleSummary: yup
      .string("")
      .trim()
      .required("Please fill  the fields to proceed"),
    password: yup.string().when("action", {
      is: (val) => val === "create",
      then: yup.string().required("Please create a password"),
      otherwise: yup.string(),
    }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      userName: user?.user_name ?? "",
      emailAdress: user?.email ?? "",
      phoneNumber: user?.phone ?? "",
      jobTitle: user?.job_title ?? "",
      team: user?.team ?? "",
      officeLocation: user?.location ?? "",
      jobTitleSummary: user?.job_title_description ?? "",
      user_permission: user?.permissions
        ? {
            dashboard: {
              driver_dashboard: user?.permissions?.driver_dashboard,
              complaint_dashboard: user?.permissions?.complaint_dashboard,
            },
            analysis_dashboard: {
              rider_metrics: user?.permissions?.rider_metrics,
              // driver_metrics: user?.permissions?.driver_metrics,
              booking_metrics: user?.permissions?.booking_metrics,
              cancellation_metrics: user?.permissions?.cancellation_metrics,
              earning_metrics: user?.permissions?.earning_metrics,
            },
            manage_admin: {
              admin_users: user?.permissions?.admin_users,
              blocked_admins: user?.permissions?.blocked_admins,
              deleted_admins: user?.permissions?.deleted_admins,
            },
            riders: {
              manage_riders: user?.permissions?.manage_riders,
              blocked_riders: user?.permissions?.blocked_riders,
            },
            drivers: {
              manage_drivers: user?.permissions?.manage_drivers,
              pending_application: user?.permissions?.pending_application,
              rejected_application: user?.permissions?.rejected_application,
              banned_application: user?.permissions?.banned_application,
              expired_documents: user?.permissions?.expired_documents,
              blocked_driver: user?.permissions?.blocked_driver,
            },
            deleted_users: {
              deleted_riders: user?.permissions?.deleted_riders,
              permanentely_deleted_drivers:
                user?.permissions?.permanentely_deleted_drivers,
              permanentely_deleted_riders:
                user?.permissions?.permanentely_deleted_riders,
              deleted_drivers: user?.permissions?.deleted_drivers,
            },
            manage_booking_requests: {
              ongoing_booking_requests:
                user?.permissions?.ongoing_booking_requests,
              unsuccessful_booking_requests:
                user?.permissions?.unsuccessful_booking_requests,
            },
            manage_bookings: {
              ongoing_booking: user?.permissions?.ongoing_booking,
              completed_booking: user?.permissions?.completed_booking,
              cancelled_booking: user?.permissions?.cancelled_booking,
              accident_booking: user?.permissions?.accident_booking,
              adjusted_booking: user?.permissions?.adjusted_booking,
            },

            booking_invoices: {
              booking_invoice: user?.permissions?.booking_invoice,
            },
            refund: {
              pending_refund: user?.permissions?.pending_refund,
              successful_refund: user?.permissions?.successful_refund,
              cancelled_refund: user?.permissions?.cancelled_refund,
            },

            driver_metrics: {
              driver_metrics: user?.permissions?.driver_metrics,
            },
            driver_finances: {
              driver_finance: user?.permissions?.driver_finance,
            },

            ride_type_Vehicle_type: {
              ride_types: user?.permissions?.ride_types,
              vehicle_types: user?.permissions?.vehicle_types,
            },
            zones: {
              manage_zones: user?.permissions?.manage_zones,
              blocked_zones: user?.permissions?.blocked_zones,
              archived_zones: user?.permissions?.archived_zones,
            },
            fares: {
              manage_fares: user?.permissions?.manage_fares,
              defualt_fares: user?.permissions?.defualt_fares,
              deleted_intrazone_fares:
                user?.permissions?.deleted_intrazone_fares,
              archived_intrazone_fares:
                user?.permissions?.archived_intrazone_fares,
              archived_fares: user?.permissions?.archived_fares,
            },
            // Driver Premiums need to add
            rider_complaints: {
              my_rider_complaint: user?.permissions?.my_rider_complaint,
              rider_mobileapp: user?.permissions?.rider_mobileapp,
              rider_call: user?.permissions?.rider_call,
              rider_pending_complaints:
                user?.permissions?.rider_pending_complaints,
              rider_inprogress_complaint:
                user?.permissions?.rider_inprogress_complaint,
              rider_resloved_closed_complaint:
                user?.permissions?.rider_resloved_closed_complaint,
            },
            driver_complaints: {
              my_driver_complaint: user?.permissions?.my_driver_complaint,
              driver_mobileapp: user?.permissions?.driver_mobileapp,
              driver_call: user?.permissions?.driver_call,
              driver_pending_complaints:
                user?.permissions?.driver_pending_complaints,
              driver_inprogress_complaint:
                user?.permissions?.driver_inprogress_complaint,
              driver_resloved_closed_complaint:
                user?.permissions?.driver_resloved_closed_complaint,
            },
            sos: {
              my_driver_sos: user?.permissions?.my_driver_sos,
              my_rider_sos: user?.permissions?.my_rider_sos,
              pending_create_rider_sos:
                user?.permissions?.pending_create_rider_sos,
              pending_create_driver_sos:
                user?.permissions?.pending_create_driver_sos,
              inprogress_rider_sos: user?.permissions?.inprogress_rider_sos,
              inprogress_driver_sos: user?.permissions?.inprogress_driver_sos,
              resloved_closed_sos: user?.permissions?.resloved_closed_sos,
              local_responder: user?.permissions?.local_responder,
            },

            rider_finances: {
              rider_finance: user?.permissions?.rider_finance,
            },

            coupons: {
              rider_coupons: user?.permissions?.rider_coupons,
              rider_coupons_review_required:
                user?.permissions?.rider_coupons_review_required,
              rider_coupons_active: user?.permissions?.rider_coupons_active,
              rider_coupons_rejected: user?.permissions?.rider_coupons_rejected,
              rider_coupons_deleted: user?.permissions?.rider_coupons_deleted,
              rider_coupons_expired: user?.permissions?.rider_coupons_expired,
              rider_coupons_usage_history:
                user?.permissions?.rider_coupons_usage_history,

              driver_coupons: user?.permissions?.driver_coupons,
              driver_coupons_review_required:
                user?.permissions?.driver_coupons_review_required,
              driver_coupons_active: user?.permissions?.driver_coupons_active,
              driver_coupons_rejected:
                user?.permissions?.driver_coupons_rejected,
              driver_coupons_deleted: user?.permissions?.driver_coupons_deleted,
              driver_coupons_expired: user?.permissions?.driver_coupons_expired,
              driver_coupons_usage_history:
                user?.permissions?.driver_coupons_usage_history,
            },
            referrals: {
              rider_referrals: user?.permissions?.rider_referrals,

              rider_referrals_review_required:
                user?.permissions?.rider_referrals_review_required,
              rider_referrals_active: user?.permissions?.rider_referrals_active,
              rider_referrals_rejected:
                user?.permissions?.rider_referrals_rejected,
              rider_referrals_deleted:
                user?.permissions?.rider_referrals_deleted,
              rider_referrals_expired:
                user?.permissions?.rider_referrals_expired,
              rider_referrals_usage_history:
                user?.permissions?.rider_referrals_usage_history,

              driver_referrals: user?.permissions?.driver_referrals,
              driver_referrals_review_required:
                user?.permissions?.driver_referrals_review_required,
              driver_referrals_active:
                user?.permissions?.driver_referrals_active,
              driver_referrals_rejected:
                user?.permissions?.driver_referrals_rejected,
              driver_referrals_deleted:
                user?.permissions?.driver_referrals_deleted,
              driver_referrals_expired:
                user?.permissions?.driver_referrals_expired,
              driver_referrals_usage_history:
                user?.permissions?.driver_referrals_usage_history,
            },
            incentives: {
              rider_incentive: user?.permissions?.rider_incentive,
              rider_incentive_review_required:
                user?.permissions?.rider_incentive_review_required,
              rider_incentive_active: user?.permissions?.rider_incentive_active,
              rider_incentive_rejected:
                user?.permissions?.rider_incentive_rejected,
              rider_incentive_deleted:
                user?.permissions?.rider_incentive_deleted,
              rider_incentive_expired:
                user?.permissions?.rider_incentive_expired,
              rider_incentive_usage_history:
                user?.permissions?.rider_incentive_usage_history,

              driver_incentive: user?.permissions?.driver_incentive,

              driver_incentive_review_required:
                user?.permissions?.driver_incentive_review_required,
              driver_incentive_active:
                user?.permissions?.driver_incentive_active,
              driver_incentive_rejected:
                user?.permissions?.driver_incentive_rejected,
              driver_incentive_deleted:
                user?.permissions?.driver_incentive_deleted,
              driver_incentive_expired:
                user?.permissions?.driver_incentive_expired,
              driver_incentive_usage_history:
                user?.permissions?.driver_incentive_usage_history,
            },
            broadcast: {
              rider_broadcast: user?.permissions?.rider_broadcast,

              rider_broadcast_review_required:
                user?.permissions?.rider_broadcast_review_required,
              rider_broadcast_active: user?.permissions?.rider_broadcast_active,
              rider_broadcast_rejected:
                user?.permissions?.rider_broadcast_rejected,
              rider_broadcast_deleted:
                user?.permissions?.rider_broadcast_deleted,
              rider_broadcast_expired:
                user?.permissions?.rider_broadcast_expired,

              driver_broadcast: user?.permissions?.driver_broadcast,

              driver_broadcast_review_required:
                user?.permissions?.driver_broadcast_review_required,
              driver_broadcast_active:
                user?.permissions?.driver_broadcast_active,
              driver_broadcast_rejected:
                user?.permissions?.driver_broadcast_rejected,
              driver_broadcast_deleted:
                user?.permissions?.driver_broadcast_deleted,
              driver_broadcast_expired:
                user?.permissions?.driver_broadcast_expired,
            },
            faq: {
              rider_faq: user?.permissions?.rider_faq,
              driver_faq: user?.permissions?.driver_faq,
            },

            notification_and_sms: {
              nse_rider: user?.permissions?.nse_rider,
              nse_driver: user?.permissions?.nse_driver,
            },
            tracking: {
              track_vehicle: user?.permissions?.track_vehicle,
              track_sos_rider: user?.permissions?.track_sos_rider,
            },
          }
        : {
            dashboard: {
              driver_dashboard: {
                read: false,
                write: false,
              },

              complaint_dashboard: {
                read: false,
                write: false,
              },
            },
            analysis_dashboard: {
              rider_metrics: {
                read: false,
                write: false,
              },
              // driver_metrics: {
              //   read: false,
              //   write: false,
              // },
              booking_metrics: {
                read: false,
                write: false,
              },
              cancellation_metrics: {
                read: false,
                write: false,
              },
              earning_metrics: {
                read: false,
                write: false,
              },
            },
            manage_admin: {
              admin_users: {
                read: false,
                write: false,
              },
              blocked_admins: {
                read: false,
                write: false,
              },
              deleted_admins: {
                read: false,
                write: false,
              },
            },
            riders: {
              manage_riders: {
                read: false,
                write: false,
              },
              blocked_riders: {
                read: false,
                write: false,
              },
            },
            drivers: {
              manage_drivers: {
                read: false,
                write: false,
              },
              pending_application: {
                read: false,
                write: false,
              },
              rejected_application: {
                read: false,
                write: false,
              },
              banned_application: {
                read: false,
                write: false,
              },
              expired_documents: {
                read: false,
                write: false,
              },
              blocked_driver: {
                read: false,
                write: false,
              },
            },
            deleted_users: {
              deleted_riders: {
                read: false,
                write: false,
              },
              permanentely_deleted_drivers: {
                read: false,
                write: false,
              },
              permanentely_deleted_riders: {
                read: false,
                write: false,
              },
              deleted_drivers: {
                read: false,
                write: false,
              },
            },
            manage_booking_requests: {
              ongoing_booking_requests: {
                read: false,
                write: false,
              },
              unsuccessful_booking_requests: {
                read: false,
                write: false,
              },
            },
            manage_bookings: {
              ongoing_booking: {
                read: false,
                write: false,
              },
              completed_booking: {
                read: false,
                write: false,
              },
              cancelled_booking: {
                read: false,
                write: false,
              },
              accident_booking: {
                read: false,
                write: false,
              },
              adjusted_booking: {
                read: false,
                write: false,
              },
            },

            booking_invoices: {
              booking_invoice: {
                read: false,
                write: false,
              },
            },
            refund: {
              pending_refund: {
                read: false,
                write: false,
              },
              successful_refund: {
                read: false,
                write: false,
              },
              cancelled_refund: {
                read: false,
                write: false,
              },
            },

            driver_metrics: {
              driver_metrics: {
                read: false,
                write: false,
              },
            },
            driver_finances: {
              driver_finance: {
                read: false,
                write: false,
              },
            },
            ride_type_Vehicle_type: {
              ride_types: {
                read: false,
                write: false,
              },
              vehicle_types: {
                read: false,
                write: false,
              },
            },
            zones: {
              manage_zones: {
                read: false,
                write: false,
              },
              blocked_zones: {
                read: false,
                write: false,
              },
              archived_zones: {
                read: false,
                write: false,
              },
            },
            fares: {
              manage_fares: {
                read: false,
                write: false,
              },
              defualt_fares: {
                read: false,
                write: false,
              },
              deleted_intrazone_fares: {
                read: false,
                write: false,
              },
              archived_intrazone_fares: {
                read: false,
                write: false,
              },
              archived_fares: {
                read: false,
                write: false,
              },
            },
            // Driver Premiums need to add
            rider_complaints: {
              my_rider_complaint: {
                read: false,
                write: false,
              },
              rider_mobileapp: {
                read: false,
                write: false,
              },
              rider_call: {
                read: false,
                write: false,
              },
              rider_pending_complaints: {
                read: false,
                write: false,
              },
              rider_inprogress_complaint: {
                read: false,
                write: false,
              },
              rider_resloved_closed_complaint: {
                read: false,
                write: false,
              },
            },
            driver_complaints: {
              my_driver_complaint: {
                read: false,
                write: false,
              },
              driver_mobileapp: {
                read: false,
                write: false,
              },
              driver_call: {
                read: false,
                write: false,
              },
              driver_pending_complaints: {
                read: false,
                write: false,
              },
              driver_inprogress_complaint: {
                read: false,
                write: false,
              },
              driver_resloved_closed_complaint: {
                read: false,
                write: false,
              },
            },
            sos: {
              my_driver_sos: {
                read: false,
                write: false,
              },
              my_rider_sos: {
                read: false,
                write: false,
              },
              pending_create_rider_sos: {
                read: false,
                write: false,
              },
              pending_create_driver_sos: {
                read: false,
                write: false,
              },
              inprogress_rider_sos: {
                read: false,
                write: false,
              },
              inprogress_driver_sos: {
                read: false,
                write: false,
              },
              resloved_closed_sos: {
                read: false,
                write: false,
              },
              local_responder: {
                read: false,
                write: false,
              },
            },
            rider_finances: {
              rider_finance: {
                read: false,
                write: false,
              },
            },
            coupons: {
              rider_coupons: {
                read: false,
                write: false,
              },
              rider_coupons_review_required: {
                read: false,
                write: false,
              },
              rider_coupons_active: {
                read: false,
                write: false,
              },
              rider_coupons_rejected: {
                read: false,
                write: false,
              },
              rider_coupons_deleted: {
                read: false,
                write: false,
              },
              rider_coupons_expired: {
                read: false,
                write: false,
              },
              rider_coupons_usage_history: {
                read: false,
                write: false,
              },
              driver_coupons: {
                read: false,
                write: false,
              },
              driver_coupons_review_required: {
                read: false,
                write: false,
              },
              driver_coupons_active: {
                read: false,
                write: false,
              },
              driver_coupons_rejected: {
                read: false,
                write: false,
              },
              driver_coupons_deleted: {
                read: false,
                write: false,
              },
              driver_coupons_expired: {
                read: false,
                write: false,
              },
              driver_coupons_usage_history: {
                read: false,
                write: false,
              },
            },
            referrals: {
              rider_referrals: {
                read: false,
                write: false,
              },
              rider_referrals_review_required: {
                read: false,
                write: false,
              },
              rider_referrals_active: {
                read: false,
                write: false,
              },
              rider_referrals_rejected: {
                read: false,
                write: false,
              },
              rider_referrals_deleted: {
                read: false,
                write: false,
              },
              rider_referrals_expired: {
                read: false,
                write: false,
              },
              rider_referrals_usage_history: {
                read: false,
                write: false,
              },
              driver_referrals: {
                read: false,
                write: false,
              },
              driver_referrals_review_required: {
                read: false,
                write: false,
              },
              driver_referrals_active: {
                read: false,
                write: false,
              },
              driver_referrals_rejected: {
                read: false,
                write: false,
              },
              driver_referrals_deleted: {
                read: false,
                write: false,
              },
              driver_referrals_expired: {
                read: false,
                write: false,
              },
              driver_referrals_usage_history: {
                read: false,
                write: false,
              },
            },
            incentives: {
              rider_incentive: {
                read: false,
                write: false,
              },
              rider_incentive_review_required: {
                read: false,
                write: false,
              },
              rider_incentive_active: {
                read: false,
                write: false,
              },
              rider_incentive_rejected: {
                read: false,
                write: false,
              },
              rider_incentive_deleted: {
                read: false,
                write: false,
              },
              rider_incentive_expired: {
                read: false,
                write: false,
              },
              rider_incentive_usage_history: {
                read: false,
                write: false,
              },
              driver_incentive: {
                read: false,
                write: false,
              },

              driver_incentive_review_required: {
                read: false,
                write: false,
              },
              driver_incentive_active: {
                read: false,
                write: false,
              },
              driver_incentive_rejected: {
                read: false,
                write: false,
              },
              driver_incentive_deleted: {
                read: false,
                write: false,
              },
              driver_incentive_expired: {
                read: false,
                write: false,
              },
              driver_incentive_usage_history: {
                read: false,
                write: false,
              },
            },
            broadcast: {
              rider_broadcast: {
                read: false,
                write: false,
              },

              rider_broadcast_review_required: {
                read: false,
                write: false,
              },
              rider_broadcast_active: {
                read: false,
                write: false,
              },
              rider_broadcast_rejected: {
                read: false,
                write: false,
              },
              rider_broadcast_deleted: {
                read: false,
                write: false,
              },
              rider_broadcast_expired: {
                read: false,
                write: false,
              },
              driver_broadcast: {
                read: false,
                write: false,
              },
              driver_broadcast_review_required: {
                read: false,
                write: false,
              },
              driver_broadcast_active: {
                read: false,
                write: false,
              },
              driver_broadcast_rejected: {
                read: false,
                write: false,
              },
              driver_broadcast_deleted: {
                read: false,
                write: false,
              },
              driver_broadcast_expired: {
                read: false,
                write: false,
              },
            },
            faq: {
              rider_faq: {
                read: false,
                write: false,
              },
              driver_faq: {
                read: false,
                write: false,
              },
            },
            notification_and_sms: {
              nse_rider: {
                read: false,
                write: false,
              },
              nse_driver: {
                read: false,
                write: false,
              },
            },
            tracking: {
              track_vehicle: {
                read: false,
                write: false,
              },
              track_sos_rider: {
                read: false,
                write: false,
              },
            },
          },
      password: "",
      action: action ?? "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      if (action === "create") {
        setLoading(true);
        dispatch(
          adminAction?.addAdmin(
            {
              first_name: values.firstName,
              last_name: values.lastName,
              user_name: values.userName,
              email: values?.emailAdress,
              phone: values?.phoneNumber,
              team: values?.team,
              location: values?.officeLocation,
              job_title: values?.jobTitle,
              job_title_description: values?.jobTitleSummary,
              password: values?.password,
              confirm_password: values?.password,
              user_permission: {
                ...values.user_permission.dashboard,
                ...values.user_permission.analysis_dashboard,
                ...values.user_permission.manage_admin,
                ...values.user_permission.riders,
                ...values.user_permission.drivers,
                ...values.user_permission.deleted_users,
                ...values.user_permission.manage_booking_requests,
                ...values.user_permission.manage_bookings,
                ...values.user_permission.booking_invoices,
                ...values.user_permission.refund,
                ...values.user_permission.driver_metrics,
                ...values.user_permission.driver_finances,
                ...values.user_permission.ride_type_Vehicle_type,
                ...values.user_permission.zones,
                ...values.user_permission.fares,
                ...values.user_permission.rider_complaints,
                ...values.user_permission.driver_complaints,
                ...values.user_permission.sos,
                ...values.user_permission.coupons,
                ...values.user_permission.referrals,
                ...values.user_permission.incentives,
                ...values.user_permission.broadcast,
                ...values.user_permission.notification_and_sms,
                ...values.user_permission.tracking,
                ...values.user_permission.rider_finances,
                ...values.user_permission.faq,
              },
            },
            onSuccess,
            onError
          )
        );
      } else {
        if (
          JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
        ) {
          if (type === "manageAdminList") {
            setPasswordObject({
              reason: false,
              modalTitle: "Are you sure you want make changes ?",
              password: true,
              type: "edit_admin",
              successMessage: "Changes made Successfully!",
            });
          } else if (type === "blockedAdminList") {
            setPasswordObject({
              reason: false,
              modalTitle: "Are you sure you want make changes ?",
              password: true,
              type: "edit_blocked_admin",
              successMessage: "Changes made Successfully!",
            });
          }

          handlePasswordShow();
        } else {
          handlePasswordClose();
        }
      }
    },
  });

  useEffect(() => {
    setErrorMessage(false);
  }, [action, user?.id]);

  useEffect(() => {

    const initialValuesWithoutPassword = { ...formik.initialValues };
    delete initialValuesWithoutPassword.password;
  
    const valuesWithoutPassword = { ...formik.values };
    delete valuesWithoutPassword.password;

    if (
      JSON.stringify(initialValuesWithoutPassword) !== JSON.stringify(valuesWithoutPassword)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik.values]);

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.message);
    handleEditAdminClose();
    handleSuccessMessageShow();
    formik?.resetForm();
  };

  const onError = (data) => {
    console.log(data);
    setLoading(false);
    setAdminTable(false);
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
  };

  const [resetPasswordshow, setResetPasswordShow] = useState(false);
  const handleResetPasswordClose = () => setResetPasswordShow(false);
  const handleResetPasswordShow = () => {
    setResetPasswordShow(true);
    setOpenMenu(2);
  };

  const menuOptions = [];

  if (type === "manageAdminList") {
    menuOptions?.push(
      {
        title: "Block Admin Account",
        reason: true,
        modalTitle: "Are you sure you want to block this Admin?",
        password: true,
        type: "block_admin",
        successMessage: "Admin account has been blocked!",
      },
      {
        title: "Delete Admin Account",
        reason: true,
        modalTitle: "Are you sure you want to delete this Admin?",
        password: true,
        type: "delete_admin",
        successMessage: "Admin account has been deleted!",
      }
    );
  }

  if (type === "blockedAdminList" && action === "edit") {
    menuOptions?.push(
      {
        title: "Block Details",
        reason: false,
        modalTitle: "Block details",
        password: false,
        type: "block_details",
      },
      {
        title: "Unblock Admin",
        reason: false,
        modalTitle: "Are you sure you want to Unblock this Admin?",
        password: true,
        type: "unblock_admin",
        successMessage: "Admin account has been unblocked!",
      }
    );
  }

  if (type === "blockedAdminList" && action === "view") {
    menuOptions?.push({
      title: "View Block Details",
      reason: false,
      modalTitle: "Block details",
      password: false,
      type: "block_details",
    });
  }

  if (type === "deleteAdminList") {
    menuOptions?.push({
      title: "View Delete Details",
      reason: false,
      modalTitle: "Delete details",
      type: "delete_details",
      password: false,
    });
  }

  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const handleDetailsModalClose = () => setDetailsModalShow(false);
  const handleDetailsModalShow = () => setDetailsModalShow(true);
  console.log(canWrite(permission));
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setOpenMenu,
  });

  console.log(user, "jbakjasd");
  return (
    <>
      <ViewPermissionsModal
        permissionShow={permissionShow}
        handlePermissionClose={handlePermissionClose}
        formik={formik}
        action={action}
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Admin Created Successfully!`}
      />
      <DetailsModal
        detailsModalShow={detailsModalShow}
        handleDetailsModalClose={handleDetailsModalClose}
        user={user}
        passwordObject={passwordObject}
      />
      <ResetPasswordModal
        resetPasswordshow={resetPasswordshow}
        handleResetPasswordClose={handleResetPasswordClose}
        formik={formik}
        action={action}
        admin_id={user?.id}
      />
      <AdminPasswordModal
        passwordShow={passwordShow}
        handlePasswordClose={handlePasswordClose}
        handleEditAdminClose={handleEditAdminClose}
        adminTable={adminTable}
        setAdminTable={setAdminTable}
        user={user}
        passwordObject={passwordObject}
        formik={formik}
        setError={setErrorMessage}
      />

      <Modal
        centered
        show={editAdminshow}
        onHide={handleEditAdminClose}
        dialogClassName="add_new_admin_container"
        contentClassName="border_radius_15px"
        backdropClassName="edit_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center mx-auto fs_22 primary_color fw_500">
              {action === "create"
                ? "Add New Admin"
                : `Admin ID : ${user?.admin_id}`}
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="border_none background_none"
                onClick={() => {
                  handleEditAdminClose();
                  setOpenMenu(null);
                }}
                type="button"
              >
                <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
              </button>
            </div>
          </div>

          {action === "create" ? (
            <></>
          ) : (
            <div className="d-flex justify-content-end align-items-center">
              <div className=" mt-2  me-2 cursor_pointer ">
                {openMenu === 0 && (
                  <div
                    className="admin_details_card block_details_container"
                    ref={insideClickRef}
                  >
                    <AdminDetails user={user} />
                  </div>
                )}

                <span
                  className="admin_details_text"
                  onClick={() => {
                    handleMenuClick(0);
                  }}
                  ref={onClickRef}
                >
                  Details
                </span>
              </div>
              {action === "view" && type === "manageAdminList" ? (
                <></>
              ) : (
                <div className="d-flex justify-content-end mt-2  me-2 cursor_pointer">
                  {openMenu === 1 ? (
                    <div className="menu_list_container " ref={insideClickRef}>
                      <ul className="menu_list p-3 mb-0 primary_color fs_14 fw_600">
                        {menuOptions?.map((item, index) => {
                          return (
                            <React.Fragment key={item?.title}>
                              <li
                                className="pb-1"
                                onClick={() => {
                                  item?.password
                                    ? handlePasswordShow()
                                    : handleDetailsModalShow();
                                  setPasswordObject(item);
                                }}
                              >
                                {item?.title}
                              </li>
                              {index === menuOptions?.length - 1 ? (
                                <></>
                              ) : (
                                <hr className="m-0" />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                  <div>
                    {user?.admin_type === "super_admin" ? null : (
                      <i
                        className="ri-more-2-fill fs_20 fw_700"
                        onClick={() => {
                          handleMenuClick(1);
                        }}
                        ref={onClickRef}
                      ></i>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className=" d-flex justify-content-center px-sm-3">
            <div className="col-12 px-sm-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-3">
                  <span className="primary_color fs_18 fw_500">
                    Account details
                  </span>
                </div>
                <hr className="heading_line mt-0 mb-2" />
                <div className="d-lg-flex justify-content-center px-3">
                  <div className="col-lg-11 col-12">
                    <div className="d-sm-flex justify-content-between mt-3 ">
                      <div className="col-sm-6 ">
                        <MuiField
                          label={"First Name*"}
                          itemName={"firstName"}
                          itemValue={formik.values.firstName}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.firstName}
                          formikTouched={formik.touched.firstName}
                          disabled={action === "view"}
                        />
                      </div>
                      <div className="col-sm-6 pt-2 pt-sm-0">
                        <MuiField
                          label={"LastName*"}
                          itemName={"lastName"}
                          itemValue={formik.values.lastName}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.lastName}
                          formikTouched={formik.touched.lastName}
                          disabled={action === "view"}
                        />
                      </div>
                    </div>
                    <div className="d-sm-flex justify-content-between mt-3 ">
                      <div className="col-sm-6 pt-3 pt-sm-0">
                        <MuiField
                          label={"UserName*"}
                          itemName={"userName"}
                          itemValue={formik.values.userName}
                          onChangeFn={(e) => {
                            formik.handleChange(e);
                          }}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.userName}
                          formikTouched={formik.touched.userName}
                          error={errorMessage}
                          disabled={action === "view"}
                        />
                      </div>
                      <div className="col-sm-6 pt-2 pt-sm-0">
                        <MuiField
                          label={"Email Adress*"}
                          itemName={"emailAdress"}
                          itemValue={formik.values.emailAdress}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.emailAdress}
                          formikTouched={formik.touched.emailAdress}
                          disabled={action === "view"}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="col-sm-6">
                        <MuiField
                          label={"Phone Number*"}
                          itemName={"phoneNumber"}
                          itemValue={formik.values.phoneNumber}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.phoneNumber}
                          formikTouched={formik.touched.phoneNumber}
                          disabled={action === "view"}
                        />
                      </div>
                    </div>
                    {action === "view" ? (
                      <></>
                    ) : (
                      <div className="mt-3">
                        <span className="passwordtext fs_14 fw_500 primary_color py-2 px-1">
                          Password*
                        </span>
                        <span className="">
                          <span className={`w_96 text-nowrap px-3`}>
                            <span className="red_color password_error_text pt-1">
                              {formik.errors.password &&
                                formik.touched.password && (
                                  <span className="fs_14 pe-2">
                                    {formik.errors.password}
                                  </span>
                                )}
                            </span>
                            <button
                              className=" border_none primary_bg white_color px-3 py-2 text-center fs_14 border_radius"
                              onClick={() => {
                                handleResetPasswordShow();
                                handleMenuClick(2);
                              }}
                              type="button"
                            >
                              {action === "create" &&
                              formik?.values?.password === ""
                                ? "Create Password"
                                : "Reset Password"}
                            </button>
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="">
                    <span className="primary_color fs_18 fw_500">
                      Job details
                    </span>
                  </div>
                  <hr className="heading_line mt-0 mb-2" />
                </div>
                <div className=" d-lg-flex justify-content-center px-3">
                  <div className="col-lg-11 col-12">
                    <div className="d-sm-flex justify-content-between mt-3 ">
                      <div className="col-sm-6">
                        <MuiField
                          label={"Job Title*"}
                          itemName={"jobTitle"}
                          itemValue={formik.values.jobTitle}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.jobTitle}
                          formikTouched={formik.touched.jobTitle}
                          disabled={action === "view"}
                        />
                      </div>
                      <div className="col-sm-6 pt-2 pt-sm-0">
                        <TextField
                          size="small"
                          style={{ width: "96%" }}
                          sx={EditAdminStyles.select}
                          variant="outlined"
                          name="team"
                          select
                          label="Team*"
                          value={formik.values.team}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.team && Boolean(formik.errors.team)
                          }
                          helperText={formik.touched.team && formik.errors.team}
                          disabled={action === "view"}
                        >
                          {teams.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3 ">
                      <div className="col-sm-6 col-12  d-flex flex-column">
                        <div className="user_role_container">
                          <TextField
                            size="small"
                            style={{ width: "96%" }}
                            sx={EditAdminStyles.select}
                            variant="outlined"
                            name="officeLocation"
                            // id="officeLocation"
                            select
                            label="Office Location*"
                            value={formik.values.officeLocation}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.officeLocation &&
                              Boolean(formik.errors.officeLocation)
                            }
                            helperText={
                              formik.touched.officeLocation &&
                              formik.errors.officeLocation
                            }
                            disabled={action === "view"}
                          >
                            {officeLocations?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <TextField
                        size="large"
                        style={{ width: "100%" }}
                        sx={EditAdminStyles.select}
                        // id="jobTitleSummary"
                        name="jobTitleSummary"
                        label="Job Title Summary*"
                        type="text"
                        onBlur={formik.handleBlur}
                        value={formik.values.jobTitleSummary}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.jobTitleSummary &&
                          Boolean(formik.errors.jobTitleSummary)
                        }
                        helperText={
                          formik.touched.jobTitleSummary &&
                          formik.errors.jobTitleSummary
                        }
                        multiline
                        rows={3}
                        disabled={action === "view"}
                      />
                    </div>
                    <div className="mt-3">
                      <span className="passwordtext fs_14 fw_500 primary_color py-2 px-1">
                        Admin Panel Permissions*
                      </span>
                      <span className="">
                        <span className={`w_96 text-nowrap px-3`}>
                          <button
                            className=" border_none primary_bg white_color px-3 py-2 text-center fs_14 border_radius"
                            type="button"
                            onClick={() => {
                              handlePermissionShow();
                            }}
                          >
                            View Permissions
                          </button>
                        </span>
                      </span>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <span className="red_color fw_500">{errorMessage}</span>
                    </div>
                    {type === "deleteAdminList" ? (
                      <></>
                    ) : (
                      <div className="d-flex justify-content-sm-end me-2 mt-3">
                        {action === "view" ? (
                          <>
                            {canWrite(permission) && (
                              <>
                                {user?.admin_type === "super_admin" &&
                                adminType !== "super_admin" ? null : (
                                  <button
                                    className="me-3 primary_bg white_color border_none px-5 border_radius_5px  fw_400 py-1 d-flex align-items-center"
                                    onClick={() => {
                                      setAction("edit");
                                    }}
                                    type="button"
                                  >
                                    Edit
                                  </button>
                                )}{" "}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Resetbtn
                              onResetFn={() => {
                                formik?.resetForm();
                                setErrorMessage(false);
                              }}
                            />

                            <Savebtn
                              disabled={disabled}
                              btnClassName={`${
                                disabled
                                  ? `disabled_color_bg white_color px-sm-5 px-3`
                                  : `light_green_bg px-5`
                              }`}
                              loader={loading}
                              // addAdminModalSaveBtn="px-3"
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminModal;
