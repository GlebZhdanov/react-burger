import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TIngredientsDetailsAction} from "../ingredient-details/actions";
import {TIngredientsAction} from "../ingredients/actions";
import {TMainAction} from "../main/actions";
import {TOrderAction} from "../order/actions";
import {TPasswordAction} from "../password/actions";
import {rootReducer} from "../reducer";
import {TWsAction} from "../websocket/actions";

type TApplicationActions = TIngredientsDetailsAction | TIngredientsAction | TMainAction | TOrderAction | TPasswordAction | TWsAction;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
  >;

