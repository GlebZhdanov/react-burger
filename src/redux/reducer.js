import { combineReducers } from "redux";
import {reducer as burgerReducer} from "./ingredients/reducer";
import {reducer as orderReducer} from "./order/reducer";
import {reducer as ingredientsReducer} from "./ingredient-details/reducer";
import {reducer as passwordReducer} from "./password/reducer";
import {reducer as mainReducer} from "./main/reducer";

export default combineReducers({
  order: orderReducer,
  burger: burgerReducer,
  ingredients: ingredientsReducer,
  password: passwordReducer,
  main: mainReducer
})
