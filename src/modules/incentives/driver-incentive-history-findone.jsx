import React from 'react'
import InnerLayout from '../../components/layout/innerLayout'
import DriverIncentiveHistoryFindoneComp from '../../components/incentives/driverIncentives/driverIncentiveHistoryFindone'
import { useLocation, useParams } from 'react-router'
import DriverIncentiveHistoryFindoneView from '../../components/incentives/driverIncentives/driverIncentiveHistoryFindone'

const DriverIncentiveHistoryFindone = () => {
    const params = useParams();
    const location = useLocation();
  return (
    <div>
      {/* <InnerLayout> */}
        <DriverIncentiveHistoryFindoneView params={params?.id}/>
      {/* </InnerLayout> */}
    </div>
  )
}

export default DriverIncentiveHistoryFindone
