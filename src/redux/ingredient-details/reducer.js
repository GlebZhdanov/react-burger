import {ADD_BUN,ADD_INGREDIENT,ADD_INGREDIENT_INFO,RESET_INGREDIENTS} from "./actions";

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
    case ADD_INGREDIENT_INFO:
      return {
        ...state,
        ingredientInfo: action.payload
      };
    case RESET_INGREDIENTS:
      return initialState
    default:
      return state
  }
}
