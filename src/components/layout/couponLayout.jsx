import React from "react";
import "../../modules/coupons/coupons.css";
import usePermissions from "../usePermissionChecker";

const CouponLayout = ({
  navBarList,
  children,
  couponTab = "",
  setCouponTab,
  createName,
  mainHeading = "",
  localStorageitem = "CouponTab",
  onClickFn = () => {},
  buttons = [],
  onTabChange = () => {},
  maintype,
}) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    riderBroadcast: "rider_broadcast",
    driverBroadcast: "driver_broadcast",
    driverIncentives: "driver_incentive",
    riderCoupon: "rider_coupons",
    driverCoupon: "driver_coupons",
    riderReferral: "rider_referrals",
    driverReferral:"driver_referrals"
  };
  const permission = pagePermissions[maintype];
  console.log(canWrite(permission), "dadadsdasd");
  console.log(maintype,"maintype");
  return (
    <>
      <div className="rider_coupon_container  p-3 pb-4 mx-3 my-4">
        <div className="d-flex justify-content-between">
          <span className="primary_color fw_600 fs_26 ">{mainHeading}</span>
          {buttons.map((item, i) => {
            return <React.Fragment key={i + "e"}>{item}</React.Fragment>;
          })}
        </div>

        <div className="coupons_list_container mt-4  ">
          <div className="  d-flex justify-content-between text-nowrap ms-2  overflow_x_auto coupons_heading_container">
            <div>
              {navBarList?.map((item) => {
                return (
                  <React.Fragment key={item?.value}>
                    <button
                      onClick={() => {
                        setCouponTab(item?.value);
                        localStorage.setItem(localStorageitem, item?.value);
                        onTabChange();
                      }}
                      className={
                        couponTab === item?.value
                          ? " cursor-pointer px-3 text-decoration-none background_none coupons_border_bottom  border-top-0 border-start-0 border-end-0 py-1 fw_600 primary_color"
                          : "cursor-pointer px-3 text-decoration-none fw_500  secondary_color fs_16 py-1 border_none  background_none"
                      }
                    >
                      {item?.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="me-2 mt-2">
              {couponTab === "ReviewRequired" && canWrite(permission) && (
                <button
                  className="d-flex gap-2 align-items-center tertiary_bg border_radius_5px border_none px-2 py-1 fs_16 fw_600"
                  type="button"
                  onClick={onClickFn}
                >
                  <i className="ri-add-line primary_color" />
                  {createName}
                </button>
              )}
            </div>
          </div>
          <div className="mx-2 mt-2">{children}</div>
        </div>
      </div>
    </>
  );
};

export default CouponLayout;
