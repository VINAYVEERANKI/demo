import { api } from "../api";

export const defaultPremiumOneListApi = (data, params) => {
  console.log("jgchcgchgchg");
  console.log(localStorage.getItem("accessToken"), "gfxghxgjxgxfjgfxjg");
  return api.get(
    `/api/default-premium/find-all-premium1?page_no=${data.pageno}`,
    JSON.stringify(params)
  );
};

export const defaultPremiumOneFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/default-premium/find-one-premium1?ride_type_id=${data?.rideType_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremiumTwoFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/default-premium/find-one-premium2?ride_type_id=${data?.rideType_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremiumThreeFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/default-premium/find-one-premium3?ride_type_id=${data?.rideType_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremiumFiveFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/default-premium/find-one-premium5?ride_type_id=${data?.rideType_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremium1235EditApi = (data, params) => {
  console.log(data, "dataaa");
  return api.post(
    `/api/default-premium/edit-premium1235?id=${data?.id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremiumFourViewApi = (data, params) => {
  return api.get(
    `/api/default-premium/find-one-premium4?ride_type_id=${data.rideType_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremiumFourEditApi = (data, params) => {
  return api.post(
    `/api/default-premium/edit-premium-four?id=${data.id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumFourEditApi = (data, params) => {
  return api.post(
    `/api/manage-premium/edit-premium-four?id=${data.id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumListApi = (data, params) => {
  console.log("jgchcgchgchg");
  console.log(localStorage.getItem("accessToken"), "gfxghxgjxgxfjgfxjg");
  return api.get(
    `/api/manage-premium/find-all-premium-zones?page_no=${data.pageno}`,
    JSON.stringify(params),
  );
};

export const defaultPremiumRideListApi = (data, params) => {
  console.log("jgchcgchgchg");
  console.log(localStorage.getItem("accessToken"), "gfxghxgjxgxfjgfxjg");
  return api.get(
    `/api/manage-premium/find-all-zone-ridetype?page_no=${data.pageno}&zone_id=${data.id}`,
    JSON.stringify(params)
  );
};

export const defaultPremiumDuedepositApi = (data, params) => {
  return api.get(
    `/api/default-premium/findone-premium-dues-or-deposite?ride_type_id=${data.ride_type_id}&premium_type=${data.premium_type}`,
    JSON.stringify(params)
  );
};

export const managePremiumDuedepositApi = (data, params) => {
  return api.get(
    `/api/manage-premium/find-one-zone-dues-deposite?ride_type_id=${data.ride_type_id}&premium_type=${data.premium_type}`,
    JSON.stringify(params)
  );
};

export const defaultPremiumDuedepositEditApi = (data, params) => {
  return api.post(
    `/api/default-premium/edit-premium-dues-or-deposite?ride_type_id=${data.ride_type_id}`,
    JSON.stringify(params)
  );
};

export const managePremiumOneFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/manage-premium/find-one-zone-premium1?zone_id=${data?.zone_id}&ride_type_id=${data.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumTwoFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/manage-premium/find-one-zone-premium2?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumThreeFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/manage-premium/find-one-zone-premium3?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumFourFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/manage-premium/find-one-zone-premium4?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumFiveFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/manage-premium/find-one-zone-premium5?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const defaultPremiumPricingModuleEditApi = (data, params) => {
  return api.post(
    `/api/default-premium/edit-premium-four-pricing-module?ride_type_id=${data.ride_type_id}`,
    JSON.stringify(params)
  );
};

export const managePremium1235EditApi = (data, params) => {
  console.log(data, "dataaa");
  return api.post(
    `/api/manage-premium/edit-premium1235?id=${data?.id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumDuedepositEditApi = (data, params) => {
  return api.post(
    `/api/manage-premium/edit-premium-dues-or-deposite?ride_type_id=${data.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumPricingModuleEditApi = (data, params) => {
  return api.post(
    `/api/manage-premium/edit-premium-four-pricing-module?ride_type_id=${data.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const managePremiumStatusUpdateApi = (params) => {
  return api.post(
    `/api/manage-premium/update-premium-four-five-status`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremium4SubscriptionApi = (data, params) => {
  return api.get(
    `/api/manage-premium/premium-four-subscription-findall?ride_type_id=${data?.ride_type_id}&zone_id=${data?.zone_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremium5SubscriptionApi = (data, params) => {
  return api.get(
    `/api/manage-premium/premium-five-subscription-findall?ride_type_id=${data?.ride_type_id}&zone_id=${data?.zone_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managePremiumSubscriptionEditApi = (params) => {
  return api.post(
    `/api/manage-premium/premium-subscription-edit`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremiumListApi = (data, params) => {
  console.log("jgchcgchgchg");
  console.log(localStorage.getItem("accessToken"), "gfxghxgjxgxfjgfxjg");
  return api.get(
    `/api/archive-premium/find-all-premium-zones?page_no=${data.pageno}`,
    JSON.stringify(params),
  );
};

export const archivedPremiumRideListApi = (data, params) => {
  console.log("jgchcgchgchg");
  console.log(localStorage.getItem("accessToken"), "gfxghxgjxgxfjgfxjg");
  return api.get(
    `/api/archive-premium/find-all-zone-ridetype?page_no=${data.pageno}&zone_id=${data.id}`,
    JSON.stringify(params)
  );
};

export const archivedPremiumOneFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/archive-premium/find-one-zone-premium1?zone_id=${data?.zone_id}&ride_type_id=${data.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremiumTwoFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/archive-premium/find-one-zone-premium2?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremiumThreeFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/archive-premium/find-one-zone-premium3?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremiumFourFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/archive-premium/find-one-zone-premium4?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremiumFiveFindoneApi = (data, params) => {
  console.log(data, "dataaa");
  return api.get(
    `/api/archive-premium/find-one-zone-premium5?zone_id=${data?.zone_id}&ride_type_id=${data?.ride_type_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremiumDuedepositApi = (data, params) => {
  return api.get(
    `/api/archive-premium/find-one-zone-dues-deposite?ride_type_id=${data.ride_type_id}&premium_type=${data.premium_type}`,
    JSON.stringify(params)
  );
};

export const archivedPremium4SubscriptionApi = (data, params) => {
  return api.get(
    `/api/archive-premium/premium-four-subscription-findall?ride_type_id=${data?.ride_type_id}&zone_id=${data?.zone_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const archivedPremium5SubscriptionApi = (data, params) => {
  return api.get(
    `/api/archive-premium/premium-five-subscription-findall?ride_type_id=${data?.ride_type_id}&zone_id=${data?.zone_id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const AutoReneActiveInactivePremiumApi = (params) => {
  return api.post(
    `/api/manage-premium/autorenewal-the-plan`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelAutoRenewalPremiumApi = (params) => {
  return api.post(
    `/api/manage-premium/cancel-autorenewal-plan`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelActiveAutoRenewalPremiumApi = (params) => {
  return api.post(
    `/api/manage-premium/cancel-autorenewal-active-plan`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const cancelActiveScheduledPremiumApi = (params) => {
  return api.post(
    `/api/manage-premium/cancel-schedule-active-plan`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};