import { api } from "../api";

// zone list
export const mainZoneListApi = (params) => {
  return api.post(
    "/api/rider/coupon/manage-zones-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const localZoneListApi = (params) => {
  return api.post(
    "/api/rider/coupon/local-zones-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const specialZoneListApi = (params) => {
  return api.post(
    "/api/rider/coupon/special-zones-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const outstationZoneListApi = (params) => {
  return api.post(
    "/api/rider/coupon/outstation-zones-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// zone list ends

export const createGeneralApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-general-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const createNewAccountApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-newaccount-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const createNewAccountLifeSpanApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-newaccount-lifespan-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createPaymentMethodApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-paymentmethod-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const createBookingDestinationApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-bookingdestination-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const createPickupDropoffApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-pickupdropoff-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createRentalPackageApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-rentalpackage-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createBookingDistanceApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-bookingdistance-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createOutstationPackageApi = (params) => {
  return api.post(
    "/api/rider/coupon/create-rider-outstationpackage-coupon",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// view
export const pendingCouponAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/pending-review-coupon-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const activeCouponAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/active-coupon-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectedCouponAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/rejected-coupon-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedCouponAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/deleted-coupon-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const expiredCouponAllViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider/coupon/expired-coupon-findall?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};



