import React from 'react'
import OngoingBookings from '../../../components/dashboard/analysis-dashboard/booking-metrics/ongoing-bookings'
import InnerLayout from '../../../components/layout/innerLayout'
import TotalBookings from '../../../components/dashboard/analysis-dashboard/booking-metrics/total-bookings'
import TotalCompletedBookings from '../../../components/dashboard/analysis-dashboard/booking-metrics/total-completed-bookings'
import TotalCancelledBookings from '../../../components/dashboard/analysis-dashboard/booking-metrics/total-cancelled-bookings'
import DetailedCancelledBookings from '../../../components/dashboard/analysis-dashboard/booking-metrics/detailed-cancelled-bookings'
import DetailedBookings from '../../../components/dashboard/analysis-dashboard/booking-metrics/detailed-bookings'
import SelectField from '../../../components/form/selectField'

const BookingMetrics = () => {
    return (
        <InnerLayout mainHeading={"Booking Metrics"}>
            <div>
                <label>
                    Pickup Zone
                </label>
                <SelectField />
            </div>
            <OngoingBookings />
            <TotalBookings />
            <TotalCompletedBookings />
            <TotalCancelledBookings />
            <DetailedCancelledBookings />
            <DetailedBookings />
        </InnerLayout>
    )
}

export default BookingMetrics