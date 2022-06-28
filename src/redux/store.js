import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware  from 'redux-thunk'

export const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  return store;
};
