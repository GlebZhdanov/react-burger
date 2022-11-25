import {api} from "../../utils/api";
import {AppDispatch, AppThunk} from "../types";
import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RECOVERY_REQUEST,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RECORD} from "../types/action";

export interface IResetPasswordRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof PASSWORD_RESET_ERROR;
}

export interface IRecoveryPasswordRequestAction {
  readonly type: typeof PASSWORD_RECOVERY_REQUEST;
}

export interface IRecoveryPasswordSuccessAction {
  readonly type: typeof PASSWORD_RECOVERY_SUCCESS;
}

export interface IRecoveryPasswordFailedAction {
  readonly type: typeof PASSWORD_RECOVERY_ERROR;
}

export interface IRecoveryPasswordAction {
  readonly type: typeof PASSWORD_RECORD;
  payload: string;
}

export type TPasswordAction =
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IRecoveryPasswordRequestAction
  | IRecoveryPasswordSuccessAction
  | IRecoveryPasswordFailedAction
  | IRecoveryPasswordAction

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: PASSWORD_RESET_REQUEST
})

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: PASSWORD_RESET_SUCCESS
})

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: PASSWORD_RESET_ERROR
})

export const recoveryPasswordRequestAction = (): IRecoveryPasswordRequestAction => ({
  type: PASSWORD_RECOVERY_REQUEST
})

export const recoveryPasswordSuccessAction = (): IRecoveryPasswordSuccessAction => ({
  type: PASSWORD_RECOVERY_SUCCESS
})

export const recoveryPasswordFailedAction = (): IRecoveryPasswordFailedAction => ({
  type: PASSWORD_RECOVERY_ERROR
})

export const recordPasswordAction = (email: string): IRecoveryPasswordAction => ({
  type: PASSWORD_RECORD,
  payload: email,
})


export const resetPassword = (data: any): AppThunk => (dispatch: AppDispatch) => {
  dispatch(resetPasswordRequestAction())
  api.resetPassword(data)
  .then(() => {
    dispatch(resetPasswordSuccessAction())
  })
  .catch(() => {
    dispatch(resetPasswordFailedAction())
  })
}

export const recoveryPassword = (data: any): AppThunk => (dispatch: AppDispatch) => {
  dispatch(recoveryPasswordSuccessAction())
  api.recoveryPassword(data)
  .then(() => {
    dispatch(recoveryPasswordRequestAction())
  })
  .catch(() => {
    dispatch(recoveryPasswordFailedAction())
  })
}

export const recordPassword = (data: any): AppThunk => (dispatch: AppDispatch) => {
  dispatch(recordPasswordAction(data))
}
