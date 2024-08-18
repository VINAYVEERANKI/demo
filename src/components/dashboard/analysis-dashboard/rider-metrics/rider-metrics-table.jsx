import React from 'react'
import DashboardInnerLayout from '../../../layout/dashboardInnerLayout'

const RiderMetricsTable = () => {
  return (
    <DashboardInnerLayout heading={"Rider Metrics"}>
      <div>
        <h6 className={`primary_color`}>
          Data Range
        </h6>
      </div>
    </DashboardInnerLayout>
  )
}

export default RiderMetricsTable