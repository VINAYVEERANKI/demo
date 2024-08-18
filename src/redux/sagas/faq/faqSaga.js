import { call, takeLatest } from "redux-saga/effects";
import * as faqApi from "../../apis/faq/faqApi";
import {
  CREATE_FAQ_OR_TOPIC,
  VIEW_FAQ_OR_TOPIC,
  EDIT_FAQ_OR_TOPIC,
  DELETE_FAQ_OR_TOPIC,
  CREATE_TOPIC_UNDER_FAQ,
  EDIT_TOPIC_UNDER_FAQ,
  VIEW_TOPIC_UNDER_FAQ,
  DELETE_TOPIC_UNDER_FAQ,
  TOPIC_UNDER_FAQ_RIDER_LIST,
  TOPIC_UNDER_FAQ_DRIVER_LIST,
  ACTIVE_FAQ_OR_TOPIC,
  INACTIVE_FAQ_OR_TOPIC,
} from "../../actions/types";

export function* createFaqOrTopicWorker(action) {
  try {
    const res = yield call(faqApi?.createFaqOrTopicApi, action.data);
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

export function* viewFaqOrTopicWorker(action) {
  try {
    const res = yield call(faqApi?.viewFaqOrTopicApi, action.data);
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

export function* editFaqOrTopicWorker(action) {
  try {
    const res = yield call(faqApi?.editFaqOrTopicApi, action.data);
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

export function* deleteFaqOrTopicWorker(action) {
  try {
    const res = yield call(faqApi?.deleteFaqOrTopicApi, action.data);
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

export function* createTopicUnderFaqWorker(action) {
  try {
    const res = yield call(faqApi?.createTopicUnderFaqApi, action.data);
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

export function* editTopicUnderFaqWorker(action) {
  try {
    const res = yield call(faqApi?.editTopicUnderFaqApi, action.data);
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

export function* viewTopicUnderFaqWorker(action) {
  try {
    const res = yield call(faqApi?.viewTopicUnderFaqApi, action.data);
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

export function* deleteTopicUnderFaqWorker(action) {
  try {
    const res = yield call(faqApi?.deleteTopicUnderFaqApi, action.data);
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

export function* topicUnderFaqRiderListWorker(action) {
  try {
    const res = yield call(
      faqApi?.topicUnderFaqRiderListApi,
      action.current_page,
      action.data
    );
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

export function* topicUnderFaqDriverListWorker(action) {
  try {
    const res = yield call(
      faqApi?.topicUnderFaqDriverListApi,
      action.current_page,
      action.data
    );
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

export function* activeFaqOrTopicWorker(action) {
  try {
    const res = yield call(faqApi?.activeFaqOrTopicApi, action.data);
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

export function* inActiveFaqOrTopicWorker(action) {
  try {
    const res = yield call(faqApi?.inActiveFaqOrTopicApi, action.data);
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

export function* watchcreateFaqOrTopicWorker() {
  yield takeLatest(CREATE_FAQ_OR_TOPIC, createFaqOrTopicWorker);
}

export function* watchviewFaqOrTopicWorker() {
  yield takeLatest(VIEW_FAQ_OR_TOPIC, viewFaqOrTopicWorker);
}

export function* watcheditFaqOrTopicWorker() {
  yield takeLatest(EDIT_FAQ_OR_TOPIC, editFaqOrTopicWorker);
}

export function* watchdeleteFaqOrTopicWorker() {
  yield takeLatest(DELETE_FAQ_OR_TOPIC, deleteFaqOrTopicWorker);
}

export function* watchcreateTopicUnderFaqWorker() {
  yield takeLatest(CREATE_TOPIC_UNDER_FAQ, createTopicUnderFaqWorker);
}

export function* watcheditTopicUnderFaqWorker() {
  yield takeLatest(EDIT_TOPIC_UNDER_FAQ, editTopicUnderFaqWorker);
}

export function* watchviewTopicUnderFaqWorker() {
  yield takeLatest(VIEW_TOPIC_UNDER_FAQ, viewTopicUnderFaqWorker);
}

export function* watchdeleteTopicUnderFaqWorker() {
  yield takeLatest(DELETE_TOPIC_UNDER_FAQ, deleteTopicUnderFaqWorker);
}

export function* watchTopicUnderFaqRiderListWorker() {
  yield takeLatest(TOPIC_UNDER_FAQ_RIDER_LIST, topicUnderFaqRiderListWorker);
}

export function* watchTopicUnderFaqDriverListWorker() {
  yield takeLatest(TOPIC_UNDER_FAQ_DRIVER_LIST, topicUnderFaqDriverListWorker);
}

export function* watchactiveFaqOrTopicWorker() {
  yield takeLatest(ACTIVE_FAQ_OR_TOPIC, activeFaqOrTopicWorker);
}

export function* watchinActiveFaqOrTopicWorker() {
  yield takeLatest(INACTIVE_FAQ_OR_TOPIC, inActiveFaqOrTopicWorker);
}
