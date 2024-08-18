import React from 'react'
import styles from "../dashboard/dashboard.module.css"

const DashboardInnerLayout = ({ children, heading }) => {
    return (
        <div className={`my-3 ${styles.mainContainer} pb-3`}>
            <div
                className={`primary_bg text-white fs_20 px-3 py-2 ${styles.table_container}`}
            >
                {heading}
            </div>
            <div className={`mx-5 my-4`}>{children}</div>
        </div>
    )
}

export default DashboardInnerLayout