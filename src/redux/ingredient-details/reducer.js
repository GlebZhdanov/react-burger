import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_INGREDIENTS,
  SORT_INGREDIENTS
} from "./actions";

const initialState = {
  ingredient: [],
  bun: null,
  ingredientInfo: null,
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredient: [ ...state.ingredient, action.payload].filter(item => item.type !== 'bun'),
      };
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload
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
