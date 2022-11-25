import { TIngredientsAction } from "./actions";
import {
  INGREDIENTS_DATA_SUCCESS,
  INGREDIENTS_DATA_REQUEST,
  INGREDIENTS_DATA_ERROR,
} from "../types/action";
import {TIngredientState} from "../types/data";

const initialState: TIngredientState = {
  data: [],
  dataLoading: false,
  dataError: null
};

export const reducer = (state = initialState, action: TIngredientsAction): TIngredientState => {
  switch (action.type) {
    case INGREDIENTS_DATA_REQUEST:
      return {
        ...state,
        dataLoading: false,
      }
    case INGREDIENTS_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataLoading: true,
      }
    case INGREDIENTS_DATA_ERROR:
      return {
        ...state,
        dataError: true,
        dataLoading: false,
      }
    default:
      return state
  }
}
