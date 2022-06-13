import {api} from "../../utils/api";

export const INGREDIENTS_DATA_SUCCESS = "INGREDIENTS_DATA_SUCCESS";
export const INGREDIENTS_DATA_REQUEST = "INGREDIENTS_DATA_REQUEST";
export const INGREDIENTS_DATA_ERROR = "INGREDIENTS_DATA_ERROR";

export const loadIngredients = () => (dispatch) => {
  dispatch({
    type: INGREDIENTS_DATA_REQUEST,
  })
  api.getIngredients()
  .then((res) => {
    dispatch({
      type: INGREDIENTS_DATA_SUCCESS,
      payload: res,
    })
  })
  .catch(() => {
    dispatch({
      type: INGREDIENTS_DATA_ERROR,
    })
  })
}
