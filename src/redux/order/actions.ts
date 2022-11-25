import {api} from "../../utils/api";
import {AppDispatch, AppThunk} from "../types";
import {
  ORDER_DATA_REQUEST,
  ORDER_DATA_SUCCESS,
  ORDER_DATA_ERROR,
  ORDER_DATA_DELETE,
} from "../types/action";
import {TDataOrderId} from "../../utils/types";

export interface ILoadOrderRequestAction {
  readonly type: typeof ORDER_DATA_REQUEST;
}

export interface ILoadOrderSuccessAction {
  readonly type: typeof ORDER_DATA_SUCCESS;
  payload: number
}

export interface ILoadOrderFailedAction {
  readonly type: typeof ORDER_DATA_ERROR;
}

export interface ILoadOrderDeleteAction {
  readonly type: typeof ORDER_DATA_DELETE;
}

export type TOrderAction =
  | ILoadOrderRequestAction
  | ILoadOrderSuccessAction
  | ILoadOrderFailedAction
  | ILoadOrderDeleteAction

export const loadOrderRequestAction = () : ILoadOrderRequestAction => ({
  type: ORDER_DATA_REQUEST,
})

export const loadOrderSuccessAction = (number: number) : ILoadOrderSuccessAction => ({
  type: ORDER_DATA_SUCCESS,
  payload: number
})

export const loadOrderFailedAction = () : ILoadOrderFailedAction => ({
  type: ORDER_DATA_ERROR,
})

export const loadOrderDeleteAction = () : ILoadOrderDeleteAction => ({
  type: ORDER_DATA_DELETE,
})

export const loadOrder = (id: TDataOrderId): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loadOrderRequestAction())
  api.postOrder(id)
  .then((res) => {
    dispatch(loadOrderSuccessAction(res.order.number))
  })
  .catch(() => {
    dispatch(loadOrderFailedAction())
  })
}

export const deleteOrder = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loadOrderDeleteAction())
}

