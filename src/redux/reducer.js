import { combineReducers } from "redux";
import {reducer as burgerReducer} from "./ingredients/reducer";
import {reducer as orderReducer} from "./order/reducer";
import {reducer as ingredientsReducer} from "./ingredient-details/reducer";

export default combineReducers({
  order: orderReducer,
  burger: burgerReducer,
  ingredients: ingredientsReducer,
})
