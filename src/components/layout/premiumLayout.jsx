import React, { useState } from "react";
import "../premiums/premium.css";
import PremiumMainSection from "../premiums/premium-billing-details/premium-types";
import PremiumTypes from "../premiums/premium-billing-details/premium-types";
const PremiumLayout = ({
  children,
  sideNavbarList,
  premiumSidebarTab,
  setPremiumSidebarTab,
  type,
}) => {
  console.log(localStorage.getItem("premiumSideBarTab"), "aslkkdald");
  console.log(premiumSidebarTab, "aslkkdald");
  return (
    <>
      <div>
        <hr className="primarydarkhr_color" />
      </div>
      <div className="row gx-0 pe-3 mt-3">
        <>
          <div className="col-lg-2 col-12 mt-5">
            <div className="faq_sidebar_list">
              {sideNavbarList?.map((item) => (
                <div className="" key={item?.value}>
                  {item?.is_sidebar_heading && (
                    <div className="fs_14 fw_500 secondary_color  sidebarSubHeading pb-1 pt-3 ms-3">
                      {item?.sideBarHeading}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setPremiumSidebarTab(item?.value);
                      localStorage.setItem(
                        type === "driverPremium"
                          ? "defaultPremiumSidebarTab"
                          : type === "managepremium"
                          ? "premiumSideBarTab"
                          : type === "archivedpremium"
                          ? "ArcpremiumSideBarTab"
                          : "",
                        item?.value
                      );
                    }}
                    className={`${
                      premiumSidebarTab === item?.value
                        ? "faq_sidebar_active_btn border-top-0 border-end-0 border-bottom-0"
                        : "border_none background_none"
                    } faq_sidebar_btn text-start primary_color fw_600 ps-3 py-2 fs_15`}
                  >
                    {item?.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
        <div className="col-lg-10 col-12">{children}</div>
      </div>
    </>
  );
};

export default PremiumLayout;
