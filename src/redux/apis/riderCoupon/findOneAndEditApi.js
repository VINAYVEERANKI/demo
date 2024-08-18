import { api } from "../api";
// find one

export const pendingCouponFindOneApi = (params) => {
  return api.post(
    `/api/rider/coupon/pending-review-coupon-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const activeCouponFindOneApi = (params) => {
  return api.post(
    `/api/rider/coupon/active-coupon-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectedCouponFindOneApi = (params) => {
  return api.post(
    `/api/rider/coupon/rejected-coupon-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedCouponFindOneApi = (params) => {
  return api.post(
    `/api/rider/coupon/deleted-coupon-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const expiredCouponFindOneApi = (params) => {
  return api.post(
    `/api/rider/coupon/expired-coupon-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// edit
export const generalCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-general-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const newAccountCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-newaccount-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const newAccountLifeSpanCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-newaccount-lifespan-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const paymentMethodCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-paymentmethod-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const bookingDestinationCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-bookingdestination-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const pickUpDropOffCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-pickupdropoff-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rentalPackageCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-rentalpackage-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const bookingDistanceCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-bookingdistance-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const outStationPackageCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/edit-rider-outstationpackage-coupon`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeCouponEditApi = (params) => {
  return api.post(
    `/api/rider/coupon/active-coupon-edit`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
