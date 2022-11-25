import { TIngredientsDetailsAction } from "./actions";
import {
  ADD_INGREDIENT,
  ADD_BUN,
  RESET_INGREDIENTS,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
} from "../types/action";
import {TIngredientData} from "../../utils/types";

type TIngredientDetailsState = {
  ingredient:[] | Array<TIngredientData>,
  bun: null | TIngredientData,
  ingredientInfo: null | TIngredientData,
}

const initialState: TIngredientDetailsState = {
  ingredient: [],
  bun: null,
  ingredientInfo: null,
};

export const reducer = (state = initialState, action: TIngredientsDetailsAction) => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredient: [ ...state.ingredient, action.payload].filter(item => item.type !== 'bun'),
      };
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload,
      };
    case SORT_INGREDIENTS:
      return {
        ...state,
        ingredient: action.payload
      }
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredient: [...state.ingredient].filter((i) => i.key !== action.payload.key)
      }
    case RESET_INGREDIENTS:
      return initialState
    default:
      return state
  }
}
