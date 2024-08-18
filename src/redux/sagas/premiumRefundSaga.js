import { call, takeLatest } from "redux-saga/effects";
import * as premiumRefundApi from "../apis/premiumRefundApi";
import {
  PREMIUM_CANCELLED_REFUND_LIST,
  PREMIUM_CANCELLED_REFUND_VIEW,
  PREMIUM_PENDING_REFUND_LIST,
  PREMIUM_PENDING_REFUND_UPDATE,
  PREMIUM_PENDING_REFUND_VIEW,
  PREMIUM_REFUND_CANCEL,
  PREMIUM_SUCCESSFUL_REFUND_LIST,
  PREMIUM_SUCCESSFUL_REFUND_VIEW,
} from "../actions/types";

export function* premiumPendingRefundListWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumPendingRefundListApi,
      action.data
    );
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* premiumPendinfRefundViewWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumPendingRefundViewApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* premiumPendinfRefundUpdateWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumPendingRefundUpdateApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* premiumCancelledRefundListWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumCancelledRefundListApi,
      action.data
    );
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* premiumCancelledRefundViewWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumCancelledRefundViewApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* premiumSucessfulRefundListWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumSucessFulRefundListApi,
      action?.data
    );
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* premiumSucessfulRefundViewWorker(action) {
  try {
    const res = yield call(
      premiumRefundApi.premiumSuccessFulRefundViewApi,
      action.data
    );
    console.log(res);

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* premiumRefundCancelWorker(action) {
  console.log(action, "asdnalsdad");
  try {
    const res = yield call(
      premiumRefundApi.premiumRefundCancelApi,
      action.data
    );
    console.log(res, "asdnalsdad");

    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res.data);
    } else {
      yield action.onError("Something Went Wrong!");
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong!!");
  }
}

export function* watchPremiumPendingRefundListWorker() {
  yield takeLatest(PREMIUM_PENDING_REFUND_LIST, premiumPendingRefundListWorker);
}
export function* watchPremiumPendinfRefundViewWorker() {
  yield takeLatest(PREMIUM_PENDING_REFUND_VIEW, premiumPendinfRefundViewWorker);
}
export function* watchPremiumPendinfRefundUpdateWorker() {
  yield takeLatest(
    PREMIUM_PENDING_REFUND_UPDATE,
    premiumPendinfRefundUpdateWorker
  );
}
export function* watchPremiumCancelledRefundListWorker() {
  yield takeLatest(
    PREMIUM_CANCELLED_REFUND_LIST,
    premiumCancelledRefundListWorker
  );
}
export function* watchPremiumCancelledRefundViewWorker() {
  yield takeLatest(
    PREMIUM_CANCELLED_REFUND_VIEW,
    premiumCancelledRefundViewWorker
  );
}

export function* watchPremiumSucessfulRefundListWorker() {
  yield takeLatest(
    PREMIUM_SUCCESSFUL_REFUND_LIST,
    premiumSucessfulRefundListWorker
  );
}
export function* watchPremiumSucessfulRefundViewWorker() {
  yield takeLatest(
    PREMIUM_SUCCESSFUL_REFUND_VIEW,
    premiumSucessfulRefundViewWorker
  );
}

export function* watchPremiumRefundCancelWorker() {
  yield takeLatest(
    PREMIUM_REFUND_CANCEL,
    premiumRefundCancelWorker
  );
}
