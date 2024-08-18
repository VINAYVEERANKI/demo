import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {
  manageDriverReducer,
  pendingApplicantReducer,
  bannedApplicantReducer,
  rejectApplicantReducer,
  expiredApplicantReducer,
  blockedApplicantReducer,
  deletedDriverReducer,
  perDeletedDriverReducer,
} from "../reducers/manageDriversReducer";
import {
  createRiderReferralReducer,
  createDriverReferralReducer,
} from "./referralReducer/createReferralReducer";
import {
  createRiderCouponReducer,
  createDriverCouponReducer,
} from "./couponReducer/createCouponReducer";
import { incentiveCreateReducer } from "./incentivesReducer/createIncentiveReducer";

const rootReducer = combineReducers({
  authReducer,
  manageDriverReducer,
  pendingApplicantReducer,
  bannedApplicantReducer,
  rejectApplicantReducer,
  expiredApplicantReducer,
  blockedApplicantReducer,
  deletedDriverReducer,
  perDeletedDriverReducer,
  createRiderReferralReducer,
  createDriverReferralReducer,
  createRiderCouponReducer,
  createDriverCouponReducer,
  incentiveCreateReducer,
});
export default rootReducer;
