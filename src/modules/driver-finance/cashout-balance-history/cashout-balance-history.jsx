import React from 'react'
import CashTransBalHistoryTable from '../../../components/driver-finance/driver-finance-main-tables/cash-transBal-history-table'
import DriverCurbalDetails from '../../../components/driver-finance/driver-finance-details/driver-curbal-details'

const CashoutBalanceHistory = () => {
  return (
    <>
      <CashTransBalHistoryTable type="cashoutBalanceHistory"/>
      {/* <DriverCurbalDetails type="cashoutBalanceHistory"/> */}
    </>
  )
}

export default CashoutBalanceHistory
