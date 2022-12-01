import {reducer} from "./reducer";
import {initialState} from "./reducer";
import configureStore from 'redux-mock-store'
import {loadIngredients} from "./actions";
import thunk from 'redux-thunk'
import {INGREDIENTS_DATA_ERROR,INGREDIENTS_DATA_REQUEST,INGREDIENTS_DATA_SUCCESS} from "../types/action";
import {dataTest} from "../../utils/constain";

describe('check ingredient reducer', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({result: "OK"}),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial state ingredient', () => {
    expect(reducer(undefined,{})).toEqual(initialState)
  })

  it('should action after dispatched loadIngredients',  () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const expectedAction = [
      {type: INGREDIENTS_DATA_REQUEST},
      {type: INGREDIENTS_DATA_SUCCESS},
    ]

    const store = mockStore({});

    return store.dispatch(loadIngredients())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should has changed on action INGREDIENTS_DATA_ERROR', () => {
    expect(reducer(initialState, {
      type: INGREDIENTS_DATA_ERROR,
    })).toEqual({
      ...initialState,
      dataError: true,
      dataLoading: false,
    })
  })

  it('should has changed on action INGREDIENTS_DATA_SUCCESS', () => {
    expect(reducer(initialState, {
      type: INGREDIENTS_DATA_SUCCESS,
      payload: dataTest,
    })).toEqual({
      ...initialState,
      data: dataTest,
      dataLoading: true,
    })
  })

  it('should has changed on action INGREDIENTS_DATA_ERROR', () => {
    expect(reducer(initialState, {
      type: INGREDIENTS_DATA_ERROR,
    })).toEqual({
      ...initialState,
      dataError: true,
      dataLoading: false,
    })
  })
})
