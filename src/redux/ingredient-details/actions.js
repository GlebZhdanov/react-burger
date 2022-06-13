export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENT_INFO = "ADD_INGREDIENT_INFO";
export const RESET_INGREDIENTS = "RESET_INGREDIENTS";

export const addIngredient = (ingredient) => (dispatch) => {
  dispatch({
    type: ADD_INGREDIENT,
    payload: ingredient
  })
}

export const addIngredientInfo = (ingredient) => (dispatch) => {
  dispatch({
    type: ADD_INGREDIENT_INFO,
    payload: ingredient,
  })
}

export const addBun = (bun) => (dispatch) => {
  dispatch({
    type: ADD_BUN,
    payload: bun,
  })
}

export const resetIngredients = () => (dispatch) => {
  dispatch({
    type: RESET_INGREDIENTS,
  })
}
