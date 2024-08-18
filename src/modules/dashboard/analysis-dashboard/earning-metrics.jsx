import React from 'react'
import InnerLayout from '../../../components/layout/innerLayout'
import DetailedEarningMetrics from '../../../components/dashboard/analysis-dashboard/earning-metrics/detailed-earning-metrics'
import DriverPayouts from '../../../components/dashboard/analysis-dashboard/earning-metrics/driver-payouts'
import DetailedPayout from '../../../components/dashboard/analysis-dashboard/earning-metrics/detailed-payout'

const EarningMetrics = () => {
    return (
        <InnerLayout mainHeading={"Earning Metrics"}>
            <DetailedEarningMetrics />
            <DriverPayouts />
            <DetailedPayout />
        </InnerLayout>
    )
}

export default EarningMetrics