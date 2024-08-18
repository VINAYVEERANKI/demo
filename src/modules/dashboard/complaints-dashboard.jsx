import React from 'react'
import InnerLayout from '../../components/layout/innerLayout';
import MessageIcon from '../../assets/icons/messageIcon.jsx';
import styles from "./dashboard.module.css"
import AdminsProductivityComplaints from '../../components/dashboard/complaints-dashboard/admins-productivity-complaints.jsx';
import ComplaintsMetric from '../../components/dashboard/complaints-dashboard/complaints-metric.jsx';

const ComplaintsDashboard = () => {
    return (
        <InnerLayout mainHeading='Complaints Dashboard' buttons={buttonList}>
            <AdminsProductivityComplaints />
            <ComplaintsMetric />
        </InnerLayout>
    )
}

export default ComplaintsDashboard

const buttonList = [
    <>
        <button
            className={`bg_FF0000B5 border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3`}
            type="button"
        // onClick={() => {
        //   handleFetchDropDownList();
        // }}
        >
            <span className={`fw_600 text-white`}>SOS Emergency</span>
        </button>

    </>,

    <>
        <button type='button' className={`text-nowrap d-flex align-items-center bg-white rounded-5 position-relative py-1 justify-content-center ${styles.messageIconButton}`}>
            <MessageIcon className={` ${styles.messageIcon}`} />
            <div className={`position-absolute text-white rounded-5 px-1 fs_14 ${styles.messagesNumber}`}>{"9+"}</div>
        </button>
    </>
];