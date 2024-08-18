import React from 'react'
import InnerLayout from '../../components/layout/innerLayout'
import DriverApplicationMetrics from '../../components/dashboard/drivers-dashboard/driver-application-metrics'
import Productivity from '../../components/dashboard/drivers-dashboard/productivity'
import AdminProductivity from '../../components/dashboard/drivers-dashboard/admin-productivity'

const DriversDashboard = () => {
    return (
        <div>
            <InnerLayout mainHeading='Drivers Dashboard'>
                <DriverApplicationMetrics />
                <Productivity />
                <AdminProductivity />
            </InnerLayout>
        </div>
    )
}

export default DriversDashboard