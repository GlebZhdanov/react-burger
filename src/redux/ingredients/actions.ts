import {api} from "../../utils/api";
import {TIngredientData} from "../../utils/types";
import {
  INGREDIENTS_DATA_SUCCESS,
  INGREDIENTS_DATA_REQUEST,
  INGREDIENTS_DATA_ERROR,
} from "../types/action";
import {AppDispatch, AppThunk} from "../types";

export interface ILoadIngredientsRequestAction {
  readonly type: typeof INGREDIENTS_DATA_REQUEST;
}

export interface ILoadIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_DATA_SUCCESS;
  payload: Array<TIngredientData>;
}

export interface ILoadIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_DATA_ERROR;
}

export type TIngredientsAction =
  | ILoadIngredientsRequestAction
  | ILoadIngredientsSuccessAction
  | ILoadIngredientsFailedAction

export const loadIngredientRequestAction = () : ILoadIngredientsRequestAction => ({
  type: INGREDIENTS_DATA_REQUEST,
})

export const loadIngredientsSuccessAction = (ingredient: Array<TIngredientData> ) : ILoadIngredientsSuccessAction => ({
  type: INGREDIENTS_DATA_SUCCESS,
  payload: ingredient
})

export const loadIngredientsFailedAction = () : ILoadIngredientsFailedAction => ({
  type: INGREDIENTS_DATA_ERROR,
})

export const loadIngredients = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loadIngredientRequestAction())
  api.getIngredients()
  .then((res) => {
    dispatch(loadIngredientsSuccessAction(res.data))
  })
  .catch(() => {
    dispatch(loadIngredientsFailedAction())
  })
}
