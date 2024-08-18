import React, { useRef, useState } from "react";
import { CharacterHidder, statusColor } from "../helper";
import moment from "moment";
import driverImage from "../../assets/images/profileimage.png";
import RiderPasswordModal from "./passwordModal";
import ErrorMessagemodal from "../modals/errorMessageModal";
import DetailsModal from "../modals/detailsModal";
import CheckBox from "../../assets/icons/green-checkbox-icon.svg";
import usePermissions from "../usePermissionChecker";
import useDisplayToggle from "../useDisplayToggle";

const RiderSidebar = ({
  riderSidebarData,
  type = "",
  riderTable,
  setRiderTable,
}) => {
  const { canRead, canWrite } = usePermissions();
  const [menuShow, setMenuShow] = useState(false);
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);

  console.log(type, "lkfalas");

  const sideBarData = [
    {
      title: "First Name",
      value: riderSidebarData?.first_name ?? "--",
      display: true,
    },
    {
      title: "Last Name",
      value: riderSidebarData?.last_name ?? "--",
      display: true,
    },
    {
      title: "Blocked Count",
      value: riderSidebarData?.blocked_count ?? "--",
      display: true,
    },
    {
      title: "Referral Code",
      value: riderSidebarData?.referral_code
        ? riderSidebarData?.referral_code
        : "--",
      display: true,
    },
    {
      title: "Current Balance",
      value: riderSidebarData?.current_balance
        ? "₹" + parseFloat(riderSidebarData?.current_balance).toFixed(2)
        : "--",
      display: true,
    },
    {
      title: "Phone Number",
      value: riderSidebarData?.phone_number
        ? CharacterHidder(riderSidebarData?.phone_number)
        : "--",
      is_verified: riderSidebarData?.is_number_verified
        ? riderSidebarData?.is_number_verified
        : false,
      display: type !== "permanentlyDeletedRiders" ? true : false,
    },
    {
      title: "Email ID:",
      value: riderSidebarData?.email
        ? CharacterHidder(riderSidebarData?.email, "email")
        : "--",
      is_verified: riderSidebarData?.is_email_verified
        ? riderSidebarData?.is_email_verified
        : false,
        display: type !== "permanentlyDeletedRiders" ? true : false,
    },
    {
      title: "Created At:",
      value: riderSidebarData?.createdAt
        ? moment(riderSidebarData?.createdAt).format("D MMM, YYYY")
        : "--",
      display: true,
    },
    // {
    //   title: "Created By:",
    //   value: riderSidebarData?.createdBy?.user_name
    //     ? riderSidebarData?.createdBy?.user_name
    //     : "--",
    // },
  ];

  if (type === "deletedRiders") {
    sideBarData?.push(
      {
        title: "Deleted At:",
        value: riderSidebarData?.deleted_at
          ? moment(riderSidebarData?.deleted_at).format("D MMM, YYYY")
          : "--",
        display: true,
      },
      {
        title: "Deleted By:",
        value: riderSidebarData?.deletedBy?.user_name
          ? riderSidebarData?.deletedBy?.user_name
          : "--",
        display: true,
      }
    );
  }

  const [passwordShow, setPasswordShow] = useState(false);
  const handlePasswordClose = () => setPasswordShow(false);
  const handlePasswordShow = () => setPasswordShow(true);
  const [passwordObject, setPasswordObject] = useState({});

  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const handleDetailsModalClose = () => setDetailsModalShow(false);
  const handleDetailsModalShow = () => setDetailsModalShow(true);
  const menuOptions = [];
  console.log(canWrite("deleted_riders"));
  if (type === "manageRiders") {
    canWrite("manage_riders") &&
      menuOptions.push(
        {
          title: "Reset Rating",
          modalTitle: "Are you sure you want to reset Rating?",
          password: true,
          reason: false,
          disabled: riderSidebarData?.ratings < 5 ? false : true,
          type: "reset_rating",
          successMessage: "Rating has been reset successfully!",
          details: false,
        },
        {
          title: "Reset Profile Picture",
          modalTitle: "Are you sure you want to reset Profile Picture?",
          password: true,
          reason: false,
          disabled: riderSidebarData?.isProfileRemoved ? true : false,
          type: "reset_profile_picture",
          successMessage: "Profile Picture has been reset successfully!",
          details: false,
        },
        {
          title: "Activate Account",
          modalTitle: "Are you sure you want to Activate this Account?",
          password: true,
          reason: false,
          disabled: riderSidebarData?.rider_status,
          type: "activate_account",
          successMessage: "Profile  has been Activated!",
          details: false,
        },
        {
          title: "Block Rider",
          modalTitle: "Are you sure you want to block this profile?",
          password: true,
          reason: true,
          disabled: false,
          type: "block_rider",
          successMessage: "Profile has been blocked!",
          details: false,
        },
        {
          title: "Delete Account",
          modalTitle: "Are you sure you want to delete this profile?",
          password: riderSidebarData?.current_balance >= 0 ? true : false,
          reason: true,
          disabled: false,
          type: "delete_account",
          successMessage: "Profile has been deleted successfully!",
          details: false,
        }
      );
  } else if (type === "blockedRiders") {
    if (canWrite("blocked_riders")) {
      menuOptions?.push({
        title: "Unblock Rider",
        modalTitle: "Are you sure you want to unblock Rider?",
        password: true,
        reason: false,
        disabled: false,
        type: "unblock_rider",
        successMessage: "Profile has been unblocked successfully!",
        details: false,
      });
    }

    menuOptions?.push({
      title: "View Block Details",
      modalTitle: "Block details",
      password: false,
      disabled: false,
      type: "rider_block_details",
      details: true,
    });
  }

  if (type === "deletedRiders") {
    menuOptions?.push({
      title: "View Delete Details",
      modalTitle: "Deleted details",
      password: false,
      disabled: false,
      type: "delete_details",
      details: true,
    });
    if (canWrite("deleted_riders")) {
      menuOptions?.push(
        {
          title: "Restore Account",
          modalTitle: "Are you sure you want to restore account?",
          password: true,
          reason: false,
          disabled: false,
          type: "restore_account",
          successMessage: "Account restored successfully!",
          details: false,
        },
        {
          title: "Delete Account Permanently",
          modalTitle: "Are you sure you want to delete account permanently?",
          password: true,
          reason: false,
          disabled: false,
          type: "delete_account_permanently",
          successMessage: "Account deleted permanently!",
          details: false,
        }
      );
    }
  }

  if (type === "permanentlyDeletedRiders") {
    menuOptions?.push({
      title: "View Delete Details",
      modalTitle: "Deleted details",
      password: false,
      disabled: false,
      type: "delete_details",
      details: true,
    });
  }
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setMenuShow,
  });
  return (
    <>
      <RiderPasswordModal
        passwordShow={passwordShow}
        handlePasswordClose={handlePasswordClose}
        riderTable={riderTable}
        setRiderTable={setRiderTable}
        passwordObject={passwordObject}
        id={riderSidebarData?.id}
      />
      <DetailsModal
        detailsModalShow={detailsModalShow}
        handleDetailsModalClose={handleDetailsModalClose}
        user={riderSidebarData}
        passwordObject={passwordObject}
      />
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title="Rider account cannot be deleted"
        is_description={true}
        description="This rider account cannot be deleted as it has an existing negative Current Balance."
        descriptionTextColor="spanish_gray_color"
        contentDiv={
          <>
            <span className="spanish_gray_color">
              Current Balance(₹):
              <span
                className={`${statusColor(
                  riderSidebarData?.current_balance
                )} fw_600`}
              >
                {riderSidebarData?.current_balance
                  ? parseFloat(riderSidebarData?.current_balance).toFixed(1)
                  : "--"}
              </span>
            </span>
          </>
        }
      />
      <div className="d-flex justify-content-between position-relative profile_pic_container">
        <div className="ps-3 pt-1">
          <img
            src={
              /^https?:\/\//i.test(riderSidebarData?.profile_pic)
                ? riderSidebarData.profile_pic
                : driverImage
            }
            width={120}
            height={120}
            className="rider_image"
            alt="profile pic"
          />
        </div>

        <div className="d-flex align-items-center rider_rating ">
          <i className="ri-star-s-fill ps-2"></i>
          <span className="pe-2">
            {riderSidebarData?.ratings
              ? parseFloat(riderSidebarData?.ratings).toFixed(1)
              : "--"}
          </span>
        </div>
        <div
          className="d-flex justify-content-end mt-2  me-2 cursor_pointer"
          ref={insideClickRef}
        >
          {menuShow ? (
            <div className="riders_list_container ">
              <ul className="menu_list p-3 mb-0 primary_color fs_14 fw_600 text-center">
                {menuOptions?.map((item, index) => {
                  return (
                    <React.Fragment key={item?.modalTitle}>
                      <li className="pt-1 cursor_pointer">
                        <button
                          onClick={() => {
                            item?.password
                              ? handlePasswordShow()
                              : item?.details === true
                              ? handleDetailsModalShow()
                              : handleErrorMessageShow();
                            setPasswordObject(item);
                          }}
                          disabled={item?.disabled}
                          className={`background_none border_none ${
                            item?.disabled === true
                              ? "disabled_color"
                              : "primary_color"
                          }  fs_14 fw_600 cursor_pointer`}
                        >
                          {item?.title}
                        </button>
                      </li>
                      {menuOptions?.length - 1 === index ? (
                        <></>
                      ) : (
                        <hr className="list_underline m-1" />
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {menuOptions?.length > 0 && (
            <i
              className="ri-more-2-fill fs_20 fw_700 grey_color_bg border_radius_3px p-1 height_2_5"
              onClick={() => {
                setMenuShow(!menuShow);
              }}
              ref={onClickRef}
            ></i>
          )}
        </div>
      </div>
      <div className="p-2 pt-3">
        <table className="fs_14 fw_500">
          <tbody>
            {sideBarData
              ?.filter((data) => data?.display)
              ?.map((item) => {
                return (
                  <React.Fragment key={item?.title}>
                    <tr className={``}>
                      <td
                        className={`secondary_color pe-sm-5 pe-2 ${
                          item?.title === "Created At:" ? "pt-5" : "pt-1"
                        } `}
                      >
                        {item?.title}
                      </td>
                      <td
                        className={` text-nowrap  ${
                          item?.title === "Current Balance"
                            ? riderSidebarData?.current_balance &&
                              statusColor(riderSidebarData?.current_balance)
                            : "primary_color"
                        }  fw_600  ${
                          item?.title === "Created At:" ? "pt-5" : "pt-1"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                        valign="top"
                      >
                        {item?.value}
                        {item?.is_verified && (
                          <span className="ms-1">
                            <img
                              src={CheckBox}
                              className="green_checkbox_icon"
                              alt="icon"
                            />
                            <span className="fs_12 align-items-center green_color ps-1 fw_500">
                              Verified
                            </span>
                          </span>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RiderSidebar;
