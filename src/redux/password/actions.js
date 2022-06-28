import {api} from "../../utils/api";

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_ERROR = "PASSWORD_RESET_ERROR";

export const PASSWORD_RECOVERY_SUCCESS = "PASSWORD_RECOVERY_SUCCESS";
export const PASSWORD_RECOVERY_REQUEST = "PASSWORD_RECOVERY_REQUEST";
export const PASSWORD_RECOVERY_ERROR = "PASSWORD_RECOVERY_ERROR";

export const PASSWORD_RECORD = "PASSWORD_RECORD";

export const resetPassword = (data) => (dispatch) => {
  dispatch({
    type: PASSWORD_RESET_REQUEST,
  })
  api.resetPassword(data)
  .then(() => {
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    })
  })
  .catch(() => {
    dispatch({
      type: PASSWORD_RESET_ERROR,
    })
  })
}

export const recoveryPassword = (data) => (dispatch) => {
  dispatch({
    type: PASSWORD_RECOVERY_SUCCESS,
  })
  api.recoveryPassword(data)
  .then(() => {
    dispatch({
      type: PASSWORD_RECOVERY_REQUEST,
    })
  })
  .catch(() => {
    dispatch({
      type: PASSWORD_RECOVERY_ERROR,
    })
  })
}

export const recordPassword = (data) => (dispatch) => {
  dispatch({
    type: PASSWORD_RECORD,
    payload: data,
  })
}
