import React from 'react'
import DashboardInnerLayout from '../../../layout/dashboardInnerLayout'

const RiderChurnMetrics = () => {
    return (
        <DashboardInnerLayout heading={"Rider Churn Metrics"}>
            <div>
                <h6 className={`primary_color`}>
                    Data Range
                </h6>
            </div>
        </DashboardInnerLayout>
    )
}

export default RiderChurnMetrics