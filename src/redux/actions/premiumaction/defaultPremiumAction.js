import {
  DEFAULT_PREMIUMONE_LIST,
  DEFAULT_PREMIUMONE_FIND_ONE,
  DEFAULT_PREMIUMFOUR_VIEW,
  DEFAULT_PREMIUMFOUR_EDIT,
  MANAGE_PREMIUM_LIST,
  MANAGE_PREMIUM_RIDE_LIST,
  DEFAULT_PREMIUMTWO_FIND_ONE,
  DEFAULT_PREMIUMTHREE_FIND_ONE,
  DEFAULT_PREMIUMFIVE_FIND_ONE,
  DEFAULT_PREMIUM_DUEDEPOSIT_FIND_ONE,
  DEFAULT_PREMIUM_DUEDEPOSIT_EDIT,
  DEFAULT_PREMIUM1235__EDIT,
  MANAGE_PREMIUMONE_FIND_ONE,
  MANAGE_PREMIUMTWO_FIND_ONE,
  MANAGE_PREMIUMTHREE_FIND_ONE,
  MANAGE_PREMIUMFIVE_FIND_ONE,
  DEFAULT_PREMIUM_PRICING_MODULE_EDIT,
  MANAGE_PREMIUMFOUR_FIND_ONE,
  MANAGE_PREMIUM1235__EDIT,
  MANAGE_PREMIUM_PRICING_MODULE_EDIT,
  MANAGE_PREMIUM_DUEDEPOSIT_EDIT,
  MANAGE_PREMIUM_DUEDEPOSIT_FIND_ONE,
  MANAGE_PREMIUMFOUR_EDIT,
  MANAGE_PREMIUM_STATUS_UPDATE_EDIT,
  MANAGE_PREMIUM4_SUBSCRIPTION,
  MANAGE_PREMIUM5_SUBSCRIPTION,
  MANAGE_PREMIUM_SUBSCRIPTION_EDIT,
  ARCHIVED_PREMIUM_LIST,
  ARCHIVED_PREMIUM_RIDE_LIST,
  ARCHIVED_PREMIUMONE_FIND_ONE,
  ARCHIVED_PREMIUMTWO_FIND_ONE,
  ARCHIVED_PREMIUMTHREE_FIND_ONE,
  ARCHIVED_PREMIUMFOUR_FIND_ONE,
  ARCHIVED_PREMIUMFIVE_FIND_ONE,
  ARCHIVED_PREMIUM_DUEDEPOSIT_FIND_ONE,
  ARCHIVED_PREMIUM4_SUBSCRIPTION,
  ARCHIVED_PREMIUM5_SUBSCRIPTION,
  AUTO_RENEWAL_ACTIVE_INACTIVE_PREMIUM,
  CANCEL_AUTO_RENEWAL_PREMIUM,
  CANCEL_ACTIVE_AUTO_RENEWAL_PREMIUM,
  CANCEL_ACTIVE_SCHEDULED_PREMIUM,
} from "../types";

export const defaultPremiumListAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUMONE_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const defaultPremiumOneAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUMONE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const defaultPremiumTwoAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUMTWO_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const defaultPremiumThreeAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUMTHREE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const defaultPremiumFiveAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUMFIVE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const defaultPremiumFourViewAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUMFOUR_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const defaultPremiumFourEditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: DEFAULT_PREMIUMFOUR_EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremiumFourEditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUMFOUR_EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremiumListAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUM_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const managePremiumRideListAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUM_RIDE_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const defaultPremiumDuedepositAction = (data, onSuccess, onError) => {
  return {
    type: DEFAULT_PREMIUM_DUEDEPOSIT_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const managePremiumDuedepositAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUM_DUEDEPOSIT_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const defaultPremiumDuedepositEditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: DEFAULT_PREMIUM_DUEDEPOSIT_EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const defaultPremium1235EditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: DEFAULT_PREMIUM1235__EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremiumOneAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUMONE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const managePremiumTwoAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUMTWO_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const managePremiumThreeAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUMTHREE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const managePremiumFourAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUMFOUR_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const managePremiumFiveAction = (data, onSuccess, onError) => {
  return {
    type: MANAGE_PREMIUMFIVE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const defaultPremiumPricingModuleEditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: DEFAULT_PREMIUM_PRICING_MODULE_EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremiumPricingModuleEditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM_PRICING_MODULE_EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremiumDuedepositEditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM_DUEDEPOSIT_EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremium1235EditAction = (
  data,
  data1,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM1235__EDIT,
    data,
    data1,
    onSuccess,
    onError,
  };
};

export const managePremiumStatusUpdateAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM_STATUS_UPDATE_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const managePremium4SubscriptionAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM4_SUBSCRIPTION,
    data,
    onSuccess,
    onError,
  };
};
export const managePremium5SubscriptionAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM5_SUBSCRIPTION,
    data,
    onSuccess,
    onError,
  };
};

export const managePremiumSubscriptionEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_PREMIUM_SUBSCRIPTION_EDIT,
    data,
    onSuccess,
    onError,
  };
};



export const archivedPremiumListAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUM_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const archivedPremiumRideListAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUM_RIDE_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const archivedPremiumOneAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUMONE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const archivedPremiumTwoAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUMTWO_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const archivedPremiumThreeAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUMTHREE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const archivedPremiumFourAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUMFOUR_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const archivedPremiumFiveAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUMFIVE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const archivedPremiumDuedepositAction = (data, onSuccess, onError) => {
  return {
    type: ARCHIVED_PREMIUM_DUEDEPOSIT_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const archivedPremium4SubscriptionAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_PREMIUM4_SUBSCRIPTION,
    data,
    onSuccess,
    onError,
  };
};
export const archivedPremium5SubscriptionAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ARCHIVED_PREMIUM5_SUBSCRIPTION,
    data,
    onSuccess,
    onError,
  };
};
export const AutoReneActiveInactivePremiumAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: AUTO_RENEWAL_ACTIVE_INACTIVE_PREMIUM,
    data,
    onSuccess,
    onError,
  };
};


export const cancelAutoRenewalPremiumAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCEL_AUTO_RENEWAL_PREMIUM,
    data,
    onSuccess,
    onError,
  };
};

export const cancelActiveAutoRenewalPremiumAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCEL_ACTIVE_AUTO_RENEWAL_PREMIUM,
    data,
    onSuccess,
    onError,
  };
};

export const cancelActiveScheduledPremiumAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: CANCEL_ACTIVE_SCHEDULED_PREMIUM,
    data,
    onSuccess,
    onError,
  };
};


