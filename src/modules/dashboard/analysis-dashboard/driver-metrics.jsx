import React from 'react'
import InnerLayout from '../../../components/layout/innerLayout';
import AdminsProductivity from '../../../components/dashboard/analysis-dashboard/driver-metrics/admins-productivity';
import AnalysisDriverMetrics from '../../../components/dashboard/analysis-dashboard/driver-metrics/analysis-driver-metrics';
import DriverRetention from '../../../components/dashboard/analysis-dashboard/driver-metrics/driver-retention';
import DriverChurnMetrics from '../../../components/dashboard/analysis-dashboard/driver-metrics/driver-churn-metrics';

const DriverMetrics = () => {
    return (
        <InnerLayout mainHeading={"Driver Metrics"}>
            <AdminsProductivity />
            <AnalysisDriverMetrics />
            <DriverRetention />
            <DriverChurnMetrics />
        </InnerLayout>
    )
}

export default DriverMetrics