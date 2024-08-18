import { RIDER_FAQ_HELP_COVID_FIND_ALL, RIDER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL, RIDER_FAQ_HELP_MY_TRIPS_FIND_ALL, RIDER_FAQ_HELP_PAYMENT_FIND_ALL, RIDER_FAQ_HELP_PROFILE_ACCOUNT_FIND_ALL, RIDER_FAQ_HELP_REFERAL_FIND_ALL, RIDER_FAQ_HELP_SAFETY_FIND_ALL, RIDER_FAQ_HELP_TROUBLESHOOT_FIND_ALL } from "../../types";

export const riderFaqHelpCovidFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_COVID_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpProfileAccountFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_PROFILE_ACCOUNT_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpMyTripsFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_MY_TRIPS_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpPaymentFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_PAYMENT_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpSafetyFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_SAFETY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpTroubleshootFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_TROUBLESHOOT_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpGuideToComrideFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const riderFaqHelpReferalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: RIDER_FAQ_HELP_REFERAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };