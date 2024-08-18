import { DELETE_INCENTIVE_DATA } from "../../actions/returnTypes";
import { CREATE_INCENTIVE_DATA } from "../../actions/types";
import { incentiveData } from "../../constants";
export const incentiveCreateReducer = (state = incentiveData, action) => {
  switch (action.type) {
    case CREATE_INCENTIVE_DATA:
      return {
        ...state,
        loading: false,
        success: true,
        error: true,
        data: {...incentiveData.data, ...action.data},
      };
    case DELETE_INCENTIVE_DATA:
      return {
        ...state,
        loading: false,
        success: true,
        error: true,
        data: action.data,
      };
    default:
      return state;
  }
};
