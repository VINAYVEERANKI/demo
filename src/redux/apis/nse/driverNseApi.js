import { api } from "../api";

// account
export const nse_D_NewAccountListApi = (params) => {
  return api.post(
    "/api/nse/driver/new-account-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_NewDriverApplicationListApi = (params) => {
  return api.post(
    "/api/nse/driver/new-driver-application-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_ExisDriverApplicationListApi = (params) => {
  return api.post(
    "/api/nse/driver/existing-driver-application-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_GeneralAccountListApi = (params) => {
  return api.post("/api/nse/driver/general-account-findall", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const nse_D_AccountActivityListApi = (params) => {
    return api.post(
      "/api/nse/driver/account-activity-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_PolicyUpdateListApi = (params) => {
    return api.post(
      "/api/nse/driver/policy-update-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_DriverPerformanceListApi = (params) => {
    return api.post("/api/nse/driver/driver-performance-findall", JSON.stringify(params), {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    });
  };
  export const nse_D_SecurityListApi = (params) => {
    return api.post("/api/nse/driver/security-findall", JSON.stringify(params), {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    });
  };

// booking
// local

export const nse_D_BookingLocal_OngoingListApi = (params) => {
  return api.post(
    "/api/nse/driver/local-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingLocal_StopAddedListApi = (params) => {
  return api.post(
    "/api/nse/driver/local-stop-added-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingLocal_DropOffUpdateListApi = (params) => {
  return api.post(
    "/api/nse/driver/local-dropoff-updated-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingLocal_PaymentListApi = (params) => {
  return api.post(
    "/api/nse/driver/local-pyment-method-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingLocal_CancelledListApi = (params) => {
  return api.post(
    "/api/nse/driver/local-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingLocal_AccidentListApi = (params) => {
    return api.post(
      "/api/nse/driver/local-accident-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_BookingLocal_ReviewListApi = (params) => {
    return api.post(
      "/api/nse/driver/local-review-findall",
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

export const nse_D_BookingRental_OngoingListApi = (params) => {
  return api.post(
    "/api/nse/driver/rental-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRental_DailyLimitReachedListApi = (params) => {
  return api.post(
    "/api/nse/driver/rental-daily-limit-reached-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRental_DropOffUpdatedApi = (params) => {
  return api.post(
    "/api/nse/driver/rental-dropoff-updated-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRental_PaymentListApi = (params) => {
  return api.post(
    "/api/nse/driver/rental-pyment-method-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRental_CancelledListApi = (params) => {
  return api.post(
    "/api/nse/driver/rental-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRental_AccidentListApi = (params) => {
    return api.post(
      "/api/nse/driver/rental-accident-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_BookingRental_ReviewListApi = (params) => {
    return api.post(
      "/api/nse/driver/rental-review-findall",
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

export const nse_D_BookingOneway_OngoingListApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_OdometerListApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-odometer-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_DropOffUpdatedApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-dropoff-updated-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_PaymentListApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-pyment-method-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_CancelledListApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_AccidentListApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-accident-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_ReviewListApi = (params) => {
  return api.post(
    "/api/nse/driver/oneway-review-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingOneway_MaxLimitReachedListApi = (params) => {
    return api.post(
      "/api/nse/driver/oneway-max-limit-reached-findall",
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

export const nse_D_BookingRound_OngoingListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-ongoing-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_OdometerListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-odometer-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_DropOffUpdateListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-dropoff-updated-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_PaymentListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-pyment-method-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_CancelledListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-cancelled-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_AccidentListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-accident-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_ReviewListApi = (params) => {
  return api.post(
    "/api/nse/driver/round-review-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_BookingRound_MaxLimitReachedListApi = (params) => {
    return api.post(
      "/api/nse/driver/round-max-limit-reached-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_BookingRound_ReturnTripListApi = (params) => {
    return api.post(
      "/api/nse/driver/round-return-trip-findall",
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

export const nse_D_PaymentFineApi = (params) => {
  return api.post(
    "/api/nse/driver/payment-fine-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_PaymentReceivedApi = (params) => {
  return api.post(
    "/api/nse/driver/payment-received-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_PaymentDueApi = (params) => {
  return api.post(
    "/api/nse/driver/payment-due-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_PaymentDriverCBListApi = (params) => {
  return api.post(
    "/api/nse/driver/payment-driver-cb-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_CashoutListApi = (params) => {
    return api.post(
      "/api/nse/driver/payment-cashout-findall",
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

export const nse_D_EmerSOS_DuringTripApi = (params) => {
  return api.post(
    "/api/nse/driver/emergencysos-duringtrip-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_EmerSOS_NoTripApi = (params) => {
  return api.post(
    "/api/nse/driver/emergencysos-notrip-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_EmerSOS_MessagingApi = (params) => {
  return api.post(
    "/api/nse/driver/emergencysos-message-findall",
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

export const nse_D_INAPPMESS_DuringTripListApi = (params) => {
  return api.post(
    "/api/nse/driver/inappmessage-during-trip-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_INAPPMESS_ComplaintApi = (params) => {
  return api.post(
    "/api/nse/driver/inappmessage-complaint-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const nse_D_INAPPMESS_RESCLOSEDApi = (params) => {
  return api.post(
    "/api/nse/driver/inappmessage-relsovedclosed-findall",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};


// incentives

export const nse_D_INAPPMESS_SlotStartTimeListApi = (params) => {
    return api.post(
      "/api/nse/driver/incentive-slot-start-time-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_INAPPMESS_InprogressListApi = (params) => {
    return api.post(
      "/api/nse/driver/incentive-inprogress-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_INAPPMESS_SlotRemainingTimeListApi = (params) => {
    return api.post(
      "/api/nse/driver/incentive-slot-remaining-time-findall",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_INAPPMESS_CompletedSuccessApi = (params) => {
    return api.post(
      "/api/nse/driver/incentive-success-findall",
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

export const nse_D_FindOneApi = (params) => {
    return api.post(
      "/api/nse/driver/findone",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const nse_D_EditApi = (params) => {
    return api.post(
      "/api/nse/driver/edit",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
    