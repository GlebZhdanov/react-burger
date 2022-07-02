import {
  PASSWORD_RESET_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_REQUEST,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RECORD,
}
  from "./actions";

const initialState = {
  resetRequest : false,
  resetSuccess: false,
  resetError: false,
  recoveryRequest : false,
  recoverySuccess: false,
  recoveryError: false,
  resetPassword: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        resetRequest: true,
      }
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        resetSuccess: true,
      }
    case PASSWORD_RESET_ERROR:
      return {
        ...state,
        resetError: true,
        resetSuccess: false
      }
    case PASSWORD_RECOVERY_SUCCESS:
      return {
        ...state,
        recoveryRequest: true,
      }
    case PASSWORD_RECOVERY_REQUEST:
      return {
        ...state,
        recoverySuccess: true,
      }
    case PASSWORD_RECOVERY_ERROR:
      return {
        ...state,
        recoveryError: true,
        recoverySuccess: false
      }
    case PASSWORD_RECORD:
      return {
        ...state,
        resetPassword: action.payload,
      }
    default:
      return state
  }
}
