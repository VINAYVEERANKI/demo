import { api } from "../api";

// account
export const nse_R_NewAccountListApi = (params) => {
  return api.post(
    "/api/nse/rider/new-account-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_GeneralAccountListApi = (params) => {
  return api.post(
    "/api/nse/rider/general-account-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_PolicyUpdateListApi = (params) => {
  return api.post(
    "/api/nse/rider/policy-update-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_SecurityListApi = (params) => {
  return api.post("/api/nse/rider/security-findall", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

// booking
// local

export const nse_R_BookingLocal_No_RidesApi = (params) => {
  return api.post(
    "/api/nse/rider/local-no-rides-available-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingLocal_OngoingApi = (params) => {
  return api.post(
    "/api/nse/rider/local-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingLocal_CancelledApi = (params) => {
  return api.post(
    "/api/nse/rider/local-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingLocal_AccidentApi = (params) => {
  return api.post(
    "/api/nse/rider/local-accident-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingLocal_ReviewApi = (params) => {
  return api.post(
    "/api/nse/rider/local-review-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// rental
export const nse_R_BookingRental_No_RidesApi = (params) => {
  return api.post(
    "/api/nse/rider/rental-no-rides-available-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRental_OngoingApi = (params) => {
  return api.post(
    "/api/nse/rider/rental-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRental_CancelledApi = (params) => {
  return api.post(
    "/api/nse/rider/rental-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRental_AccidentApi = (params) => {
  return api.post(
    "/api/nse/rider/rental-accident-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRental_ReviewApi = (params) => {
  return api.post(
    "/api/nse/rider/rental-review-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

//   oneway

export const nse_R_BookingOneway_No_RidesApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-no-rides-available-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingOneway_OngoingApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingOneway_CancelledApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingOneway_AccidentApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-accident-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingOneway_ReviewApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-review-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingOneway_RideScheduledApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-ridescheduled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingOneway_OdometerApi = (params) => {
  return api.post(
    "/api/nse/rider/oneway-odometer-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// round

export const nse_R_BookingRound_No_RidesApi = (params) => {
  return api.post(
    "/api/nse/rider/round-no-rides-available-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRound_OngoingApi = (params) => {
  return api.post(
    "/api/nse/rider/round-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRound_CancelledApi = (params) => {
  return api.post(
    "/api/nse/rider/round-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRound_AccidentApi = (params) => {
  return api.post(
    "/api/nse/rider/round-accident-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRound_ReviewApi = (params) => {
  return api.post(
    "/api/nse/rider/round-review-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRound_RideScheduledApi = (params) => {
  return api.post(
    "/api/nse/rider/round-ridescheduled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_BookingRound_OdometerApi = (params) => {
  return api.post(
    "/api/nse/rider/round-odometer-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// payment
export const nse_R_PaymentPendingApi = (params) => {
  return api.post(
    "/api/nse/rider/payment-pending-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_PaymentSuccessApi = (params) => {
  return api.post(
    "/api/nse/rider/payment-success-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_PaymentRiderCBApi = (params) => {
  return api.post(
    "/api/nse/rider/payment-ridecb-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_PaymentWalletApi = (params) => {
  return api.post(
    "/api/nse/rider/payment-wallet-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// emergency sos

export const nse_R_EmerSOS_DuringTripApi = (params) => {
  return api.post(
    "/api/nse/rider/emergencysos-duringtrip-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_EmerSOS_NoTripApi = (params) => {
  return api.post(
    "/api/nse/rider/emergencysos-notrip-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_EmerSOS_MessagingApi = (params) => {
  return api.post(
    "/api/nse/rider/emergencysos-message-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

//   in app message

export const nse_R_INAPPMESS_PendingApi = (params) => {
  return api.post(
    "/api/nse/rider/inappmessage-pending-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_INAPPMESS_ComplaintApi = (params) => {
  return api.post(
    "/api/nse/rider/inappmessage-complaint-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_R_INAPPMESS_RESCLOSEDApi = (params) => {
  return api.post(
    "/api/nse/rider/inappmessage-relsovedclosed-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// findone 

export const nse_R_FindOneApi = (params) => {
    return api.post(
      "/api/nse/rider/findone",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_R_EditApi = (params) => {
    return api.post(
      "/api/nse/rider/edit",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
    