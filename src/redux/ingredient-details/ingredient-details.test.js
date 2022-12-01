import {initialState,reducer} from "./reducer";
import {ADD_BUN,ADD_INGREDIENT,DELETE_INGREDIENT,RESET_INGREDIENTS,SORT_INGREDIENTS} from "../types/action";
import {dataTest} from "../../utils/constain";

describe('check ingredient-details reducer', () => {

  it('should return initial state ingredient-details', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should has changed on action ADD_INGREDIENT', () => {

    expect(reducer(initialState, {
      type: ADD_INGREDIENT,
      payload: dataTest
    })).toEqual({
      ...initialState,
      ingredient:[ ...initialState.ingredient, dataTest].filter(item => item.type !== 'bun')
    })
  })

  it('should has changed on action ADD_BUN', () => {

    expect(reducer(initialState, {
      type: ADD_BUN,
      payload: dataTest
    })).toEqual({
      ...initialState,
      bun: dataTest
    })
  })

  it('should has changed on action SORT_INGREDIENTS', () => {

    expect(reducer(initialState, {
      type: SORT_INGREDIENTS,
      payload: dataTest
    })).toEqual({
      ...initialState,
      ingredient: dataTest
    })
  })

  it('should has changed on action DELETE_INGREDIENT', () => {

    expect(reducer(initialState, {
      type: DELETE_INGREDIENT,
      payload: dataTest
    })).toEqual({
      ...initialState,
      ingredient: [...initialState.ingredient].filter((i) => i.key !== dataTest.key)
    })
  })

  it('should has changed on action RESET_INGREDIENTS', () => {

    expect(reducer(initialState, {
      type: RESET_INGREDIENTS,
    })).toEqual({
      ...initialState
    })
  })
})
