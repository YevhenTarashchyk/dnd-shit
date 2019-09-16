import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";

import rootReducers from "./reducers/reducers";
import State from "./state";

const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];
const store = createStore(
  rootReducers,
  State,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
