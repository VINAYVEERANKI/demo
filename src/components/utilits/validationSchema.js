import * as Yup from "yup";
import { numRegex } from "../helper";

export const pricingModule_1Validation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perMinFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});

export const pricingModule_2Validation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  baseKm: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perMinFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});

export const onewayModule1Validation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  perExtraKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  perExtraTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  nightAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  driverAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
});

export const oneWayModule2Validation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  remainingTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  perExtraKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  perExtraTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  nightAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  driverAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
});

export const SpecialFareValidation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  parkingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perMinFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  transportHubFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  BookingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});

export const FareOneWay_1Validation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  perExtraKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  perExtraTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  nightAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  driverAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  bookingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
});

export const FareOneWay_2Validation = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  remainingTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  perExtraKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  perExtraTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  nightAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  driverAllowance: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
  bookingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .required("Enter value"),
});

export const rentalPricingValidation = Yup.object({
  PackageKm: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perExtraKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perExtraTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  bookingFee: Yup.string(),
  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});

export const rentalFareValidaiton = Yup.object({
  PackageKm: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perExtraKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perExtraTimeFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  bookingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});

export const localFaresValidation_1 = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  parkingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perMinFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  transportHubFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  BookingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});
export const localFaresValidation_2 = Yup.object({
  baseFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  baseKm: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  parkingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perKmFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  perMinFare: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  waitingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  transportHubFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
  BookingFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),

  CancellationFee: Yup.string()
    .matches(numRegex, "Invalid value")
    .trim()
    .required("Enter value"),
});

export const mainZoneValidation = Yup.object({
  zone_name: Yup.string().trim().required("Please enter zone name"),
  outstation_oneway_limit: Yup.string()
    .trim()
    .matches(numRegex, "Invalid value")
    .required("Please enter Limit"),
  zone_notes: Yup.string().trim(),
  coordinates: Yup.array().min(1, "Please draw zone"),
});

export const generateValidationSchema = (
  campaign_period,
  incentiveClassification
) => {
  return Yup.object({
    driver_default_ride_type: Yup.string(),
    campaign_period: Yup.string(),
    campaign_day: Yup.string().when('campaign_period', {
      is: 'Daily',
      then: Yup.string().required('Campaign day is required'),
      otherwise: Yup.string(),
    }),
    booking_type: Yup.object().test(
      "at-least-one-checked",
      "Please select at least one option",
      (obj) => {
        return (
          obj.local === true ||
          obj.rental === true ||
          obj.one_way_outstation === true ||
          obj.round_trip_outstation === true
        );
      }
    ),

    campaign_dates: Yup.lazy((value) => {
      if (value && value.length > 0) {
        return Yup.array().of(
          Yup.object().shape({
            start_date: Yup.date().required("!Required"),
            start_time: Yup.string(),
            expiry_date: Yup.date(),
            expiry_time: Yup.string(),
          })
        );
      } else {
        return Yup.array().notRequired();
      }
    }),
    incentive_time_slots1: generateIncentiveTimeSlotSchema(
      1,
      incentiveClassification,
      campaign_period
    ),

    incentive_time_slots2: Yup.lazy((values) =>
      values && values.slots && values.slots.length > 0
        ? generateIncentiveTimeSlotSchema(
            2,
            incentiveClassification,
            campaign_period
          )
        : Yup.mixed().notRequired()
    ),

    incentive_time_slots3: Yup.lazy((values) =>
      values && values.slots && values.slots.length > 0
        ? generateIncentiveTimeSlotSchema(
            3,
            incentiveClassification,
            campaign_period
          )
        : Yup.mixed().notRequired()
    ),
  });
};

const generateIncentiveTimeSlotSchema = (
  slotNumber,
  classification,
  campaign_period
) => {
  return Yup.object().shape({
    slots: Yup.array().of(
      Yup.object().shape({
        [classification]: Yup.number()
          .required(`Required!`)
          .integer(
            `${classification} must be an integer for slot ${slotNumber}`
          ),
        amount: Yup.number()
          .required(`Required!`)
          .positive(`Amount must be positive for slot ${slotNumber}`),
      })
    ),
    days_selected:
      campaign_period === "Daily"
        ? Yup.array().notRequired()
        : Yup.array()
            .min(1, `At least one day must be selected for slot ${slotNumber}`)
            .required(`Day selection is required for slot ${slotNumber}`),

    start_time:
      campaign_period === "Weekly"
        ? Yup.string()
        : Yup.string().required(
            `Start time is required for slot ${slotNumber}`
          ),
    expiry_time:
      campaign_period === "Weekly"
        ? Yup.string()
        : Yup.string().required(
            `Expiry time is required for slot ${slotNumber}`
          ),
  });
};
