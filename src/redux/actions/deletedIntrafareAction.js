import {
  ARCH_DEL_INTRA_FARES_INDIVIDUAL,
  ARCH_DEL_INTRA_FARES_LOCAL_IND_LIST,
  ARCH_DEL_INTRA_FARES_LOCAL_LIST,
  ARCH_DEL_INTRA_FARES_ONE_WAY_LIST,
  ARCH_DEL_INTRA_FARES_SPECIAL_LIST,
  ARCH_DEL_INTRA_FARES_TOLL_LIST,
  DELETED_INTRA_FARES_INDIVIDUAL,
  DELETED_INTRA_FARES_LIST,
  DELETED_INTRA_FARES_LOCAL_INDIVIDUAL_LIST,
  DELETED_INTRA_FARES_LOCAL_LIST,
  DELETED_INTRA_FARES_ONE_WAY_LIST,
  DELETED_INTRA_FARES_SPECIAL_LIST,
  DELETED_INTRA_FARES_TOLL_LIST,
} from "./types";

export const deletedIntraFaresListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_FARES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedIntraFaresLocalListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_FARES_LOCAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedIntraFaresLocalIndividListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_FARES_LOCAL_INDIVIDUAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const deletedIntraFaresSpecialListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_FARES_SPECIAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedIntraFaresTollsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_FARES_TOLL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedIntraFaresOnewayListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_INTRA_FARES_ONE_WAY_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedIntraFareIndividualAction = (data, onSuccess, onError) => {
  return {
    type: DELETED_INTRA_FARES_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};

export const archiveddeletedIntraFaresLocalListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCH_DEL_INTRA_FARES_LOCAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archiveddeletedIntraFaresLocalIndividListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCH_DEL_INTRA_FARES_LOCAL_IND_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const archiveddeletedIntraFaresSpecialListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCH_DEL_INTRA_FARES_SPECIAL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archiveddeletedIntraFaresTollsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCH_DEL_INTRA_FARES_TOLL_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archiveddeletedIntraFaresOnewayListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ARCH_DEL_INTRA_FARES_ONE_WAY_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const archdelIntraFareIndAction = (data, onSuccess, onError) => {
  return {
    type: ARCH_DEL_INTRA_FARES_INDIVIDUAL,
    data,
    onSuccess,
    onError,
  };
};
