import {TIngredientData} from "../../utils/types";
import {
  ADD_INGREDIENT,
  ADD_BUN,
  RESET_INGREDIENTS,
  SORT_INGREDIENTS,
  DELETE_INGREDIENT,
} from "../types/action";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  payload: TIngredientData;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  payload: TIngredientData;
}

export interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface ISortIngredientAction {
  readonly type: typeof SORT_INGREDIENTS;
  payload: Array<TIngredientData>;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  payload: TIngredientData;
}

export type  TIngredientsDetailsAction =
  | IAddIngredientAction
  | IAddBunAction
  | IResetIngredientsAction
  | ISortIngredientAction
  | IDeleteIngredientAction;

export const addIngredient = (ingredient: TIngredientData): IAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient,
  }
}

export const addBun = (bun: TIngredientData): IAddBunAction => {
  return {
    type: ADD_BUN,
    payload: bun,
  }
}

export const resetIngredients = (): IResetIngredientsAction => {
  return {
    type: RESET_INGREDIENTS,
  }
}

export const sortIngredient = (ingredient: Array<TIngredientData>) : ISortIngredientAction => {
  return {
    type: SORT_INGREDIENTS,
    payload: ingredient,
  }
}

export const deleteIngredient = (ingredient: TIngredientData): IDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    payload: ingredient,
  }
}
