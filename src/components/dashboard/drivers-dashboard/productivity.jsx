import React from 'react'
import styles from "../dashboard.module.css";
import DashboardInnerLayout from '../../layout/dashboardInnerLayout';

const Productivity = () => {
    return (
        <DashboardInnerLayout heading={"Productivity"}>
            <div className="my-2 d-flex align-items-center gap-4">
                <h6 className={`primary_color`}>
                    Date Range
                </h6>
                <input type="date" className={`rounded-2 p-2 input_border w-100 ${styles.dateInput}`} />
                <input type="date" className={`rounded-2 p-2 input_border w-100 ${styles.dateInput}`} />
            </div>
            <div className={`my-5 row g-0 gap-5`}>
                {productivityArray?.map((item, index) =>
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
    )
}

export default Productivity

const productivityArray = [
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