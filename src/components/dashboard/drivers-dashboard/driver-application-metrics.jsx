import React from "react";
import styles from "../dashboard.module.css";
import DashboardInnerLayout from "../../layout/dashboardInnerLayout";
const DriverApplicationMetrics = () => {
    const applicationMetricsArray = [
        {
            heading: "Expired/ Expiring Documents",
            blueBg: true,
            premiums: [
                {
                    name: "Premium1",
                    value: "5"
                },
                {
                    name: "Premium2",
                    value: "3"
                },
                {
                    name: "Premium3",
                    value: "8"
                },
            ]
        },
        {
            heading: "Pending Reapproval",
            blueBg: false,
            premiums: [
                {
                    name: "Premium1",
                    value: "5"
                },
                {
                    name: "Premium2",
                    value: "12"
                },
                {
                    name: "Premium3",
                    value: "12"
                },
            ]
        },
        {
            heading: "Pending New Application",
            blueBg: false,
            premiums: [
                {
                    name: "Premium1",
                    value: "5"
                },
                {
                    name: "Premium2",
                    value: "8"
                },
                {
                    name: "Premium3",
                    value: "23"
                },
            ]
        },
        {
            heading: "Unassigned New Driver Applications",
            blueBg: false,
            premiums: [
                {
                    name: "Premium1",
                    value: "5"
                },
                {
                    name: "Premium2",
                    value: "8"
                },
                {
                    name: "Premium3",
                    value: "23"
                },
            ]
        },
        {
            heading: "Unassigned Re-Approval Applications",
            blueBg: false,
            premiums: [
                {
                    name: "Premium1",
                    value: "5"
                },
                {
                    name: "Premium2",
                    value: "8"
                },
                {
                    name: "Premium3",
                    value: "23"
                },
            ]
        },
    ]
    return (
        <DashboardInnerLayout heading={"Driver Application Metrics"}>
            <div className="my-2">
                <h6 className={`primary_color`}>
                    Date
                </h6>
                <input type="date" className={`rounded-2 p-2 input_border w-100 ${styles.dateInput}`} />
            </div>
            <div className={`my-5 row g-0 gap-5`}>
                {applicationMetricsArray?.map((item, index) =>
                    <span className={`${styles.metricsBlocks}`}>
                        <h6 className={`primary_color`}>
                            {item?.heading}
                        </h6>
                        <div className={`${item?.blueBg ? styles.premiumBlueContainer : styles.premiumContainer} d-flex gap-4 rounded-3 p-4`}>
                            {item?.premiums?.map((premiumsData) =>
                                <div className={`primary_color`}>
                                    {premiumsData?.name}
                                    <div className="text-center fs_24 mt-3">
                                        {premiumsData?.value}
                                    </div>
                                </div>)}
                        </div>
                    </span>
                )}
            </div>
        </DashboardInnerLayout>
    );
};

export default DriverApplicationMetrics;
