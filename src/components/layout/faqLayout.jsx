import React, { useState } from "react";
import "./layout.css";
import AddFaqModal from "../FAQs/faqs-modal/AddFaq";
import AddTopicModal from "../FAQs/faqs-modal/faqAddTopicModal";
import RiderNse from "../../modules/nse/riderNse";
import usePermissions from "../usePermissionChecker";

const FaqLayout = ({
  children,
  topNavbarList,
  faqTab,
  setFaqTab,
  sideNavbarList,
  faqSidebarTab,
  setFaqSidebarTab,
  type,
  reload,
  setReload,
  faqType,
}) => {
  const mainTab =
    type === "riderFaq"
      ? "riderFaqMainTab"
      : type === "riderNse"
        ? "riderNseMainTab"
        : type === "driverNse"
          ? "driverNseMainTab"
          : "driverFaqMainTab";
  console.log(type, "type");
  console.log(mainTab);
  const sideBarTab =
    type === "riderFaq"
      ? "riderFaqSidebarTab"
      : type === "driverFaq"
        ? "driverFaqSidebarTab"
        : type === "riderNse"
          ? "riderNseSidebarTab"
          : type === "driverNse"
            ? "driverNseSidebarTab"
            : "";


  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    driverFaq: "rider_faq",
    riderFaq: "driver_faq",
  };

  const permission = pagePermissions[type];

  console.log(type, "type");

  const [addFaqShow, setAddFaqShow] = useState(false);
  const handleAddFaqClose = () => setAddFaqShow(false);
  const handleAddFaqShow = () => setAddFaqShow(true);

  const [addFaqtopic, setAddFaqTopic] = useState(false);
  const handleAddFaqTopicClose = () => setAddFaqTopic(false);
  const handleAddFaqTopicShow = () => setAddFaqTopic(true);
  const [action, setAction] = useState("");

  console.log(action, "kkasas");

  return (
    <>
      <AddFaqModal
        addFaqShow={addFaqShow}
        handleAddFaqClose={handleAddFaqClose}
        type={type}
        faqTab={faqTab}
        faqSidebarTab={faqSidebarTab}
        action={action}
        setReload={setReload}
        reload={reload}
      />
      <AddTopicModal
        addFaqtopic={addFaqtopic}
        handleAddFaqTopicClose={handleAddFaqTopicClose}
        type={type}
        faqTab={faqTab}
        faqSidebarTab={faqSidebarTab}
        action={action}
        setReload={setReload}
        reload={reload}
      />
      <div className="tab-container text-nowrap mt-5">
        {topNavbarList?.map((item, index) => (
          <React.Fragment key={item.label}>
            <button
              onClick={() => {
                setFaqTab(item?.value);
                localStorage.removeItem(sideBarTab);
                localStorage.setItem(mainTab, item?.value);
              }}
              className={`mx-3 faq_btn py-1 ${faqTab === item?.value
                ? "primary_bg white_color faq_top_active_btn"
                : `background_none secondary_color ${topNavbarList?.length - 1 === index
                  ? "border-end-0"
                  : "faq_top_inactive_btn"
                }  border-top-0 border-start-0 border-bottom-0`
                }  fw_500 `}
            >
              {item?.label}
            </button>
          </React.Fragment>
        ))}
              </div>

        <div className="faq_container mx-sm-3 pt-4">

          {

            canWrite(permission) && type != "riderNse" && type !== "driverNse" && (
              <div className={`d-sm-flex justify-content-sm-end gap-4 me-sm-3 `}>
                <button
                  className="tertiary_bg border_none fw_500 border_radius px-sm-3 py-sm-1 ms-sm-0 ms-4 mb-3 mb-sm-0"
                  onClick={() => {
                    setAction("Faq");
                    handleAddFaqShow();
                  }}
                >
                  <span className="fs_20">+</span> Add New FAQ
                </button>
                <button
                  className="tertiary_bg border_none fw_500 border_radius px-sm-3 py-sm-1 ms-sm-0 ms-4"
                  onClick={() => {
                    setAction("Topic");
                    handleAddFaqTopicShow();
                  }}
                >
                  <span className="fs_20">+</span> Add New Topic
                </button>
              </div>
            )}
          <div className="row gx-0 pe-3">
            {/* {type === "riderNse" || type === "driverNse" ? ( */}
            <>
              <div
                className={
                  type === "riderNse" || type === "driverNse"
                    ? "col-md-3 pt-3 table-border"
                    : "col-md-3 pt-3"
                }
              >
                <div className="faq_sidebar_list pt-4">
                  {sideNavbarList?.map((item) => (
                    <div className="" key={item?.value}>
                      {item?.is_sidebar_heading && (
                        <div className="fs_14 fw_500 secondary_color  sidebarSubHeading pb-1 pt-3 ms-3">
                          {item?.sideBarHeading}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setFaqSidebarTab(item?.value);
                          localStorage.setItem(sideBarTab, item?.value);
                        }}
                        className={`${faqSidebarTab === item?.value
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
            {/* ) : (
              <>
                <div className="col-3 pt-3">
                  {sideNavbarList?.map((item) => (
                    <div className="" key={item?.value}>
                      {item?.is_sidebar_heading && (
                        <div className="fs_14 fw_500 secondary_color  sidebarSubHeading pb-1 pt-3 ms-3">
                          {item?.sideBarHeading}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setFaqSidebarTab(item?.value);
                          localStorage.setItem(sideBarTab, item?.value);
                        }}
                        className={`${
                          faqSidebarTab === item?.value
                            ? "faq_sidebar_active_btn border-top-0 border-end-0 border-bottom-0"
                            : "border_none background_none"
                        } faq_sidebar_btn text-start primary_color fw_600 ps-3 py-2 fs_15`}
                      >
                        {item?.label}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )} */}

            <div className="col-md-9">{children}</div>
          </div>
        </div>
    </>
  );
};

export default FaqLayout;







