import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
