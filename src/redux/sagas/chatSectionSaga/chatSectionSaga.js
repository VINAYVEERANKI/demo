import { call, takeLatest } from "redux-saga/effects";
import {
  findALLComplaintsApi,
  findALLSosMessagesApi,
  storedMessageApi,
  storedMessageSosApi,
} from "../../apis/chatSection/chatSectionApi";
import {
  ALL_COMPLAINTS_MESSAGES,
  ALL_SOS_MESSAGES,
  STORAGED_MESSAGE,
  STORAGED_SOS_MESSAGE,
} from "../../actions/types";

export function* storedMessagesWorker(action) {
  try {
    const res = yield call(
      storedMessageApi,
      action.page,
      action.max_count,
      action.data
    );
    console.log(res);
    console.log(action.data);
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

export function* storedMessagesSosWorker(action) {
  try {
    const res = yield call(storedMessageSosApi, action.data);
    console.log(res);
    console.log(action.data);
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

export function* findALLComplaintsWorker(action) {
  try {
    const res = yield call(findALLComplaintsApi, action.data);
    console.log(res);
    console.log(action.data);
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

export function* findALLSosMessagesWorker(action) {
  try {
    const res = yield call(findALLSosMessagesApi, action.data);
    console.log(res);
    console.log(action.data);
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

export function* WatchStoredMessagesWorker() {
  yield takeLatest(STORAGED_MESSAGE, storedMessagesWorker);
}
export function* WatchStoredMessagesSosWorker() {
  yield takeLatest(STORAGED_SOS_MESSAGE, storedMessagesSosWorker);
}

export function* WatchfindALLComplaintsWorker() {
  yield takeLatest(ALL_COMPLAINTS_MESSAGES, findALLComplaintsWorker);
}
export function* WatchfindALLSosMessagesWorker() {
  yield takeLatest(ALL_SOS_MESSAGES, findALLSosMessagesWorker);
}
