import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as UserReducer } from "../features/User/reducer";

export const store = createStore(
  UserReducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
);
