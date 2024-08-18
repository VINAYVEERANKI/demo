import { DRIVER_FAQ_COMRIDE_SERVICE_FIND_ALL, DRIVER_FAQ_HELP_CANCELLATION_POLICY_FIND_ALL, DRIVER_FAQ_HELP_COVID_FIND_ALL, DRIVER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL, DRIVER_FAQ_HELP_MY_ACCOUNT_FIND_ALL, DRIVER_FAQ_HELP_PAYMENT_FIND_ALL, DRIVER_FAQ_HELP_REFERAL_FIND_ALL, DRIVER_FAQ_HELP_SAFETY_FIND_ALL } from "../../types";


export const driverFaqHelpCovidFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_COVID_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpMyAccountFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_MY_ACCOUNT_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpCancelPolicyFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_CANCELLATION_POLICY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpPaymentFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_PAYMENT_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpSafetyFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_SAFETY_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpComrideServiceFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_COMRIDE_SERVICE_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpGuideToComrideFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_GUIDE_TO_COMRIDE_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driverFaqHelpReferalFindAllAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRIVER_FAQ_HELP_REFERAL_FIND_ALL,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };