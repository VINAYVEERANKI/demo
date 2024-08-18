import React from 'react'
import InnerLayout from '../../../components/layout/innerLayout'
import RiderMetricsTable from '../../../components/dashboard/analysis-dashboard/rider-metrics/rider-metrics-table'
import RiderRetention from '../../../components/dashboard/analysis-dashboard/rider-metrics/rider-retention'
import RiderChurnMetrics from '../../../components/dashboard/analysis-dashboard/rider-metrics/rider-churn-metrics'

const RiderMetrics = () => {
    return (
        <InnerLayout mainHeading="RiderMetrics">
            <RiderMetricsTable />
            <RiderRetention />
            <RiderChurnMetrics />
        </InnerLayout>
    )
}

export default RiderMetrics