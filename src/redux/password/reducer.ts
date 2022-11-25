import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RECOVERY_REQUEST,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RECORD} from "../types/action";
import {TPasswordAction} from "./actions";
import {TPasswordState} from "../types/data";

const initialState: TPasswordState = {
  resetRequest : false,
  resetSuccess: false,
  resetError: false,
  recoveryRequest : false,
  recoverySuccess: false,
  recoveryError: false,
  resetPassword: '',
};

export const reducer = (state = initialState, action: TPasswordAction): TPasswordState => {
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
